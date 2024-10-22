var formSrc = '#form_cnae',
    alertSrc = '#alerts_form_cnae',
    formUrlBase = '/default/cnae',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        cnae: {
            required: false
        },
        codigo: {
            required: true
        },
        descricao: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };