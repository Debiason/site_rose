var fldSelecaoBolsista = document.getElementById('projetoextra-selecao_bolsista');
var divSelecaoBolsista = $("#paga-bolsa-estagio");

// fldSelecaoBolsista.addEventListener('change', function () {
//     if (this.checked) {
//         divSelecaoBolsista.show("slow");
//
//     } else {
//         divSelecaoBolsista.hide("slow");
//
//     }
// });

$(document).ready(function () {

    // if (fldSelecaoBolsista.checked) {
    //     divSelecaoBolsista.show("slow");
    // }

    if ($('#exigir_vigencia_nova').val() == 'true') {
        $("#projetoextra-vigencia_nova-disp").attr('required', $('#exigir_vigencia_nova').val());
    }
});

$(document).on('select2:open', () => {
    var scrollAmount = 500;
    // Role a página verticalmente
    window.scrollBy(0, scrollAmount);
});
