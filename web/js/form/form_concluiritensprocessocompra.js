var
    dadosRelacionados = $("#dadosRelacionados"),
    comboProcessoCompra = $("select[name='processocomprasearch']");


//triggers
comboProcessoCompra.change(getDados);

$(document).ready(function () {
    dadosRelacionados.hide();
});


function getDados() {


    $("#itensConcluidos").hide();

    var valorProcessoCompraId = comboProcessoCompra.val();

    $.ajax({
        url: '/ferramentas/getdados-processo-compra/',
        data: {
            id: valorProcessoCompraId
        },
        async: false,
        success: function (resp) {

            dadosRelacionados.show();

            if (resp.length == 0){

                retorno = " Não foram encontrados itens para esse processo em que a cotação esteja na situação aprovada.";

            }else{

                retorno = "<strong>Itens do processo: </strong>" + "<br><br>";
                $.each(resp, function (index, element) {

                    retorno +=
                        '<a class="m-badge m-badge-- primary m-badge--wide" title="Decrição : ' + element.descricao + '" data-trigger="hover" data-html="true"' +
                        ' data-container="body" data-toggle="popover" data-placement="top" ' +
                        ' data-content="<label><input name="itemProcessoCheck" >' + ' ' +
                        'Número: ' + (element.numero == null ? '' : element.numero) + ' ' +
                        '- Produto: ' + (element.produtoNome == null ? '' : element.produtoNome) + ' ' +
                        '- Situacção do item: ' + (element.situacaoItem == null ? '' : element.situacaoItem) + ' ' +
                        ' Cotação: ' + (element.cotacaoId == null ? '' : element.cotacaoId) + ' ' +
                        '- Valor da cotação: ' + (element.valorCotacao == null ? '' : element.valorCotacao) + ' ' +
                        '- Situação da cotação:  ' + (element.situacaoCotacao == null ? '' : element.situacaoCotacao) + ' </label>' +
                        '</a></br></br>';
                });
            }

            dadosRelacionados.html(retorno);
        }

    });
}

