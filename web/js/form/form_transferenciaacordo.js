var comboAcordo = $("select[name='TransferenciaAcordo[acordo_id]']");
var comboAcordoDestino = $("select[name='TransferenciaAcordo[favorecido_id]']");
var fldValor = $("input[name='TransferenciaAcordo[valor]'], input[name='transferenciaacordo-valor-disp']");
//var fldTarifaBancaria = $("input[name='TransferenciaAcordo[tarifabancaria]'], input[name='transferenciaacordo-tarifabancaria-disp']");

// comboAcordo.change(function () {
//     controlaCamposImportacao();
// })

comboAcordoDestino.change(function () {
    verificaProjetoPossuiSecao();
})

// fldTarifaBancaria.change(function () {
//     calculaValorLiquido();
// })

// fldValor.change(function () {
//     calculaValorLiquido();
// })

// comboAcordo.ready(function () {
//     if (comboAcordo.val() == '' || comboAcordo.val() == null) {
//        // $("#div-tipo-operazao").hide();
//     } else {
//         controlaCamposImportacao();
//     }
// });

comboAcordoDestino.ready(function () {
    if (comboAcordo.val() == '' || comboAcordo.val() == null) {
        $("#div-tipo-operazao").hide();
    } else {
        verificaProjetoPossuiSecao();
    }
});

// $(document).ready(function (){
//     calculaValorLiquido()
// });

//Verifica se o projeto selecionado possui uma secao de produtos cadastrado
function verificaProjetoPossuiSecao() {

    var acordo = [];
    acordo[0] = comboAcordoDestino.val();

    $.ajax({
        url: '/projeto-extra/get-secao-produto/',
        data: {
            depdrop_parents: acordo
        },
        type: 'post',
        async: false,
        success: function (resp) {
            resp = resp['output'];
            if (resp == '') {
                $("#div-tipo-operazao").hide('slow');
            } else {
                $("#div-tipo-operazao").show('slow');
            }
        }
    });
}

// function controlaCamposImportacao() {
//     if (comboAcordo.val() == 3113) { //projeto de importação
//         $('.fld-importacao').show('slow');
//     } else {
//         $('.fld-importacao').hide('slow');
//     }
// }
//
// function calculaValorLiquido() {
//     if (comboAcordo.val() == 3113) { //projeto de importação
//
//         var valorTransferencia = $.convertMoedaToFloat(fldValor.val());
//         var valorTarifaBancaria = $.convertMoedaToFloat(fldTarifaBancaria.val());
//
//         var valorLiquido = valorTransferencia - valorTarifaBancaria;
//         $('.resultado-valor-liquido').text($.convertFloatToMoeda(valorLiquido.toFixed(2)));
//     }
// }