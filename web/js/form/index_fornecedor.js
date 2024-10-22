
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

    url = "/fornecedor/ativar-desativar?id="+id;

    $("a[id='ativarDesativar']").attr("href", url);

}


