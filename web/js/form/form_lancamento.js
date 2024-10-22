var modalFormSrc = '#form_lancamento',
    modalAlertSrc = '#alerts_form_lancamento',
    modalFormUrlBase = '/default/lancamento',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        pedido: {
            required: true
        },
        rubricaAprovada: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };