
$("#solicitarsenha").click(function() {
    $('#solicitarsenha').html('Aguarde...');
    $('#solicitarsenha').attr('disabled', 'disabled');
    $('#m_login_forget_password_cancel').attr('disabled', 'disabled');
    $('.m-alert').remove();
    $.post("/site/esqueceu-senha", $('#login-senha').serialize(), function(data){
         var m = '<div class="m-alert m-alert--outline alert alert-'+data.status+' alert-dismissible" role="alert">\t\t\t<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\t\t\t<span>'+data.mensagem+'</span>\t\t</div>';
         $('#m_login_forget_password_cancel').click();
         $('#login-form').prepend(m);
        $('#solicitarsenha').removeAttr('disabled');
        $('#m_login_forget_password_cancel').removeAttr('disabled');
        $('#solicitarsenha').html('Solicitar');
    }, "json");
});
