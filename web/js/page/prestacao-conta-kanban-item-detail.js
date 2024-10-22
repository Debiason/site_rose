$('#etapa-andamento').change(function () {

    var id = $('#prestacaoContaId').val(),
        campo = 'etapa_id',
        valor =  $('#etapa-andamento').val();

    updateItemDetail(id, campo , valor)
});

function updateItemDetail(id, campo, valor) {

    $.ajax({
        url:  "/prestacao-conta/kanban-update-item-detail",
        data: {
            id: id,
            campo: campo,
            valor: valor
        },
        type: 'post',
        async: false,
        success: function (resp) {
            toastr.success("Alteração realizada com sucesso", "Alterado!");
        },
        error: function (e) {
            toastr.error('Não foi possível alterar', 'Erro!');
        }
    });
}