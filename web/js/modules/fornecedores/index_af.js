$(document).on('click', '.baixasEfetuadas', function() {
    var afId = $(this).closest('tr').data('key')

    $.ajax({
        url: '/fornecedores/af/detalhes-baixa',
        data: {
            af_id: afId
        },
        success: function(data) {
            var htmlAutomatica = '';
            var htmlPortal = '';

            var listaAutomatica = '<ul>';
            var listaPortal = '<ul>';

            data.forEach(function(pedido) {
                var serie = pedido.serie ? 'Série ' + pedido.serie + ', ' : '';
                var nota = pedido.numeronota ? 'Número ' + pedido.numeronota : '';
                var chaveacesso = pedido.chaveacesso ? ', Chave de Acesso ' + pedido.chaveacesso + '.' : '';
                var danfe = pedido.chaveacesso ? ' <a href="https://fornecedor.funarbe.org.br/fornecedores/af/da?chave=' + pedido.chaveacesso + '"' +
                    ' target="_blank">' +
                    'DANFE' +
                    '</a>' : '';

                var itemHtml = '<li>' + serie + nota + chaveacesso + danfe + '</li>';

                if (pedido.gerado_automaticamente == "1") {
                    listaAutomatica += itemHtml;
                } else {
                    listaPortal += itemHtml;
                }
            });

            listaAutomatica += '</ul>';
            listaPortal += '</ul>';


            if (listaAutomatica.length > 10) {
                htmlAutomatica = '<p style="font-weight: bolder">NF cadastrada automaticamente</p>' + listaAutomatica;
            }

            if (listaPortal.length > 10) {
                htmlPortal = '<p style="font-weight: bolder">NF cadastrada via portal</p>' + listaPortal;
            }

            var html = htmlAutomatica + htmlPortal;

            swal({
                html: '<p style="font-weight: bolder; font-size: 1.25rem">As Notas Fiscais relacionadas à Autorização de Fornecimento já foram cadastradas.</p>' + html,
                type: "success",
                width: '60%',
                confirmButtonColor: "#34bfa3",
                focusConfirm: false
            });
        }
    });
});