var prestaConta = $("input[name='Contrato[prestaconta]'], input[name='CentroCustoConvenio[prestaconta]']");
var prestacaoParcial = $("input[name='Contrato[prestacaoparcial]'], input[name='CentroCustoConvenio[prestacaoparcial]']");
var tipoPrestacaoParcial = $("select[name='Contrato[tipoprestacaoparcial_id]'], select[name='CentroCustoConvenio[tipoprestacaoparcial_id]']");
var percentualExecucao = $("input[name='Contrato[percentualexecucao]'], input[name='CentroCustoConvenio[percentualexecucao]'], input[name='percentualexecucao-disp']");
var dataPrestacaoFinanciadora = $("input[name='Contrato[dataprestacaofinanciadora]'], input[name='CentroCustoConvenio[dataprestacaofinanciadora]'], input[name='dataprestacaofinanciadora-disp']");

$('.fields-prestacaoparcial').hide();
$('.field-percentualexecucao').hide();
$('.field-dataprestacaofinanciadora').hide();

tipoPrestacaoParcial.change(exibeTiposPrestacaoParcial);
prestacaoParcial.click(controlChangePrestacaoParcial);

$(document).ready(function () {
    controlFieldPrazoPrestacao();
    controlChangePrestacaoParcial();
    exibeTiposPrestacaoParcial();
});

prestaConta.on('click', function(){
    controlFieldPrazoPrestacao();
});

function controlFieldPrazoPrestacao() {

    if (prestaConta.is(':checked') ) {
        $('.field-contrato-prazoprestacaocontas').show("slow");

        $('.field-prestacaoParcial').show("slow");
    } else {
        $('.field-contrato-prazoprestacaocontas').hide("slow");
        $('#contrato-prazoprestacaocontas').val(null);

        $('.field-prestacaoParcial').hide();
        prestacaoParcial.val(0);
    }
}

function controlChangePrestacaoParcial() {

    console.log('aqui');

    if (prestacaoParcial.is(":checked")) {
        $('.fields-prestacaoparcial').show();
    } else {
        $('.fields-prestacaoparcial').hide();
        tipoPrestacaoParcial.val(null);

        $('.field-percentualexecucao').hide();
        percentualExecucao.val(null);

        $('.field-dataprestacaofinanciadora').hide();
        dataPrestacaoFinanciadora.val(null);
    }
}

function exibeTiposPrestacaoParcial() {

    console.log('aqui 2');

    if (tipoPrestacaoParcial.val() == 236) { // percentual de execução
        $('.field-dataprestacaofinanciadora').hide();
        dataPrestacaoFinanciadora.val(null);

        $('.field-percentualexecucao').show();
    } else if (tipoPrestacaoParcial.val() == 237) { // data predefinida pela financiadora
        $('.field-percentualexecucao').hide();
        percentualExecucao.val(null);

        $('.field-dataprestacaofinanciadora').show();
    } else {

        console.log('aqui 3');


        $('.field-percentualexecucao').hide();
        percentualExecucao.val(null);

        $('.field-dataprestacaofinanciadora').hide();
        dataPrestacaoFinanciadora.val(null);
    }
}

