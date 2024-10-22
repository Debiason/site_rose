var formSrc = '#form_funcaoequipe',
    alertSrc = '#alerts_form_funcaoequipe',
    formUrlBase = '/default/funcao-equipe',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };