$('.expand-row').on('click', function(e) {
    $('body').css('cursor', 'wait');
    e.preventDefault();

    var key = $(this).data('key');
    var detailRow = $('#detail-row-' + key);
    var contentDiv = detailRow.find('.expanded-row-content');
    var numeroRemessa = contentDiv.data('remessa');
    var projeto = contentDiv.data('projeto');
    var periodo = contentDiv.data('periodo');
    var icon = $(this).find('i');

    if (detailRow.is(':visible')) {
        detailRow.hide();
        icon.removeClass('fa-caret-square-up').addClass('fa-caret-square-down');
        $('body').css('cursor', 'default');
    } else {
        if (contentDiv.html() === '') {
            $.ajax({
                url: '/centro-custo/get-detalhes-remessa',
                type: 'GET',
                data: { numeroRemessa: numeroRemessa, projeto: projeto, periodo: periodo  },
                success: function(response) {
                    contentDiv.html(response);
                    detailRow.show();
                    icon.removeClass('fa-caret-square-down').addClass('fa-caret-square-up');
                    $('body').css('cursor', 'default');
                },
                error: function() {
                    contentDiv.html('<p>Erro ao carregar os dados.</p>');
                    $('body').css('cursor', 'default');
                }
            });
        } else {
            detailRow.show();
            icon.removeClass('fa-caret-square-down').addClass('fa-caret-square-up');
            $('body').css('cursor', 'default');

        }
    }
});