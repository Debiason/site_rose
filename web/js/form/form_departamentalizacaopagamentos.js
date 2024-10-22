$(document).ready(function () {

    var valor = 0;

    $("#texto-porcentagem-total").css({"background-color": "#efefef"});

    $("#valor-porcentagem-total").css({"background-color": "#efefef", "text-align": "right"}).val(valor.toFixed(2)+'%');

    $("#aviso-valor-porcentegem-inferior").hide();
    $("#aviso-valor-porcentegem-superior").hide();

    $("#botao-salvar-departamentalizacao").attr("disabled", true);

    // chama função quando uma tecla é liberada do input text
    $('#table-departamentalizacao-pagamentos input').on('keyup', function () {
        somatorioValorDepartamentalizacao();
    });

    // chama função depois que o documento foi carregado
    somatorioValorDepartamentalizacao();

});

function somatorioValorDepartamentalizacao() {
    var valorProcentagem = 0;
    var valorTotal = 0;

    for (var i = 0; i < 12; i++) {
        var porcentagem = document.getElementsByClassName("fld-valor-departamentalizacao")[i].value;
        var valorProcentagemString = porcentagem.replace(/[%]/g, "");
        valorProcentagem = parseFloat(valorProcentagemString.replace(/[,]/g, "."));
        valorTotal += valorProcentagem;
    }

    $("#valor-porcentagem-total").val(valorTotal.toFixed(2)+'%');

    valorTotal = valorTotal.toFixed(2);

    if (valorTotal == 100) {
        $("#aviso-valor-porcentegem-inferior").hide();
        $("#aviso-valor-porcentegem-superior").hide();
        $("#botao-salvar-departamentalizacao").attr("disabled", false);
    } else if (valorTotal < 100) {
        $("#aviso-valor-porcentegem-inferior").show();
        $("#aviso-valor-porcentegem-superior").hide();
        $("#botao-salvar-departamentalizacao").attr("disabled", true);
    } else if (valorTotal > 100) {
        $("#aviso-valor-porcentegem-inferior").hide();
        $("#aviso-valor-porcentegem-superior").show();
        $("#botao-salvar-departamentalizacao").attr("disabled", true);
    }
}