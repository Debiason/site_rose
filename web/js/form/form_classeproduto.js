var formSrc = '#form_classeproduto',
    alertSrc = '#alerts_form_classeproduto',
    formUrlBase = '/default/classe-produto',
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