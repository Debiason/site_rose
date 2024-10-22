$(document).ready(function () {
    $("#fld-grupoproduto").attr('required', 'required');
});

$('#fld-grupoproduto').on('change', function () {
    var desc = $("#fld-grupoproduto option:selected").text();
    $('#fld-grupoNome').val(desc);
});
$('#fld-casseproduto').on('change', function () {
    var desc = $("#fld-casseproduto option:selected").text();
    $('#fld-classeNome').val(desc);
});

$('#categoriafornecida-comercializa').on('click', function () {
    if ($('#categoriafornecida-comercializa').is(':checked')) {
        $('#fld-comercializaValor').val('<span class=letras-verdes>Sim</span>');
    } else {
        $('#fld-comercializaValor').val('<span class=valor-debito>Não</span>');
    }
});

//salva as modificacoes
$('#btnSalvar').on('click', function () {

    var comercializaValor;
    if ($('#categoriafornecida-comercializa').is(':checked')) {
        comercializaValor = 1;
    } else {
        comercializaValor = 0;
    }

    if ($("#fld-grupoproduto option:selected").val() == null || $("#fld-grupoproduto option:selected").val() == '') {
        $('.requiredGrupo').html("<span>Grupo não pode ficar em branco.</span>");
    } else {
        $('.requiredGrupo').html("");
        $.ajax({
            url: '/categoria-fornecida/salvar-alteracoes/',
            data: {
                grupoId: $("#fld-grupoproduto option:selected").val(),
                classeId: $("#fld-casseproduto option:selected").val(),
                comercialliza: comercializaValor,
                id: $("#fld-id").val(),
                fornecedor_id: $("#fld-fornecedor_id").val(),
            },
            async: false,
            success: function (resp) {
                window.location.reload();
            }
        });
    }

});

