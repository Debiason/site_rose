var fldDadosPreFornecedor = $("#dadosPreFornecedor"),
    fldPreFornecedorValor = $("textarea[name='FornecedorIndicado[prefornecedor]']");




$(document).ready(function () {

    if(fldPreFornecedorValor.val() == ''){
        fldDadosPreFornecedor.hide();
    }else {
        fldDadosPreFornecedor.show();
    }
});

//checkBox para preeencher os dados de Pre fornecedor
$('#fornecedorNaoEncontrado').on('click', function(){

    if ( $(this).is(':checked') ) {
        fldDadosPreFornecedor.show("slow");
    } else {
        fldDadosPreFornecedor.hide("slow");
    }
});