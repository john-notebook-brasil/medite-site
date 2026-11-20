/* Download público do Medite. Fail-closed: exige autorização e metadados íntegros. */
(function () {
  'use strict';
  const cfg = window.MEDITE_SITE_CONFIG && window.MEDITE_SITE_CONFIG.download;
  const button = document.getElementById('medite-download-button');
  if (!button) return;
  // Mesmo se o script, o JSON ou a hospedagem falharem, o botão permanece desativado.
  const ready = cfg && cfg.aprovado === true &&
    cfg.versao === '0.3.0' &&
    typeof cfg.url === 'string' &&
    /^https:\/\/github\.com\/john-notebook-brasil\/medite-downloads\/releases\/download\/v0\.3\.0\/[A-Za-z0-9._-]+\.exe$/.test(cfg.url) &&
    /^[a-f0-9]{64}$/i.test(cfg.sha256 || '');
  if (!ready) return;
  const version = document.getElementById('medite-download-version');
  const description = document.getElementById('dl-note');
  const checksum = document.getElementById('medite-download-checksum');
  const warning = document.getElementById('medite-download-warning');
  const a = document.createElement('a');
  a.id = button.id;
  a.className = button.className;
  a.href = cfg.url;
  a.textContent = 'Baixar Medite ' + cfg.versao + ' para Windows';
  a.setAttribute('aria-describedby', 'dl-note medite-download-checksum medite-download-warning');
  button.replaceWith(a);
  if (version) version.textContent = 'Versão ' + cfg.versao + ' · Windows x64 · ' + (cfg.tamanho || '');
  if (description) description.textContent = 'Download gratuito diretamente do repositório oficial de distribuição.';
  if (checksum) {checksum.hidden = false; checksum.textContent = 'SHA-256: ' + cfg.sha256.toLowerCase();}
  if (warning) {warning.hidden = false; warning.textContent = cfg.avisoAssinatura || 'Confira a origem e a assinatura do instalador antes de executá-lo.';}
})();
