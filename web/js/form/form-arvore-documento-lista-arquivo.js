
$(".btn-ocultar-resultado").on('click', function(e){
  $(".test-sql-result").fadeOut();
  $(this).fadeOut();
  setTimeout((function (){
    $(".test-sql-result table thead").html('');
    $(".test-sql-result table tbody").html('');
    $("#query-summary").html('')
  }, 2000))
});

$(document).on('click', '.btn-consulta-sql', function(e) {
  e.preventDefault();

  var query = String($("#consulta-sql").val()).trim().toLocaleLowerCase();
  var restrict_words = ['update', 'delete', 'insert', 'create', 'information_schema'];

  var found_words = restrict_words.filter(function(word) {
    return query.includes(word)
  })

  if(found_words.length > 0) {
    swal("Erro", `Palavras restritas foram encontradas! ( ${found_words.join(', ')} )`, "error");
    return false;
  }

  $.post('/arvore-documento-lista-arquivo/teste-consulta-sql', {query})
    .done(function (response){
      try {
        if(response.success) {

          if(parseInt(response.total) === 0) {
            swal("Opss!", `Não foi encontrada nenhum resultado para esta consulta.`, "warning");
            return false;
          }

          var result = response.result;
          var totalFoundRows = parseInt(response.total);

          $("#query-summary").html(`<b>Total</b>: ${totalFoundRows} ${totalFoundRows >= 10 || totalFoundRows === -1 ? ' | <b>Exibindo</b>: 10' : '' }`)

          var ths = Object.keys(result[0]);
          var stringThs = '<tr>';
          ths.forEach(function(text) {
            stringThs+=`<th>${text.toUpperCase()}</th>`;
          })
          stringThs+= '</tr>';

          var stringTrTd = '';
          result.forEach(function(obj, idx) {
            stringTrTd+='<tr>';
            for(var o in obj) {
              stringTrTd+='<td>';
              stringTrTd+=obj[o];
              stringTrTd+='</td>';
            }
            stringTrTd+='</tr>';
          });
          $(".btn-ocultar-resultado").fadeIn();
          $(".test-sql-result").fadeIn();
          $(".test-sql-result table thead").html(stringThs);
          $(".test-sql-result table tbody").html(stringTrTd);
        } else {
          $(".test-sql-result").hide();
          toastr.error(response.msg);
        }
      } catch(error) {
        $(".test-sql-result").hide();
        toastr.error(error);
      }
    }).fail(function (){
    toastr.error('Erro de comunicação com o servidor!');
  });
});

$('#modal-principal .form-lista-arvore').on('submit', function(event){

  $(this).off();

  var dados = $(this).serialize();
  var dadosArray = dados.split('&');

  if(dadosArray.length === 0) {
    toastr.error('Erro ao coletar dados do formulário.');
    return false;
  }

  var url = $(this).attr('action');
  var formData = new FormData(this);
  formData.append('ArvoreDocumentoListaArquivo[tipo_lista_documento]', $(".tipo_lista_arvore:checked").val());
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    enctype: this.enctype,
    processData: false,
    contentType: false,
    data: formData
  })
    .done(function (response) {

      try{
        if(response.success) {
          $("#arvore-documento-lista-arquivo-form .btn-outline-secondary").trigger('click');

          setTimeout(function(){
            $('#lista-arquivo-index').trigger('click');
          }, 1000)
        }

        toastr[response.success ? 'success' : 'error'](response.msg);
      } catch (e) {
        toastr.error(e);
      }

    })
});

$(function(){
  $(".tipo_lista_arvore").on('click', function(e) {
    var option = parseInt($(this).val());

    console.log(option)

    switch (option) {
      case 290:
        $("#box-consulta-sql").fadeIn();
        $("#box-tipo-documento").fadeOut();
        if($("input[name='ArvoreDocumentoListaArquivo[is_uri_pedido]']:checked").val() === '0' &&
          $("#box-uri").css('display') === 'none') {
          $("#box-uri").fadeIn();
        }
        break;
      case 292:
        $("#box-consulta-sql").fadeOut();
        $("#box-tipo-documento").fadeIn();
        break;
    }
  })
  $("input[name='ArvoreDocumentoListaArquivo[is_uri_pedido]']").on('click', function(e) {
    var is_uri_pedido = parseInt($(this).val());

    switch (is_uri_pedido) {
      case 1:
        $("#box-uri").fadeOut();
        break;
      case 0:
        $("#box-uri").fadeIn();
        break;
    }
  });
});