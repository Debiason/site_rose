//elements
var
    fldSelecionado = $("#transacaofinanceira-busca"),
    fldSelecionadoOpcional = $("#transacaofinanceira-buscaopcional"),
    fldProjeto = $("#transacaofinanceira-acordo_id"),
    fldCentroCusto = $("#fld-centrocusto"),
    fldDescricao = $("input[name='TransacaoFinanceira[descricao]']"),
    fldFavorecido = $("#fld-favorecido"),
    fldValor = $("input[name='TransacaoFinanceira[valor]'], input[name='transacaofinanceira-valor-disp']"),
    fldProjetoDiv = $("#acordoTransacaoFinanceira"),
    fldCentroCustoDiv = $("#centroCustoTransacaoFinanceira"),
    fldDescricaoDiv = $("#descrcicaoTransacaoFinanceira"),
    fldFavorecidoDiv = $("#favorecidoTransacaoFinanceira"),
    fldsaldoConvenioDiv = $("#saldoConvenio"),
    fldValorDiv = $("#valorTransacaoFinanceira");


//triggers
// fldSelecionado.change(mostrarCampoBusca);
// fldSelecionadoOpcional.change(mostrarCampoBusca);

//functions
// $(document).ready(function () {
//
//     fldProjetoDiv.show();
//     fldCentroCustoDiv.hide();
//     fldDescricaoDiv.hide();
//     fldFavorecidoDiv.hide();
//     fldValorDiv.hide();
//
// });

// function mostrarCampoBusca() {
//
//
//     if (fldSelecionado.val() == '0'){
//
//         fldCentroCustoDiv.hide();
//         fldDescricaoDiv.hide();
//         fldFavorecidoDiv.hide();
//         fldValorDiv.hide();
//
//         fldCentroCusto.html('<option value="">');
//         fldDescricao.val('');
//         fldFavorecido.html('<option value="">');
//         fldValor.val('');
//
//         fldsaldoConvenioDiv.show();
//         fldProjetoDiv.show("slow");
//     }
//
//     if (fldSelecionado.val() == '1'){
//
//         fldProjetoDiv.hide();
//         fldDescricaoDiv.hide();
//         fldFavorecidoDiv.hide();
//         fldValorDiv.hide();
//
//         fldProjeto.html('<option value="">');
//         fldDescricao.val('');
//         fldFavorecido.html('<option value="">');
//         fldValor.val('');
//
//         fldsaldoConvenioDiv.hide();
//         fldCentroCustoDiv.show("slow");
//     }
//
//     if (fldSelecionado.val() == '2'){
//
//         fldProjetoDiv.hide();
//         fldCentroCustoDiv.hide();
//         fldFavorecidoDiv.hide();
//         fldValorDiv.hide();
//
//         fldProjeto.html('<option value="">');
//         fldCentroCusto.html('<option value="">');
//         fldFavorecido.html('<option value="">');
//         fldValor.val('');
//
//         fldsaldoConvenioDiv.hide();
//         fldDescricaoDiv.show("slow");
//     }
//
//     if (fldSelecionado.val() == '3'){
//
//         fldProjetoDiv.hide();
//         fldCentroCustoDiv.hide();
//         fldDescricaoDiv.hide();
//         fldValorDiv.hide();
//
//         fldProjeto.html('<option value="">');
//         fldCentroCusto.html('<option value="">');
//         fldDescricao.val('');
//         fldValor.val('');
//
//         fldsaldoConvenioDiv.hide();
//         fldFavorecidoDiv.show("slow");
//     }
//
//     if (fldSelecionado.val() == '4'){
//
//         fldProjetoDiv.hide();
//         fldCentroCustoDiv.hide();
//         fldDescricaoDiv.hide();
//         fldFavorecidoDiv.hide();
//
//         fldProjeto.html('<option value="">');
//         fldCentroCusto.html('<option value="">');
//         fldDescricao.val('');
//         fldFavorecido.html('<option value="">');
//
//         fldsaldoConvenioDiv.hide();
//         fldValorDiv.show("slow");
//     }
//
//     if (fldSelecionadoOpcional.val() == '2'){
//
//         fldsaldoConvenioDiv.show();
//         fldProjetoDiv.show("slow");
//     }
//
//     if (fldSelecionadoOpcional.val() == '3'){
//
//         fldsaldoConvenioDiv.hide();
//         fldCentroCustoDiv.show("slow");
//     }
//
//     if (fldSelecionadoOpcional.val() == '4'){
//
//         fldsaldoConvenioDiv.hide();
//         fldDescricaoDiv.show("slow");
//     }
//
//     if (fldSelecionadoOpcional.val() == '1'){
//
//
//         fldsaldoConvenioDiv.hide();
//         fldFavorecidoDiv.show("slow");
//     }
//
//     if (fldSelecionadoOpcional.val() == '5'){
//
//         fldsaldoConvenioDiv.hide();
//         fldValorDiv.show("slow");
//     }
//
//
// }

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

    $('.kv-row-checkbox:checked').each(function() {

        if ($(this).closest('tr').find('.valor-credito').length > 0){
            lanValor = $(this).closest('tr').find('.valor-credito').text();
            lanTipo = 'C';
        }else {
            if ($(this).closest('tr').find('.valor-debito').length > 0){
                lanValor = $(this).closest('tr').find('.valor-debito').text();
                lanTipo = 'D';
            }
        }

        lanValor = $.convertMoedaToFloat(lanValor);

        if(lanTipo == "C")//creditos
        {
            totalCredito += lanValor;
        }

        if(lanTipo == "D")//debitos
        {
            totalDebito += lanValor;
        }

        diferenca = totalCredito-totalDebito;
        somaTotal += lanValor;

        lanValor = 0;
    });

    $('#Creditos').html("CR&Eacute;DITOS: " + $.convertFloatToMoeda(totalCredito));
    $('#Debitos').html("D&Eacute;BITOS: " + $.convertFloatToMoeda(totalDebito));
    $('#Diferenca').html("DIF: " + $.convertFloatToMoeda(diferenca));
}

//Seleciona para cada lançamento de crédito um débito correspondente (igual valor)
function selecionarPares(){
    var tableRows = $("#tabelaLancamentos tr");
    var arrCreditos = [];
    var arrDebitos = [];
    var indiceC = 0;
    var indiceD = 0;

    tableRows.each(function() {
        var lanValor = $(this).closest('tr').find('.lanValor').text();
        var lanTipo = $(this).closest('tr').find('.lanTipo').text();

        if(lanTipo == 'C'){
            var lancamento = new Object();
            lancamento.valor = lanValor;
            lancamento.linha = this;
            lancamento.selecionado = false;
            arrCreditos[indiceC] = lancamento;
            indiceC += 1;
        }

        if(lanTipo == 'D'){
            var lancamento = new Object();
            lancamento.valor = lanValor;
            lancamento.linha = this;
            lancamento.selecionado = false;
            arrDebitos[indiceD] = lancamento;
            indiceD += 1;
        }
    });

    $.each(arrCreditos, function( keyCredito, lanCredito) {
        $.each(arrDebitos, function( keyDebito, lanDebito) {
            if(lanDebito.valor === lanCredito.valor && (lanDebito.selecionado == false && lanCredito.selecionado == false)){

                //marca o checkbox e muda o estilo da linha do par de lançamentos
                $(lanCredito.linha).css('backgroundColor', 'azure');
                $(lanCredito.linha).find("[name='chbexcluir[]']").attr("checked", true);

                $(lanDebito.linha).css('backgroundColor', 'azure');
                $(lanDebito.linha).find("[name='chbexcluir[]']").attr("checked", true);

                //marca esses lançamentos como selecionados
                lanCredito.selecionado = true;
                lanDebito.selecionado = true;
            }
        });
    });
}

$(".kv-row-checkbox").change(function() {
    barraDeStatus();
});

$(".select-on-check-all").change(function() {
    barraDeStatus();
});


