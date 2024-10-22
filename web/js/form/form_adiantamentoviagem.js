var comboAcordo = $("select[name='AdiantamentoViagem[acordo_id]']"),
    fldBotaoTabelaDiaria = $('.tabeladiaria');

function verificaExisteTabelaDiaria(valorConveniocontratoId) {

    var modelId = $("#modelId").val();

    if (valorConveniocontratoId == '') {
        fldBotaoTabelaDiaria.hide();

    } else {
        $.ajax({
            url: '/acordo/geturltabeladiaria/',
            data: {
                id: valorConveniocontratoId,
                pedidoId: modelId
            },
            async: false,
            success: function (resp) {

                if (resp.data.success == false) {
                    fldBotaoTabelaDiaria.hide();
                } else {
                    fldBotaoTabelaDiaria.show();
                    var url = resp.data.url;
                    $(".tabeladiaria").attr("href", url);
                }
            }
        });
    }
}

$(document).ready(function () {
    var valorConveniocontratoId = comboAcordo.val();
    verificaExisteTabelaDiaria(valorConveniocontratoId);
});