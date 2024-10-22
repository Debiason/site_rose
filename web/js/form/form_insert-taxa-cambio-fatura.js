var fldTaxaCambio = $("#taxa-cambio-fatura");
var fldFaturaId = $("#fatura-id");
var btnPrint = $("#btn-print-fatura");

fldTaxaCambio.keyup(function () {
    atualizaUrl();
});

function atualizaUrl(){
    let valCambio = fldTaxaCambio.val();
    let id = fldFaturaId.val();
    let href = '/emissao-fatura/print-detail?id='+id+'&taxaCambio='+valCambio;
    btnPrint.attr('href', href);
}