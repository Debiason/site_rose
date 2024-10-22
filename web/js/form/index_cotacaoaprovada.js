var btnPatrimoniar = $('#btnPatrimoniarItem');

$(document).on('change', '.kv-row-checkbox', function () {
    exibeBotoes();
});

function exibeBotoes() {
    if ($('.kv-row-checkbox:checked').length > 0) {
        $('#cotacao-aprovada-buttons').fadeIn();
    } else {
        $('#cotacao-aprovada-buttons').fadeOut();
    }
}

btnPatrimoniar.on('click', function () {
    var situacaoAguardandoEntrega = true;

    $('.kv-row-checkbox:checked').each(function () {
        var situacao = $(this).closest('tr').find('td:nth-child(6)').text();
        if (situacao !== 'Aguardando entrega') {
            situacaoAguardandoEntrega = false;
            return false;
        }
    });

    if (situacaoAguardandoEntrega) {
        var idsSelecionados = $('.kv-row-checkbox:checked').map(function () {
            return $(this).val();
        }).get();

        if (idsSelecionados) {
            $.ajax({
                url: '/cotacao-aprovada/set-patrimoniar/',
                data: {
                    cotacao_id: idsSelecionados.join(",")
                },
                async: false,
                success: function (resp) {
                    if (resp === true) {
                        toastr.success('Item alterado com sucesso.');
                        window.location.reload();
                    } else {
                        toastr.error('Não foi possível alterar o item.');
                    }
                }
            });
        }
    } else {
        toastr.error('Selecione apenas itens na situação "Aguardando Entrega".');
    }
});