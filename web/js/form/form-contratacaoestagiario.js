var fldInstituicao = $('#fld-instituicao_id');
var fldAcordo = $('#fld-acordo');
var fldSituacao = $('#fld-situacao');
var fldLocalDesenvolvido = $('#fld-localdesenvolvido');
var fldFinalidade = $('.field-contratacaoestagiario-finalidade');
var fldDataPagamento = $('.field-contratacaoestagiario-dtpagamento');

fldFinalidade.hide();
fldDataPagamento.hide();

$(document).ready(function () {
    var acordoId = fldAcordo.val();
    ajaxInstituicao(acordoId);
    configuraCamposValores();
    verificaDocumentoCriado();
    verificaInstituicao();
});

$(function () {
    $.fn.kvDatepicker.defaults.language = 'pt-BR';
    $.fn.kvDatepicker.defaults.format = 'dd/mm/yyyy';
})

var situacaoOld = fldSituacao.val();
fldSituacao.change(function () {
    var situacao = $(this).val();

    if (situacao === "306") {
        $('#devolucao-solicitacaobolsista').show("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', 'required');
    } else {
        $('#devolucao-solicitacaobolsista').hide("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', false);
    }
});

fldAcordo.change(function () {
    ajaxInstituicao($(this).val());
});

$("#fld-orientador").change(function () {
    $.ajax({
        url: '/pessoa/getemail/',
        data: {
            pessoaId: $(this).val()
        },
        async: false,
        success: function (resp) {
            if (!resp) {
                $("#div-orientador-email").show('slow');
                $("#contratacaoestagiario-orientador_email").attr('required', 'required');
            } else {
                $("#div-orientador-email").hide('slow');
                $("#contratacaoestagiario-orientador_email").attr('required', false);
            }
        }
    });
});

$(".field-contratacaoestagiario-tipobolsa_id").hide();

if ($("#contratacaoestagiario-obrigatorio").is(':checked')) {
    $("#div-remunerado-checkbox").show();
} else {
    $("#div-remunerado-checkbox").hide();
}

$("#contratacaoestagiario-obrigatorio").change(function () {
    configuraCamposValores();
});

$("#contratacaoestagiario-remunerado").change(function () {
    if ($(this).is(':checked')) {
        $('.div-remunerado').show('slow');
    } else {
        $('.div-remunerado').hide('slow');
    }
});

$("#contratacaoestagiario-possui_auxiliotransporte").change(function () {
    if ($(this).is(':checked')) {
        $('.div-auxilio-transporte').show('slow');
    } else {
        $('.div-auxilio-transporte').hide('slow');
    }
});


$("#contratacaoestagiario-vigencia").on('change', function () {
    calculaDtFim();
});

$("#contratacaoestagiario-valorbolsa").on('change', function () {
    calculaValorTotal();
});
$("#contratacaoestagiario-auxiliotransporte").on('change', function () {
    calculaValorTotal();
});

$("#contratacaoestagiario-email_responsaveis-1-tipo_assinatura").val('Instituição de Ensino').trigger('change');

$('form').submit(function () {
    $(this).find('select[disabled]').prop('disabled', false);
});

$(".btnImplementarBolsista").on('click', function (e) {
    e.preventDefault();
    swal({
        title: "Atenção",
        html: "A vigência do estagiário será cadastrada da seguinte forma: <br><br> " +
            "<strong>Início: " + $("#contratacaoestagiario-dtinicio-disp").val() + "</strong><br>" +
            "<strong>Fim: " + $("#contratacaoestagiario-dtfim-disp").val() + "</strong><br>",
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
                "&vigencia=" + $("#contratacaoestagiario-vigencia").val() +
                "&dtinicio=" + $("#contratacaoestagiario-dtinicio").val() +
                "&dtfim=" + $("#contratacaoestagiario-dtfim").val();
        }
    });
});

function calculaDtFim() {

    var dtFimInput = $("#contratacaoestagiario-dtfim"),
        dtFimDisp = $("#contratacaoestagiario-dtfim-disp");

    var mesesVigencia = $("#contratacaoestagiario-vigencia").val();

    var dtinicio = moment($("#contratacaoestagiario-dtinicio").val());

    var novaData = dtinicio.add(mesesVigencia, 'months').subtract(1, 'days');

    var datafimInput = novaData.year() + "-" + ("0" + (novaData.month() + 1)).slice(-2) + "-" + novaData.date();
    dtFimInput.val(datafimInput);

    var datafimDisp = novaData.date() + "/" + ("0" + (novaData.month() + 1)).slice(-2) + "/" + novaData.year();
    dtFimDisp.kvDatepicker('update', datafimDisp);
}


function ajaxInstituicao(acordoId) {
    $.ajax({
        url: '/pessoa-juridica-nacional/get-executora/',
        data: {
            id: acordoId
        },
        async: false,
        success: function (resp) {
            var isEmbrapa = resp.embrapa ?? false;

            if (isEmbrapa == true) {
                $(".dados-embrapa").show();
            } else {
                $(".dados-embrapa").hide();
            }
        }
    });
}

function calculaValorTotal() {
    var valorBolsa = $("#contratacaoestagiario-valorbolsa").val();
    var valorAuxilio = $("#contratacaoestagiario-auxiliotransporte").val();

    var valorTotal = (parseFloat(valorBolsa) ?? 0) + (parseFloat(valorAuxilio) ?? 0);

    $("#contratacaoestagiario-valor_total-disp").val(valorTotal).trigger('change');
}

function configuraCamposValores() {
    if ($("#contratacaoestagiario-obrigatorio").is(':checked')) {
        $("#div-remunerado-checkbox").show('slow');
        $("#div-auxilio-transporte-checkbox").show('slow');
        $("#div-anexo").show('slow');
        if (!$("#contratacaoestagiario-remunerado").is(':checked')) {
            $('.div-remunerado').hide('slow');
        }
        if (!$("#contratacaoestagiario-possui_auxiliotransporte").is(':checked')) {
            $('.div-auxilio-transporte').hide('slow');
        }
    } else {
        $("#div-remunerado-checkbox").hide('slow');
        $("#div-auxilio-transporte-checkbox").hide('slow');
        $('.div-remunerado').show('slow');
        $('.div-auxilio-transporte').show('slow');
        $("#div-anexo").hide('slow');
    }
}

function verificaDocumentoCriado() {
    var situacaoId = $('#fld-situacao').val();

    $.ajax({
        url: '/contratacao-estagiario/verifica-documento-criado',
        type: 'POST',
        data: {
            id: $('#pedido_id').val()
        },
        success: function (data) {
            if (data == true && situacaoId == 302) {
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

function verificaInstituicao() {
    const instituicaoVal = $("#fld-instituicao").val();
    const instituicaoUfv = "9242";

    if (instituicaoVal == instituicaoUfv) {
        $("#label-anexo-vinculo").find("span").remove();
    }

    $("#fld-instituicao").on('change', function () {
        if ($(this).val() == instituicaoUfv) {
            $("#label-anexo-vinculo").find("span").remove();
        }
    });
}