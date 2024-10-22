//elements
var
    fldTaxaCambio = $("input[name='PagamentoPessoaInternacional[taxacambio]']"),
    fldHorasTrabalhadas = $("input[name='PagamentoPessoaInternacional[horastrabalhadas]']"),
    fldValorHora = $("input[name='PagamentoPessoaInternacional[valorhora]'], input[name='pagamentopessoainternacional-valorhora-disp']"),
    fldValorDespesaBancaria = $(" input[name='PagamentoPessoaInternacional[valordespesabancaria]'], input[name='pagamentopessoainternacional-valordespesabancaria-disp']"),
    fldValorTotal = $("input[name='PagamentoPessoaInternacional[valor]'], input[name='pagamentopessoainternacional-valor-disp']"),
    fldPagoComCartao = $("input[name='PagamentoPessoaInternacional[pagocomcartaocredito]']"),
    fldData = $("#dtreferenciacartaodiv");


//triggers

fldHorasTrabalhadas.change(function () {
    calcValorTotal();
});

fldValorHora.change(function () {
    calcValorTotal();
});

fldTaxaCambio.change(function () {
    calcValorTotal();
});

fldValorDespesaBancaria.change(calcValorTotal);

//functions

function calcValorTotal() {

    var horasTrabalhadas = $.convertMoedaToFloat(fldHorasTrabalhadas.val());
    var valorHora = $.convertMoedaToFloat(fldValorHora.val());
    var taxaCambio = $.convertMoedaToFloat(fldTaxaCambio.val());

    if (valorDespesaBancaria) {
        var valorDespesaBancaria = $.convertMoedaToFloat(fldValorDespesaBancaria.val());

        var valorTotal = (horasTrabalhadas * valorHora * taxaCambio) + valorDespesaBancaria;
        //verifica se a taxa de cambio é 0, case seja faz a conta sem considera-la, para não zerar o calculo de horas trabalhadas * valor hora
        if (taxaCambio == 0) {
            var valorTotal = (horasTrabalhadas * valorHora) + valorDespesaBancaria;
        }

    } else {

        var valorTotal = (horasTrabalhadas * valorHora * taxaCambio);
        //verifica se a taxa de cambio é 0, case seja faz a conta sem considera-la, para não zerar o calculo de horas trabalhadas * valor hora
        if (taxaCambio == 0) {
            var valorTotal = (horasTrabalhadas * valorHora);
        }
    }

    fldValorTotal.val(valorTotal.toFixed(2));
}


$(document).ready(function () {
    if (fldPagoComCartao.is(':checked')) {
        fldData.show("slow");
    } else {
        fldData.hide("slow");
    }
});

//checkBox para pagamento com cartão de credito
fldPagoComCartao.on('click', function(){
    if ($(this).is(':checked')) {
        fldData.show("slow");
    } else {
        fldData.hide("slow");
    }
});
