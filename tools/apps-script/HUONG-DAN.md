# Để mọi khách cùng đọc được lời chúc của nhau

Thiệp là trang tĩnh, không tự chứa được dữ liệu. Nên cần một địa chỉ để nó
hỏi "có những lời chúc nào rồi?". Địa chỉ đó do Google dựng, miễn phí.

Làm một lần, khoảng 5 phút. **Nên làm trên máy tính**, trên iPad cũng được
nhưng menu hơi bé.

## 1. Tạo trang tính chứa câu trả lời

Mở biểu mẫu **Thiệp cưới**, tab **Câu trả lời**, bấm biểu tượng trang tính
màu xanh, chọn **Tạo bảng tính mới**.

Trang tính vừa mở ra chính là nơi mọi phản hồi rơi vào.

## 2. Dán đoạn mã

Trong **trang tính** đó (không phải trong biểu mẫu):

1. **Tiện ích mở rộng** > **Apps Script**
2. Xoá sạch đoạn `function myFunction() {}` có sẵn
3. Mở file `Code.gs` nằm cạnh file này, chép toàn bộ, dán vào
4. Bấm biểu tượng đĩa mềm để lưu

## 3. Triển khai

1. Góc trên bên phải: **Triển khai** > **Tuỳ chọn triển khai mới**
2. Bấm bánh răng bên trái, chọn **Ứng dụng web**
3. Điền:
   - *Thực thi với tư cách*: **Tôi**
   - *Người có quyền truy cập*: **Bất kỳ ai**
     (chọn sai chỗ này là thiệp không đọc được)
4. **Triển khai**
5. Google hỏi quyền: **Cho phép quyền truy cập**, chọn tài khoản của bạn.
   Gặp màn hình "Google chưa xác minh ứng dụng này" thì bấm **Nâng cao**,
   rồi **Chuyển đến ... (không an toàn)**, rồi **Cho phép**. Cảnh báo đó là
   vì đoạn mã do bạn tự viết chứ không phải hàng của Google.
6. Chép **URL ứng dụng web**, dạng
   `https://script.google.com/macros/s/AKfycb..../exec`

## 4. Đưa địa chỉ đó vào thiệp

Mở `assets/js/config.js`, tìm mục `wishes`, dán vào dòng `source`:

```js
source: 'https://script.google.com/macros/s/AKfycb..../exec',
```

Xong. Khách nào vào thiệp cũng đọc được lời chúc của mọi người.

## Kiểm tra

Dán thẳng địa chỉ `.../exec` vào trình duyệt. Đúng thì thấy một dòng kiểu:

```json
[{"name":"Bạn Đạt","text":"Chúc hai bạn trăm năm hạnh phúc!"}]
```

Thấy `[]` nghĩa là chưa ai gửi lời chúc, bình thường. Thấy trang báo lỗi
hoặc đòi đăng nhập thì bước 3 chọn nhầm *Người có quyền truy cập*, làm lại.

## Có lộ gì không

Đoạn mã chỉ trả về **tên và lời chúc**, đúng những thứ vốn hiện công khai
trên thiệp. Số điện thoại khách để lại nằm yên trong trang tính, không đi
đâu cả.

## Sửa lại đoạn mã sau này

Mỗi lần sửa `Code.gs` phải **Triển khai** > **Quản lý triển khai** > bút chì
> *Phiên bản*: **Phiên bản mới** > **Triển khai**. Chỉ bấm lưu thôi thì địa
chỉ cũ vẫn chạy mã cũ.
