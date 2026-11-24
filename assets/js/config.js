/* Configuração do site Medite — único arquivo a editar para ativar recursos após autorização.
 * Nada aqui contém segredos: tudo o que está neste arquivo fica público quando o site é publicado. */
window.MEDITE_SITE_CONFIG = {
  /* true = prévia privada (faixa de aviso + noindex). Mudar para false SOMENTE na publicação aprovada. */
  preview: false,

  /* Download somente depois de aprovação G6, hospedagem do EXE e conferência pública do SHA-256.
   * O código do app continua privado; o download deve ficar em outro repositório público.
   * NUNCA usar o arquivo local do Windows como URL.
   */
  download: {
    aprovado: true,
    versao: '0.3.0',
    /* Pacotes distintos por idioma. Ficam bloqueados ate existir EXE homologado e SHA verificado. */
    locales: {
      pt: { aprovado: true, url: 'https://github.com/john-notebook-brasil/medite-downloads/releases/download/v0.3.0/Medite-0.3.0-pt-BR-unsigned.exe', sha256: 'cf4522cc398f076dabbd1c95aa73fc911ed4723896d31e0b1fb27f38c7ca42c5', tamanho: '9,35 MiB' },
      en: { aprovado: true, url: 'https://github.com/john-notebook-brasil/medite-downloads/releases/download/v0.3.0/Medite-0.3.0-en-US-unsigned.exe', sha256: '2f00b1985690fab48890800e3425aedfd57f4d64be61a4acd99442f374551b72', tamanho: '9,35 MiB' }
    },
    url: '',
    sha256: '',
    tamanho: '9,35 MiB',
    avisoAssinatura: 'Instalador ainda não assinado digitalmente. O Windows pode apresentar um alerta de segurança.'
  },

  /* Gravação real do Medite F2 no Windows (MP4 H.264, ~45–60 s). Vazio = aguardando captura. */
  video: {
    src: '',                       // ex.: 'assets/video/medite-f2-demo.mp4'
    poster: 'assets/captures/captura-real-biblia.webp',
    chapters: [                    // ajustar os tempos (segundos) após a gravação
      { t: 0,  label: 'Área de trabalho' },
      { t: 6,  label: 'Avatar' },
      { t: 12, label: 'Meditação' },
      { t: 19, label: 'Bíblia' },
      { t: 27, label: 'Ouvir' },
      { t: 34, label: 'Anotações' },
      { t: 42, label: 'Ajustes' },
      { t: 49, label: 'Encerramento' }
    ]
  },

  /* PIX de contribuicoes voluntarias — chave aleatoria autorizada pelo proprietario em 19/11/2026.
   * Dados de recebedor e chave EVP sao publicos, nunca usar CPF como chave neste site. */
  pix: {
    ativo: true,
    chave: '78365dd6-c1f2-4ae8-bd39-547ef9f8746d',      // chave aleatoria EVP validada no banco, nao e CPF
    nome: 'John Robert Martins Pereira',       // recebedor; BR Code reduz a 25 caracteres
    cidade: 'São Paulo',     // cidade; BR Code normaliza para SAO PAULO
    txid: 'MEDITE'  // identificador (letras e números, até 25)
  }
};
