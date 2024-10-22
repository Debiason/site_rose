//elements
var
    fldHorasTrabalhadas = $("input[name='PagamentoPessoa[horastrabalhadas]']"),
    fldValorHora = $("input[name='PagamentoPessoa[valorhora]'], input[name='pagamentopessoa-valorhora-disp']"),
    fldValorSemImposto = $("input[name='PagamentoPessoa[valorsemimposto]'], input[name='pagamentopessoa-valorsemimposto-disp']"),
    fldValorTotal = $("input[name='PagamentoPessoa[valor]'], input[name='pagamentopessoa-valor-disp']"),
    fldPercentualPatronal = $("input[name='percentualPatronal']"),
    fldFavorecido = $("select[name='PagamentoPessoa[favorecido_id]']"),
    fldAjudaCusto = $("input[name='PagamentoPessoa[ajuda_de_custo]']"),
    comboAcordo = $("select[id='fld-acordo']");

var comboFavorecido = $("select[id='fld-favorecido']");
comboFavorecido.change(getPisFavorecido);

var btnSalvarContinuar = $("button[name='salvar-e-continuar']");
var btnSalvar = $("button[name='salvar']");
var btnEnviar = $("button[name='enviar']");
var ckbAjudaCusto = $("#pagamentopessoa-ajuda_de_custo");

//triggers

fldHorasTrabalhadas.change(function () {
    calcValorTotal();
});

fldValorHora.change(function () {
    calcValorTotal();
});

fldAjudaCusto.change(function () {
    calcValorTotal();
});

// fldAjudaCusto.ready(function () {
//     calcValorTotal();
// });

fldValorSemImposto.change(function () {
    calcValorTotalChangeValorBruto();
});

fldFavorecido.change(function () {
    atualizaDadosFavorecido();
});

fldFavorecido.ready(function () {
    atualizaDadosFavorecido();
});

comboAcordo.ready(function() {
    getProjetoPermiteAjudaCusto();
});

comboAcordo.change(function() {
    getProjetoPermiteAjudaCusto();
});

//functions
function calcValorTotal() {

    var horasTrabalhadas = $.convertMoedaToFloat(fldHorasTrabalhadas.val());
    var valorHora = $.convertMoedaToFloat(fldValorHora.val());

    var valorSemImposto = horasTrabalhadas * valorHora;
    var percentualPatronal = $.convertMoedaToFloat(fldPercentualPatronal.val());
    var valorImpostoPatronal = (percentualPatronal / 100) * valorSemImposto;
    var valorTotal = valorSemImposto + valorImpostoPatronal;
    fldValorSemImposto.val(valorSemImposto.toFixed(2));

    if (fldAjudaCusto.is(':checked')) {
        fldValorTotal.val(valorSemImposto.toFixed(2));
    } else {
        fldValorTotal.val(valorTotal.toFixed(2));
    }
}

function calcValorTotalChangeValorBruto() {
    var valorSemImposto = $.convertMoedaToFloat(fldValorSemImposto.val());
    var percentualPatronal = $.convertMoedaToFloat(fldPercentualPatronal.val());
    var valorImpostoPatronal = (percentualPatronal / 100) * valorSemImposto;
    var valorTotal = valorSemImposto + valorImpostoPatronal;

    if (fldAjudaCusto.is(':checked')) {
        fldValorTotal.val(valorSemImposto.toFixed(2));
    } else {
        fldValorTotal.val(valorTotal.toFixed(2));
    }
}

function getPisFavorecido() {

    $("#pagamentopessoa-pis").val();
    $('.favorecidoSemPis').html();

    pessoaId = comboFavorecido.val();

    $.ajax({
        url: '/pagamento-pessoa/getpisfavorecido/',
        data: {
            pessoaId: pessoaId
        },
        async: false,
        success: function (resp) {
            if (resp) {
                $("#pagamentopessoa-pis").val(resp);
                $('.favorecidoSemPis').html('');
            } else {
                $("#pagamentopessoa-pis").val('');
                $('.favorecidoSemPis').html("<span style='color: red;'>Favorecido não possui pis , solicite o cadastro.</span>");
            }

        }
    });
}

function atualizaDadosFavorecido() {

    favorecidoId = fldFavorecido.val();

    $.ajax({
        url: '/pagamento-pessoa/get-dados-favorecido/',
        data: {
            id: favorecidoId
        },
        async: false,
        success: function (resp) {
            if (resp != '') {
                retorno = "<b> Informações: ";
                $.each(resp, function (index, element) {
                    retorno += "<span style='color: red;'> » " + element + "</span></b><br>";
                });
                $("#infoFavorecido").html(retorno);
            }
        }
    });
}

fldAjudaCusto.on('click', function () {
    setVisualizacaoAjudaCusto();
});

$(document).ready(function () {
    setVisualizacaoAjudaCusto();
});

function setVisualizacaoAjudaCusto(){
    if (fldAjudaCusto.is(':checked')) {
        $('#modelo-ajuda-de-custo').show("slow");
        $('#modelo-padrao').hide("slow");

    } else {
        $('#modelo-padrao').show("slow");
        $('#modelo-ajuda-de-custo').hide("slow");
    }
}

function variosFavorecidos() {
    var favorecidos = $('#modelo-ajuda-de-custo > div > div.m-portlet__body > div.gridfield-table.table-scrollable > table > tbody > tr > td').text();
    var idFavorecido = parseInt(favorecidos .split('-')[0]);

    if (!idFavorecido) {
         $('#varios-favorecidos-notificacao').modal('show');
         return true;
    }

    return false;
}

function validaPreechimentoFavorecido(event) {
    if (ckbAjudaCusto.is(":checked")) {
        var validacao = variosFavorecidos();

        if (validacao) {
            event.preventDefault();
        }
    }
}

btnSalvarContinuar.on('click', function( event ) {
    validaPreechimentoFavorecido(event);
});

btnSalvar.on('click', function( event ) {
    validaPreechimentoFavorecido(event);
});

btnEnviar.on('click', function( event ) {
    validaPreechimentoFavorecido(event);
});

function getProjetoPermiteAjudaCusto() {

    $.ajax({
        url: '/projeto-extra/get-projeto-permite-ajuda-custo/',
        data: {
            acordoId: comboAcordo.val()
        },
        async: false,
        success: function (resp) {
            if (resp) {
                $("#div-ajuda-custo").show('slow');
            } else {
                $("#div-ajuda-custo").hide('slow');
            }

        }
    });
}
