/** begin::configuracao_jstree */
var KTTreeview= {
    init:function() {
        $("#kt_tree_2").jstree( {
            'core': {
                'data' : {
                    'url' : function (node) {
                        return "/documento/arvore-documento-centro-custo";
                    },
                },
                'check_callback': true,
                themes: {
                    responsive: !1
                }
            }
            , types: {
                default: {
                    icon: "fa fa-folder kt-font-warning"
                }
                , file: {
                    icon: "fa fa-file  kt-font-warning"
                }
            }
            , plugins:["types"]
        })
    }
};
$(document).ready(function() {
    $('[data-toggle="popover"]').popover()
    KTTreeview.init();
});
/** end::configuracao_jstree */

/** bengin::refresh_tree */
$(".btn-refresh").on('click', function(e){
    e.preventDefault();

    $("#tree_carregados").val('');

    var $treeview = $("#kt_tree_2");
    $treeview.jstree(true).settings.core.data.url = '/documento/arvore-documento-centro-custo';
    $treeview.jstree(true).refresh()
    $treeview.on('refresh.jstree', function () { $treeview.jstree('close_all') });
});
/** end::refresh_tree */

/** begin::busca_arvore */
$("#btn-search-tree").on('click', function(event) {

    event.preventDefault();

    var filter = $("#pesquisa-filter").val();
    var codigo = $("#pesquisa-arvore").val();

    $.ajax({
        url: '/documento/remote-search',
        method: 'post',
        dataType: 'json',
        data: {filter: filter, codigo: codigo}
    }).done(function(response) {

        $("#tree_carregados").val('');

        var $treeview = $("#kt_tree_2");
        $treeview.jstree(true).settings.core.data = response;
        $treeview.jstree(true).refresh();
        $treeview.on('refresh.jstree', function () { $treeview.jstree('close_all') });
    });
});
$("#pesquisa-arvore").keypress(function(e) {
    if(e.which === 13) {
        $("#btn-search-tree").click();
    }
});
/** end::busca_arvore */

/** begin::configuracao_perfect_scrollbar */
var ps = new PerfectScrollbar('.kt-scroll');

function updateSize() {
    var width = parseInt($('#width').value, 10);
    var height = parseInt($('#height').value, 10);

    $('.kt-scroll').style.width = width + 'px';
    $('.kt-scroll').style.height = height + 'px';

    ps.update();
}
/** end::configuracao_perfect_scrollbar */


/** begin::arvore_projeto_centro_custo */
function loadTreeProjetos(parent)
{
    let $inputCarregados = $("#tree_carregados");
    let acordo_id        = [];
    let carregados       = String($inputCarregados.val()).split(",");
    let childrensTree    = parent.find('.tree-acordo');
    let cleanId          = '';
    carregados = carregados.length > 0 ? carregados : [];

    for(let i=0;i<childrensTree.length;i++) {
        cleanId = String($(childrensTree[i]).attr('acordo_id')).replace(/\D/g, '');
        if(cleanId.length > 0)
            acordo_id.push(cleanId);
    }

    if(acordo_id.length === 0)
        return false;

    for(var i=0;i<acordo_id.length;i++) {
        if(carregados.indexOf("#acordo_"+acordo_id[i]) !== -1)
            return false;
    }

    $.ajax({
        type: "post",
        url: '/documento/arvore-documento-projeto',
        data: {acordo_id: acordo_id, node: 'centro-custo'},
        dataType: "json",
        success: function(response) {
            for(var i=0;i<response.length;i++) {
                if(carregados.indexOf('#acordo_'+acordo_id[i]) === -1) {
                    carregados.push('#acordo_'+acordo_id[i]);
                }

                createNode('#acordo_'+acordo_id[i], response[i]);
            }

            carregados = carregados.filter(function(el){
                return el.length > 0;
            });

            $inputCarregados.val(carregados.join(','))
        }
    })
}
/** end::arvore_projeto_centro_custo */

function getProjetoAcordoId(parent) {
    let acordo_id = 0;
    var cleanId   = String(parent.attr('acordo_id')).replace(/\D/g, '');

    if(cleanId.length > 0)
        acordo_id = parseInt(cleanId);

    if(acordo_id === 0)
        throw new Error('A váriavel acordo_id não pode ser igual a 0 (zero).');
    
    return acordo_id;
}
//
// /** begin::arvore_pagamentopf_projeto */
// function loadTreePagamentoPf(parent) {
//     let acordo_id = getProjetoAcordoId(parent);
//     let element_id = 'pagamento_pf_'+acordo_id;
//
//     let objAjaxTree = {
//         acordo_id: acordo_id,
//         url: '/documento/arvore-documento-pagamento-pf',
//         childrenTree: [
//             {node: 'pedidos', el: '#pf_pedido_ac_'+acordo_id},
//             {node: 'notas_fiscais', el: '#pf_nota_fiscal_ac_'+acordo_id},
//             {node: 'comprovantes_viagem', el: '#pf_comprovante_de_viagem_ac_'+acordo_id},
//             {node: 'autorizacoes_pagamentos', el: '#pf_autorizacao_de_pagamento_ac_'+acordo_id}
//         ],
//     };
//
//     ajaxTree(objAjaxTree, element_id);
// }
// /** end::arvore_pagamentopf_projeto */
//
// /** begin::arvore_pagamentopj_projeto */
// function loadTreePagamentoPj(parent) {
//     let acordo_id = getProjetoAcordoId(parent);
//     let element_id = 'pagamento_pj_'+acordo_id;
//
//     let objAjaxTree = {
//         acordo_id: acordo_id,
//         url: '/documento/arvore-documento-pagamento-pj',
//         childrenTree: [
//             {node: 'pedidos', el: '#pj_pedido_ac_'+acordo_id},
//             {node: 'notas_fiscais', el: '#pj_nota_fiscal_ac_'+acordo_id},
//             {node: 'autorizacoes_pagamentos', el: '#pj_autorizacao_de_pagamento_ac_'+acordo_id}
//         ],
//     };
//
//     ajaxTree(objAjaxTree, element_id);
// }
// /** end::arvore_pagamentopj_projeto */
//
// /** begin::arvore_compra_projeto */
// function loadTreeCompra(parent) {
//     let acordo_id = getProjetoAcordoId(parent);
//     let element_id = 'pagamento_pj_'+acordo_id;
//
//     let objAjaxTree = {
//         acordo_id: acordo_id,
//         url: '/documento/arvore-documento-compra',
//         childrenTree: [
//             {node: 'pedidos', el: '#compra_pedido_ac_'+acordo_id},
//             {node: 'processo_compra', el: '#compra_processo_de_compra_ac_'+acordo_id},
//             //{node: 'cotacoes', el: '#compra_cotacao_ac_'+acordo_id},
//             {node: 'ratificacoes', el: '#compra_ratificacao_ac_'+acordo_id},
//             {node: 'afs', el: '#compra_af_ac_'+acordo_id},
//             {node: 'confirmacoes_recebimentos', el: '#compra_confirmacao_de_recebimento_ac_'+acordo_id},
//         ],
//     };
//
//     ajaxTree(objAjaxTree, element_id);
// }
// /** end::arvore_compra_projeto */
//
// /** begin::arvore_faturamento_projeto */
// function loadTreeFaturamento(parent) {
//     let acordo_id = getProjetoAcordoId(parent);
//     let element_id = 'faturamento_'+acordo_id;
//
//     let objAjaxTree = {
//         acordo_id: acordo_id,
//         url: '/documento/arvore-documento-faturamento',
//         childrenTree: [
//             {node: 'pedidos', el: '#faturamento_pedido_ac_'+acordo_id},
//             {node: 'notas_emitidas', el: '#faturamento_nota_emitida_ac_'+acordo_id},
//         ],
//     };
//
//     ajaxTree(objAjaxTree, element_id);
// }
// /** end::arvore_faturamento_projeto */
//
// /** begin::arvore_remanejamento_projeto */
// function loadTreeRemanejamentos(parent) {
//     let acordo_id = getProjetoAcordoId(parent);
//     let element_id = 'remanejamento_'+acordo_id;
//
//     let objAjaxTree = {
//         acordo_id: acordo_id,
//         url: '/documento/arvore-documento-remanejamentos',
//         childrenTree: [
//             {node: 'pedidos', el: '#remanejamento_pedido_ac_'+acordo_id},
//             {node: 'documentos', el: '#remanejamento_documento_ac_'+acordo_id},
//         ],
//     };
//
//     ajaxTree(objAjaxTree, element_id);
// }
// /** end::arvore_remanejamento_projeto */
//
// /** begin::arvore_remanejamento_projeto */
// function loadTreeTranferenciasAcordo(parent) {
//     let acordo_id = getProjetoAcordoId(parent);
//     let element_id = 'transferencia_'+acordo_id;
//
//     let objAjaxTree = {
//         acordo_id: acordo_id,
//         url: '/documento/arvore-documento-transferencia-acordo',
//         childrenTree: [
//             {node: 'pedidos', el: '#transferencia_pedido_ac_'+acordo_id},
//             {node: 'faturas', el: '#transferencia_fatura_ac_'+acordo_id},
//         ],
//     };
//
//     ajaxTree(objAjaxTree, element_id);
// }
// /** end::arvore_remanejamento_projeto */

async function ajaxTree(objAjaxTree, element_id) {

    let $inputCarregados = $("#tree_carregados");
    let carregados       = String($inputCarregados.val()).split(",");
    carregados           = carregados.length > 0 ? carregados : [];
    let chs              = objAjaxTree.childrenTree;

    /** Se a árvore pedido tiver sido carregada significa que todas foram */
    if(carregados.indexOf(element_id) !== -1) {
        return false;
    } else {
        carregados.push(element_id);
        $inputCarregados.val(carregados.join(','));
    }

    
    for(let i=0;i<chs.length;i++) {
        $.ajax({
            type: "post",
            url: objAjaxTree.url,
            data: {acordo_id: objAjaxTree.acordo_id, node: chs[i].node},
            dataType: "json"
        }).done(function(response){
            let countRetorno = response.length;

            for(let j=0;j<countRetorno;j++) {
                createNode(chs[i].el, response[j]);
            }
        })
    }

    return false;
}

/** begin::carrega_arvores_clique */
$(document).on('click', '.jstree-icon', function() {
    let parent    = $(this).parent('li');
    let classTree = parent.attr('class');
    classTree     = classTree.split(' ');

    if(classTree.indexOf('tree-centro-custo') > - 1) {
        loadTreeProjetos(parent);
        return false;
    }
    // if(classTree.indexOf('tree-pagamento-pf') > - 1) {
    //     loadTreePagamentoPf(parent);
    //     return false;
    // }
    // if(classTree.indexOf('tree-pagamento-pj') > - 1) {
    //     loadTreePagamentoPj(parent);
    //     return false;
    // }
    // if(classTree.indexOf('tree-compra') > - 1) {
    //     loadTreeCompra(parent);
    //     return false;
    // }
    // if(classTree.indexOf('tree-faturamento') > - 1) {
    //     loadTreeFaturamento(parent);
    //     return false;
    // }
    // if(classTree.indexOf('tree-remanejamento') > - 1) {
    //     loadTreeRemanejamentos(parent);
    //     return false;
    // }
    // if(classTree.indexOf('tree-transferencia-acordo') > - 1) {
    //     loadTreeTranferenciasAcordo(parent);
    //     return false;
    // }
});
/** end::carrega_arvores_clique */

/** begin::create_tree_node */
function createNode(parent_node, new_node) {
    for(var new_n in new_node) {
        $("#kt_tree_2").jstree('create_node', $(parent_node), new_node[new_n], 'last', null, null);
    }
}
/** end::create_tree_node */


$("#kt_tree_2").on("click", ".jstree-anchor", function(evt) {
    var link = $.trim($(this).attr("href"));
    if(link !== '#') {
        window.open(link, '_blank');
    } else {
        evt.preventDefault();
    }
});