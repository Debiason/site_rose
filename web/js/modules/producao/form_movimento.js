$(document).ready(function() {
    movimento();
});

function itensMovimento() {
    var table = $('#tabela-movimento');
    var i = 0;
    var movimentos = [];

    table.find('tr').next('tr').each(function() {
        var checked = $(this).find('td#produto > input[type=checkbox]').is(':checked');

        if (checked) {
            var id = parseInt($(this).find('td#produto > input[type=checkbox]').val());
            var quantidade = parseFloat($(this).find('td#quantidade').html());
            var quantidadeEstoque = parseFloat($(this).find('td#quantidade-estoque').html());

            var dados = {id, quantidade, quantidadeEstoque};
            movimentos.push(dados);
        }
        i++;
    });

    return movimentos
}

function movimento() {
    var itens = itensMovimento();
}

