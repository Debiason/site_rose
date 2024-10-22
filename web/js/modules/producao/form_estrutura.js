$("body").delegate(".fld-nome-materiaprima", "change", function() {
    buscaInforcoesProduto($(this));
});

function buscaInforcoesProduto(comboProduto) {
    var id = comboProduto.val();
    var fldIdProduto = $(comboProduto).closest("tr").find(".fld-idproduto");
    fldIdProduto.val(id);

    if (id) {
        $.ajax({
            url: '/producao/estrutura/get-codigo-produto/',
            data: {
                idProduto: id
            },
            async: false,
            success: function (resp) {
                if (resp) {
                    var fldCodigoProduto = $(comboProduto).closest("tr").find(".fld-codigoproduto");
                    fldCodigoProduto.val(resp);
                }
            }
        });
    }
}
