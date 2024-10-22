var formSrc = '#form_modalidadebolsa',
    alertSrc = '#alerts_form_modalidadebolsa',
    formUrlBase = '/default/modalidade-bolsa',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        valor: {
            required: true
        },
        link: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };