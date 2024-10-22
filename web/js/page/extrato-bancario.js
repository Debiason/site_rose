$(document).ready(function () {

    var centroCusto = $("#dynamicmodel-centrocusto_id");

    if (centroCusto.val() !== '') {
        getInformacao(centroCusto.val());
    }

    centroCusto.on('change', function () {
        getInformacao(centroCusto.val());
    });

    $("#dynamicmodel-agencia").on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $("#dynamicmodel-conta").on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

function getInformacao(centroCustoValue) {
    $.ajax({
        url: '/centro-custo/get-informacao/',
        data: {
            id: centroCustoValue
        },
        async: false,
        success: function (resp) {
            $("#dynamicmodel-agencia").val(resp.agenciaSemDv);
            $("#dynamicmodel-conta").val(resp.contaSemDv);
        }
    });
}