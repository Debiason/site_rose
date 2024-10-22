
$(".kv-row-checkbox").change(function () {
    getIds();
});

$(".select-on-check-all").change(function () {
    getIds();
});

function getIds() {

    let id = [];
    let i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });

    let urlAtender = "/solicitacao/atender-em-massa?id="+id;
    $("a[id='atender-solicitacao']").attr("href", urlAtender);
    $("a[id='atender-solicitacao']").attr("class", 'dropdown-item');

    let urlEncerrar = "/solicitacao/encerrar-em-massa?id="+id;
    $("a[id='encerar-solicitacao']").attr("href", urlEncerrar);
    $("a[id='encerar-solicitacao']").attr("class", 'dropdown-item');

    let urlAguardandoSolicitante = "/solicitacao/aguardando-solicitante-em-massa?id="+id;
    $("a[id='aguardando-solicitante']").attr("href", urlAguardandoSolicitante);
    $("a[id='aguardando-solicitante']").attr("class", 'dropdown-item');

}