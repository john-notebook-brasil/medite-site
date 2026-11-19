/* Configuração do site Medite — único arquivo a editar para ativar recursos após autorização.
 * Nada aqui contém segredos: tudo o que está neste arquivo fica público quando o site é publicado. */
window.MEDITE_SITE_CONFIG = {
  /* true = prévia privada (faixa de aviso + noindex). Mudar para false SOMENTE na publicação aprovada. */
  preview: false,

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

  /* PIX — permanece em MODO DEMONSTRAÇÃO enquanto ativo=false.
   * Preencher somente com dados reais fornecidos e autorizados pelo proprietário. */
  pix: {
    ativo: false,
    chave: '78365dd6-c1f2-4ae8-bd39-547ef9f8746d',      // chave aleatoria EVP; manter ativo=false ate validacao bancaria
    nome: 'John Robert Martins Pereira',       // recebedor; BR Code reduz a 25 caracteres
    cidade: 'São Paulo',     // cidade; BR Code normaliza para SAO PAULO
    txid: 'MEDITE'  // identificador (letras e números, até 25)
  }
};
