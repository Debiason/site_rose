var comboEqExeNome = $("select[class='nomeEquipe form-control']"),
    comboNFNome = $("select[class='nomePedido form-control']");
var salvarPlanilha = $("button[class='btn btn-success salvarPlanilha']");

//triggers
comboEqExeNome.change(carregaValoresEqExec);
comboNFNome.change(carregaValoresNF);


//functions
function carregaValoresEqExec(){

    var selectEquipeExecutora = $(this);
    var idEqExec = selectEquipeExecutora.val();
    var indiceCampo = selectEquipeExecutora[0].name.substring(38, 39);

    $.ajax({
        url: '/equipe-executora/getdados/',
        data: {
            id: idEqExec
        },
        async: false,
        success: function (resp) {

            vinculoIns = resp.vinculoInst;
            funEquipe = resp.funEquipe;

            $("Input[name='PlanilhaContrato[itemEquipeExecutora]["+indiceCampo+"][funcaoequipe_id]']").val(funEquipe);
            $("Input[name='PlanilhaContrato[itemEquipeExecutora]["+indiceCampo+"][vinculoinstitucional_id]']").val(vinculoIns);
        }
    });

}

function carregaValoresNF(){

    var selectNF = $(this);
    var idPedido = selectNF.val();
    var indiceCampo = selectNF[0].name.substring(35, 36);

    $.ajax({
        url: '/emissao-nota-fiscal/getdados/',
        data: {
            id: idPedido
        },
        async: false,
        success: function (resp) {

            contrNome = resp.contrNome;
            valor = resp.valor;

            $("Input[name='PlanilhaContrato[itemNotasFiscais]["+indiceCampo+"][contratante_id]']").val(contrNome);
            $("Input[name='PlanilhaContrato[itemNotasFiscais]["+indiceCampo+"][valor]']").val(valor);


        }
    });

}

$("#fld-projeto").on('change', function() {

    var valorSelecionado = $(this).val();
    var idProjetoAtual = $("#idProjetoAtual").val();

    $(".planilha-contrato-form-modal").empty();

    setTimeout(function () {

        var optionCount = $("#fld-planilha").find('option').length;

        if (optionCount == 1) {
            $("#alerta-rubricas").show();
            $("#alerta-rubricas").html('');
            $("#alerta-rubricas").append('<li>' + 'O projeto selecionado não possui uma planilha para ser importada.' + '<br>');
        } else {
            $("#div-planilha").show('slow');
            $("#alerta-rubricas").hide();
            $("#alerta-rubricas").html('');
        }

    }, 400);

    $("#fld-planilha").on('select2:select', function () {

        var idPlanilha = $(this).val();

        $.ajax({
            type: 'POST',
            url: '/planilha-contrato/verifica-compatibilidade-rubricas',
            data: {
                idProjetoAtual: idProjetoAtual,
                idPlanilha: idPlanilha,
            },
            success: function (data) {
                var alerta = JSON.parse(data);

                if (alerta.length > 0) {
                    $("#alerta-rubricas").show();
                    $("#alerta-rubricas").html('');

                    for (var i = 0; i < alerta.length; i++) {
                        $("#alerta-rubricas").append('<li>' + alerta[i] + '<br>');
                    }
                } else {
                    $("#alerta-rubricas").html('');
                    $("#alerta-rubricas").hide();
                }

                setTimeout(function () {
                    if (alerta.length > 0) {
                        $("button[class='btn btn-success salvarPlanilha']").prop('disabled', true);
                    } else {
                        $("button[class='btn btn-success salvarPlanilha']").prop('disabled', false);
                    }
                }, 1000);
            },
            error: function () {
                $("#alerta-rubricas").html('');
                $("#alerta-rubricas").hide();
            }
        });

        setTimeout(function () {
            $(".planilha-contrato-form-modal").load('/planilha-contrato/create?contrato_id=' + idProjetoAtual
                + '&planilha_copia=' + idPlanilha);
        }, 1000);

    });
});




