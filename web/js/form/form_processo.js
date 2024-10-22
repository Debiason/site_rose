var formSrc = '#form_processo',
    alertSrc = '#alerts_form_processo',
    formUrlBase = '/default/processo',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };