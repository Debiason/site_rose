//elements
var
    fldQuantidadeAlterada = $("input[name='RemanejamentoItemAprovado[quantidadealterada]']"),
    fldValorUnitarioAlterado = $("input[name='RemanejamentoItemAprovado[valorunitarioalterado]'], input[name='remanejamentoitemaprovado-valorunitarioalterado-disp']"),
    fldValorTotalAlterado = $("input[name='RemanejamentoItemAprovado[valortotalalterado]'], input[name='remanejamentoitemaprovado-valortotalalterado-disp']");



//triggers
fldQuantidadeAlterada.change(calculaValorTotal);
fldValorUnitarioAlterado.change(calculaValorTotal);


//functions
function calculaValorTotal() {

    if (fldQuantidadeAlterada.val() != '' && fldValorUnitarioAlterado.val() == '') {

        var valorFinal = 0;
        valorFinal = $.convertMoedaToFloat(valorFinal);
        fldValorTotalAlterado.val(valorFinal.toFixed(2));

    } else if (fldQuantidadeAlterada.val() != '' && fldValorUnitarioAlterado.val() == '') {

        var valorFinal = 0;
        valorFinal = $.convertMoedaToFloat(valorFinal);
        fldValorTotalAlterado.val(valorFinal.toFixed(2));

    } else {

        var quantidadeAlterada = $.convertMoedaToFloat(fldQuantidadeAlterada.val());

        var valorUnitarioAlterado = $.convertMoedaToFloat(fldValorUnitarioAlterado.val());

        var valorFinal = quantidadeAlterada * valorUnitarioAlterado;
        fldValorTotalAlterado.val(valorFinal.toFixed(2));
    }

}
