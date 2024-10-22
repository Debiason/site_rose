var btnDanfe = $("#btn-danfe");

btnDanfe.click(habilitaButtons);

function habilitaButtons() {
    $("#btn-aprovar").removeClass('disabled');
    $("#btn-recusar").removeClass('disabled');
}

$(document).on('click', '#btn-aprovar', function (event) {

    event.preventDefault();

    if ($(this).hasClass('disabled')) {
        swal({
            title: 'Atenção',
            html: 'Você ainda não abriu a nota fiscal. <br> ' +
                'Por favor, acesse a nota fiscal no botão "DANFE" para conferir os dados entregues. Após acessa-la ' +
                'você poderá confirmar a entrega.',
            type: "warning",
            confirmButtonColor: "#34bfa3",
        });
        return false;
    } else {
        swal({
            title: 'Confirmação',
            html: 'Ao confirmar a entrega TODOS os itens do documento fiscal seguirão para pagamento.',
            type: "question",
            confirmButtonColor: "#34bfa3",
            showCancelButton: true,
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.value == true) {
                $('#form-confirmacao-entrega').submit();
            }
        });
    }

});
$(document).on('click', '#btn-recusar', function (event) {

    if ($(this).hasClass('disabled')) {
        event.preventDefault();
        swal({
            title: 'Atenção',
            html: 'Você ainda não abriu a nota fiscal. <br> ' +
                'Por favor, acesse a nota fiscal no botão "DANFE" para conferir os dados entregues. Após acessa-la ' +
                'você poderá recusar a entrega.',
            type: "warning",
            confirmButtonColor: "#34bfa3",
        });
        return false;
    }

});