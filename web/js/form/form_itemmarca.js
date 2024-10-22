var tabId = '#tabItemMarca',
    modalFormSrc = '#form_itemmarca',
    modalAlertSrc = '#alerts_form_itemmarca',
    modalFormUrlBase = '/default/item-marca',
    modalFormUrlSave = modalFormUrlBase+'/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    modalFormParentUrlBase = '/default/marca',

    modalFormValidateRules = {
        id: {
            required: true
        },
        marca: {
            required: true
        },
        grupoProduto: {
            required: true
        },
        classeProduto: {
            required: true
        },
        produto: {
            required: true
        },
        referencia: {
            required: false
        },
        comercializa: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {
        //combos
        var comboGrupoProduto = $("select[name='grupoProduto']", mainForm),
            comboClasseProduto = $("select[name='classeProduto']", mainForm);

        //triggers
        comboGrupoProduto.change(controlComboGrupoProduto);
        comboGrupoProduto.ready(controlComboGrupoProduto);

        //functions
        function controlComboGrupoProduto(){
            
            if(!comboGrupoProduto.val()) {
                return;
            }

            var urlBase = '/classe-produto';
            var data = {
                'grupoProduto': comboGrupoProduto.val(),
                'dadosCombo': "[\"id\",\"nome\"]"
            };

            var comboFilho = comboClasseProduto;

            controlCombo(urlBase, data, comboFilho);
        }
    };