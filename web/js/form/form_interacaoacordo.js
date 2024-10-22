var modalFormSrc = '#form_interacaoacordo',
    modalAlertSrc = '#alerts_form_interacaoacordo',
    modalFormUrlBase = '/default/interacao-acordo',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        acordo: {
            required: true
        },
        descricao: {
            required: true
        }
    },

    handleLocalListeners = function(mainForm)
    {
        
    };