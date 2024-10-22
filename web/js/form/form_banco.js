var formSrc = '#form_banco',
    alertSrc = '#alerts_form_banco',
    formUrlBase = '/default/banco',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        numero: {
            required: true
        },
        sigla: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };