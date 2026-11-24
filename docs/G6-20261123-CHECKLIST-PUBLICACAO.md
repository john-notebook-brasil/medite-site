# Medite 0.3.0 — aprovação G6 e controle de publicação (23/11/2026)

**Decisão do proprietário nesta sessão:** homologação funcional aprovada, fechamento documental/segurança solicitado, preparação final do site e autorização para publicar G6. **Autorização registrada; execução pública condicionada à integridade dos binários e aos direitos pendentes.**

## 1. Artefatos candidatos localizados apenas no Windows do proprietário

Diretório: `C:\Users\User\Desktop\Medite-030-TTS-PR99-QA-20261123-203928\installers-unsigned-PR99`

| Arquivo | SHA-256 recebido do build Windows |
| --- | --- |
| `Medite-0.3.0-pt-BR-unsigned.exe` | `cf4522cc398f076dabbd1c95aa73fc911ed4723896d31e0b1fb27f38c7ca42c5` |
| `Medite-0.3.0-en-US-unsigned.exe` | `2f00b1985690fab48890800e3425aedfd57f4d64be61a4acd99442f374551b72` |

Aplicativo privado: `john-notebook-brasil/medite-app`, PR #99 (HEAD `37d6f3d45bd14d4f5fa65c8f4adae474b6c6e5fe`) sobre PRs #98/#97. O instalador inglês desta SHA foi homologado no Windows Sandbox offline (reprodução audível; Stop; velocidades 0.8× e 1.2×). Instalações e fluxos básicos anteriores têm aprovações próprias; não afirmar que os 20 testes foram repetidos nessa SHA. **Sem assinatura digital nesta versão**, conforme opção de lançamento já registrada.

## 2. Texto bíblico e dependências

- Bíblia Livre porbr2018 / WEB engwebp: cotejo entre USFM/VPL recebido em 21/11 identificou 31.102 + 31.103 referências e nenhuma divergência de texto/referência na reconstrução validada. Cinco referências vazias WEB preservadas.
- Versão pública EN-US usa WEB, não KJV; restrições britânicas da KJV não são impedimento para este pacote.
- Créditos CC BY 4.0 BLIVRE e OFL das fontes já constam na seção Sobre do app; conferir inclusão efetiva de avisos do pacote final e das dependências distribuídas.
- A revisão pastoral/editorial humana final continua independente da igualdade entre os arquivos de origem.

## 3. Site

Site privado: PR #7 (base main) e PR #8 (base PR #7), ambas drafts. PR #8 contém interface PT/EN, `baixar/`, política legal em rascunho e bloqueio explícito do download até URL real e SHA verificado. `assets/js/config.js` agora registra os hashes acima, **mas `download.aprovado=false` e ambas as URLs permanecem vazias**. Não inventar URL de release.

## 4. Condições objetivas antes da ativação pública

1. **Origem das 45 imagens e logotipo:** vincular declaração do proprietário e registros disponíveis, verificar ausência de direitos conflitantes; não afirmar licenciamento comprovado sem evidência.
2. **Marca MEDITE:** concluir busca oficial INPI pertinente à atividade, registrar semelhanças/riscos e decisão fundamentada; a busca preliminar não constitui liberação.
3. **Licenças/documento legal:** fechar texto da licença do programa e condições de uso, revisar privacidade, avisos de bibliotecas distribuídas e inserir declaração cristã anteriormente aprovada.
4. **Segurança/instalação:** conferir apenas os modos NSIS/atualização/autostart ainda não homologados com dados fictícios no Sandbox; não tocar instalação do computador principal.
5. **Site:** testar responsividade, idioma, legal, demonstração, links; garantir que não anuncie como implementada a futura seleção contextual aleatória da Bíblia, que continua requisito separado.
6. **Hospedagem:** disponibilizar exclusivamente os dois EXEs exatos em repositório público separado para binários, sem expor repositório privado. Obter URLs reais, baixar de volta e comparar SHA-256 byte a byte.
7. **Ativação final:** somente após 1–6, preencher URLs, habilitar por idioma, integrar PRs na ordem correta e verificar o site público. Validar reversão caso link/hash falhe.

## 5. Limites desta preparação

A autorização G6 do proprietário foi explícita. **Não houve merge, criação de release, transferência de binários nem ativação de links**, pois os arquivos estão apenas no computador local e as condições 1–6 não estão comprovadamente encerradas. Não utilizar repositório principal privado para hospedar instaladores públicos; não alterar Pix nem credenciais. GitHub Actions da SHA PR99 apresentou falhas sem steps e logs inacessíveis; a causa específica é não confirmada e não substitui evidências locais.

**Próxima dependência real:** acesso aos dois executáveis exatos e conclusão documental/segurança restante. Nenhuma publicação parcial ou botão apontando para arquivo inexistente.
