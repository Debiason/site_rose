var comboAcordo = $("select[id='fld-projeto_id']");

comboAcordo.change(function () {
    exibeMensagemMembro();
});

$('.precadastro-favorecido').on('click', function(){
    event.preventDefault();
    $.loadInModal($(this).attr('href'), "Pré-Cadastro");
});

function atualizaFavorecidoPreCadastro(data) {

    console.log('atualizaFavorecidoPreCadastro');
    console.log(data);

    var favorecidoId = data.model.favorecido.id;
    var favorecidoNome = data.model.favorecido.nome;

    $("#fld-passageiro").append('<option value=' + favorecidoId + '>' + favorecidoNome +'</option>');
    $("#fld-passageiro").attr('style', 'width: 100%;');
    $("#fld-passageiro").select2();
    $("#fld-passageiro").val(favorecidoId).trigger('change.select2');

    controlComboPassageiro();
}

function exibeMensagemMembro() {

    let acordoId = $("#fld-projeto_id").val();

    if (acordoId != null) {
        $.ajax({
            url: '/acordo/get-paga-somente-membros/',
            data: {
                id: acordoId
            },
            async: false,
            success: function (resp) {
                if (resp['pagaSomenteMembro']) {
                    $('.msgFavorecidoMembro').html("<small>O projeto selecionado" +
                        " executa pagamentos somente para membros da equipe executora.</small><br/><br/>");
                } else {
                    $('.msgFavorecidoMembro').html("");
                }
            }
        });
    }
}