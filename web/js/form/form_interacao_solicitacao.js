$(document).ready(function() {
    var avisarEmail = $("#interacaosolicitacao-avisaremail");
    var restringeSetorAtendente = $("#interacaosolicitacao-restringe_setor_atendente");
    var disponivelExterno = $("#interacaosolicitacao-disponivelexterno");
    restringeSetorAtendente.change(function() {
        if ($(this).prop('checked')) {
            disponivelExterno.prop('checked', false);
            avisarEmail.prop('checked', false);
            avisarEmail.prop('disabled', true);
        } else {
            avisarEmail.prop('disabled', false);
        }
    });

    disponivelExterno.change(function() {
        if ($(this).prop('checked')) {
            restringeSetorAtendente.prop('checked', false);
            avisarEmail.prop('disabled', false);
        }
    });

    avisarEmail.change(function() {
        if (restringeSetorAtendente.prop('checked')) {
            avisarEmail.prop('checked', false);
        }
    });
});