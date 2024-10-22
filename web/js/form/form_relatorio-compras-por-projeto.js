var
    centroCusto = $("#fld-centrocusto"),
    acordo = $("#fld-acordo"),
    btnAcordo = $("input[id='opc-projeto']"),
    btnCentroCusto = $("input[id='opc-centro-custo']"),
    fldSelecionado = $("input[name='RelatorioForm[selecionado]']"),
    fldCentroCustoDiv = $("#comboCentroCustos"),
    fldAcordoDiv = $("#comboAcordos"),
    refazerCompra = $("#refazerCompra");


$(document).ready(function () {
    fldCentroCustoDiv.hide();
    fldSelecionado.hide();
    console.log(fldSelecionado);
    $("#valor_selecionado").val(acordo.val());
    if (btnCentroCusto.is(':checked')){
        fldAcordoDiv.hide();
        fldCentroCustoDiv.show('slow');
        fldSelecionado.val('centroCusto');
        $("#valor_selecionado").val(centroCusto.val());
    }
});

btnAcordo.change(function () {
    fldAcordoDiv.show('slow');
    fldCentroCustoDiv.hide();
    fldSelecionado.val('acordo');
});

btnCentroCusto.change(function () {
    fldAcordoDiv.hide();
    fldCentroCustoDiv.show('slow');
    fldSelecionado.val('centroCusto')
});

centroCusto.on('change', function () {
    var ccVal = $(this).val();
    $("#valor_selecionado").val(ccVal);
});

acordo.on('change', function () {
    var acordoVal = $(this).val();
    $("#valor_selecionado").val(acordoVal);
});

function gerarPedido() {
    setTimeout(function () {
        var selectedCheckboxes = $('.kv-row-checkbox:checked');

        if (selectedCheckboxes.length > 0) {
            var ids = [];
            selectedCheckboxes.each(function () {
                var pedido = $(this).closest('tr').find('td[data-col-seq="0"]').attr('id');
                if (ids.indexOf(pedido) === -1) {
                    ids.push(pedido);
                }
            });

            var idsString = ids.join(',');

            refazerCompra.attr('target', '_blank');
            var url = "/compra/duplicar-pedido?ids=" + idsString;
            refazerCompra.attr('href', url);

            refazerCompra.show('slow');

            setTimeout(function () {
                refazerCompra.on('click', function () {
                    $(selectedCheckboxes).each(function () {
                        $(this).prop('checked', false);
                        $(this).closest('tr').removeClass('table-danger');
                    });
                    $(this).hide('slow');
                });
            }, 500);

        } else {
            refazerCompra.hide('slow');
        }
    }, 300);
}

function toggleCheckboxMesmaCompra(checkbox) {

    var isChecked = checkbox.is(':checked');
    var pedidoId = checkbox.closest('tr').find('td[data-col-seq="0"]').attr('id');

    $('tr').each(function () {
        var idAtual = $(this).find('td[data-col-seq="0"]').attr('id');

        if (pedidoId === idAtual) {
            $(this).toggleClass('table-danger');
            $(this).find('.kv-row-select input').prop('checked', isChecked);
        }
    });
}

$(document).ready(function () {

    $(".select-on-check-all").hide();
    gerarPedido();

    $(".kv-row-checkbox").on('change', function () {
        gerarPedido();
        toggleCheckboxMesmaCompra($(this));
    });

    $(".popover-situacao").popover({
        trigger: "hover",
        container: "body",
        html: true,
        placement: "top",
        template: '<div class="popover" style="max-width: 100%;" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    });
});