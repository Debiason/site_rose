var dataAssinatura =  $("input[name='CentroCustoConvenio[dtassinatura]'], input[name='centrocustoconvenio-dtassinatura-disp']"),
    tempoVigencia = $("input[name='CentroCustoConvenio[tempovigencia]'], input[name='centrocustoconvenio-tempovigencia-disp']"),
    tipoVigencia =  $("input[name='CentroCustoConvenio[tipovigencia]']"),
    flagBbAgil =  $("input[name='CentroCustoConvenio[conta_bb_agil]']"),
    flagTransfereGov =  $("input[name='CentroCustoConvenio[portal_transferegov]']");


dataAssinatura.change(function () {
    setDatas();
});
tempoVigencia.keyup(function () {
    setDatas();
});
tipoVigencia.change(function () {
    setDatas();
});

function setDatas() {

    if (!(dataAssinatura.val() == null) && !(tempoVigencia == null)) {
        var radioValue = $("input[name='CentroCustoConvenio[tipovigencia]']:checked").val();
        var novaData = moment(dataAssinatura.val());
        novaData.add($.converteMoedaFloat(tempoVigencia.val()), (radioValue === 'Dia') ? 'day' : 'month').subtract(1, 'days');

        //Data de encerramento
        dtEncerramentoInput = $("input[name='CentroCustoConvenio[dtencerramento]']");
        dtEncerramentoDisp = $("input[name='dtencerramento-centrocustoconvenio-dtencerramento-disp']");

        dataEncerramentoDisp = ("0" + (novaData.date())).slice(-2) + "/" + ("0" + (novaData.month() + 1)).slice(-2) + "/" + novaData.year();
        dtEncerramentoDisp.val(dataEncerramentoDisp);

        dataEncerramentoInput = novaData.year() + "-" + ("0" + (novaData.month() + 1)).slice(-2) + "-" + novaData.date();
        dtEncerramentoInput.val(dataEncerramentoInput);

        //Data de vigencia
        dtVigenciaInput = $("input[name='CentroCustoConvenio[dtvigencia]']");
        dtVigenciaDisp = $("input[name='dtvigencia-centrocustoconvenio-dtvigencia-disp']");

        novaDataVigencia = novaData.subtract(15, 'days');

        dataVigenciaDisp = ("0" + (novaDataVigencia.date())).slice(-2) + "/" + ("0" + (novaDataVigencia.month() + 1)).slice(-2) + "/" + novaDataVigencia.year();
        dtVigenciaDisp.val(dataVigenciaDisp);

        dataVigenciaInput = novaDataVigencia.year() + "-" + ("0" + (novaDataVigencia.month() + 1)).slice(-2) + "-" + novaDataVigencia.date();
        dtVigenciaInput.val(dataVigenciaInput);

    }
}

$(flagBbAgil).on('click', function () {
    if ($(this).is(':checked')) {
        $('#div-conta-bb-agil').show("slow");
    } else {
        $('#div-conta-bb-agil').hide("slow");
    }
});

$(flagTransfereGov).on('click', function () {
    if ($(this).is(':checked')) {
        $('#div-conta-bb-agil').show("slow");
    } else {
        $('#div-conta-bb-agil').hide("slow");
    }
});

// $(document).ready(function () {
//     controlFieldPrazoPrestacao();
// });
//
// $('input[name="Contrato[prestaconta]"]').on('click', function(){
//     controlFieldPrazoPrestacao();
// });

// function controlFieldPrazoPrestacao() {
//     if ($('input[name="Contrato[prestaconta]"]').is(':checked') ) {
//         $('.field-contrato-prazoprestacaocontas').show("slow");
//     } else {
//         $('.field-contrato-prazoprestacaocontas').hide("slow");
//         $('#contrato-prazoprestacaocontas').val(null);
//     }
// }
