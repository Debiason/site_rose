var fldCodEstrutura = $("#fld-cod-estrutura");
var fldCodOrdem = $("#fld-cod-ordem");
var fldCodFilial = $("#fld-cod-filial");

var tableMateriaPrima = $("#table-materiaprima");
var fldQuantidadePlanejada = $("#fld-qtd-planejada");
var fldQuantidadeApontada = $("#fld-qtd-apontada");
var fldIdProduto = $("#IDPRD");

var fldLoteMP = $("#fld-lote-materia-prima");

var fldCorrecaoApontament = $("#fld-correcao-apontamento");

fldCorrecaoApontament.change(function () {
    correcaoApontamento();
});

$("body").delegate(".fld-qtd-apontada", "keyup", function () {
    formataNumero($(this));
});

$("body").delegate(".fld-qtd-perda", "keyup", function () {
    formataNumero($(this));
});

$("body").delegate(".fld-nome-materiaprima", "change", function () {
    calcularMateriaPrima($(this));
});

function calcularMateriaPrima(comboProduto) {
    var id = comboProduto.val();
    var fldQtdApontada = $(comboProduto).closest("tr").find(".fld-qtd-apontada");
    var fldQtdPerda = $(comboProduto).closest("tr").find(".fld-qtd-perda");
    var fldIdProduto = $(comboProduto).closest("tr").find(".fld-idproduto");
    var fldCustoProduto = $(comboProduto).closest("tr").find(".fld-custo-produto");
    var fldMateriaPrima = $(comboProduto).closest("tr").find(".fld-tipo-materiaprima");

    var codEstrutura = fldCodEstrutura.val();
    var codOrdem = fldCodOrdem.val();
    var codFilial = fldCodFilial.val();

    fldIdProduto.val(id);
    fldQtdPerda.val('');
    fldCustoProduto.val(0)
    fldMateriaPrima.val('materiaprima');

    $(document).tooltip({ selector: '[data-toggle="tooltip"]' });
    $(document).popover({ selector: '[data-toggle="popover"]' });

    $.ajax({
        url: '/producao/apontamento/get-quantidade-materia-prima/',
        data: {
            CODORDEM: codOrdem,
            CODESTRUTURA: codEstrutura,
            CODFILIAL: codFilial,
            IDPRODUTO: id
        },
        async: false,
        success: function (resp) {
            if (resp) {
                fldQtdApontada.val(resp);
            }
        }
    });
}

$("body").delegate(".fld-qtd-apontada", "mouseout", function () {
    custoMateriaPrima($(this));
    loteMP($(this));
});

$(document).ready(function () {
    $(function () {
        $('[data-toggle="popover"]').popover({html: true});
    })

    $(".btn-reprocessamento").each(
        function () {
            loteMP($(this));
        }
    );
});

function loteMP(comboProduto) {
    var idProduto = $(comboProduto).closest("tr").find(".fld-idproduto").val();
    var codEstrutura = fldCodEstrutura.val();
    var codOrdem = fldCodOrdem.val();
    var codFilial = fldCodFilial.val();

    if (codFilial == 4) {
        $.ajax({
            url: '/producao/estrutura/get-tipo-estrutura/',
            data: {
                idProduto: idProduto,
                codFilial: codFilial
            },
            async: false,
            success: function (resp) {
                if (resp) {
                    var codEstruturaFormatado = codEstrutura.replace(/\s/g, "-");
                    var qtdApontada = $(comboProduto).closest("tr").find(".fld-qtd-apontada").val();
                    if (qtdApontada > 0) {
                        $(comboProduto).closest("tr").find(".btn-reprocessamento").removeClass("btn-default");
                        $(comboProduto).closest("tr").find(".btn-reprocessamento").addClass("btn-success");
                        $(comboProduto).closest("tr").find(".btn-reprocessamento").attr("value", "/producao/reprocessamento/produto-lote?" +
                            "IDPRODUTO=" + idProduto +
                            "&CODORDEM=" + codOrdem +
                            "&CODFILIAL=" + codFilial +
                            "&QTDAPONTADA=" + qtdApontada +
                            "&CODESTRUTURA=" + codEstruturaFormatado
                        );
                        $(comboProduto).closest("tr").find(".fld-qtd-perda").attr('readonly', true);
                        $(comboProduto).closest("tr").find(".fld-qtd-perda").css({backgroundColor: "#F4F5F8"});
                    } else {
                        $(comboProduto).closest("tr").find(".btn-reprocessamento").addClass("btn-warning");
                    }
                } else {
                    $(comboProduto).closest("tr").find(".btn-reprocessamento").addClass("btn-default");
                }
            }
        });
    } else {
        $(comboProduto).closest("tr").find(".btn-reprocessamento").hide();
    }
}

function custoMateriaPrima(comboProduto) {
    var idProduto = $(comboProduto).closest("tr").find(".fld-idproduto").val();
    var qtdApontada = comboProduto.val();
    var codEstrutura = fldCodEstrutura.val();

    $.ajax({
        url: '/producao/apontamento/custo-materia-prima/',
        data: {
            codEstrutura: codEstrutura,
            quantidade: qtdApontada,
            idProduto: idProduto
        },
        async: false,
        success: function (resp) {
            if (resp) {
                var fldCustoProduto = $(comboProduto).closest("tr").find(".fld-custo-produto");
                fldCustoProduto.val(resp);
            }
        }
    });
}

//--------------------------------------Subproduto-----------------------------------------------------------------//

$("body").delegate(".fld-nome-subproduto", "change", function () {
    listaSubproduto($(this));
});

$("body").delegate(".fld-qtd-apontada-subproduto", "keyup", function () {
    formataNumero($(this))
});

function listaSubproduto(comboProduto) {
    var id = comboProduto.val();
    var fldQtdApontadaSubproduto = $(comboProduto).closest("tr").find(".fld-qtd-apontada-subproduto");
    var fldIdSubproduto = $(comboProduto).closest("tr").find(".fld-id-subproduto");
    var fldCustoSubproduto = $(comboProduto).closest("tr").find(".fld-custo-subproduto");
    var fldSubproduto = $(comboProduto).closest("tr").find(".fld-tipo-subproduto");

    fldIdSubproduto.val(id);
    fldQtdApontadaSubproduto.val(0);
    fldCustoSubproduto.val(0)
    fldSubproduto.val('subproduto');
}

$("body").delegate(".fld-qtd-apontada-subproduto", "change", function () {
    // custoSubproduto($(this));
});

function custoSubproduto(comboProduto) {
    var idSubproduto = $(comboProduto).closest("tr").find(".fld-id-subproduto").val();
    var qtdApontada = comboProduto.val();
    var codEstrutura = fldCodEstrutura.val();

    $.ajax({
        url: '/producao/apontamento/custo-subproduto/',
        data: {
            codEstrutura: codEstrutura,
            quantidade: qtdApontada,
            idSubproduto: idSubproduto
        },
        async: false,
        success: function (resp) {
            if (resp) {
                var fldCustoSubproduto = $(comboProduto).closest("tr").find(".fld-custo-subproduto");
                fldCustoSubproduto.val(resp);
            }
        }
    });
}

//--------------------------------------Correção de apontamento-----------------------------------------------------------------//
function correcaoApontamento() {
    let checkbox = $('#fld-correcao-apontamento');

    if (checkbox.is(":checked")) {
        $('#salvar-apontamento').prop("disabled", false);
        $('#mensagem-apontamento').hide();
    } else {
        $('#mensagem-apontamento').show();
        $('#salvar-apontamento').prop("disabled", true);
    }
}

// ------------------------------------Formata número ---------------------------------------------------- //
fldQuantidadeApontada.keyup(function () {
    formataNumero($(this))
});


function formataNumero(combo) {
    combo.each(function () {
        var valor = combo.val().replace(',', '.');
        var quantidade = quantidadePontoNumero(valor)

        if (quantidade > 1) {
            valor = valor.replace('.', '');
        }

        const parts = valor.split('.')

        if (parts.length > 1 && parts[1].length <= 4) {
            var tamanho = parts[0].length + 5;
            $(this).val(valor)
            combo.attr('maxlength', tamanho);
        } else {
            combo.removeAttr('maxlength');
        }
    });
}

function quantidadePontoNumero(valor) {
    var count = 0;
    var pos = valor.indexOf(".");

    while (pos != -1) {
        count++;
        pos = valor.indexOf(".", pos + 1);
    }

    return count;
}

$('#modal-principal').on('hidden.bs.modal', function () {
    location.reload();
})


