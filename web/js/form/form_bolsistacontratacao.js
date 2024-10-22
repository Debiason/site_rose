var fldpessoaNome = $("#nomePessoa"),
    fldpessoaid = $("input[name='BolsistaContratacao[pessoa_id]']"),
    fldcpf = $("#bolsistacontratacao-cpf");

//triggers
fldcpf.on('blur', function () {
    controlComboPessoa();
});

function controlComboPessoa() {
    var valorcpf = fldcpf.val().replace(/[^0-9]/g, '');
    getNome(valorcpf);
}

function getNome(valorcpf) {
    $.ajax({
        url: '/pessoa/getnome/',
        data: {
            cpf: valorcpf
        },
        async: false,
        success: function (resp) {
            var retorno = (resp.nome == null ? '' : "<br><br><strong>Nome: </strong>" + resp.nome);

            fldpessoaNome.html(retorno);

            if (resp.nome == null || !resp.nome) {
                $('#pessoaIdInput').val('');
                $('#bolsistaDados :input:not(#bolsistacontratacao-cpf):not([type="radio"])').val('');
                $('#fld-cidade').val('').trigger('change.select2');
                $('#endereco-cidade').val('').trigger('change.select2');
                $('#fld-estado').val('').trigger('change');
            } else {
                fldpessoaid.val(resp.id);
                fldpessoaNome.show("slow");
                getDadosBolsista(resp.id);
            }
        }
    });
}

function getDadosBolsista(id) {
    $.ajax({
        url: '/bolsista-contratacao/get-dados-bolsista/',
        data: {
            pessoa_id: id
        },
        async: false,
        success: function (resp) {
            $('#nomeInput').val(resp.pessoaFisicaNacional.nome);
            $('#maeInput').val(resp.pessoaFisicaNacional.nomemae);
            $('#paiInput').val(resp.pessoaFisicaNacional.nomepai);

            $("input[name='BolsistaContratacao[dt_nascimento]']").val(resp.pessoaFisicaNacional.dtnascimento);
            let data = moment(resp.pessoaFisicaNacional.dtnascimento);
            let dataFormatada = data.format('DD/MM/YYYY');
            $('#bolsistacontratacao-dt_nascimento-disp').val(dataFormatada);

            switch (resp.pessoaFisicaNacional.genero) {
                case 'Masculino':
                    $('#bolsistacontratacao-genero').val('Masculino');
                    break;
                case 'Feminino':
                    $('#bolsistacontratacao-genero').val('Feminino');
                    break;
                case 'Nao informado':
                    $('#bolsistacontratacao-genero').val('Não informado');
                    break;
            }

            $('#rgInput').val(resp.pessoaFisicaNacional.rg);
            $('#emissorInput').val(resp.pessoaFisicaNacional.rgemissor);
            $('#ufInput').val(resp.pessoaFisicaNacional.rgestado);
            $('#siapeInput').val(resp.pessoaFisicaNacional.siape);

            $('#tipologradouroInput').val(resp.endereco.tipologradouro_id);
            $('#logradouroInput').val(resp.endereco.logradouro);
            $('#complementoInput').val(resp.endereco.complemento);
            $('#bairroInput').val(resp.endereco.bairro);
            $('#numeroInput').val(resp.endereco.numero);
            $('#estadoInput').val(resp.estado.id);
            $('#cidadeInput').val(resp.endereco.cidade_id);
            $('#bolsistacontratacao-cep').val(resp.endereco.cep).trigger('change');

            $('#emailInput').val(resp.email).trigger('change');
            $('#telefoneInput').val(resp.telefone).trigger('change');

            $('#bancoInput').val(resp.contaBancaria.banco_id).trigger('change');
            $('#agenciaInput').val(resp.contaBancaria.agencia);
            $('#agenciaDigitoInput').val(resp.contaBancaria.agenciadigito);
            $('#contaInput').val(resp.contaBancaria.conta);
            $('#contaDigitoInput').val(resp.contaBancaria.contadigito);
        }
    });
}

$('#bolsistacontratacao-cep').on('change', function () {
    var cep = $('#bolsistacontratacao-cep').val(); // obtém o valor do CEP do input
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
            $('#bolsistacontratacao-logradouro').val('...');
            $('#bolsistacontratacao-bairro').val('...');
        },
        success: function (data) {
            $('#fld-estado').val(data.estadoId).trigger('change');
            $('#fld-cidade').val(data.cidadeId).trigger('change');
            $('#comboCidadeByUf').hide('fast');
            $('#endereco-cidade-div').show('slow');
            $('#endereco-cidade').val(data.cidadeId).trigger('change');
            $('#bolsistacontratacao-logradouro').val(data.rua);
            $('#bolsistacontratacao-bairro').val(data.bairro);
        },
        error: function () {
            $('#comboCidadeByUf').show('');
            $('#endereco-cidade-div').hide('');
            $('#fld-cidade').val('').trigger('change');
            $('#endereco-cidade').val('').trigger('change');
            $('#fld-estado').val('').trigger('change');
            $('#bolsistacontratacao-logradouro').val('');
            $('#bolsistacontratacao-bairro').val('');
        }
    });
});

$(document).ready(function() {

    let inputBolsistaOutraInstituicao = $('input[name="BolsistaContratacao[bolsista_outra_instituicao]"]:checked');
    let inputEstudante = $('input[name="BolsistaContratacao[estudante]"]:checked');
    let inputServidorPublico = $('input[name="BolsistaContratacao[servidor_publico]"]:checked');

    if (inputBolsistaOutraInstituicao.val() == 1) {
        $('#instituicao_bolsista').show();
    }

    if (inputEstudante.val() == 1) {
        $('#div-estudante').show();
    }

    if (inputServidorPublico.val() == 1) {
        $('#div-matricula').show();
    }

    $('input[name="BolsistaContratacao[bolsista_outra_instituicao]"]').change(function() {
        if ($(this).val() == '1') {
            $('#instituicao_bolsista').show('slow');
        } else {
            $('#instituicao_bolsista').hide('slow');
        }
    });

    $('input[name="BolsistaContratacao[estudante]"]').change(function() {
        if ($(this).val() == '1') {
            $('#div-estudante').show('slow');
        } else {
            $('#div-estudante').hide('slow');
        }
    });

    $('input[name="BolsistaContratacao[servidor_publico]"]').change(function() {
        if ($(this).val() == '1') {
            $('#div-matricula').show('slow');
        } else {
            $('#div-matricula').hide('slow');
        }
    });

    $('#telefoneInput').on('input', function(event) {
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

    $('#contaInput, #agenciaInput').on('input', function(event) {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        event.target.value = inputValue;
    });
});