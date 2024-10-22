var formSrc = '#form_tipobolsa',
    alertSrc = '#alerts_form_tipobolsa',
    formUrlBase = '/default/tipo-bolsa',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        atestadoFrequencia: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };