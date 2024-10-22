function toggleButtons() {
    var selectedCheckboxes = $('.kv-row-checkbox:checked');
    var aprovarBolsista = $('#aprovarBolsistas');
    var aprovarBolsistasFaseFinal = $('#aprovarBolsistasFaseFinal');
    var reprovarBolsista = $('#reprovarBolsista');
    var desclassificarBolsista = $('#desclassificarBolsista');
    var remarcarEntrevista = $('#remarcarEntrevista');
    var cadastroReserva = $("#cadastroReserva");
    var pedido_id = $("#pedido_id").val();

    if (selectedCheckboxes.length > 0) {

        var ids = [];
        var situacao = [];

        selectedCheckboxes.each(function () {
            var checkbox = $(this);
            var checkboxValue = checkbox.val();
            var dataKey = checkbox.closest('tr').data('key');
            var spanId = $('tr[data-key="' + dataKey + '"] .m-badge').attr('id');

            obterSituacao(spanId);

            ids.push(checkboxValue);
            situacao.push(spanId);
        });

        var valorComparacao = situacao[0];

        for (var i = 1; i < situacao.length; i++) {

            var response = situacao[i];

            if (response != valorComparacao) {
                aprovarBolsista.hide();
                aprovarBolsistasFaseFinal.hide();
                cadastroReserva.hide();
            }

            if (response == 273) {
                reprovarBolsista.hide();
            }
        }

        var idsString = ids.join(',');

        aprovarBolsista.attr('value', "/bolsista-inscricao/enviar-email-selecao?id=" + pedido_id + "&option=aprovar&idsBolsista=" + idsString);
        aprovarBolsista.removeClass('disabled');

        aprovarBolsistasFaseFinal.attr('value', "/bolsista-inscricao/enviar-email-fase-final?id=" + pedido_id + "&idsBolsista=" + idsString);
        aprovarBolsistasFaseFinal.removeClass('disabled');

        reprovarBolsista.attr('value', "/bolsista-inscricao/enviar-email-selecao?id=" + pedido_id + "&option=reprovar&idsBolsista=" + idsString);
        reprovarBolsista.removeClass('disabled');

        desclassificarBolsista.attr('value', "/bolsista-inscricao/enviar-email-selecao?id=" + pedido_id + "&option=desclassificar&idsBolsista=" + idsString);
        desclassificarBolsista.removeClass('disabled');

        remarcarEntrevista.attr('value', "/bolsista-inscricao/enviar-email-selecao?id=" + pedido_id + "&option=remarcar&idsBolsista=" + idsString);
        remarcarEntrevista.removeClass('disabled');

    } else {
        aprovarBolsista.addClass('disabled');
        reprovarBolsista.addClass('disabled');
        desclassificarBolsista.addClass('disabled');
        remarcarEntrevista.addClass('disabled');

        aprovarBolsista.show();
        aprovarBolsistasFaseFinal.hide();
        remarcarEntrevista.hide();
        desclassificarBolsista.hide();
    }
}

function obterSituacao(situacaoId = null) {

    var aprovarBolsista = $('#aprovarBolsistas');
    var reprovarBolsista = $('#reprovarBolsista');
    var desclassificarBolsista = $('#desclassificarBolsista');
    var remarcarEntrevista = $('#remarcarEntrevista');
    var aprovarBolsistasFaseFinal = $('#aprovarBolsistasFaseFinal');
    var pedido_id = $("#pedido_id").val();

    if (situacaoId !== null) {

        reprovarBolsista.show();

        if (situacaoId == 271) { // entrevista c/ coord.
            aprovarBolsistasFaseFinal.show();
            desclassificarBolsista.show();
            $("#cadastroReserva").show();
            remarcarEntrevista.show();
            aprovarBolsista.hide();
        } else if (situacaoId == 270) { // ins. realizada
            aprovarBolsista.show();
        } else if (situacaoId == 272) { // selecionado
            aprovarBolsista.hide();
        } else if (situacaoId == 273) { // reprovado
            reprovarBolsista.hide();
            aprovarBolsista.hide();
            $("#cadastroReserva").show();
        } else if (situacaoId == 309) {
            aprovarBolsista.hide();
            reprovarBolsista.hide();
        }

    } else {
        $.ajax({
            url: '/bolsista-inscricao/get-situacao/',
            data: {
                idPedido: pedido_id,
            },
            success: function (resp) {
                resp.forEach(function(value) {
                    $('.kv-row-checkbox[value="' + value + '"]').prop('disabled', true);
                    $('.kv-row-checkbox[value="' + value + '"]').hide();
                });
            }
        });
    }
}

var ajaxRequest = null;
function configPage() {
    var cadastrarReserva = $("#cadastroReserva");
    var pedido_id = $("#pedido_id").val();

    $(".select-on-check-all").hide();

    toggleButtons();
    obterSituacao();

    $('.kv-row-checkbox').on('change', function () {
        cadastrarReserva.hide();
        toggleButtons();
    });

    cadastrarReserva.on('click', function (e) {

        e.preventDefault();
        cadastrarReserva.addClass('disabled');

        var selectedCheckboxes = $('.kv-row-checkbox:checked');

        if (selectedCheckboxes.length > 0) {
            var ids = [];
            selectedCheckboxes.each(function () {
                ids.push($(this).val());
            });
            var idsString = ids.join(',');
        }

        if (ajaxRequest !== null) {
            ajaxRequest.abort();
        }

        ajaxRequest = $.ajax({
            url: '/bolsista-inscricao/reservar-cadastro/',
            data: {
                id: pedido_id,
                idsBolsista: idsString
            },
            success: function (resp) {
                if (resp === true) {
                    toastr.success('Cadastro(s) realizado(s) com sucesso!');
                    setTimeout(function (){
                        $('a[href="#bolsista-inscricao"]').click();
                    }, 500);
                }
            },
            complete: function () {
                cadastrarReserva.removeClass('disabled');
            }
        });
    });
}

function concluirAvaliacao() {

    var pedido_id = $("#pedido_id").val();

    $("#btnConcluirAvaliacao").on('click', function () {
        swal({
            title: 'Confirmação',
            html: 'Informamos que a avaliação dos candidatos será divulgada em nosso site, conforme os dados informados, ' +
                'e os candidatos participantes da seleção terão acesso à mesma. Assim, favor confirmar se as informações estão corretas',
            type: "info",
            confirmButtonColor: "#34bfa3",
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Corrigir',
        }).then((result) => {
            if (result.value == true) {
                $('#btnConcluirAvaliacao').addClass('disabled');
                $.ajax({
                    url: '/bolsista-inscricao/concluir-avaliacao/',
                    data: {
                        id: pedido_id,
                    },
                    success: function (resp) {
                        if (resp === true) {
                            toastr.success('A avaliação foi concluída com sucesso!');
                            setTimeout(function (){
                                $('a[href="#resumo"]').click();
                            }, 500);
                        } else {
                            toastr.error('Não foi possível concluir a avaliação!');
                        }
                    },
                    complete: function () {
                        $('#btnConcluirAvaliacao').removeClass('disabled');
                    },
                });
            }
        });
    });
}

$(document).ready(function () {
    configPage();
    concluirAvaliacao();
});

$(document).on('pjax:end', function () {
    configPage();
});