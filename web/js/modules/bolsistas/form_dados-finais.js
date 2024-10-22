var btnProxHome = $("#form-home");
var btnProxDadosBancarios = $("#form-dados-bancarios");

btnProxHome.click(function () {
    $("#home-tab").attr('class', 'nav-link');
    $("#home-tab").attr('class', 'nav-link');
    $("#home").attr('class', 'tab-pane fade');

    $("#dados-bancarios-tab").attr('class', 'nav-link active show');
    $("#dados-bancarios-tab").attr('aria-selected', true);
    $("#dados-bancarios").attr('class', 'tab-pane fade active show');
});

btnProxDadosBancarios.click(function () {
    $("#dados-bancarios-tab").attr('class', 'nav-link');
    $("#dados-bancarios-tab").attr('class', 'nav-link');
    $("#dados-bancarios").attr('class', 'tab-pane fade');

    $("#documentos-tab").attr('class', 'nav-link active show');
    $("#documentos-tab").attr('aria-selected', true);
    $("#documentos").attr('class', 'tab-pane fade active show');
});

$('input[name="DocumentosFinais[servidor_publico]"]').change(function() {
    if ($(this).val() == '1') {
        $('#div-matricula').show('slow');
    } else {
        $('#div-matricula').hide('slow');
    }
});

$('input[name="DocumentosFinais[bolsista]"]').change(function() {
    if ($(this).val() == '1') {
        $('#instituicao_bolsista').show('slow');
    } else {
        $('#instituicao_bolsista').hide('slow');
    }
});

$('#documentosfinais-conta, #documentosfinais-agencia').on('input', function(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    event.target.value = inputValue;
});