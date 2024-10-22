$(document).ready(function () {


    $('#fld-produto').on('select2:select', function (e) {
        var data = e.params.data;
        $.controlChangeProduto(data);
    });

    $('#fld-classe').on('change', function () {
        var fldDescricao = $('#fld-descricao');
        fldDescricao.val(" ");
        outrasDescricoes = $('#outrasDescricoes');
        outrasDescricoes.attr('style', 'display:none');
    });

    $('.selectDescricao').click(function() {
        fldDescricao = $('#fld-descricao');
        descricao = this.id;
        campo = $('.'+descricao);
        fldDescricao.val(campo.html());
        $('.modal').modal('hide');
    });
});

$.controlChangeProduto = function (dadosProduto) {
    comboProduto = $('#fld-produto');
    fldDescricao = $('#fld-descricao');

    descricaoAnterior = fldDescricao.val();

    $('input[name=produtoNome]').val(dadosProduto.text);
    $('input[name=produtoId]').val(dadosProduto.id);

    outrasDescricoes = $('#outrasDescricoes');
    outrasDescricoes.removeAttr('style');
    $.ajax({
        url: '/produto-descricao/get-descricao/',
        data: {'id': dadosProduto.id},
        async: false,
        type: 'post',
        success: function(resp) {
            if(resp.length) {
                if(resp.length == 1) {
                    fldDescricao.val(resp[0].descricao);
                    outrasDescricoes.attr('style', 'display:none');
                }else{
                    fldDescricao.val(" ");
                    outrasDescricoes.val(('../produto-descricao/get-descricao-compra/?id='+dadosProduto.id));
                    outrasDescricoes.click();
                }
            }else{
                outrasDescricoes.attr('style', 'display:none');
                fldDescricao.val(" ");
            }
        }
    });

    if ($('#acaoEditarCarrinho').val() == 1) {
        fldDescricao.val(descricaoAnterior);
        $('#acaoEditarCarrinho').val(0);
    }

    //SERVICO
    if (comboProduto.hasClass('servico')) {
        $('.form-btn-acoes').show();

        if (importacao) {
            $('#form-especifico-servico').load('/compra/nova-etapa2?grupo_id=95&produto_id=' + dadosProduto.id + '&importacao=true');
        } else {
            $('#form-especifico-servico').load('/compra/nova-etapa2?grupo_id=95&produto_id=' + dadosProduto.id);
        }
        $('#form-especifico-servico').show("slow");
    }
};

$(document).ready($.carregaMascaras());
$(document).ready($(function () {
    $('[data-toggle="popover"]').popover()
}));