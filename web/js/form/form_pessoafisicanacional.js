var fldBanco =  $('select[name="ContaBancaria[banco_id]"]');
var fldConta =  $('input[name="ContaBancaria[conta]"]');
var fldAgencia =  $('input[name="ContaBancaria[agencia]"]');
var fldAgenciaDigito = $('input[name="ContaBancaria[agenciadigito]"]');
var fldContaDigito = $('input[name="ContaBancaria[contadigito]"]');
var fldFormaPagamento = $('input[name="ContaBancaria[rmformapagamento]"]');
var btnSalvar = $('button[name="salvar"]');
var fldTelefone = $("#contato-telefone");
var btnPreencherFormulario = $(".btn-preencher-data-nascimento");
var fldCpf = $("#pessoafisicanacional-cpf");

$(function(){

    // DADOS BANCÁRIOS
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

    // DADOS ENDEREÇO
    if($("#nao-tenho-informacoes-endereco").is(':checked')) {
        estadoCamposEndereco(true);
    }

    $("#nao-tenho-informacoes-endereco").on('click', function(){
        if($(this).is(':checked')) {
            estadoCamposEndereco(true);
        } else {
            estadoCamposEndereco(false);
        }
    });

    function estadoCamposEndereco(estado) {
        $("#box-dados-endereco input, #box-dados-endereco select").each(function(){
            $(this).val('');
            $(this).attr('disabled', estado);
        });
        var valor = estado ? 1 : 0;
        $("#nao-tenho-informacoes-endereco").val(valor);
        $("#nao-tenho-informacoes-endereco").attr('disabled', false);
    }
});

$(document).ready(function () {

    $('#pessoafisicanacional-cpf').blur(function () {
        $.verificaPessoaExiste('cpf' , $(this).val())
    });

    $('.msgPessoaJaExiste').hide();
});

fldConta.change(validaDadosconta);
fldBanco.change(validaDadosconta);
fldTelefone.change(validaDadosTelefone());

function validaDadosconta() {
    bancoId = fldBanco.val();

    //verificacoes para caixa economida federal
    if (bancoId == 116){

        conta = fldConta.val();
        primeirosDigidos = conta.slice(0,3);
        var msgConta = '';

        //pessoa fisica conta comeca com 001 e juridica com 003, ambas seguidas de 8 caracteres
        if ((primeirosDigidos == '001' && conta.length != 11) || (primeirosDigidos != '001' && conta.length != 9)) {
            msgConta = 'A conta bancária de pessoa física para Caixa Econômica Federal possui as seguintes regras: ' +
                '<ul>' +
                '  <li>A conta deve possuir 9 dígitos quando não começar com "001"</li>' +
                '  <li>A conta deve possuir 11 dígitos quando começar com "001"</li>' +
                '</ul>';
        } else {
            msgConta = '';
        }

        if (msgConta != ''){
            $(".aviso-validacao-conta").html(msgConta);
            $(".aviso-validacao-conta").show('slow');
        } else {
            $(".aviso-validacao-conta").hide('slow');
        }
    }
}

$("#nao-tenho-informacoes-bancarias").change(function (){
    if (this.checked) {
        $(".aviso-validacao-conta").text('');
        btnSalvar.attr('disabled', false);
    }
})

$('#fld-banco').change(function () {

    if ($('#fld-banco').val() == 1) {
        $('#contabancaria-rmformapagamento').val('T');
    } else {
        $('#contabancaria-rmformapagamento').val('D');
    }
});

fldAgenciaDigito.change(validaDadosAgenciaDigito);

function validaDadosAgenciaDigito() {
    var agenciaDigito = document.querySelector('input[name="ContaBancaria[agenciadigito]"]').value;
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
    btnPreencherFormulario.click(preencherViaAPI);

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
    function preencherViaAPI() {
        btnPreencherFormulario.prop('disabled', true)
        setTimeout(function(){
            btnPreencherFormulario.prop('disabled', false);
        }, 10000);

        var cpf = fldCpf.val().replace(/[^\d]+/g,'');
        if(cpf.length != 11){
            toastr.error('CPF não tem 11 dígitos')
            return false
        }

        if(cpf == ''){
            return false;
        }

        console.log('Preenchendo... CPF: '+fldCpf.val());

        fnbPageBlock();

        $.ajax({
            url: '/pessoa-fisica-nacional/get-dados-api?cpf=' + cpf,
            async: false,
            success: function (resp) {
                if(resp.status == 1){
                    $("input[name='PessoaFisicaNacional[nome]']").val(resp.nome);
                    $("#pessoafisicanacional-dtnascimento-disp").val(resp.nascimento).trigger('change');
                    if(resp.genero == 'F'){
                        $('input[name="PessoaFisicaNacional[genero]"][value="Feminino"]').prop('checked', true);
                    }
                    if(resp.genero == 'M'){
                        $('input[name="PessoaFisicaNacional[genero]"][value="Masculino"]').prop('checked', true);
                    }

                    if (window.location.href.indexOf("update") > -1) {
                        $('input[name="PessoaFisicaNacional[nomemae]"]').val(resp.mae);
                    }
                    toastr.success('Dados inseridos.')

                } else {
                    toastr.error('Erro ao buscar dados "' + resp.erro +'"')
                }
                fnbPageUnblock();
            }
        });
    }
});

