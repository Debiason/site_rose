var
    fldMovimento = $("#fld-movimento"),
    divSituacoes =  $("#situacaoMovimento"),
    comboSituacoes =  $("#fld-situacao"),
    situacaoAtual =  $("#situacaoAtual");

$(document).ready(function () {
    divSituacoes.hide();
});

//triggers
fldMovimento.change(controlComboDados);

function controlComboDados() {
    var valorMovimentoId = fldMovimento.val();
    getDados(valorMovimentoId);
}

function getDados(valorMovimentoId) {
    $.ajax({
        url: '/producao/ferramentas/get-situacao-movimento',
        data: {
            id: valorMovimentoId
        },
        async: false,
        success: function (resp) {
            divSituacoes.show();
            situacaoAtual.val((-1)*resp);
        }
    });
}

