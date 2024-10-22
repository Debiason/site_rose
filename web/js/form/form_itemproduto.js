//elements
var
    fldDadosSugestaoMarca = $("#dadosSugestaoMarca"),
    fldSugestaoMarca = $("input[name='ItemProduto[marcasugerida]']"),
    fldExigirMarca = $("input[name='ItemProduto[marcaexigida]']"),
    fldJustificativaMarca = $("textarea[name='ItemProduto[marcajustificativa]']"),
    comboProduto = $("select[id='fld-produto']"),
    fldImportacao = $("input[id='fld-importacao']"),

    fldComprarCilindro = $("input[type='radio'][name='ItemProduto[comprar_cilindro]']"),
    fldPossuiCilindroTroca = $("input[name='ItemProduto[possui_cilindro_troca]']"),
    fldLocalCilindroVazio = $("input[name='ItemProduto[local_cilindro_vazio]']"),
    fldResponsavelTroca = $("input[name='ItemProduto[responsavel_troca_cilindro]']"),
    fldCienteCobrancaLocacao = $("input[name='ItemProduto[ciente_cobranca_locacao]'], input:hidden[name='ItemProduto[ciente_cobranca_locacao]']");

//triggers
//fldItemAprovado.click(mostrarUnidade);


//functions


$(document).ready(function () {

    if ($("#fld-projeto_id").val() !== "") {
        $(".item-produto-form").show();
    }

    if ($("#fld-classe").val() !== "" && $("#fld-produto").val() == '') {
        setTimeout(function() {
            var value = $("#fld-classe").val();
            $("#fld-classe").val(value).trigger('change');
        }, 400);
    }

    $(document).on('change', '#fld-projeto_id', function (event) {
        getDadosAcordo();
    });

    $.exibeTraducaoDescricao();
    $.controlSugerirMarca();
    $.controlExigirMarca();
    if ($("#fld-acordo").val() !=  undefined && $("#fld-acordo").val() !=  '') {
        verificaProdutoControladoUfvByItem();
    }
    var produto_id = $("#fld-produto").val();
    getOrgaoControlador(produto_id);

//    verificaClasseGases();

    if ($("input:radio[name='ItemProduto[comprar_cilindro]']").is(':checked')) {

        if ($("input[name='ItemProduto[local_cilindro_vazio]']").val() == '') {
            $('input:radio[name="ItemProduto[possui_cilindro_troca]"][value="0"]').attr('checked',true);
        } else {
            $('input:radio[name="ItemProduto[possui_cilindro_troca]"][value="1"]').attr('checked',true);
        }

        changeFieldComprarCilindo();

    } else {
        $('.field-itemproduto-possui_cilindro_troca').hide();
        $('.field-itemproduto-local_cilindro_vazio').hide();
        $('.field-itemproduto-responsavel_troca_cilindro').hide();
        $('.field-itemproduto-ciente_cobranca_locacao').hide();

    }
});

fldComprarCilindro.change(function () {
    changeFieldComprarCilindo();
});

fldPossuiCilindroTroca.change(function () {
    changeFieldPossuiCilindroTroca();
});

function changeFieldComprarCilindo() {
    if ($("input:radio[name='ItemProduto[comprar_cilindro]']:checked").val() == 1) {

        fldPossuiCilindroTroca.prop('checked',false);
        $('.field-itemproduto-possui_cilindro_troca').hide();
        $('.field-itemproduto-local_cilindro_vazio').hide();
        $('.field-itemproduto-responsavel_troca_cilindro').hide();
        $('.field-itemproduto-ciente_cobranca_locacao').hide();

    } else {
        $('.field-itemproduto-possui_cilindro_troca').show();
        changeFieldPossuiCilindroTroca();
    }
}

function changeFieldPossuiCilindroTroca() {

    if ($("input:radio[name='ItemProduto[possui_cilindro_troca]']").is(':checked')) {

        if ($("input:radio[name='ItemProduto[possui_cilindro_troca]']:checked").val() == 1) {

            $('.field-itemproduto-local_cilindro_vazio').show();
            $('.field-itemproduto-responsavel_troca_cilindro').show();

            fldCienteCobrancaLocacao.prop('checked',false);
            $('.field-itemproduto-ciente_cobranca_locacao').hide();
        } else if ($("input:radio[name='ItemProduto[possui_cilindro_troca]']:checked").val() == 0) {

            fldLocalCilindroVazio.val('');
            $('.field-itemproduto-local_cilindro_vazio').hide();

            fldResponsavelTroca.val('');
            $('.field-itemproduto-responsavel_troca_cilindro').hide();

            $('.field-itemproduto-ciente_cobranca_locacao').show();
        }
    } else {

        fldLocalCilindroVazio.val('');
        $('.field-itemproduto-local_cilindro_vazio').hide();

        fldResponsavelTroca.val('');
        $('.field-itemproduto-responsavel_troca_cilindro').hide();

        $('.field-itemproduto-ciente_cobranca_locacao').hide();
    }


}
/*$(document).ready(function () {

if(fldUnidade.val() == null){
    fldUnidadeId.hide();
}else{
    fldUnidadeId.show();
}

});

function mostrarUnidade() {

    fldUnidade.show("slow");

}*/

comboProduto.change(function () {
    atualizaUnidade();
    if ($("#fld-acordo").val() !=  undefined && $("#fld-acordo").val() !=  '') {
        verificaProdutoControladoUfvByItem();
    }
});

//checkBox para os dados de compra no mercado externo
fldImportacao.on('click', function(){
    $.exibeTraducaoDescricao();
});
//checkBox para os dados de sugestão de marca/fabicante
fldSugestaoMarca.on('change', function () {
    $.controlSugerirMarca();
});
//checkBox para os dados de exigência de marca/fabicante
fldExigirMarca.on('change', function () {
    $.controlExigirMarca();
});

$.controlSugerirMarca = function () {
    if (fldSugestaoMarca.is(':checked')) {
        fldDadosSugestaoMarca.show("slow");
    } else {

        $('#itemproduto-marca').val('');
        $('#itemproduto-referencia').val('');
        $('#itemproduto-marcajustificativa').val('');
        $('#exigirmarca').attr("checked", false);

        fldDadosSugestaoMarca.hide("slow");
    }
};

$.controlExigirMarca = function () {
    if(fldExigirMarca.is(':checked') || (fldJustificativaMarca.val() !=  undefined && fldJustificativaMarca.val() !=  '')) {
        $(".dados-exigencia-marca").show("slow");
        if(!fldExigirMarca.is(':checked')){
            fldJustificativaMarca.val('');
            $(".dados-exigencia-marca").hide("slow");
        }
    } else {
        $(".dados-exigencia-marca").hide("slow");
    }
};

$('#fld-produto').on('change', function(){
    var produto_id = $(this).val()
    getOrgaoControlador(produto_id);
  //  verificaClasseGases(produto_id);
});

//dispara evento ao auto-preencher produto
// $('#form-produto').ready(function () {
//     if ($('#fld-produto').select2('val')) {
//         var dataProd = {
//             id: $('#fld-produto').select2('val'),
//             text: $('#fld-produto option:selected').text()
//         };

//         $.controlChangeProduto(dataProd);
//     }
// });

function atualizaUnidade() {

    var idProduto = String(comboProduto.val()).replace(/\D/g, '');

    if(idProduto.length === 0)
        return false;

    $.ajax({
        url: '/produto/getunidade/',
        data: {
            id: idProduto
        },
        async: false,
        success: function (resp) {
            valor = resp;
            $("#itemproduto-unidade_id option[value="+valor+"]").attr('selected', 'selected');
        }
    });

}

function getOrgaoControlador(produto_id) {

    produto_id = String(produto_id).replace(/\D/g, '');

    if(produto_id.length === 0) {
        return false
    }

    var _csrf = String($('meta[name=csrf-token]').attr('content'));
    if(_csrf.length === 0) {
        toastr.error('Erro CSRF vazio, atualize a página.');
        return false;
    }
    var url = '/orgao-controlador/get-orgao-controlador-produto';
    var dados = {
        method: 'post',
        dataType: 'json',
        data: {produto_id: produto_id, _csrf: _csrf}
    }
    $.ajax(url, dados)
    .done((response) => {
        try{
            if(!response.hasOwnProperty('data')) {
                throw new Error('Erro na resposta do servidor');
            }

            var res = response.data;

            if(res.success) {
                var icon = '<span class="text-danger">' +
                                '<i class="fas fa-skull-crossbones"></i> Este produto é controlado pelo orgão: '+res.orgao.nome+'</span>';

                $(".info-produto-controlado").html(icon);

                $('#div-produto-controlado-anexo').show('slow');
                $(".info-produto-controlado-licenca").html(
                    '<span class="text-danger">Este produto é controlado, insira acima o certificado que permita a aquisição do item controlado.');

            } else {
                $('#div-produto-controlado-anexo').hide();
                $(".info-produto-controlado").html('');
            }
        }catch(e) {
            toastr.error(e.message);
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        console.log(jqXHR);
        toastr.error('Erro de comunicação com o servidor.')
    });
}

function verificaProdutoControladoUfvByItem() {

    if ($("#fld-produto").val() !=  undefined) {

        var acordoId = $("#fld-acordo").val();
        var produtoId = $("#fld-produto").val();
        var comboLaboratorio = $("select[name='ItemProduto[laboratorio_id]']");
        var enderecoEntrega = $("#fld-endereco-entrega-ufv").val();
        var enderecoId = enderecoEntrega ? enderecoEntrega : null;

        $.ajax({
            url: '/acordo/get-produto-controlado-ufv/',
            data: {'itensCarrinho': null, 'acordoId': acordoId, 'produtoId': produtoId, 'enderecoId': enderecoId},
            async: false,
            type: 'post',
            success: function(resp) {
                if (resp.controlado) {
                    var controladoUFV = '<span class="text-danger">' +
                        'Este produto é controlado e por exigências da UFV, deve se' +
                        ' informar em qual laboratório o item será armazenado e utilizado.'+'</span>';
                    $(".info-produto-controlado-ufv").html(controladoUFV);
                    comboLaboratorio.attr('disabled', false);
                    comboLaboratorio.attr('required', 'required');
                    $("#combo-laboratorioUFV").show('slow');
                } else {
                    $(".info-produto-controlado-ufv").html('');
                    comboLaboratorio.attr('disabled', true);
                    comboLaboratorio.attr('required', false);
                    $("#combo-laboratorioUFV").hide('slow');
                }
            }
        });
    }
}

function verificaClasseGases() {

    if ($("#fld-produto").val() !=  undefined) {

        var produtoId = $("#fld-produto").val();

        $.ajax({
            url: '/produto/verifica-classe-gases/',
            data: {'produtoId': produtoId},
            async: false,
            type: 'post',
            success: function(resp) {

                if (resp) {
                    $(".locacao-cilindro").removeAttr('style');
                } else {
                    $(".locacao-cilindro").attr('style', 'display: none')
                }
            }
        });
    }
}

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
                    $(".item-produto-form").hide("slow");
                    return false;
                } else {
                    $('.validaVigencia').html("");
                    $('#fld-projeto_id').css('color', 'black');
                    $(".item-produto-form").show("slow");
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