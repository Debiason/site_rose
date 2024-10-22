var btnPreencherFormulario = $(".btn-preencher-formulario");
var fldCnpj = $("input[name='PessoaJuridicaNacional[cnpj]']");
var fldMei = $("input[name='PessoaJuridicaNacional[mei]']");
var fldTipoEntidade = $("select[name='PessoaJuridicaNacional[tipoentidadejuridica_id]']");
var fldEmpresa = $("select[name='PessoaJuridicaNacional[pessoajuridica_id]']");
var comboCPFCNPJ = $('#comboCPFCNPJ');
var comboEmpresaFilial = $('#empresaFilial');
var labelEntidadePai = $('#label-entidade-pai');
var fldBanco =  $('select[name="ContaBancaria[banco_id]"]');
var fldConta =  $('input[name="ContaBancaria[conta]"]');
var fldPublico = $("input[name='PessoaJuridicaNacional[publico]']");
var fldPublicoClassicacao = $("input[name='PessoaJuridicaNacional[publico_classificacao]']");
var fldAgencia =  $('input[name="ContaBancaria[agencia]"]');
var fldAgenciaDigito = $('input[name="ContaBancaria[agenciadigito]"]');
var fldContaDigito = $('input[name="ContaBancaria[contadigito]"]');
var btnSalvar = $('button[name="salvar"]');
var fldTelefone = $("#contato-telefone");

//triggers
btnPreencherFormulario.click(preencherViaReceita);
fldMei.change(preencherCPFCNPJ);
fldEmpresa.change(preencherCPFCNPJ);
fldTipoEntidade.change(verificaEntidadePai);
fldTelefone.change(validaDadosTelefone());

fldPublico.change(function () {
    var radioValue = $("input[name='PessoaJuridicaNacional[publico]']:checked").val();
    $.verificaPublicoPrivado(radioValue, fldPublicoClassicacao);
});

fldPublico.ready(function () {
    var radioValue = $("input[name='PessoaJuridicaNacional[publico]']:checked").val();
    $.verificaPublicoPrivado(radioValue, fldPublicoClassicacao);
});

$(document).ready(function () {
    comboCPFCNPJ.hide();
    comboEmpresaFilial.hide();

    $('#pessoajuridicanacional-cnpj').blur(function () {
        $.verificaPessoaExiste('cnpj' , $(this).val())
    });

    $('.msgPessoaJaExiste').hide();
});

function preencherViaReceita() {
    var cnpj = fldCnpj.val().replace(/[^\d]+/g,'');

    if(cnpj == ''){
        return false;
    }

    console.log('Preenchendo com dados da Receita... CNPJ: '+fldCnpj.val());

    fnbPageBlock();

    $.ajax({
        url: '/pessoa-juridica-nacional/get-dados-receita?cnpj=' + cnpj,
        async: false,
        success: function (resp) {
            $("input[name='PessoaJuridicaNacional[nome]']").val(resp.nome);
            $("input[name='PessoaJuridicaNacional[razaosocial]']").val(resp.nome);
            $("input[name='PessoaJuridicaNacional[inscricaosocial]']").val(resp.nome);

            $("input[name='Contato[email]']").val(resp.email);
            $("input[name='Contato[telefone]']").val(resp.telefone);

            $("#fld-estado").val(resp.estado_id).trigger('change');
            var newOption = new Option(resp.cidade_nome, resp.cidade_id, true, true);
            $('#fld-cidade').append(newOption).trigger('change');
            $("#fld-cidade").removeAttr('disabled');

            $("input[name='Endereco[comercial]']").attr('checked', true);
            $("select[name='Endereco[tipologradouro_id]']").val(23);
            $("input[name='Endereco[logradouro]']").val(resp.logradouro);
            $("input[name='Endereco[bairro]']").val(resp.bairro);
            $("input[name='Endereco[numero]']").val(resp.numero);
            $("input[name='Endereco[complemento]']").val(resp.complemento);
            $("input[name='Endereco[cep]']").val(resp.cep);

            fnbPageUnblock();
        }
    });
}

$(function(){
    if($("#nao-tenho-informacoes-bancarias").is(':checked')) {
        estadoCamposBancarios(true);
    }

    $("#nao-tenho-informacoes-bancarias").on('click', function(){
        if($(this).is(':checked')) {
            estadoCamposBancarios(true);
        } else {
            estadoCamposBancarios(false);
        }
    });

    function estadoCamposBancarios(estado) {
        $("#box-dados-bancarios input, #box-dados-bancarios select").each(function(){
            $(this).val('');
            $(this).attr('disabled', estado);
        });
        var valor = estado ? 1 : 0;
        $("#nao-tenho-informacoes-bancarias").val(valor);
        $("#nao-tenho-informacoes-bancarias").attr('disabled', false);
    }
});

function preencherCPFCNPJ() {

    var fldRazaoSocial = $("input[name='PessoaJuridicaNacional[razaosocial]']");
    var selectCPFCNPJ = $("select[id='fld-documento']");
    var cnpj = fldCnpj.val();
    razaoSocial = fldRazaoSocial.val();
    cpf = razaoSocial.substr(razaoSocial.length - 11);


    //se empresa tipo MEI
    if (fldMei.is(':checked')) {

        comboCPFCNPJ.show('slow');

        selectCPFCNPJ.append($('<option>', {
            value: cnpj.replace(/[^\d]+/g,''),
            text: 'CNPJ: ' + cnpj
        }));
        selectCPFCNPJ.append($('<option>', {
            value: cpf,
            text: 'CPF: ' + $.mascaraCPF(cpf)
        }));

    } else {
        comboCPFCNPJ.hide('slow');

        if (fldEmpresa.val() != null){

            comboCPFCNPJ.show('slow');

            $.ajax({
                url: '/pessoa-juridica-nacional/get-cnpj-filial',
                data: {
                    id: fldEmpresa.val()
                },
                async: false,
                success: function (resp) {

                    selectCPFCNPJ.append($('<option>', {
                        value: cnpj.replace(/[^\d]+/g,''),
                        text: 'CNPJ: ' + cnpj
                    }));

                    selectCPFCNPJ.append($('<option>', {
                        value: resp,
                        text: 'CNPJ Filial: ' + $.mascaraCNPJ(resp)
                    }));
                }
            });
        }
    }

}

function verificaEntidadePai() {

    const tipoEntidade = fldTipoEntidade.val();

    $.ajax({
        url: '/pessoa-juridica-nacional/get-tipo-entidade',
        data: {
        },
        async: false,
        success: function (resp) {
            if (resp[tipoEntidade]['pai_id'] != null) {
                comboEmpresaFilial.show('slow');
                const pai = resp[tipoEntidade]['pai_id'];
                labelEntidadePai.text(resp[pai]['nome']);
            } else {
                comboEmpresaFilial.hide('slow');
            }
        }
    });
}

fldBanco.change(validaDadosconta);
fldConta.change(validaDadosconta);

function validaDadosconta() {
    bancoId = fldBanco.val();

    //verificacoes para caixa economida federal
    if (bancoId == 116){

        conta = fldConta.val();
        primeirosDigidos = conta.slice(0,3);
        var msgConta = '';

        //pessoa fisica conta comeca com 001 e juridica com 003, ambas seguidas de 8 caracteres
        if (primeirosDigidos != '003' || conta.length != 11) {
            msgConta = 'A conta bancária de pessoa jurídica para Caixa Econômica Federal deve começar com 003 seguido de' +
                ' 8 caracteres';
        } else {
            msgConta = '';
        }

        if (msgConta != ''){
            $(".aviso-validacao-conta").text(msgConta);
            $(".aviso-validacao-conta").show('slow');
        } else {
            $(".aviso-validacao-conta").hide('slow');
        }
    }
}

$('#fld-banco').change(function () {
    if ($('#fld-banco').val() == 1) {
        $('#contabancaria-rmformapagamento').val('T');
    } else {
        $('#contabancaria-rmformapagamento').val('D');
    }
});

fldAgenciaDigito.change(validaDadosAgenciaDigito);

function validaDadosAgenciaDigito() {
    var agenciaDigito = fldAgenciaDigito.val();
    var tipoBanco = $('#fld-banco').val();

    if (tipoBanco == 1) {
        if ($.isNumeric(agenciaDigito) || agenciaDigito == 'X' || agenciaDigito == 'x') {
            btnSalvar.attr('disabled', false);
            $(".aviso-validacao-conta").text("");
            return true;
        } else {
            btnSalvar.attr('disabled', true);
            $(".aviso-validacao-conta").text("Digite apenas número ou letra X");
            return false;
        }
    } else {
        if ($.isNumeric(agenciaDigito) || agenciaDigito == 'X' || agenciaDigito == 'x' || agenciaDigito == '') {
            btnSalvar.attr('disabled', false);
            $(".aviso-validacao-conta").text("");
            return true;
        } else {
            btnSalvar.attr('disabled', true);
            $(".aviso-validacao-conta").text("Digite apenas número ou letra X");
            return false;
        }
    }
}

fldContaDigito.change(validaDadosContaDigito);

function validaDadosContaDigito() {
    var contaDigito = fldContaDigito.val();

    if (($.isNumeric(contaDigito) || contaDigito == 'X' || contaDigito == 'x') && validaDadosAgenciaDigito()) {
        btnSalvar.attr('disabled', false);
        $(".aviso-validacao-conta").text("");
    } else {
        btnSalvar.attr('disabled', true);
        $(".aviso-validacao-conta").text("Digite apenas número ou letra X");

    }
}

function validaDadosTelefone() {
    $('#contato-telefone').on('input', function(event) {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');

        if (inputValue.length > 13) {
            inputValue = inputValue.substring(0, 13);
        }

        if (inputValue.length <= 11) {
            if (inputValue.length === 8) {
                inputValue = inputValue.replace(/^(\d{4})(\d{4})$/, '$1-$2');
            } else if (inputValue.length === 9) {
                inputValue = inputValue.replace(/^(\d{5})(\d{4})$/, '$1-$2');
            } else {
                inputValue = inputValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
            }
        } else {
            inputValue = inputValue.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4');
        }
        event.target.value = inputValue;
    });

    $("#contato-telefone").on('blur', function(event) {
        let inputValue = $("#contato-telefone").val();

        if (inputValue.length < 9 && inputValue.length != 0) {
            $("#contato-telefone").addClass('is-invalid');
        } else {
            $("#contato-telefone").removeClass('is-invalid');
            $("#contato-telefone").addClass('is-valid');
        }
    });
}

$(document).ready(function () {
    function limpa_formulário_cep() {
        $('#comboCidadeByUf').show('slow');
        $('#endereco-cidade-div').hide('slow');
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
                $('#fld-cidade').prop('disabled', false);
                $('#fld-cidade').val(data.cidadeId).trigger('change');
                $('#comboCidadeByUf').hide('fast');
                $('#endereco-cidade-div').show('slow');
                $('#endereco-cidade').val(data.cidadeId).trigger('change');
                $('#endereco-logradouro').val(data.rua);
                $('#endereco-bairro').val(data.bairro);
            },
            error: function () {
                limpa_formulário_cep();
            }
        });
    });
});
