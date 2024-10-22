//elements
var
    fldKmInicial = $("input[name='PagamentoFrete[kminicial]'], input[name='pagamentofrete-kminicial-disp']"),
    fldKmFinal = $("input[name='PagamentoFrete[kmfinal]'], input[name='pagamentofrete-kmfinal-disp']"),
    fldKmTotal = $("input[name='PagamentoFrete[kmtotal]'], input[name='pagamentofrete-kmtotal-disp']"),
    fldValorKm = $("input[name='PagamentoFrete[valorkm]'], input[name='pagamentofrete-valorkm-disp']"),
    fldValorTotal = $("input[name='PagamentoFrete[valor]'], input[name='pagamentofrete-valor-disp']");

//triggers
$(document).ready(getAcordoId);

$('#fld-acordo').change(getAcordoId);

$('#pagamentofrete-frete_personalizado').change(function () {
    fldValorKm.val($('#pagamentofrete-frete_personalizado').val().replace(',', '.'));
    calcValorTotal();
})

fldKmInicial.change(function () {
    calcKmTotal();
    calcValorTotal();
});

fldKmFinal.change(function () {
    calcKmTotal();
    calcValorTotal();
});

fldValorKm.change(calcValorTotal);

//functions
function calcKmTotal() {

    var KmInicial = fldKmInicial.val();
    var KmFinal = fldKmFinal.val();

    if (KmInicial.includes(',')) {
        KmInicial = $.converteMoedaFloat(KmInicial);
    } else {
        KmInicial = KmInicial.replace('.', '');
    }

    if (KmFinal.includes(',')) {
        KmFinal = $.converteMoedaFloat(KmFinal);
    } else {
        KmFinal = KmFinal.replace('.', '');
    }

    var kmTotal = KmFinal - KmInicial;
    fldKmTotal.val(kmTotal.toFixed(0));
}

function calcValorTotal() {

    var valorKm = fldValorKm.val();
    var kmTotal = fldKmTotal.val();

    if (valorKm.includes(',')) {
        valorKm = $.converteMoedaFloat(valorKm);
    } else {
        valorKm = valorKm.replace('.', '');
    }

    if (kmTotal.includes(',')) {
        kmTotal = $.converteMoedaFloat(kmTotal);
    } else {
        kmTotal = kmTotal.replace('.', '');
    }

    var valorTotal = valorKm * kmTotal;
    fldValorTotal.val(valorTotal.toFixed(2));
}

projetoOriginal = $('#fld-acordo').val();
valorKmOriginal = fldValorKm.val();
function getAcordoId() {

    var acordoId = $('#fld-acordo').val();
    $.ajax({
        url: '/pagamento-frete/get-projeto-extra/',
        data: {
            id: acordoId
        },
        async: false,
        success: function (resp) {
            if (window.location.search.includes("id=") && projetoOriginal == $('#fld-acordo').val()) {
                if (resp.success === false) {
                    document.getElementById('div-frete_personalizado').style.display = "none";
                } else {
                    document.getElementById('div-frete_personalizado').style.display = "block";
                }
            } else {
                var select2 = $('#pagamentofrete-frete_personalizado');
                if (resp.success === false) {
                    fldValorKm.val($.converteMoedaFloat(valorKmOriginal))
                    calcValorTotal()
                    document.getElementById('div-frete_personalizado').style.display = "none";
                } else {
                    document.getElementById('div-frete_personalizado').style.display = "block";
                    calcValorTotal();

                    select2.empty();

                    $.each(resp.options, function (index, opcao) {
                        var novaOpcao = new Option(opcao.text, opcao.id, false, false);
                        select2.append(novaOpcao);
                    });

                    select2.trigger('change');

                }
            }
        }
    });
}

