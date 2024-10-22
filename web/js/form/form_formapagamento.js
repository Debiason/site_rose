var formSrc = '#form_formapagamento',
    alertSrc = '#alerts_form_formapagamento',
    formUrlBase = '/default/forma-pagamento',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        descricao: {
            required: true
        },
        ativo: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };