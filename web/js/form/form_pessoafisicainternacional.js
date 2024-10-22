var formSrc = '#form_pessoafisicainternacional',
    alertSrc = '#alerts_form_pessoafisicainternacional',
    formUrlBase = '/default/pessoa-fisica-internacional',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    idPessoa =  $('#form_pessoa input[name=id]').val(),
    
    formValidateRules = {
        id: {
            required: true
        },
        pais: {
            required: true
        },
        passaporte: {
            required: true
        },
        enderecos: {
            required: true
        },
        observacoes: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };