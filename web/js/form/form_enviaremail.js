var enviar = $("button[class='btn btn-success enviarEmail']");
var dtEntrevista = $("#bolsistainscricao-dt_entrevista");
var endereco = $("#bolsistainscricao-endereco_entrevista");
var msgInicial = $("#bolsistainscricao-mensagem").val();
var msgInicialEndereco = ''
var newMsg = '';
dtEntrevista.on("change", function () {
    const dataObject = new Date(dtEntrevista.val());
    var dataFormatada = dataObject.toLocaleDateString();
    var horaFormatada = dataObject.toLocaleTimeString().slice(0, -3);

    if (dtEntrevista.val() == '') {
        dataFormatada = '';
        horaFormatada = '';
    }

    var endValue = '';
    if (endereco.val() != '') {
        endValue = endereco.val();
    }

    newMsg = msgInicial
        .replace("Data:", `Data: ${dataFormatada}`)
        .replace("Horário:", `Horário: ${horaFormatada}`)

    msgInicialEndereco = newMsg;

    newMsg = newMsg
        .replace("Endereço completo (presencial) ou link (online):", `Endereço completo (presencial) ou link (online): ${endValue}`)

    setTimeout(function (){
        $("#bolsistainscricao-mensagem").val(newMsg);
    }, 800);


});

endereco.on("blur", function () {
    const enderecoValue = endereco.val();

    if (msgInicialEndereco == '') {
        msgInicialEndereco = msgInicial;
    }

    newMsg = msgInicialEndereco
        .replace("Endereço completo (presencial) ou link (online):", `Endereço completo (presencial) ou link (online): ${enderecoValue}`)

    setTimeout(function (){
        $("#bolsistainscricao-mensagem").val(newMsg);
    }, 800);
});

$(document).on("submit", "form", function (e) {
    var button = enviar;
    button.attr('disabled', 'disabled');
    button.html('Aguarde ...');

    setTimeout(function () {
        button.removeAttr('disabled');
        button.html('Enviar <i class="far fa-paper-plane"></i>');
    }, 9000);
});



