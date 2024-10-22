var comboBolsista = $("select[name='PagamentoBolsista[bolsista_id]']"),
    fldMesAnoReferencia = $("input[name='PagamentoBolsista[dtreferencia]']"),
    fldDtAtesto = $("input[name='dtconfirmacao-pagamentobolsista-dtconfirmacao-disp']");


//triggers
comboBolsista.change(controlMensagem);
comboBolsista.ready(controlMensagem);

fldMesAnoReferencia.change(controlMensagem);

//desabilita botao por 5s para evitar erros
$("button[name='continuarMesmoAssim']").click(function (event) {
    event.preventDefault();
    var btn = $(this);
    btn
        .html("Enviando informações...")
        .addClass('disabled')
        .attr('disabled', 'disabled');
    $('#form-pedido').submit();
    setTimeout(function(){
        btn.html('Continuar mesmo assim')
            .removeClass('disabled')
            .removeAttr('disabled');
    }, 5000);
});

//functions

function controlMensagem() {

    var valorId = comboBolsista.val();
    var data = fldMesAnoReferencia.val();

    if(!valorId)
        return false;

    $.ajax({
        url: '/pagamento-bolsista/getatestado/',
        data: {
            id: valorId,
            data: data

        },
        async: false,
        success: function(resp) {
            $('#atestado').html(resp);
        }
    });
}

//Exibe campo valor hora para bolsistas pagos por hora
var fldValorTotal = $("input[name='PagamentoBolsista[valor]'], input[name='pagamentobolsista-valor-disp']"),
    fldCargaHoraria = $("input[name='PagamentoBolsista[cargahorariatotal]'], input[name='pagamentobolsista-cargahorariatotal-disp']"),
    fldValorHora = $("input[name='PagamentoBolsista[valorhora]'], input[name='pagamentobolsista-valorhora-disp']");
    fldOutrasDespesas = $("input[name='pagamentobolsista-outrasdespesas-disp']");


$(document).ready(function () {
    fldDtAtesto.attr('required' , 'required');
    $('#valorHora').hide();
    $('#cargaHoraria').hide();
    var bolsistaId = comboBolsista.val();
    verificaBolsitaPagoPorHora(bolsistaId);
});

comboBolsista.change(function () {
    var bolsistaId = comboBolsista.val();
    verificaBolsitaPagoPorHora(bolsistaId);
});

//quando modifica a carga horaria recalcula o valor total
fldCargaHoraria.change(calculaValorTotal);
fldOutrasDespesas.change(calculaValorTotal);

function verificaBolsitaPagoPorHora(bolsistaId) {

    if(!bolsistaId)
        return false;

    $.ajax({
        url: '/pagamento-bolsista/dados-bolsista/',
        data: {
            id: bolsistaId
        },
        async: false,
        success: function (resp) {

            if (window.location.href.indexOf("create") > -1) {
                fldCargaHoraria.val(resp.cargaHorariaTotal);
            }

            if (resp.tipoPagamento == 'Hora'){
                fldValorHora.val(resp.valorHora);
                $('#valorHora').show('slow');
                $('#cargaHoraria').show('slow');
            }

        }
    });

}

function calculaValorTotal() {

    var valorHora = $.convertMoedaToFloat(fldValorHora.val());
    var cargaHoraria = $.convertMoedaToFloat(fldCargaHoraria.val());
    var outrasdespesas = $.convertMoedaToFloat(fldOutrasDespesas.val());

    var valorCalculado = valorHora * cargaHoraria;

    if (!isNaN(outrasdespesas)) {
        valorCalculado += outrasdespesas;
    }

    fldValorTotal.val(valorCalculado);

}

//Atualiza url dos botoes referentes ao bolsista, setando o id do bolsista selecionado
var comboBolsista = $("select[id='fld-bolsista']"),
    btnInformacoesBolsita = $(".btnInformacoesBolsita"),
    btnUltimosPedidos = $(".btnUltimosPagamentos");

comboBolsista.change(setButtons);

function setButtons() {
    bolsistaId = comboBolsista.val();

    //informacoes bolsista
    btnInfoValue = btnInformacoesBolsita.val();
    arrayValue = String(btnInfoValue).indexOf("=") > -1 ? btnInfoValue.split("=") : [];
    valueFinalInfo = arrayValue[0]+'='+bolsistaId;
    btnInformacoesBolsita.val(valueFinalInfo);

    //informacoes pagamentos
    btnPedidosValue = btnUltimosPedidos.val();
    arrayValue = String(btnPedidosValue).indexOf("=") > -1 ? btnPedidosValue.split("=") : [];
    valueFinal = arrayValue[0]+'='+bolsistaId;
    btnUltimosPedidos.val(valueFinal);


}

