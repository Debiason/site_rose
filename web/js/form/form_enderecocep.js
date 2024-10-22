$(document).ready(function () {
    function limpa_formulario_cep() {
        $('#comboCidadeByUf').show('');
        $('#endereco-cidade-div').hide('');
        $('#fld-cidade').val('').trigger('change');
        $('#endereco-cidade').val('').trigger('change');
        $('#fld-estado').val('').trigger('change');
        $('#endereco-logradouro').val('');
        $('#endereco-bairro').val('');
    }

    $('#endereco-cep').on('blur', function () {
        var cep = $('#endereco-cep').val(); // obtém o valor do CEP do input
        $.ajax({
            url: '/endereco/get-endereco-by-cep',
            type: 'GET',
            dataType: 'json',
            data: {
                cep: cep
            },
            beforeSend: function () {
                $('#fld-cidade').val('...').trigger('change');
                $('#endereco-cidade').val('...').trigger('change');
                $('#fld-estado').val('...').trigger('change');
                $('#endereco-logradouro').val('...');
                $('#endereco-bairro').val('...');
            },
            success: function (data) {
                $('#fld-estado').val(data.estadoId).trigger('change');
                $('#fld-cidade').val(data.cidadeId).trigger('change');
                $('#comboCidadeByUf').hide('fast');
                $('#endereco-cidade-div').show('slow');
                $('#endereco-cidade').val(data.cidadeId).trigger('change');
                $('#endereco-logradouro').val(data.rua);
                $('#endereco-bairro').val(data.bairro);
            },
            error: function () {
                limpa_formulario_cep();
            }
        });
    });
});