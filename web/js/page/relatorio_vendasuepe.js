function actionGerarLancamento() {
    var selectedCheckboxes = $('.kv-row-checkbox:checked');
    var gerarLancamentoButton = $('#gerarLancamento');

    var ids = [];
    selectedCheckboxes.each(function () {
        var row = $(this).closest('tr');
        var idNota = row.find('td[data-col-seq="2"]').text()
        ids.push(idNota);
    });

    gerarLancamentoButton.prop('disabled', true);

    $.ajax({
        url: '/movimentacao/gerar-lancamento-venda-uepe',
        type: 'POST',
        data: {
            ids: ids,
            datainicio: $("#relatorioform-dtinicio").val(),
            datafim: $("#relatorioform-dtfim").val(),
        },
        success: function (response) {
            if (response.success === true) {
                gerarLancamentoButton.prop('disabled', false);
                toastr.success('Movimentações financeiras geradas com sucesso.');
                gerarLancamentoButton.hide();
            } else {
                toastr.error(response.msg);
            }

            verificaNotaLancada();
        },
        complete: function () {
            gerarLancamentoButton.prop('disabled', false);
        },
        error: function () {
            gerarLancamentoButton.prop('disabled', false);
        },
    });
}

function verificaNotaLancada() {
    $.ajax({
        url: '/movimentacao/verifica-nota-lancada-uepe',
        type: 'GET',
        data: {
            datainicio: $("#relatorioform-dtinicio").val(),
            datafim: $("#relatorioform-dtfim").val(),
        },
        success: function (response) {
            var notasParaFiltrar = Object.values(response).map(function (item) {
                return parseInt(item, 10);
            });

            $('tr').each(function () {
                var colSeq2 = $(this).find('td[data-col-seq="2"]').text().trim();
                var numeroNota = parseInt(colSeq2, 10);

                if (notasParaFiltrar.includes(numeroNota)) {
                    $(this).find('.kv-row-select input').prop('disabled', true);
                    $(this).find('.kv-row-select input').prop('checked', false);
                    if ($(this).hasClass('table-danger')) {
                        $(this).removeClass('table-danger');
                    }
                }
            });
        },
    });
}

function toggleCheckboxMesmaNota(checkbox) {

    var isChecked = checkbox.is(':checked');
    var colSeq2 = checkbox.closest('tr').find('td[data-col-seq="2"]').text().trim();
    var numeroNota = parseInt(colSeq2, 10);

    $('tr').each(function () {
        var colSeq2 = $(this).find('td[data-col-seq="2"]').text().trim();
        var notaAtual = parseInt(colSeq2, 10);

        if (notaAtual === numeroNota) {
            $(this).toggleClass('table-danger');
            $(this).find('.kv-row-select input').prop('checked', isChecked);
        }
    });
}

$(document).ready(function () {

    verificaNotaLancada();

    var gerarLancamentoButton = $('#gerarLancamento');
    gerarLancamentoButton.on('click', function () {
        actionGerarLancamento();
    });

    $(".kv-row-checkbox").on('change', function () {

        toggleCheckboxMesmaNota($(this));

        var selectedCheckboxes = $('.kv-row-checkbox:checked');
        if (selectedCheckboxes.length > 0) {
            gerarLancamentoButton.show('slow');
        } else {
            gerarLancamentoButton.hide('slow');
        }
    })
});