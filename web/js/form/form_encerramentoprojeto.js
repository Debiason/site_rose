var dtFim = $("input[name='ProjetosSearch[dtfim]'], input[name='projetossearch-dtfim-disp']");

$(".kv-row-checkbox").change(function () {
    getIds();
});

$(".select-on-check-all").change(function () {
    getIds();
});


function getIds() {

    var id = [];

    $('.kv-row-checkbox').each(function () {
        if ($(this).is(':checked')) {
            id.push($(this).val());
        }
    });

    if (id.length === 0) {
        $("#dadosForm").hide();
        $("#msgItensSelecionados").show();
    } else {
        $("#dadosForm").show();
        $("#msgItensSelecionados").hide();

        $("input[name='projetosSelecionados']").val(id);
    }
}

//Verifica se existem acordos sendo prorrogados
dtFim.change(function () {
    $.ajax({
        url: '/acordo/verifica-prorrogacao-projetos/',
        data: {
            ids: $("input[name='projetosSelecionados']").val(),
            dtFim: dtFim.val()
        },
        async: false,
        success: function (resp) {

            //Caso tenha acordos sendo prorrogados exibe a justificativa
            if (resp != ''){
                $('#motivoProrrogacao').show('slow');
                $('#motivoProrrogacaoLabel').html('Motivo da prorrogação do(s) projeto(s): '+resp);
                $('#projetossearch-motivoprorrogacao').attr('required', 'required');
            } else {
                $('#motivoProrrogacao').hide('slow');
                $('#projetossearch-motivoprorrogacao').attr('required', false);
            }

        }
    });
});

$(document).ready(function () {
    $(document).on('submit', '.form-update-encarramento-em-massa', function (event) {
        event.preventDefault(); // stopping submitting

        var dtFim = $("#projetossearch-dtfim-disp").val();

        if (!dtFim) {
            erro = '"Fim do(s) projeto(s)" não pode ficar em branco.';
            toastr.error(erro);
        } else {
            var dadosPost = $('#form-update-encarramento-em-massa').serializeArray();
            $.ajax({
                url: '/acordo/set-data-encerramento-em-massa',
                data: dadosPost,
                async: false,
                type: 'post',
            }).done(function (resp) {
                if (resp.data.success) {
                    toastr.success('Aletração relaizada com sucesso!');
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