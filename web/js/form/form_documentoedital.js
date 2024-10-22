var tabId = '#tabDocumentoEdital',
    modalFormSrc = '#form_documentoedital',
    modalAlertSrc = '#alerts_form_documentoedital',
    modalFormUrlBase = '/default/documento-edital',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        edital: {
            required: true
        },
        anexo: {
            required: true
        },
        nome: {
            required: true
        },
        observacoes: {
            required: false
        }
    },

    handleLocalListeners = function () {

        //$('.fileinput').fileinput();

        //$('input[type=file]').bootstrapFileInput();
    };