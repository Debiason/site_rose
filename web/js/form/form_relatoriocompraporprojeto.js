var
    btnAcordo = $("input[id='opc-projeto']"),
    btnCentroCusto = $("input[id='opc-centro-custo']"),
    fldSelecionado = $("input[name='RelatorioForm[selecionado]']"),
    fldCentroCustoDiv = $("#comboCentroCustos"),
    fldAcordoDiv = $("#comboAcordos");

//triggers
$(document).ready(function () {
    fldCentroCustoDiv.hide();
    fldSelecionado.hide();
    if (btnCentroCusto.is(':checked')){
        fldAcordoDiv.hide();
        fldCentroCustoDiv.show('slow');
        fldSelecionado.val('centroCusto')
    }
});

btnAcordo.change(function () {
    fldAcordoDiv.show('slow');
    fldCentroCustoDiv.hide();
    fldSelecionado.val('acordo');
});

btnCentroCusto.change(function () {
    fldAcordoDiv.hide();
    fldCentroCustoDiv.show('slow');
    fldSelecionado.val('centroCusto')
});


