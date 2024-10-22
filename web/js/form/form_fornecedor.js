$(document).ready(function () {
    $("#fld-pessoa").attr('required' , 'required');
    $("#validacaoPessoaMsg").hide();
});

$(".salvarFornecedor").click(function () {

    if ($("#fld-pessoa").val() == ''){
        $("#validacaoPessoaMsg").show();
    } else {
        $("#validacaoPessoaMsg").hide();
    }

});

$("#fld-pessoa").change(function () {
    if ($("#fld-pessoa").val() == ''){
        $("#validacaoPessoaMsg").show();
    } else {
        $("#validacaoPessoaMsg").hide();
    }
});

$('input[name="Fornecedor[representante]"]').on('click', function(){
    if ( $(this).is(':checked') ) {
        $('.fornecedorRepresentado').removeClass('inactive');
    } else {
        $('.fornecedorRepresentado').addClass('inactive');
    }
});