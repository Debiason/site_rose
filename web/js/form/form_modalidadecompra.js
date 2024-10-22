var formSrc = '#form_modalidadecompra',
    alertSrc = '#alerts_form_modalidadecompra',
    formUrlBase = '/default/modalidade-compra',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        prazo: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };