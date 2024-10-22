$(document).ready(function () {
    var id = $("#pedido_id").val();

    $(".index-view").load('/bolsas/view/load?id='+id);
});