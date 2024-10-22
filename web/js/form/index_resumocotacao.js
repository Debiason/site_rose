var btnImprimir = $("#imprimirCotacao"),
    btnSolicitarEmpenho = $("button[class='btn btn-outline-success solicitar-empenho']"),
    btnGerarAf = $("a[class='btn btn-outline-success gerar-af']");

$(document).ready(function () {
    btnImprimir.hide();
    btnSolicitarEmpenho.attr('disabled', 'disabled');
    btnSolicitarEmpenho.attr('class', 'btn btn-outline-secondary solicitar-empenho');
    btnGerarAf.attr('disabled', true);
    btnGerarAf.attr('target', '_self');
    btnGerarAf.hide();
    $("#btnEncaminharParecerDevolver").hide();
});

function verificaPermissaoBotoes(id, cotacoesSituacoes) {

    if(!Array.isArray(id))
        throw new Error('Erro: argumento passado (' + id + '), esperava um array.');
    
    if (id.length === 0) {
        btnImprimir.hide('slow');
        url = "/af/create";
        btnGerarAf.attr('href', url);
        $("#btnEncaminharParecerDevolver").hide('slow');

    } else {
        btnImprimir.show('slow');
        url = "/cotacao/print-detail?ids=" + id;
        btnImprimir.attr('href', url);
    }

    var empenho = true;
    var af = true;
    var emcaminharParecer = true;  

    if(Object.keys(cotacoesSituacoes).length === 0)
        return false;
    
    var cotacoesSituacoesIds = [];

    for(var i in cotacoesSituacoes) {       
        cotacoesSituacoesIds.push(cotacoesSituacoes[i].cotacaoId)
    }

    var keyPosition = -1;
    $.each(id, function (index, element) {
        element = parseInt(element);
        keyPosition = cotacoesSituacoesIds.indexOf(element);
        
        if(keyPosition > -1) {
            
            if(hasOwnNestedProperty(cotacoesSituacoes[keyPosition], 'situacao.Cotacao.botao.solicitarEmpenho')) {
                if(!cotacoesSituacoes[keyPosition].situacao.Cotacao.botao.solicitarEmpenho) {
                    empenho = false;
                } else if (cotacoesSituacoes[keyPosition].situacaoAtual &&
                                cotacoesSituacoes[keyPosition].situacaoAtual !=
                                    cotacoesSituacoes[keyPosition].situacaoAprovada &&
                                        cotacoesSituacoes[keyPosition].modalidadeSelecaoPublica !=
                                            cotacoesSituacoes[keyPosition].modalidadeSelecaoPublicaAtual) {
                    empenho = false;
                }
            }

            if(hasOwnNestedProperty(cotacoesSituacoes[keyPosition], 'gerarAf.Cotacao.botao.gerarAf')) {
                if(!cotacoesSituacoes[keyPosition].gerarAf.Cotacao.botao.gerarAf)
                    af = false;
            }

            if(hasOwnNestedProperty(cotacoesSituacoes[keyPosition], 'encaminharParaParecer.Cotacao.botao.encaminharParaParecer')) {
                if(cotacoesSituacoes[keyPosition].encaminharParaParecer == false ||
                        !cotacoesSituacoes[keyPosition].encaminharParaParecer.Cotacao.botao.encaminharParaParecer)
                    emcaminharParecer = false;
            }
        }
    });

    if(cotacoesSituacoesIds.length > 0) {
        if (id.length === 0) {
            empenho = false;
            af = false;
            emcaminharParecer = false;
        }

        if (!empenho) {
            btnSolicitarEmpenho.attr('disabled', 'disabled');
            btnSolicitarEmpenho.attr('class', 'btn btn-outline-secondary solicitar-empenho');
        } else {
            btnSolicitarEmpenho.attr('disabled', false);
            btnSolicitarEmpenho.attr('class', 'btn btn-outline-success solicitar-empenho');
        }

        if (af) {
            btnGerarAf.attr('disabled', false);
            btnGerarAf.attr('target', '_blank');
            btnGerarAf.show('slow');
            url = "/cotacao-aguardando-analise/gerar-af?ids=" + id;
            btnGerarAf.attr('href', url);
        } else {
            btnGerarAf.attr('target', '_self');
            url = "";
            btnGerarAf.attr('href', url);
            btnGerarAf.hide('slow');
        }

        if (emcaminharParecer) {
            urlEncaminharParecer = "/resumo-cotacao/encaminhar-parecer?ids=" + id;
            $("#btnEncaminharParecerDevolver").attr('href', urlEncaminharParecer);
            $("#btnEncaminharParecerDevolver").show('slow');
        } else {
            urlEncaminharParecer = '';
            $("#btnEncaminharParecerDevolver").attr('href', urlEncaminharParecer);
            $("#btnEncaminharParecerDevolver").hide('slow');
        }
    }
}

btnSolicitarEmpenho.click(function () {
    solicitarEmpenho();
});

function solicitarEmpenho() {

    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });

    $.ajax({
        url: '/resumo-cotacao/solicitar-empenhos-em-massa/',
        data: {
            id: id
        },
        async: false,
        success: function (resp) {
            window.location.reload();
        }
    });

}

function hasOwnNestedProperty (obj, propertyPath) {
    if(!propertyPath)
        return false;

    var properties = propertyPath.split('.');

    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];

        if(!obj || !obj.hasOwnProperty(prop)){
            return false;
        } else {
            obj = obj[prop];
        }
    }

    return true;
};

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

    var somaTotal = 0;

    $('.kv-row-checkbox:checked').each(function () {
        //soma de valor total das cotacoes
        valor = $(this).closest('tr').find('.valor-cotacao').text();
        valor = $.convertMoedaToFloat(valor);
        somaTotal += valor;
        valor = 0;

    });

    $('#totalCotacoes').html($.convertFloatToMoeda(somaTotal));
}