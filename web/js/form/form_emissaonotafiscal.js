//elements
var
    comboContratante = $("select[name='EmissaoNotaFiscal[contratante_id]']"),
    comboAcordo = $("select[name='EmissaoNotaFiscal[acordo_id]']"),
    fldNaturezaOperacao = $("input[name='EmissaoNotaFiscal[naturezaoperacao]']"),
    fldValorNota = $("input[name='emissaonotafiscal-valor-disp'], input[name='EmissaoNotaFiscal[valor]']"),
    divProdutosNota = $("#produtos-nota-venda"),
    tableProdutosVenda = $("#table-produtos-venda"),
    fldContato = $("textarea[name='EmissaoNotaFiscal[contatos]']"),
    fldParcela = $("#emissaonotafiscal-parcelas"),
    fldDtPrimeiraParcela = $("#emissaonotafiscal-dtprimeiraparcela"),
    fldDtPrimeiraParcelaDisp = $("#emissaonotafiscal-dtprimeiraparcela-disp"),
    fldDescricao = $("#emissaonotafiscal-descricaoservico"),
    fldNFPrefeitura = $("#emissaonotafiscal-notafiscalprefeitura"),
    limiteEdital = 0,
    permiteAcimaLimite = false,
    btnSubmitEnviar = $("button[name='enviar']"),
    checkClienteFunarbe = $("input[name='EmissaoNotaFiscal[clienteFunarbe]']"),
    checkProjetoEspecifico = $("input[name='EmissaoNotaFiscal[projeto_especifico]']"),
    checkTermoAceito = $("input[name='EmissaoNotaFiscal[termo_aceite]"),
    // fldValorOriginal = $('#emissaonotafiscal-valor_origem-disp'),
    // fldTaxaCambio = $('#emissaonotafiscal-taxa_cambio-disp'),
    fldValor = $('#emissaonotafiscal-valor-disp'),
    modalInformacaoNotaFiscal = $('#informacao-emissao-nota-fiscal'),
    checkDeclaracaoNotaFiscal = $('#declaracao-emissao-nota-fiscal'),
    fldJustificativa = $('.field-emissaonotafiscal-justificativa_valor'),
    checkBoleto = $('.field-emissaonotafiscal-boleto'),
    checkTermoAceite = $('.field-emissaonotafiscal-termo_aceite'),
    fldClienteFunarbe = $('.field-emissaonotafiscal-clientefunarbe'),
    fldMoeda = $('.field-emissaonotafiscal-moedaid'),
    // fldEmissaoNotaFiscal = $('.field-emissaonotafiscal-taxa_cambio'),
    fldValorOrigem = $('.field-emissaonotafiscal-valor_origem'),
    divDadosImportacao = $('#dados-importacao'),
    divCambio = $('#cambio-importacao'),
    fldNcm =  $('#emissaonotafiscal-ncmemissaonotafiscal-ncm'),
    fldNfEvento =  document.getElementById('nf-evento-checkbox');

//triggers
comboAcordo.change(function(){
    for (var i = 1; i <= 10; i++) {
        $('.field-emissaonotafiscal-itens_contatos .multiple-input-list__item[data-index="' + i + '"]').remove();
    }
});
comboContratante.change(function () {
    for (var i = 1; i <= 10; i++) {
        $('.field-emissaonotafiscal-itens_contatos .multiple-input-list__item[data-index="' + i + '"]').remove();
    }
    setDadosContato();
});

fldNaturezaOperacao.ready(function () {
    verificaNatureza();
});

fldNaturezaOperacao.change(function () {
    verificaNatureza();
});

fldNfEvento.addEventListener('change', function () {
    if (fldNfEvento.checked) {
        if (!comboAcordo.val()) {
            $('#aviso-projeto-nao-selecionado').text('Projeto não selecionado.')
        }
        $('#inscricao').show('slow')
    } else {
        $('#inscricao').hide('slow')
    }
});

tableProdutosVenda.change(function () {
    calculaProdutos();
});

tableProdutosVenda.click(function () {
    calculaProdutos();
});

tableProdutosVenda.keypress(function () {
    calculaProdutos();
});

tableProdutosVenda.keydown(function () {
    calculaProdutos();
});

tableProdutosVenda.ready(function () {
    calculaSomaTotal();
});

checkClienteFunarbe.click(function () {
    calculaSomaTotal();
});

$(".js-input-plus").click(function () {
    setTimeout(function () {
        carregaProdutos();
    }, 1000);
});

comboAcordo.change(function () {
   verificaProjetoPossuiSecao();
   atualizaValorLimiteAviso();
   carregaCampoPedidoCompra();
});

comboAcordo.ready(function () {
    if (comboAcordo.val() == '' || comboAcordo.val() == null) {
        $("#div-natureza-operazao").hide();
    } else {
        verificaProjetoPossuiSecao();
        atualizaValorLimiteAviso();
    }

    carregaCampoPedidoCompra();
});

btnSubmitEnviar.click(function (event) {
    event.preventDefault();
    verificaJustificativaPreco(event);
});

//functions
function setDadosContato() {

    var tbody = $('.field-emissaonotafiscal-itens_contatos tbody');
    var count = $('.field-emissaonotafiscal-itens_contatos tbody tr').length;
    var ii = 1;
    for (var i = 1; i <= count; i++) {
        var elementoTipo = $('.field-emissaonotafiscal-itens_contatos .multiple-input-list__item .field-emissaonotafiscal-itens_contatos-'+i+'-tipo_contato');
        elementoTipo.remove();
        var elementoValor = $('.field-emissaonotafiscal-itens_contatos-'+i+'-valor_contato');
        elementoValor.remove();
        var elementoBtn = $('.js-input-remove');
        elementoBtn.remove();
    }

    $.ajax({
        url: '/emissao-nota-fiscal/get-dados-contato/',
        data: {
            id: comboContratante.val()
        },
        async: false,
        success: function (resp) {

            if (!resp == '') {
                dados = resp.nome + '. ';
                dados += 'Telefone Comercial: ' + resp.telefone + ". ";
                dados += 'E-mail comercial: ' + resp.email;

                if (resp.email) {
                    $("#emissaonotafiscal-itens_contatos-0-valor_contato").val(resp.email);
                }

                if (resp.telefone) {
                    var elemento = $('.field-emissaonotafiscal-itens_contatos .multiple-input-list__item').clone();
                    elemento.attr('data-index', 1);
                    elemento.find('select').attr('name', 'EmissaoNotaFiscal[itens_contatos][1][tipo_contato]');
                    elemento.find('select').attr('id', 'emissaonotafiscal-itens_contatos-1-tipo_contato');
                    elemento.find('select').val(1);
                    elemento.find('input').attr('name', 'EmissaoNotaFiscal[itens_contatos][1][valor_contato]');
                    elemento.find('input').attr('id', 'emissaonotafiscal-itens_contatos-1-valor_contato');
                    elemento.find('input').val(resp.telefone);
                    elemento.find('.js-input-plus').attr('class', 'multiple-input-list__btn js-input-remove btn btn-danger');
                    elemento.find('i').attr('class', 'glyphicon glyphicon-remove');

                    var grid = $(".field-emissaonotafiscal-itens_contatos");
                    grid.find('tbody').append(elemento);
                }
            } else {
                dados = '';
                $("#emissaonotafiscal-itens_contatos-0-valor_contato").val(' ');
            }

            fldContato.html(dados);
        }
    });

    if (comboAcordo.val()) {
        $.ajax({
            url: '/emissao-nota-fiscal/get-email-coordenador/',
            data: {
                id: comboAcordo.val()
            },
            async: false,
            success: function (resp) {
                if (!resp == '') {
                    var elemento = $('.field-emissaonotafiscal-itens_contatos .multiple-input-list__item[data-index="0"]').clone();
                    elemento.attr('data-index', 2);
                    elemento.find('select').attr('name', 'EmissaoNotaFiscal[itens_contatos][2][tipo_contato]');
                    elemento.find('select').attr('id', 'emissaonotafiscal-itens_contatos-2-tipo_contato');
                    elemento.find('select').val(99);
                    elemento.find('input').attr('name', 'EmissaoNotaFiscal[itens_contatos][2][valor_contato]');
                    elemento.find('input').attr('id', 'emissaonotafiscal-itens_contatos-2-valor_contato');
                    elemento.find('input').val(resp);
                    elemento.find('.js-input-plus').attr('class', 'multiple-input-list__btn js-input-remove btn btn-danger');
                    elemento.find('i').attr('class', 'glyphicon glyphicon-remove');
                    var grid = $(".field-emissaonotafiscal-itens_contatos");
                    grid.find('tbody').append(elemento);
                }
            }
        });
    }
}

function verificaNatureza() {
    fldNaturezaOperacao.each(function () {
        if ($(this).is(':checked')) {
            var naturezas = ['Venda', 'Remessa', 'Entrada', 'Doacao', 'RemessaInterancional'];

            console.log($(this).val())

            if (naturezas.includes($(this).val())) {
                var naturezaImportacao = ['Entrada', 'Doacao', 'RemessaInterancional'];

                if (naturezaImportacao.includes($(this).val())) {
                    operacaoImportacao(true);
                } else {
                    operacaoImportacao(false);
                }

                divProdutosNota.show('slow');

                //Parcela
                fldParcela.hide('slow');
                $("label[for='emissaonotafiscal-parcelas']").hide();
                fldParcela.val(1);

                //DtPrimeiraParcela
                $("#div-dtprimeiraparcela").hide('slow');
                fldDtPrimeiraParcela.val('');
                fldDtPrimeiraParcelaDisp.val('');

                //Descricao
                fldDescricao.hide('slow');
                $("label[for='emissaonotafiscal-descricaoservico']").hide();
                fldDescricao.val('N/A');

                //NF prefeitura
                fldNFPrefeitura.hide('slow');
                $("label[for='emissaonotafiscal-notafiscalprefeitura']").hide();

                //Valor nota
                //fldValorNota.attr('readonly', true);

                //Label do campo contatos
                $("label[for='emissaonotafiscal-contatos']").text('Contatos p/ encaminhamento da NF');

                //Label do campo contrantante
                $("label[id='label-for-contratante']").text('Cliente');

                divCambio.hide('slow');

            } else {

                divProdutosNota.hide('slow');

                //Parcela
                fldParcela.show('slow');
                $("label[for='emissaonotafiscal-parcelas']").show();

                //DtPrimeiraParcela
                $("#div-dtprimeiraparcela").show();

                //Descricao
                fldDescricao.show('slow');
                $("label[for='emissaonotafiscal-descricaoservico']").show();

                //NF prefeitura
                fldNFPrefeitura.show('slow');
                $("label[for='emissaonotafiscal-notafiscalprefeitura']").show();

                //Valor nota
                fldValorNota.attr('readonly', false);

                //Label do campo contatos
                $("label[for='emissaonotafiscal-contatos']").text('Contatos');

                //Label do campo contrantante
                $("label[id='label-for-contratante']").text('Contratante');

                // importantacao
                divDadosImportacao.hide('slow');

                // importantacao
                divCambio.hide('slow');
            }
        }
    });
}

function calculaProdutos() {

    var totalProdutos = 0;

    $('div#table-produtos-venda > table > tbody  > tr').each(function (index, tr) {

        var fldQuantidade = $(tr).find(".fld-quantidade").val();
        var fldValorUn = $(tr).find(".fld-valor-uni").val();
        var fldValorTotal = $(tr).find(".fld-valor-total");
        var soma = 0;

        if (fldQuantidade.includes(',')) {
            fldQuantidade = $.converteMoedaFloat(fldQuantidade);
        }
        if (fldValorUn.includes(',')) {
            fldValorUn = $.converteMoedaFloat(fldValorUn);
        }

        soma = fldQuantidade * fldValorUn;
        fldValorTotal.val(soma);
        totalProdutos += soma;
    });

    $(".fld-total-venda").html('Total: R$'+$.convertFloatToMoeda(totalProdutos));
    fldValorNota.val(totalProdutos.toFixed(2));
    verificaSelecaoPublica(totalProdutos);
}

function calculaSomaTotal() {

    var totalProdutos = 0;

    $('div#table-produtos-venda > table > tbody  > tr').each(function (index, tr) {

        var fldQuantidade = $(tr).find(".fld-quantidade").val();
        var fldValorUn = $(tr).find(".fld-valor-uni").val();
        var soma = 0;

        if (fldQuantidade.includes(',')) {
            fldQuantidade = $.converteMoedaFloat(fldQuantidade);
        }
        if (fldValorUn.includes(',')) {
            fldValorUn = $.converteMoedaFloat(fldValorUn);
        }

        soma = fldQuantidade * fldValorUn;
        totalProdutos += soma;
    });

    $(".fld-total-venda").html('Total: R$'+$.convertFloatToMoeda(totalProdutos));
    atualizaValorLimiteAviso();
    verificaSelecaoPublica(totalProdutos);
}

function verificaSelecaoPublica(totalProdutos) {
    //valor limite para edital
    if (totalProdutos != 0 && totalProdutos >= limiteEdital && !permiteAcimaLimite && !checkClienteFunarbe.is(':checked')) {
        $(".field-fld-contratantes").hide('slow');
        $(".field-emissaonotafiscal-itens_contatos").hide('slow');
        comboContratante.attr('disabled', 'disabled');
        $("label[id='label-for-contratante']").hide('slow');
    } else {
        $(".field-fld-contratantes").show('slow');
        $(".field-emissaonotafiscal-itens_contatos").show('slow');
        comboContratante.attr('disabled', false);
        $("label[id='label-for-contratante']").show('slow');
    }
}

function carregaProdutos() {

    var acordo = [];
    acordo[0] = comboAcordo.val();
    var i = 0;

    $.ajax({
        url: '/projeto-extra/get-secao-produto/',
        data: {
            depdrop_parents: acordo
        },
        type: 'post',
        async: false,
        success: function (resp) {
            resp = resp['output'];
            $('div#table-produtos-venda > table > tbody  > tr').each(function (index, tr) {

                var produto = $(tr).find(".fld-produto");

                if (produto.val() == '' || produto.val() == null) {

                    $.each(resp, function (index, element) {
                        produto.append($('<option>', { val : element.id }).text(element.name));
                    });

                    produto.attr('disabled', false);
                }
                i++;
            });
        }
    });
}

//Verifica se o projeto selecionado possui uma secao de produtos cadastrado
function verificaProjetoPossuiSecao() {

    var acordo = [];
    acordo[0] = comboAcordo.val();

    $.ajax({
        url: '/projeto-extra/get-secao-produto/',
        data: {
            depdrop_parents: acordo
        },
        type: 'post',
        async: false,
        success: function (resp) {

            resp = resp['output'];

            if (resp == '' && acordo[0] != 3113) {
                $("#produtos-nota-venda").hide('slow');
                $("#div-natureza-operazao").hide('slow');

                //Label do campo contrantante
                $("label[id='label-for-contratante']").text('Contratante');
            } else {

                $("#div-natureza-operazao").show('slow');
                fldNaturezaOperacao.each(function () {
                    if ($(this).is(':checked')) {
                        if ($(this).val() == 'Venda' || $(this).val() == 'Remessa') {

                            divProdutosNota.show('slow');

                            //Label do campo contrantante
                            $("label[id='label-for-contratante']").text('Cliente');

                        } else {

                            divProdutosNota.hide('slow');

                            //Label do campo contrantante
                            $("label[id='label-for-contratante']").text('Contratante');
                        }
                    }
                });
            }
        }
    });
}

//Recarrega o valor limite para abrir edital do projeto selecionado no aviso
function atualizaValorLimiteAviso() {
    if (comboAcordo.val() != 3113){
        $.ajax({
            url: '/projeto-extra/get-info-projeto-extra/',
            data: {
                acordoId: comboAcordo.val()
            },
            async: false,
            success: function (resp) {
                console.log(resp)
                limiteEdital = resp['limite_edital'];
                permiteAcimaLimite = resp['permiteAcimaLimite'];
                $(".value-limite-edital").text($.convertFloatToMoeda(resp['limite_edital']));
            }
        });
    }
}

function verificaJustificativaPreco(event) {

    //Verifica se a justificativa do preco deve ser informada
    $.ajax({
        url: '/emissao-nota-fiscal/verifica-justificativa-preco',
        data: {
            id: $('#fld-hidden-pedido').val()
        },
        async: false,
        success: function (resp) {
            if (resp) {
                $('#modal-confirmacao').modal('show');
                $("textarea[name='EmissaoNotaFiscal[justificativa_valor]']").attr('required', true);
            } else {
                btnSubmitEnviar.prop('disabled', true);
                $('#form-pedido').submit();
                setTimeout(function(){
                    btnSubmitEnviar.prop('disabled', false);
                }, 5000);
            }
        }
    });

}

function carregaCampoPedidoCompra() {
    if (comboAcordo.val() == 3113) { //projeto de importação
        $('.fieldPedidoCompra').show('slow');
    } else {
        $('.fieldPedidoCompra').hide('slow');
    }
}

$(document).ready(function () {
        verificaNatureza();
});

checkProjetoEspecifico.click(() => {
    verificaNatureza();
});

function operacaoImportacao(importacao) {
    if (importacao) {

        setTimeout(function () {
            carregaProdutos();
        }, 1000);

        campoImportacao(true);
        checkClienteFunarbe.prop('checked', true);
        checkClienteFunarbe.prop('disabled', true);
        checkTermoAceito.prop('checked', false);
        // fldTaxaCambio.attr('required', true);
        // fldValorOriginal.attr('required', true);
        fldNcm.attr('required', true);
        fldValorNota.attr('readonly', false);
        modalInformacaoNotaFiscal.hide();
        checkDeclaracaoNotaFiscal.hide();
        fldJustificativa.hide();
        checkBoleto.hide();
        checkTermoAceite.hide();
        fldClienteFunarbe.hide();
        //labelContratante.hide();
        //fldContratante.hide();
        // fldTaxaCambio.show();
        // fldEmissaoNotaFiscal.show();
        fldMoeda.show();
        fldValorOrigem.show();
        $(".field-emissaonotafiscal-itens_contatos > label").text("Responsável pela importação:");
        divDadosImportacao.show('slow');
        divCambio.show('slow');

    } else {
        campoImportacao(false);
        checkClienteFunarbe.prop('checked', false);
        checkClienteFunarbe.prop('disabled', false);
        // fldTaxaCambio.attr('required', false);
        // fldValorOriginal.attr('required', false);
        fldNcm.attr('required', false);
        modalInformacaoNotaFiscal.show();
        checkDeclaracaoNotaFiscal.show();
        fldJustificativa.show();
        checkBoleto.show();
        checkTermoAceite.show();
        fldClienteFunarbe.show();
        // fldTaxaCambio.show();
        // fldValorOriginal.show();
        fldValorNota.attr('readonly', true);
        // fldTaxaCambio.val('');
        // fldValorOriginal.val('');
        // fldTaxaCambio.hide();
        // fldEmissaoNotaFiscal.hide();
        fldMoeda.hide();
        fldValorOrigem.hide();
        $(".field-emissaonotafiscal-itens_contatos > label").text("Contatos:");
        divDadosImportacao.hide('slow');
        divCambio.hide('slow');
    }
}

// fldValorOriginal.change(() => calculaValorTotalImportacao());
// fldTaxaCambio.change(() => calculaValorTotalImportacao());

// function calculaValorTotalImportacao() {
    // let taxaCambio = $.convertMoedaToFloat(fldTaxaCambio.val());
    // let valorOriginal = $.convertMoedaToFloat(fldValorOriginal.val());

    // if (taxaCambio > 0 && valorOriginal > 0) {
    //     fldValor.val(taxaCambio * valorOriginal);
    // } else {
    //     fldValor.val('');
    // }
// }

function campoImportacao(importacao) {
    if (importacao) {
        $("#emissaonotafiscal-declarcaooperacao").attr('required', true);
        $("#emissaonotafiscal-datadi-disp").attr('required', true);
        $("#emissaonotafiscal-localdesembaraco").attr('required', true);
        $("#select2-fld-estado-container").attr('required', true);
        $("#emissaonotafiscal-datapermanencia-disp").attr('required', true);
    } else {
        $("#emissaonotafiscal-declarcaooperacao").attr('required', false);
        $("#emissaonotafiscal-datadi-disp").attr('required', false);
        $("#emissaonotafiscal-localdesembaraco").attr('required', false);
        $("#fld-estado").attr('required', false);
        $("#emissaonotafiscal-datapermanencia-disp").attr('required', false);
    }
}

$(document).ready(function() {
    jQuery('#table-produtos-venda').on('afterInit', function(){
        $('#table-produtos-venda .fld-produto').select2({
            width: '200px'
        });
    }).on('afterAddRow', function(e, row, currentIndex) {
        $('#table-produtos-venda .fld-produto').select2({
            width: '200px'
        });
    })
});