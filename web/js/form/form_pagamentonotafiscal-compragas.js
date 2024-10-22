$(document).ready(function () {
    verificarFornecedorGas();
});

function verificarFornecedorGas() {
    var comboFavorecido = $("#fld-favorecido");
    var comboAcordo = $("#fld-acordo");
    var url = window.location.href;

    // Função para verificar se o fornecedor fornece gás e se o projeto permite a compra de gás
    function verificarCondicoes() {
        var fornecedorId = comboFavorecido.val();
        var acordoId = comboAcordo.val();

        return $.when(
            $.ajax({
                url: '/fornecedor/fornece-gas',
                data: { fornecedor_id: fornecedorId }
            }),
            $.ajax({
                url: '/projeto-extra/get-projeto-permite-compra-gas',
                data: { acordoId: acordoId }
            })
        );
    }

    // Função para atualizar a interface com base nas condições
    function atualizarInterface(forneceGas, projetoPermite) {
        if (forneceGas && projetoPermite) {
            $("#isCompraGas").val(1).trigger('change');
            $("#alertCompraGas").html("").hide();
            $("#msg-alert-gas").remove();
            $("#div-compra-gas").show('slow');
            $("button[type='submit']").removeAttr("disabled");
        } else {
            $("#isCompraGas").val(0).trigger('change');
            $("#div-compra-gas").hide('slow');

            if (!projetoPermite && forneceGas) {
                var alertDiv = `
                    <div id="msg-alert-gas" class="alert alert-danger alert-dismissible fade show" align="center">
                        O projeto selecionado não permite a compra de gás.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>`;
                if ($("#msg-alert-gas").length === 0) {
                    $(".pagamento-nota-fiscal-form").prepend(alertDiv);
                }
                $("#alertCompraGas").html("O projeto selecionado não permite a compra de gás.").show();
                $("button[type='submit']").attr("disabled", "disabled");
            } else {
                $("#alertCompraGas").html("").hide();
                $("#msg-alert-gas").remove();
                $("button[type='submit']").removeAttr("disabled");
            }
        }
    }

    verificarCondicoes().done(function (forneceGasResponse, projetoPermiteResponse) {
        var forneceGas = forneceGasResponse[0]; // Resposta da chamada AJAX para fornece gás
        var projetoPermite = projetoPermiteResponse[0]; // Resposta da chamada AJAX para permite compra de gás

        var cilindroAtivo = url.indexOf('cilindro=1') !== -1;
        if (cilindroAtivo) {
            forneceGas = true;
        }

        atualizarInterface(forneceGas, projetoPermite);
    });

    comboFavorecido.on('change', function () {
        verificarCondicoes().done(function (forneceGasResponse, projetoPermiteResponse) {
            atualizarInterface(forneceGasResponse[0], projetoPermiteResponse[0]);
        });
    });

    comboAcordo.on('change', function () {
        verificarCondicoes().done(function (forneceGasResponse, projetoPermiteResponse) {
            atualizarInterface(forneceGasResponse[0], projetoPermiteResponse[0]);
        });
    });
}

function limpa_formulario_cep() {
    $('#comboCidadeByUfGas').show('');
    $('#endereco-cidade-gas-div').hide('');
    $('#fld-cidade-gas').val('').trigger('change');
    $('#endereco-cidade-gas').val('').trigger('change');
    $('#fld-estado-gas').val('').trigger('change');
    $('#pagamentonotafiscal-logradouro_gas').val('');
    $('#pagamentonotafiscal-bairro_gas').val('');
}

$('#pagamentonotafiscal-cep_gas').on('blur', function () {
    var cep = $('#pagamentonotafiscal-cep_gas').val(); // obtém o valor do CEP do input
    $.ajax({
        url: '/endereco/get-endereco-by-cep',
        type: 'GET',
        dataType: 'json',
        data: {
            cep: cep
        },
        beforeSend: function () {
            $('#fld-cidade-gas').val('...').trigger('change');
            $('#endereco-cidade-gas').val('...').trigger('change');
            $('#fld-estado-gas').val('...').trigger('change');
            $('#pagamentonotafiscal-logradouro_gas').val('...');
            $('#pagamentonotafiscal-bairro_gas').val('...');
        },
        success: function (data) {
            $('#fld-estado-gas').val(data.estadoId).trigger('change');
            $('#fld-cidade-gas').val(data.cidadeId).trigger('change');
            $('#comboCidadeByUfGas').hide('fast');
            $('#endereco-cidade-gas-div').show('slow');
            $('#endereco-cidade-gas').val(data.cidadeId).trigger('change');
            $('#pagamentonotafiscal-logradouro_gas').val(data.rua);
            $('#pagamentonotafiscal-bairro_gas').val(data.bairro);
        },
        error: function () {
            limpa_formulario_cep();
        }
    });
});