$(document).ready(function(){
    $("#imprimirOrdemEmMassa").removeAttr('href');
    $("#imprimirOrdemEmMassa").removeClass('btn btn-outline-primary');
    $("#imprimirOrdemEmMassa").addClass('btn btn-outline-secondary');
});

$(".kv-row-checkbox").change(function () {
    getIds();
});

$(".select-on-check-all").change(function () {
    getIds();
});

function getIds() {
    var id = [];
    var i = 0;

    $("#imprimirOrdemEmMassa").removeAttr('href');
    $("#imprimirOrdemEmMassa").removeClass('btn btn-outline-primary');
    $("#imprimirOrdemEmMassa").addClass('btn btn-outline-secondary');

    $('.kv-row-checkbox:checked').each(function () {
        value = JSON.parse(this.value);
        id[i] = value['CODORDEM'];
        i++;
    });

    if (id.length != 0) {
        $("#imprimirOrdemEmMassa").removeClass('btn btn-outline-secondary');
        $("#imprimirOrdemEmMassa").addClass('btn btn-outline-primary');
        urlPrint = "/producao/ordem/print-detail?ordem_producao="+id;
        $("a[id='imprimirOrdemEmMassa']").attr("href", urlPrint);

        urlBaixa = "/producao/ordem/executar-baixa-estoque?ordens="+id;
        $("button[id='realizar-baixa']").attr("value", urlBaixa);

        urlEntrada = "/producao/ordem/executar-entrada-estoque?ordens="+id;
        $("button[id='realizar-entrada']").attr("value", urlEntrada);
    }
}


