var ItemCompra_formValidateRules =
    {
        itemAprovado: {
            required: true
        }
    },

    ItemCompra_handleLocalListeners = function()
    {
        //elements
        var comboAcordo = $(formSrc+" select[name='acordo']"),
            comboItemAprovado = $(modalFormSrc+" select[name='itemAprovado']"),
            comboProduto = $(modalFormSrc+" select[name='produto']"),
            fldQuantidadeDisponivel = $(modalFormSrc+" input[name='quantidadeDisponivel']"),
            fldUnidade = $(modalFormSrc+" input[name='unidade']");

        //triggers
        comboItemAprovado.change(controlComboItemAprovado);
        comboItemAprovado.ready(loadComboItemAprovado);
        comboProduto.change(controlComboProduto);

        //functions
        function loadComboItemAprovado(){

            var urlBase = '/item-aprovado';
            var data = {
                'acordo': comboAcordo.val(),
                'dadosCombo': '["id","rubricaAprovada","produto","produtoNome","descricaoRestritiva","quantidadeDisponivel"]'
            };
            
            controlCombo(urlBase, data, comboItemAprovado, 'produtoNome');
            controlComboItemAprovado();
        }

        function controlComboItemAprovado(){

            if(!comboItemAprovado.val()) {
                return;
            }

            var record = comboItemAprovado.find("option:selected").data("record");
            fldQuantidadeDisponivel.val(record.quantidadeDisponivel);

            var urlBase = '/produto';
            var data = {
                'id': record.produto,
                'dadosCombo': '["id:true","nome:true","unidadeNome:false","ultimoPreco:false","classeProdutoNome:false","grupoProdutoNome:false"]'
            };

            controlCombo(urlBase, data, comboProduto);
            var recordProduto = comboProduto.find("option:selected").data("record");
            if(typeof recordProduto !== "undefined") {
                fldUnidade.val(recordProduto.unidadeNome);
            }else{
                comboProduto.closest(".form-group").show();
            }
        }

        function controlComboProduto(){

            if(!comboProduto.val()) {
                return;
            }
            var recordProduto = comboProduto.find("option:selected").data("record");
            if(typeof recordProduto !== "undefined") {
                fldUnidade.val(recordProduto.unidadeNome);
            }else{
                comboProduto.closest(".form-group").show();
            }
        }
    };