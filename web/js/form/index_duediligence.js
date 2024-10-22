var desativarDiligenceBtn = $('#btn-desativar-diligence');

function toggleDesativarDiligenciaButton() {
    var selectedCheckboxes = $('.kv-row-checkbox:checked');

    $(".select-on-check-all").hide();

    if (selectedCheckboxes.length > 0) {
        desativarDiligenceBtn.show('slow');
    } else {
        desativarDiligenceBtn.hide('slow');
    }
}

function desativaDueDiligence() {

    var selectedCheckboxes = $('.kv-row-checkbox:checked');

    if (selectedCheckboxes.length > 0) {
        var ids = [];

        selectedCheckboxes.each(function () {
            ids.push($(this).val());
        });

        $.ajax({
            url: '/due-diligence/desativar',
            type: 'POST',
            data: {
                ids: ids
            },
            success: function (response) {
                if (response === true) {
                    toastr.success('A diligência foi inativada com sucesso.');
                }

                $('a[href="#due-diligence"]').click();
            },
        });
    }
}

function escondeInativos() {
    $.ajax({
        url: '/due-diligence/get-inativos/',
        data: {
            pessoa_id: $("#pessoaId").val()
        },
        success: function (resp) {
            resp.forEach(function(value) {
                $('.kv-row-checkbox[value="' + value + '"]').prop('disabled', true);
                // $('.kv-row-checkbox[value="' + value + '"]').hide();
            });
        }
    });
}

$(document).ready(function () {

    toggleDesativarDiligenciaButton();
    escondeInativos();

    $('.kv-row-checkbox').on('change', function () {
        toggleDesativarDiligenciaButton();
    });

    desativarDiligenceBtn.on('click', function() {
        desativaDueDiligence();
    })

});