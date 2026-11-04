/* Espousal × Sobha — Sobha Elwood page (4, 5 & 6 bedroom villas) */
(function () {
  'use strict';

  /* Same lead destinations as the other project pages:
     FormSubmit email, the Google Sheet (Apps Script) and the Meta Pixel. */
  var CONFIG = {
    ENDPOINT: 'https://formsubmit.co/ajax/masroorshad@gmail.com',
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbzBheV-fJoEvOjwvHDvhi_rW8imKg-EsIJS8Eivz6rcdnDVQUm7kC0zOyJMSjIOLosJCw/exec',
    WHATSAPP: '917980702399',
    META_PIXEL_ID: '806806699194177',
    PROJECT: 'Sobha Elwood',
    // Brochures, chosen with data-brochure="<key>" on a Download button.
    BROCHURES: {
      brochure: 'assets/docs/Sobha-Elwood-Brochure.pdf',
      factbook: 'assets/docs/Sobha-Elwood-Fact-Book.pdf',
      parks: 'assets/docs/Sobha-Elwood-Seven-Parks.pdf'
    }
  };

  /* ---------------- Meta Pixel ---------------- */
  function track(event, params, eventId) {
    if (!window.fbq) return;
    if (eventId) window.fbq('track', event, params || {}, { eventID: eventId });
    else window.fbq('track', event, params || {});
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    var channel = /wa\.me/.test(h) ? 'WhatsApp' : /^tel:/.test(h) ? 'Phone' : /^mailto:/.test(h) ? 'Email' : '';
    if (channel) track('Contact', { content_name: CONFIG.PROJECT, content_category: channel });
  }, true);

  var CONTEXTS = {
    'brochure':     { eyebrow: 'Brochure',     title: 'Download the Brochure', sub: 'Fill in your details — your download begins as soon as you submit.', cta: 'Submit & Download', subject: 'Brochure Download' },
    'factbook':     { eyebrow: 'Fact Book',    title: 'Get the Fact Book',     sub: 'Share your details and our advisor will send you the Sobha Elwood Fact Book with layouts and specifications.', cta: 'Send Me the Fact Book', subject: 'Fact Book Request' },
    'price-list':   { eyebrow: 'Price List',   title: 'Get Prices & Payment Plan', sub: 'Receive the launch price list, payment plan and current availability.', cta: 'Send Me the Price List', subject: 'Price List Request' },
    'floor-plan':   { eyebrow: 'Floor Plans',  title: 'Get Floor Plans',       sub: 'Receive the layouts and areas for this home type.', cta: 'Send Me the Floor Plans', subject: 'Floor Plan Request' },
    'site-visit':   { eyebrow: 'Site Visit',   title: 'Request a Site Visit',  sub: 'Choose a time that suits you — our advisor will confirm your private viewing.', cta: 'Request Visit', subject: 'Site Visit Request' },
    'meeting':      { eyebrow: 'Meeting',      title: 'Book a Quick Meeting',  sub: 'Share a few details and our advisor will call you shortly.', cta: 'Book a Quick Meeting', subject: 'Quick Meeting Request' },
    'general':      { eyebrow: 'Enquire',      title: 'Request Details',       sub: 'Share your details and our advisor will be in touch shortly.', cta: 'Submit', subject: 'General Enquiry' }
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  document.documentElement.classList.remove('no-js');
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------------- hero film ---------------- */
  // The launch film plays muted behind the hero. Skipped for visitors who prefer
  // reduced motion or have Data Saver on — they see the still image instead.
  var heroVid = $('.hero__media video');
  if (heroVid) {
    var saveData = navigator.connection && navigator.connection.saveData;
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!saveData && !still) {
      heroVid.src = heroVid.getAttribute('data-src');
      var p = heroVid.play && heroVid.play();
      if (p && p.catch) p.catch(function () {});
    }
  }
  var film = $('#filmVideo');
  if (film) film.addEventListener('play', function () {
    if (heroVid) heroVid.pause();
    track('ViewContent', { content_name: 'Sobha Elwood launch film', content_category: 'Video' });
  });

  /* ---------------- nav ---------------- */
  var nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');
  function onScroll() { nav.classList.toggle('is-solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('a', links).forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------------- reveal + active nav ---------------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });

    var navMap = {};
    $$('a', links).forEach(function (a) { var h = a.getAttribute('href'); if (h.charAt(0) === '#') navMap[h.slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && navMap[e.target.id]) {
          $$('a', links).forEach(function (a) { a.classList.remove('is-current'); });
          navMap[e.target.id].classList.add('is-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('section[id]').forEach(function (s) { so.observe(s); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- neighbourhood tabs ---------------- */
  var pjTabs = $$('.pj-tab');
  function selectProject(key) {
    pjTabs.forEach(function (b) {
      var on = b.getAttribute('data-project') === key;
      b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on);
    });
    $$('.tw[data-project]').forEach(function (p) {
      var on = p.getAttribute('data-project') === key;
      p.hidden = !on; p.classList.toggle('is-active', on);
    });
  }
  pjTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      selectProject(tab.getAttribute('data-project'));
      track('ViewContent', { content_name: 'Sobha Elwood: ' + tab.textContent, content_category: 'Project' });
    });
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-goto-project]');
    if (!t) return;
    e.preventDefault();
    selectProject(t.getAttribute('data-goto-project'));
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------- modal ---------------- */
  var modal = $('#modal'), modalForm = $('#modalForm'), lastFocus = null;
  function openModal(ctx, unit, brochure) {
    var c = CONTEXTS[ctx] || CONTEXTS.general;
    modalForm.setAttribute('data-context', ctx);
    modalForm.setAttribute('data-unit', unit || '');
    modalForm.setAttribute('data-brochure', brochure || '');
    $('#modalEyebrow').textContent = c.eyebrow + (unit ? ' · ' + unit : '');
    $('#modalTitle').textContent = c.title;
    $('#modalSub').textContent = c.sub;
    $('#modalSubmit').textContent = c.cta;
    var msg = $('.form-msg', modalForm); msg.textContent = ''; msg.className = 'form-msg';
    lastFocus = document.activeElement;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
    setTimeout(function () { $('input', modalForm).focus(); }, 120);
  }
  function closeModal() {
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock');
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-enquire]');
    if (!t) return;
    e.preventDefault();
    openModal(t.getAttribute('data-enquire'), t.getAttribute('data-unit'), t.getAttribute('data-brochure'));
  });
  $$('[data-close]', modal).forEach(function (b) { b.addEventListener('click', closeModal); });

  /* ---------------- form submission ---------------- */
  function validate(form) {
    var ok = true;
    $$('input, select', form).forEach(function (inp) {
      var v = inp.value.trim(), bad = inp.required && !v;
      if (inp.type === 'email' && v) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (inp.type === 'tel' && (v || !form.hasAttribute('data-either'))) bad = v.replace(/\D/g, '').length < 7;
      inp.closest('.field').classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    });
    if (form.hasAttribute('data-either')) {
      var ph = $('input[type="tel"]', form), em = $('input[type="email"]', form);
      if (!ph.value.trim() && !em.value.trim()) {
        [ph, em].forEach(function (inp) { inp.closest('.field').classList.add('is-invalid'); });
        ok = false;
      }
    }
    return ok;
  }
  function downloadBrochure(key) {
    var url = CONFIG.BROCHURES[key];
    if (!url) return;
    var a = document.createElement('a');
    a.href = url; a.download = url.split('/').pop();
    document.body.appendChild(a); a.click(); a.remove();
  }
  function sendEmail(data) {
    return fetch(CONFIG.ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); });
  }
  // Apps Script does not answer CORS preflights, so post a simple form body
  // and treat a delivered request as success (the response is opaque).
  function sendSheet(data) {
    if (!CONFIG.SHEET_URL) return Promise.resolve(false);
    var body = new URLSearchParams();
    Object.keys(data).forEach(function (k) { if (k.charAt(0) !== '_') body.append(k, data[k]); });
    return fetch(CONFIG.SHEET_URL, { method: 'POST', mode: 'no-cors', body: body })
      .then(function () { return true; }, function () { return false; });
  }
  function send(data) {
    var email = sendEmail(data).then(function (res) {
      if (!(res.ok && String(res.body.success) !== 'false')) throw new Error(res.body.message || 'send failed');
      return true;
    }).catch(function () { return false; });
    return Promise.all([email, sendSheet(data)]).then(function (r) {
      if (!r[0] && !r[1]) throw new Error('send failed');
    });
  }
  // Indian mobiles are saved as "+91 XXXXX XXXXX"; other country codes are kept as typed.
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
  function cookie(name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }
  function fbcFromUrl() {
    var id = new URLSearchParams(location.search).get('fbclid');
    return id ? 'fb.1.' + Date.now() + '.' + id : '';
  }
  function waLink(text) { return 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent(text); }
  // "4 Bedroom Villa" → "Sobha Elwood · 4 Bedroom Villa"
  function projectOf(unit) {
    return unit ? 'Sobha Elwood · ' + unit : 'Sobha Elwood by Sobha Realty';
  }

  $$('.js-enquiry').forEach(function (form) {
    $$('input, select', form).forEach(function (inp) {
      inp.addEventListener('input', function () { inp.closest('.field').classList.remove('is-invalid'); });
      if (inp.type === 'tel') inp.addEventListener('blur', function () { inp.value = normalizePhone(inp.value); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('.form-msg', form), btn = $('button[type="submit"]', form);
      if (btn.disabled) return; // ignore repeat taps while sending
      msg.className = 'form-msg'; msg.textContent = '';
      if (!validate(form)) { msg.classList.add('is-err'); msg.textContent = form.getAttribute('data-err') || 'Please check the highlighted field — name and a valid phone number are required.'; return; }

      var ctx = form.getAttribute('data-context') || 'general';
      var unit = form.getAttribute('data-unit') || '';
      var c = CONTEXTS[ctx] || CONTEXTS.general;
      var f = new FormData(form);
      function val(k) { return (f.get(k) || '').trim(); }
      var budget = val('budget'), interest = val('interest');
      if (!unit && interest) unit = interest;
      var project = projectOf(unit);
      var data = {
        name: val('name') || (val('first_name') + ' ' + val('last_name')).trim(),
        email: val('email'),
        phone: normalizePhone(val('phone')),
        city: val('city'),
        enquiry_type: c.subject + (budget ? ' · Budget ' + budget : ''),
        budget: budget,
        unit_type: unit || '—',
        project: project,
        page: location.href,
        source: leadSource(),
        submitted_at: new Date().toString(),
        event_id: 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
        fbp: cookie('_fbp'),
        fbc: cookie('_fbc') || fbcFromUrl(),
        user_agent: navigator.userAgent,
        _subject: 'New Lead: ' + c.subject + (unit ? ' (' + unit + ')' : '') + ' — Sobha Elwood',
        _replyto: val('email') || undefined,
        _template: 'table',
        _captcha: 'false'
      };

      var original = btn.textContent;
      btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Sending…';

      // The brochure is delivered whatever the network does — never block the visitor.
      if (ctx === 'brochure') downloadBrochure(form.getAttribute('data-brochure'));

      if (window.fbq) {
        var digits = data.phone.replace(/\D/g, '');
        window.fbq('init', CONFIG.META_PIXEL_ID, { em: data.email.toLowerCase() || undefined, ph: digits, fn: data.name.split(' ')[0].toLowerCase(), ct: data.city.toLowerCase().replace(/\s/g, '') || undefined });
        track('Lead', { content_name: c.subject, content_category: project, currency: 'AED', value: 0 }, data.event_id);
      }

      send(data).then(function () {
        var first = data.name.split(' ')[0];
        msg.classList.add('is-ok');
        msg.textContent = ctx === 'meeting'
          ? 'Thank you, ' + first + '. Our team will call you shortly to fix a meeting time.'
          : ctx === 'brochure'
          ? 'Thank you, ' + first + '. Your brochure is downloading — an advisor will follow up shortly.'
          : ctx === 'factbook'
          ? 'Thank you, ' + first + '. Our advisor will send you the Fact Book shortly.'
          : 'Thank you, ' + first + '. Our advisor will contact you shortly.';
        form.reset();
        if (form === modalForm) setTimeout(closeModal, 3200);
      }).catch(function () {
        msg.classList.add('is-err');
        msg.innerHTML = 'We couldn’t send that just now. Please <a href="' + waLink('Hi, I am ' + data.name + (data.city ? ' from ' + data.city : '') + '. ' + data._subject) +
          '" target="_blank" rel="noopener" style="color:#f1dcaa;text-decoration:underline">message us on WhatsApp</a> instead.';
      }).then(function () {
        btn.disabled = false; btn.removeAttribute('aria-busy'); btn.textContent = original;
      });
    });
  });

  /* ---------------- lightbox ---------------- */
  var lb = $('#lightbox'), lbImg = $('img', lb), lbList = [], lbIdx = 0;
  function showLb(i) { lbIdx = (i + lbList.length) % lbList.length; lbImg.src = lbList[lbIdx]; }
  function openLb(list, i) { lbList = list; showLb(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock'); }
  function closeLb() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); }
  var galleryBtns = $$('#gallery-grid .g');
  var gallerySrcs = galleryBtns.map(function (b) { return b.getAttribute('data-src'); });
  galleryBtns.forEach(function (b, i) { b.addEventListener('click', function () { openLb(gallerySrcs, i); }); });
  $$('.loc__plan').forEach(function (b) { b.addEventListener('click', function () { openLb([b.getAttribute('data-src')], 0); }); });
  $('.lightbox__close', lb).addEventListener('click', closeLb);
  $('.lightbox__nav--prev', lb).addEventListener('click', function () { showLb(lbIdx - 1); });
  $('.lightbox__nav--next', lb).addEventListener('click', function () { showLb(lbIdx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lb.classList.contains('is-open')) closeLb();
      else if (modal.classList.contains('is-open')) closeModal();
    }
    if (lb.classList.contains('is-open') && lbList.length > 1) {
      if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
      if (e.key === 'ArrowRight') showLb(lbIdx + 1);
    }
  });
})();
