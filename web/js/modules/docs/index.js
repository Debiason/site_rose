$(function(){
    $("#btn-pesquisar").on('click', function(){
        var chave = $("#docsform-chave").val();
        var _csrf = String($('meta[name=csrf-token]').attr('content'));
        
        if (_csrf.length === 0) {
            toastr.error('Erro CSRF vazio, atualize a página.');
            return false;
        }
        var url = '/default/pesquisar-documento'
        var dados = {
            method: 'post',
            dataType: 'json',
            data: { _csrf: _csrf, chave: chave }
        }
        $.ajax(url, dados)
            .done((response) => {
                
                try{
                    if(!response.hasOwnProperty('data')) {
                        throw new Erro('Erro na resposta do servidor. #1');
                    }

                    var data = response.data;
                    if(!data.hasOwnProperty('success')  || !data.hasOwnProperty('msg')) {
                        throw new Erro('Erro na resposta do servidor. #2');
                    }

                    if(data.success) {
                        $("#form-pesquisa").hide('slow');
                        $("#resultado-pesquisa #result-json").html(data.msg)
                        $("#resultado-pesquisa").show('slow');
                    } else {
                        toastr.error(data.msg);
                    }

                }catch(e) {
                    toastr.error(e);
                }

            })
            .fail(() => toastr.error('Erro de comunicação com o servidor.'));
    });
});