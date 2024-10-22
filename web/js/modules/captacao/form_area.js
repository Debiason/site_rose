$('#grande-area-select').on('change', function() {
    var grandeAreaId = $(this).val();

    $.ajax({
        url: '/captacao/area/get-areas',
        type: 'GET',
        data: {
            pai_id: grandeAreaId
        },
        success: function(data) {

            var $areaSelect = $('#area-select');
            $areaSelect.empty();

            $areaSelect.append(new Option('Selecione uma Área', '', true, true));

            $.each(data, function(index, item) {
                $areaSelect.append(new Option(item.text, item.id, false, false));
            });

            $areaSelect.trigger('change');
        }
    });
});