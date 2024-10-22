var comboAcordo = $("select[id='fld-acordo']"),
    comboProjeto = $("select[id='fld-projeto']"),
    divBolsista = $("#comboBolsista"),
    divBolsistaByAcordo = $("#comboBolsistaByAcordo"),
    fldCentroCusto = $("select[name='RelatorioForm[centrocusto_id]']"),
    fldAcordo = $("select[name='RelatorioForm[acordo_id]']"),
    divAcordoByCentroCusto = $("#comboAcordoByCentroCusto"),
    divAcordo = $("#comboAcordo");

fldCentroCusto.change(function () {
    verificaCentroCustoSetado();
});

fldAcordo.change(function () {
    console.log('aqui')
    if (fldAcordo.val() != '') {
        divBolsista.hide('slow');
        divBolsistaByAcordo.show('slow');
    } else {
        divBolsistaByAcordo.hide('slow');
        divBolsista.show('slow');
    }
});

comboAcordo.change(function () {
    if (comboAcordo.val() != '') {
        divBolsista.hide('slow');
        divBolsistaByAcordo.show('slow');
    } else {
        divBolsistaByAcordo.hide('slow');
        divBolsista.show('slow');
    }
});
comboProjeto.change(function () {
    if (comboProjeto.val() != '') {
        divBolsista.hide('slow');
        divBolsistaByAcordo.show('slow');
    } else {
        divBolsistaByAcordo.hide('slow');
        divBolsista.show('slow');
    }
});

function verificaCentroCustoSetado() {
    if (fldCentroCusto.val() != '') {
        divAcordoByCentroCusto.show('slow');
        divAcordo.hide('slow');
    } else {
        divAcordoByCentroCusto.hide('slow');
        divAcordo.show('slow');
    }
}