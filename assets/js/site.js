/* Comportamentos gerais do site: menu e player da gravação real. */
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

/* Gravação real: aparece somente quando houver arquivo autêntico configurado. */
var vc = cfg.video || {};
if (vc.src) {
  $('#panel-video').hidden = false;
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
