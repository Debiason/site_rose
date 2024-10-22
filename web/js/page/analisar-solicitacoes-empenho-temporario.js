var btnAprovar = $("button[class='btn btn-outline-success aprovar']"),
    btnReprovar = $("button[class='btn btn-outline-danger reprovar']"),
    btnProsseguir = $("button[class='btn btn-outline-danger justificativa']"),
    fldJustificativa = $("textarea[name='SolicitacaoEmpenhoTemporario[justificativa]']"),
    divJustificativa = $("#divJustificativa"),
    avisoJustificativa = $("#avisoJustificativa");


btnAprovar.click(function () {
    divJustificativa.hide('slow');
    avisoJustificativa.hide();
    var acao = 'aprovar';
    enviaRespostaEmpenho(acao);
});
btnReprovar.click(function () {
    divJustificativa.show('slow');
});
btnProsseguir.click(function () {
    verificaJustificativaPreenchida();
});


function verificaJustificativaPreenchida() {

    if (fldJustificativa.val() != '') {
        avisoJustificativa.hide('slow');
        var acao = 'reprovar';
        enviaRespostaEmpenho(acao);
    } else {
        avisoJustificativa.show('slow');
    }

}

function enviaRespostaEmpenho(acao) {

    var id = [];
    var i = 0;
    var justificativa = fldJustificativa.val();

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });

    if (id.length != 0) {
        $.ajax({
            url: '/solicitacao-empenho-temporario/analisar-solicitacoes/',
            type: 'POST',
            data: {
                ids: id,
                acao: acao,
                justificativa: justificativa

            },
            async: false,
            success: function (resp) {

            }
        });
    }

}

$(document).ready(function () {
    divJustificativa.hide();
    avisoJustificativa.hide();
});


//Soma dos valores selecionados no checkbox
$(".kv-row-checkbox").change(function () {
    barraDeStatus();
});

$(".select-on-check-all").change(function () {
    barraDeStatus();
});

function barraDeStatus() {
    //exibe barra de status
    $('#SomaValores').show("slow");

    var cotacaoValor = 0;
    var somaTotal = 0;

    $('.kv-row-checkbox:checked').each(function () {
        cotacaoValor = $(this).closest('tr').find('.valor-cotacao').text();
        cotacaoValor = $.convertMoedaToFloat(cotacaoValor);
        somaTotal += cotacaoValor;
        cotacaoValor = 0;
    });

    $('#TotalSoma').html("<b>Soma dos valores selecionados: </b>" + $.convertFloatToMoeda(somaTotal));
}



