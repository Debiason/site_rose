var urlAction = '/arvore-documento-diretorio/tree-action';
var jsTreeDoc = jQuery("#kt_tree_2");
var KTTreeview = {
  init:function() {
    jsTreeDoc
      .jstree({
        'plugins': ['contextmenu', 'types', 'unique', 'conditionalselect', 'search', 'state'],
        'search' : {
          'case_sensitive': false,
          'show_only_matches': false,
          'ajax': {
            'url': `/arvore-documento-diretorio/pesquisar-documento`,
          }
        },
        'core': {
          'multiple': false,
          'data': {
            'url': function (node) {
              return node?.li_attr?.class && node.li_attr.class.indexOf('load-associated-files') > -1
                ? `/arvore-documento-diretorio/get-arquivos-diretorio`
                : `/arvore-documento-diretorio/get-tree-documento-interno`;
            },
            'data': function (node) {
              var id = node.id;
              if(id !== '#') {
                id = String(node.id).replace(/\D/g, '');
              } else {
                id = $('#arvore-documento-id').val()
              }
              return {'id': id};
            },
          },
          'force_text' : true,
          'check_callback': true,
           themes: {
            responsive: 1
          }
        },
         types: {
          default: {
              icon: "fa fa-folder kt-font-warning"
            }
          , file: {
              icon: "fa fa-file  kt-font-warning"
            }
          },
        "contextmenu": {
          "items": function ($node) {
            let tree = jsTreeDoc.jstree(true);
            if($node.type === 'file')
              return getFileContextMenu($node, tree);
            else
              return getFolderContextMenu($node, tree);
          }
        }
      })
      .on("create_node.jstree", (e, data) => create_node(e, data, urlAction))
      .on("delete_node.jstree", (e, data) => delete_node(e, data, urlAction))
      .on("rename_node.jstree", (e, data) => rename_node(e, data, urlAction))
  }
}

function getFileContextMenu($node, tree) {
  if($node.a_attr.href.includes('/get-anexo?')) {
    return {
      "Remove": {
        "separator_before": false,
        "separator_after": true,
        "label": "Deletar",
        "action": function (data) {
          var inst = $.jstree.reference(data.reference);
          var obj = inst.get_node(data.reference);

          if (obj.parent !== '#')
            tree.delete_node($node);
          else
            toastr.error('O arquivo não pode ser apagado!');
        }
      },
    }
  }
}

function getFolderContextMenu($node, tree) {
  return {
    "Create": {
      "separator_before": false,
      "separator_after": false,
      "label": "Novo",
      "action": function (data) {
        var tree = jsTreeDoc.jstree(true)
        $node = tree.create_node($node);
        tree.edit($node);
      }
    },
    "Rename": {
      "separator_before": false,
      "separator_after": false,
      "label": "Renomear",
      "action": function (data) {
        var inst = $.jstree.reference(data.reference);
        var obj = inst.get_node(data.reference);

        if (obj.parent !== '#')
          tree.edit($node);
        else
          toastr.error('O diretório raiz não pode ser renomeado!');
      }
    },
    "Remove": {
      "separator_before": false,
      "separator_after": true,
      "label": "Deletar",
      "action": function (data) {
        var inst = $.jstree.reference(data.reference);
        var obj = inst.get_node(data.reference);

        if (obj.parent !== '#')
          tree.delete_node($node);
        else
          toastr.error('O diretório raiz não pode ser removido!');
      }
    },
    "Anexar Arquivos": {
      "separator_before": false,
      "separator_after": false,
      "label": "Arquivos",
      "action": function (data) {

        var inst = $.jstree.reference(data.reference);
        var obj = inst.get_node(data.reference);
        var id = String(obj.id).replace(/\D/g, '');
        var text = obj.text
        var btnAnexar =  $("#btn-anexar-arquivos")
        var url = '/arvore-documento-diretorio/anexar-arquivos';
        var newUrl = url.split('?')
        newUrl = encodeURI(`${newUrl[0]}?arvore_documento_id=${id}&text=${text}`)
        btnAnexar.attr('value', newUrl)
        setTimeout(() => {
          $("#btn-anexar-arquivos").trigger('click')
        },300)

      }
    }
  };
}

$(document).ready(function() {
  $('[data-toggle="popover"]').popover()
  KTTreeview.init();
  new PerfectScrollbar('#kt_tree_2')

  $(".doc-search-input").keyup((ev) => {
    let arvore_documento_id = $('#arvore-documento-id').val()
    let dropZone = $("#drop_zone")
    let ktJsTree = jQuery("#kt_tree_2")

    if(ev.target.value.length === 0) {
      let selected = ktJsTree.jstree(true).get_selected();
      if(selected.length > 0) {
        let anode = ktJsTree.jstree(true).get_node(selected[0])
        anode.state.loaded=false;
        ktJsTree.jstree(true).load_node(anode, function () {
          this.deselect_all();
          this.select_node(selected[0]);
          this.open_node(selected[0]);
          $(`#${selected[0]}_anchor`).trigger('click');
        });
      } else {
        let anode = ktJsTree.jstree(true).get_node(`node_${arvore_documento_id}`)
        anode.state.loaded=false;
        ktJsTree.jstree(true).load_node(anode, function () {
          this.deselect_all();
          this.open_node(`node_${arvore_documento_id}`);
          this.select_node(`node_${arvore_documento_id}`);
          $(`#node_${arvore_documento_id}_anchor`).trigger('click');
        });
      }
    }
    setTimeout(() => {
      $("#kt_tree_2").jstree(true).search(ev.target.value, false, true, `node_${arvore_documento_id}`)
        ?.then((response) => {
          if (response.length > 0) {

            setFileManagerBody(response)
            let anode = '';
            response.forEach((obj) => {
              anode = ktJsTree.jstree(true).get_node(obj.parent)
              anode.state.loaded=false;
              ktJsTree.jstree(true).load_node(anode, function () {
                this.deselect_all();
                this.open_node(obj.parent)
                this.select_node(response[0].parent);
              });
            })

          } else {
            dropZone.html('<div class="box-message"><h4>Nenhum registro encontrado</h4></div>')
          }
        }, 800)
    })
  })
});

/**
 * @param data Nó root
 * @param r Resposta do servidor
 * @param msgS Mensagem de sucesso
 * @param msgE Mensagem de erro
 * @param reload
 */
function responseDefault(data, r, msgS, msgE, reload = false) {
  try {
    var msg = r.success ? msgS : msgE;
    toastr[r.success ? 'success' : 'error'](msg);

    if(reload)
      data.instance.refresh();

  } catch (e) {
    data.instance.refresh();
    toastr.error('Houve um erro ao executar tarefa!');
    throw new Error(e);
  }
}

/**
 * @param e Event
 * @param data Nó
 * @param urlAction URL default da ação
 */
function create_node(e, data, urlAction) {
  var id = $('#arvore-documento-id').val();
  var cod_filial = $('#node_' + id).data('filial');

  jQuery.post(`${urlAction}`, {
    'parent': data.node.parent.replace(/\D/g, ''),
    'position': data.position,
    'text': jQuery.trim(data.node.text),
    'operation': 'create_node',
    'cod_filial': cod_filial
  })
    .done(function (r) {
      if(r.success) {
        data.instance.set_id(data.node, r.id);
      } else {
        data.instance.refresh();
      }
      responseDefault(data, r, 'Diretório criado com sucesso!', r['msg'], false);
    })
    .fail(function () {
      toastr.error('Erro de comunicação com oo servidor! [create_node]');
      data.instance.refresh();
    });
}

/**
 * @param e Event
 * @param data Nó
 * @param urlAction URL default da ação
 */
function delete_node(e, data, urlAction) {

  jQuery.post(`${urlAction}`, {
    'id': data.node?.type === 'file' ? data.node.original.file_id.replace(/\D/g, '') : data.node.id.replace(/\D/g, ''),
    'operation': 'delete_node',
    'type': data.node?.type ? data.node.type : null,
    'parent':  data.node.parent
  })
    .done(function (r) {
      responseDefault(data, r, `${data.node?.type === 'file' ? 'Arquivo' : 'Diretório'} apagado com sucesso!`,
          r['msg'], true);
    })
    .fail(function () {
      toastr.error('Erro de comunicação com oo servidor! [delete_node]');
      data.instance.refresh();
    });

}

/**
 * @param e Event
 * @param data Nó
 * @param urlAction URL default da ação
 */
function rename_node(e, data, urlAction) {
  jQuery.post(`${urlAction}`, {
    'id': data.node.id,
    'text': data.text,
    'operation': 'rename_node'
  })
    .done(function (r) {
      responseDefault(data, r, 'Diretório renomeado com sucesso!', r['msg']);
    })
    .fail(function () {
      toastr.error('Erro de comunicação com oo servidor! [rename_node]');
      data.instance.refresh();
    });
}