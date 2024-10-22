var formSrc = '#form_checklistcompra',
    alertSrc = '#alerts_form_checklistcompra',
    formUrlBase = '/default/checklist-compra',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        modalidadeCompra: {
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