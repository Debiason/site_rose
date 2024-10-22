var formSrc = '#form_tabeladiaria',
    alertSrc = '#alerts_form_tabeladiaria',
    formUrlBase = '/default/tabela-diaria',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        anexo: {
            required: true
        },
        nome: {
            required: true
        },
        observacoes: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };