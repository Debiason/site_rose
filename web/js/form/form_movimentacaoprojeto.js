//elements
var
    fldCentroCusto = $("select[name='TransacaoFinanceira[centrocusto_id]']"),
    fldDescricao = $("input[name='TransacaoFinanceira[descricao]']"),
    fldValor = $("input[name='TransacaoFinanceira[valor]'], input[name='transacaofinanceira-valor-disp']"),
    divAcordoByCentroCusto = $("#comboAcordoByCentroCusto"),
    divRubricaAprovadaByCentroCusto = $("#comboRubricaAprovadaByCentroCusto"),
    divRubricaAprovadaByProjeto = $("#comboRubricaAprovadaByProjeto"),
    divAcordo = $("#comboAcordo");


fldCentroCusto.change(function () {
    verificaCentroCustoSetado();
});

function verificaCentroCustoSetado() {
    if (fldCentroCusto.val() != '') {
        divAcordoByCentroCusto.show('slow');
        divAcordo.hide('slow');

        divRubricaAprovadaByCentroCusto.show('slow');
    } else {
        divAcordoByCentroCusto.hide('slow');
        divAcordo.show('slow');

        divRubricaAprovadaByProjeto.hide('slow');
    }
}


//Barra de status para soma de lançamentos
function barraDeStatus() {
    //exibe barra de status
    $('#BarraDeStatus').show("slow");

    var sum = 0;
    var lanValor = 0;
    var lanTipo = "";
    var totalCredito = 0;
    var totalDebito = 0;
    var diferenca = 0;
    var somaTotal = 0;

    $('.kv-row-checkbox:checked').each(function () {

        if ($(this).closest('tr').find('.valor-credito').length > 0) {
            lanValor = $(this).closest('tr').find('.valor-credito').text();
            lanTipo = 'C';
        } else {
            if ($(this).closest('tr').find('.valor-debito').length > 0) {
                lanValor = $(this).closest('tr').find('.valor-debito').text();
                lanTipo = 'D';
            }
        }

        lanValor = $.convertMoedaToFloat(lanValor);

        if (lanTipo == "C")//creditos
        {
            totalCredito += lanValor;
        }

        if (lanTipo == "D")//debitos
        {
            totalDebito += lanValor;
        }

        diferenca = totalCredito - totalDebito;
        somaTotal += lanValor;

        lanValor = 0;
    });

    $('#Creditos').html("CR&Eacute;DITOS: " + $.convertFloatToMoeda(totalCredito));
    $('#Debitos').html("D&Eacute;BITOS: " + $.convertFloatToMoeda(totalDebito));
    $('#Diferenca').html("DIF: " + $.convertFloatToMoeda(diferenca));
}

$(".kv-row-checkbox").change(function () {
    barraDeStatus();
});

$(".select-on-check-all").change(function () {
    barraDeStatus();
});


