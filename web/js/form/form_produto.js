var formSrc = '#form_produto',
    alertSrc = '#alerts_form_produto',
    formUrlBase = '/default/produto',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    sMsgErrorFalhaCarregarComboClasse = 'Falha ao carregar os dados do combo de classe de produtos.',

    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        apelidos: {
            required: false
        },
        tipoItemCompra: {
            required: true
        },
        'grupoProduto': {
            required: true
        },
        'classeProduto': {
            required: true
        },
        unidade: {
            required: true
        },
        produtoSimilar: {
            required: false
        },
        descricao: {
            required: false
        },
        ultimoPreco: {
            required: false
        },
        precoMedio: {
            required: false
        },
        precoMedioCalculado: {
            required: false
        },
        ncmNbs: {
            required: false
        },
        patrimoniado: {
            required: false
        },
        licenca: {
            required: false
        },
        seguro: {
            required: false
        },
        controlado: {
            required: false
        },
        ativo: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
        $("select[name='grupoProduto']", mainForm).change(function () {

            var urlBase = '/classe-produto';
            var data = {
                'grupoProduto': $("select[name='grupoProduto']").val(),
                'dadosCombo': "[\"id\",\"nome\"]"
            };

            var comboFilho = $("select[name='classeProduto']");

            controlCombo(urlBase, data, comboFilho);
        });

        $("select[name='classeProduto']", mainForm).ready(function () {

            var urlBase = '/classe-produto';
            var data = {
                'grupoProduto': $("select[name='grupoProduto']").val(),
                'dadosCombo': "[\"id\",\"nome\"]"
            };
            var comboFilho = $("select[name='classeProduto']");
            controlCombo(urlBase, data, comboFilho);

            var classeProdutoHidden = $("input[name='classeProdutoHidden']").val();
            $('.classeProduto option[value="' + classeProdutoHidden + '"').attr("selected", "selected");

        });
    };