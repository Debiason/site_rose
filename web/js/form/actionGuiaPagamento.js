// var fldLinhaDigitavelGuia = $("input[name='PagamentoInterno[linhadigitavel]']");
// fldLinhaDigitavelGuia.on('change', function () {
//     validarBoletoAjax();
// });
//
// fldLinhaDigitavelGuia.keyup(function() {
//     if ($(this).val().length >= 47 || $(this).val().length == 48 || $(this).val().length == 44) {
//         validarBoletoAjax();
//     }
// });

// function validarBoletoAjax() {
//
//     var linhadigitavel = fldLinhaDigitavelGuia.val();
//     linhadigitavel = linhadigitavel.replace(/[^\d]+/g,'');
//
//     var validacaoBoleto = validarBoleto(linhadigitavel);
//     var now = new Date();
//
//     if(validacaoBoleto.sucesso && validacaoBoleto.vencimento >= now) {
//         linhadigitavel = validacaoBoleto.linhaDigitavel;
//     }
//
//     fldLinhaDigitavelGuia.val(linhadigitavel);
//
//     $("#info-boleto-guia").show("slow");
//
// }

// fldLinhaDigitavelGuia.keyup(function() {
//     if ($(this).val().length >= 47 || $(this).val().length == 48 || $(this).val().length == 44) {
//         validarBoletoMostraValor();
//     }
// });
//
// function validarBoletoMostraValor() {
//
//     var linhadigitavel = fldLinhaDigitavelGuia.val();
//     linhadigitavel = linhadigitavel.replace(/[^\d]+/g,'');
//
//     var validacaoBoleto = validarBoleto(linhadigitavel);
//     var now = new Date();
//
//     if(validacaoBoleto.sucesso && validacaoBoleto.vencimento >= now) {
//         linhadigitavel = validacaoBoleto.linhaDigitavel;
//     }
//
//     fldLinhaDigitavelGuia.val(linhadigitavel);
//
//     $("#info-boleto-guia").show("slow");
//
// }
