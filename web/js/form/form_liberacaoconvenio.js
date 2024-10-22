var formSrc = '#form_liberacaoconvenio',
    alertSrc = '#alerts_form_liberacaoconvenio',
    formUrlBase = '/default/liberacaoconvenio',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        convenio: {
            required: true
        },
        totalParcelas: {
            required: true
        },
        parcelaProporcional: {
            required: true
        },
        rateioProporcional: {
            required: true
        },
        valor: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };