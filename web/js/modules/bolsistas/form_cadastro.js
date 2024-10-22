var btnProxHome = $("#form-home");
var btnProxContact = $("#form-contact");
var btnProxFormacaoAcademica = $("#form-formacao-academica");
var btnProxAtuacaoProfissional = $("#form-atuacao-profissional");
var btnProxEndereco = $("#form-endereco");
var btnProxProjetosPesquisa = $("#form-projetos-pesquisa");

btnProxHome.click(function () {
    $("#home-tab").attr('class', 'nav-link');
    $("#home-tab").attr('class', 'nav-link');
    $("#home").attr('class', 'tab-pane fade');

    $("#endereco-tab").attr('class', 'nav-link active show');
    $("#endereco-tab").attr('aria-selected', true);
    $("#endereco").attr('class', 'tab-pane fade active show');
});

btnProxEndereco.click(function () {
    $("#endereco-tab").attr('class', 'nav-link');
    $("#endereco-tab").attr('class', 'nav-link');
    $("#endereco").attr('class', 'tab-pane fade');

    $("#formacao-academica-tab").attr('class', 'nav-link active show');
    $("#formacao-academica-tab").attr('aria-selected', true);
    $("#formacao-academica").attr('class', 'tab-pane fade active show');
});

btnProxFormacaoAcademica.click(function () {
    $("#formacao-academica-tab").attr('class', 'nav-link');
    $("#formacao-academica-tab").attr('class', 'nav-link');
    $("#formacao-academica").attr('class', 'tab-pane fade');

    $("#atuacao-profissional-tab").attr('class', 'nav-link active show');
    $("#atuacao-profissional-tab").attr('aria-selected', true);
    $("#atuacao-profissional").attr('class', 'tab-pane fade active show');
});

btnProxAtuacaoProfissional.click(function () {
    $("#atuacao-profissional-tab").attr('class', 'nav-link');
    $("#atuacao-profissional-tab").attr('class', 'nav-link');
    $("#atuacao-profissional").attr('class', 'tab-pane fade');

    $("#projetos-pesquisa-tab").attr('class', 'nav-link active show');
    $("#projetos-pesquisa-tab").attr('aria-selected', true);
    $("#projetos-pesquisa").attr('class', 'tab-pane fade active show');
});
btnProxProjetosPesquisa.click(function () {
    $("#projetos-pesquisa-tab").attr('class', 'nav-link');
    $("#projetos-pesquisa-tab").attr('class', 'nav-link');
    $("#projetos-pesquisa").attr('class', 'tab-pane fade');

    $("#dados-complementares-tab").attr('class', 'nav-link active show');
    $("#dados-complementares-tab").attr('aria-selected', true);
    $("#dados-complementares").attr('class', 'tab-pane fade active show');
});

$(document).ready(function () {

    $("#usuariobolsista-login").css('background-color', '#F3F6F9');

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

    $(".btnSalvar").on('click', function () {

        var hasInvalidEmail = $("#usuariobolsista-email").hasClass("is-invalid");
        var hasInvalidCpf = $("#usuariobolsista-cpf").hasClass("is-invalid");

        var cidadeAux = $('#endereco-cidade').val();
        var cidade_id = $("#fld-cidade").val();
        var cep = $('#usuariobolsista-cep').val();
        cep = cep.replace(/\D/g, '');

        if (cep.length < 8) {
            toastr.info("Por favor, informe um CEP válido.");
            return false;
        }

        if (!cidadeAux && !cidade_id) {
            toastr.info("Por favor, informe a cidade.");
            return false;
        }

        if (hasInvalidEmail == true || hasInvalidCpf == true) {
            return false;
        }

        var response = grecaptcha.getResponse();
        if (response.length == 0) {
            toastr.info("Por favor, confirme que você não é um robô.");
            return false;
        }
    });

    $('#usuariobolsista-telefone').on('input', function(event) {
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

    $("#usuariobolsista-email").on('blur', function () {

        $("#usuariobolsista-login").val($(this).val()).trigger('change');

        $.ajax({
            url: '/bolsistas/usuario-bolsista/verifica-cadastro-existente',
            type: 'GET',
            dataType: 'json',
            data: {
                email: $(this).val()
            },
            success: function (data) {
                if (data == true) {
                    setTimeout(function () {
                        $(".field-usuariobolsista-email").addClass('has-error')
                        $("#usuariobolsista-email").addClass('is-invalid')
                        $('.field-usuariobolsista-email .invalid-feedback').html('E-mail já cadastrado.')
                    }, 500);
                }
            },
        });
    })

    $("#usuariobolsista-cpf").on('blur', function () {

        var cpf = $(this).val();
        var numerosCpf = cpf.replace(/\D/g, '');

        $.ajax({
            url: '/bolsistas/usuario-bolsista/verifica-cadastro-existente',
            type: 'GET',
            dataType: 'json',
            data: {
                cpf: numerosCpf
            },
            success: function (data) {
                if (data == true) {
                    setTimeout(function () {
                        $(".field-usuariobolsista-cpf").addClass('has-error')
                        $("#usuariobolsista-cpf").addClass('is-invalid')
                        $('.field-usuariobolsista-cpf .invalid-feedback').html('CPF já cadastrado.')
                    }, 500);
                }
            },
        });
    })

});