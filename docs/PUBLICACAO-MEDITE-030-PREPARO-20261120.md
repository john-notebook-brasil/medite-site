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


## Solicitação atualizada do proprietário — 20/11/2026: publicação PT-BR e EN-US

O proprietário solicitou **concluir o pacote, hospedar o instalador, habilitar o download e tornar o site bilíngue**, com botões 🇧🇷/🇺🇸 no cabeçalho. A instrução supera a ordem anterior de deixar inglês para depois. Ela **não dispensa** prova da integridade do EXE final, licenças/direitos de terceiros e preservação de dados, nem autoriza inventar links ou hashes.

### Preparado nesta branch isolada
- `index.html` e `legal.html`: seletores 🇧🇷 PT / 🇺🇸 EN, inclusive no celular.
- `assets/js/i18n.js`: tradução local estática dos textos do site e da página legal; idioma explícito por `?lang=pt`/`?lang=en` e preferência do visitante; 30 passagens de demonstração em inglês rotuladas como **paráfrases**, não KJV.
- `assets/js/download.js`: exige aprovação global + autorização de idioma, URL exata de release, nome de EXE contendo `pt-BR` ou `en-US` e SHA-256 válido. Sem essas provas **permanece desabilitado por padrão**.
- `assets/js/config.js`: `download.locales.pt` e `.en` vazios e `aprovado:false`, deliberadamente sem apontar para binário inexistente.
- `baixar/index.html`: encaminha preservando escolha PT/EN.
- **Verificação de comportamento em executor isolado (JavaScript):** 5 cenários de download testados — bloqueia quando falta aprovação global, aprovação local ou nome correto; habilita a simulação apenas com metadados completos para ambos os idiomas. **Não é teste em browser real.**
- Sintaxe JavaScript de `i18n.js` e `download.js`: conferida sem erro por compilação sintática. QA visual/responsivo no navegador ainda pendente.

### Aplicativo — preparação em branch isolada distinta
- Branch privada `medite-app/docs/medite-030-prelancamento-g6-20261120`: `src/services/schedule.ts` aceita `VITE_MEDITE_DEFAULT_LANGUAGE=en` para instalação inicial EN/KJV e mantém PT/BLIVRE como padrão para a variante BR. Preferências já salvas têm prioridade.
- `qa/release/build-pt-en-unsigned.ps1`: preparação de **duas compilações Windows** com fontes USFM autenticadas e saída `Medite-0.3.0-pt-BR-unsigned.exe` e `Medite-0.3.0-en-US-unsigned.exe`, hashes individuais. **NÃO EXECUTADO**, nenhuma instalação.
- Isto não altera nome oficial, conta, fluxo de PIX nem o código público do produto por merge.

### Bloqueios que impedem ativar o botão agora
1. Ainda **não existe um binário 0.3.0 pós-correção da BLIVRE** produzido e auditado nesta sessão; o instalador anterior identificado por SHA `9a1579f2...` foi gerado **antes** da correção do importador e não pode ser apresentado como a nova candidata.
2. O repositório público de hospedagem separado `john-notebook-brasil/medite-downloads` retornou **404 / não encontrado** no GitHub consultado. Não existe URL de release confirmada nem ferramenta nesta sessão capaz de criar e enviar o instalador Windows real.
3. Falta cotejo integral BLIVRE, tratamento de restrição KJV no Reino Unido, procedência dos ativos e validação final da marca; créditos existentes não resolvem todos esses itens.
4. Teste de compilação Windows e verificação de integridade para **cada variante PT-BR/EN-US**, com mesmos requisitos de preservação, ainda pendentes. GitHub Actions esgotado; utilizar ambiente Windows isolado sem custo.
5. Não executar instalação do pacote normal na máquina do usuário sem autorização de ambiente e backups. A autorização de publicação solicitada será aplicável **somente depois** de identificado e comprovado o binário exato; não realizar publicação parcial que induza download inexistente.

**Resultado nesta fase:** site bilíngue e mecanismos de download preparados **em branch**, ainda sem merge/deploy; nenhum arquivo EXE hospedado e nenhum botão público ativado. Manter mudanças financeiras intactas e exigir evidências antes da liberação.
