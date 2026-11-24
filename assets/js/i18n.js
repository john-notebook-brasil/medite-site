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
Object.assign(translations,{
 "Voltar ao site": "Back to website",
 "Medite — Privacidade, termos e créditos (proposta para aprovação)": "Medite — Privacy, terms, and credits (draft for approval)",
 "Informações legais": "Legal information",
 "Proposta editorial para aprovação do responsável.": "Editorial draft pending the owner's approval.",
 "As informações abaixo descrevem a versão 0.3.0 em preparação. Este documento não concede licença de redistribuição, não declara marca registrada e não substitui revisão jurídica quando necessária. Itens marcados como": "The information below describes version 0.3.0 under preparation. This document does not grant redistribution rights, claim trademark registration, or replace legal review where necessary. Items marked",
 "pendente": "pending",
 "exigem confirmação antes do download público.": "require confirmation before public downloads.",
 "O site.": "The website.",
 "Este site não usa cookies de rastreamento, ferramentas de análise, publicidade nem formulários. Não coletamos nome, e-mail, crença religiosa ou qualquer outro dado pessoal dos visitantes. A demonstração interativa funciona inteiramente no seu navegador e não envia o que você digita.": "This website does not use tracking cookies, analytics tools, advertising, or forms. We do not collect visitors' names, email addresses, religious beliefs, or other personal information. The interactive demonstration runs in your browser and does not transmit what you type.",
 "Contribuições.": "Donations.",
 "O site oferece contribuição voluntária por Pix, sem contrapartida ou desbloqueio de funcionalidades. O código Pix é apresentado para pagamento diretamente no banco do visitante. Antes de confirmar, confira no aplicativo bancário o nome do recebedor, valor e demais dados. O site não processa pagamentos nem recebe confirmação automática do banco.": "The website offers optional donations via Pix, Brazil's instant payment system, without unlocking additional features. Your own banking app handles payment. Verify the recipient and amount before confirming. The website does not process payments or receive automatic payment confirmations.",
 "O aplicativo.": "The application.",
 "O Medite 0.3.0 funciona sem conta obrigatória e mantém anotações e preferências localmente no computador. Testes em Windows Sandbox confirmaram persistência após reinstalação e atualização sintética entre versões, sem constituir garantia de ausência de falhas em todos os equipamentos. A leitura em voz alta usa vozes instaladas no Windows. O botão WhatsApp abre um compartilhamento apenas por iniciativa do usuário; o aplicativo não envia anotações automaticamente.": "Medite 0.3.0 works without a required account and stores notes and preferences locally on your computer. Windows Sandbox tests confirmed data retention after reinstallation and a simulated upgrade, but cannot guarantee error-free operation on every device. Read-aloud uses installed Windows voices. WhatsApp sharing happens only when you request it; notes are never sent automatically.",
 "Hospedagem.": "Hosting.",
 "O site é servido pelo GitHub Pages. O provedor pode processar dados técnicos, como endereço IP, necessários para entrega e segurança do serviço, segundo sua própria política de privacidade. O projeto Medite não opera ferramentas próprias de rastreamento no site. O instalador, quando autorizado, será hospedado em distribuição separada, identificada na página de download.": "The website is hosted on GitHub Pages. That provider may process technical information, such as IP addresses, to deliver and protect the website under its own privacy policy. Medite does not operate its own tracking tools. When authorized, the installer will be hosted separately and linked from the download section.",
 "Responsável e contato.": "Responsible party and contact.",
 "Medite é criado por John Robert Martins Pereira. Contato:": "Medite was created by John Robert Martins Pereira. Contact:",
 "Termos de uso": "Terms of use",
 "O Medite é oferecido gratuitamente, para uso pessoal. Não há assinatura, compras internas, recursos pagos ou benefícios vinculados a doações. Contribuições são voluntárias e não constituem compra de produto ou serviço.": "Medite is provided free of charge for personal use. There are no subscriptions, in-app purchases, premium features, or donation-based perks. Donations are optional and do not constitute a purchase.",
 "O aplicativo está sendo preparado para distribuição gratuita. O instalador deve ser obtido exclusivamente pelo endereço de download indicado no site oficial, acompanhado de hash SHA-256 para verificação de integridade. A compilação atual não é assinada digitalmente; o Windows poderá exibir avisos. Não desative ferramentas de segurança para executar um arquivo de origem desconhecida.": "The application is being prepared for free distribution. Only download the installer through the official website and verify its SHA-256 checksum. The current build is unsigned, so Windows may display warnings. Do not disable security protections to run a file from an unknown source.",
 "O Medite pode apresentar erros ou incompatibilidades, apesar dos testes realizados. Informações bíblicas e de meditação são recursos de leitura e reflexão, não substituindo aconselhamento profissional necessário em outras áreas.": "Medite may contain errors or compatibility issues despite testing. Scripture and reflection features are for personal reading and are not substitutes for professional advice in other fields.",
 "pendente: licença do programa, regras de redistribuição, condições de suporte e foro": "pending: program license, redistribution rules, support conditions, and jurisdiction",
 "Nenhuma disposição desta proposta deve ser interpretada como autorização para redistribuir o instalador ou usar comercialmente a marca.": "Nothing in this draft authorizes redistributing the installer or commercial use of the brand.",
 "Créditos e licenças": "Credits and licenses",
 "Item": "Item",
 "Origem e licença": "Source and license",
 "Avatares bíblicos": "Biblical avatars",
 "Ilustrações desenvolvidas para o projeto com auxílio de geração de imagens por IA, incluindo evidência de criação de Abraão no Gemini em 05/11/2026. Personagens bíblicos históricos não implicam autorização para reproduzir designs protegidos de terceiros.": "Illustrations developed for the project with the assistance of AI image generation, including evidence of an Abraham design created in Gemini on November 5, 2026. Biblical historical figures do not authorize reproduction of third-party protected designs.",
 "pendente: conferência da procedência do conjunto completo, eventuais direitos de terceiros e termos aplicáveis": "pending: provenance of the full set, third-party rights, and applicable terms",
 "Textos bíblicos da demonstração": "Bible demo text",
 "Adaptações demonstrativas em português preparadas para ilustrar a interface; não atribuídas à Bíblia Livre nem a uma edição bíblica específica. As capturas históricas de 17/11/2026 conservam o texto KJV original.": "Demonstration paraphrases used to illustrate the interface, not attributed to Bíblia Livre or a particular Bible edition. Historic screenshots from November 17, 2026 retain the original KJV text.",
 "Bíblia Livre (aplicativo)": "Bíblia Livre (application)",
 "O aplicativo converteu arquivos USFM em dados JSON offline, removendo marcações técnicas; os titulares não endossam o Medite.": "The application converted USFM files into offline JSON data, removing technical formatting markers; the copyright holders do not endorse Medite.",
 "pendente: cotejo editorial final do texto convertido": "pending: final editorial comparison of the converted text",
 "King James Version (aplicativo)": "King James Version (application)",
 "convertida de USFM para consulta offline. Condições de domínio público variam por jurisdição, com ressalvas no Reino Unido.": "converted from USFM for offline reading. Public-domain status varies by jurisdiction, with restrictions in the United Kingdom.",
 "pendente: confirmação do alcance territorial da distribuição": "pending: confirmation of territorial distribution rights",
 "Fontes Figtree, Newsreader e Inter": "Figtree, Newsreader, and Inter fonts",
 "no site; licenças das três fontes acompanham também o pacote do aplicativo.": "on this site; licenses for all three fonts are also bundled with the application.",
 "Gerador de QR Code": "QR code generator",
 "Nome e identidade Medite": "Medite name and identity",
 "Identificação em uso no projeto; não há declaração de registro de marca ou exclusividade. Busca preliminar no INPI indicou terceiros com sinais relacionados, sem conclusão sobre conflito na classe 9.": "Project identification; no claim of registered trademark or exclusivity. A preliminary INPI search identified third-party related marks, without a conclusive assessment of conflicts in class 9.",
 "pendente: verificação jurídica direcionada se houver exploração comercial ou registro de marca": "pending: focused legal review if pursuing commercial use or trademark registration"
});
Object.assign(translations,{". Nenhuma disposição desta proposta deve ser interpretada como autorização para redistribuir o instalador ou usar comercialmente a marca.":". Nothing in this draft authorizes redistribution of the installer or commercial use of the brand.","Bíblia Livre (BLIVRE, porbr2018), © 2018 Diego Santos, Mario Sérgio e Marco Teles. Licença":"Bíblia Livre (BLIVRE, porbr2018), © 2018 Diego Santos, Mario Sérgio and Marco Teles. License",". O aplicativo converteu arquivos USFM em dados JSON offline, removendo marcações técnicas; os titulares não endossam o Medite.":". The application converted USFM files to offline JSON data, removing technical formatting markers; the copyright holders do not endorse Medite.","King James Version, edição padronizada 1769, fonte":"King James Version, standardized 1769 edition, source",", convertida de USFM para consulta offline. Condições de domínio público variam por jurisdição, com ressalvas no Reino Unido.":", converted from USFM for offline reading. Public domain conditions vary by jurisdiction, including restrictions in the United Kingdom.","QRCode for JavaScript, © 2009 Kazuhiko Arase, licença MIT. “QR Code” é marca registrada da DENSO WAVE INCORPORATED.":"QRCode for JavaScript, © 2009 Kazuhiko Arase, MIT license. “QR Code” is a registered trademark of DENSO WAVE INCORPORATED.","Texto ilustrativo em português":"Illustrative demo text in Portuguese","Textos ilustrativos em português (adaptação demonstrativa). Não constituem reprodução da Bíblia Livre.":"English illustrative demo passages (paraphrases). They are not excerpts from Bíblia Livre or a licensed Bible edition.","Escreva sua reflexão":"Write your reflection","Demonstração interativa do Medite. Use Enter para abrir a meditação.":"Interactive Medite demo. Press Enter to open the meditation.","Código copiado.":"Code copied.","Texto de demonstração copiado.":"Demo text copied.","Selecione e copie o código manualmente.":"Select and copy the code manually.","QR Code de demonstração, sem valor de pagamento":"Demo QR code; no payment value","QR Code PIX de":"Pix QR code for","Um momento com Deus, mesmo nos dias mais corridos.":"A moment with God, even on your busiest days."});
Object.assign(translations,{"PT-BR · demonstração":"EN-US · demo paraphrase","PT-BR (demonstração)":"EN-US (demo paraphrase)","Versículos ilustrativos em português":"Illustrative Bible paraphrases in English","Leitura com voz instalada no Windows":"Reading aloud with a Windows voice","Demonstração interativa":"Interactive demonstration","Escolha um personagem ou versículo":"Choose a character or verse","Copiar texto":"Copy passage","Mais":"More","Iniciar":"Start","Fechar":"Close","Voltar":"Back","Avançar":"Continue","Texto copiado.":"Text copied.","Não foi possível copiar o versículo.":"Could not copy the passage.","Sem notas salvas nesta demonstração.":"No notes are saved in this demo.","Este texto é uma adaptação demonstrativa.":"This passage is a demonstration paraphrase.","Contribuições pelo Pix em reais (BRL), quando disponíveis.":"Pix contributions in Brazilian reais (BRL), where supported."});
Object.assign(translations,{"Como verificar um download seguro":"How to verify a safe download","O Medite exige Windows 10 ou 11 de 64 bits. A primeira instalação pode solicitar o Microsoft WebView2. O instalador inicial não terá assinatura digital, e o Windows poderá mostrar um aviso SmartScreen.":"Medite requires 64-bit Windows 10 or 11. The first installation may require Microsoft WebView2. The initial installer is unsigned and Windows may display a SmartScreen warning.","Antes de executar, confira o endereço oficial do download e o SHA-256 exibido acima. No PowerShell, use":"Before running the installer, verify the official download address and the SHA-256 checksum displayed above. In PowerShell, use",", substituindo pelo nome do arquivo baixado. O resultado deve ser idêntico ao informado no site. Não ignore avisos se a origem ou o hash não corresponderem.":", replacing the example with the actual downloaded filename. The result must match the hash displayed on this website. Do not dismiss warnings if the source or checksum does not match.","Em caso de dúvida, não execute o arquivo e entre em contato com o suporte.":"If in doubt, do not run the installer; contact support."});
Object.assign(translations,{"World English Bible (aplicativo)":"World English Bible (application)","World English Bible, edição protestante americana de 66 livros (engwebp, texto estável de 2020), disponível em domínio público por":"World English Bible, the 66-book American Protestant edition (engwebp, 2020 stable text), available in the public domain from",". O nome “World English Bible” é uma marca da eBible.org; o Medite não declara endosso nem altera o texto bíblico intencionalmente. A conversão USFM para uso offline exige conferência de fidelidade antes da publicação.":". “World English Bible” is a trademark of eBible.org. Medite does not claim endorsement or intentionally alter Bible text. The USFM-to-offline conversion must be verified for textual accuracy before release.","pendente: cotejo integral com a edição oficial":"pending: full comparison against the official edition"});

/* G6 legal text reconciled with 21/11/2026 verified Bible import. */
Object.assign(translations,{
 "A conversão da edição utilizada foi comparada com a fonte VPL correspondente em 21/11/2026, sem diferenças de texto ou referências no conjunto validado. Essa conferência técnica não substitui revisão pastoral de passagens em destaque.":"The app's edition was checked against its matching VPL source on 21 November 2026, with no text or reference differences in the validated dataset. This technical comparison does not replace pastoral review of featured passages.",
 "A edição usada pelo aplicativo foi comparada integralmente entre os arquivos USFM/VPL recebidos em 21/11/2026: 31.103 referências, sem divergências de texto ou referências na representação validada; cinco referências sem texto foram preservadas como na fonte. A conferência técnica não constitui revisão pastoral.":"The app edition was checked across the USFM and VPL files received on 21 November 2026: 31,103 references, with no textual or reference mismatches in the validated representation; five empty references were preserved as supplied. This technical verification is not a pastoral review.",
 "O aplicativo é preparado para distribuição gratuita. O instalador deve ser obtido exclusivamente pelo endereço de download indicado no site oficial, acompanhado de hash SHA-256 para verificação de integridade.":"The app is prepared for free distribution. Download the installer only from the official website's stated address, with a SHA-256 checksum for integrity verification.",
 "O aplicativo é preparado para distribuição gratuita. Quando o download estiver disponível, obtenha o instalador exclusivamente pelo endereço indicado no site oficial, acompanhado de hash SHA-256 para verificação de integridade.":"The app is being prepared for free distribution. When downloads are available, obtain installers only from the official website and verify the accompanying SHA-256 checksum."
});
function clean(s){return String(s).replace(/\s+/g,' ').trim()}
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
 var demoVerses={"v001":"I will make you into a great nation, and I will bless you. I will make your name great, and you will be a blessing.","v002":"God led him outside and said: Look up at the sky and count the stars, if you can. So shall your descendants be.","v003":"Moses reassures the people that God will defend them and invites them to trust Him.","v004":"God promises Moses His presence and the rest that comes from walking with Him.","v005":"Have I not commanded you? Be strong and courageous. Do not be afraid or discouraged, for the LORD your God will be with you wherever you go.","v006":"Joshua calls everyone to choose whom to serve, affirming that his own household will serve the LORD.","v007":"Do not urge me to leave you. Wherever you go, I will go; where you stay, I will stay. Your people will be my people, and your God my God.","v008":"May the LORD reward your work, for you have come to seek refuge under His wings.","v009":"The LORD is my shepherd; I shall not lack anything.","v010":"The LORD is my light and my salvation; whom shall I fear? The LORD is the strength of my life.","v011":"Create in me a clean heart, O God, and renew a steadfast spirit within me.","v012":"Trust in the LORD with all your heart and do not lean only on your own understanding.","v013":"Acknowledge the LORD in all your ways, and He will make your paths straight.","v014":"Those who wait for the LORD will renew their strength. They will soar on wings like eagles, run without growing weary, and walk without fainting.","v015":"Do not fear, for I am with you. Do not be discouraged, for I am your God. I will strengthen and help you.","v016":"I know the plans I have for you, says the LORD, plans for peace and hope and a future.","v017":"Call to me and I will answer you and show you great things you do not yet know.","v018":"My God sent His angel and shut the lions' mouths, so they did not hurt me.","v019":"Blessed be the name of God forever and ever, for wisdom and power belong to Him.","v020":"If you remain silent now, deliverance will rise from another place. And who knows whether you have come to the kingdom for such a time as this?","v021":"Mary said: I am the Lord's servant. May it happen to me according to your word.","v022":"And Mary said: My soul magnifies the Lord.","v023":"Jesus said: Come. Peter stepped out of the boat and walked on the water toward Jesus.","v024":"Cast all your worries on Him, because He cares for you.","v025":"We know that all things work together for good for those who love God and are called according to His purpose.","v026":"I can do all things through Him who strengthens me.","v027":"Do not be anxious about anything. Bring your requests to God in prayer and thanksgiving.","v028":"Jesus said: I am the light of the world. Whoever follows me will not walk in darkness but will have the light of life.","v029":"Jesus replied: I am the way, the truth, and the life. No one comes to the Father except through me.","v030":"I am the vine; you are the branches. Whoever remains in me bears much fruit; apart from me you can do nothing."};
 window.MEDITE_DATA.verses.forEach(function(v){if(demoVerses[v.id]){v.text=demoVerses[v.id];v.book=translations[v.book]||v.book}});
}

translate(document.body);
document.title=location.pathname.endsWith('/legal.html')?'Medite — Privacy, terms, and credits (draft)':'Medite — A moment with God, even on your busiest days';
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
