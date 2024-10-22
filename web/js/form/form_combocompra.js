//elements
var comboAcordo = $("#fld-acordo");
var comboAcordoDestino = $("#fld-acordoDestino");

//triggers
comboAcordo.change(function () {
    carregaCampoPedidoCompra();
});
comboAcordoDestino.change(function () {
    carregaCampoPedidoCompra();
});

comboAcordo.ready(function () {
    carregaCampoPedidoCompra();
});
comboAcordoDestino.ready(function () {
    carregaCampoPedidoCompra();
});

function carregaCampoPedidoCompra() {
    if (comboAcordo.val() == 3113 || comboAcordoDestino.val() == 3113) { //projeto de importação
        $('.fieldPedidoCompra').show('slow');
    } else {
        $('.fieldPedidoCompra').hide('slow');
    }
}