var modalFormSrc = '#form_fornecedormarca',
    modalAlertSrc = '#alerts_form_fornecedormarca',
    modalFormUrlBase = '/default/fornecedor-marca',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        fornecedor: {
            required: true
        },
        marca: {
            required: true
        },
        observacoes: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };