var tabId = '#tabEndereco',
    modalFormSrc = '#form_endereco',
    modalAlertSrc = '#alerts_form_endereco',
    modalFormUrlBase = '/default/endereco',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        pessoa: {
            required: true
        },
        estado: {
            required: true
        },
        cidade: {
            required: true
        },
        tipoLogradouro: {
            required: true
        },
        descricao: {
            required: false
        },
        logradouro: {
            required: false
        },
        numero: {
            required: false
        },
        complemento: {
            required: false
        },
        bairro: {
            required: false
        },
        cep: {
            required: false
        },
        referencia: {
            required: false
        },
        comercial: {
            required: false
        },
        principal: {
            required: false
        },
        ativo: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {
        //combos
        var comboEstado = $("select[name='estado']", mainForm),
            comboCidade = $("select[name='cidade']", mainForm);

        //triggers
        comboEstado.change(controlComboEstado);
        comboEstado.ready(controlComboEstado);

        //functions
        function controlComboEstado() {

            if(!comboEstado.val()) {
                return;
            }

            var urlBase = '/cidade';
            var data = {
                'estado': comboEstado.val(),
                'dadosCombo': "[\"id\",\"nome\"]"
            };

            var comboFilho = comboCidade;

            controlCombo(urlBase, data, comboFilho, '', true);
        }
    };

