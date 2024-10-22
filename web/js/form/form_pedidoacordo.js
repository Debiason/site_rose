var comboSituacao = $("#fld-situacao");
var fieldReprovacao = $(".descricaoInteracao textarea");
var fldRubricaAprovada = $("select[id='fld-rubricaaprovada']");
var fldItemAprovado = $("select[id='fld-itemaprovado']");
var tipoPedidoId = $("#div-tipopedido_id").val();

comboSituacao.change(getSituacao);
comboSituacao.ready(getSituacao);
fldRubricaAprovada.change(verificaItemAprovado);
fldRubricaAprovada.ready(verificaItemAprovado);

function getSituacao() {

    var situacaoId = comboSituacao.val();

    $.ajax({
        url: '/situacao/getdados/',
        data: {
            id: situacaoId
        },
        async: false,
        success: function (resp) {
            if (
                resp.nome == 'Reprovado'
                || resp.nome == 'Cancelado'
                || resp.nome == 'Pendente de Protocolo'
                ||resp.nome == 'Pendente de Lançamento'
                ||resp.nome == 'Refazer Protocolo'
            ) {
                $(".descricaoInteracao").show();
                if (resp.nome == 'Cancelado') {
                    $(".justificativa-situacao").text('Motivo do cancelamento');
                    $(".justificativa-situacao").html("Motivo do cancelamento <span style='color: red'> *</span>");
                }
                if (resp.nome == 'Pendente de Protocolo') {
                    $(".justificativa-situacao").html("Motivo de alterar para Pendente de Protocolo <span style='color: red'> *</span>");
                    var getJustificativa  = getJustificativa(situacaoId);
                }
                if (resp.nome == 'Pendente de Lançamento') {
                    $(".justificativa-situacao").html("" +
                        "Motivo de alterar para Pendente de Lançamento <span style='color: red'> *</span>");
                }
                if (resp.nome == 'Refazer Protocolo') {
                    $(".justificativa-situacao").html("Motivo de alterar para Refazer Protocolo <span style='color: red'> *</span>");
                    if (tipoPedidoId != 38) {
                        fieldReprovacao.attr("required", true);
                    } else {
                        fieldReprovacao.removeAttr("required");
                        $(".descricaoInteracao").hide();
                    }
                } else {
                    fieldReprovacao.attr("required", true);
                }
            } else {
                fieldReprovacao.removeAttr("required");
                fieldReprovacao.val("");
                fieldReprovacao.trigger('change');
                $(".descricaoInteracao").hide();
            }
        }
    });
}

function verificaItemAprovado(){

    var rubricaaprovada_id = fldRubricaAprovada.val();
    var divItemAprovado = $("#div-item-aprovado");
    var fldItemAprovado = $("#fld-itemaprovado");

    $.ajax({
        url: '/item-aprovado/combo-search/',
        data: {
            rubricaaprovada_id: rubricaaprovada_id
        },
        async: false,
        success: function (resp) {
            if (resp['output'].length == 0) {
                divItemAprovado.hide('slow');
                fldItemAprovado.attr('required', false);
            }else {
                divItemAprovado.show('slow');
                if ($("#tipo-pedido").val() != '24') {
                    fldItemAprovado.attr('required', 'required');
                    fldItemAprovado.focus();
                }
            }
        }
    });
}

fldItemAprovado.change(validaCampo);
function validaCampo() {
    if ($('#fld-itemaprovado option:selected').length > 0) {
        if ($(this).val()) {
            $('#info-item-aprovado').hide();
        } else {
            $('#info-item-aprovado').show();
        }
    }
}

fieldReprovacao.on('change', function() {
    var value = $(this).val().trim();
    var words = value.split(/\s+/);
    if (value === "") {
        $(this).get(0).setCustomValidity("");
    } else if (words.length < 3) {
        $(this).get(0).setCustomValidity("O motivo deve conter no mínimo 3 palavras. Por favor, adicione mais detalhes.");
    } else {
        $(this).get(0).setCustomValidity("");
    }
});