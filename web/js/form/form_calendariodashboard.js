$(document).ready(function () {


    $('.hiddenOnStart').hide();

    $("input[name='CalendarioDashboard[exibirtudo]").change(function () {
        if ($(this).val() == 1) {
            $('.escolha-eventos').hide();
            $('.escolha-eventos').attr('class' , 'escolha-eventos hidden');
        } else {
            $('.escolha-eventos').show();
            $('.escolha-eventos').attr('class' , 'escolha-eventos');
        }
    });

    $('#CalendarioDashboard').submit(function() {
        $(this).find('div:hidden input').prop('disabled', true);
    });

});

