var modalFormSrc = '#form_pedidoetapa',
    modalAlertSrc = '#alerts_form_pedidoetapa',
    modalFormUrlBase = '/default/pedido-etapa',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        pedido: {
            required: true
        },
        etapa: {
            required: true
        },
        valor: {
            required: true
        }
    },

    handleLocalListeners = function(mainForm)
    {
        //define valor da chave para entidade principal
        var pedidoId = $(formSrc+' input[name=id]').val(),
            fldPedido = $(modalFormSrc+' input[name=pedido]');
        fldPedido.ready(function(){
            fldPedido.val(pedidoId);
        });
        
        //elements
        var comboMeta = $(modalFormSrc+" select[name='meta']"),
            comboEtapa = $(modalFormSrc+" select[name='etapa']");

        //triggers
        comboMeta.change(controlComboMeta);
        comboMeta.ready(loadComboMeta);
        
        //functions
        function loadComboMeta() {
            var combo = comboMeta;
            var acordo = $(formSrc+" select[name=acordo]").select2('data')[0]['id'];
            var urlBase = '/meta';
            var data = {
                'acordo': acordo,
                'dadosCombo': '["id","descricao"]'
            };

            controlCombo(urlBase, data, combo, 'descricao');
            controlComboMeta();
        }

        function controlComboMeta() {
            if(!comboMeta.val()) {
                return;
            }

            var urlBase = '/etapa';
            var data = {
                'meta': comboMeta.val(),
                'dadosCombo': '["id","descricao"]'
            };

            var comboFilho = comboEtapa;

            controlCombo(urlBase, data, comboFilho, 'descricao');
        }

    };