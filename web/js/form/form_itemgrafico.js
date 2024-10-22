var fldImportacao = $("input[id='fld-importacao']");


$(document).ready(function () {
    $.exibeTraducaoDescricao();
});

//checkBox para os dados de compra no mercado externo
fldImportacao.on('click', function(){
    $.exibeTraducaoDescricao();
});