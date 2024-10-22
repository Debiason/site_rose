
$(document).ready(function () {
    $("#btnEncaminharParecer").hide();
    $("#btnAprovar").hide();
    $("#btnRecusar").hide();
    $("#btnEnviarParecerAnalise").hide();
    $("#btnSolicitarEmpenho").hide();
    $("#btnSolicitarAlteracaoGestor").hide();
    $("#btnReprovarEmpenho").hide();
    $("#btnAprovarEmpenho").hide();
    $("#btnSolicitarRatificacao").hide();

    id = $("#idCotacao").val();

    $.ajax({
        url: '/cotacao-aguardando-analise/get-situacao/',
        data: {
            id: id,
        },
        async: false,
        success: function (resp) {

            if(resp['situacao']['Cotacao']['botao']['encaminharParaParecer']) {
                $("#btnEncaminharParecer").show();
            }
            if(resp['situacao']['Cotacao']['botao']['aprovar']) {
                $("#btnAprovar").show();
            }
            if(resp['situacao']['Cotacao']['botao']['recusar']) {
                $("#btnRecusar").show();
            }
            if(resp['situacao']['Cotacao']['botao']['solicitarAlteracaoGestor']) {
                $("#btnSolicitarAlteracaoGestor").show();
            }
            if(resp['situacao']['Cotacao']['botao']['solicitarEmpenho']) {
                $("#btnSolicitarEmpenho").show();
            }
            if(resp['situacao']['Cotacao']['botao']['enviarParecerParaAnalise']) {
                $("#btnEnviarParecerAnalise").show();
            }
            if(resp['situacao']['Cotacao']['botao']['aprovarEmpenho']) {
                $("#btnAprovarEmpenho").show();
            }
            if(resp['situacao']['Cotacao']['botao']['reprovarEmpenho']) {
                $("#btnReprovarEmpenho").show();
            }
            if(resp['situacao']['Cotacao']['botao']['solicitarRatificacao']) {
                $("#btnSolicitarRatificacao").show();
            }
        }
    });


});


