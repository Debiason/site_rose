var tableName = $('#tableName').val();
var fldBanco =  $('select[name="PreCadastroPessoaForm[banco_id]"]');
var fldConta =  $('input[name="PreCadastroPessoaForm[conta]"]');
var fldPessoa =  $('select[name="PreCadastroPessoaForm[tipo]"]');
var fldAgenciaDigito = $('input[name="PreCadastroPessoaForm[agenciadigito]"]');
var fldContaDigito = $('input[name="PreCadastroPessoaForm[contadigito]"]');
var fldFormaPagamento = $('input[name="PreCadastroPessoaForm[rmformapagamento]"]');
var fldDocumento = $("select[name='PreCadastroPessoaForm[documento]']");
var fldCnpj = $("input[name='PreCadastroPessoaForm[cnpj]']");
var fldNome = $("input[name='PreCadastroPessoaForm[nome]']");
var labelDocumento = $("label[for='precadastropessoaform-documento']");
var btnCadastrar = $('button[name="cadastrar"]');

$(document).ready(function () {

    var fisicaNacional = ['pagamentoautoral','pagamentofrete','reembolso','suprimentofundo','adiantamentoviagem','pagamentodiaria','pagamentopessoa']
    var fisicaInternacional = ['pagamentopessoainternacional']
    var fisicaJuridicaNacional = ['devolucaorecurso']
    var fisicaJuridicaInternacional = ['pagamentoinvoice']

    // oculta o select e seleciona a opção FisicaNacional do select. Executa a função FisicaNacional()
    for (var i = 0; i < fisicaNacional.length; i++) {
        if ($('#tableName').val() == fisicaNacional[i]) {
            $("label[for='precadastropessoaform-tipo']").hide();
            $('select[name="PreCadastroPessoaForm[tipo]"]').hide();

            $("#precadastropessoaform-tipo option[value='FisicaNacional']").attr({ selected : "selected" });

            $('#tableName').ready(function() {
                FisicaNacional();
            });
        }
    }

    // oculta o select e seleciona a opção FisicaInternacional do select. Executa a função FisicaInternacional()
    for (var i = 0; i < fisicaInternacional.length; i++) {
        if ($('#tableName').val() == fisicaInternacional[i]) {
            $("label[for='precadastropessoaform-tipo']").hide();
            $('select[name="PreCadastroPessoaForm[tipo]"]').hide();

            $("#precadastropessoaform-tipo option[value='FisicaInternacional']").attr({ selected : "selected" });

            $('#tableName').ready(function() {
                FisicaInternacional();
            });
        }
    }

    // remove opção física e juridica internacioanl do select
    for (var i = 0; i < fisicaJuridicaNacional.length; i++) {
        if ($('#tableName').val() == fisicaJuridicaNacional[i]) {

            $("#precadastropessoaform-tipo option[value='JuridicaInternacional']").remove();
            $("#precadastropessoaform-tipo option[value='FisicaInternacional']").remove();
        }
    }

    // remove opção física e juridica nacional do select
    for (var i = 0; i < fisicaJuridicaInternacional.length; i++) {
        if ($('#tableName').val() == fisicaJuridicaInternacional[i]) {
            $("#precadastropessoaform-tipo option[value='JuridicaNacional']").remove();
            $("#precadastropessoaform-tipo option[value='FisicaNacional']").remove();
        }
    }

    if ($('#tableName').val() == 'pagamentonotafiscal') {
        $("label[for='precadastropessoaform-tipo']").hide();
        $('select[name= "PreCadastroPessoaForm[tipo]"]').hide();
        $('select[name= "PreCadastroPessoaForm[produtorRuralTipo]"]').hide();
        $("label[for='precadastropessoaform-produtorruraltipo']").hide();
        $('input[name="PreCadastroPessoaForm[produtorRural]"]').on('click', function(){
            if($(this).is(':checked')) {
                ProdutorRural();
            } else {
                NotProdutorRural();
            }
        });

        $('select[name="PreCadastroPessoaForm[tipo]"]').ready(function () {

            switch ($('select[name="PreCadastroPessoaForm[tipo]"]').val()) {
                case "FisicaNacional":
                    FisicaNacional();
                    break;
                case "JuridicaNacional":
                    JuridicaNacional();
                    break;
                case "FisicaInternacional":
                    FisicaInternacional();
                    break;
                case "JuridicaInternacional":
                    JuridicaInternacional();
                    break;
            }
        });
    }

    $("input[name='PreCadastroPessoaForm[mei]']").click( function () {
        if ($("input[name='PreCadastroPessoaForm[mei]']").is(':checked')) {
            fldDocumento.show();
            fldDocumento.prop('required', true);
            labelDocumento.show();

        } else{
            fldDocumento.hide();
            fldDocumento.prop('required', false);
            labelDocumento.hide();
        }
    })

    fldCnpj.change(atualizaDocumento);
    fldNome.change(atualizaDocumento);
    $("input[name='PreCadastroPessoaForm[mei]']").change(atualizaDocumento);
    function atualizaDocumento(){
        if ($("input[name='PreCadastroPessoaForm[mei]']").is(':checked')) {
            var palavras = fldNome.val().split(' ');
            var cpf = palavras[palavras.length - 1];
            var cpfEstilizado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

            let cpfFormatado = parseInt(cpf.replace(/[.-]/g, ''));
            let cnpjFormatado = parseInt(fldCnpj.val().replace(/[./-]/g, ''));

            fldDocumento.children('option:not(:first)').remove();
            fldDocumento.append('<option value="' + cnpjFormatado + '">CNPJ: ' + fldCnpj.val() + '</option>');
            fldDocumento.append('<option value="' + cpfFormatado + '">CPF: ' + cpfEstilizado + '</option>');
        }
    };

    $('select[name="PreCadastroPessoaForm[tipo]"]').change(function () {

        switch ($('select[name="PreCadastroPessoaForm[tipo]"]').val()) {
            case "FisicaNacional":
                FisicaNacional();
                break;
            case "JuridicaNacional":
                JuridicaNacional();
                break;
            case "FisicaInternacional":
                FisicaInternacional();
                break;
            case "JuridicaInternacional":
                JuridicaInternacional();
                break;
        }
    });

    $('#precadastropessoaform-cpf').blur(function () {
        $.verificaPessoaExiste('cpf' , $(this).val())
    });

    $('#precadastropessoaform-cnpj').blur(function () {
        $.verificaPessoaExiste('cnpj' , $(this).val())
    });

    $('#precadastropessoaform-nome').blur(function () {
        $.verificaPessoaExiste('nome' , $(this).val())
    });

    $('#precadastropessoaform-cpf').hide();
    $("label[for='precadastropessoaform-cpf']").hide();

    $('#precadastropessoaform-rg').hide();
    $("label[for='precadastropessoaform-rg']").hide();

    $('#precadastropessoaform-rgemissor').hide();
    $("label[for='precadastropessoaform-rgemissor']").hide();

    $('#precadastropessoaform-pis').hide();
    $("label[for='precadastropessoaform-pis']").hide();

    $('#precadastropessoaform-cnpj').hide();
    $("label[for='precadastropessoaform-cnpj']").hide();

    $('.dtnascimento').hide();

    $('.enderecoInternacional').hide();
    $('.descricaoEndereco').hide();
    $('.genero').hide();

    $("input[name='PreCadastroPessoaForm[mei]']").hide();
    $("label[for='precadastropessoaform-mei']").hide();

    $("select[name='PreCadastroPessoaForm[documento]']").hide();
    $("label[for='precadastropessoaform-documento']").hide();

    $('.msgPessoaJaExiste').hide();

    $("#pre-cadastro-telefone").on('input', function(event) {
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

        validaDadosTelefone();
    });

    $("#pre-cadastro-email").on('input', function() {
        validaDadosEmail();
    });

});

function FisicaNacional() {
    $('#precadastropessoaform-cpf').show();
    $("label[for='precadastropessoaform-cpf']").show();

    $('#precadastropessoaform-rg').show();
    $("label[for='precadastropessoaform-rg']").show();

    $('#precadastropessoaform-rgemissor').show();
    $("label[for='precadastropessoaform-rgemissor']").show();

    $('#precadastropessoaform-pis').show();
    $("label[for='precadastropessoaform-pis']").show();

    $('#precadastropessoaform-cnpj').hide();
    $("label[for='precadastropessoaform-cnpj']").hide();

    $('.genero').show();

    $('.enderecoBrasileiro').show();
    $('.enderecoInternacional').hide();
    $('.passaporte').hide();
    $("input[name='PreCadastroPessoaForm[mei]']").hide();
    $("label[for='precadastropessoaform-mei']").hide();

    $('#fld-pais').prop('disabled', true);
    $('#fld-pais').val("30").trigger("change");

    $('.dtnascimento').show();

    $('.tipoEntidadeJuridica').hide();

    buscaEnderecoPorCep();
}

function JuridicaNacional() {
    $('#precadastropessoaform-cnpj').show();
    $("label[for='precadastropessoaform-cnpj']").show();

    $('#precadastropessoaform-pis').hide();
    $("label[for='precadastropessoaform-pis']").hide();

    $('#precadastropessoaform-cpf').hide();
    $("label[for='precadastropessoaform-cpf']").hide();

    $('#precadastropessoaform-rg').hide();
    $("label[for='precadastropessoaform-rg']").hide();

    $('#precadastropessoaform-rgemissor').hide();
    $("label[for='precadastropessoaform-rgemissor']").hide();

    $('.genero').hide();

    $('.enderecoBrasileiro').show();
    $('.enderecoInternacional').hide();
    $('.passaporte').hide();

    $("input[name='PreCadastroPessoaForm[mei]']").show();
    $("label[for='precadastropessoaform-mei']").show();

    $('#fld-pais').prop('disabled', true);
    $('#fld-pais').val("30").trigger("change");

    $('.dtnascimento').hide();

    $('.tipoEntidadeJuridica').show();

    buscaEnderecoPorCep();
}

function FisicaInternacional() {
    $('#precadastropessoaform-cpf').hide();
    $("label[for='precadastropessoaform-cpf']").hide();

    $('#precadastropessoaform-rg').hide();
    $("label[for='precadastropessoaform-rg']").hide();

    $('#precadastropessoaform-rgemissor').hide();
    $("label[for='precadastropessoaform-rgemissor']").hide();

    $('#precadastropessoaform-pis').hide();
    $("label[for='precadastropessoaform-pis']").hide();

    $('#precadastropessoaform-cnpj').hide();
    $("label[for='precadastropessoaform-cnpj']").hide();

    $('.genero').show();

    $('.enderecoBrasileiro').hide();
    $('.enderecoInternacional').show();
    $('.passaporte').show();

    $('.dtnascimento').hide();

    $('.tipoEntidadeJuridica').hide();
}

function JuridicaInternacional() {
    $('#precadastropessoaform-cpf').hide();
    $("label[for='precadastropessoaform-cpf']").hide();

    $('#precadastropessoaform-rg').hide();
    $("label[for='precadastropessoaform-rg']").hide();

    $('#precadastropessoaform-rgemissor').hide();
    $("label[for='precadastropessoaform-rgemissor']").hide();

    $('#precadastropessoaform-pis').hide();
    $("label[for='precadastropessoaform-pis']").hide();

    $('#precadastropessoaform-cnpj').hide();
    $("label[for='precadastropessoaform-cnpj']").hide();

    $('.genero').hide();

    $('.enderecoBrasileiro').hide();
    $('.enderecoInternacional').show();
    $('.passaporte').hide();

    $('.dtnascimento').hide();

    $('.tipoEntidadeJuridica').show();
}

function ProdutorRural() {
    $('#precadastropessoaform-cpf').show();
    $("label[for='precadastropessoaform-cpf']").show();

    $('#precadastropessoaform-rg').show();
    $("label[for='precadastropessoaform-rg']").show();

    $('#precadastropessoaform-rgemissor').show();
    $("label[for='precadastropessoaform-rgemissor']").show();

    $('#precadastropessoaform-pis').show();
    $("label[for='precadastropessoaform-pis']").show();
}

function NotProdutorRural() {
    $('#precadastropessoaform-cpf').hide();
    $("label[for='precadastropessoaform-cpf']").hide();

    $('#precadastropessoaform-rg').hide();
    $("label[for='precadastropessoaform-rg']").hide();

    $('#precadastropessoaform-rgemissor').hide();
    $("label[for='precadastropessoaform-rgemissor']").hide();

    $('#precadastropessoaform-pis').hide();
    $("label[for='precadastropessoaform-pis']").hide();
}

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
});

fldConta.change(validaDadosconta);
fldBanco.change(validaDadosconta);

function validaDadosconta() {
    let bancoId = fldBanco.val();
    let permitePoupanca = document.getElementById('permite-conta-poupanca').value;

    //verificacoes para caixa economida federal
    if (bancoId == 116){

        let conta = fldConta.val();
        let primeirosDigidos = conta.slice(0,3);
        var msgConta = '';

        //pessoa fisica conta comeca com 001 e juridica com 003, ambas seguidas de 8 caracteres
        if (fldPessoa.val() == 'FisicaNacional' && ((primeirosDigidos != '001' || conta.length != 11)) || (primeirosDigidos != '001' && conta.length != 9)) {

            if (permitePoupanca) {
                if ((conta.length != 11) && primeirosDigidos != '013'){
                    msgConta = 'A conta bancária de pessoa física para Caixa Econômica Federal possui as seguintes regras: ' +
                        '<ul>' +
                        '  <li>A conta deve possuir 9 dígitos quando não começar com "001"</li>' +
                        '  <li>A conta deve possuir 11 dígitos quando começar com "001"</li>' +
                        '</ul><br/>' +
                        'A conta poupança deve começar com "013", seguido de 8 caracteres';
                }
            } else {
                msgConta = 'A conta bancária de pessoa física para Caixa Econômica Federal possui as seguintes regras: ' +
                    '<ul>' +
                    '  <li>A conta deve possuir 9 dígitos quando não começar com "001"</li>' +
                    '  <li>A conta deve possuir 11 dígitos quando começar com "001"</li>' +
                    '</ul>';
            }

        } else if (fldPessoa.val() == 'JuridicaNacional' && (primeirosDigidos != '003' || conta.length != 11)) {
            msgConta = 'A conta bancária de pessoa jurídica para Caixa Econômica Federal deve começar com 003 seguido de 8 caracteres.';
        } else {
            msgConta = '';
        }

        if (primeirosDigidos == '013' && !permitePoupanca) {
            msgConta = 'A conta bancária deve ser uma conta corrente';
        }

        if (msgConta != ''){
            $(".aviso-validacao-conta").html(msgConta);
            $(".aviso-validacao-conta").show('slow');
        } else {
            $(".aviso-validacao-conta").hide('slow');
        }
    }
}

fldAgenciaDigito.change(validaDadosAgenciaDigito);

function validaDadosAgenciaDigito() {
    var agenciaDigito = fldAgenciaDigito.val();
    var tipoBanco = $('#fld-banco').val();

    if (tipoBanco == 1) {
        if ($.isNumeric(agenciaDigito) || agenciaDigito == 'X' || agenciaDigito == 'x') {
            btnCadastrar.attr('disabled', false);
            $(".aviso-validacao-conta").text("");
            return true;
        } else {
            btnCadastrar.attr('disabled', true);
            $(".aviso-validacao-conta").text("Digite apenas número ou letra X");
            return false;
        }
    } else {
        if ($.isNumeric(agenciaDigito) || agenciaDigito == 'X' || agenciaDigito == 'x' || agenciaDigito == '') {
            btnCadastrar.attr('disabled', false);
            $(".aviso-validacao-conta").text("");
            return true;
        } else {
            btnCadastrar.attr('disabled', true);
            $(".aviso-validacao-conta").text("Digite apenas número ou letra X");
            return false;
        }
    }
}

fldContaDigito.change(validaDadosContaDigito);

function validaDadosContaDigito() {
    var contaDigito = fldContaDigito.val();

    if (($.isNumeric(contaDigito) || contaDigito == 'X' || contaDigito == 'x') && validaDadosAgenciaDigito()) {
        btnCadastrar.attr('disabled', false);
        $(".aviso-validacao-conta").text("");
    } else {
        btnCadastrar.attr('disabled', true);
        $(".aviso-validacao-conta").text("Digite apenas número ou letra X");

    }
}

function validaDadosTelefone() {
    $("#pre-cadastro-telefone").on('blur', function(event) {
        let inputValue = $("#pre-cadastro-telefone").val();

        if (inputValue.length < 9 && inputValue.length != 0) {
            btnCadastrar.attr('disabled', true);
            $("#pre-cadastro-telefone").addClass('is-invalid');
            $(".aviso-validacao-telefone").text("Digite um número válido");
        } else {
            btnCadastrar.attr('disabled', false);
            $("#pre-cadastro-telefone").removeClass('is-invalid');
            $("#pre-cadastro-telefone").addClass('is-valid');
            $(".aviso-validacao-telefone").text("");
        }
    });
}

function validaDadosEmail() {
    $("#pre-cadastro-email").on('blur', function(event) {
        let inputValue = $("#pre-cadastro-email").val();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (inputValue.length != 0 && !emailRegex.test(inputValue)) {
            btnCadastrar.attr('disabled', true);
            $("#pre-cadastro-email").addClass('is-invalid');
            $(".aviso-validacao-email").text("Digite um email válido");
        } else {
            btnCadastrar.attr('disabled', false);
            $("#pre-cadastro-email").removeClass('is-invalid');
            $("#pre-cadastro-email").addClass('is-valid');
            $(".aviso-validacao-email").text("");
        }
    });
}

function buscaEnderecoPorCep() {
    function limpa_formulario_cep() {
        $('#comboCidadeByUf').show('');
        $('#endereco-cidade-div').hide('');
        $('#fld-cidade').val('').trigger('change');
        $('#endereco-cidade').val('').trigger('change');
        $('#fld-estado').val('').trigger('change');
        $('#precadastropessoaform-logradouro').val('');
        $('#precadastropessoaform-bairro').val('');
    }

    $('#precadastropessoaform-cep').on('blur', function () {
        var cep = $('#precadastropessoaform-cep').val(); // obtém o valor do CEP do input
        $.ajax({
            url: '/endereco/get-endereco-by-cep',
            type: 'GET',
            dataType: 'json',
            data: {
                cep: cep
            },
            beforeSend: function (data) {
                $('#fld-cidade').val('...').trigger('change');
                $('#endereco-cidade').val('...').trigger('change');
                $('#fld-estado').val('...').trigger('change');
                $('#precadastropessoaform-logradouro').val('...');
                $('#precadastropessoaform-bairro').val('...');
            },
            success: function (data) {
                $('#fld-estado').val(data.estadoId).trigger('change');
                $('#fld-cidade').val(data.cidadeId).trigger('change');
                $('#comboCidadeByUf').hide('fast');
                $('#endereco-cidade-div').show('slow');
                $('#endereco-cidade').val(data.cidadeId).trigger('change');
                $('#precadastropessoaform-logradouro').val(data.rua);
                $('#precadastropessoaform-bairro').val(data.bairro);
            },
            error: function () {
                limpa_formulario_cep();
            }
        });
    });
}