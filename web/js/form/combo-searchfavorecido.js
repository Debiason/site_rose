//elements
var comboFavorecido = $("select[id='fld-favorecido']"),
    btnUltimosPedidos = $(".btnUltimosPedidos"),
    comboAcordo = $("select[id='fld-acordo']"),
    msgPreCadastro = $("#msgPreCadastro"),
    btnPreCadastro = $("#btnPreCadastro"),
    tableName = $("#tableName");


//triggers
comboFavorecido.change(setButton);
comboFavorecido.change(setUrl);
comboAcordo.change(function () {
    setFavorecidoNull();
    loadMsgFavorecido();
    setUrlPreCadastro();
});
$(document).ready(function () {
    loadMsgFavorecido();
});
comboFavorecido.change(setMensagemPreCadastro);
comboFavorecido.ready(setMensagemPreCadastro);

//functions
function setButton() {
    let favorecidoId = comboFavorecido.val();

    if (btnUltimosPedidos.val()) {
        let btnValue = btnUltimosPedidos.val();
        let arrayValue = btnValue.split("=");
        let valueFinal = arrayValue[0]+'='+arrayValue[1]+'='+arrayValue[2]+'='+favorecidoId;
        btnUltimosPedidos.val(valueFinal);
    }
}

//Atualiza url do botoao referente ao favorecido, setando o id do favorecido selecionado
function setUrl() {
    let favorecidoId = comboFavorecido.val();
    let btnEditarFavorecido = $("a[id='btnEditarFavorecido']");
    btnEditarFavorecido.attr('href', '/mudanca-pessoa/create?pessoa_id='+favorecidoId);
}

function setUrlPreCadastro() {
    let projeto_id = comboAcordo.val();
    let tableNameVal = tableName.val();
    let url = '/pessoa/pre-cadastro?tableName=' + tableNameVal + '&projeto_id=' + projeto_id;
    btnPreCadastro.attr('href', url);
}

function setFavorecidoNull() {
    comboFavorecido.val(null);
    comboFavorecido.text(' ');
    setButton();
}

//verifica se o acordo para não membros da equipe executora, para exibicao de msg
function loadMsgFavorecido() {
    let acordoId = comboAcordo.val();

    if (acordoId != null){
        $.ajax({
            url: '/acordo/get-paga-somente-membros/',
            data: {
                id: acordoId
            },
            async: false,
            success: function (resp) {
                if (resp['pagaSomenteMembro']){
                    $('.msgFavorecidoMembro').html("<small>O projeto selecionado" +
                        " executa pagamentos somente para membros da equipe executora.</small><br/><br/>");

                    $('#comboFavorecidoNaoMembro').hide();
                    $('#fld-favorecido').attr('disabled', 'disabled');
                    $('#fld-favorecido').prop("disabled", true);

                    $('#fld-favorecidoMembro').attr('disabled', false);
                    $('#comboFavorecidoMembro').show();

                }else {
                    $('.msgFavorecidoMembro').html("");
                    $('#fld-favorecidoMembro').prop("disabled", true);

                    $('#comboFavorecidoMembro').hide();
                    setTimeout(function () {
                        $('#fld-favorecidoMembro').attr('disabled', 'disabled');
                    }, 1500);

                    $('#fld-favorecido').attr('disabled', false);
                    $('#comboFavorecidoNaoMembro').show();
                }
            }
        });
    }

}

//Informa que o favorecido selecionado ainda esta em pre cadastro
function setMensagemPreCadastro() {
    let favorecidoId = comboFavorecido.val();
    $.ajax({
        url: '/pessoa/getprecadastro/',
        data: {
            id: favorecidoId
        },
        async: false,
        success: function (resp) {
            if (resp == true) {
                msgPreCadastro.show("slow");
            }else{
                msgPreCadastro.hide("slow");
            }
        }
    });
}