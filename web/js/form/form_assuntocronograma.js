var formSrc = '#form_assuntocronograma',
    alertSrc = '#alerts_form_assuntocronograma',
    formUrlBase = '/default/assunto-cronograma',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        ativo: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };