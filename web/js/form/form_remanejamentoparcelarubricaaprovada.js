//elements
var
    fldValorPlanejado = $("input[name='RemanejamentoParcelaRubricaAprovada[valorplanejado]'], input[name='remanejamentoparcelarubricaaprovada-valorplanejado-disp']"),
    fldValorPlanejadoAlterado = $("input[name='RemanejamentoParcelaRubricaAprovada[valorplanejadoalterado]'], input[name='remanejamentoparcelarubricaaprovada-valorplanejadoalterado-disp']"),
    fldValorPlanejadoFinal = $("input[name='RemanejamentoParcelaRubricaAprovada[valorplanejadofinal]'], input[name='remanejamentoparcelarubricaaprovada-valorplanejadofinal-disp']"),
    fldValorLiberado = $("input[name='RemanejamentoParcelaRubricaAprovada[valorliberado]'], input[name='remanejamentoparcelarubricaaprovada-valorliberado-disp']"),
    fldValorLiberadoAlterado = $("input[name='RemanejamentoParcelaRubricaAprovada[valorliberadoalterado]'], input[name='remanejamentoparcelarubricaaprovada-valorliberadoalterado-disp']"),
    fldValorLiberadoFinal = $("input[name='RemanejamentoParcelaRubricaAprovada[valorliberadofinal]'], input[name='remanejamentoparcelarubricaaprovada-valorliberadofinal-disp']");


//triggers
fldValorPlanejadoAlterado.change(calculaValorTotalPlanejado);
fldValorLiberadoAlterado.change(calculaValorTotalLiberado);


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

function calculaValorTotalLiberado() {

    console.log('calculaValorTotalLiberado');

    if (fldValorLiberadoAlterado.val() == '') {
        fldValorLiberadoFinal.val(fldValorLiberado.val());
    } else {

        if (fldValorLiberado.val() == '') {
            var valorLiberado = 0;
        } else {
            var valorLiberado = $.convertMoedaToFloat(fldValorLiberado.val());
        }

        var valorLiberadolterado = $.convertMoedaToFloat(fldValorLiberadoAlterado.val());

        var valorFinal = valorLiberado + valorLiberadolterado;
        fldValorLiberadoFinal.val(valorFinal.toFixed(2));
    }

}
