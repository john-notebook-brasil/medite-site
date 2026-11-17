# Medite — site oficial

Site estático (HTML, CSS e JavaScript puros) do Medite, aplicativo cristão gratuito para Windows.
Sem build, sem dependências, sem rastreadores e sem workflow de Actions.

## Abrir localmente
Abra `index.html` no navegador (ou rode `python -m http.server` nesta pasta).

## Publicar no GitHub Pages (somente após aprovação)
1. Settings → Pages → *Deploy from a branch* → `main` / `(root)`.
2. Em `assets/js/config.js`, mude `preview: false` para `preview: false` (remove a faixa de aviso e o `noindex`).
3. Plano gratuito do GitHub: Pages exige repositório **público**.

## Logo e compartilhamento
- Logo oficial (original, sem alteração): `assets/img/medite-logo.png`. Derivados (favicon, ícones, imagem 1200×630 para WhatsApp/redes) saem dele sem alterar a composição.
- As metas `og:url`/`og:image` e `twitter:image` em `index.html` assumem o endereço `https://john-notebook-brasil.github.io/medite-site/`; ajuste se o endereço público for outro.

## Ativar depois, com autorização
- **Vídeo real:** coloque o MP4 em `assets/video/` e preencha `video.src` em `config.js`; ajuste os tempos dos capítulos.
- **PIX real:** preencha `pix.chave`, `pix.nome`, `pix.cidade` e mude `pix.ativo` para `true`. Conferir valor, recebedor e código antes.
- **Download:** o botão está desativado; só habilitar com instalador homologado e autorizado.

## Conteúdo
`index.html` · `legal.html` · `assets/` (css, js, fontes OFL, avatares otimizados, capturas reais).
Este repositório não contém código do aplicativo, instaladores, chaves nem dados pessoais.

## Licença
Pendente de definição pelo proprietário (avatares, marca e textos). Fontes: SIL OFL 1.1; gerador de QR: MIT.
