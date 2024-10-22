var btnOpenModalAtribuir = $("#atribuir-dados-movimento");

$(".kv-row-checkbox").on('click', function () {
    getIds();
});

$(".select-on-check-all").on('click', function () {
    setTimeout(function(){
        getIds();
    }, 600);
});

function getIds() {

    var id = [];

    $('.kv-row-checkbox').each(function () {
        if($(this).is(':checked')) {
            id.push($(this).val());
        }
    });

    $("input[name='IdsSelecionados']").val(id);

    if ($("#atribuir-dados-movimento")) {
        var url = $("#atribuir-dados-movimento").val();

        var urlInicial = url.split("&")[0];
        urlInicial += "&idsItens="+id;

        $("#atribuir-dados-movimento").val(urlInicial)
    }

}

$("#incluir-documento-fiscal").on('click', function () {
    if ($(this).hasClass('disabled')) {
        swal({
            title: "Atenção",
            html: "Para pedidos parcelados não é possível adicionar mais do que um Documento Fiscal.",
            type: "warning",
            confirmButtonColor: "#34bfa3",
        });
        return false;
    }
});