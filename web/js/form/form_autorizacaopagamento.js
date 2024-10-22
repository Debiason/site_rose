var tipoConferente = $("input[name='tipoConferente']");

$(document).ready(function () {
    $('.field-fld-pessoa-conferente').hide();
    $('.field-fld-grupo').hide();
});

tipoConferente.click(function() {
    var tipo = $('input[type="radio"]:checked').val();

    if (tipo == 'pessoa') {
        $('.field-fld-pessoa-conferente').show();
        $('.field-fld-grupo').hide();
    } else {
        $('.field-fld-grupo').show();
        $('.field-fld-pessoa-conferente').hide();
    }
});