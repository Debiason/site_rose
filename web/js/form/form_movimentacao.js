var fldTipoMovimentacao = $("select[name='Movimentacao[tipomovimentacao_id]']");
var fldPedido = $("select[name='Movimentacao[pedido_id]']");
var divPedido = $("#div_pedido_compra");
var comboPedido = document.getElementById('fld-pedidocompra');
fldTipoMovimentacao.on('change', function () {
    if (fldTipoMovimentacao.val() == 9) {
        divPedido.show("slow");
    } else {
        divPedido.hide("slow");
    }
});

$('#btnSalvar').on('click', function () {
    if (fldTipoMovimentacao.val() == 9 && fldPedido.val() == '') {
        setTimeout(function () {
            comboPedido.classList.add('is-invalid');
            comboPedido.classList.remove('is-valid');
        }, 500);
    } else {
        setTimeout(function () {
            comboPedido.classList.remove('is-invalid');
            comboPedido.classList.add('is-valid');
        }, 500);
    }
});

