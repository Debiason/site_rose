var formSrc = '#form_setor',
    alertSrc = '#alerts_form_setor',
    formUrlBase = '/default/setor',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        gerente: {
            required: true
        },
        nome: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };