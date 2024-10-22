var btSalvar = $("button[name='salvar']");
var lbPorcentagemInferior = $("#aviso-valor-porcentegem-inferior");
var lbPorcentagemSuperior = $("#aviso-valor-porcentegem-superior");
var fldModeloRateio = $("select[name='PagamentoInterno[modelo_rateio]']");

$(document).ready(function () {

    var valor = 0;

    $("#texto-porcentagem-total").css({"background-color": "#efefef"});
    $("#valor-porcentagem-total").css({"background-color": "#efefef", "text-align": "right"}).val(valor.toFixed(2)+'%');

    lbPorcentagemInferior.hide();
    lbPorcentagemSuperior.hide();
    if (fldModeloRateio.val() == 349) {
        btSalvar.attr("disabled", true);
    }

    // chama função quando uma tecla é liberada do input text
    $('#table-rateio-pagamentos input').on('keyup', function () {
        somatorioValorDepartamentalizacao();
    });

    // chama função depois que o documento foi carregado
    somatorioValorDepartamentalizacao();
});

function somatorioValorDepartamentalizacao() {
    var valorProcentagem = 0;
    var valorTotal = 0;

    for (var i = 0; i < 4; i++) {
        var porcentagem = document.getElementsByClassName("fld-valor-rateio-dinamico")[i].value;
        var valorProcentagemString = porcentagem.replace(/[%]/g, "");
        valorProcentagem = parseFloat(valorProcentagemString.replace(/[,]/g, "."));
        valorTotal += valorProcentagem;
    }

    $("#valor-porcentagem-total").val(valorTotal.toFixed(2)+'%');

    valorTotal = valorTotal.toFixed(2);

    if (valorTotal == 100) {
        lbPorcentagemInferior.hide();
        lbPorcentagemSuperior.hide();
        btSalvar.attr("disabled", false);
    } else if (valorTotal < 100) {
        lbPorcentagemInferior.show();
        lbPorcentagemSuperior.hide();
        if (fldModeloRateio.val() == 349) {
            btSalvar.attr("disabled", true);
        }
    } else if (valorTotal > 100) {
        lbPorcentagemInferior.hide();
        lbPorcentagemSuperior.show();
        if (fldModeloRateio.val() == 349) {
            btSalvar.attr("disabled", true);
        }
    }
}