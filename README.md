# Thiệp cưới online — tông xanh biển

Thiệp cưới một trang, phong cách tối giản tông **xanh biển sâu + cát ngà**,
bảng màu lấy từ chính ảnh cưới ở biển Phú Quốc. Chạy được trên mọi điện thoại
và máy tính. Không cần cài đặt, không cần build — chỉ là HTML/CSS/JS thuần.

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
| `cover.jpg` | Ảnh bìa + ảnh nền màn hình đầu | **dọc**, 1200 × 1800 |
| `story-1.jpg` → `story-4.jpg` | Ảnh các cột mốc trong "Chuyện chúng mình" | ngang, 1000 × 750 |
| `gallery-1.jpg` → `gallery-8.jpg` | Album cưới (thêm/bớt bao nhiêu tuỳ ý) | **ảnh dọc**, 900 × 1100 |
| `share.jpg` | Ảnh hiện ra khi dán link lên Facebook/Zalo | 1200 × 630 |

Hoặc nếu muốn đặt tên khác, bạn chép ảnh vào `assets/images/` rồi sửa đường
dẫn tương ứng trong `config.js`, ví dụ:

```js
photo: 'assets/images/anh-cuoi-cua-toi.jpg'
```

**Mẹo:** nén ảnh xuống dưới 500KB (dùng [squoosh.app](https://squoosh.app) hoặc
[tinypng.com](https://tinypng.com)) để thiệp mở nhanh trên 4G.

### Bước 2 — Sửa thông tin trong `assets/js/config.js`

File được chia thành 13 mục có chú thích tiếng Việt rõ ràng:

1. **meta** — tiêu đề, mô tả, ảnh chia sẻ
2. **couple** — tên, ảnh, cha mẹ, địa chỉ hai bên
3. **cover** — bìa thiệp, ngày cưới, ngày âm lịch
4. **intro** — lời mở đầu
5. **countdown** — ngày giờ để đếm ngược
6. **story** — các cột mốc tình yêu (thêm/bớt tuỳ ý)
7. **events** — thông tin tiệc cưới + bản đồ
8. **gallery** — danh sách ảnh album
9. **rsvp** — form xác nhận tham dự
10. **wishes** — sổ lưu bút
11. **music** — nhạc nền
12. **footer** — lời kết
13. **theme** — màu sắc, hiệu ứng

Ví dụ đổi tên và ngày cưới:

```js
couple: {
  groom: { shortName: 'Văn Huy',  fullName: 'Nguyễn Văn Huy',  title: 'Đại hoàng tử',    ... },
  bride: { shortName: 'Ngọc Hiếu', fullName: 'Nguyễn Ngọc Hiếu', title: 'Trưởng công chúa', ... }
},
cover: {
  dateText: '16 . 09 . 2026',
  lunarText: 'Nhằm ngày 06 tháng 08 năm Bính Ngọ'
},
countdown: {
  targetDate: '2026-09-16T18:00:00'   // định dạng YYYY-MM-DDTHH:mm:ss
}
```

### Bước 2b — Thêm ảnh vào album (nhiều hơn 8 ảnh)

Album không giới hạn số ảnh. Có **hai cách**:

**Cách A — chỉ thay ảnh, không sửa code (dễ nhất)**

Đặt tên ảnh của bạn đúng như tên có sẵn rồi chép đè vào `assets/images/`:
`gallery-1.jpg`, `gallery-2.jpg`, … `gallery-8.jpg`. Xong, không cần mở file nào cả.

**Cách B — thêm ảnh thứ 9, 10, 11…**

1. Chép ảnh vào `assets/images/`, ví dụ `gallery-9.jpg`, `gallery-10.jpg`
2. Mở `assets/js/config.js`, tìm mục `gallery`, thêm dòng mới vào danh sách:

```js
gallery: {
  photos: [
    { src: 'assets/images/gallery-1.jpg', caption: 'Khoảnh khắc 01' },
    ...
    { src: 'assets/images/gallery-8.jpg', caption: 'Khoảnh khắc 08' },
    { src: 'assets/images/gallery-9.jpg',  caption: 'Khoảnh khắc 09' },
    { src: 'assets/images/gallery-10.jpg', caption: 'Khoảnh khắc 10' }
  ]
}
```

**Ba quy tắc dễ sai:**

- Mỗi dòng kết thúc bằng dấu phẩy `,` — **trừ dòng cuối cùng** thì không có dấu phẩy.
- Tên file phải **khớp chính xác**, kể cả chữ hoa/thường và đuôi `.jpg` / `.png`.
- Không dùng dấu tiếng Việt và khoảng trắng trong tên file. Dùng `anh-cuoi-01.jpg`,
  đừng dùng `ảnh cưới 01.jpg`.

**Muốn bớt ảnh?** Xoá cả dòng đó đi. Lưới sẽ tự sắp xếp lại, không để lỗ trống.

**Kích thước ảnh album:** nên dùng **ảnh dọc** (khổ 3:4 hoặc 4:5, ví dụ 900 × 1200).
Trên điện thoại album xếp 2 cột theo khổ dọc, nên ảnh ngang sẽ bị cắt bớt hai bên.

**Mục "Hai chúng mình"** mặc định chỉ có chữ, không ảnh — cân đối và trang nhã.
Nếu muốn thêm **một** ảnh chung ở trên phần đó:

```js
couple: {
  photo: 'assets/images/anh-chung.jpg',   // để '' nếu không muốn ảnh
  ...
}
```

Nên chọn ảnh **khác ảnh bìa** cho đỡ trùng lặp. Ảnh ngang (3:2) hợp nhất ở đây.

**Ảnh ở các chỗ khác** (bìa, câu chuyện) mỗi chỗ đúng một ảnh.
Muốn đổi thì sửa đường dẫn ngay tại mục đó trong `config.js`:

```js
cover: { photo: 'assets/images/anh-bia.jpg' }
story: { items: [ { photo: 'assets/images/ky-niem-01.jpg' } ] }
```

Riêng **Chuyện chúng mình** thì thêm/bớt được cột mốc: mỗi cột mốc là một khối
`{ date, title, text, photo }` trong `story.items`.

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
  deep:   '#2A4257',   // xanh biển sâu — màu chủ đạo, nền các mảng tối
  accent: '#3F657E',   // xanh biển vừa — nhãn nhỏ, chi tiết nhấn
  cream:  '#F4F1EA',   // cát ngà — nền chính
  gold:   '#CFAF74',   // vàng cát SÁNG — chỉ dùng trên nền tối
  sand:   '#7E6030'    // vàng cát ĐẬM — chỉ dùng trên nền sáng
}
```

Bảng màu này lấy trực tiếp từ ảnh cưới ở biển Phú Quốc. Nếu bạn đổi màu,
nhớ giữ `gold` sáng và `sand` đậm — hai màu này dùng ở hai loại nền khác nhau,
đổi lộn sẽ khiến chữ khó đọc.

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
