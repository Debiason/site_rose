var formSrc = '#form_cidade',
    alertSrc = '#alerts_form_cidade',
    formUrlBase = '/default/cidade',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        estado: {
            required: true
        },
        nome: {
            required: true
        },
        regiao: {
            required: false
        },
        codigoMunicipio: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };