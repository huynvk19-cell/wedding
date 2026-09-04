#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Dựng trang công cụ  tools/gui-thiep.html

Trang đó cho phép GỬI THIỆP RIÊNG CHO TỪNG KHÁCH ngay trên điện thoại,
không cần cài gì, không cần gõ lệnh:
  - tạo link riêng cho từng khách (dùng khi có mạng)
  - tạo file thiệp riêng cho từng khách để gửi qua Zalo (mở được offline)

Chạy lại lệnh này mỗi khi sửa thiệp:
    python3 tools/dung-cong-cu.py
"""
import base64, re, sys
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
DICH = GOC / 'tools' / 'gui-thiep.html'
KET_SCRIPT = '[[__HET_SCRIPT__]]'
CHO_TEN = '__TEN_KHACH_MOI__'

def data_uri(dd):
    p = GOC / dd
    kieu = {'.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp'}
    return 'data:%s;base64,%s' % (kieu.get(p.suffix.lower(),'image/jpeg'),
                                  base64.b64encode(p.read_bytes()).decode('ascii'))

def dung_mau_thiep():
    """Cả tấm thiệp gộp thành một chuỗi HTML, ảnh nhúng sẵn, chừa chỗ điền tên khách."""
    html = (GOC/'index.html').read_text(encoding='utf-8')
    css  = (GOC/'assets/css/style.css').read_text(encoding='utf-8')
    cfg  = (GOC/'assets/js/config.js').read_text(encoding='utf-8')
    main = (GOC/'assets/js/main.js').read_text(encoding='utf-8')

    dem = 0
    for dd in sorted(set(re.findall(r"assets/images/[\w.-]+", cfg)), key=len, reverse=True):
        if (GOC/dd).exists():
            cfg = cfg.replace("'"+dd+"'", "'"+data_uri(dd)+"'"); dem += 1
    sot = [m for m in re.findall(r"assets/images/[\w.-]+", cfg) if (GOC/m).exists()]
    if sot: sys.exit('Còn ảnh chưa nhúng: %s' % sot)
    cfg = re.sub(r"shareImage: '[^']*'", "shareImage: ''", cfg)

    than = re.search(r'<body[^>]*>(.*)</body>', html, re.S).group(1)
    than = re.sub(r'\s*<script src="assets/js/(config|main)\.js"></script>', '', than)
    than = than.replace('<link rel="stylesheet" href="assets/css/style.css">', '')
    fonts = re.search(r'(<link href="https://fonts\.googleapis[^>]*>)', html).group(1)
    td = re.search(r'<title>(.*?)</title>', html, re.S)
    td = td.group(1).strip() if td else 'Thiệp cưới'

    mau = '\n'.join([
        '<!DOCTYPE html>','<html lang="vi">','<head>','<meta charset="UTF-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
        '<title>%s</title>' % td,
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        fonts, '<style>\n'+css+'\n</style>','</head>','<body class="is-locked">',
        than.strip(),
        '<script>window.__GUEST__ = "%s";</script>' % CHO_TEN,
        '<script>\n'+cfg+'\n</script>',
        '<script>\n'+main+'\n</script>','</body>','</html>'])
    return mau, dem

def main():
    mau, so_anh = dung_mau_thiep()
    # cất vào thẻ script text/plain, phải giấu chuỗi </script> đi kẻo vỡ trang
    mau_an = mau.replace('</script>', KET_SCRIPT)
    giao_dien = (GOC/'tools'/'_giao-dien.html').read_text(encoding='utf-8')
    ra = giao_dien.replace('<!--MAU_THIEP-->', mau_an)
    DICH.write_text(ra, encoding='utf-8')
    print('%s  —  %.1f MB, đã nhúng %d ảnh'
          % (DICH.relative_to(GOC), DICH.stat().st_size/1024/1024, so_anh))

if __name__ == '__main__':
    main()
