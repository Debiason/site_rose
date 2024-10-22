//elements
var
    fldValorPlanejado = $("input[name='RemanejamentoParcelaEmissaoNotaFiscal[valorplanejado]']," +
        " input[name='remanejamentoparcelaemissaonotafiscal-valorplanejado-disp']"),
    fldValorPlanejadoAlterado = $("input[name='RemanejamentoParcelaEmissaoNotaFiscal[valorplanejadoalterado]']," +
        " input[name='remanejamentoparcelaemissaonotafiscal-valorplanejadoalterado-disp']"),
    fldValorPlanejadoFinal = $("input[name='RemanejamentoParcelaEmissaoNotaFiscal[valorplanejadofinal]']," +
        " input[name='remanejamentoparcelaemissaonotafiscal-valorplanejadofinal-disp']");

//triggers
fldValorPlanejadoAlterado.change(calculaValorTotalPlanejado);

//functions
function calculaValorTotalPlanejado() {

    if (fldValorPlanejadoAlterado.val() == '') {
        fldValorPlanejadoFinal.val(fldValorPlanejado.val());
    } else {

        var valorPlanejado = $.convertMoedaToFloat(fldValorPlanejado.val());
        var valorPlanejadoalterado = $.convertMoedaToFloat(fldValorPlanejadoAlterado.val());

        var valorFinal = valorPlanejado + valorPlanejadoalterado;
        fldValorPlanejadoFinal.val(valorFinal.toFixed(2));
    }

}
