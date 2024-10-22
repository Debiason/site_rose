var formSrc = '#form_afvencendo',
    alertSrc = '#alerts_form_afvencendo',
    formUrlBase = '/default/af-vencendo',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    formValidateRules =
    {
        id: {
            required: true
        },
        fornecedor: {
            required: true
        },
        enderecoEntrega: {
            required: true
        },
        formaPagamento: {
            required: true
        },
        frete: {
            required: true
        },
        processoCompra: {
            required: true
        },
        naturezaOperacao: {
            required: true
        },
        valor: {
            required: true
        }
    },

    handleLocalListeners = function(mainForm)
    {
        //elements form
        var processoCompraId = $("input[name='processoCompra']").val(),
            fornecedorId = $("input[name='fornecedor']").val(),
            situacaoEmpenhoAprovadoCotacaoId = $("input[name='situacaoEmpenhoAprovadoCotacao']").val();
        
        // elements gridfield
        var selectGridCotacao = $("select[data-name='cotacao']"),
            fldGridProdutoNome = $("input[data-name='produtoNome']"),
            fldGridQuantidade = $("input[data-name='quantidade']"),
            fldGridValor = $("input[data-name='valor']");
            
        //triggers
        selectGridCotacao.ready(function() {
            
            if(!processoCompraId) {
                showError('Nao foi possivel carregar os dados das cotações');
                return;
            }

            var urlBase = '/cotacao';
            var data = {
                'processoCompra': processoCompraId,
                'situacao': situacaoEmpenhoAprovadoCotacaoId,
                'fornecedor': fornecedorId,
                'dadosCombo': "[\"id\",\"nome\"]"
            };

            var comboFilho = selectGridCotacao;

            controlCombo(urlBase, data, comboFilho);
        });
        
        selectGridCotacao.change(function () {

            var recordCotacao = selectGridCotacao.find("option:selected").data("record");
            
            fldGridQuantidade.val(recordCotacao.quantidade);
            fldGridValor.val(recordCotacao.valor);
            fldGridProdutoNome.val(recordCotacao.nome);
        });
        
        //functions
        var gridfieldItens = new Gridfield({
            element: '.gridfield-itens',
            type: 'advanced',
            action: '/item-af/index',
            mainParams: {
                'af': $(formSrc+" input[name=id]").val()
            }
        });

        jQuery(document).ready(function() {
            gridfieldItens.init();
        });
    };