var fldValorLiberado = $("input[name='ParcelaNotaFiscal[valorliberado]'], input[name='parcelanotafiscal-valorliberado-disp']")
    fldValorDisponivel = $("input[name='ParcelaNotaFiscal[valordisponivel]'], input[name='parcelanotafiscal-valordisponivel-disp']")
    fldTaxaCambio = $("input[name='ParcelaNotaFiscal[taxacambio]'], input[name='parcelanotafiscal-taxacambio-disp']")
    fldValor = $("input[name='ParcelaNotaFiscal[valor]'], input[name='parcelanotafiscal-valor-disp']")
    fldValorDispRubrica = $('.valordisponivel')
    checkAplicarCambio = $("input[name='ParcelaNotaFiscal[aplicarcambio]'], input[name='parcelanotafiscal-aplicarcambio']")
    comboSituacao = $("#fld-situacao-parcela");

fldValor.change(calculaValorLiberado);
fldValor.ready(calculaValorLiberado);
fldTaxaCambio.change(calculaValorLiberado);
$('#aplicarCambio').hide();
$('#motivoCancelamento').hide();
comboSituacao.change(getSituacao);
comboSituacao.ready(getSituacao);
function calculaValorLiberado() {
    verificaValorDisp();
    var valor = fldValorLiberado.val();
    if (fldTaxaCambio.val()) {
        var taxaCambio = $.convertMoedaToFloat(fldTaxaCambio.val());
        var valorFinal = $.convertMoedaToFloat(taxaCambio) * $.convertMoedaToFloat(valor);
        fldValorDisponivel.val(valorFinal);
        $("span[id='somaDisponivel']").show('slow');
        $('#aplicarCambio').show('slow');
    } else {
        fldValorDisponivel.val(valor);
        $("span[id='somaDisponivel']").hide('slow');
        $('#aplicarCambio').hide();
         // aplicarTaxaCambio(1.00)
    }
}

$(document).on("submit", "form", function (e) {
    var button = $("button[class='btn btn-success salvarParcelaNotaFidcal']");
    button.attr('disabled', 'disabled');
    button.html('Aguarde ...');

    setTimeout(function () {
        button.removeAttr('disabled');
        button.html('Salvar');
    }, 8000);
});

$(document).ready(function () {
    ($("button[class='btn btn-primary FecharParcelaNotaFiscal']")).click(function() {
        location.reload(false);
        verificaValorDisp();
    });
});

function removerAnexo(anexo_id, id)
{
    var id_anexo = String(anexo_id).replace(/\D/g, '');
    var id = String(id).replace(/\D/g, '');

    if(!(!!id_anexo) || !(!!id)) {
        toastr.error('Parâmetros [id_anexo] ou/e [id] inválidos.');
        return false;
    }

    krajeeDialog.confirm("Você tem certeza que deseja remover o anexo?", function (result) {
        if (result) {
            var _csrf = String($('meta[name=csrf-token]').attr('content'));
            if(_csrf.length === 0) {
                toastr.error('Erro CSRF vazio, atualize a página.');
                return false;
            }
            var url = '/parcela-nota-fiscal/deletar-anexo'
            var dados = {
                method: 'post',
                dataType: 'json',
                data: {_csrf: _csrf, anexo_id: id_anexo, id: id}
            }
            $.ajax(url, dados)
                .done((response) => {

                    if(!response.hasOwnProperty('data'))
                        toastr.error('Erro na resposta do servidor, atributo [data]');

                    if(response.data.success){
                        $('#box-arquuivo-anexo').hide();
                        toastr.success(response.data.msg);
                    }else{
                        toastr.error(response.data.msg);
                    }
                })
                .fail(() => toastr.error('Erro de comunicação com o servidor.'));
        }
    });
}

//Soma todos os valores Disponiveis ao alterar valores
$(document).on("keyup", ".valorDisponivel", function () {

    var somaDisponivel = 0,
        iDisponivel = 0;
    var valorDisponivel = 0;

    //loop nos capos valor disponivel
    $(".valorDisponivel").each(function () {

        //pego o name do campo atual do loop
        var thisName = $(this)[0].name;

        //verifica o tamanho do name, se = 51, o indice tem apenas uma casa decimal
        if (thisName.length == 46) {
            iDisponivel = thisName.substring(37, 38); //pega o indice do campo neste momento do loop
        } else {
            iDisponivel = thisName.substring(37, 39);
        }

        //monta o id o qual deve ser buscado o valor
        var idDisponivel = 'parcelanotafiscal-itemrateioparcela-' + iDisponivel + '-valor';

        //pega o valor do campo e converte para float, depois acrescenta a variavel soma
        if (document.getElementById(idDisponivel).value != '') {
            valorDisponivel = $.convertMoedaToFloat(document.getElementById(idDisponivel).value);
        } else {
            valorDisponivel = 0;
        }
        somaDisponivel += valorDisponivel;
    });

    //monta a msg que deve ser mostrada na tela coma soma dos valores
    valorFinalDisponivel = 'Total rateio: R$' + $.convertFloatToMoeda(somaDisponivel);
    $("span[id='totalValorDisponivel']").html(valorFinalDisponivel);//seta a msg na tela
});

btnExcluir =  $(".js-input-remove");

btnExcluir.click(function () {
    somaValoresAoExcluirItem();
});

//ao excluir um item deve ser somado todos os valores novamente
function somaValoresAoExcluirItem() {

    var somaDisponivel = 0,
        iDisponivel = 0;
    var valorDisponivel = 0;

    //roda a soma novamente, porem depois de meio segundo, para não pegar valor excluido da tela
    var variavel = setTimeout(function () {

        $(".valorDisponivel").each(function () {

            //pego o name do campo atual do loop
            var thisName = $(this)[0].name;

            //verifica o tamanho do name, se = 51, o indice tem apenas uma casa decimal
            if (thisName.length == 46) {
                iDisponivel = thisName.substring(37, 38); //pega o indice do campo neste momento do loop
            } else {
                iDisponivel = thisName.substring(37, 39);
            }

            //monta o id o qual deve ser buscado o valor
            var idDisponivel = 'parcelanotafiscal-itemrateioparcela-' + iDisponivel + '-valor';

            //pega o valor do campo e converte para float, depois acrescenta a variavel soma
            if (document.getElementById(idDisponivel).value != '') {
                valorDisponivel = $.convertMoedaToFloat(document.getElementById(idDisponivel).value);
            } else {
                valorDisponivel = 0;
            }
            somaDisponivel += valorDisponivel;
        });

        //monta a msg que deve ser mostrada na tela coma soma dos valores
        valorFinalDisponivel = 'Total rateio: R$' + $.convertFloatToMoeda(somaDisponivel);
        $("span[id='totalValorDisponivel']").html(valorFinalDisponivel);//seta a msg na tela

    }, 500);
};

checkAplicarCambio.on('click', function () {

    if ($(this).is(':checked')) {

        aplicarTaxaCambio(fldTaxaCambio.val());
    } else {
         aplicarTaxaCambio(1.00);
    }

});

function aplicarTaxaCambio(taxa){
    var soma = 0;
    $(".valorDisponivel").each(function () {

        //pego o name do campo atual do loop
        var thisName = $(this)[0].name;

        //verifica o tamanho do name, se = 51, o indice tem apenas uma casa decimal
        if (thisName.length == 46) {
            iDisponivel = thisName.substring(37, 38); //pega o indice do campo neste momento do loop
        } else {
            iDisponivel = thisName.substring(37, 39);
        }

        var taxaFormatado = $.convertMoedaToFloat(taxa)

        //monta o id o qual deve ser buscado o valor
        var idDisponivel = 'parcelanotafiscal-itemrateioparcela-' + iDisponivel + '-valor';
        var idValorDisponivel = 'parcelanotafiscal-itemrateioparcela-' + iDisponivel + '-valordisponivel';

        //pega o valor do campo e converte para float, depois acrescenta a variavel soma
        if (document.getElementById(idDisponivel).value != '') {
            valorDisponivel = ($.convertMoedaToFloat(document.getElementById(idDisponivel).value) * taxaFormatado);
            document.getElementById(idValorDisponivel).value = valorDisponivel;
        } else {
            valorDisponivel = 0;
        }

        soma += valorDisponivel;

    });
        //monta a msg que deve ser mostrada na tela coma soma dos valores
        valorFinalDisponivel = 'Total c/ Cambio: R$ ' + $.convertFloatToMoeda(soma);
        $("span[id='somaDisponivel']").html(valorFinalDisponivel);//seta a msg na tela
}

$(document).on("keyup", ".valorDisp", function () {
    verificaValorDisp();
});

function verificaValorDisp(){
    var soma = 0;
    $(".valorDisponivel").each(function () {

        //pego o name do campo atual do loop
        var thisName = $(this)[0].name;

        //verifica o tamanho do name, se = 51, o indice tem apenas uma casa decimal
        if (thisName.length == 46) {
            iDisponivel = thisName.substring(37, 38); //pega o indice do campo neste momento do loop
        } else {
            iDisponivel = thisName.substring(37, 39);
        }

        //monta o id o qual deve ser buscado o valor
        var idValorDisponivel = 'parcelanotafiscal-itemrateioparcela-' + iDisponivel + '-valordisponivel';

        //pega o valor do campo e converte para float, depois acrescenta a variavel soma
        if (document.getElementById(idValorDisponivel) != null) {
            if (document.getElementById(idValorDisponivel).value != '') {
                valorDisponivel = ($.convertMoedaToFloat(document.getElementById(idValorDisponivel).value));
            } else {
                valorDisponivel = 0;
            }
        } else {
            valorDisponivel = 0;
        }

        soma += valorDisponivel;

    });
    //monta a msg que deve ser mostrada na tela coma soma dos valores
    valorFinalDisponivel = 'Total c/ Cambio: R$ ' + $.convertFloatToMoeda(soma);
    $("span[id='somaDisponivel']").html(valorFinalDisponivel);//seta a msg na tela
}

function getSituacao() {

    var situacaoId = comboSituacao.val();

    if (situacaoId == 31){
        $('#motivoCancelamento').show('slow');
        $('#motivoCancelamento').attr("required", true);
        var pedidoId = $('#pedido_id').val();
        var parcelaId = $('#parcela_id').val();

        $.ajax({
            url: '/situacao/getmotivo-cancelamento/',
            data: {
                id: pedidoId,
                parcelaId: parcelaId
            },
            async: false,
            success: function (resp) {
                if (resp){
                    $('#parcelanotafiscal-motivocancelamento').text(resp)
                }
            }
        });
    }else{
        $('#motivoCancelamento').hide('slow');
        $('#motivoCancelamento').removeAttr("required");
        $('#parcelanotafiscal-motivocancelamento').text("");
    }
}