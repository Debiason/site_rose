var fldFormaPagamento = $("select[name='EventoFormaPagamento[forma_pagamento_id]']");
var fldDataVencimentoInscricao = $("input[name='data_fim_inscricao']");
var fldAtualizaBoleto = $('#fld-atualiza-pagamento');
var fldJurosMulta = $('#fld-juros-multa');
var fldTipoVencimento = $('#fld-tipo-vencimento');
var fldEventoFormaPagamentoDia = $("input[id='eventoformapagamento-vencimento']");
var fldTipoPagamento = $('#fld-tipo-pagamento');
var fldEmissaoCobranca = $('#fld-emissao-cobranca');
var fldDataEmissaoCobranca = $("input[name='dta_cobranca-eventoformapagamento-dta_cobranca-disp']");
var divAtualizaJurosMulta = $('#juros-multa');
var divQuantidadeParcelas = $('#quantidade-parcelas');
var divDataCobranca = $('#data-cobranca');
var fldPrimeiraDataDiferente = $("input[id='fld-primeira-data-diferente']");
var divPrimeiraDataDiferente = $('#primeira-data-diferente');
var divAtualizaPagamento = $('#div-atualiza-pagamento');
var divDtaEspecifica = $('#primeira_diferente');

$(document).ready(function () {
    //forma de pagamento
    var formaPagamentoId = $("#forma-pagamento-id").val();

    exibirVencimento(formaPagamentoId);
    exibirPagamento(formaPagamentoId);
    exibirEmissaoCobranca(formaPagamentoId);
    exibirDescricaoBoleto(formaPagamentoId);

    atualizaPagamento();
    diaPrazo();
    primeiraDataDiferente();
    parcelaPagamento();
    dataCobranca();
})

fldFormaPagamento.click(function () {
    var formaPagamentoId = $(this).val();
    exibirVencimento(formaPagamentoId);
    exibirPagamento(formaPagamentoId);
    exibirEmissaoCobranca(formaPagamentoId);
    exibirDescricaoBoleto(formaPagamentoId);
});

function exibirVencimento(formaPagamentoId) {
    // exbide tipos de vencimento se a forma de pagamento for boleto
    if (formaPagamentoId == 1) {
        $('#vencimento').show();
    } else {
        $('#vencimento').hide();
    }
}

function exibirPagamento(formaPagamentoId) {
    // exbide tipos de pagamento se a forma de pagamento for boleto ou cartão crédito
    if (formaPagamentoId == 1 || formaPagamentoId == 2) {
        $('#pagamento').show();
        divAtualizaPagamento.show('slow');
    } else {
        $('#pagamento').hide();
        divAtualizaPagamento.hide('slow');
    }

    // pagameto cartão débito
    if (formaPagamentoId == 3) {
        $("#fld-tipo-pagamento-0").prop("checked", true);
    }
}

function exibirEmissaoCobranca(formaPagamentoId) {
    // exbide tipos de vencimento se a forma de pagamento for boleto
    if (formaPagamentoId == 1) {
        $('#emissao-cobranca').show();
    } else {
        $('#emissao-cobranca').hide();
    }
}

function exibirDescricaoBoleto(formaPagamentoId) {
    // exbide tipos de vencimento se a forma de pagamento for boleto
    if (formaPagamentoId == 1) {
        $('#descricao-boleto').show();
    } else {
        $('#descricao-boleto').hide();
    }
}


// $('#modal-principal').on('hidden.bs.modal', function () {
//     location.reload();
// })

fldAtualizaBoleto.click(function () {
    atualizaPagamento();
});

function atualizaPagamento() {
    if ($("input[id='fld-atualiza-pagamento']:checked").length > 0) {
        exideCampo(divAtualizaJurosMulta);
    } else {
        ocultaCampo(divAtualizaJurosMulta);
        fldJurosMulta.prop("checked", false);
    }
}

fldTipoVencimento.click(function () {
    diaPrazo()
});

fldEventoFormaPagamentoDia.keyup(function () {
    diaPrazo();
});

function diaPrazo() {
    let dia = $('input[id="eventoformapagamento-vencimento"]').val();
    tipoVencimento(dia);
}

function tipoVencimento(dia) {
    let tipoVencimento = $('input[name="EventoFormaPagamento[tipo_vencimento]"][type="radio"]:checked').val();

    switch (tipoVencimento) {
        case 'F' :
            diaFixoVencimento(validaDiaMes(dia));
            break;
        case 'P' :
            diaPrazoVencimento();
            break;
        case 'D' :
            dataEspecifica();
            break;
    }
}

function validaDiaMes(dia) {
    let data = new Date();
    let anoAtual =  data.getFullYear();
    let mesAtual = String(data.getMonth());
    let quantidadeDiaMesAtual = diasNoMes(anoAtual, mesAtual)

    return dia > 0 && dia <= quantidadeDiaMesAtual;
}

function diaFixoVencimento(diaMesValido) {
    $('#dia').show();
    $('#data-especifica').hide();
    divDtaEspecifica.show('slow');
    $('#pagamento').show('slow');
    $('#emissao-cobranca').show('slow');

    if (diaMesValido) {
        $("#dia label").html('<label class="text-dark"> Selecione o dia do vencimento ' +
            '<span class="text-danger">*</span></label>');
        $("#data-vencimento").html('<span class="text-danger"></span>');
    } else {
        $("#data-vencimento").html('<span class="text-danger"> Dia inválido</span>');
        fldEventoFormaPagamentoDia.val('');
    }
}

function diaPrazoVencimento() {
    $("#dia label").html('<label class="text-dark"> Selecione o número de dias de prazo para vencimento ' +
        '<span class="text-danger">*</span></label>');

    $('#dia').show();
    $('#data-especifica').hide();
    $("#data-vencimento").html('');
    $('#pagamento').show('slow');
    $('#emissao-cobranca').show('slow');
    divDtaEspecifica.show('slow');
}

function dataEspecifica() {
    $("#dia label").html('<label class="text-dark"> Selecione a data ' +
        '<span class="text-danger">*</span></label>');

    $('#data-especifica').show();
    $('#dia').hide();
   // $('#eventoformapagamento-vencimento').val('');
    $("#data-vencimento").html('');
    divDtaEspecifica.hide('slow');
    $('#fld-primeira-data-diferente').prop('checked', false);
    $('#pagamento').hide();
    $('#emissao-cobranca').hide();
}

function diasNoMes(mes, ano) {
    var data = new Date(ano, mes, 0);
    return data.getDate();
}

fldTipoPagamento.click(function () {
    parcelaPagamento();
});

function parcelaPagamento() {
    let tipoPagamento = ($('input[name="EventoFormaPagamento[tipo_pagamento]"][type="radio"]:checked').val());
    tipoParcelaPagamento(tipoPagamento)
}

function tipoParcelaPagamento(tipoPagamento) {
    if (tipoPagamento === 'A' || !tipoPagamento) {
        pagamentoAvista();
    }

    if (tipoPagamento === 'PF') {
        pagamentoParceladoQuantidadeFixa();
    }

    if (tipoPagamento === 'PL') {
        pagamentoParceladoQuantidadeFlexivel();
    }
}

function pagamentoAvista() {
    $('#fld-maximo-parcelas').val('');
    ocultaCampo(divQuantidadeParcelas);
}

function pagamentoParceladoQuantidadeFixa() {
    exideCampo(divQuantidadeParcelas);
    $("#quantidade-parcelas label").html('<label class="text-dark"> Selecione a quantidade de parcelas ' +
        '<span class="text-danger">*</span></label>');

}

function pagamentoParceladoQuantidadeFlexivel() {
    exideCampo(divQuantidadeParcelas);
    $("#quantidade-parcelas label").html('<label class="text-dark"> Selecione a quantidade máxima de parcelas ' +
        '<span class="text-danger">*</span></label>');
}

fldPrimeiraDataDiferente.click(function () {
    primeiraDataDiferente();
});

function primeiraDataDiferente() {
    if (primeiraDataDiferente) {
        exideCampo(divPrimeiraDataDiferente);
    } else {
        ocultaCampo(divPrimeiraDataDiferente);
    }
}

fldEmissaoCobranca.click(function () {
    dataCobranca();
});

function dataCobranca() {
    let emissaoCobranca = ($("input[id='fld-emissao-cobranca']:checked").length > 0);
    if (emissaoCobranca) {
        exideCampo(divDataCobranca);
    } else {
        $('#eventoformapagamento-dta_cobranca-disp').val('');
        ocultaCampo(divDataCobranca);
    }
}

function exideCampo(idCampo) {
    idCampo.show(100);
}

function ocultaCampo(idCampo) {
    idCampo.hide(100);
}

function requiredCampo(idCampo) {
    idCampo.prop('required',true);
}

function unrequiredCampo(idCampo) {
    idCampo.removeAttr('required');
}


