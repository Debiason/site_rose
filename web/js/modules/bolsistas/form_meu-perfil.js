var cpfValue = $("#usuariobolsista-cpf").val();

$(document).ready(function () {

    $("#usuariobolsista-login").css('background-color', '#F3F6F9');
    formatarCPF(cpfValue);

    $('#usuariobolsista-telefone').on('input', function (event) {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');

        if (inputValue.length > 13) {
            inputValue = inputValue.substring(0, 13);
        }

        if (inputValue.length <= 11) {
            if (inputValue.length === 8) {
                inputValue = inputValue.replace(/^(\d{4})(\d{4})$/, '$1-$2');
            } else {
                inputValue = inputValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
            }
        } else {
            inputValue = inputValue.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4');
        }
        event.target.value = inputValue;
    });

    $("#usuariobolsista-cpf").on("input", function(event) {
        var cpfValue = $(this).val();
        cpfValue = cpfValue.replace(/\D/g, '');

        if (cpfValue.length > 11) {
            cpfValue = cpfValue.substring(0,11);
        }

        if (cpfValue.length <= 11) {
            if (cpfValue.length === 6) {
                cpfValue = cpfValue.replace(/^(\d{3})(\d{3})$/, '$1.$2');
            } else if (cpfValue.length === 9) {
                cpfValue = cpfValue.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
            } else if (cpfValue.length === 11) {
                cpfValue = cpfValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            }
        }
        event.target.value = cpfValue;
    });

    function limpa_formulario_cep() {
        $('#comboCidadeByUf').show('');
        $('#endereco-cidade-div').hide('');
        $('#fld-cidade').val('').trigger('change');
        $('#endereco-cidade').val('').trigger('change');
        $('#fld-estado').val('').trigger('change');
        $('#usuariobolsista-logradouro').val('');
        $('#usuariobolsista-bairro').val('');
    }

    $('#usuariobolsista-cep').on('blur', function () {
        var cep = $('#usuariobolsista-cep').val(); // obtém o valor do CEP do input
        $.ajax({
            url: '/bolsistas/usuario-bolsista/get-endereco-by-cep',
            type: 'GET',
            dataType: 'json',
            data: {
                cep: cep
            },
            beforeSend: function () {
                $('#fld-cidade').val('...').trigger('change');
                $('#endereco-cidade').val('...').trigger('change');
                $('#fld-estado').val('...').trigger('change');
                $('#usuariobolsista-logradouro').val('...');
                $('#usuariobolsista-bairro').val('...');
            },
            success: function (data) {
                $('#fld-estado').val(data.estadoId).trigger('change');
                $('#fld-cidade').val(data.cidadeId).trigger('change');
                $('#comboCidadeByUf').hide('fast');
                $('#endereco-cidade-div').show('slow');
                $('#endereco-cidade').val(data.cidadeId).trigger('change');
                $('#usuariobolsista-logradouro').val(data.rua);
                $('#usuariobolsista-bairro').val(data.bairro);
            },
            error: function () {
                limpa_formulario_cep();
            }
        });
    });

    $("#usuariobolsista-email").on('blur', function () {
        $("#usuariobolsista-login").val($(this).val()).trigger('change');
    })
});

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    document.getElementById('usuariobolsista-cpf').value = cpf;
}