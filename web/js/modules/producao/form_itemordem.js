var fldCodestrutura = $("#fld-codestrutura");
var fldQtdPlanejada = $("#fld-qtdplanejada");
var btnQtdPlanejada = $("#btn-qtdplanejada");
var fldCodcoligada = $("input[name='KITEMORDEM[CODCOLIGADA]']");
var fldCodordem = $("input[name='KITEMORDEM[CODORDEM]']");
var fldCodfilial = $("input[name='KITEMORDEM[CODFILIAL]']");

// carrega jquery ao abrir a página
$(document).ready(function () {
    var codEstrutura = fldCodestrutura.val();
    var qtdPlanejada = fldQtdPlanejada.val();
    var codColigada = fldCodcoligada.val();
    var codFilial = fldCodfilial.val();
    var codOrdem = fldCodordem.val();

    $("#exibirCampoQuantidade").hide()
    if (codEstrutura) {
        getInfoEstrutura(codEstrutura);
    }

    if (codEstrutura, qtdPlanejada, codColigada, codFilial, codOrdem) {
        getInfoItem(codEstrutura, qtdPlanejada, codColigada, codFilial, codOrdem);
    }
});

// carrega jquery após selecionar ou digitar
fldCodestrutura.on('change', function () {
    var codEstrutura = fldCodestrutura.val();
    getInfoEstrutura(codEstrutura);
});

// carrega jquery após selecionar ou digitar
btnQtdPlanejada.on('click', function () {
    var codEstrutura = fldCodestrutura.val();
    var qtdPlanejada = fldQtdPlanejada.val();
    var codColigada = fldCodcoligada.val();
    var codFilial = fldCodfilial.val();
    var codOrdem = fldCodordem.val();
    getInfoItem(codEstrutura, qtdPlanejada, codColigada, codFilial, codOrdem);
});

function getInfoEstrutura(codEstrutura) {
    if (codEstrutura) {
        $("#exibirCampoQuantidade").show()
        $.ajax({
            url: '/producao/estrutura/get-info-estrutura/',
            data: {
                codEstrutura: codEstrutura
            },
            async: false,
            success: function (resp) {
                if (resp) {
                    $("#info-producao-modelo-linha").html(resp)
                } else {
                    $("#info-producao-modelo-linha").hide()
                }
            }
        });
    }
}

function getInfoItem(codEstrutura, qtdPlanejada, codColigada, codFilial, codOrdem) {
    if (qtdPlanejada) {
        $.ajax({
            url: '/producao/item-ordem/get-info-item-ordem/',
            data: {
                codEstrutura: codEstrutura,
                qtdPlanejada: qtdPlanejada,
                codColigada: codColigada,
                codFilial: codFilial,
                codOrdem: codOrdem
            },
            async: false,
            success: function (resp) {
                if (resp) {
                    $("#info-producao-item").html(resp)
                } else {
                    $("#info-producao-item").hide()
                }
            }
        });
    }
}