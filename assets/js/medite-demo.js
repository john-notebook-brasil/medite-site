/* Reprodução interativa da interface F2 do Medite 0.3.0 (marcação, classes, textos e geometria equivalentes aos do aplicativo).
 * Diferenças da prévia: nada é salvo; lembretes não são agendados; a voz é a do dispositivo do visitante. */
(function () {
'use strict';
var D = window.MEDITE_DATA;
if (!D) return;
var $ = function (s, r) { return (r || document).querySelector(s); };
var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Dados (coleção curada em inglês/KJV) ---------- */
var verses = D.verses;
var TABS = ['Ouvir', 'Bíblia', 'Anotações', 'Ajustes'];
var NOTE_MAX = 300;
function avatarFor(v) { // personagem de cada versículo
  var id = v.jesus ? 'cruz' : (D.legacy[v.who] || v.who);
  return { id: id, c: D.chars[id] || D.chars.abraao };
}
function ref(v) { return v.book + ' ' + v.c + ':' + v.v; }
function books() { var s = []; verses.forEach(function (v) { if (s.indexOf(v.book) < 0) s.push(v.book); }); return s; }
function chapters(b) { var s = []; verses.forEach(function (v) { if (v.book === b && s.indexOf(v.c) < 0) s.push(v.c); }); return s.sort(function (a, c) { return a - c; }); }
function versesOf(b, c) { return verses.filter(function (v) { return v.book === b && v.c === c; }).sort(function (a, x) { return a.v - x.v; }); }
function neighbor(i, d, n) { return ((i + d) % n + n) % n; } // navegação circular
function avatarImg(id, pose, label) { // avatares otimizados / Cruz como símbolo
  if (id === 'cruz') return '<span class="holy-cross" role="img" aria-label="' + esc(label) + '">✝</span>';
  return '<img class="character ' + pose + '" src="assets/avatars/' + id + '-' + pose + '-192.webp" draggable="false" alt="' + esc(label) + '">';
}

/* ---------- Geometria do layout F2 (escala 1) ---------- */
function endX(r) { return r.x + r.width; } function endY(r) { return r.y + r.height; }
function within(r, a) { return r.x >= a.x && r.y >= a.y && endX(r) <= endX(a) && endY(r) <= endY(a); }
function touches(a, b) { return a.x < endX(b) && endX(a) > b.x && a.y < endY(b) && endY(a) > b.y; }
function clamp(n, a, b) { return Math.max(a, Math.min(n, b)); }
function layout(a, circle, sheetOpen) {
  var s = 1, w = a.width, h = a.height;
  var c = { x: clamp(circle.x, a.x, endX(a) - circle.width), y: clamp(circle.y, a.y, endY(a) - circle.height), width: circle.width, height: circle.height };
  var flat = w < 440 || h < 350;
  var pageW = Math.round(Math.min(480, w - 24 - (flat ? 0 : 70)) * s);
  var pageH = Math.round(Math.min(520, h - 24) * s);
  var earW = flat ? 50 : 62, earH = 50, gap = 6, columnW = flat ? 0 : earW;
  var x = clamp(a.x + Math.round((a.width - pageW - columnW) / 2), a.x + 12, endX(a) - pageW - columnW - 12);
  var y = clamp(a.y + Math.round((a.height - pageH) / 2), a.y + 12, endY(a) - pageH - 12);
  var page = { x: x, y: y, width: pageW, height: pageH };
  var ears = [0, 1, 2, 3].map(function (i) { return { x: endX(page), y: y + 26 + i * (earH + gap), width: earW, height: earH }; });
  var columnRight = endX(page) + earW;
  var available = endX(a) - 12 - columnRight - 8, sheet = null;
  if (sheetOpen && available >= 220) {
    var sw = Math.min(320, available), sx = columnRight + 8;
    var top = clamp(y, a.y + 12, endY(a) - pageH - 12);
    sheet = { x: sx, y: top, width: sw, height: pageH };
    if (touches(sheet, c)) {
      var aboveH = (c.y - 12) - top, belowStart = endY(c) + 12, belowH = endY(sheet) - belowStart;
      if (aboveH >= 120 && aboveH >= belowH) sheet.height = aboveH;
      else if (belowH >= 120) { sheet.y = belowStart; sheet.height = belowH; }
      else if (aboveH >= 120) sheet.height = aboveH; else sheet = null;
    }
  }
  if (sheet && (!within(sheet, a) || touches(sheet, page) || ears.some(function (e) { return touches(sheet, e); }))) sheet = null;
  return { page: page, ears: ears, sheet: sheet };
}
function css(r) { return 'left:' + r.x + 'px;top:' + r.y + 'px;width:' + r.width + 'px;height:' + r.height + 'px;position:absolute'; }

/* ---------- Estado ---------- */
var WORK = { x: 0, y: 0, width: 1536, height: 816 };          // 1536×864 menos barra de tarefas (48)
var CIRCLE = { x: 1392, y: 672, width: 144, height: 144 };     // janela do círculo 96a (144×144), canto inferior direito
var DEFAULT_PREFS = { interval: 3, quietStart: '22:00', quietEnd: '07:00', paused: false, language: 'en', version: 'KJV' };
var st = {
  open: false, tab: null, verseIndex: 4, library: null, pose: 'parado', pulse: false,
  speaking: false, rate: 1, notes: [], prefs: Object.assign({}, DEFAULT_PREFS),
  bible: null, feedback: '', copied: false, listenNotice: ''
};
var timers = { pulse: 0, copy: 0, fade: 0 };

var screen = $('#winScreen'), viewport = $('#viewport');
var circleHost = $('#circleHost'), pageHost = $('#pageHost'), veilHost = $('#veilHost');
if (!screen) return;
circleHost.style.left = CIRCLE.x + 'px'; circleHost.style.top = CIRCLE.y + 'px';

/* ---------- Janela do círculo ---------- */
function curVerse() { return verses[st.verseIndex]; }
function renderCircle() {
  var v = curVerse(), av = avatarFor(v), name = v.jesus ? 'A cruz' : av.c.en;
  var cls = 'f2-orb f2-orb-96a f2-orb-gold' + (st.pose === 'acenando' && !reduced.matches ? ' f2-orb-wave' : '') + (st.pulse && !reduced.matches ? ' f2-orb-pulse' : '');
  circleHost.innerHTML = '<main class="f2-circle-stage f2-circle-stage-96a" aria-label="Medite F2 janela do circulo">' +
    '<button class="' + cls + '" style="--f2-avatar-color:' + av.c.cor + '" aria-expanded="' + st.open + '" aria-label="' + (st.open ? 'Fechar pagina' : 'Abrir pagina') + '">' +
    '<span class="f2-orb-art" style="--f2-avatar-color:' + av.c.cor + '">' + avatarImg(av.id, st.pose, name) + '</span></button></main>';
  circleHost.querySelector('.f2-orb').addEventListener('click', function () { userAct(); toggle(); });
}
function setPose(p) { if (st.pose !== p) { st.pose = p; renderCircle(); } }
function verseArrived() { // listen('medite-f2-verse') no círculo
  st.pose = 'acenando'; st.pulse = true; renderCircle();
  clearTimeout(timers.pulse);
  timers.pulse = setTimeout(function () { st.pulse = false; st.pose = st.speaking ? 'falando' : 'parado'; renderCircle(); }, 6400);
}

/* ---------- Janela da página de leitura ---------- */
function toggle() { st.open ? close() : openPage(); }
function openPage() {
  st.open = true; st.tab = null; st.library = null; st.feedback = '';
  veilHost.hidden = false; pageHost.hidden = false; renderPage(); renderCircle(); autoCamera();
}
function close() {
  stopSpeech();
  st.open = false; st.tab = null; st.library = null;
  veilHost.hidden = true; pageHost.hidden = true; pageHost.innerHTML = '';
  st.pose = 'parado'; st.pulse = false; clearTimeout(timers.pulse); renderCircle(); autoCamera();
}
veilHost.innerHTML = '<div class="f2-veil" role="button" tabindex="0" aria-label="Fechar pagina do Medite"></div>';
veilHost.firstChild.addEventListener('click', function () { userAct(); close(); });

function readingVerse() { return st.library || curVerse(); }
function renderPage() {
  var g = layout(WORK, CIRCLE, st.tab !== null);
  var html = '<main class="f2-stage f2-page-stage f2-e43a-transparency-test f2-gold-panels">' +
    '<article class="f2-page" style="' + css(g.page) + '">' + readingHTML() + '</article>';
  g.ears.forEach(function (r, i) {
    html += '<button style="' + css(r) + '" class="f2-ear f2-ear-' + i + (st.tab === i ? ' active' : '') + '" data-ear="' + i + '" aria-expanded="' + (st.tab === i) + '">' + TABS[i] + '</button>';
  });
  if (g.sheet && st.tab !== null) html += '<aside class="f2-sheet" style="' + css(g.sheet) + '">' + sheetHTML(st.tab) + '</aside>';
  html += '</main>';
  pageHost.innerHTML = html;
  bindPage(); fit();
}
function readingHTML() {
  var v = readingVerse(), lib = st.library !== null;
  var av = lib ? null : avatarFor(v);
  var name = lib ? 'Bíblia' : v.jesus ? 'A cruz' : av.c.en;
  return '<section class="f2-reading" aria-label="Leitura bíblica">' +
   '<header class="f2-reading-head"><div class="f2-reading-person"><div class="f2-reading-portrait">' +
     (av ? avatarImg(av.id, 'parado', name) : '<span aria-hidden="true">✦</span>') + '</div><span>' + esc(name) + '</span></div>' +
     (lib ? '<button type="button" class="f2-reading-return-meditation" data-act="return" aria-label="Voltar à meditação" title="Voltar ao último versículo de meditação"><span aria-hidden="true">✦</span> Meditação</button>' : '') +
     '<button class="f2-reading-close" data-act="close">fechar</button></header>' +
   '<div class="f2-reading-body"><div class="f2-reading-passage" aria-live="polite">' +
     '<p class="f2-reading-reference">' + esc(ref(v)) + ' <span class="f2-reading-version">KJV</span></p>' +
     '<blockquote class="' + (!lib && v.jesus ? 'f2-reading-jesus' : '') + '">' + esc(v.text) + '</blockquote>' +
     '<p class="f2-reading-meditate">Medite nesse texto.</p></div></div>' +
   '<footer class="f2-reading-foot"><nav class="f2-reading-actions" aria-label="Navegação entre versículos">' +
     '<button data-act="prev">Anterior</button><button data-act="next">Próximo</button>' +
     '<button class="f2-reading-copy" data-act="copy" aria-label="' + (st.copied ? 'Versículo copiado' : 'Copiar versículo') + '">' + (st.copied ? 'Copiado' : 'Copiar') + '</button>' +
     '<button class="f2-reading-whatsapp" data-act="whatsapp">WhatsApp</button></nav>' +
     '<div class="f2-reading-foot-meta"><span>← → versículos · Esc fechar · O ouvir · B Bíblia · N anotações · A ajustes</span></div>' +
     '<span class="f2-visually-hidden" role="status">' + esc(st.feedback) + '</span>' +
     (st.feedback.indexOf('Não foi possível') === 0 ? '<span class="f2-reading-error" role="alert">' + esc(st.feedback) + '</span>' : '') +
   '</footer></section>';
}
/* Ajuste de fonte: o versículo inteiro cabe na área de leitura, sem rolagem. */
function fit() {
  var body = pageHost.querySelector('.f2-reading-body'), q = body && body.querySelector('blockquote');
  if (!body || !q) return;
  q.style.fontSize = '27px';
  if (body.scrollHeight <= body.clientHeight + 1) return;
  var low = 8, high = 27;
  for (var i = 0; i < 13; i++) { var mid = (low + high) / 2; q.style.fontSize = mid.toFixed(2) + 'px'; if (body.scrollHeight <= body.clientHeight + 1) low = mid; else high = mid; }
  q.style.fontSize = low.toFixed(2) + 'px';
}
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (st.open) fit(); });

function step(d) {
  if (timers.fade) return;
  var lib = st.library !== null, n = verses.length;
  var cur = lib ? verses.indexOf(st.library) : st.verseIndex, target = neighbor(cur, d, n);
  var commit = function () {
    if (lib) st.library = verses[target];
    else { st.verseIndex = target; verseArrived(); stopSpeech(); }
    st.feedback = ''; renderPage();
  };
  if (reduced.matches) { commit(); return; }
  var p = pageHost.querySelector('.f2-reading-passage'); if (p) p.classList.add('f2-reading-passage-exit');
  timers.fade = setTimeout(function () { timers.fade = 0; commit(); }, 180);
}
function waMessage(v) { return ['Meditate on this passage.', '', v.text.split(/\r?\n/).map(function (l) { return '> ' + l; }).join('\n'), '', ref(v) + ' · KJV'].join('\n'); }
function copyVerse() {
  var v = readingVerse(), txt = v.text + '\n' + ref(v) + ' · KJV\nMeditate on this passage.';
  var ok = function () { st.copied = true; st.feedback = 'Versículo copiado.'; renderPage(); clearTimeout(timers.copy); timers.copy = setTimeout(function () { st.copied = false; if (st.open) renderPage(); }, 2000); };
  try { navigator.clipboard.writeText(txt).then(ok, function () { st.feedback = 'Não foi possível copiar o versículo.'; renderPage(); }); }
  catch (e) { st.feedback = 'Não foi possível copiar o versículo.'; renderPage(); }
}
function selectTab(i) { st.tab = st.tab === i ? null : i; if (st.tab === null) st.bible = null; renderPage(); autoCamera(); }

function bindPage() {
  pageHost.querySelectorAll('[data-ear]').forEach(function (b) { b.addEventListener('click', function () { userAct(); selectTab(+b.dataset.ear); }); });
  pageHost.querySelectorAll('[data-act]').forEach(function (b) {
    b.addEventListener('click', function () {
      userAct();
      var a = b.dataset.act;
      if (a === 'close') close();
      else if (a === 'prev') step(-1);
      else if (a === 'next') step(1);
      else if (a === 'return') { st.library = null; renderPage(); }
      else if (a === 'copy') copyVerse();
      else if (a === 'whatsapp') {
        var url = 'https://wa.me/?text=' + encodeURIComponent(waMessage(readingVerse()));
        var link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
        document.body.appendChild(link); link.click(); link.remove();
      }
      else if (a === 'recolher') selectTab(st.tab);
      else if (a === 'listen') { st.speaking ? stopSpeech() : play(); }
      else if (a === 'bible-open') { var v = bibleSelected(); if (v) { st.library = v; renderPage(); } }
      else if (a === 'note-save') saveNote();
      else if (a === 'note-del') { st.pendingDelete = b.dataset.id; renderPage(); }
      else if (a === 'note-confirm') { st.notes = st.notes.filter(function (n) { return n.id !== b.dataset.id; }); st.pendingDelete = null; st.noteNotice = 'Anotação excluída desta demonstração.'; renderPage(); }
      else if (a === 'note-cancel') { st.pendingDelete = null; renderPage(); }
      else if (a === 'settings-save') saveSettings();
    });
  });
  var rate = pageHost.querySelector('[data-rate]');
  if (rate) rate.addEventListener('change', function () { stopSpeech(); st.rate = +rate.value; });
  ['book', 'chapter', 'verse'].forEach(function (k) {
    var s = pageHost.querySelector('[data-bible=' + k + ']');
    if (s) s.addEventListener('change', function () { userAct(); bibleChange(k, s.value); });
  });
  var ta = pageHost.querySelector('#f2-notes-editor');
  if (ta) {
    ta.value = st.noteText || '';
    ta.addEventListener('input', function () { st.noteText = ta.value; st.noteNotice = ''; updateNoteRow(); });
  }
  pageHost.querySelectorAll('[data-pref]').forEach(function (el) {
    el.addEventListener('change', function () {
      var k = el.dataset.pref;
      st.draft[k] = el.type === 'checkbox' ? el.checked : k === 'interval' ? +el.value : el.value;
      if (k === 'language') st.draft.version = el.value === 'pt' ? 'BLIVRE' : 'KJV';
      st.settingsMsg = ''; if (k === 'language') renderPage(); else { var m = pageHost.querySelector('.f2-settings-status'); if (m) m.textContent = ''; }
    });
  });
}

/* ---------- Ficha (gaveta aberta) ---------- */
function sheetHTML(tab) {
  var body = tab === 0 ? listenHTML() : tab === 1 ? bibleHTML() : tab === 2 ? notesHTML() : settingsHTML();
  return '<section class="f2-sheet-frame f2-sheet-theme-' + tab + '" role="region" aria-label="Ficha ' + TABS[tab] + '">' +
    '<header class="f2-sheet-head"><strong>' + TABS[tab] + '</strong><button type="button" class="f2-sheet-close" data-act="recolher" aria-label="Recolher ficha ' + TABS[tab] + '">Recolher</button></header>' +
    '<div class="f2-sheet-body">' + body + '</div></section>';
}
/* Ouvir */
function listenHTML() {
  var v = readingVerse();
  return '<div class="f2-panel f2-listen" aria-label="Ouvir versículo">' +
    '<p class="f2-panel-meta">' + esc(ref(v)) + ' · KJV</p>' +
    '<p class="f2-panel-lead">Leitura com voz instalada no Windows, sem internet.</p>' +
    '<div class="f2-panel-controls"><button type="button" data-act="listen">' + (st.speaking ? 'Parar leitura' : 'Ouvir versículo') + '</button>' +
    '<label>Velocidade<select data-rate aria-label="Velocidade de leitura">' + [0.8, 1, 1.2].map(function (r) { return '<option value="' + r + '"' + (r === st.rate ? ' selected' : '') + '>' + r.toFixed(1).replace('.', ',') + '×</option>'; }).join('') + '</select></label></div>' +
    '<p class="f2-panel-feedback" role="status">' + esc(st.listenNotice || (st.speaking ? 'Reproduzindo voz local.' : 'Selecione Ouvir versículo para começar.')) + '</p></div>';
}
var speechGen = 0;
function pickVoice() { // voz local em inglês
  var vs = window.speechSynthesis.getVoices().filter(function (v) { return v.localService && v.lang.toLowerCase().indexOf('en') === 0; });
  return vs.filter(function (v) { return v.lang.toLowerCase() === 'en-us'; })[0] || vs[0];
}
function play() {
  stopSpeech();
  if (!('speechSynthesis' in window)) { st.listenNotice = 'Leitura em voz alta não disponível neste navegador.'; renderPage(); return; }
  var go = function () {
    var voice = pickVoice();
    if (!voice) { st.listenNotice = 'Nenhuma voz local em inglês neste dispositivo. No Windows, o Medite usa as vozes instaladas no sistema.'; renderPage(); return; }
    var gen = ++speechGen, u = new SpeechSynthesisUtterance(readingVerse().text);
    u.lang = voice.lang; u.voice = voice; u.rate = st.rate; u.pitch = 1;
    u.onend = u.onerror = function () { if (gen === speechGen) { st.speaking = false; setPose('parado'); if (st.open && st.tab === 0) renderPage(); } };
    try { window.speechSynthesis.speak(u); } catch (e) { st.listenNotice = 'Leitura em voz alta não disponível neste navegador.'; renderPage(); return; }
    st.listenNotice = ''; st.speaking = true; setPose('falando'); renderPage();
  };
  if (window.speechSynthesis.getVoices().length) go();
  else { var done = false; var once = function () { if (!done) { done = true; go(); } }; window.speechSynthesis.addEventListener('voiceschanged', once, { once: true }); setTimeout(once, 900); }
}
function stopSpeech() {
  speechGen++;
  if ('speechSynthesis' in window) try { window.speechSynthesis.cancel(); } catch (e) {}
  if (st.speaking) { st.speaking = false; if (!st.pulse) setPose('parado'); }
}
/* Bíblia */
function bibleState() {
  if (!st.bible) { var b = books()[0], c = chapters(b)[0]; st.bible = { book: b, chapter: c, verseId: versesOf(b, c)[0].id }; }
  return st.bible;
}
function bibleSelected() { var s = bibleState(); var vs = versesOf(s.book, s.chapter); return vs.filter(function (v) { return v.id === s.verseId; })[0] || vs[0] || null; }
function bibleChange(k, val) {
  var s = bibleState();
  if (k === 'book') { var cs = chapters(val); st.bible = { book: val, chapter: cs[0], verseId: versesOf(val, cs[0])[0].id }; }
  else if (k === 'chapter') { var c = +val; st.bible = { book: s.book, chapter: c, verseId: versesOf(s.book, c)[0].id }; }
  else st.bible = { book: s.book, chapter: s.chapter, verseId: val };
  renderPage();
}
function bibleHTML() {
  var s = bibleState(), sel = bibleSelected();
  var opt = function (val, label, cur) { return '<option value="' + esc(val) + '"' + (String(val) === String(cur) ? ' selected' : '') + '>' + esc(label) + '</option>'; };
  return '<div class="f2-panel f2-bible" aria-label="Navegar pela Bíblia"><div class="f2-bible-pickers">' +
    '<label>Livro<select data-bible="book" aria-label="Livro bíblico">' + books().map(function (b) { return opt(b, b, s.book); }).join('') + '</select></label>' +
    '<label>Capítulo<select data-bible="chapter" aria-label="Capítulo bíblico">' + chapters(s.book).map(function (n) { return opt(n, n, s.chapter); }).join('') + '</select></label>' +
    '<label>Versículo<select data-bible="verse" aria-label="Versículo bíblico">' + versesOf(s.book, s.chapter).map(function (v) { return opt(v.id, v.v, sel.id); }).join('') + '</select></label></div>' +
    '<p class="f2-panel-meta" role="status">Seleção: ' + esc(s.book + ' ' + s.chapter + ':' + sel.v) + '</p>' +
    '<p class="f2-panel-lead">Escolha livro, capítulo e versículo. Confirme para abrir na página principal.</p>' +
    '<button class="f2-bible-open" type="button" data-act="bible-open">Ler na página principal</button></div>';
}
/* Anotações (memória da página; nada é gravado) */
function notesHTML() {
  var v = readingVerse(), list = st.notes.filter(function (n) { return n.verseId === v.id; });
  var count = Array.from(st.noteText || '').length;
  return '<div class="f2-panel f2-notes" role="region" aria-label="Anotações privadas">' +
    '<p class="f2-panel-meta">' + esc(ref(v)) + ' · KJV</p>' +
    '<p class="f2-panel-lead">Suas anotações ficam somente neste computador.</p>' +
    '<label class="f2-notes-label" for="f2-notes-editor">Escreva sua reflexão</label>' +
    '<textarea id="f2-notes-editor" maxlength="' + NOTE_MAX + '" rows="4" placeholder="O que esse versículo trouxe à sua reflexão?"></textarea>' +
    '<div class="f2-notes-save-row"><span aria-label="Caracteres utilizados">' + count + '/' + NOTE_MAX + '</span>' +
    '<button type="button" data-act="note-save"' + (!(st.noteText || '').trim() ? ' disabled' : '') + '>Salvar anotação</button></div>' +
    '<div class="f2-notes-history" aria-label="Histórico do versículo"><h3>Minhas anotações <span>(' + list.length + ')</span></h3>' +
    (list.length ? '' : '<p class="f2-notes-empty">Nenhuma anotação para este versículo.</p>') +
    list.map(function (n) {
      return '<article class="f2-notes-item"><p>' + esc(n.text) + '</p><div class="f2-notes-item-actions"><span>' + new Date(n.createdAt).toLocaleDateString('pt-BR') + '</span>' +
        (st.pendingDelete === n.id ? '<span>Excluir definitivamente?</span><button type="button" data-act="note-confirm" data-id="' + n.id + '">Confirmar</button><button type="button" data-act="note-cancel">Cancelar</button>'
          : '<button type="button" data-act="note-del" data-id="' + n.id + '">Excluir</button>') + '</div></article>';
    }).join('') + '</div>' +
    '<span class="f2-visually-hidden" role="status">' + esc(st.noteNotice || '') + '</span></div>';
}
function updateNoteRow() {
  var row = pageHost.querySelector('.f2-notes-save-row'); if (!row) return;
  row.firstChild.textContent = Array.from(st.noteText || '').length + '/' + NOTE_MAX;
  row.lastChild.disabled = !(st.noteText || '').trim();
}
function saveNote() {
  if (!(st.noteText || '').trim()) return;
  st.notes.unshift({ id: 'n' + Date.now(), verseId: readingVerse().id, text: st.noteText, createdAt: Date.now() });
  st.noteText = ''; st.noteNotice = 'Anotação salva nesta demonstração.'; renderPage();
}
/* Ajustes */
function settingsHTML() {
  var d = st.draft || (st.draft = Object.assign({}, st.prefs));
  var sel = function (v, cur) { return String(v) === String(cur) ? ' selected' : ''; };
  return '<div class="f2-panel f2-settings" role="region" aria-label="Preferências do Medite">' +
    '<p class="f2-panel-lead">Configure suas preferências de leitura e lembretes.</p>' +
    '<label class="f2-settings-field">Frequência dos lembretes<select data-pref="interval" aria-label="Frequência dos lembretes">' +
      '<option value="1"' + sel(1, d.interval) + '>A cada 1 hora</option><option value="3"' + sel(3, d.interval) + '>A cada 3 horas</option><option value="24"' + sel(24, d.interval) + '>Uma vez ao dia</option></select></label>' +
    '<label class="f2-settings-toggle"><input type="checkbox" data-pref="paused"' + (d.paused ? ' checked' : '') + '><span>Pausar lembretes</span></label>' +
    '<div class="f2-settings-times"><label class="f2-settings-field">Silêncio começa<input data-pref="quietStart" aria-label="Início do período de silêncio" type="time" value="' + d.quietStart + '"></label>' +
    '<label class="f2-settings-field">Silêncio termina<input data-pref="quietEnd" aria-label="Fim do período de silêncio" type="time" value="' + d.quietEnd + '"></label></div>' +
    '<p class="f2-settings-hint">Horários iguais desativam o período de silêncio.</p>' +
    '<label class="f2-settings-field">Idioma de leitura<select data-pref="language" aria-label="Idioma"><option value="pt"' + sel('pt', d.language) + '>Português (Brasil)</option><option value="en"' + sel('en', d.language) + '>English</option></select></label>' +
    '<p class="f2-settings-hint">Tradução disponível: ' + (d.language === 'pt' ? 'Bíblia Livre (BLIVRE)' : 'King James Version (KJV)') + '. Outras traduções permanecem pendentes.</p>' +
    '<button type="button" class="f2-settings-save" data-act="settings-save">Salvar preferências</button>' +
    '<p class="f2-settings-status" role="status">' + esc(st.settingsMsg || '') + '</p>' +
    '<p class="f2-settings-hint">As opções de agenda ficam registradas nas preferências locais. A ativação dos lembretes automáticos da F2 e a inicialização com o Windows exigem etapa própria de integração.</p></div>';
}
function saveSettings() {
  var d = st.draft, T = /^([01]\d|2[0-3]):[0-5]\d$/;
  if (!T.test(d.quietStart) || !T.test(d.quietEnd)) st.settingsMsg = 'Informe os horários no formato HH:MM.';
  else if (d.language === 'pt') st.settingsMsg = 'Nesta prévia do site a leitura permanece em inglês (KJV); a Bíblia Livre aguarda verificação de licença para publicação.';
  else { st.prefs = Object.assign({}, d); st.settingsMsg = 'Preferências aplicadas somente nesta demonstração.'; }
  renderPage();
}

/* ---------- Teclado (atalhos reais da página e do círculo) ---------- */
viewport.addEventListener('keydown', function (e) {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  var t = e.target;
  var typing = t instanceof HTMLElement && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName));
  if (!st.open) { if ((e.key === 'Enter' || e.key === ' ') && t === viewport) { e.preventDefault(); userAct(); openPage(); } return; }
  if (typing) return;
  if (e.key === 'Escape') { e.preventDefault(); userAct(); if (st.tab !== null) selectTab(st.tab); else close(); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); userAct(); step(e.key === 'ArrowLeft' ? -1 : 1); }
  else { var i = { o: 0, b: 1, n: 2, a: 3 }[e.key.toLowerCase()]; if (i !== undefined) { e.preventDefault(); userAct(); selectTab(i); } }
});
viewport.tabIndex = 0;
viewport.setAttribute('aria-label', 'Demonstração interativa do Medite. Use Enter para abrir a meditação.');

/* ---------- Câmera (apenas enquadramento do site; a interface não é alterada) ---------- */
var camRect = null, manualCam = null;
function applyCamera() {
  var W = viewport.clientWidth, H = viewport.clientHeight; if (!W) return;
  var r = manualCam || camRect || { x: 0, y: 0, width: 1536, height: 864 };
  var s = Math.min(W / r.width, H / r.height, 1.7);
  var tx = W / 2 - (r.x + r.width / 2) * s, ty = H / 2 - (r.y + r.height / 2) * s;
  tx = Math.min(0, Math.max(W - 1536 * s, tx)); ty = Math.min(0, Math.max(H - 864 * s, ty));
  if (1536 * s < W) tx = (W - 1536 * s) / 2; if (864 * s < H) ty = (H - 864 * s) / 2;
  screen.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + s.toFixed(4) + ')';
}
function pad(r, p) { return { x: r.x - p, y: r.y - p, width: r.width + 2 * p, height: r.height + 2 * p }; }
function autoCamera() {
  var narrow = viewport.clientWidth < 700;
  if (!narrow) camRect = null;
  else if (!st.open) camRect = { x: 1536 - 620, y: 864 - 760, width: 620, height: 760 };
  else {
    var g = layout(WORK, CIRCLE, st.tab !== null);
    camRect = st.tab !== null && g.sheet ? pad({ x: g.ears[0].x - 6, y: g.sheet.y, width: endX(g.sheet) - g.ears[0].x + 6, height: g.sheet.height }, 8)
      : pad({ x: g.page.x, y: g.page.y, width: g.page.width + 62, height: g.page.height }, 8);
  }
  applyCamera();
}
window.addEventListener('resize', autoCamera);
if (window.ResizeObserver) new ResizeObserver(autoCamera).observe(viewport);

/* ---------- Apresentação guiada (8 etapas do roteiro) ---------- */
var spot = $('#spot'), caption = $('#caption'), player = $('#player');
var ORB = { x: CIRCLE.x + 24, y: CIRCLE.y + 24, width: 96, height: 96 };
function spotOn(r) { if (!r) { spot.classList.remove('on'); return; } spot.style.cssText = 'left:' + (r.x - 8) + 'px;top:' + (r.y - 8) + 'px;width:' + (r.width + 16) + 'px;height:' + (r.height + 16) + 'px'; spot.classList.add('on'); }
function reset(open) {
  stopSpeech(); spotOn(null); manualCam = null; st.verseIndex = 4; st.noteText = ''; st.draft = null; st.settingsMsg = ''; st.pendingDelete = null;
  if (open) { if (!st.open) openPage(); st.tab = null; st.library = null; st.bible = null; renderPage(); }
  else if (st.open) close(); else { st.pose = 'parado'; st.pulse = false; renderCircle(); }
  autoCamera();
}
function typeInto(text, ms) {
  var i = 0, n = text.length, every = ms / n;
  return function tick() { if (!st.open || st.tab !== 2) return; i++; st.noteText = text.slice(0, i); var ta = pageHost.querySelector('#f2-notes-editor'); if (ta) ta.value = st.noteText; updateNoteRow(); if (i < n) tourTimeout(tick, every); };
}
var SCENES = [
  { label: 'Área de trabalho', dur: 6000, cap: '<strong>Área de trabalho.</strong> O Medite fica discretamente no canto da tela, sobre o Windows, enquanto você trabalha.',
    acts: [[0, function () { reset(false); }]] },
  { label: 'Avatar', dur: 6500, cap: '<strong>O avatar.</strong> Um círculo de 96 px com moldura dourada e um personagem bíblico. Quando chega um novo versículo, ele acena.',
    acts: [[0, function () { reset(false); manualCam = pad(ORB, viewport.clientWidth < 700 ? 150 : 210); applyCamera(); spotOn(ORB); }], [1300, function () { verseArrived(); }]] },
  { label: 'Meditação', dur: 7000, cap: '<strong>Abrir a meditação.</strong> Um clique no avatar abre a página com o versículo, a referência e as ações Anterior, Próximo, Copiar e WhatsApp.',
    acts: [[0, function () { reset(false); }], [700, function () { openPage(); }], [4200, function () { step(1); }], [5600, function () { step(-1); }]] },
  { label: 'Bíblia', dur: 8500, cap: '<strong>Bíblia.</strong> Na gaveta roxa, escolha livro, capítulo e versículo e leia na página principal. O botão dourado “Meditação” volta ao versículo do dia.',
    acts: [[0, function () { reset(true); }], [600, function () { selectTab(1); }], [2600, function () { bibleChange('book', 'Psalms'); }], [4000, function () { bibleChange('chapter', '27'); }], [5600, function () { var v = bibleSelected(); if (v) { st.library = v; renderPage(); } }]] },
  { label: 'Ouvir', dur: 6500, cap: '<strong>Ouvir.</strong> O versículo é lido em voz alta com a voz instalada no Windows, sem internet. Toque em “Ouvir versículo” para escutar com a voz do seu dispositivo.',
    acts: [[0, function () { reset(true); }], [600, function () { selectTab(0); }]] },
  { label: 'Anotações', dur: 8000, cap: '<strong>Anotações.</strong> Registre sua reflexão sobre o versículo; ela fica somente no seu computador. (Texto fictício de demonstração.)',
    acts: [[0, function () { reset(true); }], [600, function () { selectTab(2); }], [1500, function () { typeInto('Coragem para hoje: Deus está comigo em cada tarefa.', 2600)(); }], [5200, function () { saveNote(); }]] },
  { label: 'Ajustes', dur: 6500, cap: '<strong>Ajustes.</strong> Frequência dos lembretes, pausa, período de silêncio e idioma de leitura. Os lembretes automáticos ainda estão em validação.',
    acts: [[0, function () { reset(true); }], [600, function () { selectTab(3); }]] },
  { label: 'Encerramento', dur: 6000, cap: '<strong>Medite.</strong> Fechou, voltou ao trabalho: o avatar continua ali, pronto para o próximo momento com Deus.',
    acts: [[0, function () { reset(true); }], [900, function () { close(); }], [1600, function () { manualCam = pad(ORB, viewport.clientWidth < 700 ? 150 : 260); applyCamera(); spotOn(ORB); }]] }
];
var TOTAL = SCENES.reduce(function (a, s) { return a + s.dur; }, 0);
var tour = { i: 0, t: 0, playing: false, done: [], last: 0, pending: [] };
var chapBox = $('#chapters');
SCENES.forEach(function (s, i) {
  var b = document.createElement('button'); b.type = 'button'; b.className = 'chap'; b.setAttribute('role', 'listitem'); b.textContent = (i + 1) + '. ' + s.label;
  b.addEventListener('click', function () { go(i, true); }); chapBox.appendChild(b);
});
function tourTimeout(fn, ms) { tour.pending.push({ at: tour.t + ms, fn: fn }); }
function runDue() {
  var sc = SCENES[tour.i];
  sc.acts.forEach(function (a, k) { if (!tour.done[k] && tour.t >= a[0]) { tour.done[k] = true; a[1](); } });
  var due = tour.pending.filter(function (p) { return tour.t >= p.at; });
  tour.pending = tour.pending.filter(function (p) { return tour.t < p.at; });
  due.forEach(function (p) { p.fn(); });
}
function ui() {
  var before = SCENES.slice(0, tour.i).reduce(function (a, s) { return a + s.dur; }, 0);
  $('#progressBar').style.width = (100 * Math.min(1, (before + tour.t) / TOTAL)).toFixed(2) + '%';
  $('#stepLabel').textContent = 'Etapa ' + (tour.i + 1) + ' de ' + SCENES.length;
  chapBox.querySelectorAll('.chap').forEach(function (c, k) { if (k === tour.i) c.setAttribute('aria-current', 'step'); else c.removeAttribute('aria-current'); });
  caption.innerHTML = SCENES[tour.i].cap;
  player.classList.toggle('playing', tour.playing);
  $('#btnPlay').setAttribute('aria-label', tour.playing ? 'Pausar apresentação' : 'Iniciar apresentação');
}
function go(i, keepPlaying) {
  tour.i = Math.max(0, Math.min(SCENES.length - 1, i)); tour.t = 0; tour.done = []; tour.pending = []; tour.last = performance.now();
  if (!keepPlaying) tour.playing = false;
  runDue(); ui();
}
function frame(now) {
  if (tour.playing) {
    tour.t += Math.min(100, now - tour.last);
    if (tour.t >= SCENES[tour.i].dur) {
      if (tour.i < SCENES.length - 1) go(tour.i + 1, true);
      else { tour.t = SCENES[tour.i].dur; tour.playing = false; ui(); }
    } else { runDue(); ui(); }
  }
  tour.last = now; requestAnimationFrame(frame);
}
function userAct() { if (tour.playing && !tour.internal) { tour.playing = false; spotOn(null); manualCam = null; autoCamera(); ui(); } }
// Ações da apresentação não contam como interação do visitante.
SCENES.forEach(function (s) { s.acts = s.acts.map(function (a) { var f = a[1]; return [a[0], function () { tour.internal = true; try { f(); } finally { tour.internal = false; } }]; }); });
var _tt = tourTimeout; tourTimeout = function (fn, ms) { _tt(function () { tour.internal = true; try { fn(); } finally { tour.internal = false; } }, ms); };

$('#btnPlay').addEventListener('click', function () {
  if (!tour.playing && tour.i === SCENES.length - 1 && tour.t >= SCENES[tour.i].dur) go(0, true);
  else if (!tour.playing && tour.t === 0 && !tour.started) go(tour.i, true);
  tour.started = true; tour.playing = !tour.playing; tour.last = performance.now(); ui();
});
$('#btnPrev').addEventListener('click', function () { go(tour.i - 1, tour.playing); });
$('#btnNext').addEventListener('click', function () { go(tour.i + 1, tour.playing); });
$('#btnRestart').addEventListener('click', function () { go(0, tour.playing); });
$('#btnFull').addEventListener('click', function () {
  var el = player;
  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else { var p = (el.requestFullscreen || el.webkitRequestFullscreen).call(el); if (p && p.catch) p.catch(function () {}); }
  } catch (e) {}
});
document.addEventListener('fullscreenchange', function () { setTimeout(autoCamera, 60); });

/* Início: área de trabalho com o avatar, sem reprodução automática. */
renderCircle(); autoCamera(); tour.last = performance.now(); runDueInit();
function runDueInit() { tour.internal = true; SCENES[0].acts[0][1](); tour.done = [true]; tour.internal = false; ui(); }
requestAnimationFrame(frame);
window.MediteDemo = { state: st, go: go, scenes: SCENES };
})();
