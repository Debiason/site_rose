
$(".kv-row-checkbox").change(function () {
    getIds();
});

$(".select-on-check-all").change(function () {
    getIds();
});

function getIds() {

    var idPedido = [];
    var idAcordo = [];
    var i = 0;


    $('.kv-row-checkbox:checked').each(function () {

        let erro = $(this).closest('tr').find('.erro-divergencia').text();

        if (erro == 2) {
            idPedido[i] = $(this).closest('tr').find('.pedidoId').text();
            idAcordo[i] = $(this).closest('tr').find('.acordoId').text();
            i++;
        }

    });

    $("input[name='pedido_id']").val(idPedido);
    $("input[name='acordo_id']").val(idAcordo);

}

$("input[name='selection_all']").ready(function () {
    $("input[name='selection_all']").hide();
});


