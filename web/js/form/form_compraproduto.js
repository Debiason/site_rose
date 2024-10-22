var formSrc = '#form_compraproduto',
    alertSrc = '#alerts_form_compraproduto',
    formUrlBase = '/default/compra-produto',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    formValidateRules = $.extend(baseFormValidateRules,
        {
            id: {
                required: true
            },
            responsavelNome: {
                required: true
            },
            responsavelTelefone: {
                required: true
            },
            responsavelCelular: {
                required: true
            },
            responsavelEmail: {
                required: true
            }
        }),

    handleLocalListeners = function(mainForm)
    {
        
    };