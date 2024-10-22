var formSrc = '#form_compraobra',
    alertSrc = '#alerts_form_compraobra',
    formUrlBase = '/default/compra-obra',
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