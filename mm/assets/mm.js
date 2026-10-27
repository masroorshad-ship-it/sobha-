/* Espousal — Myanmar site: nav, enquiry modal, lead capture */
(function () {
  'use strict';

  var CONFIG = {
    ENDPOINT: 'https://formsubmit.co/ajax/masroorshad@gmail.com',
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbzBheV-fJoEvOjwvHDvhi_rW8imKg-EsIJS8Eivz6rcdnDVQUm7kC0zOyJMSjIOLosJCw/exec',
    EMAIL: 'masroorshad@gmail.com',
    BROCHURES: {
      'sobha-central': '/sobhacentral/assets/docs/Sobha-Central-Brochure.pdf',
      horizon: '/sobhacentral/assets/docs/The-Horizon-Sobha-Central.pdf',
      mirage: '/sobhacentral/assets/docs/The-Mirage-Sobha-Central.pdf',
      pinnacle: '/sobhacentral/assets/docs/The-Pinnacle-Sobha-Central.pdf',
      serene: '/sobhacentral/assets/docs/The-Serene-Sobha-Central-3BR.pdf'
    }
  };
  var LANG = document.documentElement.lang === 'my' ? 'my' : 'en';
  // Page-specific text (modal titles, messages) comes from window.MM_TEXT set in each page.
  var T = window.MM_TEXT || {};

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function track(event, params) { if (window.fbq) window.fbq('track', event, params || {}); }

  /* nav */
  var burger = $('#burger'), links = $('#navLinks');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open);
    });
    $$('a', links).forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('is-open'); }); });
  }

  /* modal */
  var modal = $('#modal'), modalForm = $('#modalForm'), lastFocus = null;
  function openModal(ctx, item, brochure) {
    var c = T.contexts[ctx] || T.contexts.general;
    modalForm.setAttribute('data-context', ctx);
    modalForm.setAttribute('data-item', item || '');
    modalForm.setAttribute('data-brochure', brochure || '');
    $('#modalTitle').textContent = c.title + (item ? ' · ' + item : '');
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
  if (modal) {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-enquire]');
      if (!t) return;
      e.preventDefault();
      openModal(t.getAttribute('data-enquire'), t.getAttribute('data-item'), t.getAttribute('data-brochure'));
    });
    $$('[data-close]', modal).forEach(function (b) { b.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
  }

  /* lead capture — same Google Sheet and email relay as the Sobha Central site */
  function validate(form) {
    var ok = true;
    $$('input', form).forEach(function (inp) {
      var v = inp.value.trim(), bad = inp.required && !v;
      if (inp.type === 'email' && v) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (inp.type === 'tel' && v) bad = v.replace(/\D/g, '').length < 7;
      inp.closest('.field').classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    });
    return ok;
  }
  function leadSource() {
    var q = new URLSearchParams(location.search), parts = ['site=myanmar', 'lang=' + LANG];
    ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid'].forEach(function (k) {
      if (q.get(k)) parts.push(k.replace('utm_', '') + '=' + q.get(k));
    });
    if (document.referrer && document.referrer.indexOf(location.host) === -1) parts.push('ref=' + document.referrer);
    return parts.join(' · ');
  }
  function sendEmail(data) {
    return fetch(CONFIG.ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return r.ok && String(j.success) !== 'false'; }); })
      .catch(function () { return false; });
  }
  function sendSheet(data) {
    var body = new URLSearchParams();
    Object.keys(data).forEach(function (k) { if (k.charAt(0) !== '_' && data[k] !== undefined) body.append(k, data[k]); });
    return fetch(CONFIG.SHEET_URL, { method: 'POST', mode: 'no-cors', body: body }).then(function () { return true; }, function () { return false; });
  }
  function downloadBrochure(key) {
    var url = CONFIG.BROCHURES[key]; if (!url) return;
    var a = document.createElement('a'); a.href = url; a.download = url.split('/').pop();
    document.body.appendChild(a); a.click(); a.remove();
  }

  $$('.js-enquiry').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('.form-msg', form), btn = $('button[type="submit"]', form);
      msg.className = 'form-msg'; msg.textContent = '';
      if (!validate(form)) { msg.classList.add('is-err'); msg.textContent = T.invalid; return; }
      var ctx = form.getAttribute('data-context') || 'general';
      var c = T.contexts[ctx] || T.contexts.general;
      var f = new FormData(form);
      var project = f.get('project') || form.getAttribute('data-project') || 'Not specified';
      var item = form.getAttribute('data-item') || '';
      var data = {
        name: f.get('name').trim(),
        email: f.get('email').trim(),
        phone: (f.get('phone') || '').trim(),
        city: (f.get('city') || '').trim(),
        enquiry_type: c.subject,
        unit_type: item || '—',
        project: project + ' (Myanmar site)',
        page: location.href,
        source: leadSource(),
        submitted_at: new Date().toString(),
        _subject: 'New Myanmar lead: ' + c.subject + (item ? ' (' + item + ')' : '') + ' — ' + project,
        _replyto: f.get('email').trim(),
        _template: 'table',
        _captcha: 'false'
      };
      var original = btn.textContent;
      btn.setAttribute('aria-busy', 'true'); btn.textContent = T.sending;
      if (ctx === 'brochure') downloadBrochure(form.getAttribute('data-brochure'));
      Promise.all([sendEmail(data), sendSheet(data)]).then(function (r) {
        if (!r[0] && !r[1]) throw new Error('send failed');
        track('Lead', { content_name: data._subject, content_category: 'Myanmar' });
        msg.classList.add('is-ok');
        msg.textContent = ctx === 'brochure' ? T.okBrochure : T.ok;
        form.reset();
        if (form === modalForm) setTimeout(closeModal, 3200);
      }).catch(function () {
        msg.classList.add('is-err');
        msg.innerHTML = T.fail + ' <a href="mailto:' + CONFIG.EMAIL + '" style="text-decoration:underline">' + CONFIG.EMAIL + '</a>';
      }).then(function () { btn.removeAttribute('aria-busy'); btn.textContent = original; });
    });
  });

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
