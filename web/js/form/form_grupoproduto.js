var formSrc = '#form_grupoproduto',
    alertSrc = '#alerts_form_grupoproduto',
    formUrlBase = '/default/grupo-produto',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        apelidos: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {

    };