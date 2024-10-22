var fldChaveAcesso = $("input[name='PagamentoInterno[chaveacesso]']");
var fldNumero = $("input[name='PagamentoInterno[numero]']");
var fldValor = $("input[name='PagamentoInterno[valor]'], input[name='pagamentointerno-valor-disp']");
var fldTotalItens = $("input[name='PagamentoInterno[total_itens]'], input[name='pagamentointerno-total_itens-disp']");
var fldTotalDesconto = $("input[name='PagamentoInterno[total_desconto]'], input[name='pagamentointerno-total_desconto-disp']");
var fldTotalFrete = $("input[name='PagamentoInterno[total_frete]'], input[name='pagamentointerno-total_frete-disp']");
var fldTotalIpi = $("input[name='PagamentoInterno[total_ipi]'], input[name='pagamentointerno-total_ipi-disp']");
var fldTotalDespesas = $("input[name='PagamentoInterno[total_despesas]'], input[name='pagamentointerno-total_despesas-disp']");
var fldDtEmissao = $("input[name='PagamentoInterno[dtemissao]'], input[name='dtemissao-pagamentointerno-dtemissao-disp']");
var fldLinhaDigitavel = $("input[name='PagamentoInterno[linhadigitavel]']");
var fldCnpj = $("input[name='PagamentoInterno[cnpj]");
var fldRazaoSocial = $("input[name='PagamentoInterno[razaosocial]");
var fldAutorizacaoPagamento = $("input[name='PagamentoInterno[autorizacao_pagamento]");
var btnProxHome = $("#form-home");
var checkPedidoAssociado = $("input[name='PagamentoInterno[associar_pedido]']");
var fldUnidadeFundacao = $("select[name='PagamentoInterno[unidadefundacao_id]']");
var divModeloRateio = $(".modelo-rateio");
var fldGeraMovimento = $("input[name='PagamentoInterno[gera_movimento]']");
var fldPagamentoVariosBoletos = $("input[name='PagamentoInterno[pagamento_varios_boletos]']");
var fldCategoria = $("select[name='PagamentoInterno[categoriapagamentointerno_id]']");
var fldTipoMovimento = $("select[name='PagamentoInterno[tipo_movimento]']");
var fldLocalEstoque = $("select[name='PagamentoInterno[local_estoque]");
var fldCentroCustoRM = $("input[name='PagamentoInterno[centro_custo_rm]']");
var fldvalorICMS = $("input[name='PagamentoInterno[total_icms]']");
var fldSerieNota = $("input[name='PagamentoInterno[serie]']");
var fldEspecieNota = $("input[name='PagamentoInterno[especie]']");
var fldDtPagamento = $("input[name='PagamentoInterno[dtpagamento]'], input[name='dtpagamento-pagamentointerno-dtpagamento-disp']");

fldGeraMovimento.on('change', function () {
    if(fldGeraMovimento.is(":checked")) {
        $('.dados-movimento').show('slow');
    } else {
        $('.dados-movimento').hide('slow');
    }
});

fldChaveAcesso.on('change', function () {
    getInfoSync();
});

fldPagamentoVariosBoletos.on('change', function () {
    if(fldPagamentoVariosBoletos.is(":checked")) {
        $('.boleto-parcelado').show('slow');
        $('.boleto-unico').hide('slow');
    } else {
        $('.boleto-parcelado').hide('slow');
        $('.boleto-unico').show('slow');
    }
});

fldChaveAcesso.keyup(function() {
    if ($(this).val().length >= 54 || $(this).val().length == 44) {
        getInfoSync();
    }
});

fldUnidadeFundacao.change(verificaRealizaRateio);
checkPedidoAssociado.click(exibePedidoAssociado);

fldNumero.change(function () {
    var numero = fldNumero.val();
    numero = numero.replace(' ', '');
    numero = numero.replace('.', '');
    numero = numero.padStart(9, '0');
    fldNumero.val(numero);
});

fldAutorizacaoPagamento.click(function () {
    escondeMostraFlagServico();
});

function getInfoSync() {
    var chaveacesso = fldChaveAcesso.val();
    chaveacesso = chaveacesso.replace(/\s/g, '');

    if (!chaveacesso.includes('NFe')){

        var tipoNota = chaveacesso.substring(20, 22);

        if (tipoNota == 55 ) {
            chaveacesso = 'NFe'+chaveacesso;
        } else if (tipoNota == 57) {
            chaveacesso = 'CTe'+chaveacesso;
        }
    }

    if(chaveacesso.length >= 47) {
        fldChaveAcesso.val(chaveacesso);
        $("#info-nota-fiscal").load("/documento-fiscal/get-info-sync?chaveacesso=" + chaveacesso);
        $("#info-nota-fiscal").show("slow");
    } else {
        $("#info-nota-fiscal").hide("slow");
    }
}

function preencherViaSync() {
    var chaveacesso = fldChaveAcesso.val();
    console.log('Preenchendo com dados do Sync');
    $.ajax({
        url: '/pagamento-interno/get-info-sync-ajax?chaveacesso=' + chaveacesso,
        async: false,
        success: function (resp) {
            if (resp.success) {
                resp = resp.dados;

                fldNumero.val(resp.numero);
                fldCnpj.val(resp.cnpj);
                fldRazaoSocial.val(resp.razao_social);
                fldNumero.change();
                fldValor.val(parseFloat(resp.valor).toFixed(2));
                fldTotalItens.val(parseFloat(resp.total_itens).toFixed(2));
                fldTotalDesconto.val(parseFloat(resp.total_desconto).toFixed(2));
                fldTotalFrete.val(parseFloat(resp.total_frete).toFixed(2));
                fldTotalIpi.val(parseFloat(resp.total_ipi).toFixed(2));
                fldTotalDespesas.val(parseFloat(resp.total_despesas).toFixed(2));
                $("input[name='PagamentoInterno[dtemissao]']").val(resp.dtemissao);
                $("input[name='dtemissao-pagamentointerno-dtemissao-disp']").val(resp.dtemissao_disp);

                fldvalorICMS.val(parseFloat(resp.total_icms).toFixed(2));
                fldSerieNota.val(parseFloat(resp.serie));
                fldEspecieNota.val(parseFloat(resp.especie));

                var gridfieldItensDocFiscal = new Gridfield({
                    element: '.gridfield-itens-documento-fiscal',
                    type: 'advanced',
                    actionCreate: '/item-documento-fiscal/create',
                    actionRead: '/item-documento-fiscal/read',
                    actionUpdate: '/item-documento-fiscal/update',
                    mainParams: {
                        'documentofiscal_id': 99999999
                    }
                });

                gridfieldItensDocFiscal.cleanStore();
                $.each(resp.itens, function (key, item) {
                    gridfieldItensDocFiscal.addItem(item);
                });
                gridfieldItensDocFiscal.load();
            } else {
                toastr.error(resp.msg);
            }
        }
    });
}

function escondeMostraFlagServico() {

    if (fldAutorizacaoPagamento.is(":checked")) {
        $(".field-pagamentointerno-servico").hide('slow');y
        $("#pagamentointerno-servico").prop("checked", false);
    } else {
        $(".field-pagamentointerno-servico").show('slow');
    }
}

btnProxHome.click(function () {
    $("#home-tab").attr('class', 'nav-link');
    $("#home-tab").attr('class', 'nav-link');
    $("#home").attr('class', 'tab-pane fade');

    $("#dados-pedido-tab").attr('class', 'nav-link active show');
    $("#dados-pedido-tab").attr('aria-selected', true);
    $("#dados-pedido").attr('class', 'tab-pane fade active show');
});

function verificaRealizaRateio() {
    //Se a unidade for projetos pode ser que realize rateio, nao obrigaotrio
    if (fldUnidadeFundacao.val() == 1) {
        divModeloRateio.show('slow');
    } else if (fldUnidadeFundacao.val() == 2) { //Se unidade CSC obrigatorio um modelo de rateio
        divModeloRateio.show('slow');
    } else { //Lat e Super nao realiza rateio
        divModeloRateio.hide('slow');
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

jQuery(document).ready(function() {
    escondeMostraFlagServico();
    fldChaveAcesso.change();
    fldLinhaDigitavel.change();
    fldValor.attr('required', 'required');

    $('.dados-movimento').hide();
    $('.boleto-parcelado').hide();
});

function preencheCategoria() {
    $.ajax({
        url: '/unidade-categoria-pagamento/get-finalidade-padrao/',
        data: {
            categoria: fldCategoria.val(),
            unidade: fldUnidadeFundacao.val(),
        },
        async: false,
        success: function (resp) {
            if (resp) {
                $('#pagamentointerno-finalidade').val(resp);
            }
        }
    });
}

fldCentroCustoRM.change(function () {
    setTimeout(function(){
        preencheCategoria();
        verificaRealizaRateio();
    }, 1000);
});

fldTipoMovimento.change(function () {

    $.ajax({
        url: '/pagamento-interno/get-dados-movimento',
        data: {
            unidade: fldUnidadeFundacao.val(),
            tipoMovimento: fldTipoMovimento.val(),
        },
        async: false,
        success: function (resp) {
            if (resp) {
                dadosMovimento = resp.dadosMovimento;
                fldLocalEstoque.val(dadosMovimento.local_estoque).trigger('change');
                fldCentroCustoRM.val(dadosMovimento.centro_custo_rm).trigger('change');
            }
        }
    });

});

$('#pagamentointerno-dadosparcelas-0-dtvencimento').change(function () {

    console.log('aqui 1');

    if (fldPagamentoVariosBoletos.is(":checked")) {

        var dateParcelaUm = $('#pagamentointerno-dadosparcelas-0-dtvencimento').val();

        let data = new Date(dateParcelaUm);
        let dataFormatada = ((data.getDate() + 1 )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();

        fldDtPagamento.val(dataFormatada);

        fldDtPagamento.trigger('change');
    }
})

fldLinhaDigitavel.on('change', function () {
    validarBoletoAjax();
    setTimeout(function(){
        setValorBoleto();
    }, 1000);
});

fldLinhaDigitavel.keyup(function() {
    if ($(this).val().length >= 47 || $(this).val().length == 48 || $(this).val().length == 44) {
        validarBoletoAjax();
        setTimeout(function(){
            setValorBoleto();
        }, 1000);
    }
});

function validarBoletoAjax() {
    var linhadigitavel = fldLinhaDigitavel.val();
    linhadigitavel = linhadigitavel.replace(/[^\d]+/g,'');

    var validacaoBoleto = validarBoleto(linhadigitavel);
    var now = new Date();

    console.log(validacaoBoleto);

    if(validacaoBoleto.sucesso && validacaoBoleto.vencimento >= now) {
        linhadigitavel = validacaoBoleto.linhaDigitavel;
    }

    fldLinhaDigitavel.val(linhadigitavel);

    if(linhadigitavel.length >= 44) {
        $("#info-boleto").load("/documento-fiscal/validar-boleto?linhadigitavel=" + linhadigitavel);
        $("#info-boleto").show("slow");

        if (linhadigitavel.length == 48) {
            fldDtVencimento.show('slow');
            fldDtVencimento.attr('required', 'required');
        } else {
            fldDtVencimento.hide('slow');
            fldDtVencimento.attr('required', false);
            fldDtVencimento.attr('disabled', 'disabled');
        }

    } else {
        $("#info-boleto").hide("slow");
    }
}