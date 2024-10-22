var flddadosTipoPedido = $("#comboTipoPedido"),
    fldcheckbox = $("input[name='RelatorioForm[liberacao]']");


fldcheckbox.on('click', function () {

    if ($(this).is(':checked')) {
        flddadosTipoPedido.hide("slow");
    } else {
        flddadosTipoPedido.show("slow");
    }

});


$(document).ready(function () {

    if (fldcheckbox.is(':checked')) {
        flddadosTipoPedido.hide("slow");
    } else {
        flddadosTipoPedido.show("slow");
    }

});