$('#itemprocesso-itemcompra_id').on('change', function () {
    $.ajax({
        url: '/item-compra/get-descricao/',
        data: {
            id: $('#itemprocesso-itemcompra_id').val()
        },
        async: false,
        success: function (resp) {
            $('#itemprocesso-descricao').val(resp['descricao']);
            $('#fld-descricaoItem').val(resp['descricao']);
            $('#fld-produto').val(resp['produto']);
        }
    });
});


$('#itemprocesso-valorreferencia').on('change', function () {
    var desc = $("#itemprocesso-valorreferencia").val();
    $('#fld-valorReferencia').val(desc);
});


$('#itemprocesso-cotar').ready(function () {
    if ($('#itemprocesso-cotar').is(':checked')) {
        $('#fld-cotarItem').val('<span class=letras-verdes>Sim</span>');
    } else {
        $('#fld-cotarItem').val('<span class=valor-debito>Não</span>');
    }
});

$('#itemprocesso-cotar').on('click', function () {
    if ($('#itemprocesso-cotar').is(':checked')) {
        $('#fld-cotarItem').val('<span class=letras-verdes>Sim</span>');
    } else {
        $('#fld-cotarItem').val('<span class=valor-debito>Não</span>');
    }
});