var btnAprovar = $("button[class='btn btn-outline-success aprovar']"),
    btnReprovar = $("button[class='btn btn-outline-danger reprovar']"),
    btnProsseguir = $("button[class='btn btn-outline-danger justificativa']"),
    fldJustificativa = $("textarea[name='CotacaoAguardandoEmpenho[justificativa]']"),
    divJustificativa = $("#divJustificativa"),
    avisoJustificativa = $("#avisoJustificativa");


btnAprovar.click(function () {
    fnbPageBlock();
    divJustificativa.hide('slow');
    avisoJustificativa.hide();
    var acao = 'aprovar';
    enviaRespostaEmpenho(acao);

    btnAprovar.attr('disabled', 'disabled');
    btnAprovar.html('Aguarde ...');

    setTimeout(function () {
        btnAprovar.removeAttr('disabled');
        btnAprovar.html('<i class="fas fa-thumbs-up"></i> Aprovar empenho');
        fnbPageUnblock();
    }, 4000);
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
        console.log('Valor id: ' + id[i]);
        i++;
    });

    $.ajax({
        url: '/cotacao-aguardando-empenho/aprovar-empenho-em-massa/',
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
    var despesasImpValor = 0;

    $('.kv-row-checkbox:checked').each(function () {
        cotacaoValor = $(this).closest('tr').find('.valor-cotacao').text();
        cotacaoValor = $.convertMoedaToFloat(cotacaoValor);
        somaTotal += cotacaoValor;
        cotacaoValor = 0;
        if ($('.despesas-importacao').length) {
            despesasImpValor = $('.despesas-importacao').text();
            despesasImpValor = $.convertMoedaToFloat(despesasImpValor);
            somaTotal += despesasImpValor;
            despesasImpValor = 0;
        }
    });

    $('#TotalSoma').html("<b>Soma dos valores selecionados: </b>" + $.convertFloatToMoeda(somaTotal));
}

document.addEventListener("DOMContentLoaded", function() {
    const selectAllCheckboxes = document.querySelectorAll('.select-all');

    selectAllCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const projetoId = this.getAttribute('data-acordo');
            const checkboxesProjeto = document.querySelectorAll('.kv-row-checkbox-' + projetoId);

            for (let i = 0; i < checkboxesProjeto.length; i++) {
                checkboxesProjeto[i].checked = this.checked;
            }
           if (checkboxesProjeto !== 0) {
               barraDeStatus();
           }
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {

    var spanElements = document.querySelectorAll('span.valor-id');

    if (spanElements) {
        var ids = [];

        spanElements.forEach(function(spanElement) {
            ids.push(spanElement.textContent.trim());
        });

        $.ajax({
            url: '/cotacao-aguardando-empenho/get-processo-compra/',
            type: 'GET',
            data: {
                ids: JSON.stringify(ids)
            },
            async: false,
            success: function (resp) {
                if (resp['importacao'] == false) {
                    removerColuna();
                }else{
                    if (resp['valor'] == true){
                        var btnAprovar = $("button[class='btn btn-outline-success aprovar']");
                        btnAprovar.attr('disabled', 'disabled');
                        btnAprovar.attr('data-toggle', 'tooltip');
                        btnAprovar.attr('title', 'A rubrica das despesas de importação precisa ser informada');
                        btnAprovar.tooltip();
                    }else{
                        removerColuna();
                    }
                }
            }
        });
    }

});

function removerColuna(){
    var cells = document.querySelectorAll('td[data-col-seq="10"]');

    // Remove todas as células encontradas
    cells.forEach(function (cell) {
        cell.parentNode.removeChild(cell);
    });

    //Remover o cabeçalho da coluna se existir
    var headerCells = document.querySelectorAll('th[data-col-seq="10"]');
    headerCells.forEach(function (headerCell) {
        headerCell.parentNode.removeChild(headerCell);
    });
}

