var fldDadosTransferencia = $("#dadosTransferencia"),
    fldDadosTransferenciaUnidade = $("#dadosTransferenciaUnidade"),
    fldDadosParcelaCancelada = $("#dadosParcelaCancelada"),
    fldTransferenciaEntreProjetos = $("input[name='ParcelaLiberacao[transferencia]']"),
    fldTransferenciaEntreUnidade = $("input[name='ParcelaLiberacao[transferencia_unidade]']"),
    fldParcelaCancelada = $("input[name='ParcelaLiberacao[cancelada]']"),
    fldRateioProporcianal = $("input[name='ParcelaLiberacao[rateioproporcional]']"),
    fldValorParcela = $("input[name='ParcelaLiberacao[valor]']"),
    fldAcordo = $("input[name='ParcelaLiberacao[convenio_id]']"),
    fldValorLiberado = $("input[name='ParcelaLiberacao[valorliberado]']"),
    fldValorDisponivel = $("input[name='ParcelaLiberacao[valordisponivel]'], input[name='parcelaliberacao-valordisponivel-disp']"),
    fldTaxaCambio = $("input[name='ParcelaLiberacao[taxacambio]'], input[name='parcelaliberacao-taxacambio-disp']");

var salvarLiberacao = $(".salvarLiberacao");

$(document).ready(function () {
    if (fldTransferenciaEntreProjetos.is(':checked')) {
        fldDadosTransferencia.show();
    } else {
        fldDadosTransferencia.hide();
    }

    if (fldTransferenciaEntreUnidade.is(':checked')) {
        fldDadosTransferenciaUnidade.show();
    } else {
        fldDadosTransferenciaUnidade.hide();
    }

    if (fldParcelaCancelada.is(':checked')) {
        fldDadosParcelaCancelada.show();
    } else {
        fldDadosParcelaCancelada.hide();
    }

});

var submit = false;
$(document).keypress(function(e) {
    if (e.which == 13) {
        var valorParcela = fldValorParcela.val();
        var dataPrevista = $("#parcelaliberacao-dtprevista").val();

        if (!submit && valorParcela && dataPrevista) {
            submit = true;
            $('#ParcelaLiberacao').submit();
        }

        e.preventDefault();
    }
});

fldValorLiberado.change(calculaValorDisponivel);
fldTaxaCambio.change(calculaValorDisponivel);

function calculaValorDisponivel(){

    var valorLiberado = fldValorLiberado.val();

    if (fldTaxaCambio.val()) {
        var taxaCambio = $.convertMoedaToFloat(fldTaxaCambio.val());
        var valorFinal = $.convertMoedaToFloat(taxaCambio) * valorLiberado;

        fldValorDisponivel.val(valorFinal);
    } else {
        fldValorDisponivel.val(valorLiberado);
    }
}


//checkBox de dados de transferencia entre projetos
fldTransferenciaEntreProjetos.on('click', function () {
    if ($(this).is(':checked')) {
        fldDadosTransferencia.show("slow");
    } else {
        fldDadosTransferencia.hide("slow");
    }
});

//checkBox de dados de transferencia vinda de unidade
fldTransferenciaEntreUnidade.on('click', function () {
    if ($(this).is(':checked')) {
        fldDadosTransferenciaUnidade.show("slow");
    } else {
        fldDadosTransferenciaUnidade.hide("slow");
    }
});

//checkBox de dados de parcela cancelada
fldParcelaCancelada.on('click', function () {
    if ($(this).is(':checked')) {
        fldDadosParcelaCancelada.show("slow");
    } else {
        fldDadosParcelaCancelada.hide("slow");
    }
});

salvarLiberacao.on('click', function (){
    salvarLiberacao.prop('disabled', true);
    salvarLiberacao.html('Aguarde ...');
    $(this).closest('form').submit();
});

$(document).on("submit", "form", function (e) {
    e.preventDefault();

    var form = $(this);

    salvarLiberacao.prop('disabled', true);
    salvarLiberacao.html('Aguarde ...');

    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),

        success: function (response) {
            if (response.data.success) {
                toastr.success(response.data.message, "Sucesso!");
                if (response.data.reloadTab) {
                    window.open(response.data.redirect, '_self');
                } else if (response.data.redirectNewTab) {
                    window.open(response.data.redirect, '_blank');
                } else if (response.data.redirect) {
                    $.loadInModal(response.data.redirect, response.data.title);
                } else {
                    $('#modal-principal').modal('hide');
                    $.reloadTab();
                }
                salvarLiberacao.html('Salvar');
                salvarLiberacao.removeAttr('disabled');
            } else {
                toastr.error(response.data.message, "Erro!");
                salvarLiberacao.html('Salvar');
                salvarLiberacao.removeAttr('disabled');
                $('#modal-principal .modal-body').scrollTop(0);
                $('#modal-principal .modal-body .regrastabs').html(response.data.regras);
                $('#modal-principal .modal-body .flashMessage').html(response.data.flashMessage);
            }
        },
        error: function () {
            salvarLiberacao.html('Salvar');
            salvarLiberacao.removeAttr('disabled');
        }
    });

    return false;
});

//Soma todos os valores Planejados ao alterar valores
$(document).on("keyup", ".valorPlanejado", function () {
    var soma = 0,
        iPlanejado = 0;

    //loop nos capos valor planejado
    $(".valorPlanejado").each(function () {

        //pego o name do campo atual do loop
        var thisName = $(this)[0].name;

        //verifica o tamanho do name, se = 41, o indice tem apenas uma casa decimal
        if (thisName.length == 41) {
            iPlanejado = thisName.substring(32, 33); //pega o indice do campo neste momento do loop
        } else {
            iPlanejado = thisName.substring(32, 34);
        }

        //monta o id o qual deve ser buscado o valor
        var idPlanejado = 'parcelaliberacao-itensrubricas-' + iPlanejado + '-valor';

        //pega o valor do campo e converte para float, depois acrescenta a variavel soma
        valorPlanejado = $.convertMoedaToFloat(document.getElementById(idPlanejado).value);
        soma += valorPlanejado;
    });

    //monta a msg que deve ser mostrada na tela coma soma dos valores
    valorFinal = 'Total valor planejado: R$' + $.convertFloatToMoeda(soma);
    $("span[id='totalValorPlanejado']").html(valorFinal); //seta a msg na tela

});

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
        if (thisName.length == 51) {
            iDisponivel = thisName.substring(32, 33); //pega o indice do campo neste momento do loop
        } else {
            iDisponivel = thisName.substring(32, 34);
        }

        //monta o id o qual deve ser buscado o valor
        var idDisponivel = 'parcelaliberacao-itensrubricas-' + iDisponivel + '-valordisponivel';

        //pega o valor do campo e converte para float, depois acrescenta a variavel soma
        if (document.getElementById(idDisponivel).value != '') {
            valorDisponivel = $.convertMoedaToFloat(document.getElementById(idDisponivel).value);
        } else {
            valorDisponivel = 0;
        }
        somaDisponivel += valorDisponivel;
    });

    //monta a msg que deve ser mostrada na tela coma soma dos valores
    valorFinalDisponivel = 'Total valor disponível: R$' + $.convertFloatToMoeda(somaDisponivel);
    $("span[id='totalValorDisponivel']").html(valorFinalDisponivel);//seta a msg na tela

});

btnExcluir = $(".js-input-remove");
btnExcluirDois = $(".js-input-remove");

btnExcluir.click(function () {
    somaValoresAoExcluirItem();
});

//ao excluir um item deve ser somado todos os valores novamente
function somaValoresAoExcluirItem() {

    var sum = 0,
        sumDisponivel = 0,
        i = 0;

    //roda a soma novamente, porem depois de meio segundo, para não pegar valor excluido da tela
    var variavel = setTimeout(function () {


        //soma todos os valores planejados novamente
        $(".valorPlanejado").each(function () {

            var thisName = $(this)[0].name;

            if (thisName.length == 41) {
                i = thisName.substring(32, 33);
            } else {
                i = thisName.substring(32, 34);
            }

            var id = 'parcelaliberacao-itensrubricas-' + i + '-valor';

            valorPlanejado = $.convertMoedaToFloat(document.getElementById(id).value);
            sum += valorPlanejado;
        });

        valorFinal = 'Total valor planejado: R$' + $.convertFloatToMoeda(sum);
        $("span[id='totalValorPlanejado']").html(valorFinal);


        //soma todos os valores disponiveis novamente
        $(".valorDisponivel").each(function () {

            var thisName = $(this)[0].name;
            if (thisName.length == 51) {
                i = thisName.substring(32, 33);
            } else {
                i = thisName.substring(32, 34);
            }
            var id = 'parcelaliberacao-itensrubricas-' + i + '-valordisponivel';
            valorDisponivel = $.convertMoedaToFloat(document.getElementById(id).value);
            sumDisponivel += valorDisponivel;
        });

        valorFinalDisponivel = 'Total valor disponível: R$' + $.convertFloatToMoeda(sumDisponivel);
        $("span[id='totalValorDisponivel']").html(valorFinalDisponivel);


    }, 500);

}

//checkBox de rateio proporcional
fldRateioProporcianal.on('click', function () {
        calculaValorProporcional();
});

fldValorParcela.change(function () {
   calculaValorProporcional();
});

fldValorLiberado.change(function () {
   calculaValorProporcional();
});

function calculaValorProporcional() {
    if (fldRateioProporcianal.is(':checked')) {

        //caso o valor liberado esteja preenchido pega o valor lirado para o calculo, caso não esteja pega o da parcela
        if (fldValorLiberado.val() != null && fldValorLiberado.val() != ''){
            valor = fldValorLiberado.val();
        } else {
            valor = fldValorParcela.val();
        }
        acordo = fldAcordo.val();

        $.ajax({
            url: '/parcela-liberacao/rateio-parcela/',
            data: {
                valorParcela: valor,
                acordo: acordo
            },
            async: false,
            success: function (resp) {
                somaValores = 0;
                //loop nos capos valor planejado
                $(".rubricaAprovada").each(function () {

                    //pego o id da rubrica atual do loop
                    var idRubrica = $(this)[0].value;

                    //pego o name do campo atual do loop
                    var thisName = $(this)[0].name;

                    //verifica o tamanho do name, se = 41, o indice tem apenas uma casa decimal
                    if (thisName.length == 54) {
                        iPlanejado = thisName.substring(32, 33); //pega o indice do campo neste momento do loop
                    } else {
                        iPlanejado = thisName.substring(32, 34);
                    }

                    //monta o id o qual deve ser setado o valor
                    var idPlanejado = '#parcelaliberacao-itensrubricas-' + iPlanejado + '-valor';
                    var idDisponivel = '#parcelaliberacao-itensrubricas-' + iPlanejado + '-valordisponivel';

                    //compara as rubricas para pegar o valor que deve ser setado
                    $.each(resp, function (index, element) {
                        if (element.rubricaAprovada == idRubrica){
                            valorProporcional = element.valor;
                            somaValores += element.valor;
                        }
                    });

                    //seta valor no campo de valor
                    $(idPlanejado).val(valorProporcional);
                    $(idDisponivel).val(valorProporcional);

                });

                valorFinal = 'Total valor planejado: R$' + $.convertFloatToMoeda(somaValores);
                $("span[id='totalValorPlanejado']").html(valorFinal);

                valorFinalDisponivel = 'Total valor disponível: R$' + $.convertFloatToMoeda(somaValores);
                $("span[id='totalValorDisponivel']").html(valorFinalDisponivel);
            }
        });


    }
    //Apaga valores caso desmarque o checkBox
    // else {
    //
    //     var valor = 0;
    //     $(".valorPlanejado").each(function () {
    //
    //         var thisName = $(this)[0].name;
    //
    //         if (thisName.length == 41) {
    //             iPlanejado = thisName.substring(32, 33);
    //         } else {
    //             iPlanejado = thisName.substring(32, 34);
    //         }
    //
    //         var idPlanejado = '#parcelaliberacao-itensrubricas-' + iPlanejado + '-valor';
    //
    //         //seta valor no campo de valor
    //         $(idPlanejado).val(valor);
    //     });
    //
    //     valorFinal = 'Total valor planejado: R$' + valor;
    //     $("span[id='totalValorPlanejado']").html(valorFinal);
    // }
}


