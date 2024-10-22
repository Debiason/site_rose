function loadDataModalAddFile(id) {
  try {

    fetch('/arvore-documento-lista-arquivo/get-arvore-documento-sem-anexo?id=' + id)
      .then((response) => response.json())
      .then((body) => {

        var $selectListaArquivoAddFile = $("#lista-arquivo-add-file-id");
        var $tableListaArquivo = $("#table-lista-arquivo-id");
        var $tableBodyListaArquivo = $("#table-lista-arquivo-id tbody");

        if(!$selectListaArquivoAddFile.prop('disabled')) {
          $selectListaArquivoAddFile.prop('disabled', 'disabled');
          $selectListaArquivoAddFile.html('<option value="">-- Selecione --</option>');
        }

        if($tableListaArquivo.css('display') !== 'none') {
          $tableListaArquivo.css('display', 'none');
          $tableBodyListaArquivo.html('');
        }

        if(!body.success) {
          toastr.error(body.msg)
          return false;
        }

        var arvore_atual = body.arvore_atual;

        if(Object.keys(arvore_atual).length > 0) {

          var arvore_atual_id = arvore_atual.arvore_atual_id;
          var arvore_atual_nome = arvore_atual.arvore_atual_nome;

          $tableBodyListaArquivo.html(`
                          <tr>
                            <td>${arvore_atual_id}</td>
                            <td>${arvore_atual_nome}</td>
                            <td align="center">
                                <a href="#" onclick="removerAssociacaoArvore(event, ${id})">
                                    <i class="far fa-trash-alt"></i>
                                </a>
                              </td>
                          </tr>
                        `)
          $tableListaArquivo.fadeIn();

        }

        var arvore_lista = body.arvore_lista;
        if(arvore_lista.length) {
          var option = ['<option value="">-- Selecione --</option>'];
          arvore_lista.forEach((element, index, array) => {
            option.push(`<option value="${element.id}">${element.nome}</option>`);
          })

          $selectListaArquivoAddFile.html(option.join(' '));
          $selectListaArquivoAddFile.removeAttr('disabled');
        } else {
          $("#lista-arquivo-add-file-id").html('<option value="">Nenhuma linha foi encontrada.</option>');
        }

      })
  } catch(e) {
    toastr.error(e)
  }
}
function removerAssociacaoArvore(e, id) {
  e.preventDefault();

  var $tableListaArquivo = $("#table-lista-arquivo-id");
  var $tableBodyListaArquivo = $("#table-lista-arquivo-id body");

  try {
    fetch('/arvore-documento-lista-arquivo/remover-associacao-arvore?id=' + id)
      .then((response) => response.json())
      .then((body) => {

        if(!body.success) {
          toastr.error(body.msg);
          return false;
        }

        $.when($tableListaArquivo.fadeOut(500))
          .done(() => {
            $tableBodyListaArquivo.html('')
          })
        jQuery("#kt_tree_2").jstree(true).refresh();
        loadDataModalAddFile(id);
        setTimeout(() => {
          $(`#node_${id}_anchor`).trigger('click');
        }, 400)
      })
  } catch(e) {
    toastr.error(e)
  }
}

$('.btn-salvar-associacao-arquivo').on('click', function (e){

  e.preventDefault();

  var lista_arquivo_id = String($("#lista-arquivo-add-file-id").val()).replace(/\D/g, '');
  var node_id = String($("#arvore_documento_id").val()).replace(/\D/g, '');

  if(lista_arquivo_id.length === 0) {
    toastr.warning('Selecione uma lista de arquivo');
    return false;
  }

  if(node_id.length === 0) {
    toastr.error('Erro: ID da árvore de arquivo não encontrada.');
    return false;
  }

  $.post('/arvore-documento-lista-arquivo/salvar-associacao-arvore', {lista_arquivo_id, node_id, _csrf: yii.getCsrfToken()})
    .done(function(response) {
      if(response.success) {
        $("#modal-add-file .close").trigger('click');
        jQuery("#kt_tree_2").jstree(true).refresh();
        loadDataModalAddFile(node_id);
        setTimeout(() => {
          $(`#node_${node_id}_anchor`).trigger('click');
          $(`#node_${node_id} i`).trigger('click');
        }, 400)
      }
      toastr[response.success ? 'success' : 'error'](response.msg)
    })
    .fail(function (e) {
      toastr.error(e);
    });
});

$(".btn-salvar-associacao-anexo").on('click', (e) => {
  e.preventDefault()

  let arvore_documento_id = String($('#arvore_documento_id').val()).replace(/\D/g, '')
  let nome_lista = $("#arvoredocumentolistaanexoform-nome").val().trim()
  let tipo_documento_eletronico_id = String($("#arvoredocumentolistaanexoform-tipo_documento_eletronico_id").val()).replace(/\D/g, '')
  let formData = $("#form_data").val().trim()
  formData = formData.length > 0 ? JSON.parse(formData) : null
  let files = ''

  if(formData) {
    files = formData.files;
    files = files.map((file) => {
      return new File([''], file.name, file);
    })
  }

  if(!arvore_documento_id) {
    toastr.error('Erro: Não foi possível identificar o diretório.');
    return false;
  }
  if(!nome_lista) {
    toastr.error('Erro: Breve descrição é um campo obrigatório.');
    return false;
  }
  if(!tipo_documento_eletronico_id) {
    toastr.error('Erro: Tipo de documento é um campo obrigatório.');
    return false;
  }

  let formAnexo = new FormData();
  formAnexo.append('arvore_documento_id', arvore_documento_id);
  formAnexo.append('nome_lista', nome_lista);
  formAnexo.append('tipo_documento_eletronico_id', tipo_documento_eletronico_id);

  if(formData) {
    let file = '';
    for (let i = 0; i < files.length; i++) {
      file = files[i];

      formAnexo.append('files[]', file, file.name);
    }
  }

  $.ajax({
    type: 'POST',
    url: '/arvore-documento/salvar-anexo',
    data: formAnexo,
    dataType: 'json',
    cache : false,
    processData: false,
    contentType: false,
  })
    .done(function (response) {
      if (response.hasOwnProperty('success') && response.hasOwnProperty('msg')) {
        if (!response.success) {
          toastr.error(response.msg)
          return false;
        }

        jQuery("#kt_tree_2").jstree(true).refresh();
        setTimeout(() => {
          $(`#node_${arvore_documento_id}_anchor`).trigger('click')
        }, 800)

        $("#modal-principal .close").trigger('click')

        toastr.success(response.msg)

      } else {
        console.warn(response)
        toastr.error('Erro na resposta dos dados')
      }
    })
    .fail(function(e) {
      console.log(e)
      toastr.error('Erro de comunicação com o servidor')
    })

  // $.post('/arvore-documento/salvar-anexo', {arvore_documento_id, nome_lista, tipo_documento_eletronico_id, files})
  //   .done(function(response) {
  //     if (response.hasOwnProperty('success') && response.hasOwnProperty('msg')) {
  //       if (!response.success) {
  //         toastr.error(response.msg)
  //         return false;
  //       }
  //
  //       jQuery("#kt_tree_2").jstree(true).refresh();
  //       setTimeout(() => {
  //         $(`#node_${arvore_documento_id}_anchor`).trigger('click')
  //       }, 600)
  //
  //       $("#modal-principal .close").trigger('click')
  //
  //       toastr.success(response.msg)
  //
  //     } else {
  //       console.warn(response)
  //       toastr.error('Erro na resposta dos dados')
  //     }
  //   })
  //   .fail(function(e) {
  //     console.log(e)
  //     toastr.error('Erro de comunicação com o servidor')
  // })
})

$(function(){
  let id = $("#arvore_documento_id").val();
  loadDataModalAddFile(id)
})
