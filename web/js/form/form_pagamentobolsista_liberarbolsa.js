var btnLiberarBolsa = $("button[class='btn btn-success btnLiberarBolsa']");
var checkAlterarModalidade = $("input[name='alterar_modalidade']");
var fldModalidade = $("#modalidade-bolsa");
var fldSitucacao = $("#pagamentobolsista-situacao_id");

function limpaDataPagamento(){
    $('#pagamentobolsista-dtpagamento').val('');
    $('#pagamentobolsista-dtpagamento-disp').val('');
    $("#pagamentobolsista-dtpagamento-disp").trigger('change');
}

function saldoCentroCusto(dataPagamento,idCentroCusto, valorBolsaSelecionada) {
    if (idCentroCusto) {
        $.ajax({
            url: '/pagamento-bolsista/get-saldo-centro-custo/',
            data: {
                id: idCentroCusto,
                dataPagamento: dataPagamento,
                valorBolsaSelecionada: valorBolsaSelecionada
            },
            async: false,
            success: function (valor) {
                $("#centroCusto").html('Saldo do Centro de Custo: ' + valor);
            }
        });
    }
}

checkAlterarModalidade.click(function () {
    if ($(this).is(':checked')) {
        fldModalidade.show("slow");
    } else {
        fldModalidade.hide("slow");
    }
})

$("#pagamentobolsista-dtpagamento-disp").on("change", function(){
    var dataPagamento = $("input[type=text][name='dtpagamento-pagamentobolsista-dtpagamento-disp']").val();
    var idCentroCusto = $("input[type=hidden][name='centroCustoId']").val();
    var valorBolsaSelecionada = $("input[type=hidden][name='valorBolsaSelecionada']").val();
    saldoCentroCusto(dataPagamento,idCentroCusto, valorBolsaSelecionada);

    $.ajax({
        url: '/calendario-recesso/eh-data-util/',
        data: {
            data: dataPagamento.replace(/\//g, '-'),
        },
        async: false,
        success: function (resp) {
            var button = $('#situacaoBolsa');
            if (!resp) {
                button.attr('disabled', 'disabled');
                document.getElementById('erro-data').style.display = 'flex';
            } else {
                button.removeAttr('disabled');
                document.getElementById('erro-data').style.display = 'none';
            }
        }
    });
});


fldSitucacao.change(function () {
    limpaDataPagamento();
    $("#pagamentobolsista-situacao_id").each(function () {
        var idSituacao = $(this).val();
        if (idSituacao) {
            $.ajax({
                url: '/pagamento-bolsista/get-nome-situacao/',
                data: {
                    id: idSituacao,
                },
                async: false,
                success: function (valor) {
                    $('#data-pagamento').show();
                    $("#exibirBotao").html("<button data-confirm='Confirma alteração para situação: " + valor + "' " +
                        "id='situacaoBolsa' class='btn btn-success' type='button' >" +
                        "Salvar <i class='fas fa-save'></i></button>")
                },
            });
        } else {
            $('#situacaoBolsa').hide();
        }
    });
});

$(document).on("submit", "form", function (e) {
    var button = btnLiberarBolsa;
    button.attr('disabled', 'disabled');
    button.html('Aguarde ...');

    setTimeout(function () {
        button.removeAttr('disabled');
        button.html('Salvar');
    }, 6000);
});