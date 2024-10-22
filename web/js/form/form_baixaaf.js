var
    fldPagoComCartao = $("input[name='BaixaAf[pagocomcartaocredito]']"),
    fldData = $("#dtreferenciacartaodiv"),
    fldLinhaDigitavel = $("input[name='BaixaAf[linhadigitavel]']"),
    fldNumero = $("#baixaaf-numeronota"),
    divFechamentocambio = document.querySelector("[data-fechamento-cambio]"),
    naturezaOperacao = document.getElementById('naturezaoperacao').value,
    autorizadoSenior = document.getElementById('autorizadosenior').value,
    dtfechamento = document.getElementById('baixaaf-dtpagamento-disp'),
    btnSalvar = document.querySelector(".save-form"),
    spanValorCotacao = document.getElementById('valor_cotacao'),
    inputTarifa = $("input[name='BaixaAf[tarifa_bancaria]']"),
    inputIrf = $("input[name='BaixaAf[irf]']");

console.log(inputTarifa.val())
fldLinhaDigitavel.on('change', function () {
    validarBoleto();
});

fldNumero.change(function () {
    if (naturezaOperacao == 'Serviço'){
        verificaNumero()
    }

    var numero = fldNumero.val();
    numero = numero.replace(/[^0-9a-zA-Z]/g, '');
    numero = numero.padStart(9, '0');
    fldNumero.val(numero);
});

fldNumero.on('input', function() {
    var numero = $(this).val();
    numero = numero.replace(/[^0-9a-zA-Z]/g, '');
    $(this).val(numero);
});

fldLinhaDigitavel.keyup(function() {
    if ($(this).val().length >= 47 || $(this).val().length == 48) {
        validarBoleto();
    }
});

//checkBox para pagamento com cartão de credito
$(fldPagoComCartao).on('click', function () {
    if ($(this).is(':checked')) {
        fldData.show("slow");
    } else {
        fldData.hide("slow");
    }
});

$(document).ready(function () {

    var msg = document.querySelector("[data-msg]");

    if (!comboSituacao.val()){
        msg.style.display = "none";
    }else{
        msg.style.display = "block";
    }

    $("#justificativa").hide();

    $("a[href='#baixa-af']").click(function () {
        setTimeout(function () {
            var newNumeroNota = $("#docfiscalNumeroNota").text().trim();
            var newDtEmissao = $("#docfiscalDtEmissao").text().trim();

            var partes = newDtEmissao.split('/');
            var formattedDate = partes[2] + '-' + partes[1] + '-' + partes[0];

            if (newNumeroNota != '') {
                $("#baixaaf-numeronota").val(newNumeroNota);
            }
            if (newDtEmissao != '') {
                $("#baixaaf-dtemissao-disp").val(newDtEmissao);
                $("#baixaaf-dtemissao").val(formattedDate);
            }

        }, 100);
    });
    setTimeout(function () {
        verificarDataAntiga(document.getElementById('baixaaf-dtpagamento-disp').value);
    }, 100);

    if (fldPagoComCartao.is(':checked')) {
        fldData.show("slow");
    } else {
        fldData.hide("slow");
    }

    bloquearAlteracaoProjetoBaixaAf();
});

function validarBoleto() {

    var linhadigitavel = fldLinhaDigitavel.val();
    linhadigitavel = linhadigitavel.replace(/\s/g, '');

    if(linhadigitavel.length >= 44) {
        $("#info-boleto").load("/documento-fiscal/validar-boleto?linhadigitavel=" + linhadigitavel);
        $("#info-boleto").show("slow");
    } else {
        $("#info-boleto").hide("slow");
    }
}

var comboSituacao = $("#fld-situacao");
var campoDataEntrega = $("#baixaaf-dtentrega");

comboSituacao.change(verificaSituacao);
campoDataEntrega.change(verificaSituacao);

function verificaSituacao() {

    var situacaoId = comboSituacao.val();
    var justificativa = $("#justificativa");
    var campoDataEntrega = $("#baixaaf-dtentrega");
    var motivoCorrecao = $("#motivoCorrecao");

    console.log('campoDataEntrega:', campoDataEntrega.val());

    setTimeout(function () {
        verificarDataAntiga(document.getElementById('baixaaf-dtpagamento-disp').value);
    }, 100);

    if (!campoDataEntrega.val() && (situacaoId == 107 || situacaoId == 108 || situacaoId == 110 || situacaoId == 293)) {
        justificativa.show('slow');
        $('#baixaaf-justificativa_valor').attr('required', true);

    } else {
        justificativa.hide('slow');
        $('#baixaaf-justificativa_valor').attr('required', false);
    }

    if (situacaoId == 255) {
        motivoCorrecao.show('slow');
        $("textarea[name='BaixaAf[motivoCorrecao]']").attr('required', true);
    } else {
        motivoCorrecao.hide('slow');
        $("textarea[name='BaixaAf[motivoCorrecao]']").attr('required', false);
    }
}

function bloquearAlteracaoProjetoBaixaAf() {
    $('.baixa-af-projeto #fld-acordo').attr('disabled', 'disabled');
}

if (naturezaOperacao != 'Purchase Order') {
    divFechamentocambio.classList.add('d-none');
    alteraSelectSituação(0);
} else {
    var valorData = document.getElementById('baixaaf-dtpagamento-disp').value;
    var valorTarifa = document.getElementById('baixaaf-tarifa_bancaria');
    var valorIrf = document.getElementById('baixaaf-irf');

    if (valorTarifa.value > 0 || valorIrf > 0){
        insereValorCotacao();
    }

    verificarDataAntiga(valorData);
    alteraSelectSituação(1);
    if (btnSalvar){
        btnSalvar.setAttribute('id', 'btnSalvar');

        var valorData = document.getElementById('baixaaf-dtpagamento-disp').value;
        if (!valorData) {
            btnSalvar.disabled = true;
        } else {
            btnSalvar.disabled = false;
        }
    }
}
dtfechamento.addEventListener('blur', function () {
    setTimeout(function () {
        var valorData = document.getElementById('baixaaf-dtpagamento-disp').value;
        verificarDataAntiga(valorData);
    }, 500);
});

function verificarDataAntiga(data) {

    if (naturezaOperacao == 'Purchase Order'){

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
                var div = document.querySelector(".field-baixaaf-dtpagamento");
                var childWithId = div.querySelector('[id="divMsg"]');
                var situacao = document.getElementById('fld-situacao').value

                // Verificando se foi encontrado um elemento filho com ID
                if (!childWithId && situacao != 110) {//concluido
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

                if (situacao == 293){
                    btnSalvar.disabled = true;
                }
            } else {
                //remove o elemento
                var div = document.querySelector(".field-baixaaf-dtpagamento");
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

//Somente mostra a situação "Fechamento de cambio" nas baixas de importação
// e não mostra a situação "Em pagamento"
function alteraSelectSituação($importacao){

    var situacaoId = comboSituacao.val();

    if (situacaoId == 107){
        var select = document.getElementById('fld-situacao');
        var childNodes = select.childNodes;
        var situacao = $importacao ? 108 : 293;

        childNodes.forEach(function (node) {
            if (node.value == situacao) {
                node.parentNode.removeChild(node);
            }
        });
    }
}
inputTarifa.on('change', function () {
    atualizaValorItens();
});
inputIrf.on('change', function () {
    atualizaValorItens();
});

function insereValorCotacao(){
    var valorTarifa = document.getElementById('baixaaf-tarifa_bancaria').value || 0.00
    var valorIrf = document.getElementById('baixaaf-irf').value || 0.00
    setTimeout(function () {
        var objetoJSON = document.querySelector("[data-gridfield-store]").value;
        var json = objetoJSON.replace(/[\[\]{}"]/g, '');
        var itens = json.split(",");

        $.ajax({
            url: '/baixa-af/getvaloritens/',
            data: {
                itens: itens
            },
            async: false,
            success: function (resp) {
                var total = resp - valorTarifa - valorIrf;
                if(total >= 0){
                    var totalFormatado = converteFloatMoeda(total)
                    spanValorCotacao.innerText = 'Valor em Baixa sem Tarifa '+totalFormatado;
                    spanValorCotacao.val = resp;
                }else{
                    spanValorCotacao.innerText = 'Valor em Baixa sem Tarifa R$0,00';
                }
            }
        });
    },500)
}

function atualizaValorItens(){
    var valorTarifa = document.getElementById('baixaaf-tarifa_bancaria');
    var valorIrf = document.getElementById('baixaaf-irf');
    var spanCotacao = document.getElementById('valor_cotacao');
    if (valorTarifa.value > 0 && valorIrf.value > 0){
        var cotacaoFloat = parseFloat(spanCotacao.val);
        var tarifaFloat = parseFloat(valorTarifa.value);
        var irfFloat = parseFloat(valorIrf.value);
        var soma = cotacaoFloat - tarifaFloat - irfFloat;

        var somaFormatada = converteFloatMoeda(soma)
        spanCotacao.innerText = 'Valor em Baixa sem Tarifa '+somaFormatada;
    }else if (valorTarifa.value > 0) {
        var cotacaoFloat = parseFloat(spanCotacao.val);
        var tarifaFloat = parseFloat(valorTarifa.value);
        var soma = cotacaoFloat - tarifaFloat;

        var somaFormatada = converteFloatMoeda(soma)
        spanCotacao.innerText = 'Valor em Baixa sem Tarifa ' + somaFormatada;
    }else if (valorIrf.value > 0) {
        var cotacaoFloat = parseFloat(spanCotacao.val);
        var irfFloat = parseFloat(valorIrf.value);
        var soma = cotacaoFloat - irfFloat;

        var somaFormatada = converteFloatMoeda(soma)
        spanCotacao.innerText = 'Valor em Baixa sem Tarifa ' + somaFormatada;
    }
}

var tarifa = document.getElementById('baixaaf-tarifa_bancaria-disp');
tarifa.addEventListener('keyup', function () {
    var valorIrf = document.getElementById('baixaaf-irf');
    let spanCotacao = document.getElementById('valor_cotacao');
    let soma = atualizaValor(this, valorIrf.value);
    var somaFormatada = converteFloatMoeda(soma)
    spanCotacao.innerText = 'Valor em Baixa sem Tarifa '+somaFormatada;

});

var irf = document.getElementById('baixaaf-irf-disp');
irf.addEventListener('keyup', function () {
    var valorTarifa = document.getElementById('baixaaf-tarifa_bancaria');
    let spanCotacao = document.getElementById('valor_cotacao');
    let soma = atualizaValor(this,valorTarifa.value);
    var somaFormatada = converteFloatMoeda(soma)
    spanCotacao.innerText = 'Valor em Baixa sem Tarifa '+somaFormatada;

});

function verificaNumero(){
    var numero = fldNumero.val();
    numero = numero.replace(/[^0-9a-zA-Z]/g, '');
    numero = numero.padStart(9, '0');
    let dataAtual = new Date();
    let novoNum = dataAtual.getFullYear() + "" + numero.substring(4);
    fldNumero.val(novoNum);

    console.log('numero:'+fldNumero.val(novoNum))

}

function atualizaValor(valor, outroValor){
    let spanValorCotacao = document.getElementById('valor_cotacao');
    let valorString = (valor.value).substring(2);
    let stringSemPontos = valorString.replace(/\./g, '');
    let valorFloat = stringSemPontos.replace(/,/g, '.');
    let valorCotado = parseFloat(spanValorCotacao.val);
    return valorCotado - valorFloat - outroValor
}

document.addEventListener('DOMContentLoaded', function () {

    var situacao_atual = document.getElementById('fld-situacao');
    var situacao_id = '';

    if (situacao_atual && autorizadoSenior == 1) {
        situacao_id = 'Autorizado/Aguardando pagamento';
    }

    var dropdown = document.getElementById('fld-situacao');

    if (dropdown) {
        var options = dropdown.options;

        for (var i = 0; i < options.length; i++) {
            if (options[i].text === situacao_id) {
                dropdown.remove(i);
                break;
            }
        }
    }
});