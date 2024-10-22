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

    var urlAtrubuirResponsavel = "/prestacao-conta/atribuir-responsavel?id="+id;
    $("a[id='atribuirResponsavel']").attr("value", urlAtrubuirResponsavel);
    $("a[id='atribuirResponsavel']").attr("class", 'dropdown-item showModalButton');

}


