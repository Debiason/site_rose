var formSrc = '#form_unidade',
    alertSrc = '#alerts_form_unidade',
    formUrlBase = '/default/unidade',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        sigla: {
            required: true
        },
        descricao: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };