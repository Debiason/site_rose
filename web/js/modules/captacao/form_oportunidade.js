$(document).ready(function () {
    $('#oportunidade-tipooportunidade').multiSelect({
        selectableHeader: '' +
            '<div class="d-flex align-items-center pb-3">' +
            '<button id="select-all" class="btn btn-sm btn-outline-primary">' +
            'Selecionar todos' +
            '</button>' +
            '<strong class="mb-1 text-center btn-block">Não selecionados</strong>' +
            '</div>',
        selectionHeader: '' +
            '<div class="d-flex align-items-center pb-3">' +
            '<strong class="mb-1 text-center btn-block">Selecionado(s)</strong>' +
            '<button id="deselect-all" class="btn btn-sm btn-outline-primary">' +
            'Remover todos' +
            '</button>' +
            '</div>',
    });

    $('#estado-list').multiSelect({
        selectableHeader: '' +
            '<div class="d-flex align-items-center pb-3">' +
            '<button id="select-all-estado" class="btn btn-sm btn-outline-primary">' +
            'Selecionar todos' +
            '</button>' +
            '<strong class="mb-1 text-center btn-block">Não selecionados</strong>' +
            '</div>',
        selectionHeader: '' +
            '<div class="d-flex align-items-center pb-3">' +
            '<strong class="mb-1 text-center btn-block">Selecionado(s)</strong>' +
            '<button id="deselect-all-estado" class="btn btn-sm btn-outline-primary">' +
            'Remover todos' +
            '</button>' +
            '</div>',
    });

    $('#oportunidade-instituicaooportunidade').multiSelect({
        selectableHeader: '' +
            '<div class="d-flex align-items-center pb-3">' +
            '<button id="select-all-instituicao" class="btn btn-sm btn-outline-primary">' +
            'Selecionar todos' +
            '</button>' +
            '<strong class="mb-1 text-center btn-block">Não selecionados</strong>' +
            '</div>',
        selectionHeader: '' +
            '<div class="d-flex align-items-center pb-3">' +
            '<strong class="mb-1 text-center btn-block">Selecionado(s)</strong>' +
            '<button id="deselect-all-instituicao" class="btn btn-sm btn-outline-primary">' +
            'Remover todos' +
            '</button>' +
            '</div>',
    });

    $('#select-all').click(function () {
        $('#oportunidade-tipooportunidade').multiSelect('select_all');
        return false;
    });

    $('#deselect-all').click(function () {
        $('#oportunidade-tipooportunidade').multiSelect('deselect_all');
        return false;
    });

    $('#select-all-area').click(function () {
        $('#oportunidade-areaoportunidade').multiSelect('select_all');
        return false;
    });

    $('#deselect-all-area').click(function () {
        $('#oportunidade-areaoportunidade').multiSelect('deselect_all');
        return false;
    });

    $('#select-all-estado').click(function () {
        $('#estado-list').multiSelect('select_all');
        return false;
    });

    $('#deselect-all-estado').click(function () {
        $('#estado-list').multiSelect('deselect_all');
        return false;
    });

    $('#select-all-instituicao').click(function () {
        $('#oportunidade-instituicaooportunidade').multiSelect('select_all');
        return false;
    });

    $('#deselect-all-instituicao').click(function () {
        $('#oportunidade-instituicaooportunidade').multiSelect('deselect_all');
        return false;
    });

    $('#filter').on('keyup', function () {

        var filter = $(this).val().toLowerCase();

        $('.ms-selectable li').each(function () {
            var text = $(this).text().toLowerCase();

            if (!$(this).hasClass('ms-selected')) {
                if (text.includes(filter)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            }
        });

        $('.ms-selection li.ms-selected').each(function () {
            var text = $(this).text().toLowerCase();

            if (text.includes(filter)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });

    $(".nav-link").click(function () {
        $("#filter").val('')
        $('.ms-selectable li, .ms-selection li.ms-selected').show();
    })
});
