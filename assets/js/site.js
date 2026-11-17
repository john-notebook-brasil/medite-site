/* Comportamentos gerais do site: menu, abas da demonstração e player da gravação real. */
(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var cfg = window.MEDITE_SITE_CONFIG || {};

/* Modo prévia: faixa de aviso e noindex só existem enquanto config.preview !== false. */
if (cfg.preview === false) {
  var rb = $('.preview-ribbon'); if (rb) rb.remove();
  var rm = document.querySelector('meta[name=robots]'); if (rm) rm.remove();
}

/* Menu móvel */
var toggle = $('.nav-toggle'), nav = $('#menu');
toggle.addEventListener('click', function () {
  var open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });

/* Abas da demonstração (padrão WAI-ARIA tabs) */
var tabs = Array.prototype.slice.call(document.querySelectorAll('.demo-tabs [role=tab]'));
function select(t, focus) {
  tabs.forEach(function (x) {
    var on = x === t;
    x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
    document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
  });
  if (focus) t.focus();
  if (t.id !== 'tab-video') { var v = $('#realVideo'); if (v && !v.paused) v.pause(); }
  window.dispatchEvent(new Event('resize'));
}
tabs.forEach(function (t, i) {
  t.addEventListener('click', function () { select(t); });
  t.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
  });
});

/* Gravação real: aparece somente quando houver arquivo autêntico configurado. */
var vc = cfg.video || {};
if (vc.src) {
  $('#videoWait').hidden = true; $('#videoReal').hidden = false;
  var video = $('#realVideo'); video.src = vc.src; if (vc.poster) video.poster = vc.poster;
  var box = $('#videoChapters');
  (vc.chapters || []).forEach(function (c) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'chap'; b.setAttribute('role', 'listitem');
    b.textContent = c.label;
    b.addEventListener('click', function () { video.currentTime = c.t; var p = video.play(); if (p && p.catch) p.catch(function () {}); });
    box.appendChild(b);
  });
  video.addEventListener('timeupdate', function () {
    var cs = vc.chapters || [], cur = 0;
    cs.forEach(function (c, i) { if (video.currentTime >= c.t) cur = i; });
    box.querySelectorAll('.chap').forEach(function (b, i) { if (i === cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
  });
}
})();
