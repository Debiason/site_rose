$(document).ready(function() {
    $('.icone-pedidos-por-rubrica').click(function(event) {
        var rubricaId = $(this).data('rubrica-id');
        console.log('Rubrica ID clicada:', rubricaId);

        $.ajax({
            url: '/rubrica-aprovada/detalhes-pedidos?rubricaaprovada=' + rubricaId,
            type: 'GET',
            success: function(data) {
                $('#modal-content').html(data);
                $('#modal-pedidos-por-rubrica').modal('show');
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});

$(document).ready($(function () {
    verificaClasse();
}));
function verificaClasse() {
    var classesProduto = $('.item-aprovado-cancelado');
    classesProduto.each(function () {
        $(this).closest('tr').addClass('table-danger');
    });
}