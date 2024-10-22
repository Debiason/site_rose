//--------------------------------------------------VARIAVEIS-------------------------------------------------------
var divComplementorestituicao = $("#restituicaoComplemento"),
    checkCargoFuncao = $("input[name='AcertoPagamentoInterno[cargo_funcao]']"),
    checkDestino = $("input[name='AcertoPagamentoInterno[destino]']"),
    divLocalSaida = $("#viagem_informacoes_saida"),
    divLocalEntrada = $("#viagem_informacoes_entrada"),
    btn = $("#btn-salvar");

divComplementorestituicao.hide('slow');

//------------------------------------------------FIM VARIAVEIS-----------------------------------------------------

//--------------------------------------VALORES DE DIÁRIAS COM A TABELA-------------------------------------------------

//Verifica o cargo/função para calcular a diária
checkCargoFuncao.change(function () {
    var radioValueCargo = $("input[name='AcertoPagamentoInterno[cargo_funcao]']:checked").val();
    verificacargoFuncao(radioValueCargo);
});

//Verifica a cidade para calcular a diária
checkDestino.change(function () {
    var radioValueCargo = $("input[name='AcertoPagamentoInterno[cargo_funcao]']:checked").val();
    verificacargoFuncao(radioValueCargo);
    $("#i6").prop('checked', true);
    $("#box-diaria").show('slow');
    calculoDiaria();
});

//--------------------------------------------FIM DOS VALORES DE DIÁRIAS--------------------------------------------

//-----------------------------------------CALCULAR QUANTIDADES DE DIÁRIAS------------------------------------------
divLocalSaida.change(function () {
    getItensMultipleInput('saida')
});
divLocalEntrada.change(function () {
    getItensMultipleInput('entrada')
});

//-----------------------------------------FIM CALCULAR QUANTIDADES DE DIÁRIAS--------------------------------------

if ($("input[name='AcertoPagamentoInterno[precisa_diaria]']").is(':checked')) {
    var value = parseInt($("input[name='AcertoPagamentoInterno[precisa_diaria]']:checked").val());

    if (value === 1)
        $("#box-diaria").show();
    else
        $("#box-diaria").hide();
}

$(".precisa_diaria input").click(function () {
    let value = parseInt($(this).val());
    if (value === 1)
        $("#box-diaria").show('slow');
    else if (value === 0) {

        $("#box-diaria").hide('slow');
    }
    calculoDiaria();
});

$("#acertopagamentointerno-quantidade_diarias-disp").change(function () {
    calculoDiaria();
})

$("#valor_unitario_diaria-disp").change(function () {
    calculoDiaria();
})

$("#acertopagamentointerno-valor_adiantado-disp").on('blur', function () {
    calculaValores();
});

$("#valor_outras_despesas-disp").on('blur', function () {
    calculaValores()
});

//-------------------------------FUNÇÕES-------------------------------

function getItensMultipleInput(tipo) {

    var contagem = 0;
    if (tipo == 'saida'){
        contagem = $('#viagem_informacoes_saida .multiple-input-list__item[data-index]').length;
    }else{
        contagem = $('#viagem_informacoes_entrada .multiple-input-list__item[data-index]').length;
    }

    var viagem_entrada = [];
    var viagem_saida = [];
    var i = 0;
    for (i = 0; i < contagem; i++) {

        var local_saida = $('#acertopagamentointerno-viagem_informacoes_saida-' + i + '-local_saida').val();
        //    local_saida = removerAcentos(local_saida);
        var dt_saida = $('#acertopagamentointerno-viagem_informacoes_saida-' + i + '-data_saida').val();
        var hr_saida = $('#acertopagamentointerno-viagem_informacoes_saida-' + i + '-hora_saida').val();

        var local_entrada = $('#acertopagamentointerno-viagem_informacoes_entrada-' + i + '-local_entrada').val();
        //  local_entrada = removerAcentos(local_entrada);
        var dt_entrada = $('#acertopagamentointerno-viagem_informacoes_entrada-' + i + '-data_entrada').val();
        var hr_entrada = $('#acertopagamentointerno-viagem_informacoes_entrada-' + i + '-hora_entrada').val();


        if (local_saida != '' && dt_saida != '' && hr_saida != '') {
            viagem_saida[i] = [local_saida, dt_saida, hr_saida]
        }

        if (local_entrada != '' && dt_entrada != '' && hr_entrada != '') {
            viagem_entrada [i] = [local_entrada, dt_entrada, hr_entrada]
        }
    }

    if ((viagem_entrada.length >= 1) && (viagem_saida.length >= 1)) {

        $.ajax({
            url: '/acerto-pagamento-interno/get-quantidade-diarias',
            data: {
                viagem_saida: viagem_saida,
                viagem_entrada: viagem_entrada,
                indice: i
            },
            success: function (resp) {
                $("#acertopagamentointerno-quantidade_diarias-disp").val(resp);
                $("#acertopagamentointerno-quantidade_diarias").val(resp);
                calculaValores();
            }
        });
    }
}

function calculoDiaria() {

    let $inputQtDiarias = $("#acertopagamentointerno-quantidade_diarias-disp");
    let $inputVlDiarias = $("#valor_unitario_diaria-disp");

    let quantidadeDiarias = $inputQtDiarias.val();
    let vlUnitarioDiaria = $inputVlDiarias.val();

    let qtFormatado = quantidadeDiarias.toString().replace(",", ".");

    quantidadeDiarias = isNaN(qtFormatado) ? 0 : qtFormatado;
    vlUnitarioDiaria = isNaN(vlUnitarioDiaria) ? 0 : vlUnitarioDiaria;



    $("#valor_total_diarias-disp").val((quantidadeDiarias * vlUnitarioDiaria));
    $("#valor_total_diarias").val((quantidadeDiarias * vlUnitarioDiaria));
    calculaValores();
}

function calculaValores() {
    $("#restituicao").hide();
    $("#complemento").hide();

    let valor_adiantado = $("#acertopagamentointerno-valor_adiantado-disp").val();

    let valor_total_diarias = $("#valor_total_diarias-disp").val() == '' ? 0 : $("#valor_total_diarias-disp").val();
    let total_diarias_formatado = valor_total_diarias.toString().replace(".", "");
    total_diarias_formatado = total_diarias_formatado.toString().replace(",", ".");

    let valor_outras_despesas = $("#valor_outras_despesas-disp").val() == '' ? 0 : $("#valor_outras_despesas-disp").val();
    let valor_outras_formatado = valor_outras_despesas.toString().replace(".", "");
    valor_outras_formatado = valor_outras_formatado.toString().replace(",", ".");

    var valor_gasto = parseFloat(total_diarias_formatado) + parseFloat(valor_outras_formatado);

    $("#valor_gasto-disp").val(parseFloat(valor_gasto));
    $("#valor_gasto").val(parseFloat(valor_gasto));

    $.ajax({
        url: '/acerto-pagamento-interno/get-valor-diarias',
        data: {
            valor_adiantado: valor_adiantado,
            valor_outras_despesas: total_diarias_formatado,
            valor_total_diarias: valor_outras_formatado
        },
        success: function (resp) {

            // $("#valor_gasto-disp").val(resp['totalDespesa']);
            // $("#valor_gasto").val(resp['totalDespesa']);

            if (resp['valor'] < 0) {
                divComplementorestituicao.show('slow');
                $("#restituicao").show();
                $("#complemento").hide();
                $("#valor_restituicao-disp").val((resp['valor'] * -1));
                $("#valor_restituicao").val((resp['valor'] * -1));
                $("#valor_complemento-disp").val(0);
                $("#valor_complemento").val(0);
                btn.prop('disabled', false);
            }

            if (resp['valor'] > 0) {
                divComplementorestituicao.show('slow');
                $("#restituicao").hide();
                $("#complemento").show();
                $("#valor_complemento-disp").val((resp['valor']));
                $("#valor_complemento").val((resp['valor']));
                $("#valor_restituicao-disp").val(0);
                $("#valor_restituicao").val(0);
                btn.prop('disabled', false);
            }

            if (resp['valor'] == 0) {
                 divComplementorestituicao.add('d-none');
                divComplementorestituicao.hide('slow');
                $("#valor_complemento-disp").val(0);
                $("#valor_complemento").val(0);
                $("#valor_restituicao-disp").val(0);
                $("#valor_restituicao").val(0);
                btn.prop('disabled', false);
            }
        }
    });
}

function verificacargoFuncao(radioValueCargo) {
    let valueDestino = $("input[name='AcertoPagamentoInterno[destino]']:checked").val();
    var valorCalculadoDiaria = 0;
    $("#valor_unitario_diaria-disp").val(valorCalculadoDiaria);

    if (valueDestino != '' && radioValueCargo != ''){
        $.ajax({
            url: '/acerto-pagamento-interno/get-valor-cargo-funcao',
            data: {
                destino: valueDestino,
                cargo: radioValueCargo
            },
            success: function (resp) {
                $("#valor_unitario_diaria-disp").val(resp);
                $("#valor_unitario_diaria").val(resp);
                calculoDiaria();
            }
        });
    }
}
