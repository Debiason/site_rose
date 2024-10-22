var fldPermiteDocFiscal = $("input[name='TipoPagamentoInterno[permite_documentofiscal]']"),
    divNotaServico = $("#nota_fiscal_servico");


fldPermiteDocFiscal.click(function () {
   verificadocumentoFiscal();
});

fldPermiteDocFiscal.ready(function () {
   verificadocumentoFiscal();
});

function verificadocumentoFiscal() {
    if (fldPermiteDocFiscal.is(':checked')) {
        divNotaServico.show('slow');
    } else {
        divNotaServico.hide('slow');
    }
}