//elements
var
    comboAdiantamento = $("select[name='AcertoAdiantamento[adiantamento_id]']"),
    fldValorAdiantado = $("input[name='AcertoAdiantamento[valoradiantado]'], input[name='acertoadiantamento-valoradiantado-disp']"),
    fldValorGastoSuprimento = $("input[name='AcertoAdiantamento[valorgastosuprimento]'], input[name='acertoadiantamento-valorgastosuprimento-disp']"),
    fldValorGastoDiaria = $("input[name='AcertoAdiantamento[valorgastodiaria]'], input[name='acertoadiantamento-valorgastodiaria-disp']"),
    fldValorGastoTotal = $("input[name='AcertoAdiantamento[valorgastototal]'], input[name='acertoadiantamento-valorgastototal-disp']"),
    fldValorAcerto = $("input[name='AcertoAdiantamento[valor]'], input[name='acertoadiantamento-valor-disp']"),
    fldQtdDiaria = $("input[name='AcertoAdiantamento[quantidadediarias'], input[name='acertoadiantamento-quantidadediarias-disp']"),
    fldValorUniDiaria = $("input[name='AcertoAdiantamento[valorunitariodiaria]'], input[name='acertoadiantamento-valorunitariodiaria-disp']"),
    fldQuantidadeDiarias = $("input[id='quantidadeDiariasMes']"),
    comboAcordo = $("select[name='AcertoAdiantamento[acordo_id]']"),
    fldFinalidade = $("textarea[name='AcertoAdiantamento[finalidade]']"),
    fldBotaoTabelaDiaria = $('.tabeladiaria'),
    fldBtnVerAdiantamento = $('#btnVerAdiantamento'),
    fldDtDeposito = $('.field-acertoadiantamento-dtdeposito');
    iconeMoedas = $("<i></i>").addClass("fas fa-coins mr-2");
    btnZeraValor = $('#btn-zera__valor');
    jaZerou = 0;
//fldTestePegaValorID = $("input[name='acertoadiantamento-idselecionado-disp']");
//btnUltimosPedidos = $(".btn-ultimos-pedidos");


//triggers
comboAdiantamento.change(function () {
    controlComboAdiantamento();
    calcAcerto(desfaz = 1);
});
comboAdiantamento.ready(function () {
    controlComboAdiantamento();
    calcAcerto();
});

fldValorGastoSuprimento.change(calcAcerto);
fldQtdDiaria.change(calcAcerto);
fldValorUniDiaria.change(calcAcerto);
fldValorGastoDiaria.change(calcAcerto);

btnZeraValor.click(zeraValor);

fldQuantidadeDiarias.change(changeQtdDiarias);

comboAcordo.change(controlComboAcordo);

//btnUltimosPedidos.click(loadUltimosPedidos);

function changeQtdDiarias() {
    fldQtdDiaria.val(fldQuantidadeDiarias.val());
    calcAcerto();
}

//functions
function controlComboAdiantamento() {
    var valorAdiantamentoId = comboAdiantamento.val();
    getValorAdiantamento(valorAdiantamentoId);
}

function getValorAdiantamento(valorAdiantamentoId) {

    if (valorAdiantamentoId != null) {
        $.ajax({
            url: '/adiantamento/getadiantamento/',
            data: {
                id: valorAdiantamentoId
            },
            async: false,
            success: function (resp) {
                fldValorAdiantado.val(resp.valor);
                fldFinalidade.val(resp.finalidade);
                fldBtnVerAdiantamento.attr("href", resp.url);
                fldBtnVerAdiantamento.attr("href", resp.url);
                if (resp.tipoAdiantamento == 'viagem') {
                    $("#especificoAdiantamentoViagem").show('slow');
                } else {
                    $("#especificoAdiantamentoViagem").hide('slow');
                }
            }
        });
    }

}

function calcAcerto(desfaz = null) {

    var valorAdiantamentoId = comboAdiantamento.val();
    var modelId = $("#modelId").val();

    $.ajax({
        url: '/adiantamento/getadiantamento/',
        data: {
            id: valorAdiantamentoId,
            pedidoId: modelId
        },
        async: false,
        success: function (resp) {
            if (resp.tipoAdiantamento == 'viagem') {

                var valorAdiantado = $.convertMoedaToFloat(fldValorAdiantado.val());
                var valorUnitarioDiaria = $.convertMoedaToFloat(fldValorUniDiaria.val());
                var valorGastoSuprimento = $.convertMoedaToFloat(fldValorGastoSuprimento.val());
                var qtdDiaria = $.convertMoedaToFloat(fldQtdDiaria.val());

                var valorGastoDiaria = qtdDiaria * valorUnitarioDiaria;

                var valorGastoTotal = valorGastoSuprimento + valorGastoDiaria;
                var valorAcerto = valorAdiantado - valorGastoTotal;

                if(valorAcerto <= resp.valorMaximo && valorAcerto >= resp.valorMinimo){
                    if (valorAcerto < 0) {
                        valorAcerto = valorAcerto * -1;
                    }
                    if(valorAcerto != 0){
                        if(resp.EmPagamento == 0){
                            $("#div-zerar__valor").show('slow')
                        }
                    } else {
                        $("#div-zerar__valor").hide('slow')
                    }
                } else {
                    $("#div-zerar__valor").hide('slow')
                }

                if (valorAcerto > 0) {
                    var label = "Valor à devolver";
                    fldDtDeposito.show();
                } else {
                    var label = "Valor à receber";
                    fldDtDeposito.hide();
                }

                if (desfaz == null) {
                    if (resp.valorAcerto === '0.00') {
                        valorAcerto = 0;
                        btnZeraValor.text("Desfazer");
                        btnZeraValor.prepend(iconeMoedas);
                        jaZerou = 1;
                    }
                } else {
                    btnZeraValor.text("Zerar Valor");
                    btnZeraValor.prepend(iconeMoedas);
                    jaZerou = 0
                }

                fldValorGastoDiaria.val(valorGastoDiaria.toFixed(2));
                fldValorGastoTotal.val(valorGastoTotal.toFixed(2));

                valorAcerto = Math.abs(valorAcerto);
                fldValorAcerto.val(valorAcerto.toFixed(2));

                $(".field-acertoadiantamento-valor label").text(label);

            } else {

                var valorGastoSuprimento = $.convertMoedaToFloat(fldValorGastoSuprimento.val());

                var valorGastoTotal = $.convertMoedaToFloat(valorGastoSuprimento);

                var valorAdiantado = $.convertMoedaToFloat(fldValorAdiantado.val());

                var valorAcerto = $.convertMoedaToFloat(valorAdiantado) - valorGastoTotal;

                if(valorAcerto <= resp.valorMaximo && valorAcerto >= resp.valorMinimo){
                    if (valorAcerto < 0) {
                        valorAcerto = valorAcerto * -1;
                    }
                    if(valorAcerto != 0) {
                        if (resp.emPagamento == 0) {
                            $("#div-zerar__valor").show('slow')
                        }
                    } else {
                        $("#div-zerar__valor").hide('slow')
                    }
                } else {
                    $("#div-zerar__valor").hide('slow')
                }

                if (valorAcerto > 0) {
                    var label = "Valor à devolver";
                    fldDtDeposito.show();
                } else {
                    var label = "Valor à receber";
                    fldDtDeposito.hide();
                }

                if(desfaz == null){
                    if(resp.valorAcerto === '0.00'){
                        valorAcerto = 0;
                        btnZeraValor.text("Desfazer");
                        btnZeraValor.prepend(iconeMoedas);
                        jaZerou = 1;
                    }
                } else {
                    btnZeraValor.text("Zerar Valor");
                    btnZeraValor.prepend(iconeMoedas);
                    jaZerou = 0
                }

                fldValorGastoTotal.val(valorGastoTotal.toFixed(2));

                valorAcerto = Math.abs(valorAcerto);
                fldValorAcerto.val(valorAcerto.toFixed(2));

                $(".field-acertoadiantamento-valor label").text(label);
            }
        }
    });
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
                    $(".tabeladiaria").attr("href", url);
                }
            }
        });
    }
}

function zeraValor(){
    btnZeraValor.fadeOut(300, function() {
        if(jaZerou === 1){
            btnZeraValor.text("Zerar Valor");
            btnZeraValor.prepend(iconeMoedas);
            jaZerou = 0
            calcAcerto(desfaz = 1)
        } else{
            btnZeraValor.text("Desfazer");
            btnZeraValor.prepend(iconeMoedas);
            fldValorAcerto.val(0.00)
            jaZerou = 1;
        }
        btnZeraValor.fadeIn(300);
    });
}

$(document).ready(function () {
    var valorConveniocontratoId = comboAcordo.val();
    verificaExisteTabelaDiaria(valorConveniocontratoId);
    calcAcerto();
});