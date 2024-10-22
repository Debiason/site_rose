var fldDadosKmPretendido = $("#dadosKmDefinida"),
    fldKmPretendidoValor = $("input[name='ItemLocacaoVeiculo[kmpretendido]']"),
    fldDadosSemMotorista = $("#dadosSemMotorista"),
    fldSemMotoristaValor = $("input[name='ItemLocacaoVeiculo[motoristanome]']"),
    fldImportacao = $("input[id='fld-importacao']"),
    valorNomeMotorista = $("#itemlocacaoveiculo-dados_motorista-0-motoristanome");

document.getElementById("itemlocacaoveiculo-descricaoveiculo").disabled = false;

$(document).ready(function () {

    if ($("#fld-projeto_id").val() !== "") {
        $(".item-locacao-veiculo-form").show();
    }

    $(document).on('change', '#fld-projeto_id', function (event) {
        getDadosAcordo();
    });

    if(fldKmPretendidoValor.val() == ''){
        fldDadosKmPretendido.hide();
    }else {
        fldDadosKmPretendido.show();
    }

    if (valorNomeMotorista.val() != '') {
        fldDadosSemMotorista.show("slow");
        $('input[name="semMotorista"][value="1"]').prop('checked', true).trigger('change');
    } else {
        fldDadosSemMotorista.hide("slow");
    }

    $.exibeTraducaoDescricao();

});

//checkBox para os dados de compra no mercado externo
$('input[name="possuiKmDefinida"]').on('click', function(){

    if ( $(this).is(':checked') ) {
        fldDadosKmPretendido.show("slow");
    } else {
        fldDadosKmPretendido.hide("slow");
    }
});

//checkBox para os dados de compra no mercado externo
$('input[name="semMotorista"]').on('click', function(){

    if ($(this).val() == 1) {
        fldDadosSemMotorista.show("slow");
    } else {
        fldDadosSemMotorista.hide("slow");
    }
});

//checkBox para os dados de compra no mercado externo
fldImportacao.on('click', function(){
    $.exibeTraducaoDescricao();
});

function getDadosAcordo() {

    if ($("#fld-projeto_id").val() != undefined) {

        var acordoId = $("#fld-projeto_id").val();
        var dtminima = new Date();
        var dtvigencia;

        dtminima.setDate(dtminima.getDate() + 15);
        dtminima.setHours(0, 0, 0, 0);

        $.ajax({
            url: '/acordo/getdtvigenciapedidocompra/',
            data: {
                acordoId: acordoId
            },
            async: false,
            success: function (resp) {
                dtvigencia = new Date(resp);
                dtvigencia.setHours(0, 0, 0, 0);

                if (dtvigencia < dtminima) {
                    $('.validaVigencia').html("O projeto precisa ter pelo menos 15 dias de vigência para prosseguir com o pedido.").css('color', 'red');
                    $('#fld-projeto_id').css('color', 'red');
                    $(".item-locacao-veiculo-form").hide("slow");
                    return false;
                } else {
                    $('.validaVigencia').html("");
                    $('#fld-projeto_id').css('color', 'black');
                    $(".item-locacao-veiculo-form").show("slow");
                }
            }
        });

        $.ajax({
            url: '/acordo/getsaldotipo/',
            data: {
                id: acordoId
            },
            success: function (resp) {
                var valor = resp.saldo;
                var valorFormatado = "R$ " + $.convertFloatToMoeda(resp.saldo);
                $("span[id='saldoProjeto']").text(valorFormatado);

                if (valor < 0.00) {
                    $(".validaSaldo").html("No momento, o projeto não possui recurso disponível, o pedido passará por uma avaliação por parte do gestor.").css('color', 'red');
                    $("#saldoProjeto").css('color', 'red');
                    return false;
                } else {
                    $(".validaSaldo").html("");
                    $("#saldoProjeto").css('color', '#36a3f7');
                }
            }
        });
    }

    return true;
}