var comboStatus = $("select[name='ProjetosSearch[status_id]']");

$(".kv-row-checkbox").change(function () {
    getIdsStatus();
});

$(".select-on-check-all").change(function () {
    getIdsStatus();
});


function getIdsStatus() {

    var id = [];

    $('.kv-row-checkbox').each(function () {
        if ($(this).is(':checked')) {
            id.push($(this).val());
        }
    });

    if (id.length === 0) {
        $("#dadosFormStatus").hide();
        $("#msgItensSelecionadosStatus").show();
    } else {
        $("#dadosFormStatus").show();
        $("#msgItensSelecionadosStatus").hide();

        $("input[name='projetosSelecionadosSatus']").val(id);

    }
}

$(document).ready(function () {
    $(document).on('submit', '.form-update-status-em-massa', function (event) {
        event.preventDefault(); // stopping submitting

        if (!comboStatus.val()) {
            erro = '"Novo status do(s) projeto(s)" não pode ficar em branco.';
            toastr.error(erro);
        } else {
            var dadosPost = $('#form-update-status-em-massa').serializeArray();
            $.ajax({
                url: '/acordo/set-status-em-massa',
                data: dadosPost,
                async: false,
                type: 'post',
            }).done(function (resp) {
                if (resp.data.success) {
                    toastr.success('Alteração realizada com sucesso!');
                    window.location.reload();
                } else {
                    toastr.error(resp.data.message);
                    $(".regrastabs").html(resp.data.regras);
                }
            }).fail(function () {
                toastr.error('Não foi possível se comunicar com servidor.')
            });
        }

    });
});

comboStatus.change(function () {
    verificaProjetoCanceladoPausado();
    verificaProjetoProrrogacao();
});

function verificaProjetoCanceladoPausado() {
    statusId = comboStatus.val();
    textJustificativa = $("textarea[name='ProjetosSearch[justificativa]']");
    dtFimPausa = $("input[name='dtfimpausa-projetossearch-dtfimpausa-disp']");
    label = $('#justificativaLabel');

    $.ajax({
        url: '/acordo/dados-status/',
        data: {
            id: statusId
        },
        async: false,
        success: function (resp) {

            //Acordo cancelado
            if (resp == 'Cancelado'){
                label.html('Justificativa para o cancelamento do(s) projeto(s)');
                $('#justificativa').show('slow');
                textJustificativa.attr('required', 'required');
            }

            //Acordo Pausado
            if (resp == 'Pausado'){
                label.html('Justificativa para a pausa do(s) projeto(s)');
                $('#justificativa').show('slow');
                textJustificativa.attr('required', 'required');
                $('#dtPausa').show('slow');
                dtFimPausa.attr('required', 'required');
            }else {
                $('#dtPausa').hide('slow');
                dtFimPausa.attr('required', false);
            }

            if (resp != 'Pausado' && resp != 'Cancelado'){
                $('#justificativa').hide('slow');
                textJustificativa.attr('required', false);
            }

        }
    });
}

function verificaProjetoProrrogacao() {
    statusId = comboStatus.val();
    dtFimProrrogacao = $("input[name='dt_prorrogacao-projetossearch-dt_prorrogacao-disp']");

    $.ajax({
        url: '/acordo/dados-status/',
        data: {
            id: statusId
        },
        async: false,
        success: function (resp) {
            if (resp == 'Em prorrogação'){
                $('#dtProrrogacao').show('slow');
                dtFimProrrogacao.attr('required', true);
            }else {
                $('#dtProrrogacao').hide('slow');
                dtFimProrrogacao.attr('required', false);
            }
        }
    });
}