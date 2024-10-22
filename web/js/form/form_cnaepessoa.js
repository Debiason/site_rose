var tabId = '#tabCnaePessoa',
    modalFormSrc = '#form_cnaepessoa',
    modalAlertSrc = '#alerts_form_cnaepessoa',
    modalFormUrlBase = '/default/cnae-pessoa',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules =
    {
        id: {
            required: true
        },
        cnae: {
            required: true
        },
        pessoa: {
            required: true
        },
        principal: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {

    };