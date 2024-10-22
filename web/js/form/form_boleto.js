var fldLinhaDigitavel = $("input[name='Boleto[linhadigitavel]']");
var fldDtVencimento = $("#dt-vencimento");
var spanValorBoleto = $(".span-valor-boleto");
var spanValorPago = $(".span-valor-pago");
var fldValorPago = $("#fld-valor-pago");
var fldValorDesconto = $("input[name='Boleto[valor_desconto]'], input[name='boleto-valor_desconto-disp']");
var fldValorJuros = $("input[name='Boleto[valor_juros]'], input[name='boleto-valor_juros-disp']");
var fldValorDocumento = $("input[name='boleto-valor_documento-disp']");
var dtVencimento;
var fldPagaViaGRU = $("input[name='Boleto[pagviaguia]']"),
    divLinhaDigitavel = $('#linha-digitavel-guia'),
    fldRecolhimnetoGRU = $("input[name='Boleto[recolhimento_gru]']"),
    fldReferenciaGRU = $("input[name='Boleto[referencia_gru]']");

fldLinhaDigitavel.on('change', function () {
    validarBoletoAjax();
    setTimeout(function(){
        setValorBoleto();
    }, 1000);
});

fldLinhaDigitavel.keyup(function() {
    if ($(this).val().length >= 47 || $(this).val().length == 48 || $(this).val().length == 44) {
        validarBoletoAjax();
        setTimeout(function(){
            setValorBoleto();
        }, 1000);
    }
});

fldPagaViaGRU.on('click', function () {
    verificaPagamentoViaGRU();
});

fldPagaViaGRU.ready(function () {
    verificaPagamentoViaGRU();
});

fldReferenciaGRU.keyup(function () {
    refatoraValoresToInt();
});

fldRecolhimnetoGRU.keyup(function () {
    refatoraValoresToInt();
});

// fldValorDesconto.change(function (){setValorPago()});
// fldValorJuros.change(function (){setValorPago()});

function validarBoletoAjax() {
    var linhadigitavel = fldLinhaDigitavel.val();
    linhadigitavel = linhadigitavel.replace(/[^\d]+/g,'');

    var validacaoBoleto = validarBoleto(linhadigitavel);
    var now = new Date();

    if(validacaoBoleto.sucesso && validacaoBoleto.vencimento >= now) {
        linhadigitavel = validacaoBoleto.linhaDigitavel;
    }

    fldLinhaDigitavel.val(linhadigitavel);

    if(linhadigitavel.length >= 44) {
        $("#info-boleto").load("/documento-fiscal/validar-boleto?linhadigitavel=" + linhadigitavel);

        setTimeout(function(){
            dtVencimento = document.getElementById("dataVencimento").innerText;
            $('#boleto-dt_vencimento-disp').val(dtVencimento).trigger('change');
        }, 1000);

        //verifica a data de vencimento na linha digitavel
        let linhaVencimento = linhadigitavel.substring(33, 37);

        if (linhaVencimento == '0000'){
            $("#info-boleto").hide("slow");
            // fldDtVencimento.show('slow');
            fldDtVencimento.attr('required', 'required');
        }else{
            $("#info-boleto").show("slow");
            if (linhadigitavel.length == 48) {
                // fldDtVencimento.show('slow');
                fldDtVencimento.attr('required', 'required');
            } else {
                // fldDtVencimento.hide('slow');
                fldDtVencimento.attr('required', false);
                // fldDtVencimento.attr('disabled', 'disabled');
            }
        }

    } else {
        $("#info-boleto").hide("slow");
    }
}

function setValorBoleto() {

    var valorBoleto = $("#valor-boleto").val();

    if (valorBoleto == 0 && fldLinhaDigitavel.val().length != 0) {
        $("#valorDocumento").show('slow');
    } else {
        $("#valorDocumento").hide('slow');
    }

    fldValorDocumento.val(valorBoleto).trigger("change");

    spanValorBoleto.text('Valor documento: '+$.convertFloatToMoeda(valorBoleto));

    var valorPago = valorBoleto - $.converteMoedaFloat(fldValorDesconto.val());
    valorPago = valorPago + $.converteMoedaFloat(fldValorJuros.val());

    spanValorPago.text('Valor pago: '+$.convertFloatToMoeda(valorPago));
    fldValorPago.val(valorPago);
}

function setValorPago() {

    var valorPago = fldValorPago.val();
    valorPago = valorPago - $.converteMoedaFloat(fldValorDesconto.val());
    valorPago = valorPago + $.converteMoedaFloat(fldValorJuros.val());

    spanValorPago.text('Valor pago: '+$.convertFloatToMoeda(valorPago));
}

$(document).ready(function () {
   var recarregaData = document.getElementById('boleto-dt_vencimento-disp').value;

    if ($("#valor-boleto").val() == 0 && fldLinhaDigitavel.val().length != 0) {
        $("#valorDocumento").show('slow');
    }

    if (fldLinhaDigitavel.val().length > 40) {
        validarBoletoAjax(); //quando esse código roda, preenche o campo data vencimento com o valor na tela.
    }

    // esse código recupera a data antiga (antes do código acima rodar) e retorna ao valor
    if (recarregaData !== null){
        setTimeout(function(){
            $('#boleto-dt_vencimento-disp').val(recarregaData).trigger('change');
        }, 1100);
    }
});

function verificaPagamentoViaGRU() {
    if (fldPagaViaGRU.is(':checked')) {
        divLinhaDigitavel.show("slow");
    } else {
        divLinhaDigitavel.hide("slow");
    }
}

function refatoraValoresToInt() {
    var numeroRecolhimento = fldRecolhimnetoGRU.val();
    numeroRecolhimento = numeroRecolhimento.replace(/[^\d]+/g,'');
    fldRecolhimnetoGRU.val(numeroRecolhimento);

    var numeroReferencia = fldReferenciaGRU.val();
    numeroReferencia = numeroReferencia.replace(/[^\d]+/g,'');
    fldReferenciaGRU.val(numeroReferencia);
}