var formSrc = '#form_marca',
    alertSrc = '#alerts_form_marca',
    formUrlBase = '/default/marca',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        observacoes: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {
        
    };