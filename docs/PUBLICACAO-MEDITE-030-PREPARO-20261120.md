# Medite 0.3.0 — publicação do instalador (preparação sem deploy)

Data: 20/11/2026. **NÃO APROVADO PARA PUBLICAÇÃO**.

## Evidência técnica do aplicativo
- App privado: `john-notebook-brasil/medite-app`, PR #96 (bilíngue), HEAD `d849983c1bb2d467307e73ddae1acf23ce8492b1`.
- Build Windows Sandbox, 9,35 MiB, SHA-256 do instalador: `9a1579f2feacccf8bf35fbd68ca5ea345f5ed0aa4b3e6424d092c09e34ed9189`.
- KJV USFM ZIP, SHA-256 da fonte do build: `b6faa67117ccaba49df9e7df224a553f11758ae7c5d58f0f7979e2b73ac4480b`.
- Capturas do proprietário homologaram livro Revelation 22:21 em KJV, seis orelhas traduzidas e interface inglesa. Não realizar testes funcionais redundantes.

## Preparado apenas nesta branch do site
- `assets/js/config.js` tem bloco `download` **desabilitado**: `aprovado:false`, URL vazia, SHA-256 vazio.
- `assets/js/download.js` somente habilita o botão com aprovação expressa e URL de GitHub Release sob `john-notebook-brasil/medite-downloads` `v0.3.0`, com hash SHA-256 válido.
- `index.html` usa botão desativado por padrão, expondo versão, hash e aviso de instalador não assinado **somente após ativação autorizada**.
- Sem alteração do PIX, do aplicativo privado ou da língua do site, que será traduzido após publicar o download, conforme decisão do proprietário.

## Gate bloqueante antes de ativar o download
1. **R0-01:** verificar correspondência integral da BLIVRE com fonte exata e tratar divergências por revisão dirigida; revisar amostras editoriais KJV. A edição KJV 1769 tem ressalvas territoriais específicas no Reino Unido; definir distribuição e aviso aplicáveis.
2. **Avatares, ícones e marca:** comprovar origem e direitos comerciais/distribuição das 45 imagens e do logotipo; consultar disponibilidade de marca Medite no INPI e nomes de domínio antes de publicar.
3. **R0-03:** opção manual `Verificar atualizações` no Sobre e consentimento: implementar ou obter decisão de escopo expressa. Nunca fazer atualização silenciosa.
4. **R0-06:** redigir declaração cristã acolhedora e submeter ao proprietário para aprovação antes da inclusão no app/site.
5. Revisar `legal.html`, que ainda contém marcações de rascunho e pendências legais (direitos, privacidade, titularidade).
6. Confirmar hash do binário real **antes do upload**, direitos e checksum apresentados publicamente. O EXE está no Windows do proprietário; GitHub conector **não contém esse binário**.
7. Criar/usar repositório **público separado** `medite-downloads` para releases binários e garantir que nenhum código privado, dados pessoais nem segredos sejam publicados. **Não criar nem publicar sem G6 específico.**
8. Obter autorização explícita final de merge das PRs necessárias, release público, edição da `main` do site e ativação do download. Esse documento não concede autorização.

## Ativação futura, somente após G6
Depois de aprovado e publicado o EXE exato no repositório público separado, configurar:
- `download.aprovado = true`
- `download.url = https://github.com/john-notebook-brasil/medite-downloads/releases/download/v0.3.0/<nome-exato-do-instalador>.exe`
- `download.sha256 = 9a1579f2feacccf8bf35fbd68ca5ea345f5ed0aa4b3e6424d092c09e34ed9189`, **somente se o arquivo enviado foi conferido bit a bit e permaneceu idêntico**.

A página permanece em português na primeira publicação; traduzir o site para inglês em etapa posterior.

**Nenhuma implementação aqui ativa o botão ou realiza publicação.**
