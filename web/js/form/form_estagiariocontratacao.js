var fldpessoaNome = $("#nomePessoa"),
    fldpessoaid = $("input[name='BolsistaContratacao[pessoa_id]']"),
    fldcpf = $("#estagiariocontratacao-cpf");

//triggers
fldcpf.blur(controlComboPessoa);


$.ajax({
    url: '/pessoa-juridica-nacional/get-executora/',
    data: {
        id: $("#acordoId").val()
    },
    async: false,
    success: function (resp) {
        var isEmbrapa = resp.embrapa ?? false;

        if (isEmbrapa == true) {
            $(".field-matriculaInput").hide();
            $("#div-dados-embrapa").show();
            $(".form-text.text-muted.small").text('Sendo afirmativa a resposta, o estágio não poderá ser concedido, conforme disposto na Súmula Vinculante nº 13/2008');
        }
    }
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
                $('#estagiarioDados :input:not(#estagiariocontratacao-cpf)').val('');
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
        url: '/estagiario-contratacao/get-dados-estagiario/',
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
            $('#estagiariocontratacao-dt_nascimento-disp').val(dataFormatada);

            switch (resp.pessoaFisicaNacional.genero) {
                case 'Masculino':
                    $('#estagiariocontratacao-genero').val('Masculino');
                    break;
                case 'Feminino':
                    $('#estagiariocontratacao-genero').val('Feminino');
                    break;
                case 'Nao informado':
                    $('#estagiariocontratacao-genero').val('Não informado');
                    break;
            }

            $('#rgInput').val(resp.pessoaFisicaNacional.rg);
            $('#emissorInput').val(resp.pessoaFisicaNacional.rgemissor);
            $('#ufInput').val(resp.pessoaFisicaNacional.rgestado);
            $('#matriculaInput').val(resp.pessoaFisicaNacional.siape);
            $('#tipologradouroInput').val(resp.endereco.tipologradouro_id);
            $('#logradouroInput').val(resp.endereco.logradouro);
            $('#complementoInput').val(resp.endereco.complemento);
            $('#bairroInput').val(resp.endereco.bairro);
            $('#estadoInput').val(resp.estado.id);
            $('#cidadeInput').val(resp.endereco.cidade_id);
            $('#estagiariocontratacao-cep').val(resp.endereco.cep).trigger('change');
            $('#emailInput').val(resp.emailPessoal.valor).trigger('change');
            $('#bancoInput').val(resp.contaBancaria.banco_id);
            $('#agenciaInput').val(resp.contaBancaria.agencia);
            $('#agenciaDigitoInput').val(resp.contaBancaria.agenciadigito);
            $('#contaInput').val(resp.contaBancaria.conta);
            $('#contaDigitoInput').val(resp.contaBancaria.contadigito);
        }
    });
}

$('#estagiariocontratacao-cep').on('change', function () {
    var cep = $('#estagiariocontratacao-cep').val(); // obtém o valor do CEP do input
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
            $('#estagiariocontratacao-logradouro').val('...');
            $('#estagiariocontratacao-bairro').val('...');
        },
        success: function (data) {
            $('#fld-estado').val(data.estadoId).trigger('change');
            $('#fld-cidade').val(data.cidadeId).trigger('change');
            $('#comboCidadeByUf').hide('fast');
            $('#endereco-cidade-div').show('slow');
            $('#endereco-cidade').val(data.cidadeId).trigger('change');
            $('#estagiariocontratacao-logradouro').val(data.rua);
            $('#estagiariocontratacao-bairro').val(data.bairro);
        },
        error: function () {
            $('#comboCidadeByUf').show('');
            $('#endereco-cidade-div').hide('');
            $('#fld-cidade').val('').trigger('change');
            $('#endereco-cidade').val('').trigger('change');
            $('#fld-estado').val('').trigger('change');
            $('#estagiariocontratacao-logradouro').val('');
            $('#estagiariocontratacao-bairro').val('');
        }
    });
});

$('#estagiariocontratacao-telefone').on('input', function(event) {
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