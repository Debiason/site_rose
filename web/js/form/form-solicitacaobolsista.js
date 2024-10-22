var fldSituacao = $('#fld-situacao');
var fldFinalidade = $('.field-solicitacaobolsista-finalidade');

fldFinalidade.hide();
fldSituacao.change(function () {
    var situacao = $(this).val();

    if (situacao === "248") {
        $('#devolucao-solicitacaobolsista').show("slow");
        $('#motivo_devolucao').prop('required', true);
    } else {
        $('#devolucao-solicitacaobolsista').hide("slow");
        $('#motivo_devolucao').prop('required', false);
    }
});

function clickCopy() {
    var content = document.getElementById('solicitacaobolsista-link_bolsa');
    content.select();

    document.execCommand('copy');

    $("#message").show();
    $("#message").fadeIn(200);

    $('a').find('i').toggleClass('fa-check fa-copy');

    setTimeout(function () {
        $('#message').fadeOut(300, function () {
            $(this).hide();
            $('a').find('i').toggleClass('fa-check fa-copy');
        });
    }, 1000);
}

$(document).ready(function () {
    $('#fld-acordo').change(function () {
        var acordoId = $(this).val();

        $.ajax({
            type: 'GET',
            url: '/acordo/get-dados-executora/',
            data: {
                id: acordoId
            },
            success: function (resp) {
                var nome = resp.nome + ' - ' + resp.cnpj;

                $('#fld-instituicao').empty();
                $('#fld-instituicao').append(new Option(nome, resp.instituicaoexecutora_id, true, true))
                    .trigger('change')
                    .trigger("select2:select");
            },
        });
    });
});