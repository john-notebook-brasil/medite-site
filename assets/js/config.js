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
    aprovado: false,
    versao: '0.3.0',
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
