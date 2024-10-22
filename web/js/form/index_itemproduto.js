var btnProcessoCompra = $(".gerarProcessoCompra"),
    btnExcluirEmMassa = $(".deleteEmMassa"),
    btnCancelarEmMassa = $(".cancelarEmMassa"),
    btnCancelarEmMassaComprador = $("#btn-cancelar-item-comprador");

$(".kv-row-checkbox").on('click', function () {
    getIds();
});

$(".select-on-check-all").on('click', function () {
    setTimeout(function(){
        getIds();
    }, 600);
});

btnExcluirEmMassa.click(function () {
    setTimeout(function () {
        window.location.reload();
    }, 2000);
});

$("#btn-selecionar-itens-comprador").on('click', function () {
    var selecaoMassa = true;
    getIds(selecaoMassa);
});


function getIds(selecaoMassa = false) {
    var classesProduto = $('.classe-produto-comprador');
    var id = [];

    if (selecaoMassa) {
        $('input[type=checkbox]').prop('checked', false);
        $('.kv-row-checkbox').each(function () {
            id.push($(this).val());
        });
    } else {
        $('.kv-row-checkbox').each(function () {
            if ($(this).is(':checked')) {
                id.push($(this).val());
            }
        })
        $("input[name='IdsSelecionados']").val(id);
    }

    if (id.length === 0 && !selecaoMassa){
        $("#rubricaEmMassa").hide('slow');
        $("#itemEmMassa").hide('slow');
        btnProcessoCompra.hide('slow');
        btnExcluirEmMassa.hide('slow');
        btnCancelarEmMassa.hide('slow');
        btnCancelarEmMassaComprador.hide('slow');
        $("#dropdownMenuButton").hide('slow');
    } else {
        if (!selecaoMassa) {
            //Verifica se o item esta na situacao em processo de compra
            $.ajax({
                url: '/item-compra/get-situacao/',
                data: {
                    id: id,
                    retornaIds: selecaoMassa
                },
                async: false,
                success: function (resp) {
                    if (resp === false) {
                        btnProcessoCompra.hide('slow');
                    } else {
                        btnProcessoCompra.show('slow');
                        btnProcessoCompra.attr('target', '_blank');
                        url = "/processo-compra/create?idsItensCompra=" + id;
                        btnProcessoCompra.attr('href', url);
                    }
                }
            });
        } else {
            $.ajax({
                url: '/item-compra/get-situacao/',
                data: {
                    id: id,
                    retornaIds: selecaoMassa
                },
                async: false,
                success: function (resp) {
                    if (resp) {
                        var idUrl = [];
                        for (var i = 0; i < resp.length; i++) {
                            classesProduto.each(function () {
                                var idItem = $(this).closest('tr').find('.kv-row-checkbox').val();
                                if (idItem === resp[i]) {
                                    $(this).closest('tr').find('.kv-row-checkbox').prop("checked", true);
                                    $(this).closest('tr').addClass('table-danger');
                                    idUrl.push(idItem);
                                }
                            });
                        }
                        btnProcessoCompra.show('slow');
                        btnProcessoCompra.attr('target', '_blank');
                        url = "/processo-compra/create?idsItensCompra=" + idUrl;
                        btnProcessoCompra.attr('href', url);
                    } else {
                        btnProcessoCompra.hide('slow');
                    }
                }
            });
        }

        $.ajax({
            url: '/item-compra/get-item-aprovado/',
            data: {
                id: id
            },
            async: false,
            success: function (resp) {
                if (resp === true) {
                    $("#rubricaEmMassa").hide('slow');
                    $("#itemEmMassa").show('slow');
                } else {
                    $("#rubricaEmMassa").show('slow');
                    $("#itemEmMassa").hide('slow');
                }
            }
        });

        $("#dropdownMenuButton").show('slow');

        btnExcluirEmMassa.show('slow');
        let urlExcluir = "/item-compra/delete-em-massa?id=" + id;
        btnExcluirEmMassa.attr('href', urlExcluir);

        btnCancelarEmMassa.show('slow');
        let urlCancelar = "/item-compra/cancelar-item?idItem=" + id;
        btnCancelarEmMassa.attr('href', urlCancelar);

        $.ajax({
            url: '/item-compra/get-verifica-permissao-cancelar/',
            data: {
                id: id
            },
            async: false,
            success: function (resp) {
                if (resp === true) {
                    btnCancelarEmMassaComprador.show('slow');
                    let urlCancelar = "/item-compra/cancelar-item-comprador?idItem=" + id;
                    btnCancelarEmMassaComprador.val(urlCancelar);
                } else {
                    btnCancelarEmMassaComprador.hide('slow');
                }
            }
        });

    }
}

$(document).ready(function () {
    $("#rubricaEmMassa").hide();
    $("#itemEmMassa").hide();
    btnProcessoCompra.hide();
    btnExcluirEmMassa.hide();
    btnCancelarEmMassa.hide();
    btnCancelarEmMassaComprador.hide();
    $("#dropdownMenuButton").hide();
});

$("a[id='cancelarItem']").click(function () {
   window.location.reload();
});

$("#gerarProcessoCompra").on('click', function(e){
    
    var isEnderecoPreCadastro = String($(this).attr('isenderecoprecadastro')).replace(/\D/g, '');

    var id = [];
    $('.kv-row-checkbox').each(function () {
        if($(this).is(':checked')) {
            id.push($(this).val());
        }
    });

    $.ajax({
        url: '/item-compra/get-verifica-tipo-entrega/',
        data: {
            id: id
        },
        async: false,
        success: function (resp) {
            if (resp == true) {
                try{
                    if(isEnderecoPreCadastro.length === 0)
                        throw new Error('O endereço de entrega não foi encontrado.');

                    if(parseInt(isEnderecoPreCadastro) === 1)
                        throw new Error("O endereço de entrega é um pré-cadastro, comunique ao gestor.");

                    if(parseInt(isEnderecoPreCadastro) !== 0)
                        throw new Error("O endereço de entrega está com erro.");

                } catch (err) {
                    e.preventDefault();
                    toastr.error(err.message)
                }
            }
        }
    });
});

$(document).ready($(function () {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
    verificaClasseComprador();
}));

function verificaClasseComprador() {
    var classesProduto = $('.classe-produto-comprador');
    classesProduto.each(function () {
        $(this).closest('tr').addClass('table-warning');
    });
}

//botao onde seleciona todos os itens do comprador automaticamente e seta na url de novo processo de compra
$("#btn-informar-produto-importado").click(function () {
    var id = [];

    $('.kv-row-checkbox').each(function () {
        if($(this).is(':checked')) {
            id.push($(this).val());
        }
    });

    $.ajax({
        url: '/item-compra/produto-importado',
        data: {
            ids: id
        },
        async: false,
        success: function (resp) {
            if (resp) {
                toastr.success('Aletração relaizada com sucesso!');
                window.location.reload();
            } else {
                toastr.error('Erro ao alterar o item.');
            }
        }
    });
});

$(".btn-informar-produto-importado").click(function () {
    console.log('sdfsdfooooooooooo');
    window.location.reload();
});

$(function() {
    $('#inclui-item-btn').on('click', function(e) {
            e.preventDefault();
            $('#msgError').show('slow');
    });
});