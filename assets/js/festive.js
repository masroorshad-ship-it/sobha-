/* Festive greeting card — shown on every page until END, then gone automatically.
   Change TITLE / TEXT / END for the next festival. */
(function () {
  'use strict';
  var END = new Date('2026-11-08T23:59:59+05:30').getTime(); // end of Diwali day, India time
  var KEY = 'esp_festive_diwali_2026';
  var TITLE = 'Happy Diwali';
  var TEXT = 'May this festival of lights bring you and your family joy, prosperity and bright new beginnings.';
  var SIGN = 'Warm wishes from Team Espousal';
  if (Date.now() > END) return;
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var css = '' +
    '.fest{position:fixed;right:20px;bottom:20px;z-index:80;width:min(360px,calc(100vw - 32px));padding:22px 22px 20px 22px;' +
    'background:linear-gradient(160deg,#151832 0%,#0b0d1c 100%);border:1px solid rgba(201,163,95,.55);box-shadow:0 18px 50px rgba(0,0,0,.5),0 0 40px rgba(241,190,90,.12);' +
    'color:#f4efe6;font-family:Jost,system-ui,sans-serif;opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s ease}' +
    '.fest.is-in{opacity:1;transform:none}' +
    '.fest__lamps{display:flex;gap:10px;margin-bottom:10px;font-size:22px;line-height:1}' +
    '.fest__lamps span{animation:festGlow 2.4s ease-in-out infinite;filter:drop-shadow(0 0 6px rgba(255,180,60,.7))}' +
    '.fest__lamps span:nth-child(2){animation-delay:.8s}.fest__lamps span:nth-child(3){animation-delay:1.6s}' +
    '@keyframes festGlow{0%,100%{opacity:.75;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}' +
    '.fest__t{margin:0 0 8px;font:400 30px/1.05 Marcellus,Georgia,serif;letter-spacing:.04em;text-transform:uppercase;' +
    'background:linear-gradient(90deg,#b8894a,#f1dcaa 55%,#c9a35f);-webkit-background-clip:text;background-clip:text;color:transparent}' +
    '.fest__p{margin:0 0 10px;font-size:14.5px;line-height:1.55;color:rgba(244,239,230,.86)}' +
    '.fest__s{margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#f1dcaa}' +
    '.fest__x{position:absolute;top:8px;right:10px;width:30px;height:30px;border:0;background:none;color:#9a9cb0;font-size:22px;line-height:1;cursor:pointer}' +
    '.fest__x:hover{color:#f1dcaa}' +
    '@media (max-width:860px){.fest{right:16px;left:16px;width:auto;bottom:76px;padding:18px 18px 16px}.fest__t{font-size:26px}}' +
    '@media (prefers-reduced-motion:reduce){.fest,.fest__lamps span{transition:none;animation:none}}';
  function show() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement('aside');
    box.className = 'fest'; box.setAttribute('role', 'status'); box.setAttribute('aria-label', TITLE);
    box.innerHTML = '<button class="fest__x" type="button" aria-label="Close">×</button>' +
      '<div class="fest__lamps" aria-hidden="true"><span>🪔</span><span>✨</span><span>🪔</span></div>' +
      '<p class="fest__t">' + TITLE + '</p><p class="fest__p">' + TEXT + '</p><p class="fest__s">' + SIGN + '</p>';
    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('is-in'); }); });
    function close() {
      box.classList.remove('is-in');
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      setTimeout(function () { box.remove(); }, 600);
    }
    box.querySelector('.fest__x').addEventListener('click', close);
    // On phones it sits over the page, so it closes by itself after 10 seconds.
    if (window.matchMedia && window.matchMedia('(max-width: 860px)').matches) setTimeout(close, 10000);
  }
  // Appear shortly after the page loads, so it never gets in the way of the first view.
  if (document.readyState === 'complete') setTimeout(show, 1500);
  else window.addEventListener('load', function () { setTimeout(show, 1500); });
})();
