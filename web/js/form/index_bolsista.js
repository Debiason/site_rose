var btnGeraPagamento = $("button[class='btn btn-sm btn-outline-primary btnGerarPagamentos']"),
    msgTela = $("#msgGeraPagamento");

btnGeraPagamento.click(function () {
   gerarPagamentos($(this).val());
});

function gerarPagamentos(id) {

    $.ajax({
        url: '/bolsista/gerar-pagamentos/',
        data: {
            id: id

        },
        async: false,
        success: function (resp) {
            var msg = resp.data.msg;
            if (resp.data.success == false) {
                msgTela.html('<div class="alert alert-danger alert-dismissible fade show" align="center">' +
                    '<span>'+ msg +'</span>' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span></button></div><br/>');
            } else {
                 msgTela.html('<div class="alert alert-success alert-dismissible fade show" align="center">' +
                    '<span>'+ msg +'</span>' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span></button></div><br/>');
            }
        }
    });
}
