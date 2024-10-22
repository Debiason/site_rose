var fldContaBancaria = $("input[name='PagamentoNotaFiscal[contabancaria_id]']"),
    checkBoleto = $("input[name='PagamentoNotaFiscal[boleto]']"),
    checkPagamentoParcelado = $("input[name='PagamentoNotaFiscal[pagamento_parcelado]']"),
    fldValorPedido = $("input[name='PagamentoNotaFiscal[valor]'], input[name='pagamentonotafiscal-valor-disp']"),
    fldQuantidadeParcelas = $("input[name='PagamentoNotaFiscal[quantidade_parcelas]'], input[name='pagamentonotafiscal-quantidade_parcelas-disp']"),
    fldChave = $("input[name='PagamentoNotaFiscal[chave]']"),
    fldFavorecidoSelect2 = $("select[name='PagamentoNotaFiscal[favorecido_id]']"),
    fldFavorecidoDisp = $("#fld-favorecido");

$(document).ready(function () {
    exibeContaBancaria();
    exibePagamentoParcelado();
});

checkBoleto.click(exibeContaBancaria);
checkPagamentoParcelado.click(exibePagamentoParcelado);
fldQuantidadeParcelas.change(exibePagamentoParceladoParcelas);

function exibeContaBancaria() {
    if (checkBoleto.is(':checked')) {
        $("#contaBancaria").hide("slow");
        fldContaBancaria.attr('required', false);
    } else {
        $("#contaBancaria").show("slow");
        fldContaBancaria.attr('required', 'required');
    }
}

function exibePagamentoParcelado() {
    if (checkPagamentoParcelado.is(':checked')) {
        $(".pagamento-parcelado").show("slow");
        $(".pagamento-parcelado-parcelas").show("slow");
    } else {
        $(".pagamento-parcelado").hide("slow");
        $(".pagamento-parcelado-parcelas").hide("slow");
    }
}

function exibePagamentoParceladoParcelas() {

    let valorPedido = fldValorPedido.val();
    let qtdParcelas = fldQuantidadeParcelas.val();

    if (checkPagamentoParcelado.is(':checked')) {
        $("#parcelas-pagamento").load("/pedido/parcelas-pagamento?tipoId=1&qtdParcelas=" + qtdParcelas + "&valorPedido=" + valorPedido);
        $(".pagamento-parcelado").show("slow");
        $(".pagamento-parcelado-parcelas").show("slow");
        setTimeout(function(){
            somaParcelas();
        }, 2000);
    } else {
        $(".pagamento-parcelado").hide("slow");
    }
}
function exibePagamentoParceladoParcelasInicial() {

    let idModel = $("#idModel").val();

    if (checkPagamentoParcelado.is(':checked')) {
        $("#parcelas-pagamento").load("/pedido/parcelas-pagamento?tipoId=1&idModel=" + idModel);
        $(".pagamento-parcelado").show("slow");
        $(".pagamento-parcelado-parcelas").show("slow");
        setTimeout(function(){
            somaParcelas();
        }, 2000);
    } else {
        $(".pagamento-parcelado").hide("slow");
        $(".pagamento-parcelado-parcelas").hide("slow");
    }
}

//Soma todos os valores das parcelas ao alterar valores
$(document).ready(function () {
    somaParcelas();
    exibePagamentoParceladoParcelasInicial();
});

$(document).on("keyup", ".valorParcela", function () {
    somaParcelas();
});

fldValorPedido.keyup(function () {
    somaParcelas();
});

var btnExcluirParcela = $(".js-input-remove");
btnExcluirParcela.click(function () {
    setTimeout(function () {
        somaParcelas();
    }, 500);
});

function somaParcelas() {
    let soma = 0;

    $(".valorParcela").each(function () {
        let valor = $(this)[0].value;
        let valorPlanejado = $.convertMoedaToFloat(valor);
        soma += valorPlanejado;
    });

    let valorFinal = 'Total parcelas: R$' + $.convertFloatToMoeda(soma);
    $("span[id='totalParcelas']").html(valorFinal);

    if (checkPagamentoParcelado.is(':checked')) {

        let valorPedido = fldValorPedido.val();
        let somaFormatada = soma.toFixed(2);

        if (valorPedido.includes(',')) {
            valorPedido = $.convertMoedaToFloat(valorPedido);
        } else  {
            valorPedido = valorPedido.replace('.', '') + '.00';
        }

        if (somaFormatada != valorPedido) {
            fldValorPedido.addClass('is-invalid');
            $("span[id='avisoValorDivergetne']").html('*Soma das parcelas diverge do valor total');
        } else {
            fldValorPedido.removeClass('is-invalid');
            $("span[id='avisoValorDivergetne']").html('');
        }
    } else {
        $("span[id='avisoValorDivergetne']").html('');
    }
}

fldChave.on('input', function () {
    fldChave.val(fldChave.val().replace(/[^0-9]/g, ''));
    $("#info-nota-fiscal-pedido").hide("slow");

    if (fldChave.val().length >= 40) {
        $("#info-nota-fiscal-pedido").load("/documento-fiscal/get-info-sync?chaveacesso=" + fldChave.val(), function () {
            var loadedContent = $(this).html();
            if (!loadedContent.includes('O documento não foi encontrado ou sua situação não permite o download.')) {
                var cnpjCpfText = $(this).find('td:contains("CNPJ/CPF:")').text();
                var cnpjCpfValue = cnpjCpfText.replace(/\D/g, '');
                var valorText = $(this).find('td:contains("Valor:")').text();
                var valorTratado = valorText.replace(/[^\d,]/g, '').replace(',', '.');
                preencherFavorecidoValor(cnpjCpfValue);
                fldValorPedido.val(valorTratado);
            } else {
                fldValorPedido.val('');
                fldFavorecidoSelect2.empty().trigger('change').trigger("select2:select");
                fldContaBancaria.empty();
            }
            $("#preencher-formulario-button").hide("slow");
            $("#info-nota-fiscal-pedido").show("slow");
        });
    } else {
        $("#info-nota-fiscal-pedido").hide("slow");    }
});

function preencherFavorecidoValor(documento) {
    $.ajax({
        url: '/documento-fiscal/sync-favorecido-select2?documento=' + documento,
        async: false,
        success: function (resp) {
            console.log(resp);
            if (resp !== 'Erro'){
                fldFavorecidoSelect2.append(new Option(resp.nome,resp.id, true, true)).trigger('change').trigger("select2:select");
            }
        },
    });
}