$(document).ready(function () {

    $("input[name='ParcelaNotaFiscal[itemParcela]']" ).each(function( index ) {

        var i = index + $( this ).text();
        var identificador = 'parcelanotafiscal-itemparcela-'+i+'-dtvencimento';
        $('#' + identificador).attr('required', 'required');
    });
});

$(".multiple-input-list__btn").click(campoObrigatorio());

function campoObrigatorio() {
    $("input[name='ParcelaNotaFiscal[itemParcela]']" ).each(function( index ) {
        var i = index + $( this ).text();
        var identificador = 'parcelanotafiscal-itemparcela-'+i+'-dtvencimento';
        $('#' + identificador).attr('required', 'required');
    });
}