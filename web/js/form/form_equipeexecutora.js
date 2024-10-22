var modalFormSrc = '#form_equipeexecutora',
    modalAlertSrc = '#alerts_form_equipeexecutora',
    modalFormUrlBase = '/default/equipe-executora',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        pessoaFisica: {
            required: true
        },
        funcaoEquipe: {
            required: true
        },
        vinculoInstitucional: {
            required: true
        },
        atividades: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
    };