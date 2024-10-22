
$(".kv-row-checkbox").change(function () {
    getIds();
});

$(".select-on-check-all").change(function () {
    getIds();
});

function getIds() {

    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });

    urlLiberar = "/reembolso/liberar-reembolso?id="+id;

    $("a[id='liberarReembolso']").attr("value", urlLiberar);
    $("a[id='liberarReembolso']").attr("class", 'dropdown-item showModalButton');

    urlPrint = "/reembolso/print-detail-em-massa?pedido_id="+id;
    $("a[id='imprimirEmMassa']").attr("href", urlPrint);
    $("a[id='imprimirEmMassa']").attr('target', '_blanck');
}


