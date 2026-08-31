/* ============================================================
   THIỆP CƯỚI ONLINE — MINIMALISM ĐỎ ĐÔ
   ------------------------------------------------------------
   ĐÂY LÀ FILE DUY NHẤT BẠN CẦN SỬA.
   Thay chữ trong dấu nháy '' và đổi đường dẫn ảnh là xong.

   HƯỚNG DẪN THAY ẢNH:
   1. Chép ảnh của bạn vào thư mục  assets/images/
   2. Sửa đường dẫn bên dưới, ví dụ:
        cover: 'assets/images/anh-bia.jpg'
   3. Ảnh nên nén dưới 500KB để thiệp load nhanh.
   ============================================================ */

window.WEDDING_CONFIG = {

  /* ---------- 1. THÔNG TIN CHUNG ---------- */
  meta: {
    // Hiện trên tab trình duyệt và khi chia sẻ Zalo/Facebook
    siteTitle: 'Minh Quân ❤ Thảo Vy — Save The Date',
    description: 'Trân trọng kính mời bạn đến chung vui trong ngày hạnh phúc của chúng mình.',
    // Ảnh hiện ra khi dán link lên Facebook/Zalo (nên 1200x630)
    shareImage: 'assets/images/share.jpg',
    favicon: '💍'
  },

  /* ---------- 2. CÔ DÂU & CHÚ RỂ ---------- */
  couple: {
    groom: {
      shortName: 'Minh Quân',
      fullName: 'Nguyễn Minh Quân',
      role: 'Chú rể',
      photo: 'assets/images/groom.jpg',
      quote: 'Anh sẽ nắm tay em, đi hết những mùa còn lại của cuộc đời.',
      father: 'Ông Nguyễn Văn Hùng',
      mother: 'Bà Trần Thị Lan',
      address: 'Số 12, Đường Lê Lợi, P. Bến Nghé, Q.1, TP. Hồ Chí Minh',
      // Để '' nếu không muốn hiện nút mạng xã hội
      facebook: 'https://facebook.com/',
      instagram: ''
    },
    bride: {
      shortName: 'Thảo Vy',
      fullName: 'Lê Thảo Vy',
      role: 'Cô dâu',
      photo: 'assets/images/bride.jpg',
      quote: 'Cảm ơn anh đã đến, và ở lại thật lâu trong đời em.',
      father: 'Ông Lê Quang Minh',
      mother: 'Bà Phạm Thị Hoa',
      address: 'Số 88, Đường Nguyễn Huệ, P. Tân An, TP. Cần Thơ',
      facebook: 'https://facebook.com/',
      instagram: ''
    },
    // Thứ tự hiện tên ngoài bìa: 'groom-first' hoặc 'bride-first'
    order: 'groom-first'
  },

  /* ---------- 3. BÌA THIỆP (màn hình đầu tiên) ---------- */
  cover: {
    eyebrow: 'Save The Date',
    photo: 'assets/images/cover.jpg',
    dateText: '20 . 12 . 2026',
    lunarText: 'Nhằm ngày 03 tháng 11 năm Bính Ngọ',
    openButton: 'Mở thiệp cưới',
    // Lời chào riêng cho từng khách: gửi link kèm ?guest=Anh Tuấn
    guestGreeting: 'Thân mời'
  },

  /* ---------- 4. LỜI MỞ ĐẦU ---------- */
  intro: {
    heading: 'Save The Date',
    lines: [
      'Có những điều đẹp nhất trên đời',
      'không thể nhìn hay chạm tới,',
      'mà phải cảm nhận bằng trái tim.'
    ],
    message:
      'Chúng mình đã đi cùng nhau qua rất nhiều mùa, và hôm nay, chúng mình muốn ' +
      'bắt đầu một hành trình mới — cùng một mái nhà. Sẽ thật trọn vẹn nếu có bạn ' +
      'ở đó, cùng chúng mình cất tiếng cười trong ngày trọng đại.',
    signature: 'Minh Quân & Thảo Vy'
  },

  /* ---------- 5. ĐẾM NGƯỢC ---------- */
  countdown: {
    heading: 'Đếm ngược ngày hạnh phúc',
    // ĐỊNH DẠNG: 'YYYY-MM-DDTHH:mm:ss' (giờ Việt Nam)
    targetDate: '2026-12-20T11:00:00',
    labels: { days: 'Ngày', hours: 'Giờ', minutes: 'Phút', seconds: 'Giây' },
    finishedText: 'Hôm nay là ngày chúng mình về chung một nhà ❤'
  },

  /* ---------- 6. CHUYỆN CHÚNG MÌNH ---------- */
  story: {
    heading: 'Chuyện chúng mình',
    subheading: 'Một hành trình nhỏ, kể bằng vài cột mốc',
    items: [
      {
        date: 'Tháng 09, 2019',
        title: 'Lần đầu gặp nhau',
        text: 'Một buổi chiều Sài Gòn mưa bất chợt, hai người trú chung một mái hiên và câu chuyện bắt đầu từ đó.',
        photo: 'assets/images/story-1.jpg'
      },
      {
        date: 'Tháng 02, 2021',
        title: 'Chính thức yêu',
        text: 'Sau rất nhiều tin nhắn lúc nửa đêm và những chuyến đi không hẹn trước, chúng mình quyết định đi chung một đường.',
        photo: 'assets/images/story-2.jpg'
      },
      {
        date: 'Tháng 06, 2024',
        title: 'Chuyến đi đầu tiên',
        text: 'Đà Lạt sương mù, một tách cà phê và lời hứa sẽ cùng nhau đi thật nhiều nơi nữa.',
        photo: 'assets/images/story-3.jpg'
      },
      {
        date: 'Tháng 04, 2026',
        title: 'Lời cầu hôn',
        text: 'Không pháo hoa, không đông người — chỉ có một chiếc nhẫn, một câu hỏi và một cái gật đầu.',
        photo: 'assets/images/story-4.jpg'
      }
    ]
  },

  /* ---------- 7. CÁC SỰ KIỆN ---------- */
  events: {
    heading: 'Sự kiện cưới',
    subheading: 'Rất mong được đón tiếp bạn',
    items: [
      {
        name: 'Lễ Vu Quy',
        side: 'Nhà gái',
        time: '09:00',
        date: 'Chủ Nhật, 20 / 12 / 2026',
        lunar: 'Ngày 03 tháng 11 năm Bính Ngọ',
        venue: 'Tư gia nhà gái',
        address: 'Số 88, Đường Nguyễn Huệ, P. Tân An, TP. Cần Thơ',
        mapUrl: 'https://maps.google.com/?q=Nguyen+Hue+Can+Tho',
        // Link Google Maps nhúng (Chia sẻ > Nhúng bản đồ > copy src). Để '' để ẩn bản đồ.
        mapEmbed: ''
      },
      {
        name: 'Lễ Thành Hôn',
        side: 'Nhà trai',
        time: '11:00',
        date: 'Chủ Nhật, 20 / 12 / 2026',
        lunar: 'Ngày 03 tháng 11 năm Bính Ngọ',
        venue: 'Tư gia nhà trai',
        address: 'Số 12, Đường Lê Lợi, P. Bến Nghé, Q.1, TP. Hồ Chí Minh',
        mapUrl: 'https://maps.google.com/?q=Le+Loi+Quan+1+HCM',
        mapEmbed: ''
      },
      {
        name: 'Tiệc Cưới',
        side: 'Nhà hàng',
        time: '18:00',
        date: 'Chủ Nhật, 20 / 12 / 2026',
        lunar: 'Ngày 03 tháng 11 năm Bính Ngọ',
        venue: 'Trung tâm Hội nghị Riverside Palace',
        address: '360D Bến Vân Đồn, P.1, Q.4, TP. Hồ Chí Minh',
        mapUrl: 'https://maps.google.com/?q=Riverside+Palace+Ben+Van+Don',
        mapEmbed: ''
      }
    ],
    // Nút "Thêm vào lịch" (Google Calendar)
    calendar: {
      show: true,
      label: 'Thêm vào lịch của bạn',
      title: 'Lễ cưới Minh Quân & Thảo Vy',
      start: '2026-12-20T18:00:00',
      end: '2026-12-20T21:00:00',
      location: 'Riverside Palace, 360D Bến Vân Đồn, Q.4, TP.HCM'
    }
  },

  /* ---------- 8. ALBUM ẢNH ---------- */
  gallery: {
    heading: 'Album cưới',
    subheading: 'Những khoảnh khắc của chúng mình',
    // Thêm/bớt ảnh thoải mái, lưới sẽ tự sắp xếp
    photos: [
      { src: 'assets/images/gallery-1.jpg', caption: 'Khoảnh khắc 01' },
      { src: 'assets/images/gallery-2.jpg', caption: 'Khoảnh khắc 02' },
      { src: 'assets/images/gallery-3.jpg', caption: 'Khoảnh khắc 03' },
      { src: 'assets/images/gallery-4.jpg', caption: 'Khoảnh khắc 04' },
      { src: 'assets/images/gallery-5.jpg', caption: 'Khoảnh khắc 05' },
      { src: 'assets/images/gallery-6.jpg', caption: 'Khoảnh khắc 06' },
      { src: 'assets/images/gallery-7.jpg', caption: 'Khoảnh khắc 07' },
      { src: 'assets/images/gallery-8.jpg', caption: 'Khoảnh khắc 08' }
    ]
  },

  /* ---------- 9. XÁC NHẬN THAM DỰ (RSVP) ---------- */
  rsvp: {
    show: true,
    heading: 'Xác nhận tham dự',
    subheading: 'Vui lòng phản hồi trước ngày 10 / 12 / 2026',
    // CÁCH GỬI DỮ LIỆU — chọn 1 trong 3:
    //   'none'   : chỉ hiện lời cảm ơn, không gửi đi đâu (mặc định, dùng để xem thử)
    //   'form'   : gửi vào Google Form (điền formAction + các entry.xxx bên dưới)
    //   'script' : gửi vào Google Apps Script / API riêng (điền endpoint)
    mode: 'none',
    formAction: '',           // https://docs.google.com/forms/d/e/XXX/formResponse
    fields: {                 // mã entry lấy từ Google Form
      name: 'entry.111111',
      phone: 'entry.222222',
      attend: 'entry.333333',
      guests: 'entry.444444',
      side: 'entry.555555',
      wish: 'entry.666666'
    },
    endpoint: '',             // dùng khi mode = 'script'
    options: {
      attend: ['Chắc chắn có mặt', 'Rất tiếc, mình không đến được'],
      side: ['Khách nhà trai', 'Khách nhà gái', 'Bạn của cô dâu & chú rể']
    },
    successText: 'Cảm ơn bạn rất nhiều! Chúng mình đã nhận được phản hồi và rất mong gặp bạn trong ngày vui ❤'
  },

  /* ---------- 10. SỔ LƯU BÚT ---------- */
  wishes: {
    show: true,
    heading: 'Sổ lưu bút',
    subheading: 'Gửi đôi lời chúc đến cô dâu chú rể',
    placeholder: 'Viết lời chúc của bạn...',
    submitText: 'Gửi lời chúc',
    // Lời chúc mẫu hiển thị sẵn (bạn có thể xoá hết)
    seed: [
      { name: 'Gia đình Hoàng Anh', text: 'Chúc hai em trăm năm hạnh phúc, đầu bạc răng long!' },
      { name: 'Ngọc Trâm', text: 'Cuối cùng cũng tới ngày này. Chúc hai đứa mãi thương nhau như hôm nay nhé!' },
      { name: 'Team Marketing', text: 'Chúc anh chị hạnh phúc viên mãn, sớm có tin vui ạ!' }
    ]
  },

  /* ---------- 11. MỪNG CƯỚI ---------- */
  gift: {
    show: true,
    heading: 'Hộp mừng cưới',
    subheading: 'Sự hiện diện của bạn là món quà quý nhất. Nếu ở xa, bạn có thể gửi lời chúc qua đây.',
    accounts: [
      {
        label: 'Chú rể',
        bank: 'Vietcombank',
        number: '0123456789',
        holder: 'NGUYEN MINH QUAN',
        // Ảnh QR của bạn (VietQR / ảnh chụp QR ngân hàng)
        qr: 'assets/images/qr-groom.jpg'
      },
      {
        label: 'Cô dâu',
        bank: 'Techcombank',
        number: '9876543210',
        holder: 'LE THAO VY',
        qr: 'assets/images/qr-bride.jpg'
      }
    ],
    copyText: 'Sao chép số tài khoản',
    copiedText: 'Đã sao chép!'
  },

  /* ---------- 12. NHẠC NỀN ---------- */
  music: {
    show: true,
    // Chép file .mp3 vào assets/music/ rồi sửa đường dẫn
    src: 'assets/music/song.mp3',
    // Tự phát ngay khi khách bấm "Mở thiệp cưới"
    autoplayOnOpen: true,
    title: 'Nhạc nền'
  },

  /* ---------- 13. LỜI KẾT ---------- */
  footer: {
    heading: 'Cảm ơn bạn',
    text: 'Sự hiện diện của bạn là niềm vinh hạnh lớn nhất của gia đình chúng mình.',
    names: 'Minh Quân & Thảo Vy',
    date: '20 . 12 . 2026'
  },

  /* ---------- 14. GIAO DIỆN ---------- */
  theme: {
    // Đổi tông màu tại đây nếu muốn
    burgundy: '#6E1621',   // đỏ đô chủ đạo
    red: '#96202E',        // đỏ nhấn
    cream: '#FBF6EF',      // nền kem
    ink: '#2A2422',        // chữ
    gold: '#B98A44',       // ánh kim
    // Hiệu ứng cánh hoa rơi nhẹ
    petals: true,
    // Menu điều hướng dạng chấm bên phải
    navDots: true
  }
};
