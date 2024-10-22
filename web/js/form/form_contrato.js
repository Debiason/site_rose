var fldDadosRubricas = $("#dadosRubricas"),
    comboCentroCusto = $("select[name='Contrato[centrocusto_id]']"),
    comboStatus = $("select[name='Contrato[status_id]']"),
    fldCoordenador = $("select[name='Contrato[coordenador_id]']"),
    fldObservacoes = document.getElementById('contrato-observacoes'),
    fldDataFim = $("input[name='Contrato[dtfim]'], input[name='contrato-dtfim-disp']"),
    fldPossuiCompliance = $("input[name='Contrato[possui_compliance]']"),
    fldClausulaCompliance = $("textarea[name='Contrato[clausula_compliance]']"),
    divClausulaCompliance = $('#clausula-compliance'),
    dtFimInicial = fldDataFim.val();


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

//checkBox para os dados de Folha de pagamento
$('input[name="folhapagamento"]').on('click', function(){
    if ( $(this).is(':checked') ) {
        fldDadosRubricas.show("slow");
    } else {
        fldDadosRubricas.hide("slow");
    }
});

$('#contrato-tipopedido').multiSelect({
    selectableHeader : '<strong class="mb-1 text-center btn-block">Não permitidos</strong>'+
    '<input type="search" class="form-control" placeholder="Pesquisar" data-js="searchSelectable"/>',

    selectionHeader : '<strong class="mb-1 text-center btn-block">Permitido(s)</strong>'+
    '<input type="search" class="form-control" placeholder="Pesquisar" data-js="searchSelection"/>'
});

$('#select-all').click(function(){
    $('#contrato-tipopedido').multiSelect('select_all');
    return false;
});
$('#deselect-all').click(function(){
    $('#contrato-tipopedido').multiSelect('deselect_all');
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

            var moeda = "Moeda: " + resp.moeda_id;

            if (resp.nomeCoordenador) {
                fldCoordenador.append(new Option(resp.nomeCoordenador, resp.coordenador_id, true, true))
                    .trigger('change')
                    .trigger("select2:select");
            } else {
                fldCoordenador.empty();
            }

            fldObservacoes.value = resp.observacoes;

            $("#labelMoeda").text(moeda);
            $("input[name='Contrato[nome]']").val(resp.nome);
            $("input[name='Contrato[maximodiariaspessoa]']").val(resp.maximodiariaspessoa);
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
    textJustificativa = $("textarea[name='Contrato[justificativa]']");
    dtFimPausa = $("input[name='Contrato[dtfimpausa]'], input[name='contrato-dtfimpausa-disp']");
    label = $('#justificativaLabel');

    $.ajax({
        url: '/acordo/dados-status/',
        data: {
            id: statusId
        },
        async: false,
        success: function (resp) {

            //Acordo Cancelado
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
        $("#contrato-motivoprorrogacao").attr('required', 'required');
        $("#motivo-prorrogacao-acordo").show('slow');
    } else {
        $("#contrato-motivoprorrogacao").attr('required', false);
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