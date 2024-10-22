var fldSituacao = $("#prestacaoconta-situacao_id");
var fldTipo = $("#prestacaoconta-tipo_id");
var flagDocumento = $("#prestacaoconta-documento_assinatura_externa_flag");
var flagPendencia = $("#prestacaoconta-pendencia");
var divDocumento = $("#div-dadosDocumentos");
var divPedido = $("#div-associarPedido");
var salvarNovoBtn = $('#salvar-novo-btn');
var idCentroCusto = $('#fld-centrocusto');
var salvarNovoCheckbox = $('#salvar-novo-checkbox');
var salvarBtn = $('#salvar-btn');

fldSituacao.change(function () {
    verificaSituacaoArquivado(fldSituacao.val());
});

fldTipo.change(function () {
    verificaSubtipo(fldTipo.val());
});

function verificaSituacaoArquivado(situacao_id) {
    let divArquivado = $(".dados-pc-arquivado");
    let fldUsuarioArquivo = $("#fld-usuario-arquivo");
    let fldUsuarioArquivoProtocolo = $("#prestacaoconta-numero_protocolo");
    if (situacao_id == 237) {
        divArquivado.show('slow');
        fldUsuarioArquivo.attr('required', true);
        fldUsuarioArquivoProtocolo.attr('required', true);
    } else {
        divArquivado.hide('slow');
        fldUsuarioArquivo.attr('required', false);
        fldUsuarioArquivoProtocolo.attr('required', false);
    }
}

function verificaSubtipo(tipo_id) {
    let divSubtipo = $(".subtipo-prestacao");
    let divDatasParcial = $(".datas-pc-parcial");
    if (tipo_id == 213) {
        divSubtipo.show('slow');
        divDatasParcial.show('slow');
    } else {
        divSubtipo.hide('slow');
        divDatasParcial.hide('slow');
    }
}

//checkBox para pagamento com cartão de crédito
$(flagDocumento).on('click', function () {
    if ($(this).is(':checked')) {
        divDocumento.show("slow");
    } else {
        divDocumento.hide("slow");
    }
});

$(flagPendencia).on('click', function () {
    if ($(this).is(':checked')) {
        divPedido.show("slow");
    } else {
        divPedido.hide("slow");
    }
});

$(document).ready(function () {
    $('#fld-centrocusto').change(function () {
        var centroCustoId = $(this).val();
        $('#dtvigenciaacordo').hide();

        $.ajax({
            type: 'GET',
            url: '/centro-custo/get-vigencia',
            data: {id: centroCustoId},
            success: function (dtVigencia) {
                $('#dtvigenciacentrocusto').html('Vigência do centro de custo selecionado: <strong>' + dtVigencia + '</strong>');
            },
        });

        setTimeout(function(){
            $('#fld-acordo').change();
        }, 500);
    });

    $('#fld-acordo').change(function () {
        var acordoId = $(this).val();
        $('#dtvigenciaacordo').show();

        $.ajax({
            type: 'GET',
            url: '/acordo/get-vigencia',
            data: {id: acordoId},
            success: function (dtVigencia) {
                $('#dtvigenciaacordo').html('Vigência do Projeto selecionado: <strong>' + dtVigencia + '</strong>');
            },
        });

        $.ajax({
            type: 'GET',
            url: '/acordo/get-dados-prestacao-conta',
            data: {id: acordoId},
            success: function (dados) {
                $('#numeroSei').html('Número SEI: <strong>' + dados.numeroSei + '</strong>');
                $('#dadosBancarios').html('Dados bancários: <strong>' + dados.dadosBancarios + '</strong>');
                $('#executora').html('Executora: <strong>' + dados.executora + '</strong>');
            },
        });
    });
    $('#fld-centrocusto').change();
    $('#fld-acordo').change();
});

salvarNovoBtn.on('click', () => {
    let centroCusto = idCentroCusto.val();

    if (centroCusto !== '') {
        salvarNovoCheckbox.prop('checked', true);
        salvarBtn.trigger('click');
    } else {
        salvarBtn.trigger('click');
    }
});