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

    var valorAprovado = 0,
    somaTotalAprovado = 0,
    valorLiberado = 0,
    somaTotalLiberado = 0,
    valorALiberar = 0,
    somaTotalALiberar = 0,
    valorConsumido = 0,
    somaTotalConsumido = 0,
    valorEmpenhado = 0,
    somaTotalEmpenhado = 0,
    valorSaldo = 0,
    somaTotalSaldo = 0;

    $('.kv-row-checkbox:checked').each(function () {

        //soma de valor aprovado
        valorAprovado = $(this).closest('tr').find('.valor-aprovado').text();
        valorAprovado = $.convertMoedaToFloat(valorAprovado);
        somaTotalAprovado += valorAprovado;
        valorAprovado = 0;

        //soma de valor liberado
        valorLiberado = $(this).closest('tr').find('.valor-liberado').text();
        valorLiberado = $.convertMoedaToFloat(valorLiberado);
        somaTotalLiberado += valorLiberado;
        valorLiberado = 0;

        // //soma de valor a liberar
        valorALiberar = $(this).closest('tr').find('.valor-aliberar').text();
        valorALiberar = $.convertMoedaToFloat(valorALiberar);
        somaTotalALiberar += valorALiberar;
        valorALiberar = 0;

        // //soma de valor consumido
        valorConsumido = $(this).closest('tr').find('.valor-consumido').text();
        valorConsumido = $.convertMoedaToFloat(valorConsumido);
        somaTotalConsumido += valorConsumido;
        valorConsumido = 0;

        // //soma de valor empenhado
        valorEmpenhado = $(this).closest('tr').find('.valor-empenhado').text();
        valorEmpenhado = $.convertMoedaToFloat(valorEmpenhado);
        somaTotalEmpenhado += valorEmpenhado;
        valorEmpenhado = 0;

        // //soma de valor saldo
        valorSaldo = $(this).closest('tr').find('.valor-saldo').text();
        valorSaldo = $.convertMoedaToFloat(valorSaldo);
        somaTotalSaldo += valorSaldo;
        valorSaldo = 0;

    });

    $('#TotalAprovado').html($.convertFloatToMoeda(somaTotalAprovado));
    $('#TotalLiberado').html($.convertFloatToMoeda(somaTotalLiberado));
    $('#TotalALiberar').html($.convertFloatToMoeda(somaTotalALiberar));
    $('#TotalConsumido').html($.convertFloatToMoeda(somaTotalConsumido));
    $('#TotalEmpenhado').html($.convertFloatToMoeda(somaTotalEmpenhado));
    $('#TotalSaldo').html($.convertFloatToMoeda(somaTotalSaldo));
}
