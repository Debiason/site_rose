var formSrc = '#form_idioma',
    alertSrc = '#alerts_form_idioma',
    formUrlBase = '/default/idioma',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        sigla: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };