var $nextPage = $(".btn-next-panel");
var $backPage = $(".btn-back-panel");

// begin::mostrar layout split
const showLayoutApPedido = (ev) => {
    ev.preventDefault();

    $("body").css('overflow', 'hidden');

    var $iframePedido = $('#iframe-pedido');
    var $iFrameAf = $('#iframe-af');
    var $iFrameNf = $('#iframe-nf');
    var $btnRemove = $(".remove-selection");
    var $btnNext = $(".btn-next-panel");
    var $btnBack = $(".btn-back-panel");

    $iframePedido.attr('src', '');
    $iFrameAf.attr('src', '');
    $iFrameNf.attr('src', '');

    $iframePedido.attr('srcdoc', 'Carregando...');
    $iFrameAf.attr('srcdoc', 'Carregando...');
    $iFrameNf.attr('srcdoc', 'Carregando...');

    var docsSelecionados = []
    $('.kv-row-checkbox:checked').each(function () {
        if ($(this).val() !== '') {
            docsSelecionados.push({
                pedido_id: $(this).val(),
                af: $(this).data('af'),
                urlNf: $(this).data('nf'),
            });
        }
    });

    var $analisarIds = $("#analisar-selecionados");
    if (docsSelecionados.length === 0) {
        return false;
    }

    $analisarIds.val(JSON.stringify(docsSelecionados));

    $btnRemove.data('pedido-id', docsSelecionados[0].pedido_id);

    if ($btnRemove.hasClass('btn-warning')) {
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

const carregarViewsLayout = (action = '') => {

    var currentPage = 0;
    var $removeDocSelecionado = $(".remove-selection");
    var $analisarIds = $("#analisar-selecionados");

    if ($analisarIds.val().length === 0) {
        toastr.error('Erro ao carregar itens selecionados!')
        return false;
    }

    var docsSelecionados = JSON.parse($analisarIds.val())

    if (docsSelecionados.length === 0) {
        toastr.error('Erro ao carregar itens selecionados!!!')
        return false;
    }

    var countSelecionados = docsSelecionados.length;

    if (countSelecionados === 1) {
        $nextPage.attr('disabled', true);
    }

    if (action === 'next') {
        currentPage = parseInt($nextPage.data('page'));
        currentPage++
        if (currentPage === countSelecionados) {
            $nextPage.attr('disabled', true);
            return false;
        } else {
            $nextPage.attr('disabled', false);
        }
    } else if (action === 'back') {
        currentPage = parseInt($nextPage.data('page'));
        currentPage--
        if (currentPage === countSelecionados) {
            $nextPage.attr('disabled', true);
            return false;
        } else {
            $nextPage.attr('disabled', false);
        }
    }

    $backPage.attr('disabled', currentPage === 0);
    $removeDocSelecionado.data('pedido-id', docsSelecionados[currentPage].pedido_id);

    $('#tr-' + docsSelecionados[currentPage].pedido_id)
        .removeClass('table-danger')
        .addClass('table-success');

    $backPage.data('page', currentPage - 1);
    $nextPage.data('page', currentPage);

    var $iframePedido = $('#iframe-pedido');
    var $iFrameAf = $('#iframe-af');
    var $iFrameNf = $('#iframe-nf');

    if ($iframePedido.attr('srcdoc')) {
        $iframePedido.removeAttr('srcdoc');
        $iFrameAf.removeAttr('srcdoc');
        $iFrameNf.removeAttr('srcdoc');
    }

    $iframePedido.attr('src', `/baixa-af/print-detail?pedido_id=${docsSelecionados[currentPage].pedido_id}`);
    $iFrameAf.attr('src', `/af/print-detail?af_id=${docsSelecionados[currentPage].af}`);
    renderPDF(`${docsSelecionados[currentPage].urlNf}`);

    spinnerShow();

    $iframePedido.on('load', function () {

        var $trId = $(`#tr-${docsSelecionados[currentPage].pedido_id}`);

        spinnerHide();

        if ($trId.find(':checkbox').prop('checked')) {
            if ($removeDocSelecionado.hasClass('btn-warning')) {
                $removeDocSelecionado.removeClass('btn-warning')
                    .addClass('btn-success');
                $trId.addClass(['table-success']);
                $trId.find(':checkbox').prop('checked', true);
            }

        } else {
            if ($removeDocSelecionado.hasClass('btn-success')) {
                $removeDocSelecionado.removeClass('btn-success')
                    .addClass('btn-warning');
                $trId.find(':checkbox').prop('checked', false);
                $trId.removeClass(['table-success', 'table-danger']);
            }
        }

        $iframePedido.contents().find("header").remove();
        $iframePedido.contents().find("body").attr('style', 'padding-top: 0 !important;margin');
        $iframePedido.contents().find(".container").attr('style', 'min-width: 768px !important');
    });

    $iFrameAf.on('load', function () {
        $iFrameAf.contents().find("body").attr('style', 'padding-top: 0 !important; margin: 0 !important');
        $iFrameAf.contents().find(".container").attr('style', 'min-width: 768px !important;');
        $iFrameAf.contents().find("#barra").remove();
        $iFrameAf.contents().find("header").remove();
    });
}

$(".remove-selection").on('click', function (ev) {
    var removeDocId = String($(this).data('pedido-id')).replace(/\D/g, '');
    var $trId = $(`#tr-${removeDocId}`);

    if (removeDocId.length === 0) {
        toastr.error('Item não encontrado.')
        return false;
    }

    if ($trId.find(':checkbox').prop('checked')) {
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
$(".close-panel").on('click', function () {
    $("#panelContainer").hide();
    $("body").css('overflow', 'auto');
    if ($('.kv-row-checkbox:checked').length > 0) {
        $("#confirmarBtn").show();
    }
})

$('.kv-row-checkbox, .select-on-check-all').on('click', function () {
    setTimeout(function () {
        var marcados = [];
        $('.kv-row-checkbox:checked').each(function () {
            marcados.push($(this).val())
        })
        if (marcados.length > 0) {
            $(".btn-primary").removeClass('disabled');
        } else {
            $(".btn-primary").addClass('disabled')
        }
    }, 600)
})

$("#confirmarBtn").on('click', function () {

    var marcados = [];
    $('.kv-row-checkbox:checked').each(function () {
        marcados.push($(this).val())
    })

    $.ajax({
        url: '/conferencia-baixa-af/liberar-para-protocolo',
        type: 'POST',
        data: {
            ids: marcados
        },
        success: function (data) {
            if (data === true) {
                toastr.success('Baixas liberados com sucesso!');
                setTimeout(function () {
                    location.reload();
                }, 600);
            } else if (data.error) {
                var ids = data.ids.join(', ');
                toastr.error('Ocorreu um erro ao liberar algumas baixas. ' + 'IDs das baixas não atualizadas: ' + ids);
            }
        }
    })
})

async function renderPDF(url) {
    const canvas = document.getElementById('pdfCanvas');
    const context = canvas.getContext('2d');

    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.4 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };

    await page.render(renderContext).promise;
}