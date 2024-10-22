//elements
var comboFavorecido = $("select[id='fld-favorecido']"),
    comboAcordo = $("select[id='fld-acordo']"),
    btnUltimosPedidos = $(".btnUltimosPedidos"),
    msgPreCadastro = $("#msgPreCadastro"),
    btnPreCadastro = $("#btnPreCadastro"),
    tableName = $("#tableName");


//triggers
comboAcordo.change(setUrlPreCadastro);
comboFavorecido.change(setButton);
comboFavorecido.change(setUrl);
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

//Informa que o favorecido selecionado ainda esta em pre cadastro
function setMensagemPreCadastro() {

    let favorecidoId = comboFavorecido.val();

    if (favorecidoId == '' || favorecidoId == null){
        msgPreCadastro.hide("slow");
    } else {
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

}
