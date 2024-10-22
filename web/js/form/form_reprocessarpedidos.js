var
    pedidoComRubrica =  $("#dadosLancamento"),
    comboPedido = $("select[name='Pedido[id]']");


$(document).ready(function () {
    pedidoComRubrica.hide();

});

//triggers
comboPedido.change(controlComboDados);


function controlComboDados() {

    var valorPedidoId = comboPedido.val();
    getDados(valorPedidoId);

}

function getDados(valorPedidoId) {

    $.ajax({
        url: '/ferramentas/getdados-pedido/',
        data: {
            id: valorPedidoId
        },
        async: false,
        success: function (resp) {

            pedidoComRubrica.show();

            retorno = "<strong>Lançamentos: </strong>" + "<br>";
            $.each(resp.lancamento, function (index, element) {

                retorno += "Código: " + (element.codigo == null ? '' : element.codigo) + "<br>";
                retorno += "Descrição: " + (element.descricao == null ? '' : element.descricao) + "<br>";
                retorno += "Rubrica: " + (element.rubrica == null ? '' : element.rubrica) + "<br>";
                retorno += "Valor: " + (element.valor == null ? '' : element.valor) + "<br>" + "<br>";
            });

            retorno += "<strong>Empenhos: </strong>" + "<br>";
            $.each(resp.empenho, function (index, element) {

                retorno += "Código: " + (element.codigo == null ? '' : element.codigo) + "<br>";
                retorno += "Descrição: " + (element.descricao == null ? '' : element.descricao) + "<br>";
                retorno += "Rubrica: " + (element.rubrica == null ? '' : element.rubrica) + "<br>";
                retorno += "Valor: " + (element.valor == null ? '' : element.valor) + "<br>" + "<br>";
            });

            $("#dadosLancamento").html(retorno);

        }

    });
}

