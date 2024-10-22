//elements
var
    comboTipoPedido = $("select[name='AvisoPedido[tipopedido_id]']"),
    comboTipoTipoItemCompra = $("select[name='AvisoPedido[tipoitemcompra_id]']"),
    comboTipocompra = $("#campoTipoItemCompra");


//triggers
comboTipoPedido.change(mostraCampoTipoCompra);



//functions
function mostraCampoTipoCompra() {

    var valortipoPedidoId = comboTipoPedido.val();
    //Verifica se o pedido é do tipo compra, para definir qual combo aparece-rá
    if (valortipoPedidoId == 29){
        comboTipocompra.show('slow');
    }else {
        comboTipoTipoItemCompra.val(0);
        comboTipocompra.hide('slow');
    }
}



$(document).ready(function () {
    comboTipocompra.hide();
    mostraCampoTipoCompra();
});
