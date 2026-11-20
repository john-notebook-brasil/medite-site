/* Site language switching: PT-BR default, EN-US on request. No tracking or remote translation. */
(function(){
'use strict';
var params=new URLSearchParams(location.search);
var requested=params.get('lang');
var language=requested==='en'?'en':requested==='pt'?'pt':null;
if(language){try{localStorage.setItem('medite.site.language',language)}catch(_){}}
if(!language){try{language=localStorage.getItem('medite.site.language')==='en'?'en':'pt'}catch(_){language='pt'}}
document.documentElement.lang=language==='en'?'en-US':'pt-BR';
document.querySelectorAll('[data-site-lang]').forEach(function(el){
var selected=el.dataset.siteLang===language;
el.setAttribute('aria-current',selected?'true':'false');
el.classList.toggle('active',selected);
if(!selected){var url=new URL(el.href);url.hash=location.hash||'#inicio';el.href=url.pathname+url.search+url.hash}
});
if(language!=='en')return;
var translations={
 "Pular para o conteúdo": "Skip to content",
 "Abrir menu": "Open menu",
 "Principal": "Main navigation",
 "Início": "Home",
 "Como funciona": "How it works",
 "Recursos": "Features",
 "Apoie o Medite": "Support Medite",
 "Sobre": "About",
 "Contato": "Contact",
 "Baixar": "Download",
 "Aplicativo cristão para Windows": "Christian app for Windows",
 "Um momento com Deus, ": "A moment with God, ",
 "mesmo nos dias mais corridos.": "even on your busiest days.",
 "O Medite acompanha sua rotina no Windows com versículos bíblicos, momentos de reflexão e recursos para a leitura da Palavra, de forma leve e discreta.": "Medite accompanies your day on Windows with Scripture, moments of reflection, and tools to read God's Word, quietly and unobtrusively.",
 "Características": "Features",
 "Gratuito": "Free",
 "Offline nas funções essenciais": "Core features work offline",
 "Para Windows": "For Windows",
 "Sem login obrigatório": "No account required",
 "Sem publicidade invasiva": "No intrusive ads",
 "Ver o Medite em funcionamento": "See Medite in action",
 "Baixar gratuitamente": "Download for free",
 "Avatares originais do Medite com a moldura dourada": "Medite's original avatars with a golden frame",
 "Josué": "Joshua",
 "fechar": "close",
 "JOSUÉ 1:9": "JOSHUA 1:9",
 "PT-BR · DEMONSTRAÇÃO": "EN-US · DEMO",
 "Seja forte e corajoso. Não tenha medo nem desanime, pois o SENHOR, seu Deus, estará com você por onde andar.": "Be strong and courageous. Do not be afraid or discouraged, for the LORD your God will be with you wherever you go.",
 "Medite nesse texto.": "Meditate on this passage.",
 "Anterior": "Previous",
 "Próximo": "Next",
 "Copiar": "Copy",
 "Bíblia": "Bible",
 "Anotações": "Notes",
 "Ajustes": "Settings",
 "Ouvir": "Listen",
 "Recolher": "Collapse",
 "Leitura com a voz instalada no Windows.": "Read aloud using a voice installed on Windows.",
 "Ouvir versículo": "Read verse aloud",
 "Velocidade: 1,0×": "Speed: 1.0×",
 "Reprodução ilustrativa · Português brasileiro": "Illustrative mockup · English (US)",
 "Conheça o Medite em funcionamento": "See how Medite works",
 "Um pequeno avatar circular com moldura dourada fica sobre a sua área de trabalho. Clique nele e a meditação se abre; seis gavetas levam a Ouvir, Bíblia, Anotações, Presença, Ajustes e Sobre.": "A small circular avatar with a golden frame floats over your desktop. Click it to open a meditation; six side panels give access to Listen, Bible, Notes, Presence, Settings, and About.",
 "Reprodução interativa.": "Interactive demonstration.",
 "As telas abaixo utilizam estilos, dimensões e avatares inspirados no código real do Medite F2 (versão 0.3.0), com textos demonstrativos adaptados para português. Não é uma gravação de tela. Nesta prévia nada é salvo e nenhum lembrete é agendado.": "The screens below recreate the styling, proportions, and avatars of Medite F2 (version 0.3.0), using English demonstration paraphrases. This is not a screen recording. Nothing you type is saved and no reminders are scheduled.",
 "Documentos": "Documents",
 "Planilha": "Spreadsheet",
 "Lixeira": "Recycle Bin",
 "Pesquisar": "Search",
 "Área de trabalho ilustrativa com o Medite": "Illustrated desktop with Medite",
 "Controles da apresentação": "Demo controls",
 "Etapa anterior": "Previous step",
 "Próxima etapa": "Next step",
 "Iniciar apresentação": "Play demo",
 "Reiniciar apresentação": "Restart demo",
 "Tela cheia": "Full screen",
 "Etapa 1 de 8": "Step 1 of 8",
 "Escolha um recurso para observar": "Choose a feature to explore",
 "Você também pode usar o Medite livremente: clique no avatar, nas gavetas e nos botões. Atalhos reais funcionam quando a demonstração está em foco: ← → versículos · Esc · O · B · N · A.": "You can also explore Medite freely: click the avatar, side tabs, and buttons. Keyboard shortcuts work when the demo has focus: ← → verses · Esc · O · B · N · A.",
 "Gravação real do Medite": "Real Medite screen recording",
 "Gravação autêntica em preparação": "Screen recording in preparation",
 "Este espaço exibirá uma gravação contínua do Medite F2 instalado no Windows, com capítulos (avatar, meditação, Bíblia, Ouvir, Anotações, Ajustes). O player já está pronto; falta apenas o arquivo de vídeo capturado no computador real.": "This section will show an authentic continuous recording of Medite F2 on Windows (avatar, meditation, Bible, Listen, Notes, Settings). The video player is ready; the actual recording has not yet been added.",
 "Capítulos da gravação": "Recording chapters",
 "Tudo o que você precisa para meditar, sem distrações": "Everything you need to reflect, without distractions",
 "Mostramos com transparência o que já foi testado no Windows e o que ainda está em validação.": "We clearly identify what has been tested on Windows and what still needs validation.",
 "Testado no Windows": "Tested on Windows",
 "Em validação": "Under review",
 "Meditações e versículos": "Meditations and Bible verses",
 "O avatar circular flutua sobre a área de trabalho. Um clique abre a página de meditação com o versículo, a referência e a tradução.": "The circular avatar floats over your desktop. One click opens the meditation page with the verse, reference, and Bible edition.",
 "Avatar F2 e moldura dourada": "F2 avatar and golden frame",
 "Página de meditação": "Meditation page",
 "Anterior e Próximo": "Previous and Next",
 "Leitura e navegação bíblica": "Bible reading and navigation",
 "Escolha livro, capítulo e versículo na gaveta Bíblia e leia na página principal, com retorno à meditação.": "Choose a book, chapter, and verse from the Bible panel and read it on the main page, then return to your meditation.",
 "Gaveta Bíblia": "Bible panel",
 "Bíblia completa em português": "Complete Portuguese Bible",
 "Botão de retorno à meditação": "Return to meditation button",
 "Narração dos textos": "Read passages aloud",
 "O versículo pode ser lido em voz alta com a voz instalada no próprio Windows, sem internet, em três velocidades.": "Listen to Scripture using voices installed on Windows, with no internet connection, at three reading speeds.",
 "Leitura com voz local": "Offline text-to-speech",
 "Anotações pessoais": "Personal notes",
 "Registre sua reflexão sobre cada versículo. As anotações ficam somente no seu computador.": "Write your reflections on each verse. Notes stay on your own computer.",
 "Salvar anotação": "Save note",
 "Persistência entre sessões": "Saved across sessions",
 "Compartilhamento": "Sharing",
 "Copie o versículo ou envie pelo WhatsApp quando você quiser. Nada é compartilhado automaticamente.": "Copy a verse or share it via WhatsApp whenever you choose. Nothing is shared automatically.",
 "WhatsApp iniciado por você": "WhatsApp only when you choose",
 "Personalização e lembretes": "Personalization and reminders",
 "Frequência dos lembretes, pausa, período de silêncio e idioma de leitura, tudo guardado no seu computador.": "Choose reminder frequency, pauses, quiet hours, and reading language. Preferences remain on your computer.",
 "Gaveta Ajustes": "Settings panel",
 "Lembretes automáticos": "Automatic reminders",
 "Iniciar com o Windows e bandeja": "Start with Windows and system tray",
 "Baixar aplicativo": "Download the app",
 "Gratuito para Windows": "Free for Windows",
 "O Medite será distribuído gratuitamente, sem cadastro e sem publicidade. O instalador está em fase final de testes e será liberado aqui assim que for aprovado.": "Medite will be distributed for free, without registration or advertising. The installer is undergoing final checks and will appear here once approved.",
 "Windows 64 bits (x64)": "Windows 64-bit (x64)",
 "Funciona offline nas funções essenciais": "Core features work offline",
 "Sem login, sem assinatura, sem compras dentro do app": "No account, subscription, or in-app purchases",
 "Medite para Windows": "Medite for Windows",
 "Versão em testes": "Version under testing",
 "Disponível em breve": "Coming soon",
 "O instalador ainda não está disponível para download público.": "The installer is not yet available for public download.",
 "Contribuição voluntária": "Voluntary donation",
 "O Medite é gratuito e continuará acessível a todos. Se desejar, você pode contribuir voluntariamente para ajudar em sua manutenção e desenvolvimento.": "Medite is free and will remain accessible to everyone. If you wish, you may support maintenance and development with an optional donation.",
 "Modo demonstração.": "Demonstration mode.",
 "O PIX ainda não foi ativado. Os códigos abaixo não têm valor de pagamento e não transferem dinheiro.": "The payment demonstration does not send money.",
 "Escolha um valor": "Choose an amount",
 "Os personagens apenas representam cada valor. Todos continuam disponíveis gratuitamente no Medite; nenhuma contribuição desbloqueia recursos.": "The characters simply illustrate donation amounts. Every character is free, and donations do not unlock features.",
 "Valor escolhido: ": "Selected amount: ",
 "PIX Copia e Cola": "Pix copy and paste",
 "Copiar código": "Copy code",
 "DEMONSTRAÇÃO": "DEMO",
 "Contribuição voluntária. O site não recebe nem armazena dados bancários e não confirma pagamentos; a confirmação acontece somente no aplicativo do seu banco.": "Donations are optional. This website does not collect banking information or confirm payments; your banking app handles confirmation.",
 "Um projeto cristão, gratuito por propósito": "A Christian project, free by design",
 "O Medite nasceu do desejo de lembrar a Palavra de Deus no meio do trabalho, dos estudos e das tarefas do dia. Em vez de mais uma janela disputando sua atenção, ele permanece discreto no canto da tela e se abre quando você quiser parar por um instante.": "Medite was created to bring God's Word into the middle of work, study, and everyday life. Rather than another distracting window, it stays quietly at the edge of your screen until you choose a moment to reflect.",
 "O aplicativo é e continuará gratuito. Não há assinatura, compras de avatares nem recursos bloqueados. As contribuições, totalmente voluntárias, ajudam a manter o desenvolvimento.": "The app is free and will remain so. There are no subscriptions, paid avatars, or locked features. Optional donations support ongoing development.",
 "Privado por padrão.": "Private by design.",
 "Sem conta, sem rastreamento; suas anotações ficam no seu computador.": "No account or app-level tracking; your notes stay on your computer.",
 "Offline.": "Offline.",
 "Versículos, leitura e voz funcionam sem internet.": "Scripture, reading, and speech work without internet.",
 "Discreto.": "Unobtrusive.",
 "Um pequeno avatar, sem janela fixa ocupando a tela.": "A small avatar without a permanent desktop window.",
 "Personagens bíblicos.": "Biblical characters.",
 "Quinze personagens e temas, de Abraão a João, incluindo a Cruz.": "Fifteen biblical characters and themes, from Abraham to John, including the Cross.",
 "Dúvidas, sugestões ou suporte? Fale com o criador do Medite, John Robert Martins Pereira.": "Questions, suggestions, or support? Contact the creator of Medite.",
 "Um momento com Deus.": "A moment with God.",
 "Informações legais": "Legal information",
 "Política de privacidade": "Privacy policy",
 "Termos de uso": "Terms of use",
 "Créditos e licenças": "Credits and licenses",
 "Suporte": "Support",
 "Textos em português: adaptações demonstrativas, não atribuídas à Bíblia Livre. Capturas históricas da versão 0.3.0 permanecem no idioma original.": "English demonstration passages are paraphrases, not attributed to a specific Bible edition. Historical screenshots remain in their original language.",
 "Criado por": "Created by",
 "Meditação": "Meditation",
 "Presença": "Presence",
 "Abrir página": "Open page",
 "Fechar página": "Close page",
 "Retomar": "Resume",
 "Reprodução interativa": "Interactive demonstration",
 "Leitura bíblica": "Bible reading",
 "Voltar à meditação": "Return to meditation",
 "Versículo copiado": "Verse copied",
 "Copiado": "Copied",
 "Não foi possível copiar": "Unable to copy",
 "Ouvir texto": "Listen to passage",
 "Navegação entre versículos": "Verse navigation",
 "Versículos": "Verses",
 "Livro": "Book",
 "Capítulo": "Chapter",
 "Versículo": "Verse",
 "Velocidade": "Speed",
 "Parar leitura": "Stop reading",
 "Nova anotação": "New note",
 "Nenhuma anotação": "No notes",
 "Salvar": "Save",
 "Excluir": "Delete",
 "Cancelar": "Cancel",
 "Confirmar": "Confirm",
 "Sua anotação": "Your note",
 "Pausar Medite": "Pause Medite",
 "Idioma": "Language",
 "Português": "Portuguese",
 "Inglês": "English",
 "Abraão": "Abraham",
 "Moisés": "Moses",
 "José do Egito": "Joseph",
 "Davi": "David",
 "Salomão": "Solomon",
 "Elias": "Elijah",
 "Rute": "Ruth",
 "Ester": "Esther",
 "Maria": "Mary",
 "Pedro": "Peter",
 "Paulo": "Paul",
 "João": "John",
 "Cruz": "Cross",
 "A cruz": "The Cross",
 "Gênesis": "Genesis",
 "Êxodo": "Exodus",
 "Salmos": "Psalms",
 "Provérbios": "Proverbs",
 "Isaías": "Isaiah",
 "Jeremias": "Jeremiah",
 "Lucas": "Luke",
 "Mateus": "Matthew",
 "Romanos": "Romans",
 "Filipenses": "Philippians",
 "1 Pedro": "1 Peter"
};
function clean(s){return String(s).replace(/\s+/g,' ').trim()}
var translated=document.createElement('textarea');
function textTranslate(t){
 var key=clean(t), r=translations[key];
 if(r!==undefined)return r;
 var m=key.match(/^Etapa (\d+) de (\d+)$/);if(m)return 'Step '+m[1]+' of '+m[2];
 m=key.match(/^Versão (\d+\.\d+\.\d+) · Windows x64/);if(m)return key.replace(/^Versão/,'Version');
 return null;
}
function translate(root){
 var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(var i=0;i<nodes.length;i++){
 var n=nodes[i], parent=n.parentElement;
 if(!parent||/^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/i.test(parent.tagName))continue;
 var original=n.nodeValue, replacement=textTranslate(original);
 if(replacement!==null){var a=original.match(/^\s*/)[0],b=original.match(/\s*$/)[0];n.nodeValue=a+replacement+b}
 }
 var all=root.nodeType===1?[root].concat(Array.from(root.querySelectorAll('*'))):Array.from(root.querySelectorAll('*'));
 all.forEach(function(el){
 if(/^(SCRIPT|STYLE)$/i.test(el.tagName))return;
 ['aria-label','alt','title','placeholder'].forEach(function(attr){
 var original=el.getAttribute(attr), replacement=original&&textTranslate(original);
 if(replacement!==null&&replacement!==undefined)el.setAttribute(attr,replacement);
 });
 });
}

/* English demo passages are editorial paraphrases, not the licensed KJV text. */
if(window.MEDITE_DATA&&Array.isArray(window.MEDITE_DATA.verses)){
 var demoVerses={"v001":"I will make you into a great nation, and I will bless you. I will make your name great, and you will be a blessing.","v002":"God led him outside and said: Look up at the sky and count the stars, if you can. So shall your descendants be.","v003":"The LORD will fight for you; you need only remain still.","v004":"My presence will go with you, and I will give you rest.","v005":"Have I not commanded you? Be strong and courageous. Do not be afraid or discouraged, for the LORD your God will be with you wherever you go.","v006":"Choose today whom you will serve. As for me and my household, we will serve the LORD.","v007":"Do not urge me to leave you. Wherever you go, I will go; where you stay, I will stay. Your people will be my people, and your God my God.","v008":"May the LORD reward your work, for you have come to seek refuge under His wings.","v009":"The LORD is my shepherd; I shall not lack anything.","v010":"The LORD is my light and my salvation; whom shall I fear? The LORD is the strength of my life.","v011":"Create in me a clean heart, O God, and renew a steadfast spirit within me.","v012":"Trust in the LORD with all your heart and do not lean only on your own understanding.","v013":"Acknowledge the LORD in all your ways, and He will make your paths straight.","v014":"Those who wait for the LORD will renew their strength. They will soar on wings like eagles, run without growing weary, and walk without fainting.","v015":"Do not fear, for I am with you. Do not be discouraged, for I am your God. I will strengthen and help you.","v016":"I know the plans I have for you, says the LORD, plans for peace and hope and a future.","v017":"Call to me and I will answer you and show you great things you do not yet know.","v018":"My God sent His angel and shut the lions' mouths, so they did not hurt me.","v019":"Blessed be the name of God forever and ever, for wisdom and power belong to Him.","v020":"If you remain silent now, deliverance will rise from another place. And who knows whether you have come to the kingdom for such a time as this?","v021":"Mary said: I am the Lord's servant. May it happen to me according to your word.","v022":"And Mary said: My soul magnifies the Lord.","v023":"Jesus said: Come. Peter stepped out of the boat and walked on the water toward Jesus.","v024":"Cast all your worries on Him, because He cares for you.","v025":"We know that all things work together for good for those who love God and are called according to His purpose.","v026":"I can do all things through Him who strengthens me.","v027":"Do not be anxious about anything. Bring your requests to God in prayer and thanksgiving.","v028":"Jesus said: I am the light of the world. Whoever follows me will not walk in darkness but will have the light of life.","v029":"Jesus replied: I am the way, the truth, and the life. No one comes to the Father except through me.","v030":"I am the vine; you are the branches. Whoever remains in me bears much fruit; apart from me you can do nothing."};
 window.MEDITE_DATA.verses.forEach(function(v){if(demoVerses[v.id]){v.text=demoVerses[v.id];v.book=translations[v.book]||v.book}});
}

translate(document.body);
document.title='Medite — A moment with God, even on your busiest days';
document.querySelector('meta[name="description"]')?.setAttribute('content','Medite is a free Christian app for Windows with offline Scripture, gentle reminders, and private notes.');
document.querySelector('meta[property="og:locale"]')?.setAttribute('content','en_US');
document.querySelector('meta[property="og:title"]')?.setAttribute('content','Medite — A moment with God');
document.querySelector('meta[property="og:description"]')?.setAttribute('content','Free Christian app for Windows with offline Bible reading and daily moments of reflection.');
var dl=window.MEDITE_SITE_CONFIG&&window.MEDITE_SITE_CONFIG.download;
if(dl&&dl.aprovado===true){var b=document.querySelector('#medite-download-button');if(b&&b.tagName==='A')b.textContent='Download Medite '+dl.versao+' for Windows'}
var observer=new MutationObserver(function(mutations){
 var pending=new Set();mutations.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)pending.add(n);else if(n.nodeType===3&&n.parentElement)pending.add(n.parentElement)})});
 observer.disconnect();pending.forEach(translate);observer.observe(document.body,{childList:true,subtree:true});
});
observer.observe(document.body,{childList:true,subtree:true});
})();
