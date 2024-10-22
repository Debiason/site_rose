//elements
var
    comboContaBancaria = $("select[name='DevolucaoRecurso[contabancaria_id]']"),
    fldPagaViaGRU = $("input[name='DevolucaoRecurso[pagviaguia]']"),
    fldPagaViaDAE = $("input[name='DevolucaoRecurso[pagviadae]']"),
    fldRecolhimnetoGRU = $("input[name='DevolucaoRecurso[recolhimento_gru]']"),
    fldReferenciaGRU = $("input[name='DevolucaoRecurso[referencia_gru]']"),
    divLinhaDigitavel = $('#linha-digitavel-guia'),
    divDadosGRU = $('#pag-via-gru'),
    inputLinhaDigitavel = $('#devolucaorecurso-linhadigitavel'),
    dtVencimento;

fldPagaViaGRU.on('click', function () {
    verificaPagamentoViaGRU_DAE();
    verificaPagamentoViaGRU();
});

fldPagaViaDAE.on('click', function () {
    verificaPagamentoViaGRU_DAE();
});

fldPagaViaGRU.ready(function () {
    verificaPagamentoViaGRU_DAE();
    verificaPagamentoViaGRU();
});

inputLinhaDigitavel.on('change', function () {
    validarBoletoAjax();
});

fldReferenciaGRU.keyup(function () {
    refatoraValoresToInt();
});

fldRecolhimnetoGRU.keyup(function () {
    refatoraValoresToInt();
});

function verificaPagamentoViaGRU_DAE() {
    if (fldPagaViaGRU.is(':checked') || fldPagaViaDAE.is(':checked')) {
        comboContaBancaria.attr('required', false);
        comboContaBancaria.hide('slow');
        $("label[for='fld-contabancaria']").hide('slow');
        divLinhaDigitavel.show("slow");
        comboContaBancaria.val('');
        inputLinhaDigitavel.attr('required', 'required');
    } else {
        comboContaBancaria.attr('required', 'required');
        comboContaBancaria.show('slow');
        $("label[for='fld-contabancaria']").show('slow');
        inputLinhaDigitavel.val('');
        inputLinhaDigitavel.attr('required', false);
        divLinhaDigitavel.hide("slow");
        $('#linha-digitavel-guia').hide();
        $("#info-boleto").hide("slow");
    }
}

function verificaPagamentoViaGRU() {
    if (fldPagaViaGRU.is(':checked')) {
        divDadosGRU.show("slow");
    } else {
        divDadosGRU.hide("slow");
    }
}


function validarBoletoAjax() {
    var linhadigitavel = inputLinhaDigitavel.val();
    linhadigitavel = linhadigitavel.replace(/[^\d]+/g, '');

    var validacaoBoleto = validarBoleto(linhadigitavel);
    var now = new Date();

    if (validacaoBoleto.sucesso && validacaoBoleto.vencimento >= now) {
        linhadigitavel = validacaoBoleto.linhaDigitavel;
    }

    inputLinhaDigitavel.val(linhadigitavel);

    if (linhadigitavel.length >= 44) {
        $("#info-boleto").load("/documento-fiscal/validar-boleto?linhadigitavel=" + linhadigitavel);

    //    verifica a data de vencimento na linha digitavel
        let linhaVencimento = linhadigitavel.substring(33, 37);
        dtVencimento = $("#dataVencimento");
        if (linhaVencimento == '0000') {
            $("#info-boleto").hide("slow");
            dtVencimento.attr('required', 'required');
        } else {
            $("#info-boleto").show("slow");
            if (linhadigitavel.length == 48) {
                dtVencimento.attr('required', 'required');
            } else {
                dtVencimento.attr('required', false);
            }
        }

    } else {
        $("#info-boleto").hide("slow");
    }
}

$(document).ready(function () {
    if (inputLinhaDigitavel.val().length > 40) {
        validarBoletoAjax(); //quando esse código roda, preenche o campo data vencimento com o valor na tela.
        verificaPagamentoViaGRU_DAE();
    }
});

function refatoraValoresToInt() {
    var numeroRecolhimento = fldRecolhimnetoGRU.val();
    numeroRecolhimento = numeroRecolhimento.replace(/[^\d]+/g,'');
    fldRecolhimnetoGRU.val(numeroRecolhimento);

    var numeroReferencia = fldReferenciaGRU.val();
    numeroReferencia = numeroReferencia.replace(/[^\d]+/g,'');
    fldReferenciaGRU.val(numeroReferencia);
}
