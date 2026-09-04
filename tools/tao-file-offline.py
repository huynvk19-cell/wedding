#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gộp cả thiệp cưới thành MỘT file .html duy nhất, mở được khi không có mạng.

Cách dùng (chạy từ thư mục gốc của dự án):

  python3 tools/tao-file-offline.py
      -> tạo  ban-offline/thiep-cuoi.html   (không có tên khách)

  python3 tools/tao-file-offline.py --khach "Anh Tuấn"
      -> tạo  ban-offline/thiep-cuoi-anh-tuan.html

  python3 tools/tao-file-offline.py --danh-sach khach.txt
      -> đọc file khach.txt (mỗi dòng một tên), tạo một file cho từng người

File tạo ra tự chứa mọi thứ: chữ, giao diện và toàn bộ ảnh. Gửi qua Zalo,
Messenger hay email đều được; người nhận bấm mở là xem được, không cần mạng.
"""
import argparse, base64, os, re, sys, unicodedata
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
RA  = GOC / 'ban-offline'

def khong_dau(s):
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace('đ', 'd').replace('Đ', 'D')
    s = re.sub(r'[^A-Za-z0-9]+', '-', s).strip('-').lower()
    return s or 'khach'

def data_uri(duong_dan):
    p = GOC / duong_dan
    duoi = p.suffix.lower()
    kieu = {'.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.png': 'image/png', '.webp': 'image/webp'}.get(duoi, 'image/jpeg')
    return 'data:%s;base64,%s' % (kieu, base64.b64encode(p.read_bytes()).decode('ascii'))

def dung(ten_khach=None):
    html = (GOC / 'index.html').read_text(encoding='utf-8')
    css  = (GOC / 'assets/css/style.css').read_text(encoding='utf-8')
    cfg  = (GOC / 'assets/js/config.js').read_text(encoding='utf-8')
    main = (GOC / 'assets/js/main.js').read_text(encoding='utf-8')

    # nhúng mọi ảnh mà config trỏ tới
    dem = 0
    for duong_dan in sorted(set(re.findall(r"assets/images/[\w.-]+", cfg)), key=len, reverse=True):
        if (GOC / duong_dan).exists():
            cfg = cfg.replace("'" + duong_dan + "'", "'" + data_uri(duong_dan) + "'")
            dem += 1
    con_sot = [m for m in re.findall(r"assets/images/[\w.-]+", cfg) if (GOC / m).exists()]
    if con_sot:
        sys.exit('Còn ảnh chưa nhúng: %s' % con_sot)

    # bỏ ảnh chia sẻ mạng xã hội cho nhẹ file (bản offline không dùng tới)
    cfg = re.sub(r"shareImage: '[^']*'", "shareImage: ''", cfg)

    than = re.search(r'<body[^>]*>(.*)</body>', html, re.S).group(1)
    than = re.sub(r'\s*<script src="assets/js/(config|main)\.js"></script>', '', than)
    than = than.replace('<link rel="stylesheet" href="assets/css/style.css">', '')
    fonts = re.search(r'(<link href="https://fonts\.googleapis[^>]*>)', html).group(1)
    tieu_de = re.search(r'<title>(.*?)</title>', html, re.S)
    tieu_de = tieu_de.group(1).strip() if tieu_de else 'Thiệp cưới'

    phan = ['<!DOCTYPE html>', '<html lang="vi">', '<head>',
            '<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
            '<title>%s</title>' % tieu_de,
            '<link rel="preconnect" href="https://fonts.googleapis.com">',
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
            fonts,
            '<style>\n' + css + '\n</style>',
            '</head>', '<body class="is-locked">',
            than.strip()]
    if ten_khach:
        phan.append('<script>window.__GUEST__ = %s;</script>'
                    % ('"' + ten_khach.replace('\\', '\\\\').replace('"', '\\"') + '"'))
    phan += ['<script>\n' + cfg + '\n</script>',
             '<script>\n' + main + '\n</script>',
             '</body>', '</html>']

    return '\n'.join(phan), dem

def main():
    ap = argparse.ArgumentParser(description='Tạo bản thiệp offline một file')
    ap.add_argument('--khach', help='Tên một khách mời')
    ap.add_argument('--danh-sach', help='File danh sách khách, mỗi dòng một tên')
    a = ap.parse_args()

    ten_list = []
    if a.danh_sach:
        ten_list = [d.strip() for d in Path(a.danh_sach).read_text(encoding='utf-8').splitlines() if d.strip()]
        if not ten_list:
            sys.exit('Danh sách rỗng.')
    elif a.khach:
        ten_list = [a.khach]
    else:
        ten_list = [None]

    RA.mkdir(exist_ok=True)
    for ten in ten_list:
        noi_dung, so_anh = dung(ten)
        ten_file = 'thiep-cuoi.html' if ten is None else 'thiep-cuoi-%s.html' % khong_dau(ten)
        dich = RA / ten_file
        dich.write_text(noi_dung, encoding='utf-8')
        print('%-42s %6.1f MB   %s'
              % (dich.relative_to(GOC), dich.stat().st_size / 1024 / 1024, ten or '(không tên khách)'))
    print('\nĐã nhúng %d ảnh vào mỗi file. Gửi thẳng file cho khách là mở được, không cần mạng.' % so_anh)

if __name__ == '__main__':
    main()
