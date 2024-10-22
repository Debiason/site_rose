var comboTipoPedido = $("select[id='fld-tipopedido']");

comboTipoPedido.change(verificaFiltroTipoPedido);

//functions
function verificaFiltroTipoPedido() {

    var tipoPedidoId = comboTipoPedido.val();

    console.log(tipoPedidoId)

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('tipoPedidoId', tipoPedidoId);

    window.location.search = urlParams;

}
