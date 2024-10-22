var formSrc = '#form_tipocontato',
    alertSrc = '#alerts_form_tipocontato',
    formUrlBase = '/default/tipo-contato',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        grupo: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };