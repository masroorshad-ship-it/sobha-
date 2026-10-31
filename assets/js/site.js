/* Espousal × Sobha — homepage and News page */
(function () {
  document.documentElement.classList.remove('no-js');
  document.getElementById('yr').textContent = new Date().getFullYear();
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('is-solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('is-in'); }); }
  /* Sobha Central limited-time offer (Dubai time): shown with a countdown until it ends,
     then the card falls back to the standard payment plan. */
  var OFFER_END = new Date('2026-11-01T23:59:59+04:00').getTime();
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function offerTick() {
    var left = OFFER_END - Date.now(), live = left > 0;
    document.querySelectorAll('.offer-live').forEach(function (el) { el.hidden = !live; });
    document.querySelectorAll('.offer-std').forEach(function (el) { el.hidden = live; });
    if (!live) return false;
    var t = Math.floor(left / 1000);
    var parts = [[Math.floor(t / 86400), 'Days'], [pad2(Math.floor(t % 86400 / 3600)), 'Hours'], [pad2(Math.floor(t % 3600 / 60)), 'Mins'], [pad2(t % 60), 'Secs']];
    var html = parts.map(function (p) { return '<span><b>' + p[0] + '</b>' + p[1] + '</span>'; }).join('');
    document.querySelectorAll('[data-countdown]').forEach(function (el) { el.innerHTML = html; });
    return true;
  }
  if (offerTick()) {
    var offerTimer = setInterval(function () { if (!offerTick()) clearInterval(offerTimer); }, 1000);
  }

  /* "Talk to Our Team" form — same lead destinations as the project pages:
     FormSubmit email, the Google Sheet (Apps Script) and a Meta Lead. */
  var ENDPOINT = 'https://formsubmit.co/ajax/masroorshad@gmail.com';
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbzBheV-fJoEvOjwvHDvhi_rW8imKg-EsIJS8Eivz6rcdnDVQUm7kC0zOyJMSjIOLosJCw/exec';
  var PROJECTS = { 'Sobha Central': 'Sobha Central by Sobha Realty', 'Sobha Sanctuary': 'Sobha Sanctuary by Sobha Realty' };
  var form = document.getElementById('talk');
  var fields = form.querySelectorAll('input, select');
  function cookie(name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }
  // Indian mobiles are saved as "+91 XXXXX XXXXX". Phone autofill sometimes adds a stray
  // "+1" or repeats the number ("+1916393069611" → "+91 63930 69611").
  // Numbers with another country code are kept as typed.
  function normalizePhone(raw) {
    var v = String(raw || '').trim(), compact = v.replace(/[\s().-]/g, '');
    if (compact.charAt(0) === '+' && !/^\+1?91[6-9]/.test(compact)) return v;
    var m = /^(?:1?91|0)?([6-9]\d{9})/.exec(compact.replace(/\D/g, ''));
    return m ? '+91 ' + m[1].slice(0, 5) + ' ' + m[1].slice(5) : v;
  }
  function leadSource() {
    var q = new URLSearchParams(location.search), parts = [];
    ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid'].forEach(function (k) {
      if (q.get(k)) parts.push(k.replace('utm_', '') + '=' + q.get(k));
    });
    if (document.referrer && document.referrer.indexOf(location.host) === -1) parts.push('ref=' + document.referrer);
    return parts.join(' · ') || 'direct';
  }
  function validate() {
    var ok = true;
    fields.forEach(function (inp) {
      var v = inp.value.trim(), bad = inp.required && !v;
      if (inp.type === 'email' && v) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (inp.type === 'tel' && v) bad = v.replace(/\D/g, '').length < 7;
      inp.closest('.field').classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    });
    var ph = form.phone, em = form.email;
    if (!ph.value.trim() && !em.value.trim()) {
      [ph, em].forEach(function (inp) { inp.closest('.field').classList.add('is-invalid'); });
      ok = false;
    }
    return ok;
  }
  fields.forEach(function (inp) {
    inp.addEventListener('input', function () { inp.closest('.field').classList.remove('is-invalid'); });
    if (inp.type === 'tel') inp.addEventListener('blur', function () { inp.value = normalizePhone(inp.value); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = form.querySelector('.form-msg'), btn = form.querySelector('button[type="submit"]');
    // Ignore repeat taps while a submission is on its way (avoids duplicate leads).
    if (btn.disabled) return;
    msg.className = 'form-msg'; msg.textContent = '';
    if (!validate()) { msg.classList.add('is-err'); msg.textContent = 'Please add your first and last name, the project, your budget, and a phone number or email.'; return; }
    var v = function (k) { return form[k].value.trim(); };
    var name = (v('first_name') + ' ' + v('last_name')).trim(), budget = v('budget'), choice = v('project');
    var id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random();
    var fbclid = new URLSearchParams(location.search).get('fbclid');
    var data = {
      name: name, email: v('email'), phone: normalizePhone(v('phone')), city: '',
      enquiry_type: 'Quick Meeting Request · Budget ' + budget,
      budget: budget,
      unit_type: choice,
      project: PROJECTS[choice] || 'Sobha Realty — project not decided',
      page: location.href,
      source: leadSource(),
      submitted_at: new Date().toString(),
      event_id: 'lead-' + id,
      fbp: cookie('_fbp'),
      fbc: cookie('_fbc') || (fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : ''),
      user_agent: navigator.userAgent,
      _subject: 'New Lead: Quick Meeting Request (' + choice + ', ' + budget + ') — Espousal × Sobha',
      _replyto: v('email') || undefined,
      _template: 'table',
      _captcha: 'false'
    };
    var original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';
    if (window.fbq) {
      window.fbq('init', '806806699194177', { em: data.email.toLowerCase() || undefined, ph: data.phone.replace(/\D/g, ''), fn: v('first_name').toLowerCase() });
      window.fbq('track', 'Lead', { content_name: 'Quick Meeting Request', content_category: data.project, currency: 'AED', value: 0 }, { eventID: data.event_id });
    }
    var email = fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.ok; }, function () { return false; });
    var body = new URLSearchParams();
    Object.keys(data).forEach(function (k) { if (k.charAt(0) !== '_') body.append(k, data[k]); });
    // Apps Script does not answer CORS preflights; a delivered no-cors request counts as success.
    var sheet = fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: body }).then(function () { return true; }, function () { return false; });
    Promise.all([email, sheet]).then(function (r) {
      if (r[0] || r[1]) {
        msg.classList.add('is-ok');
        msg.textContent = 'Thank you, ' + v('first_name') + '. Our team will call you shortly to fix a meeting time.';
        form.reset();
      } else {
        msg.classList.add('is-err');
        msg.innerHTML = 'We couldn’t send that just now. Please <a href="https://wa.me/917980702399" target="_blank" rel="noopener" style="color:#f1dcaa;text-decoration:underline">message us on WhatsApp</a> instead.';
      }
      btn.disabled = false; btn.textContent = original;
    });
  });

  /* ---------------- Sobha News & Offers ----------------
     Items come from news/news-data.js. An item with an end date disappears after it. */
  function escH(v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function newsId(n) { return n.date + '-' + n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48); }
  function newsDate(d) { return new Date(d + 'T12:00:00+04:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dubai' }); }
  function newsMeta(n) {
    return '<p class="news-card__meta"><span class="news-tag news-tag--' + escH(n.tag.toLowerCase().replace(/\s+/g, '-')) + '">' + escH(n.tag) + '</span>' +
      '<span>' + escH(n.project) + '</span><time datetime="' + escH(n.date) + '">' + newsDate(n.date) + '</time></p>';
  }
  function liveNews() {
    return (window.ESPOUSAL_NEWS || []).filter(function (n) { return !n.ends || new Date(n.ends).getTime() > Date.now(); });
  }
  var feed = document.getElementById('newsFeed');
  if (feed) {
    var items = liveNews();
    feed.innerHTML = items.length ? items.map(function (n) {
      return '<article class="news-card" id="' + newsId(n) + '">' +
        (n.image ? '<a class="news-card__img" href="' + escH(n.image) + '" target="_blank" rel="noopener"><img src="' + escH(n.image) + '" alt="' + escH(n.title) + '" loading="lazy"></a>' : '') +
        '<div class="news-card__body">' + newsMeta(n) +
          '<h2 class="news-card__title">' + escH(n.title) + '</h2>' +
          n.body.map(function (b) { return '<p>' + escH(b) + '</p>'; }).join('') +
          (n.ends ? '<p class="news-card__ends">Offer ends in</p><div class="countdown" data-ends="' + escH(n.ends) + '"></div>' : '') +
          (n.terms ? '<details class="news-card__terms"><summary>Terms &amp; conditions</summary><ul>' + n.terms.map(function (t) { return '<li>' + escH(t) + '</li>'; }).join('') + '</ul></details>' : '') +
          '<div class="news-card__actions">' +
            (n.links || (n.link ? [n.link] : [])).map(function (l) { return '<a class="btn btn--gold btn--sm" href="' + escH(l.href) + '">' + escH(l.label) + '</a>'; }).join('') +
            '<a class="btn btn--line btn--sm" href="#talk">Ask Our Team</a>' +
          '</div>' +
        '</div></article>';
    }).join('') : '<p class="news-empty">No current announcements — new Sobha updates are posted here regularly.</p>';
  }
  var teaser = document.getElementById('newsTeaser');
  if (teaser) {
    var latest = liveNews().slice(0, 3);
    if (!latest.length) teaser.closest('section').hidden = true;
    teaser.innerHTML = latest.map(function (n) {
      return '<a class="news-teaser reveal is-in" href="news/#' + newsId(n) + '">' + newsMeta(n) +
        '<h3>' + escH(n.title) + '</h3><p>' + escH(n.body[0].length > 150 ? n.body[0].slice(0, 147) + '…' : n.body[0]) + '</p>' +
        (n.ends ? '<div class="countdown countdown--sm" data-ends="' + escH(n.ends) + '"></div>' : '') +
        '<span class="news-teaser__more">Read more ›</span></a>';
    }).join('');
  }
  // Countdowns for news items; an item is hidden the moment its offer ends.
  function newsTick() {
    var any = false;
    document.querySelectorAll('[data-ends]').forEach(function (el) {
      var left = new Date(el.getAttribute('data-ends')).getTime() - Date.now();
      if (left <= 0) { var card = el.closest('.news-card, .news-teaser'); if (card) card.hidden = true; return; }
      any = true;
      var t = Math.floor(left / 1000);
      el.innerHTML = [[Math.floor(t / 86400), 'Days'], [pad2(Math.floor(t % 86400 / 3600)), 'Hours'], [pad2(Math.floor(t % 3600 / 60)), 'Mins'], [pad2(t % 60), 'Secs']]
        .map(function (p) { return '<span><b>' + p[0] + '</b>' + p[1] + '</span>'; }).join('');
    });
    return any;
  }
  if (newsTick()) {
    var newsTimer = setInterval(function () { if (!newsTick()) clearInterval(newsTimer); }, 1000);
  }

  // WhatsApp, call and email taps are high-intent signals for the ad algorithm.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]'); if (!a || !window.fbq) return;
    var h = a.getAttribute('href');
    var channel = /wa\.me/.test(h) ? 'WhatsApp' : /^tel:/.test(h) ? 'Phone' : /^mailto:/.test(h) ? 'Email' : '';
    if (channel) window.fbq('track', 'Contact', { content_name: 'Projects homepage', content_category: channel });
  }, true);
})();
