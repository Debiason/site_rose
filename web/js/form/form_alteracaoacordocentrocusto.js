var
    btnAcordo = $("input[id='opc-projeto']"),
    btnCentroCusto = $("input[id='opc-centro-custo']"),
    fldSelecionado = $("input[name='Acordo[selecionado]']"),
    fldCentroCustoDiv = $("#comboCentroCustos"),
    fldAcordoDiv = $("#comboAcordos"),
    comboAcordo = $("select[id='select2-fld-acordo-container']"),
    comboCentroCusto = $("select[id='select2-fld-centrocustocontrato-container']");

//triggers
$(document).ready(function () {
    fldCentroCustoDiv.hide();
    fldSelecionado.hide();
});

btnAcordo.change(function () {
    fldAcordoDiv.show('slow');
    fldCentroCustoDiv.hide();
    fldSelecionado.val('acordo');
});

btnCentroCusto.change(function () {
    fldAcordoDiv.hide();
    fldCentroCustoDiv.show('slow');
    fldSelecionado.val('centroCusto');
});






