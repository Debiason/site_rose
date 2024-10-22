
$('.kv-row-checkbox').change(function () {
    getIds();
});

$('.select-on-check-all').change(function () {
    getIds();
});

function getIds() {

    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });

    if (id == '') {
        urlLiberar = '';
        $("a[id='liberarNotaFiscal']").attr('value', urlLiberar);
        $("a[id='liberarNotaFiscal']").attr('class', 'dropdown-item');
        urlPrint = '';
        $("a[id='imprimirEmMassa']").attr('href', urlPrint);
        $("a[id='imprimirEmMassa']").attr('target', '_self');
    }else {
        urlLiberar = "/pagamento-nota-fiscal/liberar-nota-fiscal?id="+id;
        $("a[id='liberarNotaFiscal']").attr('value', urlLiberar);
        $("a[id='liberarNotaFiscal']").attr('class', 'dropdown-item showModalButton');
        urlPrint = "/pagamento-nota-fiscal/print-detail-em-massa?pedido_id="+id;
        $("a[id='imprimirEmMassa']").attr('href', urlPrint);
        $("a[id='imprimirEmMassa']").attr('target', '_blanck');
    }



}


