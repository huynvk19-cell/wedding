# Thiệp cưới online — Minimalism Đỏ Đô

Thiệp cưới một trang, phong cách tối giản tông **đỏ đô + kem**, chạy được trên
mọi điện thoại và máy tính. Không cần cài đặt, không cần build — chỉ là
HTML/CSS/JS thuần.

## Xem thử

Mở file `index.html` bằng trình duyệt là xong. Nếu muốn chạy như một
website thật (để nhạc nền và font hoạt động đúng):

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

---

## ✏️ Cách thay thông tin và ảnh của bạn

> **Bạn chỉ cần sửa DUY NHẤT 1 file: `assets/js/config.js`**
> Không cần đụng tới `index.html`, `style.css` hay `main.js`.

### Bước 1 — Chép ảnh của bạn vào thư mục `assets/images/`

Trong thư mục đó đang có sẵn các ảnh mẫu. Bạn **ghi đè lên chúng bằng ảnh
thật, giữ nguyên tên file** là thiệp tự động cập nhật, không phải sửa gì thêm:

| Tên file | Dùng ở đâu | Kích thước gợi ý |
|---|---|---|
| `cover.jpg` | Ảnh bìa + ảnh nền màn hình đầu | dọc, 1600 × 2000 |
| `groom.jpg` | Ảnh chú rể | dọc, 800 × 1000 |
| `bride.jpg` | Ảnh cô dâu | dọc, 800 × 1000 |
| `story-1.jpg` → `story-4.jpg` | Ảnh các cột mốc trong "Chuyện chúng mình" | ngang, 1000 × 750 |
| `gallery-1.jpg` → `gallery-8.jpg` | Album cưới | dọc, 900 × 1100 |
| `qr-groom.jpg`, `qr-bride.jpg` | Mã QR ngân hàng | vuông, 600 × 600 |
| `share.jpg` | Ảnh hiện ra khi dán link lên Facebook/Zalo | 1200 × 630 |

Hoặc nếu muốn đặt tên khác, bạn chép ảnh vào `assets/images/` rồi sửa đường
dẫn tương ứng trong `config.js`, ví dụ:

```js
photo: 'assets/images/anh-cuoi-cua-toi.jpg'
```

**Mẹo:** nén ảnh xuống dưới 500KB (dùng [squoosh.app](https://squoosh.app) hoặc
[tinypng.com](https://tinypng.com)) để thiệp mở nhanh trên 4G.

### Bước 2 — Sửa thông tin trong `assets/js/config.js`

File được chia thành 14 mục có chú thích tiếng Việt rõ ràng:

1. **meta** — tiêu đề, mô tả, ảnh chia sẻ
2. **couple** — tên, ảnh, cha mẹ, địa chỉ hai bên
3. **cover** — bìa thiệp, ngày cưới, ngày âm lịch
4. **intro** — lời mở đầu
5. **countdown** — ngày giờ để đếm ngược
6. **story** — các cột mốc tình yêu (thêm/bớt tuỳ ý)
7. **events** — Lễ Vu Quy / Lễ Thành Hôn / Tiệc Cưới + bản đồ
8. **gallery** — danh sách ảnh album
9. **rsvp** — form xác nhận tham dự
10. **wishes** — sổ lưu bút
11. **gift** — số tài khoản + mã QR mừng cưới
12. **music** — nhạc nền
13. **footer** — lời kết
14. **theme** — màu sắc, hiệu ứng

Ví dụ đổi tên và ngày cưới:

```js
couple: {
  groom: { shortName: 'Văn Nam', fullName: 'Trần Văn Nam', ... },
  bride: { shortName: 'Mai Anh', fullName: 'Đỗ Mai Anh', ... }
},
cover: {
  dateText: '15 . 03 . 2027',
  lunarText: 'Nhằm ngày 08 tháng 02 năm Đinh Mùi'
},
countdown: {
  targetDate: '2027-03-15T11:00:00'   // định dạng YYYY-MM-DDTHH:mm:ss
}
```

### Bước 3 — Thêm nhạc nền (không bắt buộc)

Chép file `.mp3` vào `assets/music/`, rồi sửa trong `config.js`:

```js
music: { show: true, src: 'assets/music/song.mp3', autoplayOnOpen: true }
```

Nếu chưa có file nhạc, nút nhạc sẽ **tự động ẩn** — thiệp vẫn chạy bình thường.

---

## 🔧 Các tính năng có sẵn

| Tính năng | Ghi chú |
|---|---|
| **Bìa mở thiệp** | Khách bấm "Mở thiệp cưới" mới vào nội dung, nhạc bật cùng lúc |
| **Lời chào riêng từng khách** | Gửi link kèm `?guest=Tên khách` — xem mục dưới |
| **Đếm ngược** | Tự chạy tới ngày cưới, hết giờ thì đổi thành lời chúc mừng |
| **Timeline chuyện tình** | So le trái/phải trên máy tính, dọc gọn trên điện thoại |
| **Bản đồ** | Nút mở Google Maps + tuỳ chọn nhúng bản đồ ngay trong thiệp |
| **Thêm vào lịch** | Nút tạo sự kiện Google Calendar |
| **Album + xem ảnh lớn** | Bấm ảnh để phóng to, vuốt/bấm mũi tên hoặc phím ←/→, Esc để đóng |
| **RSVP** | Gửi về Google Form hoặc API riêng (xem dưới) |
| **Sổ lưu bút** | Khách viết lời chúc, hiển thị ngay |
| **Mừng cưới** | Mã QR + nút sao chép số tài khoản 1 chạm |
| **Cánh hoa rơi** | Nhẹ nhàng, tắt được trong `theme.petals` |
| **Tự tắt hiệu ứng** | Tôn trọng cài đặt "giảm chuyển động" của máy khách |

### Gửi lời chào riêng cho từng khách

Thêm `?guest=` vào cuối link khi gửi cho từng người:

```
https://ten-cua-ban.github.io/wedding/?guest=Anh%20Tuấn
https://ten-cua-ban.github.io/wedding/?guest=Gia%20đình%20cô%20Ba
```

Trên bìa thiệp sẽ hiện: *Thân mời **Anh Tuấn***

### Nhận phản hồi RSVP về Google Form

1. Tạo một Google Form với các câu hỏi: Họ tên, SĐT, Tham dự, Số người,
   Khách của, Lời nhắn.
2. Bấm chuột phải vào form đã publish → **Xem nguồn trang** → tìm các chuỗi
   `entry.123456789` ứng với từng câu hỏi.
3. Điền vào `config.js`:

```js
rsvp: {
  mode: 'form',
  formAction: 'https://docs.google.com/forms/d/e/XXXXX/formResponse',
  fields: {
    name:   'entry.111111',
    phone:  'entry.222222',
    attend: 'entry.333333',
    guests: 'entry.444444',
    side:   'entry.555555',
    wish:   'entry.666666'
  }
}
```

Để `mode: 'none'` nếu bạn chỉ muốn xem thử — form vẫn hiện lời cảm ơn nhưng
không gửi dữ liệu đi đâu.

### Nhúng bản đồ vào thiệp

Vào Google Maps → chọn địa điểm → **Chia sẻ** → **Nhúng bản đồ** → copy phần
trong `src="..."` rồi dán vào `mapEmbed` của sự kiện tương ứng.

### Đổi tông màu

```js
theme: {
  burgundy: '#6E1621',   // màu chủ đạo
  red:      '#96202E',   // màu nhấn
  cream:    '#FBF6EF',   // nền
  gold:     '#B98A44'    // ánh kim
}
```

---

## 🚀 Đưa thiệp lên mạng (miễn phí)

**GitHub Pages** — vào repo trên GitHub → **Settings** → **Pages** →
*Source: Deploy from a branch* → chọn branch → **Save**.
Sau vài phút thiệp sẽ có địa chỉ dạng
`https://<tên-github>.github.io/wedding/`

**Netlify / Vercel** — kéo thả cả thư mục này vào [netlify.com/drop](https://app.netlify.com/drop)
là xong, có link ngay.

---

## 📁 Cấu trúc thư mục

```
├── index.html              khung trang (không cần sửa)
└── assets/
    ├── css/style.css       giao diện (không cần sửa)
    ├── js/
    │   ├── config.js       ⬅️ SỬA FILE NÀY
    │   └── main.js         logic (không cần sửa)
    ├── images/             ⬅️ CHÉP ẢNH VÀO ĐÂY
    └── music/              ⬅️ CHÉP FILE MP3 VÀO ĐÂY
```

## Lưu ý

- Toàn bộ ảnh trong `assets/images/` hiện là **ảnh mẫu tự sinh**, hãy thay bằng
  ảnh cưới của bạn.
- Sổ lưu bút lưu trên trình duyệt của từng khách (`localStorage`), nên lời chúc
  của khách này không hiện với khách khác. Muốn gom tất cả lời chúc về một chỗ,
  hãy dùng RSVP với Google Form.
