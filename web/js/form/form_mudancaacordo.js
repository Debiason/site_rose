var formSrc = '#form_mudancaacordo',
    alertSrc = '#alerts_form_mudancaacordo',
    formUrlBase = '/default/mudanca-acordo',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    formValidateRules = $.extend(baseFormValidateRules, {
        id: {
            required: true
        },
        acordo: {
            required: true
        },
        prorrogacaoacordo: {
            required: false
        },
        alteracaoequipeexecutora: {
            required: false
        },
        mudancacoordenador: {
            required: false
        },
        remanejamento: {
            required: false
        }
    }),

    handleLocalListeners = function(mainForm)
    {
    };