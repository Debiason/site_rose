var fldBanco =  $('select[name="ContaBancaria[banco_id]"]');
var fldConta =  $('input[name="ContaBancaria[conta]"]');
var fldPessoa =  $('#pessoa-tipo');
var fldAgencia =  $('input[name="ContaBancaria[agencia]"]');
var fldAgenciaDigito = $('input[name="ContaBancaria[agenciadigito]"]');
var fldContaDigito = $('input[name="ContaBancaria[contadigito]"]');
var fldFormaPagamento = $('input[name="ContaBancaria[rmformapagamento]"]');
var btnSalvar = $('button[name="salvar"]');

$('#fld-banco').change(function () {
    if ($('#fld-banco').val() == 1) {
        $('#contabancaria-rmformapagamento').val('T');
    } else {
        $('#contabancaria-rmformapagamento').val('D');
    }
});

fldBanco.change(validaDadosconta);
fldConta.change(validaDadosconta);

function validaDadosconta() {
    bancoId = fldBanco.val();

    //verificacoes para caixa economida federal
    if (bancoId == 116){
        conta = fldConta.val();
        primeirosDigidos = conta.slice(0,3);
        primeirosDigitos = conta.slice(0,4);
        var msgConta = '';

        //pessoa fisica conta comeca com 001 e juridica com 003, ambas seguidas de 8 caracteres
        if (fldPessoa.val() == 'FisicaNacional') {
            if ((primeirosDigidos == '001' && conta.length != 11) || (primeirosDigidos != '001' && conta.length != 9)) {
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

        if (msgConta != ''){
            console.log(msgConta);
            $(".aviso-validacao-conta").html(msgConta);
            $(".aviso-validacao-conta").show('slow');
        } else {
            $(".aviso-validacao-conta").hide('slow');
        }
    }
}


fldAgencia.change(validaDadosAgencia);

function validaDadosAgencia() {
    var agencia = fldAgencia.val();
    if ($.isNumeric(agencia)) {
        $(".aviso-validacao-conta").text("");
    } else {
        $(".aviso-validacao-conta").text("Digite apenas números");

        $("button[name='enviar']").click(function () {
            var btn = $(this);
            btn.prop('disabled', true);
        });
    }
}

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

var tipopessoa = fldPessoa.val()
if (tipopessoa == 'JuridicaInternacional') {
    $("#dadosContaBancaria").hide();
    $("#div-agencia").hide();
    $("#div-conta-digito").hide();
}