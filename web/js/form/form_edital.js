var formSrc = '#form_edital',
    alertSrc = '#alerts_form_edital',
    formUrlBase = '/default/edital',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        financiadora: {
            required: true
        },
        tipoContrapartida: {
            required: true
        },
        numero: {
            required: true
        },
        nome: {
            required: true
        },
        resumo: {
            required: false
        },
        itensFinanciaveis: {
            required: false
        },
        itensNaoFinanciaveis: {
            required: false
        },
        dtAbertura: {
            required: false
        },
        dtFechamento: {
            required: false
        },
        dtLiberacaoResultado: {
            required: false
        },
        dtRegistro: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };