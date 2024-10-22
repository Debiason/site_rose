var flddadosTipoPedido = $("#comboTipoPedido"),
    fldcheckbox = $("input[name='RelatorioForm[liberacao]']"),
    fldProjetoSic = $("#projeto-sic");
var spanParcelas = $("#span_parcelas");
var spanValores = $("#span_valores");
var valoresBordero = $("#valores_bordero");
var selectParcelas = document.getElementById("select_parcelas");
var parcelas = '';
var controle = false;

spanParcelas.hide();
spanValores.hide();
valoresBordero.hide();

fldcheckbox.on('click', function () {

    if ($(this).is(':checked')) {
        flddadosTipoPedido.hide("slow");
    } else {
        flddadosTipoPedido.show("slow");
    }

});


$(document).ready(function () {

    $("#fld-categoria-solicitacao").attr('required', 'required');

    if (fldcheckbox.is(':checked')) {
        flddadosTipoPedido.hide("slow");
    } else {
        flddadosTipoPedido.show("slow");
    }

    $("#informacao-centro-custo").hide();

    // campos apresentados quando setor é gestão de recursos
    $('#nosso-numero').hide();
    $('#data-contabilizacao').hide();
    $('#conta-bancaria-solicitacao').hide();
    $('#valor-solicitacao').hide();
    fldProjetoSic.hide();
});

$('#fld-nossonumero').change(function () {
    var fldPedido =  $("#fld-pedidosearch");
    var fldCentroCusto = $("#fld-centrocusto");
    var fldAcordo = $("#fld-acordo");
    var pedidoId = $("select[id='fld-nossonumero']").val();

    if (pedidoId) {
        // função carrega pedido quando o nosso número é preenchido
        buscaPedido(fldPedido, pedidoId);
        // função busca o centro associado ao pedido
        buscaCentroCusto(fldCentroCusto, pedidoId);
        // função busca projeto associado ao pedido
        buscaProjeto(fldAcordo, pedidoId);
    } else {
        window.location.reload();  // alterar quando possível
    }
});

function buscaPedido(fldPedido, pedidoId) {
    $.ajax({
        url: '/busca-pedido/pedido-remote-search/',
        data: {
            id: pedidoId,
        },
        async: false,
        success: function (resp) {
            var resultado = resp['results'];
            fldPedido.html('<option value=' + resultado.id + '>' + resultado.id + " - " + resultado.text + '</option>');
            fldPedido.attr('style', 'width: 100%;');
            fldPedido.select2();
            fldPedido.val(resultado.id).trigger('change.select2');
        }
    });
}

function buscaCentroCusto(fldCentroCusto, pedidoId) {
    $.ajax({
        url: '/centro-custo/centro-custo-remote-search/',
        data: {
            id: pedidoId,
        },
        async: false,
        success: function (resp) {
            var resultado_cc = resp['results'];
            fldCentroCusto.html('<option value=' + resultado_cc.id + '>' + resultado_cc.id + " - " + resultado_cc.text + '</option>');
            fldCentroCusto.attr('style', 'width: 100%;');
            fldCentroCusto.select2();
            fldCentroCusto.val(resultado_cc.id).trigger('change.select2');

            // chama função para mostrar detalhes do centro custo
            buscaDetalhesCentroCusto(resultado_cc.id);
        }
    });
}

function buscaValoresPedido(){
    if (controle){
        return;
    }
    var pedido_Id = $("select[id='fld-pedidosearch']").val()
    $.ajax({
        url: '/busca-pedido/pedido-valores-search/',
        data: {
            id: pedido_Id
        },
        async: false,
        success: function (resp) {
            parcelas = resp.results.pedido;
            var tamanho = resp.results.pedido.length;
            controle = true;
            for (var i = 0; i < tamanho; i++) {
                var option = document.createElement("option");
                option.text = resp.results.pedido[i].parcela;
                selectParcelas.add(option);
            }
            spanParcelas.show('slow');
        }
    });
}
selectParcelas.addEventListener('change', function(){
    adicionaValoresParcela();
})

function buscaProjeto(fldAcordo, pedidoId) {
    $.ajax({
        url: '/acordo/acordo-remote-search/',
        data: {
            id: pedidoId,
        },
        async: false,
        success: function (resp) {
            var resultado_acordo = resp['results'];
            fldAcordo.html('<option value=' + resultado_acordo.id + '>' + resultado_acordo.id + " - " + resultado_acordo.text + '</option>');
            fldAcordo.attr('style', 'width: 100%;');
            fldAcordo.select2();
            fldAcordo.val(resultado_acordo.id).trigger('change.select2');
        }
    });
}

$('#fld-centrocusto').change(function () {
    var centrocustoId = $(this).val();
    buscaDetalhesCentroCusto(centrocustoId);
});

function buscaDetalhesCentroCusto(centrocustoId){
    $.ajax({
        url: '/centro-custo/get-informacao/',
        data: {
            id: centrocustoId
        },
        success: function (resp) {

            $("#informacao-centro-custo").show();
            $("#centrocusto-contabancaria").html('Agência: '+resp.agencia + ' / ' + 'Conta: ' + resp.conta);
            $("#centrocusto-departamento").html('Departamento RM: '+resp.departamento);
            buscaValoresPedido();

            if($('#fld-categoria-solicitacao').val() == 10){
                $('#solicitacao-agencia').val(resp.agenciaSemDv);
                $('#solicitacao-agenciadigito').val(resp.agenciaDv);
                $('#solicitacao-conta').val(resp.contaSemDv);
                $('#solicitacao-contadigito').val(resp.contaDv);
            }
        }
    });
}

$('#fld-setor').change(function () {
    var setorSolicitacao = $(this).val();
    var categoriaSolicitacao = $('#fld-categoria-solicitacao:selected').val();
    validaValorObrigatorio(false);
    identificaoCredito(categoriaSolicitacao);
    verificarSetor(setorSolicitacao);
    verificaPermiteResponsavel(categoriaSolicitacao);
});

$('#fld-categoria-solicitacao').change(function () {
    validaValorObrigatorio(false)
    identificaoCredito($(this).val());
    validaInputsRequired($(this).val());
});

function identificaoCredito(categoriaSolicitacao) {
    if (categoriaSolicitacao == 5 || categoriaSolicitacao == 6 || categoriaSolicitacao == 10) {
        $('#nosso-numero').show();
        $('#data-contabilizacao').show();
        $('#valor-solicitacao').show();
        //$('#anexo-solicitacao-create').show();
        $('#valores_bordero').hide();
        if (categoriaSolicitacao == 5) {
            $('#conta-bancaria-solicitacao').show();
            validaValorObrigatorio(true)
            $('#valores_bordero').hide();
        }
        if (categoriaSolicitacao == 6) {
            validaValorObrigatorio(true)
        }
        if (categoriaSolicitacao == 10) {
            $('#valor-solicitacao').hide();
            $('#conta-bancaria-solicitacao').show();
            $('#valores_bordero').show('slow');
            fldProjetoSic.show();

        //    validaValorObrigatorio(true)

            //adiciona valores patrões da agencia e conta
            $('#solicitacao-agencia').val('0428');
            $('#solicitacao-agenciadigito').val('6');
            $('#solicitacao-conta').val('3362');
            $('#solicitacao-contadigito').val('6');

        }

    } else {
        $('#nosso-numero').hide();
        $('#data-contabilizacao').hide();
        $('#valor-solicitacao').hide();
        //$('#anexo-solicitacao-create').hide();
        $('#conta-bancaria-solicitacao').hide();
        $('#valores_bordero').hide();
    }
}


$('#fld-nossonumero').change(function () {
    var nosso_numero = document.querySelector("#select2-fld-nossonumero-container").title;
    buscaParcelaNotaFiscal(nosso_numero);
});

function buscaParcelaNotaFiscal(nossoNumero){
    $.ajax({
        url: '/parcela-nota-fiscal/get-parcela/',
        data: {
            nossoNumero: nossoNumero
        },
        success: function (resp) {
            $("#parcela").val(resp);
            spanParcelas.hide();
            $('#select_parcelas').val(resp)
            adicionaValoresParcela();
        }
    });
}

function adicionaValoresParcela(){
    var valorRecebido = $('#solicitacao-valor_recebido-disp');
    var tarifaBancaria = $('#solicitacao-tarifa_bancaria-disp');
    var valorDesconto = $('#solicitacao-valor_desconto-disp');
    var valorJuros = $('#solicitacao-valor_juros-disp');

    var parcela = parcelas[selectParcelas.value - 1];

    document.querySelector("#select2-fld-nossonumero-container").innerHTML = parcela.nosso_numero;
    $("#parcela").val(parcela.parcela);
    $('#solicitacao-numero_nota_fiscal').val(parcela.notafiscalprefeitura);

    //formata a data
    var date = parcela.dtfaturamento;
    var partes = date.split('-');
    var dataFormatada = partes[2]+'-'+partes[1]+'-'+partes[0];
    $('#solicitacao-data_contabilizacao-disp').val(dataFormatada);

    spanValores.show('slow');

    var valorTotal = 0;
    //valor recebido
    valorRecebido.val(parcela.valor ?? 0);
    valorTotal =  $.converteMoedaFloat(valorRecebido.val());
    //valor tarifa
    tarifaBancaria.val(parcela.tarifabancaria ?? 0);
    valorTotal = valorTotal -  $.converteMoedaFloat(tarifaBancaria.val());
    //valor desconto
    valorDesconto.val(parcela.valordesconto ?? 0);
    valorTotal = valorTotal -  $.converteMoedaFloat(valorDesconto.val());
    //valor juros
    valorJuros.val(parcela.valorjuros ?? 0);
    valorTotal = valorTotal -  $.converteMoedaFloat(valorJuros.val());

    //valor total
    var inputValorTotal = $("input[name='inputValorTotal']");
    inputValorTotal.val($.convertFloatToMoeda(valorTotal));

    spanParcelas.hide('slow');
    controle = false;
}

function verificaPermiteResponsavel(categoria) {
    $.ajax({
        url: '/solicitacao/verifica-permite-responsavel/',
        data: {
            categoria: categoria
        },
        success: function (resp) {
            if (resp == 1) {
                $('#responsavel-solicitacao').show('slow');
            } else {
                $('#responsavel-solicitacao').hide('slow');
            }
        },
        error: function () {
            $('#responsavel-solicitacao').hide('slow');
        }
    });
}

function verificarSetor(setorSolicitacao) {
    $.ajax({
        url: '/solicitacao/carregar-responsaveis/',
        data: {
            setorId: setorSolicitacao
        },
        success: function (data) {
            var usuarios = JSON.parse(data);
            var select2 = $('#solicitacao-responsavel');

            select2.empty();
            select2.append(new Option('Selecione ...', ''));

            for (var id in usuarios) {
                if (usuarios.hasOwnProperty(id)) {
                    select2.append(new Option(usuarios[id], id));
                }
            }

            select2.trigger('change');
        },
        error: function (error) {
            console.log('Erro ao carregar responsáveis:', error);
        }
    });
}

$('#fld-categoria-solicitacao').change(function () {
    var categoria = $(this).val();
    var setor = $('#fld-setor').val();

    verificaPermiteResponsavel(categoria);

    if (categoria == 9) { // 9 - resgate total
        $('.field-fld-pedidosearch').hide();
        $('.field-fld-acordo').hide();
    } else if (setor == 9) {
        $('.field-fld-pedidosearch').hide();
    } else {
        $('.field-fld-pedidosearch').show();
        $('.field-fld-acordo').show();
    }

});

function validaValorObrigatorio(obrigatorio) {
    if (obrigatorio) {
        $("#solicitacao-valor-0-disp").prop('required', true);
    } else {
        $("#solicitacao-valor-0-disp").prop('required',false);
    }
}

function adicionaValoresParcela(){
    var valorRecebido = $('#solicitacao-valor_recebido-disp');
    var tarifaBancaria = $('#solicitacao-tarifa_bancaria-disp');
    var valorDesconto = $('#solicitacao-valor_desconto-disp');
    var valorJuros = $('#solicitacao-valor_juros-disp');

    var parcela = parcelas[selectParcelas.value - 1];

    document.querySelector("#select2-fld-nossonumero-container").innerHTML = parcela.nosso_numero;
    $("#parcela").val(parcela.parcela);
    $('#solicitacao-numero_nota_fiscal').val(parcela.notafiscalprefeitura);

    //formata a data
    var date = parcela.dtfaturamento;
    var partes = date.split('-');
    var dataFormatada = partes[2]+'-'+partes[1]+'-'+partes[0];
    $('#solicitacao-data_contabilizacao-disp').val(dataFormatada);

    spanValores.show('slow');

    var valorTotal = 0;
    //valor recebido
    valorRecebido.val(parcela.valor ?? 0);
    valorTotal =  $.converteMoedaFloat(valorRecebido.val());
    //valor tarifa
    tarifaBancaria.val(parcela.tarifabancaria ?? 0);
    valorTotal = valorTotal -  $.converteMoedaFloat(tarifaBancaria.val());
    //valor desconto
    valorDesconto.val(parcela.valordesconto ?? 0);
    valorTotal = valorTotal -  $.converteMoedaFloat(valorDesconto.val());
    //valor juros
    valorJuros.val(parcela.valorjuros ?? 0);
    valorTotal = valorTotal -  $.converteMoedaFloat(valorJuros.val());

    //valor total
    var inputValorTotal = $("input[name='inputValorTotal']");
    inputValorTotal.val($.convertFloatToMoeda(valorTotal));

    spanParcelas.hide('slow');
    controle = false;
}

function validaInputsRequired(id) {
    $.ajax({
        url: '/categoria-solicitacao/get-dados/',
        data: {
            id: id
        },
        async: false,
        success: function (resp) {
            var dadosEspecificos = resp.dados_especificos;

            function configurarCampoObrigatorio(idCampo, mensagemErro, obrigatorio) {

                $(`#${idCampo}`).attr('required', obrigatorio ? 'required' : false);

                setTimeout(function () {
                    $(`.field-${idCampo}`).toggleClass('has-error', obrigatorio);
                    $(`#${idCampo}`).toggleClass('is-invalid', obrigatorio);
                    $(`.field-${idCampo} .invalid-feedback`).html(obrigatorio ? mensagemErro : '');
                }, 500);
            }

            configurarCampoObrigatorio("fld-pedidosearch", 'Pedido é obrigatório.', dadosEspecificos.includes("Pedido"));
            configurarCampoObrigatorio("fld-acordo", 'Projeto é obrigatório.', dadosEspecificos.includes("Projeto"));
            configurarCampoObrigatorio("fld-centrocusto", 'Centro de Custo é obrigatório.', dadosEspecificos.includes("CentroCusto"));
        }
    });
}