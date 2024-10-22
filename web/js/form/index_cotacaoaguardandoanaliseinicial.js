var $backPage = $(".btn-back-panel");
var $nextPage = $(".btn-next-panel");

// begin::mostrar layout split
const showAnaliseCotacao = (ev) => {
    ev.preventDefault();

    $("body").css('overflow', 'hidden');

    var $iframeItemCompra = $('#iframe-item-compra');
    var $iframeCotacao = $('#iframe-cotacao');
    var $btnRemove = $(".remove-selection-cotacao");
    var $btnNext = $(".btn-next-panel");
    var $btnBack = $(".btn-back-panel");

    $iframeItemCompra.attr('src', '');
    $iframeCotacao.attr('src', '');
    $iframeItemCompra.attr('srcdoc', 'Carregando...');
    $iframeCotacao.attr('srcdoc', 'Carregando...');

    var cotacoesSelecionados = []
    $('.kv-row-checkbox:checked').each(function () {
        if($(this).val() !== ''
            && $(this).data('item-compra-id') !== ''
            && $(this).data('route') !== '') {

            cotacoesSelecionados.push({
                cotacao: $(this).val(),
                itemcompra_id: $(this).data('item-compra-id'),
                route: $(this).data('route')
            });
        }
    });
    var $analisarCotacoesIds = $("#analisar-cotacoes-selecionadas");
    if(cotacoesSelecionados.length === 0) {
        return false;
    }

    $analisarCotacoesIds.val(JSON.stringify(cotacoesSelecionados));

    $btnRemove.data('cotacao-id', cotacoesSelecionados[0].cotacao);
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
        $removeDocSelecionado = $(".remove-selection-cotacao");
    var $analisarCotacoesIds = $("#analisar-cotacoes-selecionadas");

    if($analisarCotacoesIds.val().length === 0) {
        toastr.error('Erro ao carregar itens selecionados!')
        return false;
    }

    var cotacoesSelecionados = JSON.parse($analisarCotacoesIds.val())

    if(cotacoesSelecionados.length === 0) {
        toastr.error('Erro ao carregar itens selecionados!!!')
        return false;
    }

    var countSelecionados = cotacoesSelecionados.length;

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

    $removeDocSelecionado.data('cotacao-id', cotacoesSelecionados[currentPage].cotacao);

    $('#tr-'+cotacoesSelecionados[currentPage].cotacao)
        .removeClass('table-danger')
        .addClass('table-success');

    $backPage.data('page', currentPage - 1);
    $nextPage.data('page', currentPage);

    var $iframeItemCompra = $('#iframe-item-compra');
    var $iframeCotacao = $('#iframe-cotacao');

    if($iframeItemCompra.attr('srcdoc')) {
        $iframeItemCompra.removeAttr('srcdoc');
        $iframeCotacao.removeAttr('srcdoc');
    }
    // loading page show
    spinnerShow();

    $("#atalho-editar-cotacao").attr('href', `/cotacao/update?id=${cotacoesSelecionados[currentPage].cotacao}`);

    $iframeCotacao.attr('src',
        `/cotacao-aguardando-analise/print-detail?id=${cotacoesSelecionados[currentPage].cotacao}`);
    $iframeItemCompra.attr('src',
        `/${cotacoesSelecionados[currentPage].route}?id=${cotacoesSelecionados[currentPage].itemcompra_id}`);

    $("#btnConfirmacaoNoModal").val(cotacoesSelecionados[currentPage].cotacao);

    $iframeItemCompra.on('load', function(){

        var $trId = $(`#tr-${cotacoesSelecionados[currentPage].cotacao}`);

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

        $iframeItemCompra.contents().find("header").remove();
        $iframeItemCompra.contents().find("body").attr('style', 'padding-top: 0 !important;margin');
        $iframeItemCompra.contents().find(".container").attr('style', 'min-width: 768px !important');

        $.ajax({
            url: '/cotacao/get-anexo',
            data: {
                id: `${cotacoesSelecionados[currentPage].cotacao}`,
            },
            async: false,
            success: function (resp) {

                // loading page hide
                spinnerHide();

                if (resp.length === 0) {
                    $(".link-anexo-icons").html('')
                    $(".links-anexos-cotacoes").fadeOut();
                    return false;
                }

                let iconsFiles = [];

                for (let i = 0; i < resp.length; i++) {
                    iconsFiles.push(`<a href="/documento-acordo/get-anexo?id=${resp[i]}" target="_blank" class="mr-2" title=""><i class="far fa-file-pdf"></i></a>`);
                }
                 $(".link-anexo-icons").html(iconsFiles.join(' '))
                 $(".links-anexos-cotacoes").fadeIn();
            }
        });

    });
    $iframeCotacao.on('load', function(){
        $iframeCotacao.contents().find("body").attr('style', 'padding-top: 0 !important; margin: 0 !important');
        $iframeCotacao.contents().find("body > br").first().remove();
        $iframeCotacao.contents().find("#barra").remove();
    });

}
// end::carregar views em layout

// begin::remover doc assinatura
$(".remove-selection-cotacao").on('click', function(ev) {
    var removeDocId = String($(this).data('cotacao-id')).replace(/\D/g, '');
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

    var id = [];
    var i = 0;
    $('.kv-row-checkbox:checked').each(function (){
        id[i] = $(this).val();
        i++;
    });
    $("#enviar-para-parecer").attr('href', '/cotacao-aguardando-analise/solicitar-parecer-em-massa?ids='+id);
})


//Habilita / desabilita btn de analisar
$('.kv-row-checkbox, .select-on-check-all').on('click', function(){
    setTimeout(function() {
        var marcados = [];
        $('.kv-row-checkbox:checked').each(function (){
            marcados.push($(this).val())
        })
        if(marcados.length > 0) {
            $(".vcotacao-index .btn-info").removeClass('disabled');
        } else {
            $(".vcotacao-index .btn-info").addClass('disabled')
        }
    },600);

    var id = [];
    var i = 0;
    $('.kv-row-checkbox:checked').each(function (){
        id[i] = $(this).val();
        i++;
    });
    $("#enviar-para-parecer").attr('href', '/cotacao-aguardando-analise/solicitar-parecer-em-massa?ids='+id);
})

$("#btnConfirmacaoNoModal").click(function () {
   let id = $(this).val();
    $.ajax({
        url: '/cotacao-aguardando-analise/reprovar-cotacao/',
        data: {
            id: id,
            motivo: $("select[name='motivo']").val(),
            justificativa: $("input[name='justificativa-motivo']").val()
        },
        async: false,
        success: function (resp) {
            if (resp){
                //grid-reprovar-cotacao
                $('#grid-reprovar-cotacao').modal('hide');
            } else {
                toastr.error('Ocorreu um erro para salvar a alteração.');
            }
        }
    });
});

$("select[name='motivo']").on('change', function (){
    if ($("select[name='motivo']").val() == '353') {
        $("#div-justificativa-motivo").show('slow');
    } else {
        $("#div-justificativa-motivo").hide('slow');
    }
});