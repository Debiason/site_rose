var modalFormSrc = '#form_documentoaf',
    modalAlertSrc = '#alerts_form_documentoaf',
    modalFormUrlBase = '/default/documento-af',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        observacoes: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
    };