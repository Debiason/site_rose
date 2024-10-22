function realizarConferencia() {
    console.log('Conferencia iniciada');
    var ids = $('#grid-pagamentos-pendentes').yiiGridView('getSelectedRows');
    $.blockUI({
        message: 'Realizando conferência nos pagamentos selecionados',
        boxed: true
    });
    $.ajax({
        url: '/pagamento/realizar-conferencia',
        type: "POST",
        async: false,
        data: {'ids': ids},
        success: function (resp) {
            $.unblockUI();
        }
    });
}

function liberarPagamentos() {
    var ids = $('#grid-pagamentos-pendentes').yiiGridView('getSelectedRows');

    $.blockUI({
        message: 'Gerando documentos eletrônicos...',
        boxed: true
    });

    $.ajax({
        url: '/pagamento/liberar-pagamentos',
        type: "POST",
        async: false,
        data: {'ids': ids},
        success: function (resp) {
            if (resp.data.success) {
                toastr.success(resp.data.message, "Sucesso!");
                window.open(resp.data.redirectUrl);
                $.unblockUI();
                window.location.reload();
            } else {
                $.unblockUI();
                toastr.error(resp.data.message, "Erro!");
            }
        }
    });
}