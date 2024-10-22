var
    fldComercial = $("input[id='enderecoentrega-tipo-endereco--0']"),
    fldResidencial = $("input[id='enderecoentrega-tipo-endereco--1']"),
    fldPessoa = $("select[name='EnderecoEntrega[pessoa_id]']"),
    fldCNPJ = $("input[name='EnderecoEntrega[cnpj]']"),
    divPessoa = $("#pessoa-endereco");

//triggers
$(document).ready(function () {
    if ($("#model-id").val() == '') {
        divPessoa.hide();
        fldPessoa.attr('disabled', 'disabled');
        fldCNPJ.attr('disabled', false);
        fldCNPJ.attr('required', true);
    } else if($("#model-id").val() != '' && fldCNPJ.val() == '') {
        divPessoa.show();
        fldCNPJ.attr('disabled', 'disabled');
        fldCNPJ.attr('required', false);
    } else {
        divPessoa.hide();
        fldPessoa.attr('disabled', 'disabled');
        fldCNPJ.attr('disabled', false);
        fldCNPJ.attr('required', true);
    }
});

fldComercial.change(function () {
    divPessoa.hide('slow');
    fldPessoa.attr('disabled', 'disabled');
    fldCNPJ.attr('disabled', false);
    fldCNPJ.attr('required', true);
});

fldResidencial.change(function () {
    divPessoa.show('slow');
    fldPessoa.attr('disabled', false);
    fldCNPJ.val('');
    fldCNPJ.attr('disabled', 'disabled');
    fldCNPJ.attr('required', false);
});

$("button[id='btn-salvar-endereco']").click(function (event) {
    var btn = $(this);
    var acordo_id = $("#model-acordo_id").val();
    event.preventDefault();
    btn.prop('disabled', true);
    btn.html('Aguarde ...');
    $('#form-endereco-entrega').submit();

    setTimeout(function () {
        $.ajax({
            url: '/endereco-entrega/get-ultimo-registro/',
            data: {
                acordo_id: acordo_id
            },
            async: false,
            success: function (resp) {
                $(".body-radio-entrega")
                    .load('/endereco-entrega/radio-button-options?acordo_id=' + acordo_id + '&enderecoentrega_id=' + resp);
            }
        });
    }, 1000);
});