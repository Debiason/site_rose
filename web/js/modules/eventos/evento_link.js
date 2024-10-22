function clickFinalizada() {
    var content = document.getElementById('link');
    content.select();

    document.execCommand('copy');

    // monta o css da mensagem para que fique flutuando na frente de todos elementos da página
    var cssMessage = "display: block; position: fixed; top: 75%; left: 65%; right: 20%; width: 100px; z-index: 9999";

// monta o html da mensagem com Bootstrap
    var dialogo = "";
    dialogo += '<div id="message" style="' + cssMessage + '">';
    dialogo += '<div class="alert alert-success alert-dismissable">';
    dialogo += 'copiado';
    dialogo += '</div>';
    dialogo += '</div>';

// adiciona ao body a mensagem com o efeito de fade
    $("body").append(dialogo);
    $("#message").hide();
    $("#message").fadeIn(200);

// contador de tempo para a mensagem sumir
    setTimeout(function () {
        $('#message').fadeOut(300, function () {
            $(this).remove();
        });
    }, 2000); // milliseconds
}

$('a').click(function() {
    $(this).find('i').toggleClass('fa-check fa-clone');
});