$(".kv-row-checkbox").change(function () {
    somaValoresSelecionados();
});

$(".select-on-check-all").change(function () {
    somaValoresSelecionados();
});

function somaValoresSelecionados() {
    $('#soma-pedidos').show("slow");

    var valor = 0;
    var total = 0;

    $('.kv-row-checkbox:checked').each(function () {
        if ($(this).closest('tr').find('.valor-credito').length > 0) {
            valor = $(this).closest('tr').find('.valor-credito').text();
            valor = $.convertMoedaToFloat(valor);
            total += valor;
        }
    });

    $('#total-pedidos').html("Total: " + $.convertFloatToMoeda(total));
}