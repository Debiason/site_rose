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

    value = "/acordo/enviar-email?id="+id;
    $("button[id='enviarEmail']").val(value);

}