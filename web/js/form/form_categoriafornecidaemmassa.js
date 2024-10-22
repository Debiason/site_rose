$(document).ready(function () {
    $("#fld-grupoproduto").attr('required', 'required');
    $("#dadosClassesByGrupoProduto").hide();
});

//dados classes by categoria selecinada
$('#fld-grupoproduto').change(function () {
    getDados(this.value);
});

function getDados(valorId) {

    $.ajax({
        url: '/categoria-fornecida/get-classes/',
        data: {
            id: valorId
        },
        async: false,
        success: function (resp) {

            retorno = "<strong>Classes:</strong>" + "<br/>" + "<br/>";
            $.each(resp, function (index, element) {
                retorno += '<label><input type="checkbox" name="selection[]" class="kv-row-checkbox" value=' + element.id + '>' + ' ' +
                    (element.nome == null ? '' : element.nome) + ' </label><br/>';

            });

            $("#dadosClassesByGrupoProduto").show();
            $("#dadosClassesByGrupoProduto").html(retorno);
        }
    });
}

//salva as modificacoes
$('#btnSalvar').on('click', function () {
    if ($("#fld-grupoproduto option:selected").val() == null || $("#fld-grupoproduto option:selected").val() == '') {
        $('.requiredGrupo').html("<span style='opacity: 80%'>*Grupo não pode ficar em branco.</span><br/><br/>");
    }
});


