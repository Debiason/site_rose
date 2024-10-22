var
    divSituacoes =  $("#situacoesProcesso"),
    comboSituacoes =  $("#fld-situacao"),
    situacaoAtual =  $("#situacaoAtual"),
    comboPedido = $("select[name='RelatorioForm[pedido_id]']");


$(document).ready(function () {
    divSituacoes.hide();
});

//triggers
comboPedido.change(controlComboDados);


function controlComboDados() {
    var valorPedidoId = comboPedido.val();
    getDados(valorPedidoId);
}

function getDados(valorPedidoId) {

    //limpa as situacoes do combo
    comboSituacoes.html($('<option>', {
        value: '',
        text: ''
    }));

    $.ajax({
        url: '/ferramentas/get-situacoes-processo/',
        data: {
            id: valorPedidoId
        },
        async: false,
        success: function (resp) {

            divSituacoes.show();
            $.each(resp.situacoes, function (index, element) {
                comboSituacoes.append($('<option>', {
                    value: element.id,
                    text: element.nome
                }));
            });

            situacaoAtual.val(resp.situacaoAtual);
        }
    });
}

