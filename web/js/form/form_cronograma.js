var modalFormSrc = '#form_cronograma',
    modalAlertSrc = '#alerts_form_cronograma',
    modalFormUrlBase = '/default/cronograma',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        assuntoCronograma: {
            required: true
        },
        dtPrevista: {
            required: true
        },
        dtConclusao: {
            required: false
        },
        valor: {
            required: false
        },
        valorGasto: {
            required: false
        },
        observacao: {
            required: false
        },
        lembrarDiasAntes: {
            required: false
        },
        importancia: {
            required: false
        },
        concluido: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
    };