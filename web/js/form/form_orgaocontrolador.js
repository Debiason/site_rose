var tabId = '#tabOrgaoControlador',
    modalFormSrc = '#form_orgaocontrolador',
    modalAlertSrc = '#alerts_form_orgaocontrolador',
    modalFormUrlBase = '/default/orgao-controlador',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        pessoaJuridica: {
            required: true
        },
        produto: {
            required: true
        },
        observacoes: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {

    };