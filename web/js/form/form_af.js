var formSrc = '#form_af',
    alertSrc = '#alerts_form_af',
    formUrlBase = '/default/af',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    comboAf = $("select[name='Entrega[af_id]']"),
    fldNaturezaOperacao = $('input[name="Af[naturezaoperacao]"]'),
    fldPermiteOutraNatureza = $('#af-permite_outra_natureza'),
    divPermiteOutraNatureza = $('#div-permite-outra-natureza');


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

    comboAf.change(controlComboAf);
    comboAf.ready(controlComboAf);

    function controlComboAf() {

        var valorAfId = comboAf.val();
        getDados(valorAfId);

    }

    function getDados(valorAfId) {
        $.ajax({
            url: '/af/getdados/',
            data: {
                id: valorAfId
            },
            async: false,
            success: function (resp) {

                //retorno = "Prazo Entrega: " + (resp.dtprazoentrega == null ? '' : resp.dtprazoentrega) + "<br>";
                //retorno += "Processo Compra: " + (resp.processocompra_id == null ? '' : resp.processocompra_id) + "<br>";
                retorno = "<b>Data Pagamento:</b> " + (resp.dtpagamento == null ? '' : resp.dtpagamento);

                $("#dadosaf").html(retorno);
            }
        });
    }

    function updateParcelas() {
        $('.parcela-input').each(function (index) {
            $(this).val(index + 1);
        });
    }

    function permiteOutraNatureza(){
        var naturezaSelecionada = $('input[name="Af[naturezaoperacao]"]:checked').val();
        if (naturezaSelecionada == 'Serviço'){
            divPermiteOutraNatureza.show('slow');
        } else {
            divPermiteOutraNatureza.hide('slow');
            fldPermiteOutraNatureza.prop('checked', false)
        }
    }

    fldNaturezaOperacao.on('change', function(){
        permiteOutraNatureza();
    })

    $(document).ready(function () {
        permiteOutraNatureza();
        updateParcelas();

        $.ajax({
            url: '/af/verifica-af-possui-baixa/',
            type: 'post',
            data: {
                id: $('#modelId').val()
            },
            async: false,
            success: function (resp) {
                if (resp === true) {
                    $('input[name="Af[naturezaoperacao]"]').prop('disabled', true);
                    $("#natureza-info").show('slow');
                }
            }
        })

        $.ajax({
            url: '/af/verifica-compra-locacao-cilindro/',
            type: 'post',
            data: {
                processocompra_id: $('#processocompra_id').val()
            },
            async: false,
            success: function (resp) {
                if (resp === true) {
                    $("#div-parcelas-vencimento").show();
                }
            }
        })

        $('.multiple-input-list__btn').on('click', function() {
            setTimeout(updateParcelas, 100);
        });
    });

// $("button[name='salvar']").click(function (event){
//     event.preventDefault(); // stopping submitting
// });

// $("button[name='salvar']").click(function (event) {
//     var btn = $(this);
//     event.preventDefault();
//     btn.prop('disabled', true);
//     btn.html('Aguarde ...');
//     $('#form-af').submit();
//     setTimeout(function(){
//         btn.prop('disabled', false);
//         btn.html('Salvar');
//     }, 5000);
// });
// $('#botaoSalvar').click(function () {
//     fnbPageBlock();
//     $(this).prop('disabled', true);
//     $.ajax({
//         type: 'post',
//         url: $('#form-af').attr('action'),
//         data: $('#form-af').serialize(),
//         success: function (data) {
//             if (data.success) {
//                 window.location.href = data.redirect;
//             } else {
//                 fnbPageUnblock()
//                 var errorMessage = data.message || 'Ocorreu um erro na requisição. Revise os dados e tente novamente';
//                 $('#mensagemErro').html(errorMessage).show();
//                 $('html, body').animate({
//                     scrollTop: $('#mensagemErro').offset().top - 1000
//                 }, 'slow');
//                 document.getElementById("botaoSalvar").disabled = false;
//                  // window.location.reload();
//             }
//         },
//         error: function (jqXHR) {
//             fnbPageUnblock();
//             var errorMessage = jqXHR.responseJSON.message || 'Ocorreu um erro na requisição.';
//             $('#mensagemErro').html(errorMessage).show();
//             $('html, body').animate({
//                 scrollTop: $('#mensagemErro').offset().top - 1000
//             }, 'slow');
//             document.getElementById("botaoSalvar").disabled = false;
//         }
//     });
// });