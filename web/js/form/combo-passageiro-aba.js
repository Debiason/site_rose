$('.precadastro-favorecido').on('click', function(){
    event.preventDefault();
    $.loadInModal($(this).attr('href'), "Pré-Cadastro");
});

function atualizaFavorecidoPreCadastro(data) {

    var passageiro = { favorecidoId: data.model.favorecido.id, favorecidoNome: data.model.favorecido.nome };
    var idPedido = window.location.search.split('=');
    var urlAnterior = '/item-passagem/create?pedido_id=' + idPedido[1];

    localStorage.setItem("passageiro",  JSON.stringify(passageiro));

    $.loadInModal(urlAnterior, "Itens de Passagens");

    setTimeout(function () {
        var passageiroStorage = JSON.parse(localStorage.getItem("passageiro"));
        $("#fld-passageiro").append('<option value=' + passageiroStorage.favorecidoId + '>' + passageiroStorage.favorecidoNome +'</option>');
        $("#fld-passageiro").attr('style', 'width: 100%;');
        $("#fld-passageiro").select2();
        $("#fld-passageiro").val(passageiroStorage.favorecidoId).trigger('change.select2');

        localStorage.setItem("passageiro",  '');

    }, 1000);

}

