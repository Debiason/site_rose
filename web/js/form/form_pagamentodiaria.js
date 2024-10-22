//elements
var fldQuantidadeDiarias = $("input[name='PagamentoDiaria[quantidadediarias]'], input[name='pagamentodiaria-quantidadediarias-disp']"),
    fldValorUnitarioDiaria = $("input[name='PagamentoDiaria[valorunitariodiaria]'], input[name='pagamentodiaria-valorunitariodiaria-disp']"),
    fldValorTotalDiarias = $("input[name='PagamentoDiaria[valor]'], input[name='pagamentodiaria-valor-disp']"),
    fldDiariasPorMes = $(".quantidadeDiariasMes"),
    comboAcordo = $("select[name='PagamentoDiaria[acordo_id]']"),
    fldBotaoTabelaDiaria = $('.tabeladiaria');

let elementos = document.querySelectorAll("#mensagem");
let contador = elementos.length;

for (let i = 0; i < contador; i++) {
    var spanMensagem = $($(".mensagem-" + i));
    spanMensagem.hide();
}

//triggers
fldQuantidadeDiarias.change(calcValorTotal);
fldValorUnitarioDiaria.change(calcValorTotal);
fldDiariasPorMes.change(atualizaDiarias);

comboAcordo.change(controlComboAcordo);

//functions

function atualizaDiarias() {
    var diarias = 0;
    fldDiariasPorMes.each(function() {
        diarias = diarias + $.convertMoedaToFloat($(this).val());
        fldQuantidadeDiarias.val(diarias);
    });
    atualizaQtdDiarias()
}

function atualizaQtdDiarias() {
    var diarias = 0;
    var salvar = $('#button_salvar');
    var i = 0;
    var controle = true;
    fldDiariasPorMes.each(function() {
        spanMensagem = $(".mensagem-" + i);
        spanMensagem.hide();

        diarias = diarias + $.convertMoedaToFloat($(this).val());
        var diariaAtuais = $.convertMoedaToFloat($(this).val())
        var totalCalculado = document.getElementById('totalCalculado-' + i).value;

        if (diariaAtuais > totalCalculado) {
            spanMensagem.show('slow');
            controle = false;
        } else {
            spanMensagem.hide('slow');
        }

        i++;
    });

    if (controle) {
        salvar.show('slow')
    } else {
        salvar.hide('slow')
    }

    calcValorTotal();
}

function calcValorTotal() {
    var qtdDiarias = $.convertMoedaToFloat(fldQuantidadeDiarias.val());
    var valorUnitarioDiaria = $.convertMoedaToFloat(fldValorUnitarioDiaria.val());

    var valorTotal = qtdDiarias * valorUnitarioDiaria;
    fldValorTotalDiarias.val(valorTotal.toFixed(2));
}


function controlComboAcordo() {

    var valorConveniocontratoId = comboAcordo.val();
    verificaExisteTabelaDiaria(valorConveniocontratoId);

}

//verifica se o convenio contrato selecionado possui uma tabela de diaria associada
function verificaExisteTabelaDiaria(valorConveniocontratoId) {

    modelId = $("#modelId").val();

    if (valorConveniocontratoId == '') {
        fldBotaoTabelaDiaria.hide();

    } else {
        $.ajax({
            url: '/acordo/geturltabeladiaria/',
            data: {
                id: valorConveniocontratoId,
                pedidoId: modelId
            },
            async: false,
            success: function (resp) {

                if (resp.data.success == false) {
                    fldBotaoTabelaDiaria.hide();
                } else {
                    fldBotaoTabelaDiaria.show();
                    var url = resp.data.url;
                    $( ".tabeladiaria" ).attr("href", url);

                    // if (resp.data.funarbe == true){
                    //     $("#tabela-antiga-funarbe").show();
                    //     $("#aviso-tabela-funarbe").show();
                    // }
                }
            }
        });
    }
}

$(document).ready(function () {
    var valorConveniocontratoId = comboAcordo.val();
    verificaExisteTabelaDiaria(valorConveniocontratoId);
    atualizaQtdDiarias();
});

setTimeout(() => {
    $("html, body").animate({scrollTop: 0}, "fast");

}, 2000)
