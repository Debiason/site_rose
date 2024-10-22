var fldImportacao = $("input[id='fld-importacao']");

document.getElementById("itemmanutencao-descricao").disabled = false;

$(document).ready(function () {

    if ($("#fld-projeto_id").val() !== "") {
        $(".item-manutencao-form").show();
    }

    configurarForm();

    $(document).on('change', '#fld-projeto_id', function (event) {
        getDadosAcordo();
    });

    $.exibeTraducaoDescricao();
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
                    $(".item-manutencao-form").hide("slow");
                    return false;
                } else {
                    $('.validaVigencia').html("");
                    $('#fld-projeto_id').css('color', 'black');
                    $(".item-manutencao-form").show("slow");
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

function configurarForm() {

    if ($('input[name="ItemManutencao[tipomanutencao]"][value="Corretiva"]').is(':checked')) {
        $("#descricao-defeito").show('slow');
    }

    if ($('input[name="ItemManutencao[despachar]"]:checked').val() == '0') {
        $("#endereco-item").show('slow');
    }

    $('input[name="ItemManutencao[tipomanutencao]"]').change(function() {
        if ($(this).val() == 'Corretiva' && $(this).is(':checked')) {
            $("#descricao-defeito").show('slow');
        } else {
            $("#descricao-defeito").hide('slow');
        }
    });

    $('input[name="ItemManutencao[despachar]"]').change(function() {
        if ($(this).val() == 0 && $(this).is(':checked')) {
            $("#endereco-item").show('slow');
        } else {
            $("#endereco-item").hide('slow');
        }
    });
}