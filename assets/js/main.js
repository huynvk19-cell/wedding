/* ============================================================
   MINIMALISM ĐỎ ĐÔ — logic hiển thị
   Toàn bộ nội dung được đọc từ assets/js/config.js
   Bạn KHÔNG cần sửa file này.
   ============================================================ */
(function () {
  'use strict';

  var C = window.WEDDING_CONFIG;
  if (!C) { console.error('Thiếu file config.js'); return; }

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  var text = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v || ''; };

  /* Mọi mốc thời gian trong config.js là GIỜ VIỆT NAM (UTC+7).
     Nếu không ghi rõ múi giờ, trình duyệt sẽ hiểu theo giờ máy của khách —
     khách ở nước ngoài sẽ thấy đếm ngược và lịch sai giờ. */
  var VN_OFFSET = '+07:00';
  var parseVN = function (str) {
    if (!str) return new Date(NaN);
    return new Date(/([+-]\d{2}:?\d{2}|Z)$/.test(str) ? str : str + VN_OFFSET);
  };

  /* ---------------------------------------------------------
     0. Theme + meta
     --------------------------------------------------------- */
  function applyTheme() {
    var t = C.theme || {}, root = document.documentElement.style;
    if (t.deep)   root.setProperty('--deep', t.deep);
    if (t.accent) root.setProperty('--accent', t.accent);
    if (t.cream)  root.setProperty('--cream', t.cream);
    if (t.ink)    root.setProperty('--ink', t.ink);
    if (t.gold)   root.setProperty('--gold', t.gold);
    if (t.sand)   root.setProperty('--sand', t.sand);

    var m = C.meta || {};
    document.title = m.siteTitle || document.title;
    var d = $('meta[name="description"]'); if (d) d.content = m.description || '';
    var ot = $('#ogTitle'); if (ot) ot.content = m.siteTitle || '';
    var od = $('#ogDesc');  if (od) od.content = m.description || '';
    var oi = $('#ogImage'); if (oi && m.shareImage) oi.content = new URL(m.shareImage, location.href).href;

    if (m.favicon) {
      var link = document.createElement('link');
      link.rel = 'icon';
      link.href = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
        '<text x="50" y="78" font-size="78" text-anchor="middle">' + m.favicon + '</text></svg>'
      );
      document.head.appendChild(link);
    }
  }

  /* Tên đôi theo thứ tự đã chọn */
  function pairNames(sep) {
    var g = C.couple.groom.shortName, b = C.couple.bride.shortName;
    var first = C.couple.order === 'bride-first' ? b : g;
    var second = C.couple.order === 'bride-first' ? g : b;
    return first + (sep || ' & ') + second;
  }
  function pairNamesHtml(ampClass) {
    var g = esc(C.couple.groom.shortName), b = esc(C.couple.bride.shortName);
    var first = C.couple.order === 'bride-first' ? b : g;
    var second = C.couple.order === 'bride-first' ? g : b;
    return first + '<span class="' + ampClass + '">&amp;</span>' + second;
  }

  /* ---------------------------------------------------------
     1. Bìa thiệp
     --------------------------------------------------------- */
  function buildCover() {
    var cv = C.cover || {};
    /* Khung bìa dùng ảnh đã cắt cao hơn ngang eo nếu có, để hai người
       hiện rõ trong khung nhỏ; không có thì dùng lại ảnh toàn cảnh. */
    var cardSrc = cv.cardPhoto || cv.photo;
    if (cardSrc) {
      $('#coverImg').src = cardSrc;
      $('#coverImg').alt = pairNames();
      /* quầng sáng dùng lại chính bức ảnh, làm nhoè phía sau tấm hình */
      $('#coverGlow').style.backgroundImage = 'url("' + cardSrc + '")';
    }

    text('coverEyebrow', cv.eyebrow);
    $('#coverNames').innerHTML = pairNamesHtml('cover__amp');
    text('coverDate', cv.dateText);
    text('coverLunar', cv.lunarText);
    $('#openBtn').textContent = cv.openButton || 'Mở thiệp';

    /* Lời chào riêng cho từng khách. Hai đường:
       - bản online: link dạng  index.html?guest=Anh%20Tuấn
       - bản offline một file: tên khách được ghi sẵn vào window.__GUEST__
         (file mở bằng cách bấm đúp thì không có phần ?guest= trên địa chỉ) */
    var guest = window.__GUEST__ || new URLSearchParams(location.search).get('guest');
    if (guest) {
      guest = guest.replace(/[<>]/g, '').trim().slice(0, 60);
      if (guest) {
        var el = $('#coverGuest');
        el.innerHTML = esc(cv.guestGreeting || 'Thân mời') + ' <b>' + esc(guest) + '</b>';
        el.hidden = false;
      }
    }
  }

  function buildHero() {
    var cv = C.cover || {};
    var bg = $('#heroBg');
    if (bg) bg.style.backgroundImage = 'url("' + (cv.photo || '') + '")';
    text('heroEyebrow', 'Chúng mình sắp kết hôn');
    $('#heroNames').innerHTML = pairNamesHtml('hero__amp');
    text('heroDate', cv.dateText);
  }

  /* ---------------------------------------------------------
     2. Lời mở đầu
     --------------------------------------------------------- */
  function buildIntro() {
    var i = C.intro || {};
    text('introEyebrow', i.heading);
    $('#introLines').innerHTML = (i.lines || []).map(esc).join('<br>');
    text('introMsg', i.message);
    text('introSign', i.signature || pairNames());
  }

  /* ---------------------------------------------------------
     3. Cô dâu & chú rể
     --------------------------------------------------------- */
  function personHtml(p, delay) {
    var social = '';
    if (p.facebook || p.instagram) {
      social = '<div class="person__social">' +
        (p.facebook ? '<a href="' + esc(p.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">f</a>' : '') +
        (p.instagram ? '<a href="' + esc(p.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">ig</a>' : '') +
        '</div>';
    }
    return '<div class="person reveal" data-delay="' + delay + '">' +
      '<p class="person__role">' + esc(p.role) + '</p>' +
      '<h3 class="person__name">' +
        /* thêm khoảng trắng trước chỗ ngắt: khi ẩn ngắt dòng trên máy tính,
           hai vế vẫn cách nhau chứ không dính liền */
        esc(p.fullName).replace(/\n/g, ' <br class="nb">') + '</h3>' +
      (p.title ? '<p class="person__title">' + esc(p.title) + '</p>' : '') +
      '<div class="person__parents"><b>Gia đình</b>' +
        (p.father ? '<span>' + esc(p.father) + '</span>' : '') +
        (p.mother ? '<span>' + esc(p.mother) + '</span>' : '') +
        (p.address ? '<p class="person__addr">' + esc(p.address) + '</p>' : '') +
      '</div>' + social +
      '</div>';
  }

  function buildCouple() {
    /* Một ảnh chung cho cả mục — bỏ trống trong config thì phần này thuần chữ */
    var photo = $('#couplePhoto');
    if (C.couple.photo) {
      photo.innerHTML = '<img src="' + esc(C.couple.photo) + '" alt="' +
        esc(pairNames()) + '" loading="lazy">';
    } else {
      photo.remove();
    }

    var g = personHtml(C.couple.groom, 1);
    var b = personHtml(C.couple.bride, 2);
    var divider = '<div class="couple__divider reveal"><i></i><span class="couple__heart">&amp;</span><i></i></div>';
    $('#coupleWrap').innerHTML =
      (C.couple.order === 'bride-first' ? b + divider + g : g + divider + b);
  }

  /* ---------------------------------------------------------
     4. Đếm ngược
     --------------------------------------------------------- */
  function buildCountdown() {
    var cd = C.countdown || {};
    text('cdHeading', cd.heading);
    var box = $('#countdown');
    var target = parseVN(cd.targetDate).getTime();

    if (isNaN(target)) {
      box.innerHTML = '<p class="cd__done">Chưa đặt ngày cưới trong config.js</p>';
      return;
    }
    var L = cd.labels || {};
    var keys = [['days', L.days || 'Ngày'], ['hours', L.hours || 'Giờ'],
                ['minutes', L.minutes || 'Phút'], ['seconds', L.seconds || 'Giây']];

    box.innerHTML = keys.map(function (k) {
      return '<div class="cd__box"><span class="cd__num" data-cd="' + k[0] + '">00</span>' +
             '<span class="cd__label">' + esc(k[1]) + '</span></div>';
    }).join('');

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        box.innerHTML = '<p class="cd__done">' + esc(cd.finishedText || 'Hôm nay là ngày cưới!') + '</p>';
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      var val = {
        days: Math.floor(s / 86400),
        hours: Math.floor(s % 86400 / 3600),
        minutes: Math.floor(s % 3600 / 60),
        seconds: s % 60
      };
      $$('[data-cd]', box).forEach(function (el) {
        el.textContent = pad(val[el.getAttribute('data-cd')]);
      });
    }
    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------
     5. Chuyện chúng mình
     --------------------------------------------------------- */
  function buildStory() {
    var s = C.story || {};
    text('storyHeading', s.heading);
    text('storySub', s.subheading);
    $('#timeline').innerHTML = (s.items || []).map(function (it) {
      return '<article class="tl reveal">' +
        '<div class="tl__spacer" aria-hidden="true"></div>' +
        '<div class="tl__dot"></div>' +
        '<div class="tl__body">' +
          '<p class="tl__date">' + esc(it.date) + '</p>' +
          '<h3>' + esc(it.title) + '</h3>' +
          '<p>' + esc(it.text) + '</p>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ---------------------------------------------------------
     6. Sự kiện
     --------------------------------------------------------- */
  function buildEvents() {
    var e = C.events || {};
    text('eventsHeading', e.heading);
    text('eventsSub', e.subheading);

    $('#eventsWrap').innerHTML = (e.items || []).map(function (it, i) {
      return '<article class="event reveal" data-delay="' + (i % 3) + '">' +
        '<p class="event__side">' + esc(it.side) + '</p>' +
        '<h3 class="event__name">' + esc(it.name) + '</h3>' +
        '<p class="event__time">' + esc(it.time) + '</p>' +
        '<p class="event__date">' + esc(it.date) + '</p>' +
        '<p class="event__lunar">' + esc(it.lunar) + '</p>' +
        '<p class="event__venue">' + esc(it.venue) + '</p>' +
        '<p class="event__addr">' + esc(it.address) + '</p>' +
        (it.mapUrl ? '<div class="event__cta"><a class="btn btn--ghost" href="' + esc(it.mapUrl) +
          '" target="_blank" rel="noopener">Xem bản đồ</a></div>' : '') +
        (it.mapEmbed ? '<div class="event__map"><iframe src="' + esc(it.mapEmbed) +
          '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Bản đồ ' + esc(it.name) + '"></iframe></div>' : '') +
      '</article>';
    }).join('');

    var cal = e.calendar || {};
    if (cal.show) {
      var fmt = function (d) {
        var t = parseVN(d);
        return isNaN(t) ? '' : t.toISOString().replace(/[-:]|\.\d{3}/g, '');
      };
      var url = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(cal.title || pairNames()) +
        '&dates=' + fmt(cal.start) + '/' + fmt(cal.end) +
        '&location=' + encodeURIComponent(cal.location || '') +
        '&details=' + encodeURIComponent(C.meta.description || '');
      $('#calendarWrap').innerHTML =
        '<a class="btn" href="' + esc(url) + '" target="_blank" rel="noopener">' +
        esc(cal.label || 'Thêm vào lịch') + '</a>';
    }
  }

  /* ---------------------------------------------------------
     7. Album — Coverflow 3D (kiểu Apple)
     Nhận mọi khổ ảnh: các tấm cùng CHIỀU CAO, bề ngang theo đúng
     tỉ lệ gốc nên ảnh ngang và ảnh dọc đứng cạnh nhau đều không bị cắt.
     Vuốt ngang thì cả dãy ảnh chạy theo ngón tay rồi bám vào ảnh gần nhất.
     --------------------------------------------------------- */
  function buildGallery() {
    var g = C.gallery || {};
    text('galleryHeading', g.heading);
    text('gallerySub', g.subheading);

    var photos = g.photos || [];
    if (!photos.length) { $('#cf').remove(); return; }

    var stage = $('#cfStage'), dotsEl = $('#cfDots');

    stage.innerHTML = photos.map(function (p, i) {
      var nhan = 'Ảnh cưới ' + (i + 1) + ' trong ' + photos.length;
      return '<button class="cf__item" type="button" data-i="' + i + '" role="option" ' +
        'aria-label="' + nhan + '">' +
        '<img src="' + esc(p.src) + '" alt="' + nhan + '" draggable="false">' +
        '</button>';
    }).join('');

    dotsEl.innerHTML = photos.map(function (p, i) {
      return '<button class="cf__dot" type="button" data-i="' + i +
             '" aria-label="Ảnh ' + (i + 1) + '"></button>';
    }).join('');

    var items = $$('.cf__item', stage);
    var dots  = $$('.cf__dot', dotsEl);
    var cur   = Math.floor(photos.length / 2);
    var frac  = 0;                     /* độ lệch khi đang vuốt, tính theo số ảnh */

    /* Ảnh mới tải xong thì bề ngang mới biết được -> xếp lại */
    $$('.cf__item img', stage).forEach(function (im) {
      if (!im.complete) im.addEventListener('load', function () { layout(); });
    });

    var unitPx = 200;                  /* quãng đường vuốt đổi một ảnh */

    function layout() {
      var sw = stage.clientWidth || 600;
      var sh = stage.clientHeight || 400;
      /* chiều cao chung cho mọi tấm */
      var h = Math.min(sh * 0.92, sw * (sw < 560 ? 0.78 : 0.62));
      stage.style.setProperty('--cf-h', Math.round(h) + 'px');

      /* Khung của mỗi tấm đúng bằng tỉ lệ gốc của chính bức ảnh:
         ảnh lấp đầy khung, không thừa khoảng trống, cũng không xén mất người.
         Ảnh ngang chỉ bị thu nhỏ khi màn hình quá hẹp để chứa nó. */
      var maxW = sw * 0.88;
      var widths = items.map(function (el) {
        var im = el.querySelector('img');
        var r = (im && im.naturalWidth && im.naturalHeight)
                ? im.naturalWidth / im.naturalHeight : 0.667;
        var w = Math.min(r * h, maxW);
        el.style.width  = Math.round(w) + 'px';
        el.style.height = Math.round(w / r) + 'px';
        return w;
      });

      /* Bề ngang của tấm đang ở giữa, nội suy LIÊN TỤC giữa hai tấm kề khi
         đang vuốt. Trước đây làm tròn nên lúc tấm giữa đổi từ dọc sang ngang
         thì con số nhảy một nấc, kéo theo cả dãy ảnh giật vị trí. */
      var pos = Math.max(0, Math.min(items.length - 1, cur + frac));
      var i0  = Math.floor(pos), t = pos - i0;
      var wc  = widths[i0] + ((widths[i0 + 1] !== undefined ? widths[i0 + 1] : widths[i0]) - widths[i0]) * t;

      var base  = h * 0.70;
      var first = wc * 0.54 + base * 0.16;   /* ảnh ngang rộng thì giãn ra thêm */
      var step  = base * 0.30;               /* các ảnh xa hơn xếp chồng sát lại */
      unitPx = Math.max(60, base * 0.62);

      items.forEach(function (el, i) {
        var off  = i - cur - frac;
        var abs  = Math.abs(off);
        var sign = off < 0 ? -1 : 1;
        var near = Math.min(abs, 1);   /* 0..1 — cho vuốt mượt, không nhảy bậc */
        var shown = abs <= 3.6;

        var x   = sign * (near * first + Math.max(0, abs - 1) * step);
        var rot = -sign * near * 52;
        var sc  = Math.max(0.58, 1 - Math.min(abs, 3) * 0.11);

        /* translateZ đẩy tấm giữa ra trước: trong không gian 3D, thứ tự vẽ do
           độ sâu quyết định chứ không phải z-index, nếu không tấm kề bên sẽ
           đè lên tấm giữa và che mất người trong ảnh. */
        el.style.transform = 'translate(-50%,-50%) translateX(' + x.toFixed(1) + 'px) ' +
                             'translateZ(' + (-Math.min(abs, 4) * 90).toFixed(0) + 'px) ' +
                             'rotateY(' + rot.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
        el.style.zIndex  = String(Math.round(100 - abs * 10));
        el.style.opacity = shown ? (abs <= 1 ? (1 - abs * 0.08).toFixed(2)
                                             : Math.max(0, 0.92 - (abs - 1) * 0.3).toFixed(2)) : '0';
        el.style.pointerEvents = shown ? 'auto' : 'none';
        el.classList.toggle('is-active', abs < 0.5);
        el.setAttribute('aria-selected', abs < 0.5 ? 'true' : 'false');
        el.tabIndex = abs < 0.5 ? 0 : -1;
      });

      var shownIdx = Math.max(0, Math.min(photos.length - 1, Math.round(cur + frac)));
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === shownIdx); });
    }

    function go(i) {
      cur = Math.max(0, Math.min(photos.length - 1, i));
      frac = 0;
      layout();
    }

    /* --- Nút, chấm, bàn phím --- */
    $('#cfPrev').addEventListener('click', function () { go(cur - 1); });
    $('#cfNext').addEventListener('click', function () { go(cur + 1); });
    dotsEl.addEventListener('click', function (ev) {
      var d = ev.target.closest('.cf__dot');
      if (d) go(parseInt(d.getAttribute('data-i'), 10));
    });
    stage.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft')  { ev.preventDefault(); go(cur - 1); }
      if (ev.key === 'ArrowRight') { ev.preventDefault(); go(cur + 1); }
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openLb(cur); }
    });

    /* --- Vuốt ngang: dãy ảnh chạy theo ngón tay, nhả ra thì bám ảnh gần nhất --- */
    var dragging = false, startX = 0, moved = false, dragUnit = 200;

    stage.addEventListener('pointerdown', function (ev) {
      dragging = true; startX = ev.clientX; moved = false; frac = 0;
      dragUnit = unitPx;                              /* cố định, không đổi giữa cú kéo */
      /* bắt con trỏ để ngón tay/chuột đi ra ngoài khung vẫn theo được */
      try { stage.setPointerCapture(ev.pointerId); } catch (e) {}
      stage.classList.add('is-dragging');
    });

    stage.addEventListener('pointermove', function (ev) {
      if (!dragging) return;
      var dx = ev.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      frac = -dx / dragUnit;                   /* vuốt sang trái -> sang ảnh sau */
      frac = Math.max(-cur - 0.55, Math.min(photos.length - 1 - cur + 0.55, frac));
      layout();
    });

    function release(ev) {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove('is-dragging');
      try { stage.releasePointerCapture(ev.pointerId); } catch (e) {}
      go(cur + Math.round(frac));
    }
    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);

    stage.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.cf__item');
      if (!btn || moved) return;               /* vừa vuốt thì không tính là bấm */
      var i = parseInt(btn.getAttribute('data-i'), 10);
      if (i === cur) openLb(i); else go(i);
    });

    window.addEventListener('resize', function () { layout(); });

    /* --- Xem ảnh lớn --- */
    var lb = $('#lightbox'), img = $('#lbImg'), lbI = 0;

    function show(i) {
      lbI = (i + photos.length) % photos.length;
      img.src = photos[lbI].src;
      img.alt = 'Ảnh cưới ' + (lbI + 1) + ' trong ' + photos.length;
    }
    function openLb(i) {
      show(i); lb.classList.add('is-open'); document.body.classList.add('is-locked');
    }
    function closeLb() {
      lb.classList.remove('is-open'); document.body.classList.remove('is-locked');
      go(lbI);
    }
    $('#lbClose').addEventListener('click', closeLb);
    $('#lbPrev').addEventListener('click', function () { show(lbI - 1); });
    $('#lbNext').addEventListener('click', function () { show(lbI + 1); });
    lb.addEventListener('click', function (ev) { if (ev.target === lb) closeLb(); });
    document.addEventListener('keydown', function (ev) {
      if (!lb.classList.contains('is-open')) return;
      if (ev.key === 'Escape') closeLb();
      if (ev.key === 'ArrowLeft') show(lbI - 1);
      if (ev.key === 'ArrowRight') show(lbI + 1);
    });

    layout();
  }

  /* ---------------------------------------------------------
     8. RSVP
     --------------------------------------------------------- */
  function buildRsvp() {
    var r = C.rsvp || {};
    if (!r.show) return;
    $('#sec-rsvp').hidden = false;
    text('rsvpHeading', r.heading);
    text('rsvpSub', r.subheading);

    var opts = r.options || {};
    var fill = function (sel, list) {
      $(sel).innerHTML = (list || []).map(function (o) {
        return '<option value="' + esc(o) + '">' + esc(o) + '</option>';
      }).join('');
    };
    fill('#rsvpAttend', opts.attend);
    fill('#rsvpSide', opts.side);

    var form = $('#rsvpForm'), ok = $('#rsvpSuccess');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!$('#rsvpName').value.trim()) { $('#rsvpName').focus(); return; }

      var data = {
        name: $('#rsvpName').value.trim(),
        phone: $('#rsvpPhone').value.trim(),
        attend: $('#rsvpAttend').value,
        side: $('#rsvpSide').value,
        wish: $('#rsvpWish').value.trim()
      };

      var done = function () {
        form.classList.add('is-hidden');
        ok.textContent = r.successText || 'Cảm ơn bạn!';
        ok.classList.add('is-shown');
        /* Lời nhắn trong RSVP cũng hiện luôn ở sổ lưu bút */
        if (data.wish && C.wishes && C.wishes.show) addWish(data.name, data.wish);
      };

      if (r.mode === 'form' && r.formAction) {
        var fd = new FormData();
        Object.keys(r.fields || {}).forEach(function (k) {
          if (r.fields[k] && data[k] != null) fd.append(r.fields[k], data[k]);
        });
        fetch(r.formAction, { method: 'POST', mode: 'no-cors', body: fd })
          .then(done).catch(done);
      } else if (r.mode === 'script' && r.endpoint) {
        fetch(r.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(done).catch(done);
      } else {
        done();
      }
    });
  }

  /* ---------------------------------------------------------
     9. Sổ lưu bút (lưu trên localStorage của khách)
     --------------------------------------------------------- */
  var STORE_KEY = 'wedding_wishes_v1';

  function loadStored() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveStored(list) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(-50))); }
    catch (e) { /* chế độ riêng tư: bỏ qua */ }
  }
  function renderWishes() {
    var seed = (C.wishes && C.wishes.seed) || [];
    var all = seed.concat(loadStored());
    $('#wishList').innerHTML = all.map(function (w) {
      return '<article class="wish">' +
        '<p class="wish__text">' + esc(w.text) + '</p>' +
        '<p class="wish__name">— ' + esc(w.name) + '</p></article>';
    }).join('');
  }
  function addWish(name, textVal) {
    var list = loadStored();
    list.push({ name: name, text: textVal });
    saveStored(list);
    renderWishes();
  }

  function buildWishes() {
    var w = C.wishes || {};
    if (!w.show) return;
    $('#sec-wishes').hidden = false;
    text('wishHeading', w.heading);
    text('wishSub', w.subheading);
    $('#wishText').placeholder = w.placeholder || '';
    $('#wishSubmit').textContent = w.submitText || 'Gửi lời chúc';
    renderWishes();

    $('#wishForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var n = $('#wishName').value.trim(), t = $('#wishText').value.trim();
      if (!n || !t) return;
      addWish(n, t);
      ev.target.reset();
    });
  }

  /* ---------------------------------------------------------
     10. Footer
     --------------------------------------------------------- */
  function buildFooter() {
    var f = C.footer || {};
    text('footerNames', f.names || pairNames());
    text('footerDate', f.date || (C.cover || {}).dateText);
    text('footerText', f.text);
  }

  /* ---------------------------------------------------------
     11. Nhạc nền
     --------------------------------------------------------- */
  var music = { play: function () {} };
  function buildMusic() {
    var m = C.music || {};
    if (!m.show || !m.src) return;

    var audio = $('#bgm'), btn = $('#musicBtn');
    audio.src = m.src;
    btn.classList.add('is-shown');
    btn.title = m.title || 'Nhạc nền';

    /* Chưa chép file nhạc vào assets/music/ thì ẩn nút cho gọn */
    audio.addEventListener('error', function () {
      btn.classList.remove('is-shown', 'is-playing');
      console.warn('Không tìm thấy file nhạc: ' + m.src + ' — nút nhạc đã được ẩn.');
    });

    var toggle = function () {
      if (audio.paused) {
        audio.play().then(function () { btn.classList.add('is-playing'); })
                    .catch(function () { btn.classList.remove('is-playing'); });
      } else {
        audio.pause();
        btn.classList.remove('is-playing');
      }
    };
    btn.addEventListener('click', toggle);

    music.play = function () {
      if (!m.autoplayOnOpen) return;
      audio.play().then(function () { btn.classList.add('is-playing'); })
                  .catch(function () { /* trình duyệt chặn: khách bấm nút là được */ });
    };
  }

  /* ---------------------------------------------------------
     12. Chấm điều hướng
     --------------------------------------------------------- */
  function buildNavDots() {
    if (!(C.theme || {}).navDots) return;
    var items = [
      ['sec-home', 'Trang đầu'],
      ['sec-couple', 'Cô dâu & Chú rể'],
      ['sec-countdown', 'Đếm ngược'],
      ['sec-story', 'Chuyện chúng mình'],
      ['sec-events', 'Sự kiện'],
      ['sec-gallery', 'Album'],
      ['sec-rsvp', 'Xác nhận'],
      ['sec-wishes', 'Lưu bút']
    ].filter(function (it) {
      var el = document.getElementById(it[0]);
      return el && !el.hidden;
    });

    var nav = $('#navdots');
    nav.innerHTML = items.map(function (it) {
      return '<a href="#' + it[0] + '" data-label="' + esc(it[1]) + '" aria-label="' + esc(it[1]) + '"></a>';
    }).join('');
    nav.classList.add('is-shown');

    var links = $$('a', nav);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    items.forEach(function (it) { spy.observe(document.getElementById(it[0])); });
  }

  /* ---------------------------------------------------------
     13. Cánh hoa rơi
     --------------------------------------------------------- */
  function buildPetals() {
    if (!(C.theme || {}).petals) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var box = $('#petals');
    var count = window.innerWidth < 720 ? 7 : 12;
    var html = '';
    for (var i = 0; i < count; i++) {
      var size = 5 + Math.random() * 6;
      html += '<span class="petal" style="' +
        'left:' + (Math.random() * 100).toFixed(2) + '%;' +
        'width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;' +
        'opacity:' + (0.08 + Math.random() * 0.14).toFixed(2) + ';' +
        '--drift:' + (Math.random() * 160 - 80).toFixed(0) + 'px;' +
        'animation-duration:' + (11 + Math.random() * 12).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 18).toFixed(1) + 's;' +
        '"></span>';
    }
    box.innerHTML = html;
  }

  /* ---------------------------------------------------------
     14. Hiệu ứng xuất hiện khi cuộn
     --------------------------------------------------------- */
  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     15. Mở thiệp
     --------------------------------------------------------- */
  function initOpen() {
    $('#openBtn').addEventListener('click', function () {
      var cover = $('#cover');
      window.scrollTo({ top: 0 });
      cover.classList.add('is-open');          /* khối chữ trôi lên rồi tan */
      document.body.classList.remove('is-locked');
      document.body.classList.add('is-opened'); /* màn hình đầu hiện lên sau */
      music.play();
      setTimeout(function () { cover.remove(); }, 1600);
    });
  }

  /* ---------------------------------------------------------
     Khởi động
     --------------------------------------------------------- */
  applyTheme();
  buildCover();
  buildHero();
  buildIntro();
  buildCouple();
  buildCountdown();
  buildStory();
  buildEvents();
  buildGallery();
  buildRsvp();
  buildWishes();
  buildFooter();
  buildMusic();
  buildNavDots();
  buildPetals();
  initReveal();
  initOpen();
})();
