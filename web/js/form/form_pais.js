var formSrc = '#form_pais',
    alertSrc = '#alerts_form_pais',
    formUrlBase = '/default/pais',
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
        numero: {
            required: true
        },
        ddi: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };