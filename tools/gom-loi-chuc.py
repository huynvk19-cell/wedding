#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gom lời chúc và xác nhận tham dự từ trang tính Google về thẳng repo.

Khách bấm gửi trên thiệp -> dữ liệu chạy vào Google Biểu mẫu -> trang tính.
Máy này đọc trang tính đó rồi ghi ra ba file trong thư mục du-lieu/:

    loi-chuc.json   thiệp đọc file này để hiện lời chúc cho mọi khách cùng xem
    loi-chuc.md     đọc bằng mắt, ngay trên GitHub
    xac-nhan.md     bảng ai đến ai không, kèm đếm đầu người

Chạy tay:  python3 tools/gom-loi-chuc.py
Chạy tự động: .github/workflows/gom-loi-chuc.yml, 15 phút một lần.
"""

import csv
import io
import json
import re
import sys
import unicodedata
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
THU_MUC = GOC / 'du-lieu'
NGUON = THU_MUC / 'nguon-google-sheet.txt'
VN = timezone(timedelta(hours=7))


def bo_dau(s):
    s = unicodedata.normalize('NFD', str(s))
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return s.replace('đ', 'd').replace('Đ', 'D').lower().strip()


def doc_link():
    if not NGUON.exists():
        return ''
    for dong in NGUON.read_text(encoding='utf-8').splitlines():
        dong = dong.strip()
        if dong and not dong.startswith('#'):
            return dong
    return ''


def tai_csv(link):
    req = urllib.request.Request(link, headers={'User-Agent': 'thiep-cuoi/1.0'})
    with urllib.request.urlopen(req, timeout=60) as res:
        return res.read().decode('utf-8-sig')


# Tên cột do Google đặt theo câu hỏi trong biểu mẫu, mỗi người đặt một kiểu.
# Nên dò theo từ khoá thay vì bắt đúng chữ.
TU_KHOA = [
    ('wish',   ['loi chuc', 'loi nhan', 'nhan gui', 'wish', 'message']),
    ('attend', ['tham du', 'co mat', 'attend']),
    ('side',   ['nha trai', 'nha gai', 'khach cua', 'ben nao', 'side']),
    ('phone',  ['dien thoai', 'so dt', 'sdt', 'phone']),
    ('name',   ['ho ten', 'ten cua', 'ten', 'name', 'quy danh']),
    ('time',   ['dau thoi gian', 'timestamp']),
]


def do_cot(tieu_de):
    """Ghép mỗi cột trong trang tính vào một ô dữ liệu của thiệp."""
    map_cot = {}
    for i, ten in enumerate(tieu_de):
        goi = bo_dau(ten)
        for khoa, tu in TU_KHOA:
            if khoa in map_cot:
                continue
            if any(t in goi for t in tu):
                map_cot[khoa] = i
                break
    return map_cot


def doc_dong(dong, map_cot):
    lay = lambda k: (dong[map_cot[k]].strip()
                     if k in map_cot and map_cot[k] < len(dong) else '')
    return {k: lay(k) for k in ('time', 'name', 'phone', 'attend', 'side', 'wish')}


def ngay_gio(chuoi):
    """Google ghi dấu thời gian kiểu 04/09/2026 15:30:12. Đọc được thì đọc."""
    for mau in ('%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S', '%Y-%m-%d %H:%M:%S'):
        try:
            return datetime.strptime(chuoi, mau)
        except ValueError:
            pass
    return None


def main():
    link = doc_link()
    if not link:
        print('Chưa dán link trang tính vào du-lieu/nguon-google-sheet.txt — bỏ qua.')
        return 0
    if 'output=csv' not in link:
        print('Link trong nguon-google-sheet.txt không phải link CSV.', file=sys.stderr)
        print('Cần link kết thúc bằng output=csv, xem hướng dẫn trong chính file đó.',
              file=sys.stderr)
        return 1

    try:
        tho = tai_csv(link)
    except Exception as loi:
        print('Không tải được trang tính: %s' % loi, file=sys.stderr)
        print('Kiểm tra lại trang tính đã "Xuất bản lên web" chưa.', file=sys.stderr)
        return 1

    bang = list(csv.reader(io.StringIO(tho)))
    if not bang:
        print('Trang tính rỗng.')
        return 0

    map_cot = do_cot(bang[0])
    if 'name' not in map_cot:
        print('Không tìm thấy cột tên trong trang tính. Cột đang có: %s'
              % ', '.join(bang[0]), file=sys.stderr)
        return 1

    ban_ghi = [doc_dong(d, map_cot) for d in bang[1:] if any(o.strip() for o in d)]

    # --- lời chúc: thiệp đọc file json này ---
    loi_chuc, da_co = [], set()
    for b in ban_ghi:
        if not b['wish'] or not b['name']:
            continue
        khoa = (b['name'], b['wish'])
        if khoa in da_co:
            continue
        da_co.add(khoa)
        loi_chuc.append({'name': b['name'], 'text': b['wish']})

    THU_MUC.mkdir(exist_ok=True)
    (THU_MUC / 'loi-chuc.json').write_text(
        json.dumps(loi_chuc, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')

    luc = datetime.now(VN).strftime('%H:%M ngày %d/%m/%Y')
    md = ['# Sổ lưu bút', '',
          '%d lời chúc — cập nhật lúc %s (giờ Việt Nam).' % (len(loi_chuc), luc), '']
    for b in ban_ghi:
        if not b['wish'] or not b['name']:
            continue
        md.append('### %s' % b['name'])
        if b['time']:
            md.append('*%s*' % b['time'])
            md.append('')
        md.append('> ' + b['wish'].replace('\n', '\n> '))
        md.append('')
    if not loi_chuc:
        md.append('*Chưa có ai gửi lời chúc.*')
    (THU_MUC / 'loi-chuc.md').write_text('\n'.join(md) + '\n', encoding='utf-8')

    # --- xác nhận tham dự ---
    nhan_loi = lambda b: bool(b['attend']) and not any(
        t in bo_dau(b['attend']) for t in ('khong', 'tiec', 'ban ', 'vang'))
    co_mat = [b for b in ban_ghi if nhan_loi(b)]
    vang = [b for b in ban_ghi if b['attend'] and not nhan_loi(b)]
    x = ['# Xác nhận tham dự', '',
         'Cập nhật lúc %s (giờ Việt Nam).' % luc, '',
         '- Có mặt: **%d**' % len(co_mat),
         '- Không đến được: **%d**' % len(vang),
         '- Tổng số phản hồi: **%d**' % len(ban_ghi), '',
         '| Tên | Điện thoại | Tham dự | Khách của | Gửi lúc |',
         '| --- | --- | --- | --- | --- |']
    sach = lambda t: re.sub(r'\s+', ' ', t).replace('|', '/').strip() or '—'
    for b in sorted(ban_ghi, key=lambda b: ngay_gio(b['time']) or datetime.min):
        x.append('| %s | %s | %s | %s | %s |' % (sach(b['name']), sach(b['phone']),
                                                 sach(b['attend']), sach(b['side']),
                                                 sach(b['time'])))
    if not ban_ghi:
        x.append('| — | — | — | — | — |')
    (THU_MUC / 'xac-nhan.md').write_text('\n'.join(x) + '\n', encoding='utf-8')

    print('Đã gom: %d phản hồi, %d lời chúc, %d người nhận lời.'
          % (len(ban_ghi), len(loi_chuc), len(co_mat)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
