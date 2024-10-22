//elements
var
    fldValorAprovado = $("input[name='RemanejamentoRubricaAprovada[valoraprovado]'], input[name='remanejamentorubricaaprovada-valoraprovado-disp']"),
    fldValorModificado = $("input[name='RemanejamentoRubricaAprovada[valormodificacao]'], input[name='remanejamentorubricaaprovada-valormodificacao-disp']"),
    fldValorAprovadoFinal = $("input[name='RemanejamentoRubricaAprovada[valoraprovadofinal]'], input[name='remanejamentorubricaaprovada-valoraprovadofinal-disp']");



//triggers
fldValorAprovado.change(setValorFinal);
fldValorModificado.change(setValorFinal);


//functions
function setValorFinal() {

    if (fldValorAprovado.val() != '' && fldValorModificado.val() == '') {

        var valorFinal = $.convertMoedaToFloat(fldValorAprovado.val());
        fldValorAprovadoFinal.val(valorFinal.toFixed(2));

    } else if (fldValorModificado.val() != '' && fldValorAprovado.val() == '') {

        var valorFinal = $.convertMoedaToFloat(fldValorModificado.val());
        fldValorAprovadoFinal.val(valorFinal.toFixed(2));

    } else {

        var valorAprovado = $.convertMoedaToFloat(fldValorAprovado.val());
        var valorModificado = $.convertMoedaToFloat(fldValorModificado.val());

        var valorFinal = valorAprovado + valorModificado;
        fldValorAprovadoFinal.val(valorFinal.toFixed(2));
    }

}
