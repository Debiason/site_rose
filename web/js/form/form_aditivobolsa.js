var fldSituacao = $('#fld-situacao');
var fldFinalidade = $('.field-aditivobolsa-finalidade');
var bolsistaIdField = $("#fld-bolsista_id");

fldFinalidade.hide();

var situacaoOld = fldSituacao.val();
fldSituacao.change(function () {
    var situacao = $(this).val();
    console.log(situacao);
    var devolucaoField = $('#devolucao-solicitacaobolsista');
    var motivoDevolucao = $('#contratacaobolsista-motivo_devolucao');

    if (situacao == "288" || (situacaoOld == 289 && situacao == 286)) {
        devolucaoField.show("slow");
        motivoDevolucao.attr('required', 'required');
    } else {
        devolucaoField.hide("slow");
        motivoDevolucao.attr('required', false);
    }
});

$("#fld-acordo").on('change', function () {
    setTimeout(function () {
        const valor = bolsistaIdField.val();
        if (valor) {
            bolsistaIdField.trigger('change');
        }
    }, 800);
})

$(".btnImplementarBolsista").click(function () {
    var btn = $(this);
    btn.prop('disabled', true).html('Aguarde ...');
    setTimeout(function () {
        btn.prop('disabled', false).html('Implementar bolsista');
    }, 5000);
});

function handleBolsistaChange() {
    var bolsistaId = $(this).val();

    $.ajax({
        url: '/aditivo-bolsa/get-dados-contratacao/',
        data: {
            bolsista_id: bolsistaId
        },
        async: false,
        success: function (data) {
            if (data) {
                $("#div-plano-trabalho").show('slow');
                $("#aditivobolsa-cronograma_trabalho").val(data.cronograma);
                $("#aditivobolsa-produtos_finais").val(data.produtos);
                $("#aditivobolsa-plano_trabalho").val(data.plano);
            } else {
                $("#aditivobolsa-cronograma_trabalho, #aditivobolsa-produtos_finais, #aditivobolsa-plano_trabalho").val('');
            }
        }
    });
}

bolsistaIdField.on('change', handleBolsistaChange);

$("#fld-solicitacao").change(function () {
    $("#div-usuario_bolsista_id").show('slow');
});

$('.multiple-input-list__item:nth-child(2) .multiple-input-list__btn, .multiple-input-list__item:nth-child(3) .multiple-input-list__btn').hide();

$('form').submit(function () {
    $(this).find('select[disabled]').prop('disabled', false);
});

$('#bolsista_projeto').change(function () {
    var isChecked = $(this).is(':checked');
    $('#div-projeto-debito').toggle(isChecked);

    if (!isChecked) {
        $('#fld-projeto_debito').val('').trigger('change');
    }
});

if ($("#fld-projeto_debito").val() != '') {
    $('#bolsista_projeto').prop('checked', true);
}

function toggleCampos() {
    var valor = $("#aditivobolsa-valor").val();
    var dtInicio = $("#aditivobolsa-dtinicio").val();
    var vigencia = $("#aditivobolsa-vigencia").val();
    var bolsistaProjeto = $("#bolsista_projeto").is(':checked');

    if (valor == 0) {
        $("#aditivobolsa-valor").val('');
    }

    if ((valor && valor != 0) || (dtInicio || vigencia || bolsistaProjeto)) {
        $("#div-plano-trabalho, #div-anexo").show('slow');
        $("#aditivobolsa-cronograma_trabalho, #aditivobolsa-produtos_finais, #aditivobolsa-plano_trabalho").attr('required', 'required');
    } else {
        $("#div-plano-trabalho, #div-anexo").hide('slow');
        $("#aditivobolsa-cronograma_trabalho, #aditivobolsa-produtos_finais, #aditivobolsa-plano_trabalho").attr('required', false);
        $("#aditivobolsa-cronograma_trabalho, #aditivobolsa-produtos_finais, #aditivobolsa-plano_trabalho").val('');
    }
}

$("#aditivobolsa-valor, #aditivobolsa-vigencia, #aditivobolsa-dtinicio, #bolsista_projeto").on('change', toggleCampos);

$(document).ready(function () {
    toggleCampos();
});