var btnProxHome = $("#form-home");
var btnProxContact = $("#form-contact");
var btnProxConta = $("#form-conta-bancaria");
var btnProxDocs = $("#form-documentos");
var btnProxCategorias = $("#form-categorias");
var btnProxEndereco = $("#form-endereco");
var btnSalvar = $("#form-salvar");
var fldInscricaoEstadual = $("#precadastrofornecedorform-inscricaoestadual");
var fldEstado = $('#fld-estado')

btnSalvar.click(function (e) {
    var estado_id = fldEstado.val()
    var ie = fldInscricaoEstadual.val()

    if (ie.length > 0 && estado_id.length > 0) {
        e.preventDefault();
        $.ajax({
            url: '/fornecedores/pre-cadastro-fornecedor/valida-inscricao-estadual-ajax',
            data: {
                ie: ie,
                estado_id: estado_id
            },
            async: false,
            success: function (resp) {
                if (resp == false) {
                    returnHome();
                    $(".field-precadastrofornecedorform-inscricaoestadual").addClass('has-error')
                    fldInscricaoEstadual.addClass('is-invalid')
                    $('.field-precadastrofornecedorform-inscricaoestadual .invalid-feedback').html(
                        'A inscrição estadual é inválida para o endereço informado. ' +
                        'Insira apenas números. Caso seja isento, insira o texto "Isento", sem aspas ou espaços.');
                } else {
                    $('#dados-principais').submit();
                }
            }
        });
    }
})

fldInscricaoEstadual.on('input', function() {
    $(".field-precadastrofornecedorform-inscricaoestadual").removeClass('has-error');
    fldInscricaoEstadual.removeClass('is-invalid');
    $('.field-precadastrofornecedorform-inscricaoestadual .invalid-feedback').html('');
});

function returnHome(){
    $("#home-tab").attr('class', 'nav-link active show');
    $("#home-tab").attr('aria-selected', true);
    $("#home").attr('class', 'tab-pane fade active show');

    $("#contact-tab").attr('class', 'nav-link');
    $("#contact-tab").attr('class', 'nav-link');
    $("#contact").attr('class', 'tab-pane fade');
    $("#conta-bancaria-tab").attr('class', 'nav-link');
    $("#conta-bancaria-tab").attr('class', 'nav-link');
    $("#conta-bancaria").attr('class', 'tab-pane fade');
    $("#endereco-tab").attr('class', 'nav-link');
    $("#endereco-tab").attr('class', 'nav-link');
    $("#endereco").attr('class', 'tab-pane fade');
    $("#documento-tab").attr('class', 'nav-link');
    $("#documento-tab").attr('class', 'nav-link');
    $("#documento").attr('class', 'tab-pane fade');
}

btnProxHome.click(function () {
    $("#home-tab").attr('class', 'nav-link');
    $("#home-tab").attr('class', 'nav-link');
    $("#home").attr('class', 'tab-pane fade');

    $("#contact-tab").attr('class', 'nav-link active show');
    $("#contact-tab").attr('aria-selected', true);
    $("#contact").attr('class', 'tab-pane fade active show');
});

btnProxContact.click(function () {
    $("#contact-tab").attr('class', 'nav-link');
    $("#contact-tab").attr('class', 'nav-link');
    $("#contact").attr('class', 'tab-pane fade');

    $("#conta-bancaria-tab").attr('class', 'nav-link active show');
    $("#conta-bancaria-tab").attr('aria-selected', true);
    $("#conta-bancaria").attr('class', 'tab-pane fade active show');
});

btnProxConta.click(function () {
    $("#conta-bancaria-tab").attr('class', 'nav-link');
    $("#conta-bancaria-tab").attr('class', 'nav-link');
    $("#conta-bancaria").attr('class', 'tab-pane fade');

    $("#endereco-tab").attr('class', 'nav-link active show');
    $("#endereco-tab").attr('aria-selected', true);
    $("#endereco").attr('class', 'tab-pane fade active show');
});

btnProxEndereco.click(function () {
    $("#endereco-tab").attr('class', 'nav-link');
    $("#endereco-tab").attr('class', 'nav-link');
    $("#endereco").attr('class', 'tab-pane fade');

    $("#documento-tab").attr('class', 'nav-link active show');
    $("#documento-tab").attr('aria-selected', true);
    $("#documento").attr('class', 'tab-pane fade active show');
});

// $('#precadastrofornecedorform-representante').on('click', function () {
//     if ($('#precadastrofornecedorform-representante').is(':checked')) {
//         $('#div-empresas-representadas').show('hide');
//     } else {
//         $('#div-empresas-representadas').hide('hide');
//     }
// });

$(document).ready(function () {
    function limpa_formulario_cep() {
        $('#comboCidadeByUf').show('');
        $('#endereco-cidade-div').hide('');
        $('#fld-cidade').val('').trigger('change');
        $('#endereco-cidade').val('').trigger('change');
        $('#fld-estado').val('').trigger('change');
        $('#precadastrofornecedorform-logradouro').val('');
        $('#precadastrofornecedorform-bairro').val('');
    }

    $('#precadastrofornecedorform-cep').on('blur', function () {
        var cep = $('#precadastrofornecedorform-cep').val(); // obtém o valor do CEP do input
        $.ajax({
            url: '/fornecedores/pre-cadastro-fornecedor/get-endereco-by-cep',
            type: 'GET',
            dataType: 'json',
            data: {
                cep: cep
            },
            beforeSend: function () {
                $('#fld-cidade').val('...').trigger('change');
                $('#endereco-cidade').val('...').trigger('change');
                $('#fld-estado').val('...').trigger('change');
                $('#precadastrofornecedorform-logradouro').val('...');
                $('#precadastrofornecedorform-bairro').val('...');
            },
            success: function (data) {
                $('#fld-estado').val(data.estadoId).trigger('change');
                $('#fld-cidade').val(data.cidadeId).trigger('change');
                $('#comboCidadeByUf').hide('fast');
                $('#endereco-cidade-div').show('slow');
                $('#endereco-cidade').val(data.cidadeId).trigger('change');
                $('#precadastrofornecedorform-logradouro').val(data.rua);
                $('#precadastrofornecedorform-bairro').val(data.bairro);
            },
            error: function () {
                limpa_formulario_cep();
            }
        });
    });

    $('#precadastrofornecedorform-telefone').on('input', function(event) {
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
});