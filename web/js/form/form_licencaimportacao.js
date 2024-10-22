var modalFormSrc = '#form_licencaimportacao',
    modalAlertSrc = '#alerts_form_licencaimportacao',
    modalFormUrlBase = '/default/licenca-importacao',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        orgaoAnuente: {
            required: true
        },
        numero: {
            required: true
        },
        dtVencimento: {
            required: true
        },
        observacoes: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
    };