var fldChaveAcesso = $("input[name='BemPatrimoniado[chave_acesso]']");
var divItensNotaFiscal = $('#radiolist-itens-nota-fiscal');
var fldNcmItem = $("#ncm_item_hidden");
var submitButton = $("#submitButton");

$(document).ready(function () {
    var modal = document.getElementById("modal-principal");
    if (modal) {
        modal.id = "modal-view_export";
    }

    if (fldChaveAcesso.val().length >= 40) {
        getItensDocumento();
    }
});

$(document).on('submit', '#bem-patrimoniado-export-form', function (e) {
    e.preventDefault();
    var form = $(this);
    fnbPageBlock();

    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: form.serialize(),
        success: function (response) {
            console.log(response);
            fnbPageUnblock();
            if (response.success == false){
                toastr.error(response.message);
            } else {
                toastr.success('Pedido de emissão gerado com sucesso!');
                setTimeout(function() {
                    $('#modal-view_export').modal('hide');
                }, 300);
            }
        },
    });

    return false;
});

fldChaveAcesso.on('change keyup', function () {
    if ($(this).val().length > 40) {
        divItensNotaFiscal.empty();
        getItensDocumento();
    } else {
        divItensNotaFiscal.empty();
        submitButton.prop('disabled', true);
    }
});

function getItensDocumento() {
    var chaveacesso = fldChaveAcesso.val();
    var tipoNota = chaveacesso.substring(20, 22);
    chaveacesso = chaveacesso.replace(/[^\d]+/g, '');
    if (tipoNota == 55) {
        chaveacesso = 'NFe' + chaveacesso;
    } else if (tipoNota == 57 || tipoNota == 67) {
        chaveacesso = 'CTe' + chaveacesso;
    }
    if (chaveacesso.length >= 47) {
        fldChaveAcesso.val(chaveacesso);
    }

    $.ajax({
        url: '/documento-fiscal/get-info-sync-ajax?chaveacesso=' + chaveacesso,
        async: false,
        success: function (resp) {
            if (resp.itens) {
                var html = renderItensNota(resp.itens)
                divItensNotaFiscal.html(html);
            } else {
                divItensNotaFiscal.html('<p class="text-danger">Erro: Não foi possível validar a chave de acesso.</p>');
            }
        },
        error: function () {
            divItensNotaFiscal.html('<p class="text-danger">Erro: Não foi possível validar a chave de acesso.</p>');
        }
    })
}

function renderItensNota(itens) {
    var html = 'Selecione o item referente no documento fiscal:<br>' +
        '<div class="itens-nota rounded" style="background-color: #f2f2f2; padding: 10px;">';
    // Cabeçalho da tabela
    html += '<div class="itens-nota-header">';
    html += '<table class="table table-bordered" style="width: 100%;">'; // Tabela ocupa toda a largura da div
    html += '<thead><tr>';
    html += '<th style="width: 10%; ">Selecionar</th>';
    html += '<th style="width: 50%; ">Descrição</th>';
    html += '<th style="width: 10%; ">Quantidade</th>';
    html += '<th style="width: 15%; ">Valor Total</th>';
    html += '<th style="width: 15%; ">Código NCM</th>';
    html += '<th style="width: 5px; "></th>';
    html += '</tr></thead>';
    html += '</table>';
    html += '</div>';
    // Corpo da tabela com barra de rolagem
    html += '<div class="itens-nota-body rounded" style="height: 200px; overflow-y: auto;">';
    html += '<table class="table table-bordered" style="width: 100%;">';
    html += '<tbody>';
    itens.forEach(function (item, index) {
        var descricaoSemAspas = item.descricao[0].replace(/['"]/g, "").replace(/[\n\r]/g, "");
        var itemInfoJson = JSON.stringify(
            {
                codigo_item_nota: (index + 1),
                descricao: descricaoSemAspas,
                quantidade: parseFloat(item.quantidade[0]).toFixed(2),
                valortotal: item.valortotal[0],
                codigo_ncm_nfe: item.codigo_ncm_nfe[0],
            }
        );
        html += '<tr>';
        html += '<td style="width: 10%;"><div class="form-check">';
        html += '<input class="form-check-input" type="radio" name="itemRadio" id="item' + index +
            '" value=\'' + itemInfoJson + '\' onclick="carregaDadosFormulario(' + index + ')">';
        html += '<label class="form-check-label" for="item' + index + '"></label>';
        html += '</div></td>';
        html += '<td style="width: 50%;">' + (index + 1) + ' - ' + descricaoSemAspas + '</td>';
        html += '<td style="width: 10%;">'
            + parseFloat(item.quantidade[0]).toFixed(2) + '</td>';
        html += '<td style="width: 15%;">R$ ' + item.valortotal[0] + '</td>';
        html += '<td style="width: 15%;">' + item.codigo_ncm_nfe[0] + '</td>';
        html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    html += '</div>'; // Fim do corpo com barra de rolagem
    html += '</div>'; // Fim da div principal .itens-nota
    return html;
}

function carregaDadosFormulario(tempId) {
    // o valor da radiolist selecionada é adicionado à um campo hiddenInput
    var dadosItemSelecionado = JSON.parse(document.querySelector('input[name="itemRadio"]:checked').value);
    fldNcmItem.val(dadosItemSelecionado.codigo_ncm_nfe);
    submitButton.prop('disabled', false);
}