var tabId = '#tabColaboradorPessoa',
    modalFormSrc = '#form_colaboradorpessoa',
    modalAlertSrc = '#alerts_form_colaboradorpessoa',
    modalFormUrlBase = '/default/colaborador-pessoa',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        pessoaJuridicaNacional: {
            required: true
        },
        nome: {
            required: true
        },
        cargo: {
            required: false
        },
        telefone1: {
            required: false
        },
        telefone2: {
            required: false
        },
        email: {
            required: false
        },
        skype: {
            required: false
        },
        observacoes: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };