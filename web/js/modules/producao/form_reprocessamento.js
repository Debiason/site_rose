$("body").delegate(".fld-qtd-usada", "change", function () {
    loteUsado($(this));
});

function loteUsado(comboLote) {
    var quantidade = comboLote.val();
    var idLote = $(comboLote).closest("tr").find(".fld-id-lote").val();
    var idAtvMP = $(comboLote).closest("tr").find(".fld-idAtvMateriaPrima").val();
    var codLoc = $(comboLote).closest("tr").find(".fld-cod-local").val();
    var qtdLocaisEstoque = $(".qtd-lotes-disponiveis").val();

    for (var i = 0; i < qtdLocaisEstoque; i++) {
        var idLocalEstoque = document.getElementsByClassName("fld-id-lote")[i].value;
        var codLocal = document.getElementsByClassName("fld-cod-local")[i].value;
        var idAtvMateriaPrima = document.getElementsByClassName("fld-idAtvMateriaPrima")[i].value;

        if ((idAtvMP == idAtvMateriaPrima) && (idLote == idLocalEstoque) && (codLoc != codLocal) && (quantidade > 0)) {
            document.getElementById("katvordemmp-itenslote-" + i + "-quantidadeusada").disabled = true;
            document.getElementById("katvordemmp-itenslote-" + i + "-quantidadeusada").value = '';
        } else {
            document.getElementById("katvordemmp-itenslote-" + i + "-quantidadeusada").disabled = false;
        }
    }
}
