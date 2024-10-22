var
    pedidoSemRubrica =  $("#dadosPedidoSemRubrica"),
    pedidoComRubrica =  $("#dadosLancamento"),
    pedidoCompra =  $("#dadosPedidoCompra"),
    comboPedido = $("#fld-pedidosearch");


$(document).ready(function () {
    pedidoSemRubrica.hide();
    pedidoComRubrica.hide();
    pedidoCompra.hide();

});

//triggers
comboPedido.change(function () {
    getDados(this.value);
});


function getDados(valorPedidoId) {

    $.ajax({
        url: '/ferramentas/getdados/',
        data: {
            id: valorPedidoId
        },
        async: false,
        success: function (resp) {

            if (resp.tipo == 1) {

                pedidoComRubrica.show();
                pedidoSemRubrica.hide();
                pedidoCompra.hide();

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

                retorno += "<strong>Rubrica do Pedido: </strong>";
                retorno += (resp.rubricaPedido == null ? '' : resp.rubricaPedido) + "<br>";

                $("#dadosLancamento").html(retorno);

            }


            if (resp.tipo == 2) {

                pedidoComRubrica.hide();
                pedidoSemRubrica.show();
                pedidoCompra.hide();

                retornoTipo = "<strong>Itens do documento fiscal do pedido selecionado:</strong>" + "<br>" + "<br>";
                $.each(resp.documentoFiscal, function (index, element) {

                    retornoTipo += '<label><input type="checkbox" name="itemDocFiscal[]" value='+element.id+'>'+' ' +
                        '- Razão social: '+ (element.razaosocial == null ? '' : element.razaosocial)+' ' +
                        '- Número do documento: '+ (element.numero == null ? '' : element.numero)+' ' +
                        '- Rubrica:  '+ (element.rubrica == null ? '' : element.rubrica)+' ' +
                        '- Valor:  '+ (element.valor == null ? '' : element.valor)+' </label><br>';

                });

                $("#dadosPedidoSemRubrica").html(retornoTipo);
            }

            if (resp.tipo == 3){

                pedidoComRubrica.hide();
                pedidoSemRubrica.hide();
                pedidoCompra.show();

                retorno = "<strong>Itens do pedido de compra:</strong>" + "<br>" + "<br>";
                $.each(resp.itensPedido, function (index, element) {

                    retorno += '<label><input type="checkbox" name="itemCompra[]" value='+element.codigo+'>'+' ' +
                        '- Código: '+ (element.codigo == null ? '' : element.codigo)+' ' +
                        '- Número: '+ (element.numero == null ? '' : element.numero)+' ' +
                        '- Produto: '+ (element.produtoNome == null ? '' : element.produtoNome)+' ' +
                        '- Rubrica:  '+ (element.rubricaNome == null ? '' : element.rubricaNome)+' ' +
                        '- Tipo:  '+ (element.tipoItem == null ? '' : element.tipoItem)+' ' +' </label><br>';

                });

                $("#dadosPedidoCompra").html(retorno);

            }

        }
    });
}

