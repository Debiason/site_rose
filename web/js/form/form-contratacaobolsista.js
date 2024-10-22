var fldInstituicao = $('#fld-instituicao');
var fldSituacao = $('#fld-situacao');
var fldLocalDesenvolvido = $('#fld-localdesenvolvido');
var fldFinalidade = $('.field-contratacaobolsista-finalidade');
var fldTipoBolsa = $('#contratacaobolsista-tipobolsa_id');
var fldPedidoId = $('#pedido_id');

fldFinalidade.hide();

$(function(){
    $.fn.kvDatepicker.defaults.language = 'pt-BR';
    $.fn.kvDatepicker.defaults.format = 'dd/mm/yyyy';
})

var situacaoOld = fldSituacao.val();
fldSituacao.change(function () {
    var situacao = $(this).val();

    if (situacao === "278") {
        $('#devolucao-solicitacaobolsista').show("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', 'required');
    } else {
        $('#devolucao-solicitacaobolsista').hide("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', false);
    }

    if (situacaoOld == 281 && situacao == 276) {
        $('#devolucao-solicitacaobolsista').show("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', 'required');
    }
});

fldTipoBolsa.change(function () {
    if (!fldPedidoId.val()) {
        getInfoIniciacaoCientifica($(this).val());
    }
    if ($(this).val() == '7') { // Iniciação Científica
        $("#div-superior-responsavel").hide();
        $("#div-instituicao-iniciacao").show('slow');
        $("#div-dados-iniciacao").show('slow');
    } else {
        $("#div-superior-responsavel").show();
        $("#div-instituicao-iniciacao").hide('slow');
        $("#div-dados-iniciacao").hide('slow');
    }
});

$("#fld-acordo").change(function () {
    setTimeout(function () {
        if ($("#fld-solicitacao").length > 0 && $("#fld-solicitacao").find('option').length > 1) {
            $("#div-solicitacao_id").show('slow');
        } else {
            $("#fld-solicitacao").val('');
            $("#div-solicitacao_id").hide();
        }
    }, 500);

    getFinanciadora($(this).val());
});

$("#fld-solicitacao").change(function () {
    $("#div-usuario_bolsista_id").show('slow');
});

if ($("#fld-solicitacao").length > 0) {
    $("#declaracao-vinculo").hide();
}

$('.multiple-input-list__item:nth-child(2) .multiple-input-list__btn').css('display', 'none');
$('.multiple-input-list__item:nth-child(3) .multiple-input-list__btn').css('display', 'none');

$('form').submit(function() {
    $(this).find('select[disabled]').prop('disabled', false);
});

$(".btnImplementarBolsista").on('click', function (e) {
    e.preventDefault();
    swal({
        title: "Atenção",
        html: "A vigência do bolsista será cadastrada da seguinte forma: <br><br> " +
            "<strong>Início: " + $("#contratacaobolsista-dtinicio-disp").val() + "</strong><br>" +
            "<strong>Fim: " + $("#contratacaobolsista-dtfim-disp").val() + "</strong><br>",
        type: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#34bfa3",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
        focusConfirm: false,
        focusCancel: false,
        showCloseButton: true,
    }).then((result) => {
        if (result.value === true) {
            window.location.href = $(".btnImplementarBolsista").attr("href") +
                "&vigencia=" + $("#contratacaobolsista-vigencia").val() +
                "&dtinicio=" + $("#contratacaobolsista-dtinicio").val() +
                "&dtfim=" + $("#contratacaobolsista-dtfim").val();
        }
    });
});

function calculaDtFim() {

    var dtFimInput = $("#contratacaobolsista-dtfim"),
        dtFimDisp = $("#contratacaobolsista-dtfim-disp");

    var mesesVigencia = $("#contratacaobolsista-vigencia").val();

    var dtinicio = moment($("#contratacaobolsista-dtinicio").val());

    var novaData = dtinicio.add(mesesVigencia, 'months').subtract(1, 'days');

    var datafimInput = novaData.year() + "-" + ("0" + (novaData.month() + 1)).slice(-2) + "-" + novaData.date();
    dtFimInput.val(datafimInput);

    var datafimDisp = novaData.date() + "/" + ("0" + (novaData.month() + 1)).slice(-2) + "/" + novaData.year();
    dtFimDisp.kvDatepicker('update', datafimDisp);
}

function getFinanciadora(acordo_id) {
    if (acordo_id) {
        $.ajax({
            url: '/contratacao-bolsista/get-financiadora-fapemig',
            type: 'POST',
            data: {
                acordo_id: acordo_id
            },
            success: function (data) {
                if (data == true) {
                    $("#financiadoraFapemig").val(1);
                    $("#div-dados-contrato").hide();
                    $("#responsaveis-assinatura-div").hide();
                    $("#declaracao-vinculo").hide();
                    $("#downloadContratoBtn").hide();
                    $("#btnImplementarFapemig").show();
                    $("#autorizacao-fapemig").show();
                } else {
                    $("#financiadoraFapemig").val(0);
                    $("#div-dados-contrato").show();
                    $("#declaracao-vinculo").show();
                    $("#responsaveis-assinatura-div").show();
                    $("#downloadContratoBtn").show();
                    $("#autorizacao-fapemig").hide();
                }
            }
        });
    }
}

function usuarioBolsistaIsServidor(usuarioBolsista) {
    if (usuarioBolsista.val() != '') {
        $.ajax({
            url: '/contratacao-bolsista/usuario-bolsista-is-servidor',
            type: 'POST',
            data: {
                usuario_bolsista_id: usuarioBolsista.val()
            },
            success: function (data) {
                if (data === false) {
                    $("#declaracao-vinculo").hide();
                }
            }
        });
    }
}

function verificaDocumentoCriado() {
    var situacaoId = $('#fld-situacao').val();

    $.ajax({
        url: '/contratacao-bolsista/verifica-documento-criado',
        type: 'POST',
        data: {
            id: $('#pedido_id').val()
        },
        success: function (data) {
            if (data == true && situacaoId == 279) {
                $("button[type='submit']").addClass("disabled");
                $("button[type='submit']").on('click', function (e) {
                    e.preventDefault();
                    swal({
                        title: "Atenção",
                        text: "Já existe um documento gerado para este pedido.",
                        type: "warning",
                        confirmButtonColor: "#34bfa3",
                        confirmButtonText: "OK",
                        reverseButtons: true,
                        focusConfirm: false,
                        focusCancel: false,
                        showCloseButton: true,
                    });
                });
            } else {
                $("button[type='submit']").removeClass("disabled");
            }
        }
    });
}

function getInfoIniciacaoCientifica(tipoBolsa) {
    if (tipoBolsa == 7) {
        $.ajax({
            url: '/contratacao-bolsista/get-info-iniciacao-cientifica',
            type: 'POST',
            data: {
                projeto_id: $('#fld-acordo').val()
            },
            success: function (data) {
                if (data) {
                    $("#contratacaobolsista-nome_representante").val(data.dados_instituicao.nome);
                    $("#contratacaobolsista-cpf_representante").val(data.dados_instituicao.cpf);
                    $("#contratacaobolsista-email_representante").val(data.dados_instituicao.email);

                    $("#contratacaobolsista-programa_iniciacao").val(data.dados_contrato.programa);
                    $("#contratacaobolsista-processo_sei").val(data.dados_contrato.numero_processo);
                }
            }
        });
    } else {
        $("#contratacaobolsista-nome_representante").val('');
        $("#contratacaobolsista-cpf_representante").val('');
        $("#contratacaobolsista-email_representante").val('');
        $("#contratacaobolsista-programa_iniciacao").val('');
        $("#contratacaobolsista-processo_sei").val('');
    }
}

$("#contratacaobolsista-vigencia").on('change', function () {
    calculaDtFim();
})
$("#contratacaobolsista-dtinicio").on('change', function () {
    calculaDtFim();
})

$(document).ready(function () {
    getFinanciadora($("#fld-acordo").val());

    var usuarioBolsista = $("#fld-usuario_bolsista");
    if (usuarioBolsista.length > 0) {
        usuarioBolsistaIsServidor(usuarioBolsista);
    }

    verificaDocumentoCriado();

    if (fldTipoBolsa.val() == '7') { // Iniciação Científica
        $("#div-superior-responsavel").hide();
        $("#div-instituicao-iniciacao").show('slow');
        $("#div-dados-iniciacao").show('slow');
    }  else {
        $("#div-superior-responsavel").show();
        $("#div-instituicao-iniciacao").hide('slow');
        $("#div-dados-iniciacao").hide('slow');
    }
});