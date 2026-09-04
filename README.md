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
| `cover.jpg` | Ảnh nền màn hình đầu (toàn cảnh) | **dọc**, 1600 × 2400 |
| `cover-card.jpg` | Ảnh trong khung ở màn hình bìa — cắt cao hơn ngang eo | **dọc 4:5**, 1100 × 1375 |
| `album-1.jpg` → `album-9.jpg` | Album cưới Coverflow (thêm/bớt tuỳ ý) | ảnh **ngang hay dọc đều được** |
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

> **Mọi mốc giờ trong `config.js` là giờ Việt Nam (UTC+7).** Thiệp tự quy đổi
> nên khách ở nước ngoài mở thiệp vẫn thấy đếm ngược và nút "Thêm vào lịch"
> đúng thời điểm. Bạn cứ ghi giờ Việt Nam bình thường.
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
  targetDate: '2026-09-16T17:00:00'   // định dạng YYYY-MM-DDTHH:mm:ss
}
```

### Bước 2b — Thêm ảnh vào album (nhiều hơn 8 ảnh)

Album không giới hạn số ảnh. Có **hai cách**:

**Cách A — chỉ thay ảnh, không sửa code (dễ nhất)**

Đặt tên ảnh của bạn đúng như tên có sẵn rồi chép đè vào `assets/images/`:
`album-1.jpg`, `album-2.jpg`, … `album-5.jpg`. Xong, không cần mở file nào cả.

**Cách B — thêm ảnh thứ 6, 7, 8…**

1. Chép ảnh vào `assets/images/`, ví dụ `album-6.jpg`, `album-7.jpg`
2. Mở `assets/js/config.js`, tìm mục `gallery`, thêm dòng mới vào danh sách:

```js
gallery: {
  photos: [
    { src: 'assets/images/album-1.jpg', caption: 'Nắm tay nhau trên bờ cát' },
    ...
    { src: 'assets/images/album-5.jpg', caption: 'Cùng bước về phía trước' },
    { src: 'assets/images/album-6.jpg', caption: 'Chú thích của bạn' },
    { src: 'assets/images/album-7.jpg', caption: 'Chú thích của bạn' }
  ]
}
```

**Ba quy tắc dễ sai:**

- Mỗi dòng kết thúc bằng dấu phẩy `,` — **trừ dòng cuối cùng** thì không có dấu phẩy.
- Tên file phải **khớp chính xác**, kể cả chữ hoa/thường và đuôi file.
  Điện thoại hay xuất ảnh với đuôi `.JPEG` hoặc `.JPG` viết hoa — phải đổi
  thành `.jpg` chữ thường, nếu không thiệp sẽ không tìm thấy ảnh.
- Không dùng dấu tiếng Việt và khoảng trắng trong tên file. Dùng `anh-cuoi-01.jpg`,
  đừng dùng `ảnh cưới 01.jpg`.

**Muốn bớt ảnh?** Xoá cả dòng đó đi. Lưới sẽ tự sắp xếp lại, không để lỗ trống.

**Chú thích ảnh** (`caption`) hiện ngay dưới ảnh đang xem — viết gì cũng được.

**Kích thước ảnh album:** ảnh ngang hay dọc đều dùng được, **không bị cắt xén**.
Các tấm được xếp cùng chiều cao, bề ngang tự theo tỉ lệ gốc của từng ảnh.

**Album hợp nhất với 5–9 ảnh.** Nhiều hơn vẫn chạy nhưng khách phải vuốt lâu.

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
cover: {
  photo:     'assets/images/anh-bia.jpg',        // ảnh nền toàn cảnh
  cardPhoto: 'assets/images/anh-bia-cat.jpg'     // ảnh trong khung bìa; để '' thì dùng lại photo
}
```

Riêng **Chuyện chúng mình** không dùng ảnh — chỉ có mốc thời gian và nội dung.
Thêm hoặc bớt cột mốc thoải mái, mỗi cột mốc là một khối `{ date, title, text }`
trong `story.items`, dòng thời gian tự sắp lại so le hai bên.

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
| **Album Coverflow 3D** | Kiểu Apple Cover Flow. Vuốt ngang thì cả dãy ảnh chạy theo ngón tay rồi bám vào ảnh gần nhất. Còn có nút mũi tên, phím ←/→, chấm tròn. Bấm ảnh giữa để xem lớn |
| **RSVP** | Gửi về Google Form hoặc API riêng (xem dưới) |
| **Sổ lưu bút** | Khách viết lời chúc, hiển thị ngay |
| **Cánh hoa rơi** | Nhẹ nhàng, tắt được trong `theme.petals` |
| **Tự tắt hiệu ứng** | Tôn trọng cài đặt "giảm chuyển động" của máy khách |

### Gửi lời chào riêng cho từng khách

Thêm `?guest=` vào cuối link khi gửi cho từng người:

```
https://ten-cua-ban.github.io/wedding/?guest=Bạn Đạt
https://ten-cua-ban.github.io/wedding/?guest=Bạn Hoàng
```

Trên bìa thiệp sẽ hiện: *Thân mời **Bạn Đạt***

## 👥 Danh sách khách mời cố định

Mở `assets/js/config.js`, tìm mục **`guests`**:

```js
guests: [
  /* Bạn bè */
  'Bạn Đạt',
  'Bạn Quốc',
  'Bạn Cường'
],
```

**Chỉ những tên trong danh sách này mới hiện lên thiệp.** Ai đó tự sửa link
thành tên khác — kể cả chữ bậy — thiệp sẽ bỏ qua, coi như không có lời chào.

Từ xưng hô viết luôn vào tên — 'Bạn Đạt', 'Cô Ba', 'Anh Minh & chị Thu' —
vì mỗi nhóm khách một cách gọi khác nhau.

Thêm khách: viết thêm một dòng, nhớ dấu phẩy ở cuối dòng trước.
Không phân biệt hoa thường, thừa dấu cách cũng không sao.

Sau khi sửa danh sách, chạy lại `python3 tools/dung-cong-cu.py` để công cụ
gửi thiệp cập nhật theo.

## 📨 Gửi thiệp cho từng khách, mỗi người một tên

Mở file **`tools/gui-thiep.html`** — bấm đúp vào nó, hoặc gửi nó vào Zalo cho
chính mình rồi mở trên điện thoại. **Không cần cài gì, không cần gõ lệnh,
không cần mạng.**

Trang đó có ô **chọn khách từ danh sách** và hai cách gửi:

### Cách 1 — Gửi link

Dán địa chỉ thiệp trên mạng vào ô, rồi bấm **Gửi qua Zalo** (hoặc **Chép link**).
Khách bấm link, ngay trên bìa hiện dòng *Thân mời **Bạn Đạt***.

Cần thiệp đã được đưa lên mạng. Khách cũng cần có mạng để mở.

### Cách 2 — Gửi file

Bấm **Gửi qua Zalo** ở mục "Gửi file". Điện thoại sẽ mở bảng chia sẻ với một
file khoảng 2 MB đã đính sẵn — chọn người cần gửi là xong.

File đó chứa sẵn **toàn bộ ảnh và tên khách bên trong**, nên:

- **không cần đưa thiệp lên mạng** — dùng được ngay hôm nay
- khách **mở được kể cả khi không có mạng**

Máy nào không hiện bảng chia sẻ thì bấm **Tải file về máy** rồi đính kèm thủ công.

> Lúc mở offline, phông chữ trang trí không tải được nên máy dùng phông thay
> thế — chữ hơi khác một chút, bố cục và ảnh vẫn nguyên vẹn.

### Nên chọn cách nào

| | Cách 1 — link | Cách 2 — file |
|---|---|---|
| Cần đưa thiệp lên mạng | có | **không** |
| Khách cần mạng | có | **không** |
| Gửi qua Zalo | một dòng chữ | file 2 MB |
| Sửa thiệp sau khi gửi | khách thấy bản mới ngay | phải gửi lại file |

### Sau mỗi lần sửa thiệp

Chạy lại lệnh này để công cụ mang nội dung mới nhất:

```bash
python3 tools/dung-cong-cu.py
```

Đây là việc của người sửa code, không phải việc của bạn — mỗi lần tôi sửa
thiệp là tôi chạy lại luôn.

Muốn tạo hàng loạt file cùng lúc từ một danh sách thì dùng:

```bash
python3 tools/tao-file-offline.py --danh-sach khach.txt
```

### Nhận lời chúc và xác nhận tham dự về thẳng repo

Trang thiệp chạy trên máy khách nên **nó không tự ghi vào repo được** — muốn
ghi thì phải nhét mật khẩu GitHub vào trang, mà trang thì ai xem mã nguồn
cũng đọc được. Nên dữ liệu đi vòng một nhịp qua Google, rồi máy tự gom về:

```
Khách bấm gửi  →  Google Biểu mẫu  →  Trang tính Google
                                            ↓  (15 phút một lần)
                                     du-lieu/loi-chuc.json   ← thiệp đọc file này
                                     du-lieu/loi-chuc.md     ← đọc bằng mắt
                                     du-lieu/xac-nhan.md     ← bảng ai đến ai không
```

Toàn bộ miễn phí. Làm một lần, mất khoảng 10 phút.

**1. Tạo biểu mẫu.** Vào [forms.google.com](https://forms.google.com), tạo
biểu mẫu mới với đúng 5 câu hỏi (tên câu hỏi đặt sao cũng được, miễn có
những chữ in đậm bên dưới — máy gom dò theo đó):

| Câu hỏi | Kiểu |
| --- | --- |
| Họ và **tên** của bạn | Trả lời ngắn |
| Số **điện thoại** | Trả lời ngắn |
| Bạn có **tham dự** được không? | Trắc nghiệm |
| Bạn là **khách của** ai? | Trắc nghiệm |
| **Lời chúc** gửi cô dâu chú rể | Đoạn văn bản |

**2. Lấy mã của từng ô.** Bấm **Gửi** → chọn biểu tượng `< >` → chép link
biểu mẫu, mở link đó, bấm chuột phải → **Xem nguồn trang**, tìm các chuỗi
`entry.123456789`. Mỗi câu hỏi một chuỗi, theo đúng thứ tự trên. Điền vào
`config.js`:

```js
rsvp: {
  mode: 'form',
  formAction: 'https://docs.google.com/forms/d/e/XXXXX/formResponse',
  fields: {
    name:   'entry.111111',
    phone:  'entry.222222',
    attend: 'entry.333333',
    side:   'entry.555555',
    wish:   'entry.666666'
  }
}
```

**3. Mở trang tính ra ngoài.** Trong biểu mẫu, tab **Câu trả lời** → biểu
tượng trang tính xanh để tạo trang tính. Trong trang tính đó: **Tệp** →
**Chia sẻ** → **Xuất bản lên web** → định dạng **.csv** → **Xuất bản**.
Chép link hiện ra, dán vào file `du-lieu/nguon-google-sheet.txt`.

> Link này ai có cũng đọc được nội dung phản hồi. Đừng hỏi những thứ riêng
> tư hơn tên, số điện thoại và lời chúc.

**4. Cho máy quyền ghi.** Trong repo: **Settings** → **Actions** →
**General** → mục *Workflow permissions* → chọn **Read and write
permissions** → **Save**. Không bật cái này thì máy gom được dữ liệu nhưng
không lưu lại được.

**5. Chạy thử.** Tab **Actions** → *Gom lời chúc về repo* → **Run workflow**.
Xong thì mở `du-lieu/loi-chuc.md` xem có gì chưa.

Từ đó về sau tự chạy 15 phút một lần. Khách viết lời chúc thì thấy ngay trên
máy mình, các khách khác thấy sau chậm nhất 15 phút.

Muốn gom ngay lập tức mà không chờ: `python3 tools/gom-loi-chuc.py`.

**Không muốn dính đến Google?** Để `mode: 'none'` như hiện tại — biểu mẫu
vẫn hiện lời cảm ơn cho đẹp nhưng không có dữ liệu nào chạy về đâu cả, và
lời chúc chỉ nằm trên máy của chính người viết.

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

Ngoài ra trong `style.css` còn `--bronze: #524019` (đồng đậm) dùng riêng cho chữ
nằm trên tấm kính mờ ở bìa và màn hình đầu — kính khá sáng nên chữ phải đậm hơn
mới đọc rõ.

```
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
├── assets/
│   ├── css/style.css       giao diện (không cần sửa)
│   ├── js/
│   │   ├── config.js       ⬅️ SỬA FILE NÀY
│   │   └── main.js         logic (không cần sửa)
│   ├── images/             ⬅️ CHÉP ẢNH VÀO ĐÂY
│   └── music/              ⬅️ CHÉP FILE MP3 VÀO ĐÂY
├── du-lieu/                phản hồi của khách, máy tự ghi vào
│   ├── nguon-google-sheet.txt  ⬅️ DÁN LINK TRANG TÍNH VÀO ĐÂY
│   ├── loi-chuc.json       thiệp đọc file này
│   ├── loi-chuc.md         sổ lưu bút, đọc bằng mắt
│   └── xac-nhan.md         bảng ai đến ai không
└── tools/
    ├── gui-thiep.html      công cụ gửi thiệp cho từng khách
    ├── dung-cong-cu.py     dựng lại file trên sau mỗi lần sửa thiệp
    └── gom-loi-chuc.py     kéo phản hồi từ trang tính về du-lieu/
```

## Lưu ý

- Chưa nối Google Biểu mẫu thì sổ lưu bút chỉ lưu trên trình duyệt của chính
  người viết — bạn không nhận được gì và khách này không đọc được lời chúc của
  khách kia. Xem mục *Nhận lời chúc và xác nhận tham dự về thẳng repo* ở trên.
