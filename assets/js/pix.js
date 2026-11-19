/* Área "Apoie o Medite" — PIX estático (BR Code / EMV), sem servidor e sem coleta de dados.
 * Enquanto MEDITE_SITE_CONFIG.pix.ativo = false, NENHUM código de pagamento é gerado:
 * o QR exibido codifica apenas um texto de demonstração, sem valor de pagamento. */
(function () {
'use strict';
var $ = function (s) { return document.querySelector(s); };
var cfg = (window.MEDITE_SITE_CONFIG || {}).pix || {};
function cpfValid(v) {
  if (!/^\\d{11}$/.test(v) || /^(\\d)\\1{10}$/.test(v)) return false;
  for (var n = 9; n <= 10; n++) {
    var sum = 0;
    for (var i = 0; i < n; i++) sum += Number(v[i]) * (n + 1 - i);
    var check = (sum * 10) % 11; if (check === 10) check = 0;
    if (Number(v[n]) !== check) return false;
  }
  return true;
}
function normalizedKey(value) {
  var s = String(value || '').trim();
  if (/^[\\d.\\-\\s]+$/.test(s)) {
    var digits = s.replace(/\\D/g, '');
    if (digits.length === 11 && cpfValid(digits)) return digits;
    if (digits.length === 14 || digits.length === 10 || digits.length === 11) return digits;
  }
  return s;
}
var chave = normalizedKey(cfg.chave);
var ativo = Boolean(cfg.ativo && chave && cfg.nome && cfg.cidade);
if (ativo) {
  var demoLabel = document.querySelector('.support .demo-flag');
  if (demoLabel) demoLabel.hidden = true;
}

/* CRC16-CCITT-FALSE (poli 0x1021, inicial 0xFFFF), exigido pelo BR Code. */
function crc16(str) {
  var crc = 0xFFFF;
  for (var i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (var j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}
function f(id, v) { return id + String(v.length).padStart(2, '0') + v; }
function ascii(s, max) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\x20-\x7E]/g, '').toUpperCase().slice(0, max); }
/* Payload PIX estático com valor (Manual de Padrões para Iniciação do Pix, BCB). */
function brcode(valor) {
  var p = f('00', '01') +
    f('26', f('00', 'br.gov.bcb.pix') + f('01', chave)) +
    f('52', '0000') + f('53', '986') + f('54', valor.toFixed(2)) + f('58', 'BR') +
    f('59', ascii(cfg.nome, 25)) + f('60', ascii(cfg.cidade, 15)) +
    f('62', f('05', (cfg.txid || 'MEDITE').replace(/[^A-Za-z0-9]/g, '').slice(0, 25) || '***')) + '6304';
  return p + crc16(p);
}
window.MeditePixSelfTest = function () {
  return crc16('123456789') === '29B1' && cpfValid('52998224725') &&
    normalizedKey('529.982.247-25') === '52998224725' &&
    !cpfValid('52998224726');
};

function drawQR(canvas, text) {
  var qr = new window.MediteQR(-1, 0 /* nível M */); qr.addData(text); qr.make();
  var n = qr.getModuleCount(), quiet = 3, size = canvas.width, cell = Math.floor(size / (n + quiet * 2));
  var off = Math.floor((size - cell * n) / 2), ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size); ctx.fillStyle = '#1c1b19';
  for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (qr.isDark(r, c)) ctx.fillRect(off + c * cell, off + r * cell, cell, cell);
}

var cards = Array.prototype.slice.call(document.querySelectorAll('.dcard'));
var box = $('#pixBox'), code = $('#pixCode'), status = $('#pixStatus');
$('#pixStamp').hidden = ativo;
function choose(card, focus) {
  cards.forEach(function (c) {
    var on = c === card, img = c.querySelector('img');
    c.setAttribute('aria-checked', String(on)); c.tabIndex = on ? 0 : -1;
    // Pose "acenando" no card escolhido; "parado" nos demais (artes originais).
    if (!img.dataset.restSrc) img.dataset.restSrc = img.getAttribute('src');
    img.src = on ? img.dataset.altSrc : img.dataset.restSrc;
  });
  if (focus) card.focus();
  var valor = Number(card.dataset.valor), rotulo = 'R$ ' + valor.toFixed(2).replace('.', ',');
  $('#pixValor').textContent = rotulo + ' · ' + card.dataset.nome;
  var payload = ativo ? brcode(valor) : 'MEDITE - DEMONSTRACAO - SEM VALOR DE PAGAMENTO - ' + rotulo;
  code.value = ativo ? payload : 'MODO DEMONSTRAÇÃO — o código PIX Copia e Cola de ' + rotulo + ' aparecerá aqui após a ativação autorizada. Este texto não realiza pagamentos.';
  drawQR($('#pixCanvas'), payload);
  $('#pixCanvas').setAttribute('aria-label', ativo ? 'QR Code PIX de ' + rotulo : 'QR Code de demonstração, sem valor de pagamento');
  status.textContent = '';
  box.hidden = false;
  // Após selecionar um avatar, mostrar a área PIX na tela (desktop e celular).
  window.requestAnimationFrame(function () {
    box.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  });
}
cards.forEach(function (c, i) {
  c.tabIndex = i === 0 ? 0 : -1;
  c.addEventListener('click', function () { choose(c); });
  c.addEventListener('keydown', function (e) {
    var d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
    if (d) { e.preventDefault(); choose(cards[(i + d + cards.length) % cards.length], true); }
  });
});
$('#pixCopy').addEventListener('click', function () {
  var done = function () { status.textContent = ativo ? 'Código copiado.' : 'Texto de demonstração copiado.'; };
  try { navigator.clipboard.writeText(code.value).then(done, function () { code.select(); status.textContent = 'Selecione e copie o código manualmente.'; }); }
  catch (e) { code.select(); status.textContent = 'Selecione e copie o código manualmente.'; }
});
})();
