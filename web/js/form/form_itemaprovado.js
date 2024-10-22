var fldValorOutrosItens = $("input[name='ItemAprovado[valorOutrosItens]'], input[name='itemaprovado-valoroutrositens-disp']"),
    fldSomaRubrica = $("input[name='ItemAprovado[somaRubrica]'], input[name='itemaprovado-somarubrica-disp']"),
    fldValorAprovadoRubrica = $("input[name='ItemAprovado[valorAprovadoRubrica]'], input[name='itemaprovado-valoraprovadorubrica-disp']"),
    fldValorTotal = $("input[name='ItemAprovado[valortotal]'], input[name='itemaprovado-valortotal-disp']"),
    fldQuantidade = $("input[name='ItemAprovado[quantidade]'], input[name='itemaprovado-quantidade-disp']"),
    fldValorUnitario = $("input[name='ItemAprovado[valorunitario]'], input[name='itemaprovado-valorunitario-disp']"),
    fldItemAprovadoId = $("input[name='ItemAprovado[id]']"),
    comboRubrica = $("select[name='ItemAprovado[rubricaaprovada_id]']");

//triggers
comboRubrica.change(controlComboRubricaAprovada);
fldQuantidade.blur(calculaValorTotal);
fldValorUnitario.blur(calculaValorTotal);
fldValorTotal.blur(controlComboRubricaAprovada);


//functions
function controlComboRubricaAprovada() {
    var rubricaAprovadaId = comboRubrica.val();
    getValores(rubricaAprovadaId);
}

function getValores(rubricaAprovadaId) {

    var itemAprovadoId = fldItemAprovadoId.val();

    $.ajax({
        url: '/item-aprovado/getvalores/',
        data: {
            idRubrica: rubricaAprovadaId,
            idItemAprovado: itemAprovadoId
        },
        async: false,
        success: function (resp) {
            var valor = $.convertMoedaToFloat(resp.valorOutrosItens) + $.convertMoedaToFloat(fldValorTotal.val());

            fldValorOutrosItens.val(resp.valorOutrosItens);
            fldSomaRubrica.val(valor);
            fldValorAprovadoRubrica.val(resp.valorAprovadoRubrica);

            var valorAprovadoRubrica = $.convertMoedaToFloat(resp.valorAprovadoRubrica);

            if (valorAprovadoRubrica < valor) {
                $("#aviso").show("slow");
            }else{
                $("#aviso").hide("slow");
            }

        }
    });
}

function calculaValorTotal(){

    var valorUnitario = $.convertMoedaToFloat(fldValorUnitario.val());
    var quantidade = $.convertMoedaToFloat(fldQuantidade.val());

    var valorGastoTotal =  quantidade * valorUnitario;
    fldValorTotal.val(valorGastoTotal);

    controlComboRubricaAprovada();
}

$(document).ready(function () {
    var rubricaAprovadaId = comboRubrica.val();
    getValores(rubricaAprovadaId);
    $("#aviso").hide();
});























            // // valida os valores
            // if (valorAprovado > 0 && soma > valorAprovado) {
            //     App.alert({
            //         container: modalAlertSrc,
            //         type: 'danger',
            //         icon: 'warning',
            //         message: 'O valor deste item aprovado somado com os outros itens aprovados da rubrica selecionada está sendo maior do' +
            //         ' que o permitido.',
            //         closeInSeconds: '10'
            //     });
            // }

