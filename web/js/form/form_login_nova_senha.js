$(document).ready(function(){

    var novaSenha = $('#novaSenha');
    var confirmarNovaSenha = $('#confirmarNovaSenha');

    var exibirNovaSenha = $("#exibirNovaSenha");
    var exibirConfirmarSenha = $("#exibirConfirmarSenha");

    // nova senha
    exibirNovaSenha.mousedown(function() {
        novaSenha.attr("type", "text");
    });

    exibirNovaSenha.mouseup(function() {
        novaSenha.attr("type", "password");
    });

    $( "#exibirNovaSenha" ).mouseout(function() {
        $("#novaSenha").attr("type", "password");
    });

    // confirmar nova senha
    exibirConfirmarSenha.mousedown(function() {
        confirmarNovaSenha.attr("type", "text");
    });

    exibirConfirmarSenha.mouseup(function() {
        confirmarNovaSenha.attr("type", "password");
    });

    $( "#exibirConfirmarSenha" ).mouseout(function() {
        $("#confirmarNovaSenha").attr("type", "password");
    });

});
