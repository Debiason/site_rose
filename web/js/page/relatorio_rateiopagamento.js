$(".kv-row-checkbox").change(function () {
    barraDeStatus();
});

$(".select-on-check-all").change(function () {
    barraDeStatus();
});



function barraDeStatus() {
    //exibe barra de status
    $('#BarraDeStatus').show("slow");

    var valTotal = 0;
    var valRateado = 0;
    var valRateadoWithCsc = 0;

    $('.kv-row-checkbox:checked').each(function() {

        if ($(this).closest('tr').find('.valor-total').length > 0){
            valTotal += $.convertMoedaToFloat($(this).closest('tr').find('.valor-total').text());
        }
        if ($(this).closest('tr').find('.valor-rateado').length > 0){
            valRateado += $.convertMoedaToFloat($(this).closest('tr').find('.valor-rateado').text());
        }
        if ($(this).closest('tr').find('.valor-rateado-csc').length > 0){
            valRateadoWithCsc += $.convertMoedaToFloat($(this).closest('tr').find('.valor-rateado-csc').text());
        }

    });

    $('#valorTotal').html("Valor total: R$ " + $.convertFloatToMoeda(valTotal));
    $('#valorRateado').html("Valor rateado: R$ " + $.convertFloatToMoeda(valRateado));
    $('#valorRateadoWithCsc').html("Valor rateado + CSC: R$ " + $.convertFloatToMoeda(valRateadoWithCsc));
}