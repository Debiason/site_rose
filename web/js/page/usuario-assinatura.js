/** Alterar assinatura principal */
function alterarAssinaturaPrincipal (id_assinatura, usuario_id) {
    var id = String(id_assinatura).replace(/\D/g, '');
    var usuario_id = String(usuario_id).replace(/\D/g, '');
    if(id.length === 0 || usuario_id.length === 0) {
        toastr.error('Não foi possível identificar o ID selecionado!', 'Oops!');
        return false;
    }
    var csrfToken = $('#usuario_assinatura_csrf').val();
    $.ajax({
        url     : '/usuario-assinatura/atualizar-assinatura-principal',
        type    : 'post',
        dataType: 'json',
        data    : {id: id, usuario_id: usuario_id, _csrf : csrfToken},
        success: function (response) {
            if(response.success) {
                var contentDiv = $(".usuario-update .tab-secondary");
                contentDiv.fadeOut(function(){
                    contentDiv.load('/usuario-assinatura?user_id='+usuario_id, function(){
                        contentDiv.fadeIn();
                    });
                });
                toastr.success('Alterado com sucesso!', 'Atualizado!')
            } else {
                toastr.error('Não foi possível atualizar', 'Error!');
            }
        },
        error  : function(jqXHR, textStatus, errorThrown) {
            toastr.error(textStatus + ' ' + errorThrown, 'Error!');
        }
    });
};

function deletarUsuarioAssinatura(event, deleteUrl, usuario_id) {
    event.preventDefault();
    var result = confirm('Deletar item, você tem certeza?');                                
    if(result) {
        var csrfToken = $('#usuario_assinatura_csrf').val();
        $.ajax({
            url: deleteUrl,
            data: { _csrf : csrfToken},
            type: 'post',
            error: function(xhr, status, error) {
                alert('Houve um erro com seu pedido.' + xhr.responseText);
            },
            success:function(response) {
                var contentDiv = $(".usuario-update .tab-secondary");
                contentDiv.fadeOut(function(){
                    contentDiv.load('/usuario-assinatura?user_id='+usuario_id, function(){
                        contentDiv.fadeIn();
                    });
                });
                toastr.success('Deletado com sucesso!', 'Deletado!')
            }
        })
    }
}
