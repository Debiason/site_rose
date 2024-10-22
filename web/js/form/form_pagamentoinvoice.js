//elements
var
    fldTaxaCambio = $("input[name='PagamentoInvoice[taxacambio]'] , input[name='pagamentoinvoice-taxacambio-disp'] "),
    fldIRF = $("input[name='PagamentoInvoice[irf]'] , input[name='pagamentoinvoice-irf-disp'] "),
    fldValorDespesaBancaria = $(" input[name='PagamentoInvoice[valordespesabancaria]'], input[name='pagamentoinvoice-valordespesabancaria-disp']"),
    fldValorMoeda = $("input[name='PagamentoInvoice[valormoeda]'], input[name='pagamentoinvoice-valormoeda-disp']"),
    fldValorTotal = $("input[name='PagamentoInvoice[valor]'], input[name='pagamentoinvoice-valor-disp']"),
    fldValorReais = $("input[name='valor_reais']"),
    fldPagoComCartao = $("input[name='PagamentoInvoice[pagocomcartaocredito]']"),
    fldDataPagamento =  $("input[name='PagamentoInvoice[dtpagamento]'], input[name='dtpagamento-pagamentoinvoice-dtpagamento-disp']"),
    fldData = $("#dtreferenciacartaodiv"),
    btnSalvar = document.querySelector(".save-form"),
    comboSituacao = $("#fld-situacao");


//triggers
fldValorMoeda.change(calcValorTotal);
fldIRF.change(calcValorTotal);
fldTaxaCambio.change(calcValorTotal);
fldValorDespesaBancaria.change(calcValorTotal);
fldValorReais.change(calcValorTotal);
comboSituacao.change(verificaSituacao);

fldDataPagamento.on('change', function () {
    setTimeout(function () {
        verificarDataAntiga(document.getElementById('pagamentoinvoice-dtpagamento-disp').value);
    }, 100);
});

fldPagoComCartao.on('click', function () {
    $.pagoComCartao();
});

//functions
function calcValorTotal() {

    var valorMoeda = (fldValorMoeda.val() != '') ? $.converteMoedaFloat(fldValorMoeda.val()) : 0;
    var taxaCambio = (fldTaxaCambio.val() != '') ? $.converteMoedaFloat(fldTaxaCambio.val()) : 0;
    var IRF = (fldIRF.val() != '') ? $.converteMoedaFloat(fldIRF.val()) : 0;
    var valorReais = 0;
    var valorTotal = 0;

    if (taxaCambio) {
        valorReais = valorMoeda * taxaCambio ;
    } else {
        valorReais = valorMoeda ;
    }

    if (valorReais) {
        fldValorReais.val($.convertFloatToMoeda(valorReais));
    }

    valorReais = valorReais + IRF ;

    var valorDespesaBancaria = (typeof fldValorDespesaBancaria.val() !== 'undefined') ? $.converteMoedaFloat(fldValorDespesaBancaria.val()) : 0;

    if (valorDespesaBancaria) {
        valorTotal = valorReais + valorDespesaBancaria;
    } else {
        valorTotal = valorReais;
    }

    fldValorTotal.val(valorTotal.toFixed(2));
}

//checkBox para pagamento com cartão de credito
$.pagoComCartao = function () {
    if (fldPagoComCartao.is(':checked')) {
        fldData.show("slow");
    } else {
        fldData.hide("slow");
    }
};

$(document).ready(function () {

    var label = document.querySelector('label[for="fld-compradorresponsavel"]');
    if (label) {
        label.textContent = 'Responsável pelo pagamento';
    }
    calcValorTotal();
    $.pagoComCartao();
    setTimeout(function () {
        verificarDataAntiga(document.getElementById('pagamentoinvoice-dtpagamento-disp').value);
    }, 100);
});

function verificaSituacao() {
    var situacaoId = comboSituacao.val();

    setTimeout(function () {
        verificarDataAntiga(document.getElementById('pagamentoinvoice-dtpagamento-disp').value);
    }, 100);
}
function verificarDataAntiga(data) {

    if (data != ''){
        let msg = '';

        // Subtrair sete dias da data atual
        var seteDiasAtras = new Date();
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

        //formata a data digitada
        var dataVerificada = verificaDataAteSeteDias(seteDiasAtras,data);

        // Comparar a data com a data de sete dias atrás
        if (!dataVerificada) {

            //cria o elemento para mostrar msg
            var div = document.querySelector(".field-pagamentoinvoice-dtpagamento");
            var childWithId = div.querySelector('[id="divMsg"]');
            var situacao = document.getElementById('fld-situacao').value

            // Verificando se foi encontrado um elemento filho com ID
            if (!childWithId && situacao != 67) {//concluido
                var div2 = document.createElement('div');
                div2.classList.add('text-danger');
                div2.classList.add('mt-3');
                div2.id = 'divMsg';
                div.appendChild(div2);
                var span = document.createElement('span');
                div2.appendChild(span);
                span.innerText = 'Data retroativa não pode ter mais de 7 dias';
            }

            if(btnSalvar){
                btnSalvar.disabled = false;
            }

            if (situacao == 193 || situacao == 65){
                btnSalvar.disabled = true;
            }
        } else {
            //remove o elemento
            var div = document.querySelector(".field-pagamentoinvoice-dtpagamento");
            var childWithId = div.querySelector('[id="divMsg"]');

            // Verificando se foi encontrado um elemento filho com ID
            if (childWithId) {
                childWithId.remove();
            }

            if(btnSalvar){
                btnSalvar.disabled = false;
            }
        }
    }
}
function verificaDataAteSeteDias(dataComSeteDias, dataDigitada) {
    let diaComSeteDias = dataComSeteDias.getDate();
    let mesComSeteDias = dataComSeteDias.getMonth() + 1;
    let anoComSeteDias = dataComSeteDias.getFullYear();

    let datapartes = dataDigitada.split("/");

    let diaDigitado = datapartes[0];
    let mesDigitado = datapartes[1];
    let anoDigitado = datapartes[2];

    var returno = false;

    if (anoDigitado == anoComSeteDias ){
        if ((mesDigitado == mesComSeteDias) && (diaDigitado >= diaComSeteDias)){
            returno = true;
        }else if((mesDigitado > mesComSeteDias)){
            returno = true;
        }
    }else if (anoDigitado > anoComSeteDias){
        if ((mesDigitado > mesComSeteDias) && (diaDigitado >= diaComSeteDias)){
            returno = true;
        }
    }
    return returno;
}
