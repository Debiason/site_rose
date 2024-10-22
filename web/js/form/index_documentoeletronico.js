// begin::assinar documento
var btnAssinar = $("button[class='btn btn-outline-success assinar']");
var btnProsseguir = $("button[class='btn btn-outline-danger prosseguir desabilita-botao__submit']");
var divEscolhaAssinatura = $("#divEscolhaAssinatura");
var avisoSenha = $("#avisoSenha");
var fldAssinatura = $("input[name='assinaturaId']");
var fldSenha = $("input[name='senha']");
var $nextPage = $(".btn-next-panel");
var $backPage = $(".btn-back-panel");

btnAssinar.click(function () {
    divEscolhaAssinatura.show('slow');
});

fldSenha.on('keypress', function (e) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        e.preventDefault();
        btnProsseguir.trigger('click');
    }
})

fldSenha.on('input', function (e) {
    if (avisoSenha.length > 0) {
        avisoSenha.hide('slow')
    }
});

$(".desabilita-botao__submit").on('click', function () {
    var btn = $(this);
    btn.prop('disabled', true);
    setTimeout(function(){
        btn.prop('disabled', false);
    }, 5000);
});

btnProsseguir.on('click', function () {
    if (fldSenha.val() == '') {
        avisoSenha.show('slow');
        return false;
    } else {
        avisoSenha.hide('slow');
    }

    var documentos = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        documentos[i] = $(this).val();
        i++;
    });

    if (documentos.length === 0) {
        toastr.error("Nenhum documento foi selecionado.");
        return false;
    }

    $.ajax({
        url: '/documento-eletronico/assinar-em-massa/',
        type: "post",
        data: {
            documentos: documentos,
            idAssinatura: fldAssinatura.val(),
            senha: fldSenha.val(),
        }
    }).done(function (response) {
        avisoSenha.hide('slow');
    })
});
// end::assinar documento

// begin::mostrar layout split
const showLayoutApPedido = (ev) => {
    ev.preventDefault();

    $("body").css('overflow', 'hidden');

    var $iframePedido = $('#iframe-pedido');
    var $iframeAp = $('#iframe-ap');
    var $btnRemove = $(".remove-selection-ap");
    var $btnNext = $(".btn-next-panel");
    var $btnBack = $(".btn-back-panel");

    $iframePedido.attr('src', '');
    $iframeAp.attr('src', '');
    $iframePedido.attr('srcdoc', 'Carregando...');
    $iframeAp.attr('srcdoc', 'Carregando...');

    var docsSelecionados = []
    $('.kv-row-checkbox:checked').each(function () {
        if($(this).val() !== ''
            && $(this).data('pedido-id') !== ''
                && $(this).data('route') !== '') {

            docsSelecionados.push({
                doc: $(this).val(),
                pedido_id: $(this).data('pedido-id'),
                route: $(this).data('route')
            });
        }
    });
    var $analisarDocsIds = $("#analisar-docs-selecionados");
    if(docsSelecionados.length === 0) {
        return false;
    }

    $analisarDocsIds.val(JSON.stringify(docsSelecionados));

    $btnRemove.data('doc-id', docsSelecionados[0].doc);
    if($btnRemove.hasClass('btn-warning')) {
        $btnRemove.removeClass('btn-warning disabled');
        $btnRemove.addClass('btn-success');
        $btnRemove.prop('disabled', false);
    }
    $btnBack.data('page', -1);
    $btnBack.prop('disabled', true);
    $btnNext.data('page', 0);
    $btnNext.prop('disabled', false);

    carregarViewsLayout();

    $("#panelContainer").show();
}
// end::mostrar layout split

// begin::carregar views em layout
const carregarViewsLayout = (action = '') => {

    var currentPage = 0,
    $removeDocSelecionado = $(".remove-selection-ap");
    var $analisarDocsIds = $("#analisar-docs-selecionados");

    if($analisarDocsIds.val().length === 0) {
        toastr.error('Erro ao carregar itens selecionados!')
        return false;
    }

    var docsSelecionados = JSON.parse($analisarDocsIds.val())

    if(docsSelecionados.length === 0) {
        toastr.error('Erro ao carregar itens selecionados!!!')
        return false;
    }

    var countSelecionados = docsSelecionados.length;

    if(countSelecionados === 1) {
        $nextPage.attr('disabled', true);
    }

    if(action === 'next') {
        currentPage = parseInt($nextPage.data('page'));
        currentPage++
        if(currentPage === countSelecionados) {
            $nextPage.attr('disabled', true);
            return false;
        } else {
            $nextPage.attr('disabled', false);
        }
    } else if(action === 'back') {
        currentPage = parseInt($nextPage.data('page'));
        currentPage--
        if(currentPage === countSelecionados) {
            $nextPage.attr('disabled', true);
            return false;
        } else {
            $nextPage.attr('disabled', false);
        }
    }

    $backPage.attr('disabled', currentPage === 0);

    $removeDocSelecionado.data('doc-id', docsSelecionados[currentPage].doc);

    $('#tr-'+docsSelecionados[currentPage].doc)
      .removeClass('table-danger')
      .addClass('table-success');

    $backPage.data('page', currentPage - 1);
    $nextPage.data('page', currentPage);

    var $iframePedido = $('#iframe-pedido');
    var $iframeAp = $('#iframe-ap');

    if($iframePedido.attr('srcdoc')) {
        $iframePedido.removeAttr('srcdoc');
        $iframeAp.removeAttr('srcdoc');
    }
    // loading page show
    spinnerShow();
    $iframeAp.attr('src',
      `/documento-eletronico/print-detail?id=${docsSelecionados[currentPage].doc}`);
    $iframePedido.attr('src',
      `/${docsSelecionados[currentPage].route}/print-detail?pedido_id=${docsSelecionados[currentPage].pedido_id}`);

    $iframePedido.on('load', function(){

        var $trId = $(`#tr-${docsSelecionados[currentPage].doc}`);

        if($trId.find(':checkbox').prop('checked')) {
            if($removeDocSelecionado.hasClass('btn-warning')) {
                $removeDocSelecionado.removeClass('btn-warning')
                  .addClass('btn-success');
                $trId.addClass(['table-success']);
                $trId.find(':checkbox').prop('checked', true);
            }

        } else {
            if($removeDocSelecionado.hasClass('btn-success')) {
                $removeDocSelecionado.removeClass('btn-success')
                  .addClass('btn-warning');
                $trId.find(':checkbox').prop('checked', false);
                $trId.removeClass(['table-success', 'table-danger']);
            }
        }

        $iframePedido.contents().find("header").remove();
        $iframePedido.contents().find("body").attr('style', 'padding-top: 0 !important;margin');
        $iframePedido.contents().find(".container").attr('style', 'min-width: 768px !important');

        try {
            fetch(`/protocolo-anexo/get-protocolo-anexo-pedido?pedido_id=${docsSelecionados[currentPage].pedido_id}`)
                .then(response => response.json())
                .then((body) => {

                    // loading page hide
                    spinnerHide();

                    if (body.length === 0) {
                        $(".link-anexo-icons").html('')
                        $(".links-anexos-protocolos").fadeOut();
                        return false;
                    }

                    let iconsFiles = [];

                    for (let i = 0; i < body.length; i++) {
                        iconsFiles.push(`<a href="/documento-acordo/get-anexo?id=${body[i]}" target="_blank" class="mr-2" title=""><i class="far fa-file-pdf"></i></a>`);
                    }
                    $(".link-anexo-icons").html(iconsFiles.join(' '))
                    $(".links-anexos-protocolos").fadeIn();
                });
        }catch (e) {
            spinnerHide();
            toastr.error(e)
        }
    });
    $iframeAp.on('load', function(){
        $iframeAp.contents().find("body").attr('style', 'padding-top: 0 !important; margin: 0 !important');
        $iframeAp.contents().find("body > br").first().remove();
        $iframeAp.contents().find("#barra").remove();
    });

}
// end::carregar views em layout

// begin::remover doc assinatura
$(".remove-selection-ap").on('click', function(ev) {
    var removeDocId = String($(this).data('doc-id')).replace(/\D/g, '');
    var $trId = $(`#tr-${removeDocId}`);

    if(removeDocId.length === 0) {
        toastr.error('Item não encontrado.')
        return false;
    }

    if($trId.find(':checkbox').prop('checked')) {
        $(this).removeClass('btn-success')
          .addClass('btn-warning');
        $trId.find(':checkbox').prop('checked', false);
        $trId.removeClass(['table-success', 'table-danger']);
    } else {
        $(this).removeClass('btn-warning')
          .addClass('btn-success');
        $trId.addClass(['table-success']);
        $trId.find(':checkbox').prop('checked', true);
    }

});
// end::remover doc assinatura

$(".close-panel").on('click', function() {
    $("#panelContainer").hide();
    $("body").css('overflow', 'auto');
})

$('.kv-row-checkbox, .select-on-check-all').on('click', function(){
    setTimeout(function() {
        var marcados = [];
        $('.kv-row-checkbox:checked').each(function (){
            marcados.push($(this).val())
        })
        if(marcados.length > 0) {
            $(".documento-eletronico-index .btn-info").removeClass('disabled');
        } else {
            $(".documento-eletronico-index .btn-info").addClass('disabled')
        }
    },600)
})
