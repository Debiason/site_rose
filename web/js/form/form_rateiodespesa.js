$("button[id='carregar-lan']").click(function (event) {
    $("#importarLancamentos").val(1).trigger('change');
    let btn = $(this);
    event.preventDefault();
    btn.prop('disabled', true);
    btn.html('Aguarde ...');
    fnbPageBlock();
    $('#form-pedido').submit();
    setTimeout(function () {
    }, 120000);
});

$("button[id='carregar-lan-hcm']").click(function (event) {
    $("#importarLancamentos").val(1).trigger('change');
    let btn = $(this);
    event.preventDefault();
    btn.prop('disabled', true);
    fnbPageBlock();
    btn.html('Aguarde ...');
    $('#form-pedido').submit();
    setTimeout(function () {
        btn.prop('disabled', false);
        btn.html('<i class="fa far fa-download"></i> Importar lançamentos');
        fnbPageUnblock();
    }, 30000);
});

// $("button[name='enviar']").click(function (event) {
//     let btn = $(this);
//     event.preventDefault();
//     btn.prop('disabled', true);
//     fnbPageBlock();
//     btn.html('Aguarde ...');
//     $('#form-pedido').submit();
//     setTimeout(function () {
//         fnbPageUnblock();
//     }, 300000);
// });
//
// $("button[name='salvar']").click(function (event) {
//     let btn = $(this);
//     event.preventDefault();
//     btn.prop('disabled', true);
//     btn.html('Aguarde ...');
//     $('#form-pedido').submit();
//     setTimeout(function () {
//         btn.prop('disabled', false);
//         btn.html('Carregar lançamentos');
//     }, 30000);
// });

var comboTipoDespesa = $("select[name='RateioDespesa[tipodespesa_id]']");
var comboMes = $("select[name='RateioDespesa[mes]']");
var checkboxRetroativo = $("#retroativo")
var divDtRetroativa = $('#data-retroativa');
var fldDtRetroativa = $("input[name='RateioDespesa[dt_retroativa]']");
var fldDtRetroativaDisp = $('#rateiodespesa-dt_retroativa-disp');

//triggers
comboTipoDespesa.change(exibeDadosComplementares);
comboMes.change(exibeDadosComplementares);

checkboxRetroativo.on('change', function (){
    if (checkboxRetroativo.prop('checked')){
        divDtRetroativa.fadeIn('slow')
    } else {
        divDtRetroativa.fadeOut('slow');
        fldDtRetroativaDisp.val('');
        fldDtRetroativa.val('');
    }
});

//functions
function exibeDadosComplementares() {

    let divDespesas = $("#arquivos_despesa");
    let divRetroativo = $("#div-retroativo");
    let divFolha = $("#lancamentos_folha");

    //Verifica se o pedido é do tipo compra, para definir qual combo aparece-rá
    if (comboTipoDespesa.val() === '168'){
        divRetroativo.show('slow');
        divDespesas.show('slow');
    } else {
        divDespesas.hide('slow');
        divRetroativo.hide('slow');
        checkboxRetroativo.prop('checked', false)
        fldDtRetroativaDisp.val('');
        fldDtRetroativa.val('');
    }

    //Verifica se o pedido é do tipo compra, para definir qual combo aparece-rá
    if (comboTipoDespesa.val() === '178'){
        divFolha.show('slow');
    } else {
        divFolha.hide('slow');
    }
}

$(document).ready(function () {
    $("#importarLancamentos").val('').trigger('change');
    exibeDadosComplementares();
});