
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

    let urlFrequencia = "/pagamento-bolsista/atestar-frequencia?id="+id;
    let urlLiberar = "/pagamento-bolsista/liberar-bolsa?id="+id;
    let urlCancelar = "/pagamento-bolsista/cancelar-bolsa?id="+id;

    $("a[id='atestarFrequencia']").attr("value", urlFrequencia);
    $("a[id='atestarFrequencia']").attr("class", 'dropdown-item showModalButton');
    $("a[id='liberarbolsa']").attr("value", urlLiberar);
    $("a[id='liberarbolsa']").attr("class", 'dropdown-item showModalButton');
    $("a[id='cancelar']").attr("href", urlCancelar);

    let urlPrint = "/pagamento-bolsista/print-detail?pedido_id="+id;
    $("a[id='imprimirEmMassa']").attr("href", urlPrint);

}


