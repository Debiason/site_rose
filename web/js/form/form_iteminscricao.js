//elements
var fldLogim = $("#dadosLogin"),
    fldLoginValor = $("input[name='ItemInscricao[login]']"),
    fldDadosPublicacao = $("#dadosPublicacao"),
    fldCheckBoxPublicacao = $("input[name='ItemInscricao[publicacao]']"),
    fldPublicacaoValor = $("input[name='ItemInscricao[publicacaonome]"),
    fldImportacao = $("input[id='fld-importacao']");



$(document).ready(function () {

    if ($("#fld-projeto_id").val() !== "") {
        $(".item-inscricao-form").show();
    }

    $(document).on('change', '#fld-projeto_id', function (event) {
        getDadosAcordo();
    });

    if(fldLoginValor.val() == ''){
        fldLogim.hide();
    }else {
        fldLogim.show();
    }
    if(fldPublicacaoValor.val() == ''){
        fldDadosPublicacao.hide();
    }else {
        fldDadosPublicacao.show();
    }
    $.exibeTraducaoDescricao();
});

//checkBox para os dados de login e senha
$('input[name="necessarioLogin"]').on('click', function(){

    if ( $(this).is(':checked') ) {
        fldLogim.show("slow");
    } else {
        fldLogim.hide("slow");
    }
});

//checkBox para os dados de publicaçao
fldCheckBoxPublicacao.on('click', function () {

    if ($(this).is(':checked')) {
        fldDadosPublicacao.show("slow");
    } else {
        fldDadosPublicacao.hide("slow");
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
                    $(".item-inscricao-form").hide("slow");
                    return false;
                } else {
                    $('.validaVigencia').html("");
                    $('#fld-projeto_id').css('color', 'black');
                    $(".item-inscricao-form").show("slow");
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