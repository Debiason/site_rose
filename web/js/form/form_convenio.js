var fldDadosRubricas = $("#dadosRubricas"),
    fldValorAprovado = $("input[name='Convenio[valoraprovado]'], input[name='convenio-valoraprovado-disp']"),
    comboCentroCusto = $("select[name='Convenio[centrocusto_id]']"),
    comboStatus = $("select[name='Convenio[status_id]']"),
    fldDataFim = $("input[name='Convenio[dtfim]'], input[name='convenio-dtfim-disp']"),
    dtFimInicial = fldDataFim.val(),
    fldCoordenador = $("select[name='Convenio[coordenador_id]']"),
    fldInstituicaoExecutora = $("select[name='Convenio[instituicaoexecutora_id]']"),
    fldObservacoes = document.getElementById('convenio-observacoes'),
    fldPossuiCompliance = $("input[name='Convenio[possui_compliance]']"),
    fldClausulaCompliance = $("textarea[name='Convenio[clausula_compliance]']"),
    divClausulaCompliance = $('#clausula-compliance');


$(document).ready(function () {
    if( $('input[name="folhapagamento"]').is(':checked') ) {
        fldDadosRubricas.show("slow");
    } else {
        fldDadosRubricas.hide("slow");
    }

    verificaProjetoCancelado();

    if(fldPossuiCompliance.is(':checked')) {
        divClausulaCompliance.show();
    } else {
        divClausulaCompliance.hide();
    }
});

//checkBox para os dados de compra no mercado externo
$('input[name="folhapagamento"]').on('click', function(){
    if ( $(this).is(':checked') ) {
        fldDadosRubricas.show("slow");
    } else {
        fldDadosRubricas.hide("slow");
    }
});

$('#convenio-tipopedido').multiSelect({
    selectableHeader : '<strong class="mb-1 text-center btn-block">Não permitidos</strong>'+
        '<input type="search" class="form-control" placeholder="Pesquisar" data-js="searchSelectable"/>',

    selectionHeader : '<strong class="mb-1 text-center btn-block">Permitido(s)</strong>'+
        '<input type="search" class="form-control" placeholder="Pesquisar" data-js="searchSelection"/>'
});

$('#select-all').click(function(){
    $('#convenio-tipopedido').multiSelect('select_all');
    return false;
});
$('#deselect-all').click(function(){
    $('#convenio-tipopedido').multiSelect('deselect_all');
    return false;
});

function setDadosCentroCusto() {
    var centroCustoId = comboCentroCusto.val();

    $.ajax({
        url: '/centro-custo/getdados/',
        data: {
            centroCustoId: centroCustoId
        },
        async: false,
        success: function (resp) {

            var moeda = "Moeda: "+ resp.moeda_id;

            if (resp.nomeCoordenador) {
                fldCoordenador.append(new Option(resp.nomeCoordenador, resp.coordenador_id, true, true))
                    .trigger('change')
                    .trigger("select2:select");
            } else {
                fldCoordenador.empty();
            }

            if (resp.nomeInstituicaoExecutora){
                fldInstituicaoExecutora.append(new Option(resp.nomeInstituicaoExecutora, resp.instituicaoexecutora_id, true, true))
                    .trigger('change')
                    .trigger("select2:select");
            } else {
                fldInstituicaoExecutora.empty();
            }

            $("#labelMoeda").text(moeda);
            $("textarea[name='Convenio[objetivo]']").val(resp.objetivo);
            $("input[name='Convenio[nome]']").val(resp.nome);
            fldValorAprovado.val(resp.valoraprovado);
            fldObservacoes.value = resp.observacoes;
        }
    });
}

comboCentroCusto.change(setDadosCentroCusto);

//Caso o projeto seja cancelado

comboStatus.change(function () {
  verificaProjetoCancelado();
});

function verificaProjetoCancelado() {
    statusId = comboStatus.val();
    textJustificativa = $("textarea[name='Convenio[justificativa]']");
    dtFimPausa = $("input[name='Convenio[dtfimpausa]']");
    label = $('#justificativaLabel');

    $.ajax({
        url: '/acordo/dados-status/',
        data: {
            id: statusId
        },
        async: false,
        success: function (resp) {

            //Acordo cancelado
            if (resp == 'Cancelado'){
                label.html('Justificativa para o cancelamento do projeto');
                $('#justificativa').show('slow');
                textJustificativa.attr('required', 'required');
            }

            //Acordo Pausado
            if (resp == 'Pausado'){
                label.html('Justificativa para a pausa do projeto');
                $('#justificativa').show('slow');
                textJustificativa.attr('required', 'required');
                $('#dtPausa').show('slow');
                dtFimPausa.attr('required', 'required');
            }else {
                $('#dtPausa').hide('slow');
                dtFimPausa.attr('required', false);
            }

            if (resp != 'Pausado' && resp != 'Cancelado'){
                $('#justificativa').hide('slow');
                textJustificativa.attr('required', false);
            }

            //Acordo em prorrogacao
            if (resp == 'Em prorrogação'){
                $('#dtProrrogacao').show('slow');
            } else {
                $('#dtProrrogacao').hide('slow');
            }

        }
    });
}

//Motivo para prorrogacao do projeto
fldDataFim.change(function () {
    if (dtFimInicial != '' && dtFimInicial <= fldDataFim.val()) {
        $("#convenio-motivoprorrogacao").attr('required', 'required');
        $("#motivo-prorrogacao-acordo").show('slow');
    } else {
        $("#convenio-motivoprorrogacao").attr('required', false);
        $("#motivo-prorrogacao-acordo").hide('slow');
    }
});

fldPossuiCompliance.change(function (){
    if(fldPossuiCompliance.is(':checked')) {
        divClausulaCompliance.show("slow");
    } else {
        fldClausulaCompliance.val(null);
        divClausulaCompliance.hide("slow");
    }
})