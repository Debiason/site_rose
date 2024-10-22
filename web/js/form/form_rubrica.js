var formSrc = '#form_rubrica',
    alertSrc = '#alerts_form_rubrica',
    formUrlBase = '/default/rubrica',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        pais: {
            required: true
        },
        nome: {
            required: true
        },
        dispendio: {
            required: true
        },
        apelidos: {
            required: true
        },
        observacoes: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };