var btnSolicitarEmpenho = $("button[class='btn btn-outline-success solicitar-empenho']"),
    btnGerarAf = $("a[class='btn btn-outline-success gerar-af']");

$(document).ready(function () {
    btnSolicitarEmpenho.attr('disabled', 'disabled');
    btnSolicitarEmpenho.attr('class', 'btn btn-outline-secondary solicitar-empenho');
    btnGerarAf.attr('disabled', true);
    btnGerarAf.attr('target', '_self');
    btnGerarAf.hide();
});

btnSolicitarEmpenho.click(function () {
    solicitarEmpenho();
});


$(".select-on-check-all").change(function () {
    btnSolicitarEmpenho.attr('disabled', 'disabled');
    btnSolicitarEmpenho.attr('class', 'btn btn-outline-secondary solicitar-empenho');
    btnGerarAf.attr('disabled', 'disabled');
    btnGerarAf.attr('target', '_self');
    btnGerarAf.hide('slow');
    verificaRegrasBotoes();
});

$(".kv-row-checkbox").change(function () {

    verificaRegrasBotoes();

});

function verificaRegrasBotoes() {
    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).closest('tr').find('.cotacao-id').text();
        i++;
    });

    var empenho = true;
    var af = true;

    $.each(id, function (index, element) {
        $.ajax({
            url: '/cotacao-aguardando-analise/get-situacao/',
            data: {
                id: element,
            },
            async: false,
            success: function (resp) {

                console.log(resp);

                if (!resp['situacao']['Cotacao']['botao']['solicitarEmpenho']) {
                    empenho = false;
                } else if (resp['situacaoAtual'] && resp['situacaoAtual'] != resp['situacaoAprovada']
                    && resp['modalidadeSelecaoPublica'] != resp['modalidadeSelecaoPublicaAtual']) {
                    empenho = false;
                }

                if (!resp['gerarAf']['Cotacao']['botao']['gerarAf']) {
                    af = false;
                }
            }
        });
    });

    if (id == '') {
        url = "/af/create";
        btnGerarAf.attr('href', url);
        empenho = false;
        af = false;
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

}

function solicitarEmpenho() {

    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).closest('tr').find('.cotacao-id').text();
        i++;
    });

    $.ajax({
        url: '/cotacao-aguardando-analise/solicitar-empenhos-em-massa/',
        data: {
            id: id,
        },
        async: false,
        success: function (resp) {

        }
    });

}

