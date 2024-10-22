var formSrc = '#form_situacao',
    alertSrc = '#alerts_form_situacao',
    formUrlBase = '/default/situacao',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        processo: {
            required: true
        },
        setor: {
            required: true
        },
        status: {
            required: true
        },
        nome: {
            required: true
        },
        ordem: {
            required: true
        },
        importancia: {
            required: true
        },
        avisarEmail: {
            required: true
        },
        obrigarProximaEtapa: {
            required: true
        },
        sempreDisponivel: {
            required: true
        },
        prazo: {
            required: true
        },
        ativo: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };