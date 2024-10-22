//elements
var
    fldDadosFaturamento = $("#faturamentoMinimo"),
    fldFaturamentoValor = $("input[name='Cotacao[faturamentominimo]']"),
    comboSituacao = $("select[name='Cotacao[situacao_id]']"),
    fldValorTotal = $("input[name='Cotacao[valor]'], input[name='cotacao-valor-disp']"),
    fldTaxaCambio = $("input[name='Cotacao[taxacambio]']"),
    fldValorMoeda = $("input[name='Cotacao[valor_moeda]']"),
    fldValorTarifaBancaria = $("input[name='cotacao-tarifa_bancaria-disp']"),
    inputTotalComDespesa = $("input[name='inputTotalComDespesa']"),
    divQuantidade = $("input[name='cotacao-quantidade-disp']"),
    fldValorDespesa = $("input[name='Cotacao[despesas_importacao]']"),
    fldMoeda = $("select[name='Cotacao[moeda_id]']");

var irf = $("input[name='cotacao-irf-disp']").value || 0;

fldTaxaCambio.change(function(){
    calculaValor()
});

fldMoeda.change(function (){
    setTimeout(function(){
        if (!fldTaxaCambio.val()){
            fldTaxaCambio.val(1)
        }
        atualizaValor();
    },1000);
})

function atualizaValor(){
    setTimeout(function(){
        calculaValor()
    },1000);
}
$("#cotacao-valor_moeda-disp").on('change', function(e){
    calculaValor()
});
$("#cotacao-tarifa_bancaria-disp").on('change', function(e){
    calculaValor()
});

$("#cotacao-irf-disp").on('change', function(){
    calculaValor()
});
$("#cotacao-despesas_importacao-disp").on('change', function(e){
    calculaValor()
});
$("#cotacao-quantidade-disp").change(function(){
    calculaValor()
});

$(document).ready(function () {
    $.controlFaturamento();
    $("#motivoSolicitacaoEmpenho").hide();

    if($("input[name='cotacao-tarifa_bancaria-disp']").val() > '0,00'){
        $("#divValorComDespesa").show('slow');
    }else{
        $("#divValorComDespesa").hide('slow');
    }
});

//checkBox para os dados de faturamento
fldFaturamentoValor.on('click', function () {
    $.controlFaturamento();
});

$.controlFaturamento = function () {
    if (fldFaturamentoValor.is(':checked')) {
        fldDadosFaturamento.show("slow");
    } else {
        fldDadosFaturamento.hide("slow");
    }
};

comboSituacao.change(function () {

    $.ajax({
        url: '/cotacao/verifica-motivo-empenho/',
        data: {
            idSituacao: comboSituacao.val(),
            id: $("#cotacao-id").val()
        },
        async: false,
        success: function (resp) {
            if (resp) {
                $("#motivoSolicitacaoEmpenho").show('slow');
                $("textarea[name='Cotacao[justificativa]']").attr('required', 'required');
            } else {
                $("#motivoSolicitacaoEmpenho").hide('slow');
                $("textarea[name='Cotacao[justificativa]']").attr('required', false);
            }
        }
    });

});

$(function(){
    var item_processo_id = String($("#fld-itemProcessoByProcessoCompra").val()).replace(/\D/g, '');
    if(item_processo_id)
        getInfoItemProcesso(item_processo_id);
});

$("#fld-itemProcessoByProcessoCompra").on('change', function(e){
    var item_processo_id = String($(this).val()).replace(/\D/g, '');

    if(item_processo_id) {
        getInfoItemProcesso(item_processo_id);
    } else {
        $("#box-informacao-item").hide();
        $("#body-informacao-item").html('');
    }
    
});

function getInfoItemProcesso(item_processo_id) {
    var _csrf = String($('meta[name=csrf-token]').attr('content'));
    var cotacaoId = $("input[id='cotacao-id']");
    if(_csrf.length === 0) {
        toastr.error('Erro CSRF vazio, atualize a página.');
        return false;
    }

    $.ajax({
        url: '/cotacao/informacao-item-processo',
        method: 'post',
        dataType: 'json',
        data: {
            item_processo_id: item_processo_id,
            cotacao_id: cotacaoId.val(),
        },
        async: false,
        success: function (response) {
            if (!response.hasOwnProperty('data')) {
                toastr.error('Erro na resposta do servidor.')
            }
            var res = response.data;

            if (res.success) {
                $("#box-informacao-item").show();
                $("#body-informacao-item").html(res.info);
            } else {
                $("#box-informacao-item").hide();
                $("#body-informacao-item").html('');
                toastr.error(response.msg);
            }
        }
    });
}

function calculaValor() {

    if (fldTaxaCambio.val()) {
        var quantidade = parseInt(divQuantidade.val());
        var taxaCambio = $.convertMoedaToFloat(fldTaxaCambio.val());
        var valorMoeda = $.convertMoedaToFloat(fldValorMoeda.val());
        var tarifaBancaria = $.convertMoedaToFloat(fldValorTarifaBancaria.val());
        var despesa = $.convertMoedaToFloat(fldValorDespesa.val());
        var irf = document.getElementById('cotacao-irf').value || 0;

        var valorTotal = taxaCambio * valorMoeda;
        //var tarifaBancariaConvertida = tarifaBancaria * taxaCambio

        if (fldValorTarifaBancaria.val() > '0,00') {
            valorTotal = valorTotal + tarifaBancaria;
        }

        if (irf > 0) {
            valorTotal += $.convertMoedaToFloat(irf);
        }

        if (fldValorDespesa.val()) {
            $("#divValorComDespesa").show('slow');
            var TotalComDespesa = valorTotal + despesa;
            inputTotalComDespesa.val(TotalComDespesa.toFixed(2));
        }else{
            $("#divValorComDespesa").hide('slow');
        }

        valorTotal = isNaN(valorTotal) ? 0 : parseFloat(valorTotal).toFixed(2);

        fldValorTotal.val(valorTotal);
    }
}