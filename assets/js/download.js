/* Medite download: distinct PT-BR / EN-US packages, fail closed without verified release. */
(function(){
 'use strict';
 var cfg=window.MEDITE_SITE_CONFIG&&window.MEDITE_SITE_CONFIG.download;
 var button=document.getElementById('medite-download-button');
 if(!button)return;
 var params=new URLSearchParams(location.search);
 var selected=params.get('lang');
 var lang=selected==='en'?'en':selected==='pt'?'pt':null;
 if(!lang){try{lang=localStorage.getItem('medite.site.language')==='en'?'en':'pt'}catch(_){lang='pt'}}
 var locale=cfg&&cfg.locales&&cfg.locales[lang];
 var prefix='https://github.com/john-notebook-brasil/medite-downloads/releases/download/v0.3.1/';
 var filename=lang==='en'?/^[A-Za-z0-9._-]*en-US[A-Za-z0-9._-]*\.exe$/i:/^[A-Za-z0-9._-]*pt-BR[A-Za-z0-9._-]*\.exe$/i;
 var valid=!!(cfg&&cfg.aprovado===true&&cfg.versao==='0.3.1'&&locale&&locale.aprovado===true&&
  typeof locale.url==='string'&&locale.url.startsWith(prefix)&&filename.test(locale.url.slice(prefix.length))&&locale.url===prefix+'Medite-0.3.1-'+(lang==='en'?'en-US':'pt-BR')+'-unsigned.exe'&&
  /^[a-f0-9]{64}$/i.test(locale.sha256||''));
 if(!valid)return;
 var a=document.createElement('a');
 a.id=button.id;a.className=button.className;
 a.href=locale.url;a.rel='noopener';a.hreflang=lang==='en'?'en-US':'pt-BR';
 a.textContent=(lang==='en'?'Download Medite ':'Baixar Medite ')+cfg.versao+(lang==='en'?' for Windows (English)':' para Windows (Português)');
 a.setAttribute('aria-describedby','dl-note medite-download-checksum medite-download-warning');
 button.replaceWith(a);
 var version=document.getElementById('medite-download-version');
 var desc=document.getElementById('dl-note');
 var sum=document.getElementById('medite-download-checksum');
 var warn=document.getElementById('medite-download-warning');
 if(version)version.textContent=(lang==='en'?'Version ':'Versão ')+cfg.versao+' · Windows x64'+(locale.tamanho?' · '+locale.tamanho:'');
 if(desc)desc.textContent=lang==='en'?'Free download from the official Medite release repository.':'Download gratuito diretamente do repositório oficial do Medite.';
 if(sum){sum.hidden=false;sum.textContent='SHA-256: '+locale.sha256.toLowerCase()}
 if(warn){warn.hidden=false;warn.textContent=lang==='en'?'This installer is not digitally signed. Windows may display a security warning. Verify the official source and checksum.':(cfg.avisoAssinatura||'Instalador sem assinatura digital. Confira a origem e o SHA-256.')}
})();