var tabId = '#tabQuadroSocial',
    modalFormSrc = '#form_quadrosocial',
    modalAlertSrc = '#alerts_form_quadrosocial',
    modalFormUrlBase = '/default/quadro-social',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        pessoaJuridicaNacional: {
            required: true
        },
        pessoaFisicaNacional: {
            required: true
        },
        cargo: {
            required: false
        },
        observacoes: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };