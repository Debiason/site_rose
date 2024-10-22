var formSrc = '#form_reembolso',
    alertSrc = '#alerts_form_reembolso',
    formUrlBase = '/default/reembolso',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    formValidateRules = $.extend(baseFormValidateRules,
        {
            id: {
                required: true
            },
            favorecido: {
                required: true
            },
            contaBancaria: {
                required: true
            },
            valor: {
                required: true
            },
            dtConfirmacao: {
                required: true
            },
            notasQuitadas: {
                required: true
            }
        }),

    handleLocalListeners = function(mainForm)
    {
        //elements
        var comboFavorecido = $("select[name='favorecido']", mainForm),
            comboContaBancaria = $("select[name='contaBancaria']", mainForm),
            comboAcordo = $("select[name='acordo']", mainForm),
            comboRubricaAprovada = $("select[name='rubricaAprovada']", mainForm),
            btnUltimosPedidos = $(".btn-ultimos-pedidos", mainForm);

        //triggers
        comboFavorecido.change(controlComboFavorecido);
        comboFavorecido.ready(controlComboFavorecido);

        comboAcordo.change(getAvisos);
        comboAcordo.change(controlComboAcordo);
        comboAcordo.ready(controlComboAcordo);

        btnUltimosPedidos.click(loadUltimosPedidos);

        //functions
        function controlComboFavorecido(){

            if(!comboFavorecido.val()) {
                return;
            }

            var urlBase = '/conta-bancaria';
            var data = {
                'pessoa': comboFavorecido.val(),
                'dadosCombo': '["id","nome"]'
            };

            var comboFilho = comboContaBancaria;

            controlCombo(urlBase, data, comboFilho);
        }

        function controlComboAcordo(){

            if(!comboAcordo.val()) {
                return;
            }

            var urlBase = '/rubrica-aprovada';
            var data = {
                'acordo': comboAcordo.val(),
                'dadosCombo': '["id","nome"]'
            };

            var comboFilho = comboRubricaAprovada;

            controlCombo(urlBase, data, comboFilho);
        }
    };