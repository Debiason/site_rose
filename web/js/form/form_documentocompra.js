var modalFormSrc = '#form_documentocompra',
    modalAlertSrc = '#alerts_form_documentocompra',
    modalFormUrlBase = '/default/documento-compra',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        checklistCompra: {
            required: false
        },
        anexo: {
            required: false
        },
        dtPrevista: {
            required: false
        },
        dtRecebimento: {
            required: false
        },
        dtValidade: {
            required: false
        },
        observacao: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
    };