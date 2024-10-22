//Soma dos valores selecionados no checkbox
$(".kv-row-checkbox").change(function () {
    barraDeStatus();
});

$(".select-on-check-all").change(function () {
    barraDeStatus();
});

function barraDeStatus() {
    //exibe barra de status
    $('#SomaValores').show("slow");

    var cotacaoValor = 0;
    var somaTotal = 0;

    $('.kv-row-checkbox:checked').each(function () {
        cotacaoValor = $(this).closest('tr').find('.valor-cotacao').text();
        cotacaoValor = $.convertMoedaToFloat(cotacaoValor);
        somaTotal += cotacaoValor;
        cotacaoValor = 0;
    });

    $('#TotalSoma').html("<b>Soma dos valores selecionados: </b>" + $.convertFloatToMoeda(somaTotal));
}



