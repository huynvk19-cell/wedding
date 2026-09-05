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
    siteTitle: 'Văn Huy ❤ Ngọc Hiếu — Save The Date',
    description: 'Trân trọng kính mời bạn đến chung vui trong ngày hạnh phúc của chúng mình.',
    // Ảnh hiện ra khi dán link lên Facebook/Zalo (nên 1200x630)
    shareImage: 'assets/images/share.jpg',
    favicon: '💍'
  },

  /* ---------- 2. CÔ DÂU & CHÚ RỂ ---------- */
  couple: {
    // Một ảnh chung cho cả mục "Hai chúng mình".
    // Để '' nếu không muốn ảnh — phần này vẫn đẹp khi chỉ có chữ.
    photo: '',
    groom: {
      shortName: 'Văn Huy',
      // Dấu \n là chỗ xuống dòng, CHỈ áp dụng trên điện thoại — để tên
      // hai bên cùng hai dòng, bố cục cân đối.
      fullName: 'Nguyễn\nVăn Huy',
      role: 'Chú rể',
      title: 'Đại hoàng tử',          // danh xưng vui, hiện dưới tên
      father: 'Ông Nguyễn Văn Lượng',
      mother: 'Bà Nguyễn Thị Bé',
      // Để '' nếu không muốn hiện nút mạng xã hội
      facebook: '',
      instagram: ''
    },
    bride: {
      shortName: 'Ngọc Hiếu',
      fullName: 'Nguyễn Thị Ngọc Hiếu',
      role: 'Cô dâu',
      title: 'Trưởng công chúa',      // danh xưng vui, hiện dưới tên
      father: 'Ông Nguyễn Công Nhân',
      mother: 'Bà Nguyễn Thị Ngọc Ánh',
      facebook: '',
      instagram: ''
    },
    // Thứ tự hiện tên ngoài bìa: 'groom-first' hoặc 'bride-first'
    order: 'groom-first'
  },

  /* ---------- 3. BÌA THIỆP (màn hình đầu tiên) ---------- */
  cover: {
    eyebrow: 'Save The Date',
    photo: 'assets/images/cover.jpg',
    // Ảnh riêng cho khung ở màn hình bìa — cắt cao hơn ngang eo để
    // thấy rõ hai người. Để '' thì khung bìa dùng lại ảnh photo ở trên.
    cardPhoto: 'assets/images/cover-card.jpg',
    dateText: '16 . 09 . 2026',
    lunarText: 'Nhằm ngày 06 tháng 08 năm Bính Ngọ',
    openButton: 'Mở thiệp cưới',
    guestGreeting: 'Thân mời'
  },

  /* ---------- 3b. DANH SÁCH KHÁCH MỜI ----------
     CHỈ những tên có trong danh sách này mới hiện lên thiệp.
     Ai đó tự sửa link thành tên khác — kể cả chữ bậy — thiệp sẽ bỏ qua,
     coi như không có lời chào riêng.

     Cách gửi:  .../wedding/?guest=Anh Tuấn
     Thêm khách: viết thêm một dòng vào danh sách bên dưới.
     Không phân biệt hoa thường, thừa dấu cách cũng không sao. */
  guests: [
    /* Bạn bè — từ xưng hô nằm luôn trong tên, thiệp hiện
       "Thân mời / Bạn Đạt". Nhóm khác thì đổi từ xưng hô cho hợp:
       'Cô Ba', 'Chú Tư', 'Anh Minh & chị Thu'... */
    'Bạn Đạt',
    'Bạn Quốc',
    'Bạn Cường',
    'Bạn Nam',
    'Bạn Nhật',
    'Bạn Khiêm',
    'Bạn Mau',
    'Bạn Hoàng'
  ],

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
    signature: 'Văn Huy & Ngọc Hiếu'
  },

  /* ---------- 5. ĐẾM NGƯỢC ---------- */
  countdown: {
    heading: 'Đếm ngược ngày hạnh phúc',
    // ĐỊNH DẠNG: 'YYYY-MM-DDTHH:mm:ss' (giờ Việt Nam)
    targetDate: '2026-09-16T17:00:00',
    labels: { days: 'Ngày', hours: 'Giờ', minutes: 'Phút', seconds: 'Giây' },
    finishedText: 'Hôm nay là ngày chúng mình về chung một nhà ❤'
  },

  /* ---------- 6. CHUYỆN CHÚNG MÌNH ----------
     Mỗi cột mốc chỉ gồm thời gian, tiêu đề và nội dung — không dùng ảnh.
     Thêm hoặc bớt cột mốc thoải mái, dòng thời gian tự sắp lại. */
  story: {
    heading: 'Chuyện chúng mình',
    subheading: 'Một hành trình nhỏ, kể bằng vài cột mốc',
    items: [
      {
        date: '08 . 03 . 2024',
        title: 'Lần đầu gặp nhau',
        text: 'Bầu trời đêm Vũng Tàu... Một chút biển, một chút gió, một chút duyên, ' +
              'hai người lạ vô tình gặp gỡ — để rồi sau đó không còn từ lạ.'
      },
      {
        date: '21 . 03 . 2024',
        title: 'Chính thức yêu nhau',
        text: 'Chẳng biết từ lúc nào những cuộc trò chuyện trở thành điều mong đợi, ' +
              'những lần gặp nhau trở thành niềm vui. Và một ngày, chúng mình nhận ra ' +
              '“lỡ yêu mất rùii...”'
      },
      {
        date: '03 . 08 . 2024',
        title: 'Chuyến đi đầu tiên',
        text: 'Chuyến đi đầu tiên của hai đứa, và cũng là lần thứ hai chúng mình đến Vũng Tàu — nơi mọi thứ đã bắt đầu.'
      },
      {
        date: 'Tháng 05 . 2026',
        title: 'Lời cầu hôn',
        text: 'Không pháo hoa, không đông người, một chiếc nhẫn, ' +
              'một câu hỏi và một cái gật đầu.'
      }
    ]
  },

  /* ---------- 7. CÁC SỰ KIỆN ---------- */
  events: {
    heading: 'Tiệc cưới',
    subheading: 'Rất mong được đón tiếp bạn',
    items: [
      {
        name: 'Tiệc Cưới',
        side: 'Nhà hàng',
        time: '17:00',
        date: 'Thứ Tư, 16 / 09 / 2026',
        lunar: 'Nhằm ngày 06 tháng 08 năm Bính Ngọ',
        venue: 'Nhà hàng Long Phụng 4',
        address: 'Đường vào cáp treo (bãi đất đỏ cũ), Phú Quốc',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nh%C3%A0%20h%C3%A0ng%20Long%20Ph%E1%BB%A5ng%204%20Ph%C3%BA%20Qu%E1%BB%91c',
        // Link Google Maps nhúng (Chia sẻ > Nhúng bản đồ > copy src). Để '' để ẩn bản đồ.
        mapEmbed: ''
      }
    ],
    // Nút "Thêm vào lịch" (Google Calendar)
    calendar: {
      show: true,
      label: 'Thêm vào lịch của bạn',
      title: 'Lễ cưới Văn Huy & Ngọc Hiếu',
      start: '2026-09-16T17:00:00',
      end: '2026-09-16T20:00:00',
      location: 'Nhà hàng Long Phụng 4, đường vào cáp treo (bãi đất đỏ cũ), Phú Quốc'
    }
  },

  /* ---------- 8. ALBUM ẢNH ---------- */
  gallery: {
    heading: 'Album cưới',
    subheading: 'Những khoảnh khắc của chúng mình',
    // Thêm/bớt ảnh thoải mái, lưới sẽ tự sắp xếp
    // Hai ảnh khổ ngang đặt ở ĐẦU và CUỐI dãy; ở giữa là các ảnh dọc.
    // Album mở sẵn ở tấm chính giữa dãy.
    photos: [
      { src: 'assets/images/album-6.jpg' },
      { src: 'assets/images/album-1.jpg' },
      { src: 'assets/images/album-2.jpg' },
      { src: 'assets/images/album-3.jpg' },
      { src: 'assets/images/album-4.jpg' },
      { src: 'assets/images/album-5.jpg' },
      { src: 'assets/images/album-7.jpg' },
      { src: 'assets/images/album-8.jpg' },
      { src: 'assets/images/album-9.jpg' }
    ]
  },

  /* ---------- 9. XÁC NHẬN THAM DỰ (RSVP) ---------- */
  rsvp: {
    show: true,
    heading: 'Xác nhận tham dự',
    subheading: 'Vui lòng phản hồi trước ngày 05 / 09 / 2026',
    // CÁCH GỬI DỮ LIỆU — chọn 1 trong 3:
    //   'none'   : chỉ hiện lời cảm ơn, không gửi đi đâu (mặc định, dùng để xem thử)
    //   'form'   : gửi vào Google Form (điền formAction + các entry.xxx bên dưới)
    //   'script' : gửi vào Google Apps Script / API riêng (điền endpoint)
    mode: 'form',
    formAction: 'https://docs.google.com/forms/d/e/1FAIpQLSd-aSnjP70NbSuyRidz0-nwDwCcqqwxNVLixIBxeqNQcAFfaQ/formResponse',
    fields: {                 // mã của từng ô trong biểu mẫu "Thiệp cưới"
      name:   'entry.1113735082',   // Tên
      phone:  'entry.152445501',    // Điện thoại
      attend: 'entry.643892986',    // Tham dự
      side:   'entry.2043935380',   // Khách của ai
      wish:   'entry.424843775'     // Lời chúc
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
    emptyText: 'Chưa có lời chúc nào — hãy là người đầu tiên nhé!',
    // Địa chỉ đọc lời chúc của mọi khách, để ai vào cũng đọc được của nhau.
    // Lấy từ Apps Script — xem tools/apps-script/HUONG-DAN.md.
    // Để trống thì mỗi khách chỉ thấy lời chúc của chính mình.
    source: '',
    // Lời chúc hiện sẵn trên thiệp. Để trống thì thiệp chỉ hiện dòng
    // emptyText ở trên cho tới khi có người viết.
    seed: []
  },

  /* ---------- 11. NHẠC NỀN ---------- */
  music: {
    show: true,
    // Chép file .mp3 vào assets/music/ rồi sửa đường dẫn
    src: 'assets/music/song.mp3',
    // Tự phát ngay khi khách bấm "Mở thiệp cưới"
    autoplayOnOpen: true,
    title: 'Nhạc nền'
  },

  /* ---------- 12. LỜI KẾT ---------- */
  footer: {
    heading: 'Cảm ơn bạn',
    text: 'Sự hiện diện của bạn là niềm vinh hạnh lớn nhất của gia đình chúng mình.',
    names: 'Văn Huy & Ngọc Hiếu',
    date: '16 . 09 . 2026'
  },

  /* ---------- 13. GIAO DIỆN ---------- */
  theme: {
    // Bảng màu lấy từ ảnh cưới ở biển Phú Quốc.
    // Đổi tông màu tại đây nếu muốn.
    deep: '#2A4257',       // xanh biển sâu — màu chủ đạo
    accent: '#3F657E',     // xanh biển vừa — màu nhấn
    cream: '#F4F1EA',      // cát ngà — nền
    ink: '#232E36',        // chữ
    gold: '#CFAF74',       // vàng cát sáng — dùng trên nền tối
    sand: '#7E6030',       // vàng cát đậm — dùng trên nền sáng
    // Hiệu ứng cánh hoa rơi nhẹ
    petals: true,
    // Menu điều hướng dạng chấm bên phải
    navDots: true
  }
};
