function toggleGerarItensDuplicadosButton() {
    var selectedCheckboxes = $('.kv-row-checkbox:checked');
    var gerarItensDuplicadosButton = $('#gerarItensDuplicados');
    localStorage.removeItem("itensCarrinho");

    if (selectedCheckboxes.length > 0) {
        var ids = [];
        selectedCheckboxes.each(function () {
            ids.push($(this).val());
        });

        var idsString = ids.join(',');

        gerarItensDuplicadosButton.attr('target', '_blank');
        var url = "/compra/duplicate?ids=" + idsString;
        gerarItensDuplicadosButton.attr('href', url);

        $.ajax({
            url: 'compra/duplicate',
            type: 'POST',
            data: {ids: ids},
            success: function (response) {
                console.log(response, ids);
            },
        });

        gerarItensDuplicadosButton.show('slow');
    } else {
        gerarItensDuplicadosButton.hide('slow');
    }
}

$(document).ready(function () {
    toggleGerarItensDuplicadosButton();

    $('.kv-row-checkbox').on('change', function () {
        toggleGerarItensDuplicadosButton();
    });
});