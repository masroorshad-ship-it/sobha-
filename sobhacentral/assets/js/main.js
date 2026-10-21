/* Espousal × Sobha — Sobha Central landing page */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — every enquiry is emailed to LEAD_EMAIL through FormSubmit
     (https://formsubmit.co). The very first submission triggers a one-time
     activation email to that inbox; click "Activate" and every later lead
     arrives automatically.
     SHEET_URL — the Google Apps Script Web app URL (see google-sheet/Code.gs).
     When set, every lead is also added as a row in your Google Sheet.
     META_PIXEL_ID — your Meta (Facebook) Pixel ID from Events Manager. When set,
     the page reports PageView, ViewContent (floor plans), Lead and Contact
     events so Meta can optimise ads towards people who actually enquire.
  ------------------------------------------------------------------ */
  var CONFIG = {
    LEAD_EMAIL: 'masroorshad@gmail.com',
    ENDPOINT: 'https://formsubmit.co/ajax/masroorshad@gmail.com',
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbzBheV-fJoEvOjwvHDvhi_rW8imKg-EsIJS8Eivz6rcdnDVQUm7kC0zOyJMSjIOLosJCw/exec',
    BROCHURE_URL: 'assets/docs/Sobha-Central-Brochure.pdf',
    BROCHURE_NAME: 'Sobha-Central-Brochure.pdf',
    WHATSAPP: '917980702399',
    META_PIXEL_ID: '3696494210488653'
  };

  /* ---------------- Meta Pixel ---------------- */
  function track(event, params, eventId) {
    if (!window.fbq) return;
    if (eventId) window.fbq('track', event, params || {}, { eventID: eventId });
    else window.fbq('track', event, params || {});
  }
  // The base Pixel code also sits in <head> of index.html; only load it here if that is missing.
  if (CONFIG.META_PIXEL_ID && !window.fbq) {
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', CONFIG.META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
  // WhatsApp, call and email taps are high-intent signals for the ad algorithm.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    var channel = /wa\.me/.test(h) ? 'WhatsApp' : /^tel:/.test(h) ? 'Phone' : /^mailto:/.test(h) ? 'Email' : '';
    if (channel) track('Contact', { content_name: 'Sobha Central', content_category: channel });
  }, true);

  var START_PRICE = { 1: 'AED 1.78 Million', 2: 'AED 2.47 Million', 3: 'AED 4.78 Million' };
  var UNITS = window.SC_UNITS || [];
  var ACCESS_KEY = 'sc_floorplan_access';

  var CONTEXTS = {
    'brochure':     { eyebrow: 'Brochure',     title: 'Download the Brochure', sub: 'Fill in your details — your download begins as soon as you submit.', cta: 'Submit & Download', subject: 'Brochure Download' },
    'floor-plan':   { eyebrow: 'Floor Plan',   title: 'View Floor Plan',       sub: 'Share your details and we will send the detailed floor plan to you right away.', cta: 'Get Floor Plan', subject: 'Floor Plan Request' },
    'payment-plan': { eyebrow: 'Payment Plan', title: 'View Payment Plan',     sub: 'Receive the complete payment schedule and current availability.', cta: 'Get Payment Plan', subject: 'Payment Plan Request' },
    'site-visit':   { eyebrow: 'Site Visit',   title: 'Request a Site Visit',  sub: 'Choose a time that suits you — our advisor will confirm your private viewing.', cta: 'Request Visit', subject: 'Site Visit Request' },
    'general':      { eyebrow: 'Enquire',      title: 'Request Details',       sub: 'Share your details and our advisor will be in touch shortly.', cta: 'Submit', subject: 'General Enquiry' }
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  document.documentElement.classList.remove('no-js');
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

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
    $$('a', links).forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
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

  /* ---------------- floor plans ---------------- */
  var unlocked = false;
  try { unlocked = localStorage.getItem(ACCESS_KEY) === '1'; } catch (e) {}
  var pendingFp = null;
  var fpGrid = $('#fpGrid'), fpSummary = $('#fpSummary'), fpStatus = $('#fpStatus');
  var LOCK_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

  function esc(v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function sqft(range) {
    var n = range.split(' - ').map(function (x) { return Math.round(parseFloat(x.replace(/,/g, ''))); });
    return (n.length > 1 && n[1] !== n[0] ? n[0].toLocaleString() + ' – ' + n[1].toLocaleString() : n[0].toLocaleString()) + ' sq.ft.';
  }
  function firstNum(range) { return parseFloat(range.split(' - ')[0].replace(/,/g, '')); }
  function viewTags(u) {
    var seen = {}, tags = [];
    u.views.forEach(function (v) {
      v.view.split(', ').forEach(function (t) {
        t = t.replace('120 degree view', '120° view');
        if (!seen[t]) { seen[t] = 1; tags.push(t); }
      });
    });
    return tags;
  }
  function unitCount(u) { return u.views.reduce(function (n, v) { return n + v.units.length; }, 0); }
  function bedLabel(b) { return b + ' Bedroom'; }
  function unitLabel(u) { return u.beds + ' BR ' + u.type; }
  function byBeds(b) { return UNITS.filter(function (u) { return u.beds === b; }); }

  function renderGrid(beds) {
    var list = byBeds(beds);
    if (!list.length) {
      fpSummary.textContent = 'From ' + START_PRICE[beds];
      fpGrid.innerHTML = '<article class="fp-card fp-card--request"><div class="fp-card__body">' +
        '<p class="fp-card__beds">3 Bedroom</p><h3>Layouts on Request</h3>' +
        '<p class="fp-card__feat">Three bedroom residences are released on request. Our advisor will share current layouts, sizes and availability.</p>' +
        '<p class="fp-card__price">From <strong>' + START_PRICE[3] + '</strong></p>' +
        '<button class="btn btn--gold btn--sm" data-enquire="floor-plan" data-unit="3 BHK">Request 3 Bedroom Plans</button></div></article>';
      return;
    }
    var areas = list.map(function (u) { return firstNum(u.total); });
    fpSummary.innerHTML = '<b>' + list.length + '</b> layouts &nbsp;·&nbsp; ' + Math.round(Math.min.apply(null, areas)).toLocaleString() + ' – ' +
      Math.round(Math.max.apply(null, areas)).toLocaleString() + ' sq.ft. &nbsp;·&nbsp; From <b>' + START_PRICE[beds] + '</b>';
    fpGrid.innerHTML = list.map(function (u) {
      var src = 'assets/floorplans/' + u.id + (unlocked ? '.jpg' : '-blur.jpg');
      return '<article class="fp-card">' +
        '<button class="fp-card__img" data-fp-open="' + u.id + '" aria-label="View floor plan ' + esc(unitLabel(u)) + '">' +
          '<img src="' + src + '" data-full="assets/floorplans/' + u.id + '.jpg" alt="' + esc(bedLabel(u.beds) + ' ' + u.type) + ' floor plan" loading="lazy">' +
          '<span class="fp-card__lock">' + LOCK_SVG + '<span>Unlock Plan</span></span>' +
        '</button>' +
        '<div class="fp-card__body">' +
          '<p class="fp-card__beds">' + bedLabel(u.beds) + '</p>' +
          '<h3>' + esc(u.type) + '</h3>' +
          '<p class="fp-card__feat">' + esc(u.features) + '</p>' +
          '<dl class="fp-card__meta"><div><dt>Total Area</dt><dd>' + sqft(u.total) + '</dd></div><div><dt>Units</dt><dd>' + unitCount(u) + '</dd></div></dl>' +
          '<p class="fp-card__tags">' + viewTags(u).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</p>' +
          '<button class="btn btn--line btn--sm btn--block" data-fp-open="' + u.id + '">View Floor Plan</button>' +
        '</div></article>';
    }).join('');
  }

  function applyAccess() {
    document.body.classList.toggle('fp-unlocked', unlocked);
    $$('img[data-full]').forEach(function (img) { if (unlocked) img.src = img.getAttribute('data-full'); });
    if (unlocked) {
      fpStatus.querySelector('.fp-status__text').textContent = 'All floor plans are unlocked for you — tap any layout to view it in detail.';
      var b = fpStatus.querySelector('button'); if (b) b.remove();
    }
  }
  function grantAccess() {
    unlocked = true;
    try { localStorage.setItem(ACCESS_KEY, '1'); } catch (e) {}
    applyAccess();
  }

  var curBeds = 1;
  function selectBeds(b) {
    curBeds = b;
    $$('#floor-plans .tab').forEach(function (t) {
      var on = +t.getAttribute('data-beds') === b;
      t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on);
    });
    renderGrid(b);
  }
  $$('#floor-plans .tab').forEach(function (tab) {
    tab.addEventListener('click', function () { selectBeds(+tab.getAttribute('data-beds')); });
  });
  selectBeds(1);
  applyAccess();

  /* viewer */
  var fpv = $('#fpv'), fpvImg = $('#fpvImg'), fpvLink = $('#fpvImgLink'), fpvList = [], fpvIdx = 0, fpvMode = 'plan';
  function fpvRender() {
    var u = fpvList[fpvIdx], plates = u === 'floor-plates';
    fpv.classList.toggle('is-plates', plates);
    var src = plates ? 'assets/floorplans/floor-plates.jpg' : 'assets/floorplans/' + u.id + (fpvMode === 'key' ? '-key.jpg' : '.jpg');
    fpvImg.src = src; fpvLink.href = src;
    $$('[data-fpv-view]', fpv).forEach(function (b) {
      var on = b.getAttribute('data-fpv-view') === fpvMode;
      b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on);
    });
    if (plates) {
      fpvImg.alt = 'Typical floor plates';
      $('#fpvEyebrow').textContent = 'The Horizon · Sobha Central';
      $('#fpvTitle').textContent = 'Typical Floor Plates';
      $('#fpvFeat').textContent = 'Levels 14–34, 35–40, 43–53 and 54–75. Twenty residences per floor: one bedroom units in light gold, two bedroom units in deep copper.';
      $('#fpvAreas').innerHTML = ''; $('#fpvViews').innerHTML = '';
      $('#fpvEnquire').setAttribute('data-unit', 'Floor plates');
    } else {
      fpvImg.alt = bedLabel(u.beds) + ' ' + u.type + (fpvMode === 'key' ? ' key plan' : ' floor plan');
      $('#fpvEyebrow').textContent = bedLabel(u.beds) + ' Apartment · The Horizon';
      $('#fpvTitle').textContent = u.type;
      $('#fpvFeat').textContent = u.features;
      $('#fpvAreas').innerHTML =
        '<div><dt>Suite</dt><dd>' + sqft(u.suite) + '</dd></div>' +
        '<div><dt>Balcony</dt><dd>' + sqft(u.balcony) + '</dd></div>' +
        '<div class="is-total"><dt>Total Saleable</dt><dd>' + sqft(u.total) + '</dd></div>';
      $('#fpvViews').innerHTML = '<p class="fpv__label">Views &amp; Unit Numbers</p>' + u.views.map(function (v) {
        return '<details><summary><span>' + esc(v.view.replace('120 degree view', '120° view')) + '</span><b>' + v.units.length + ' units</b></summary>' +
          '<p>' + v.units.join(', ') + '</p></details>';
      }).join('');
      $('#fpvEnquire').setAttribute('data-unit', unitLabel(u));
      $('#fpvWa').href = 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent('Hi, I would like the price and availability for Sobha Central ' + bedLabel(u.beds) + ' ' + u.type + ' (' + sqft(u.total) + ').');
      $('#fpvCount').textContent = (fpvIdx + 1) + ' / ' + fpvList.length;
    }
    if (plates) $('#fpvWa').href = 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent('Hi, I would like details on Sobha Central floor plans.');
  }
  function openViewer(id) {
    if (id === 'floor-plates') { fpvList = ['floor-plates']; fpvIdx = 0; }
    else {
      var u = UNITS.filter(function (x) { return x.id === id; })[0];
      if (!u) return;
      fpvList = byBeds(u.beds); fpvIdx = fpvList.indexOf(u);
    }
    fpvMode = 'plan'; fpvRender();
    var vu = fpvList[fpvIdx];
    track('ViewContent', vu === 'floor-plates'
      ? { content_name: 'Floor plates', content_category: 'Floor plan' }
      : { content_name: unitLabel(vu), content_category: bedLabel(vu.beds), content_type: 'product', content_ids: [vu.id] });
    fpv.classList.add('is-open'); fpv.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
    setTimeout(function () { $('.modal__close', fpv).focus(); }, 80);
  }
  function closeViewer() {
    fpv.classList.remove('is-open'); fpv.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock');
  }
  function fpvStep(d) { if (fpvList.length > 1) { fpvIdx = (fpvIdx + d + fpvList.length) % fpvList.length; fpvRender(); } }
  $('#fpvPrev').addEventListener('click', function () { fpvStep(-1); });
  $('#fpvNext').addEventListener('click', function () { fpvStep(1); });
  $$('[data-fpv-view]', fpv).forEach(function (b) { b.addEventListener('click', function () { fpvMode = b.getAttribute('data-fpv-view'); fpvRender(); }); });
  $$('[data-fpv-close]', fpv).forEach(function (b) { b.addEventListener('click', closeViewer); });
  $('#fpvEnquire').addEventListener('click', closeViewer);

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-fp-open]');
    if (!t) return;
    e.preventDefault();
    var id = t.getAttribute('data-fp-open');
    if (unlocked) { openViewer(id); return; }
    var u = UNITS.filter(function (x) { return x.id === id; })[0];
    pendingFp = id;
    openModal('floor-plan', u ? unitLabel(u) : 'Floor plates');
  });

  // Called once a visitor has submitted their details for a floor plan
  function afterFloorPlanLead(unit) {
    closeModal();
    if (pendingFp) { var id = pendingFp; pendingFp = null; openViewer(id); return; }
    var m = /^(\d)/.exec(unit || '');
    selectBeds(m ? +m[1] : curBeds);
    document.getElementById('floor-plans').scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------------- modal ---------------- */
  var modal = $('#modal'), modalForm = $('#modalForm'), lastFocus = null;
  function openModal(ctx, unit) {
    var c = CONTEXTS[ctx] || CONTEXTS.general;
    modalForm.setAttribute('data-context', ctx);
    modalForm.setAttribute('data-unit', unit || '');
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
    var ctx = t.getAttribute('data-enquire'), unit = t.getAttribute('data-unit');
    if (ctx === 'floor-plan' && unlocked && unit !== '3 BHK') {
      var m = /^(\d)/.exec(unit || '');
      if (m) selectBeds(+m[1]);
      document.getElementById('floor-plans').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (ctx !== 'floor-plan') pendingFp = null;
    openModal(ctx, unit);
  });
  $$('[data-close]', modal).forEach(function (b) { b.addEventListener('click', closeModal); });

  /* ---------------- form submission ---------------- */
  function validate(form) {
    var ok = true;
    $$('input[required]', form).forEach(function (inp) {
      var v = inp.value.trim(), bad = !v;
      if (inp.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (inp.type === 'tel') bad = v.replace(/\D/g, '').length < 7;
      inp.closest('.field').classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    });
    return ok;
  }
  function downloadBrochure() {
    var a = document.createElement('a');
    a.href = CONFIG.BROCHURE_URL; a.download = CONFIG.BROCHURE_NAME;
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
  // Resolves when the lead reached at least one destination; rejects if none.
  function send(data) {
    var email = sendEmail(data).then(function (res) {
      if (!(res.ok && String(res.body.success) !== 'false')) throw new Error(res.body.message || 'send failed');
      return true;
    }).catch(function () { return false; });
    return Promise.all([email, sendSheet(data)]).then(function (r) {
      if (!r[0] && !r[1]) throw new Error('send failed');
    });
  }
  function leadSource() {
    var q = new URLSearchParams(location.search), parts = [];
    ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid'].forEach(function (k) {
      if (q.get(k)) parts.push(k.replace('utm_', '') + '=' + q.get(k));
    });
    if (document.referrer && document.referrer.indexOf(location.host) === -1) parts.push('ref=' + document.referrer);
    return parts.join(' · ') || 'direct';
  }

  $$('.js-enquiry').forEach(function (form) {
    $$('input', form).forEach(function (inp) {
      inp.addEventListener('input', function () { inp.closest('.field').classList.remove('is-invalid'); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('.form-msg', form), btn = $('button[type="submit"]', form);
      msg.className = 'form-msg'; msg.textContent = '';
      if (!validate(form)) { msg.classList.add('is-err'); msg.textContent = 'Please complete all fields with valid details.'; return; }

      var ctx = form.getAttribute('data-context') || 'general';
      var unit = form.getAttribute('data-unit') || '';
      var c = CONTEXTS[ctx] || CONTEXTS.general;
      var f = new FormData(form);
      var data = {
        name: f.get('name').trim(),
        email: f.get('email').trim(),
        phone: f.get('phone').trim(),
        city: f.get('city').trim(),
        enquiry_type: c.subject,
        unit_type: unit || '—',
        project: 'Sobha Central by Sobha Realty',
        page: location.href,
        source: leadSource(),
        submitted_at: new Date().toString(),
        event_id: 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
        _subject: 'New Lead: ' + c.subject + (unit ? ' (' + unit + ')' : '') + ' — Sobha Central',
        _replyto: f.get('email').trim(),
        _template: 'table',
        _captcha: 'false'
      };

      var original = btn.textContent;
      btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Sending…';

      // The brochure is delivered whatever the network does — never block the visitor.
      if (ctx === 'brochure') downloadBrochure();
      // Any registered enquiry unlocks the floor plans, even if the email relay is down.
      grantAccess();

      send(data).then(function () {
        if (window.fbq) {
          // Advanced matching: the Pixel hashes these before sending them to Meta.
          var digits = data.phone.replace(/\D/g, '');
          window.fbq('init', CONFIG.META_PIXEL_ID, { em: data.email.toLowerCase(), ph: digits, fn: data.name.split(' ')[0].toLowerCase(), ct: data.city.toLowerCase().replace(/\s/g, '') });
          track('Lead', { content_name: c.subject, content_category: unit || 'General', currency: 'AED', value: 0 }, data.event_id);
        }
        msg.classList.add('is-ok');
        msg.textContent = ctx === 'floor-plan'
          ? 'Thank you, ' + data.name.split(' ')[0] + '. Opening your floor plan…'
          : ctx === 'brochure'
          ? 'Thank you, ' + data.name.split(' ')[0] + '. Your brochure is downloading — an advisor will follow up shortly.'
          : 'Thank you, ' + data.name.split(' ')[0] + '. Our advisor will contact you shortly.';
        form.reset();
        if (form === modalForm && ctx === 'floor-plan') setTimeout(function () { afterFloorPlanLead(unit); }, 900);
        else if (form === modalForm) setTimeout(closeModal, 3200);
      }).catch(function () {
        msg.classList.add('is-err');
        msg.innerHTML = 'We couldn’t send that just now. Please <a href="https://wa.me/' + CONFIG.WHATSAPP +
          '?text=' + encodeURIComponent('Hi, I am ' + data.name + ' from ' + data.city + '. ' + data._subject) +
          '" target="_blank" rel="noopener" style="color:#f1dcaa;text-decoration:underline">message us on WhatsApp</a> instead.';
      }).then(function () {
        btn.removeAttribute('aria-busy'); btn.textContent = original;
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
  $$('.loc__map, .loc__plan').forEach(function (b) { b.addEventListener('click', function () { openLb([b.getAttribute('data-src')], 0); }); });
  $('.lightbox__close', lb).addEventListener('click', closeLb);
  $('.lightbox__nav--prev', lb).addEventListener('click', function () { showLb(lbIdx - 1); });
  $('.lightbox__nav--next', lb).addEventListener('click', function () { showLb(lbIdx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lb.classList.contains('is-open')) closeLb();
      else if (modal.classList.contains('is-open')) closeModal();
      else if (fpv.classList.contains('is-open')) closeViewer();
    }
    if (fpv.classList.contains('is-open') && !modal.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft') fpvStep(-1);
      if (e.key === 'ArrowRight') fpvStep(1);
    }
    if (lb.classList.contains('is-open') && lbList.length > 1) {
      if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
      if (e.key === 'ArrowRight') showLb(lbIdx + 1);
    }
  });

  /* ---------------- video ---------------- */
  var yt = $('#yt');
  yt.addEventListener('click', function () {
    if ($('iframe', yt)) return;
    var id = yt.getAttribute('data-id');
    yt.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1" title="Sobha Central virtual tour" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
  var reel = $('#reel'), reelBtn = $('#reelBtn'), reelWrap = reel.parentNode;
  function toggleReel() {
    if (reel.paused) {
      reel.muted = false; reel.volume = 1; reel.controls = true; reel.play();
      reelWrap.classList.add('is-playing');
    } else { reel.pause(); }
  }
  reelBtn.addEventListener('click', toggleReel);
  reel.addEventListener('click', function () { if (!reel.controls) toggleReel(); });
  reel.addEventListener('pause', function () { reelWrap.classList.remove('is-playing'); });
  reel.addEventListener('play', function () { reelWrap.classList.add('is-playing'); });
})();
