function toggleButtons() {
    var selectedCheckboxes = $('.kv-row-checkbox:checked');
    var aprovarBolsistasFaseFinal = $('#aprovarBolsistasFaseFinal');
    var pedido_id = $("#pedido_id").val();

    if (selectedCheckboxes.length > 0) {

        var ids = [];
        selectedCheckboxes.each(function () {
            var checkbox = $(this);
            var checkboxValue = checkbox.val();

            ids.push(checkboxValue);
        });

        var idsString = ids.join(',');

        aprovarBolsistasFaseFinal.attr('value', "/bolsista-inscricao/enviar-email-fase-final?id=" + pedido_id + "&idsBolsista=" + idsString);
        aprovarBolsistasFaseFinal.removeClass('disabled');
    } else {
        aprovarBolsistasFaseFinal.addClass('disabled');
    }
}

function verificaCadastroReserva() {
    var pedido_id = $("#pedido_id").val();

    $.ajax({
        url: '/bolsista-inscricao/verifica-limite-cadastro-reserva/',
        data: {
            idPedido: pedido_id,
        },
        success: function (resp) {
            resp.forEach(function (value) {
                $('.kv-row-checkbox[value="' + value + '"]').prop('disabled', true);
                $('.kv-row-checkbox[value="' + value + '"]').hide();
            });
        }
    });
}

function configPage() {
    $(".select-on-check-all").hide();

    toggleButtons();
    verificaCadastroReserva();

    $('.kv-row-checkbox').on('change', function () {
        toggleButtons();
    });
}
$(document).ready(function () {
    configPage();
});

$(document).on('pjax:end', function () {
    configPage();
});