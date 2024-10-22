$(document).ready(function() {
    $("button[class='showModalButton btn btn-outline-success geraRateio']").attr("disabled", true);

    treatCheckbox();
});

$(document).on('pjax:complete', function (){
    treatCheckbox();
});

$(".kv-row-checkbox").change(function () {
    getIds();
    barraDeStatus();
});

$(".select-on-check-all").change(function () {
    getIds();
    barraDeStatus();
});

function getIds() {


    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });

    if (id.length == 0) {
        $("button[class='showModalButton btn btn-outline-success geraRateio']").attr("disabled", true);
    } else {
        $("button[class='showModalButton btn btn-outline-success geraRateio']").attr("disabled", false);
    }

    var url = '/movimentacao/gera-rateio?movimentacao_id=' + id;

    $("button[class='showModalButton btn btn-outline-success geraRateio']").val(url);

}

function treatCheckbox(){
    var $chkboxes = $('.kv-row-checkbox');
    var lastChecked = null;

    $chkboxes.click(function (e) {
        if (!lastChecked) {
            lastChecked = this;
            return;
        }

        if (e.shiftKey) {
            var start = $chkboxes.index(this);
            var end = $chkboxes.index(lastChecked);

            $chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1)
                .prop('checked', lastChecked.checked).closest('tr').addClass('table-danger');
        }

        lastChecked = this;
    });
}


function barraDeStatus() {
    //exibe barra de status
    $('#BarraDeStatus').show("slow");

    var movValor = 0;
    var movTipo = "";
    var totalCredito = 0;
    var totalDebito = 0;
    var diferenca = 0;
    var somaTotal = 0;

    $('.kv-row-checkbox:checked').each(function () {

        if ($(this).closest('tr').find('.valor-credito').length > 0) {
            movValor = $(this).closest('tr').find('.valor-credito').text();
            movTipo = 'C';
        } else {
            if ($(this).closest('tr').find('.valor-debito').length > 0) {
                movValor = $(this).closest('tr').find('.valor-debito').text();
                movTipo = 'D';
            }
        }

        movValor = $.convertMoedaToFloat(movValor);

        if (movTipo == "C")//creditos
        {
            totalCredito += movValor;
        }

        if (movTipo == "D")//debitos
        {
            totalDebito += movValor;
        }

        diferenca = totalCredito - totalDebito;
        somaTotal += movValor;

        movValor = 0;
    });

    $('#CreditosAba').html("CR&Eacute;DITOS: " + $.convertFloatToMoeda(totalCredito));
    $('#DebitosAba').html("D&Eacute;BITOS: " + $.convertFloatToMoeda(totalDebito));
    $('#DiferencaAba').html("DIF: " + $.convertFloatToMoeda(diferenca));
}

$(document).on('pjax:complete', function(data){
    $(".kv-row-checkbox").change(function () {
        getIds();
        barraDeStatus();
    });

    $(".select-on-check-all").change(function () {
        getIds();
        barraDeStatus();
    });
});