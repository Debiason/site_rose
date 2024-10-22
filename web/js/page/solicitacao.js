var fldEfetivaLancammnento = $("input[name='solicitacao-lancamento']");
var totalSolicitacoesRateio = $('#total-solicitacoes-rateio');
var solicitacao = $('#id-solicitacao');
var contaIdenvida = $('input[name="conta_indevida"]');
var btnConfirmarLeituraResposta = $('#btn-confirmar-leitura-resposta');
var tipoCreditoIndevido = $("input[name='Solicitacao[tipo_credito_indevido]']");
var fldAcerto = $("select[name='Solicitacao[acerto_adiantamento_id]']");
var fldParcelaEmissao = $("select[name='Solicitacao[parcela_emissao_id]']");
var fldParcelaLiberacao = $("select[name='Solicitacao[parcela_liberacao_id]']");
var fldMovimentacao = $("select[name='Solicitacao[movimentacao_id]']");

$(document).ready(function() {
   verificaAtendimentoSolicitacao();
});

fldEfetivaLancammnento.click(function () {
    lancamentoAtivado();
});

function lancamentoAtivado() {
    let total = (totalSolicitacoesRateio.val());
    let idSolicitacao = solicitacao.val();
    let rateioacordos = '';

    for (let i = 0; i < total; i++) {
       let rateioAcordo = $('input[id="id-rateio-acordo-' + i + '"]').val();

        if ($('input[id="fld-solicitacao-lancamento-' + i + '"]:checked').length > 0) {
            rateioacordos = rateioacordos + rateioAcordo+',';
        }
    }

    if (rateioacordos) {
        $.ajax({
            url: '/solicitacao/solicitacao-rateio',
            data: {
                id: idSolicitacao,
                rateioAcordo: rateioacordos,
            },
            async: false,
            success: function (resp) {
                return resp;
            }
        });
    }
}

contaIdenvida.click(function () {
    verificaAtendimentoSolicitacao();
});

function verificaAtendimentoSolicitacao() {
    if(contaIdenvida.is(':checked') ) {

        var status_solicitacao = $('#situacao').val();

        if (status_solicitacao) {
            contaIdenvida.attr('value', 'true');
            $('#dados-conta').show();
        } else {
             contaIdenvida.attr('disabled', 'disabled');
             $('#dados-conta').hide();
        }

    } else {
        contaIdenvida.attr('value', 'false');
        $('#dados-conta').hide();
    }
}


btnConfirmarLeituraResposta.click(function () {
    confirmarLeituraRespostaSolicitacao();
});

function confirmarLeituraRespostaSolicitacao() {
    $.ajax({
        url: '/solicitacao/confirmar-leitura-resposta-solicitacao',
        data: {
            solicitacaoId: solicitacao.val()
        },
        async: false,
        success: function (resp) {
            if (resp) {
                btnConfirmarLeituraResposta.attr("disabled", 'disabled');
            }
        }
    });
}

tipoCreditoIndevido.click(function() {
    var tipo = $('input[type="radio"]:checked').val();

    $("input[name='DynamicModel[agencia_d]']").val(null);
    $("input[name='DynamicModel[agenciadigito_d]']").val(null);
    $("input[name='DynamicModel[conta_d]']").val(null);
    $("input[name='DynamicModel[contadigito_d]']").val(null);

    if (tipo == 'acerto') {
        $('.comboAcertoAdiantamento').show();
        $('.comboParcelaEmissaoNotaFiscal').hide();
        $('.comboParcelaLiberacaoFinanceira').hide();
        $('.comboMovimentacao').hide();

        fldParcelaEmissao.val(0);
        fldParcelaEmissao.trigger('change');
        fldParcelaLiberacao.val(0);
        fldParcelaLiberacao.trigger('change');
        fldMovimentacao.val(0);
        fldMovimentacao.trigger('change');

    } else if (tipo == 'emissao') {
        $('.comboAcertoAdiantamento').hide();
        $('.comboParcelaEmissaoNotaFiscal').show();
        $('.comboParcelaLiberacaoFinanceira').hide();
        $('.comboMovimentacao').hide();

        fldParcelaEmissao.val(0);
        fldParcelaEmissao.trigger('change');
        fldParcelaLiberacao.val(0);
        fldParcelaLiberacao.trigger('change');
        fldMovimentacao.val(0);
        fldMovimentacao.trigger('change');

    } else if (tipo == 'liberacao') {
        $('.comboAcertoAdiantamento').hide();
        $('.comboParcelaEmissaoNotaFiscal').hide();
        $('.comboParcelaLiberacaoFinanceira').show();
        $('.comboMovimentacao').hide();

        fldAcerto.val(0);
        fldAcerto.trigger('change');
        fldParcelaEmissao.val(0);
        fldParcelaEmissao.trigger('change');
        fldMovimentacao.val(0);
        fldMovimentacao.trigger('change');

    } else if (tipo == 'movimentacao') {
        $('.comboAcertoAdiantamento').hide();
        $('.comboParcelaEmissaoNotaFiscal').hide();
        $('.comboParcelaLiberacaoFinanceira').hide();
        $('.comboMovimentacao').show();

        fldAcerto.val(0);
        fldAcerto.trigger('change');
        fldParcelaEmissao.val(0);
        fldParcelaEmissao.trigger('change');
        fldParcelaLiberacao.val(0);
        fldParcelaLiberacao.trigger('change');

    } else if (tipo == 'laticinio') {
        $('.comboAcertoAdiantamento').hide();
        $('.comboParcelaEmissaoNotaFiscal').hide();
        $('.comboParcelaLiberacaoFinanceira').hide();
        $('.comboMovimentacao').hide();

        fldAcerto.val(0);
        fldAcerto.trigger('change');
        fldParcelaEmissao.val(0);
        fldParcelaEmissao.trigger('change');
        fldParcelaLiberacao.val(0);
        fldParcelaLiberacao.trigger('change');

        carregaDadosBancarios('laticinio', 0);

    } else if (tipo == 'supermercado') {
        $('.comboAcertoAdiantamento').hide();
        $('.comboParcelaEmissaoNotaFiscal').hide();
        $('.comboParcelaLiberacaoFinanceira').hide();
        $('.comboMovimentacao').hide();

        fldAcerto.val(0);
        fldAcerto.trigger('change');
        fldParcelaEmissao.val(0);
        fldParcelaEmissao.trigger('change');
        fldParcelaLiberacao.val(0);
        fldParcelaLiberacao.trigger('change');

        carregaDadosBancarios('supermercado', 0);
    }
});

fldAcerto.change(function() {
    let tipo = $('input[type="radio"]:checked').val();
    let value =  fldAcerto.val();
    if (value) {
        carregaDadosBancarios(tipo, value);
    }
});
fldParcelaEmissao.change(function() {
    let tipo = $('input[type="radio"]:checked').val();
    let value =  fldParcelaEmissao.val();
    if (value) {
        carregaDadosBancarios(tipo, value);
    }
});
fldParcelaLiberacao.change(function() {
    let tipo = $('input[type="radio"]:checked').val();
    let value =  fldParcelaLiberacao.val();
    if (value) {
        carregaDadosBancarios(tipo, value);
    }
});
fldMovimentacao.change(function() {
    let tipo = $('input[type="radio"]:checked').val();
    let value =  fldMovimentacao.val();
    if (value) {
        carregaDadosBancarios(tipo, value);
    }
});

function carregaDadosBancarios(tipo, value){

    $.ajax({
        url: '/solicitacao/consulta-dados-conta',
        data: {
            tipo: tipo,
            value: value
        },
        async: false,
        success: function (resp) {
            $("input[name='DynamicModel[agencia_d]']").val(resp.agencia);
            $("input[name='DynamicModel[agenciadigito_d]']").val(resp.agenciadigito);
            $("input[name='DynamicModel[conta_d]']").val(resp.conta);
            $("input[name='DynamicModel[contadigito_d]']").val(resp.contadigito);
        }
    });

}

///solicitacao/desconhecer