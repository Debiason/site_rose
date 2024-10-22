var divCheckboxListCentroCusto = $('#checkboxlist-centrocusto');
var fldGestorResponsavel = $('#fld-gestorresponsavel');
var fldGestorNovo = $('#fld-gestornovo');
var btnMigrar = $('#btn-migrar');

$(document).ready(function () {
    verificarCampos();
});

fldGestorResponsavel.add(fldGestorNovo).on('change', verificarCampos);

function verificarCampos() {
    if (fldGestorResponsavel.val() && fldGestorNovo.val()) {

        var gestorresponsavel_id = fldGestorResponsavel.val();

        $.ajax({
            url: '/ferramentas/grid-migracao-centro-custo-gestor',
            type: 'GET',
            data: {
                gestorresponsavel_id : gestorresponsavel_id
            },
            success: function (data) {
                if (data) {
                    divCheckboxListCentroCusto.html(data);
                } else {
                    divCheckboxListCentroCusto.empty();
                    divCheckboxListCentroCusto.html('Nenhum centro de custo encontrado.');
                }
            }
        });

        btnMigrar.prop('disabled', false);
    } else {
        divCheckboxListCentroCusto.empty();
        divCheckboxListCentroCusto.html('Preencha os campos acima.');
        btnMigrar.prop('disabled', true);
    }
}

