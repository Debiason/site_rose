var fldcomEquipamento = $("#comEquipamento"),
    fldValorMinimo = $("#valorMinimo"),
    fldValorSelecionado = $("#fldValorSelecionado"),
    fldValorCambio = $("input[name='cambio']"),
    fldValorRateio = $("input[name='valorRateio'], input[name='valorRateio-disp']"),
    fldcheckbox = $("input[name='comEquipamento']"),
    selectRateio = $("select[name='rateiocombo']");

fldcheckbox.on('click', function () {
    if ($(this).is(':checked')) {
        fldcomEquipamento.show("slow");
    } else {
        fldcomEquipamento.hide("slow");
    }

});

fldValorSelecionado.change(function () {
    calculaValorRateio();
});
fldValorCambio.change(function () {
    calculaValorRateio();
});

$(document).ready(function () {

    if (fldcheckbox.is(':checked')) {
        fldcomEquipamento.show("slow");
    } else {
        fldcomEquipamento.hide("slow");
    }

    document.getElementById('fldValorMovimentacao-disp').readOnly = true;
    document.getElementById('fldValorRateioMovimentacao-disp').readOnly = true;

});

selectRateio.change(function () {
    setItensMultipleInput(selectRateio.val());
});

function setItensMultipleInput(rateioId) {

    $.ajax({
        url: '/item-rateio/get-dados/',
        data: {
            id: rateioId
        },
        async: false,
        success: function (resp) {

            var indice = 0;
            var valor = 0;
            var valorTotal = 0;

            $.each(resp, function () {
                valor++;
            });

            fldValorMinimo.val(valor);

            $.each(resp, function () {

                $("input[name='Rateio[itensRateio][" + indice + "][id]']").val(this.id);
                $("input[name='Rateio[itensRateio][" + indice + "][rubricaorigem_id]']").val(this.rubricaDebito);
                $("input[name='Rateio[itensRateio][" + indice + "][acordo_id]']").val(this.projeto);
                $("input[name='Rateio[itensRateio][" + indice + "][rubrica_id]']").val(this.rubricaCredito);
                $("input[name='Rateio[itensRateio][" + indice + "][porcentagem]']").val(this.porcentagem);

                valorTotal += parseFloat(this.porcentagem);

                indice++;
            });

            $("span[class='total-porcentagem-rateio']")
                .show('slow')
                .text('Total porcentagem: '+$.convertFloatToMoeda(valorTotal));

        }
    });
}

function calculaValorRateio() {
    var valor = $.convertMoedaToFloat(fldValorSelecionado.val()) * $.convertMoedaToFloat(fldValorCambio.val());
    fldValorRateio.val(valor);
}

//botao simula rateio

var btnSimular = $("button[id='simular']"),
    btnFechar = $("button[id='fechar']"),
    btnSalvar = $("button[id='salvarDadosRateio']");


btnSimular.click(function () {

    $.ajax({
        url: '/movimentacao/gera-rateio/',
        type: 'post',
        data: {
            dados: $('#liberacao-convenio').serializeArray(),
            acao: 'simular'
        },
        dataType: 'json',
        async: false,
        success: function (resp) {
            var res = resp.data;

            //Verifica mensagens de erro
            if (res.success == false) {
                Swal.fire(
                    'Atenção',
                    res.msg
                )
            }

            if (res.success == true) {
                var dataPost = res.dataPost;
                var total = 0;

                //Abre o modal para os dados do rateio
                $(".parcela-liberacao-form").hide("");
                $("#gera-rateio").show("slow");

                btnFechar.click(function () {
                    window.location.reload();
                });

                var retornoOrigem = '<h5 class="m-form__heading-title">Projeto de origem:</h5><br/>';
                retornoOrigem += res.resp.acordoOrigemId + ' - ' + res.resp.acordoOrigemNome + '<br/>';
                retornoOrigem += '<br/> <b>Data de operação: </b>' + res.resp.dtOperacao;

                $('#projetoOrigem').html(retornoOrigem);

                var retorno = '<div class="border border-black avisos alert">';
                retorno += '<h5 class="m-form__heading-title">Projeto(s) de destino:</h5><br/>';
                $.each(res.resp.acordoDetino, function (index, element) {
                    retorno += '<div class="form-row">';

                    retorno += '<div class="col-1">';
                    retorno += '</div>';
                    retorno += '<div class="col-8">';
                    retorno += element.acordoDestinoId + ' - ' + element.acordoDestinoNome;
                    retorno += '</div>';

                    retorno += '<div class="col-2">';
                    retorno += '<input class="form-control valorSimulado" name='+ element.acordoDestinoId +' value=' +
                        $.convertFloatToMoeda(element.valor) + '><br>';
                    retorno += '</div>';

                    retorno += '</div>';

                    total += element.valor;
                });

                retorno += '<div class="form-row">';
                retorno += '<div class="col-1">';
                retorno += '</div>';
                retorno += '<div class="col-8">';
                retorno += '<strong>Total:</strong>';
                retorno += '</div>';
                retorno += '<div class="col-2">';
                retorno += '<input class="form-control somaSimulacao" value=' + $.convertFloatToMoeda(total) + ' readonly><br>';
                retorno += '</div>';
                retorno += '</div>';

                retorno += '</div>';

                $("#projetosDestino").html(retorno);


                // //Salva as alterações
                btnSalvar.click(function () {

                    $.ajax({
                        url: '/movimentacao/gera-rateio/',
                        type: 'post',
                        data: {
                            dados: dataPost,
                            valorSimulacao: $('#simulacao-liberacao').serializeArray(),
                            acao: 'salvar'
                        },
                        dataType: 'json',
                        async: false,
                        success: function (resposta) {

                            if (resposta.data.success == true){
                                toastr.success(resposta.data.msg);
                                window.location.reload();
                            } else {
                                Swal.fire(
                                    'Atenção',
                                    resposta.data.msg
                                )
                            }
                        }
                    });
                });
            }
        }
    });
});

$(document).on('keyup', '.valorSimulado', function(ev){
    var inputs = document.getElementsByClassName('valorSimulado');
    var somaSimulacao = document.getElementsByClassName('somaSimulacao');
    var valor = 0;

    $.each(inputs, function (index, elementInput) {
        valor += $.converteMoedaFloat(elementInput.value);
    });

    $.each(somaSimulacao, function (index, elementSoma) {
        elementSoma.value = $.convertFloatToMoeda(valor);
    });
});