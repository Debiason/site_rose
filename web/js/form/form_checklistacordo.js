var formSrc = '#form_checklistacordo',
    alertSrc = '#alerts_form_checklistacordo',
    formUrlBase = '/default/checklist-acordo',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        observacao: {
            required: true
        },
        formaRecebimento: {
            required: true
        },
        prazo: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };