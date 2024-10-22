var formSrc = '#form_moeda',
    alertSrc = '#alerts_form_moeda',
    formUrlBase = '/default/moeda',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        simbolo: {
            required: true
        },
        cotacaoReais: {
            required: true
        },
        margemSeguranca: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };