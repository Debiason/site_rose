var modalFormSrc = '#form_contrapartida',
    modalAlertSrc = '#alerts_form_contrapartida',
    modalFormUrlBase = '/default/contrapartida',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        pessoaJuridica: {
            required: true
        },
        tipo: {
            required: true
        },
        contrapartida: {
            required: false
        },
        valor: {
            required: true
        },
        dadosContatoComprovacao: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
    };