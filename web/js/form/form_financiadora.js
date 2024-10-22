var formSrc = '#form_financiadora',
    alertSrc = '#alerts_form_financiadora',
    formUrlBase = '/default/financiadora',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    idPessoa =  $("#form_financiadora select[name=pessoa] option:selected").val(),
    
    formValidateRules =
    {
        id: {
            required: true
        },
        aplicacaoFinanceira: {
            required: true
        },
        procedimentoCompra: {
            required: true
        },
        pessoa: {
            required: true
        },
        tabelaDiaria: {
            required: true
        },
        anexo: {
            required: false
        },
        prazoGuardaDocumentos: {
            required: true
        },
        pagamentoNaoEquipe: {
            required: false
        },
        permiteRateioDespesa: {
            required: false
        },
        maximoDiariasPessoa: {
            required: true
        },
        observacoes: {
            required: false
        },
        ativo: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };