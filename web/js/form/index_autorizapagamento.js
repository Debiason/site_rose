var btnAutorizar = $("#autorizarEmMassa");
var btnRecusar = $("#recusarEmMassa");
var divMotivoRecusa = $('#divMotivoRecusa');
var btnProsseguir = $("button[class='btn btn-outline-danger justificativa']");

$(document).ready(function () {
    divMotivoRecusa.hide();
});

btnAutorizar.click(function () {
    autorizarPagamento(1);
});

btnRecusar.click(function () {
    divMotivoRecusa.show('slow');
});

btnProsseguir.click(function () {
    var textoJustificativa = $("input[name='justificativa']").val();
    autorizarPagamento(0, textoJustificativa);
});

$(".select-on-check-all").change(function () {
    carregaBtn();
});

$(".kv-row-checkbox").change(function () {
    carregaBtn();
});

function carregaBtn() {
    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).closest('tr').find('.pedido-id').text();
        i++;
    });
    
    if (id.length > 0) {
        btnAutorizar.show('slow');
        btnRecusar.show('slow');
    } else {
        btnAutorizar.hide('slow');
        btnRecusar.hide('slow');
    }
}

function autorizarPagamento($aprovacao, $justificativa = '') {
    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });


    if (id.length > 0) {
        $.ajax({
            url: '/pagamento-interno/autorizar-pagamento/',
            data: {
                ids: id,
                tipoAprovacao: $("#tipoAprovacao").val(),
                autorizacao: $aprovacao,
                justificativa: $justificativa,
            },
            async: false,
            type: 'post',
            success: function (resp) {
                if (resp) {
                    window.location.reload();
                } else {
                    toastr.error('Erro ao autorizar o(s) pedido(s).');
                    window.location.reload();
                }
            }
        });
    } else {
        toastr.error('Nenhum pedido foi selecionado.');
    }

}
