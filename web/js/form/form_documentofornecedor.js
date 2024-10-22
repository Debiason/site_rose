var modalFormSrc = '#form_documentofornecedor',
    modalAlertSrc = '#alerts_form_documentofornecedor',
    modalFormUrlBase = '/default/documento-fornecedor',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        fornecedor: {
            required: true
        },
        anexo: {
            required: false
        },
        nome: {
            required: true
        },
        observacoes: {
            required: false
        },
        dtVencimento: {
            required: true
        },
        essencialPagamento: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };