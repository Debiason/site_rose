var formSrc = '#form_estado',
    alertSrc = '#alerts_form_estado',
    formUrlBase = '/default/estado',
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
        regiao: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };