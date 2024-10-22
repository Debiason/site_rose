var comboParcela = $("select[name='EmissaoFatura[parcelanotafiscal_id]"),
    fldValorNota = $("input[name='EmissaoFatura[valor]'], input[name='emissaofatura-valor-disp']");

comboParcela.change(getValor);

function getValor() {

    var parcelaId = comboParcela.val();
    var pedidoId = $("#pedidoId").val();

    $.ajax({
        url: '/parcela-nota-fiscal/get-valor/',
        data: {
            id: parcelaId,
            pedidoId: pedidoId
        },
        async: false,
        success: function (resp) {
            valor = resp;
            fldValorNota.val(valor);
        }
    });
}