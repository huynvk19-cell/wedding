/**
 * Trả lời chúc của mọi khách về cho thiệp cưới hiện lên.
 *
 * Dán toàn bộ file này vào Apps Script của trang tính chứa câu trả lời
 * biểu mẫu "Thiệp cưới", rồi triển khai thành ứng dụng web.
 * Hướng dẫn từng bước: HUONG-DAN.md nằm cạnh file này.
 *
 * CHỈ trả về tên và lời chúc. Số điện thoại của khách không bao giờ ra khỏi
 * trang tính — địa chỉ này ai có cũng gọi được, nên đừng trả thêm gì khác.
 */

function doGet() {
  var out = [];
  try {
    out = docLoiChuc();
  } catch (e) {
    out = [];
  }
  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Bỏ dấu tiếng Việt để dò tên cột, vì mỗi người đặt tên câu hỏi một kiểu. */
function boDau(s) {
  return String(s)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim();
}

function docLoiChuc() {
  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  var bang = sheet.getDataRange().getValues();
  if (bang.length < 2) return [];

  var cotTen = -1, cotChuc = -1;
  for (var i = 0; i < bang[0].length; i++) {
    var goi = boDau(bang[0][i]);
    if (cotChuc < 0 && (goi.indexOf('loi chuc') >= 0 || goi.indexOf('loi nhan') >= 0)) {
      cotChuc = i;
    } else if (cotTen < 0 && goi.indexOf('ten') >= 0) {
      cotTen = i;
    }
  }
  if (cotTen < 0 || cotChuc < 0) return [];

  var ra = [], daCo = {};
  for (var d = 1; d < bang.length; d++) {
    var ten = String(bang[d][cotTen] || '').trim();
    var chuc = String(bang[d][cotChuc] || '').trim();
    if (!ten || !chuc) continue;
    var khoa = ten + ' ' + chuc;
    if (daCo[khoa]) continue;
    daCo[khoa] = true;
    ra.push({ name: ten, text: chuc });
  }
  /* Giữ 200 lời chúc gần nhất cho thiệp nhẹ. */
  return ra.slice(-200);
}
