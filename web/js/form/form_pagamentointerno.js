var fldContaBancaria = $("input[name='PagamentoInterno[contabancaria_id]']"),
    //fldLinhaDigitavel = $("input[name='PagamentoInterno[linhadigitavel]']"),
    fldFavorecido = $("select[name='PagamentoInterno[favorecido_id]']"),
    checkBoleto = $("input[name='PagamentoInterno[boleto]']"),
    checkPedidoAssociado = $("input[name='PagamentoInterno[associar_pedido]']"),
    fldUnidadeFundacao = $("select[name='PagamentoInterno[unidadefundacao_id]']"),
    fldCategoria = $("select[name='PagamentoInterno[categoriapagamentointerno_id]']"),
    fldFinalidade = $("select[name='PagamentoInterno[finalidade]']"),
    fldPedidoAssociado = $("select[name='PagamentoInterno[pedidoassociado_id]']"),
    fldModeloRateio = $("select[name='PagamentoInterno[modelo_rateio]']"),
    fldValor = $("input[name='PagamentoInterno[valor]'], input[name='pagamentointerno-valor-disp']"),
    fldModeloDepartamentalizacao = $("select[name='PagamentoInterno[modelo_departamentalizacao]']"),
    divUltimosPagamentos = $("#ultimosPagamentos"),
    divModeloRateio = $(".modelo-rateio"),
    divModeloDepartamentalizacao = $(".modelo-departamentalizacao"),
    fldTipoMovimento = $("select[name='PagamentoInterno[tipo_movimento]']"),
    checkPagamentoParcelado = $("input[name='PagamentoInterno[pagamento_parcelado]']"),
    fldQuantidadeParcelas = $("input[name='PagamentoInterno[quantidade_parcelas]'], input[name='pagamentointerno-quantidade_parcelas-disp']");

$(document).ready(function () {
    exibePagamentoParcelado();
    exibePagamentoParceladoParcelasInicial();
    exibePedidoAssociado();
    exibeContaBancaria();
    fldFavorecido.attr('required', 'required');

    $("#favorecido-pagamento-interno label").html('<label class="text-dark"> Favorecido <span class="text-danger">*</span></label>');

    //fldLinhaDigitavel.change();
    var valor = fldValor.val();
    carregaUltimosPagamentos(fldFavorecido.val(), valor);
    verificaRateioDinamico();
});

checkBoleto.click(exibeContaBancaria);
checkPedidoAssociado.click(exibePedidoAssociado);

fldUnidadeFundacao.change(function () {
    $('#btnAdcTipoPagamentoUnidade').attr('href', '/unidade-fundacao/update?id='+fldUnidadeFundacao.val());
});

fldUnidadeFundacao.change(verificaRealizaRateio);

fldFavorecido.change(function () {
    var valor = $.converteMoedaFloat(fldValor.val());
    carregaUltimosPagamentos(this.value, valor);
});

fldValor.change(function () {
    var valor = $.converteMoedaFloat(fldValor.val());
    carregaUltimosPagamentos(fldFavorecido.val(), valor);
});

fldCategoria.on('select2:select', function(e){
    var select = e.params.data;

    $.ajax({
        url: '/unidade-categoria-pagamento/get-finalidade-padrao/',
        data: {
            categoria: select.id,
            unidade: fldUnidadeFundacao.val(),
        },
        async: false,
        success: function (resp) {

            if (resp) {
                $('#pagamentointerno-finalidade').val(resp)
            }
        }
    });
});

function exibeContaBancaria() {
    if (checkBoleto.is(':checked')) {
        $("#contaBancaria").hide("slow");
        fldContaBancaria.attr('required', false);
    } else {
        $("#contaBancaria").show("slow");
        fldContaBancaria.attr('required', true);
    }
}

function exibePedidoAssociado() {
    if (checkPedidoAssociado.is(':checked')) {
        $("#associar-pedido-div").show("slow");
        fldPedidoAssociado.attr('required', 'required');
    } else {
        $("#associar-pedido-div").hide("slow");
        fldPedidoAssociado.attr('required', false);
    }
}

function verificaRealizaRateio() {
    if (fldUnidadeFundacao.val() == 2) { //Se unidade CSC obrigatorio um modelo de rateio
        divModeloRateio.show('slow');
        divModeloDepartamentalizacao.hide('slow');
    } else { //Lat e Super nao realiza rateio
        divModeloRateio.hide('slow');
        $("select[id='pagamentointerno-modelo_rateio']").val(null);
        if (fldUnidadeFundacao.val() == 1) {
            divModeloDepartamentalizacao.show('slow');
        }else{
            divModeloDepartamentalizacao.hide('slow');
        }
    }
}

function carregaUltimosPagamentos(favorecidoId, valor){
    divUltimosPagamentos.load("/pedido/get-dados-ultimo-pagamento?favorecido_id="+favorecidoId+"&valor="+valor+"&limit=1");
    divUltimosPagamentos.show("slow");
}

fldModeloRateio.change(function () {
    var rateio = fldModeloRateio.val();

    if (rateio) {
        divModeloDepartamentalizacao.hide('slow');
        verificaRateioDinamico();
    } else {
        divModeloDepartamentalizacao.show('slow');
    }
});

fldTipoMovimento.change(function () {

    $.ajax({
        url: '/pagamento-interno/get-dados-movimento',
        data: {
            tipoMovimento: fldTipoMovimento.val(),
            unidade: fldUnidadeFundacao.val(),
        },
        async: false,
        success: function (resp) {
            if (resp) {
                dadosMovimento = resp.dadosMovimento;
                fldLocalEstoque.val(dadosMovimento.local_estoque).trigger('change');
                fldCentroCustoRM.val(dadosMovimento.centro_custo_rm);
            }
        }
    });

});

fldModeloRateio.click(function () {
    verificaRateioDinamico();
});

function verificaRateioDinamico() {
    if (fldModeloRateio.val() == 349) {
        $("#modelo-rateio-dinamico").show('slow');
    } else {
        $("#modelo-rateio-dinamico").hide('slow');
    }
}
// pagamento parcelado -------------------------------------------------

checkPagamentoParcelado.click(exibePagamentoParcelado);
fldQuantidadeParcelas.change(exibePagamentoParceladoParcelas);

function exibePagamentoParcelado() {
    if (checkPagamentoParcelado.is(':checked')) {
        $(".pagamento-parcelado").show("slow");
        $(".pagamento-parcelado-parcelas").show("slow");
    } else {
        $(".pagamento-parcelado").hide("slow");
        $(".pagamento-parcelado-parcelas").hide("slow");
        fldQuantidadeParcelas.val('');
        removeLastInput();
    }
}

function exibePagamentoParceladoParcelas() {

    let valorPedido = fldValor.val();
    let qtdParcelas = fldQuantidadeParcelas.val();

    if (checkPagamentoParcelado.is(':checked')) {
        $("#parcelas-pagamento").load("/pedido/parcelas-pagamento?tipoId=44&qtdParcelas=" + qtdParcelas + "&valorPedido=" + valorPedido);
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
        $("#parcelas-pagamento").load("/pedido/parcelas-pagamento?tipoId=44&idModel=" + idModel);
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
$(document).on("keyup", ".valorParcela", function () {
    somaParcelas();
});

fldValor.keyup(function () {
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

        let valorPedido = fldValor.val();
        let somaFormatada = soma.toFixed(2);

        if (valorPedido.includes(',')) {
            valorPedido = $.convertMoedaToFloat(valorPedido);
        } else  {
            valorPedido = valorPedido.replace('.', '') + '.00';
        }

        if (somaFormatada != valorPedido) {
            fldValor.addClass('is-invalid');
            $("span[id='avisoValorDivergetne']").html('*Soma das parcelas diverge do valor total');
        } else {
            fldValor.removeClass('is-invalid');
            $("span[id='avisoValorDivergetne']").html('');
        }
    } else {
        $("span[id='avisoValorDivergetne']").html('');
    }
}

function removeLastInput() {
    var container = document.querySelector('#parcelas-pagamento');
    var items = container.querySelectorAll('.multiple-input-list__item');
    items.forEach(function(item) {
        item.remove();
    });
    somaParcelas();
}

