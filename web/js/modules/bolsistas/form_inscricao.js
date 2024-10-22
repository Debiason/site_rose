$("#btnSalvar").on('click', function () {

    var btn = $(this);

    btn.prop('disabled', true);
    btn.html('Aguarde ...');

    $("#inscricao-form").submit();

    setTimeout(function(){
        btn.prop('disabled', false);
        btn.html('Enviar <i class="flaticon-paper-plane"></i>');
    }, 2500);
});