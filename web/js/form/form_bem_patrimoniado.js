var checkboxCompraDireta = $("input[name='BemPatrimoniado[compra_direta]']"),
    checkboxVariosPedidos = $("input[name='BemPatrimoniado[varios_pedidos]']"),
    checkboxLegado = $("input[name='BemPatrimoniado[legado]']"),
    divAf = $('#form-af'),
    divDadosLegado = $('#div-dados-patrimonio-legado'),
    divDadosPedido = $('#div-dados-pedido'),
    divDadosProjeto = $('#div-dados-projeto'),
    divDtEmissao = $('#documentofiscal-dtemissao'),
    divLocalizacaoId = $('#div-localizacao-id'),
    divOutrosPedidos = $('#div-outros-pedidos'),
    divPedidoCompra = $('#form-pedido-compra'),
    divProjeto = $('#info-projeto'),
    fldAf = $('#fld-afsearch'),
    fldItemAf = $("select[name='BemPatrimoniado[item_af_id]']"),
    //fldLocalizacao = $("select[name='BemPatrimoniado[localizacao_id]']"),
    fldPatrimonioSic = $("input[name='BemPatrimoniado[patrimonio_sic]']"),
    fldPedido = $("select[name='BemPatrimoniado[pedido_id]']"),
    fldProjetoSic = $("input[name='BemPatrimoniado[projeto_sic]']"),
    fldDocumentoFiscal = $("select[name='BemPatrimoniado[documentofiscal_id]']"),
    fldEmissaoDocumentoFiscal = $("input[name='BemPatrimoniado[documentofiscal_dataemissao]']"),
    fldNome = $("input[name='BemPatrimoniado[nome]']"),
    fldOutrosPedidos = $("input[name='BemPatrimoniado[outros_pedidos]']"),
    formBemPatrimoniado = $('.bem-patrimoniado-form'),
    opcaoMultiplicar = $('.m-nav__item:has(a:contains("Copiar cadastro de Bem patrimoniado"))');

function showDadosProjeto(pedidoId) {
    if (pedidoId !== '') {
        $.ajax({
            url: '/bem-patrimoniado/dados-projeto/',
            data: {
                pedidoId: pedidoId,
            },
            async: false,
            success: function (resp) {
                if (resp) {
                    divProjeto.html(resp);
                    divDadosProjeto.show('slow');
                }
            }
        });
    }
}

function showDadosDocumento(documentofiscalId) {
    if (documentofiscalId !== '') {
        $.ajax({
            url: '/bem-patrimoniado/get-documento-fiscal/',
            data: {
                q: documentofiscalId,
            },
            async: false,
            success: function (resp) {
                if (resp) {
                    var data = new Date(resp.dtemissao);
                    var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
                    var dataFormatada = data.toLocaleDateString('pt-BR', options);
                    divDtEmissao.html("<em style='color: gray;'>Data de emissão: " + dataFormatada + "</em>");
                }
            }
        });
    }
}

function removerAnexoBemPatrimoniado(anexo_id, bempatrimoniado_id)
{
    var id_anexo = String(anexo_id).replace(/\D/g, '');
    var id_bempatrimoniado = String(bempatrimoniado_id).replace(/\D/g, '');

    if(!(!!id_anexo) || !(!!id_bempatrimoniado)) {
        toastr.error('Parâmetros [id_anexo] ou/e [id_bempatrimoniado] inválidos.');
        return false;
    }

    krajeeDialog.confirm("Você tem certeza que deseja remover o anexo?", function (result) {
        if (result) {
            var _csrf = String($('meta[name=csrf-token]').attr('content'));
            if(_csrf.length === 0) {
                toastr.error('Erro CSRF vazio, atualize a página.');
                return false;
            }
            var url = '/bem-patrimoniado/deletar-anexo'
            var dados = {
                method: 'post',
                dataType: 'json',
                data: {_csrf: _csrf, anexo_id: id_anexo, bempatrimoniado_id: id_bempatrimoniado}
            }
            $.ajax(url, dados)
                .done((response) => {

                    if(!response.hasOwnProperty('data'))
                        toastr.error('Erro na resposta do servidor, atributo [data]');

                    if(response.data.success){
                        $('#box-arquuivo-anexo-'+id_anexo).hide();
                        toastr.success(response.data.msg);
                    }else{
                        toastr.error(response.data.msg);
                    }
                })
                .fail(() => toastr.error('Erro de comunicação com o servidor.'));
        }
    });
}


fldItemAf.on('select2:select', function (e) {
    var select = e.params.data;

    console.log(select.id);

    $.ajax({
        url: '/item-af/get-produto/',
        data: {
            id: select.id,
        },
        async: false,
        success: function (resp) {
            if (resp) {
                fldNome.val(resp.nome);
            }
        }
    });
});

fldPedido.on('change', function () {
    showDadosProjeto(fldPedido.val());
});

fldDocumentoFiscal.on('change', function () {
    showDadosDocumento(fldDocumentoFiscal.val());
});

checkboxCompraDireta.on('change', function () {
    if (checkboxCompraDireta.is(':checked')) {
        divAf.hide('slow');
        fldAf.val('').trigger('change');
        fldItemAf.empty();
    } else {
        divAf.show('slow');
    }
});

checkboxVariosPedidos.on('change', function () {
    if (checkboxVariosPedidos.is(':checked')) {
        divOutrosPedidos.show('slow');
    } else {
        divOutrosPedidos.hide('slow');
    }
});

opcaoMultiplicar.on('click', function () {
    $('#grid-search').modal('show'); // Mostrar o modal
});

window.onload = function () {
    showDadosProjeto(fldPedido.val());
    showDadosDocumento(fldDocumentoFiscal.val());
};

checkboxLegado.on('change', function () {
    if (checkboxLegado.is(':checked')) {
        divLocalizacaoId.hide();
        divPedidoCompra.hide('slow');
        divDadosLegado.show();
    } else {
        fldProjetoSic.val(null);
        fldPatrimonioSic.val(null);
        divLocalizacaoId.show();
        divPedidoCompra.show('slow');
        divDadosLegado.hide();
    }
});