$(() => {
  const selectArvore = $("select[name='arvore_documento']");

  new PerfectScrollbar('#drop_zone')

  $("#btn-mount-tree").on("click", () => {
    const ARVORE_DOCUMENTO_ID = String(selectArvore.val()).replace(/\D/, "");
    if (ARVORE_DOCUMENTO_ID === "" || ARVORE_DOCUMENTO_ID === "0") {
      toastr.warning("Selecione uma árvore de documento!");
      return false;
    }

    $("#drop-zone-body").show()

    $("#body-arvore-doc").load(
      `/arvore-documento/tree-doc?id=${ARVORE_DOCUMENTO_ID}`, () => {
        setTimeout(() => {
          let selected = $("#kt_tree_2").jstree(true).get_selected();
          if(selected.length > 0) {
            $(`#${selected[0]}_anchor`).trigger('click', function () {
              $("#drop-zone-body").show()
            })
          } else {
            $("#kt_tree_2").find('a[href="#"]:first').trigger('click', function () {
              $("#drop-zone-body").show()
            })
          }
        }, 600)
      }
    );

    return false;
  });

  $(document).on('click', "a.jstree-anchor, .box-items", (ev) => {

    let element_id = ev.target.getAttribute('id');
    let ktJsTree = jQuery("#kt_tree_2")

    if(!$(`#${element_id}`).hasClass('a-open-file')) {

      ev.preventDefault();

      ktJsTree.jstree(true).deselect_all(true);
      ktJsTree.jstree(true).select_node(`${element_id}`);

      element_id = String(element_id).replace(/\D/g, '');

      if (element_id.length === 0)
        return false;

      $("#arvore_documento_id").val(element_id)

      try {
        // verifica pastas filhas
        fetch(`/arvore-documento/get-tree-documento-interno?id=${element_id}`)
          .then((response) => response.json())
          .then((body) => {
            let treeFilter = body.filter((obj) => {
              return String(obj.id).replace(/\D/g, '') !== element_id
            })
            // se não tiver diretórios filhos, busca pelos arquivos
            if (treeFilter.length === 0) {
              fetch(`/arvore-documento-lista-arquivo/get-arquivos-diretorio?id=${element_id}`)
                .then((response) => response.json())
                .then((body) => {
                  setFileManagerBody(body)
                })
                .catch((e) => {
                  console.log(e)
                  toastr.error('Erro de comunicação com o servidor. #1')
                })
              return false;
            } else {
              setFileManagerBody(treeFilter)
            }
          })
      } catch (e) {
        console.log(e)
        toastr.error('Erro de comunicação com o servidor. #2')
      }
    } else {
      if(ev.target?.href && ev.target.href.includes('get-anexo')) {
        $(ev.target).ekkoLightbox()
      } else if(ev.target?.href) {
        var win = window.open(ev.target.href, '_blank');
        win.focus();
      }
    }
  })
});


function drag_drop(ev) {
  let data = ev.dataTransfer.files;
  $("#drop_zone").removeClass('drag-hover');

  let  files = data;
  let arvore_documento_id = String($("#arvore_documento_id").val()).replace(/\D/g, '');
  let formData = new FormData();

  if(arvore_documento_id.length === 0) {
    toastr.error('Erro: Campo id não foi informado.')
    return false;
  }

  if(files.length === 0) {
    toastr.error('Erro: Arquivos não encontrados.')
    return false;
  }
  let file = '';
  for(let i = 0; i < files.length; i++) {
    file = files[i];

    formData.append('files[]', file, file.name);
  }
  formData.append('arvore_documento_id', arvore_documento_id);

  try{
      fetch(`/arvore-documento/existe-lista-vinculada?id=${arvore_documento_id}`)
        .then((response) => response.json())
        .then((body) => {
          if(body.success && !body.has_directory_child) {
            treeUploadFiles(formData)
          } else {

            if(body.has_directory_child) {
              toastr.error('Não é possível inserir arquivos em diretórios com subpastas!')
              return false
            }

            let filesArray = [];
            let v_form_data = {}
            let file = '';
            for(let i = 0; i < files.length; i++){

              file = {
                'lastMod'    : files[i].lastModified,
                'lastModDate': files[i].lastModifiedDate,
                'name'       : files[i].name,
                'size'       : files[i].size,
                'type'       : files[i].type,
              }

              filesArray.push(file)
            }
            v_form_data.files = filesArray
            v_form_data.arvore_documento_id = arvore_documento_id;

            $("#form_data").val(JSON.stringify(v_form_data))

            var url = $("#btn-anexar-arquivos").attr('value')
            var newUrl = url.split('?')
            var text = $(`#node_${arvore_documento_id}_anchor`).text().replace(/(<([^>]+)>)/gi, "");

            newUrl = encodeURI(`${newUrl[0]}?arvore_documento_id=${arvore_documento_id}&text=${text}`)
            $("#btn-anexar-arquivos").attr('value', newUrl)

            setTimeout(() => {
              $("#btn-anexar-arquivos").trigger('click')
            },300)

            setTimeout(() => {
              $("#lista-arquivo-index").trigger('click')
            }, 600)
          }
        })
  }catch (e) {
    throw new Error(e)
  }

  ev.preventDefault();
  ev.stopPropagation();
}

function treeUploadFiles(formData) {
  let progressBar = $(".progress-bar");
  progressBar.parent('.progress').removeClass('d-none');
  $.ajax({
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          progressBar.css({
            width: percentComplete * 100 + '%'
          });
          if (percentComplete === 1) {
            progressBar.parent('.progress').addClass('d-none');
          }
        }
      }, false);
      xhr.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          progressBar.css({
            width: percentComplete * 100 + '%'
          });
        }
      }, false);
      return xhr;
    },
    type: "POST",
    url: '/arvore-documento/salvar-anexo',
    data: formData,
    dataType: 'json',
    cache : false,
    processData: false,
    contentType: false,
  }).done((response) => {
    if (response.hasOwnProperty('success') && response.hasOwnProperty('msg')) {
      if (!response.success) {
        toastr.error(response.msg)
        return false;
      }
      let element_id = $("#arvore_documento_id").val()
      jQuery("#kt_tree_2").jstree(true).refresh();
      setTimeout(() => {
        $(`#node_${element_id}_anchor`).trigger('click')
      }, 600)
      toastr.success(response.msg)

    } else {
      console.warn(response)
      toastr.error('Erro na resposta dos dados')
    }
  }).fail((e) => {
    console.log(e)
  });
}

function drag_over(ev) {
  $("#drop_zone").addClass('drag-hover');

  ev.preventDefault();
  ev.stopPropagation();
}

function drag_leave(ev) {
  $("#drop_zone").removeClass('drag-hover');

  ev.preventDefault();
  ev.stopPropagation();
}

/**
 * @param {Array|object} dataArrayJson
 */
function setFileManagerBody(dataArrayJson) {
  let dropZone = $("#drop_zone");
  let response = ''
  let icon = 'fas fa-file-alt'
  let element_id = $("#arvore_documento_id").val()
  if(Array.isArray(dataArrayJson) && dataArrayJson.length > 0) {

    dataArrayJson.forEach((obj) => {
      if(obj.type === 'folder') {
        if(obj.parent === `node_${element_id}`) {
          response += `<div class="box-items" id="${obj.id}_anchor">
                        <span class="fa fa-folder"></span>
                        <span style="pointer-events:none;">${obj.text}</span>                    
                    </div>`
        }
      } else {
        if(obj.extension) {
          icon = getFileIcon(obj.extension);
          icon = icon.icon;
        }
        response += `<a 
                        class="box-items 
                        ${obj.a_attr.class}" 
                        href="${obj.a_attr.href}" 
                        title="${obj.a_attr.title}"
                        data-title="${obj.a_attr.title}"
                        data-toggle="lightbox"
                        data-gallery="Arquivos">
                        ${['.jpg', '.png', '.jpeg', '.gif', '.svg'].includes(obj.extension)
                      ? `<img src="${obj.endereco}" alt="${obj.a_attr.title}" width="80px">`
                      : `<span class="${icon}"></span>`
                    }
                        <span style="pointer-events:none;">${obj.text}</span>                    
                    </a>`
      }

      dropZone.animate({'opacity': 0.1}, 50, () => {
        dropZone.html(response).animate({'opacity': 1}, 50);
      })
    })

  }else if(typeof dataArrayJson === 'object' && dataArrayJson !== null) {
    dropZone.html('<div class="box-message"><h4>A pasta está vazia</h4></div>')
  } else {
    dropZone.html('<div class="box-message"><h4>Não foi possível ler o conteúdo da pasta</h4></div>')
  }
}