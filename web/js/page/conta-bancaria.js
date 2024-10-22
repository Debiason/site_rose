$(function(){
    $("#conta-bancaria-index input[name=selection_all]").on('click', function(){
        if($(this).is(':checked')) {
            $(".checkbox-conta").each(function(){
                $(this).attr('checked', true);
            });
        } else {
            $(".checkbox-conta").each(function(){
                $(this).attr('checked', false);
            });
        }
    });
})
$("#btn-ativar-conta").on('click', function(e){
    e.preventDefault();

    try{
        var conta  = [];
        var valor  = '';
        var status = '';
        var _csrf  = $("meta[name=csrf-token]").attr('content');
        var checkboxCount = $(".checkbox-conta").length;

        for(var i=0;i<checkboxCount;i++) {
            valor = String($(".checkbox-conta")[i].value).replace(/\D/g, '');
            status = String($(".checkbox-conta")[i].getAttribute('status')).replace(/\D/g, '');
            console.log('valor: '+valor, 'status: ', status);
            if(valor.length === 0 || status.length === 0) {
                console.log('valor: '+valor, 'status: ', status);
                throw new Error('Erro no status ou valor.');
            }

            if($(".checkbox-conta")[i].checked === true) {
                conta.push({id: valor, ativo: status});
            }
        }
        console.log(conta);
        
        if(conta.length === 0) {
            throw new Error('Nenhuma conta foi selecionada.');
        }

        $.ajax({
            method: 'post',
            url: '/conta-bancaria/alterar-status-conta',
            data: {conta: conta, _csrf:_csrf}
        }).done(function(response) {
            if(!response.hasOwnProperty('data')){
                throw new Error('Erro na resposta do servidor.');
            }

            var res = response.data
            if(res.success) {
                if(res.ids_alterados.length > 0 && res.ids_com_pedido.length === 0 ) {
                    toastr.success('Alteração realizada com sucesso.')
                } else if(res.ids_alterados.length > 0 && res.ids_com_pedido.length > 0 ) {
                    Swal.fire(
                        'Atenção',
                        '<p>O(s) código(s) ' + res.ids_alterados.join(', ') + ' FOI (FORAM) alterado(s) com sucesso.</p>'+
                        '<p>O(s) código(s) ' + res.ids_com_pedido.join(', ') + ' NÃO FOI (FORAM) alterado(s), pois tem pedido(s) associado(s).</p>',
                        'warning'
                      )
                } else if(res.ids_alterados.length === 0 && res.ids_com_pedido.length > 0 ) {
                    Swal.fire(
                        'Atenção',
                        'O(s) código(s) ' + res.ids_com_pedido.join(', ') + ' NÃO FORAM alterado(s), pois tem pedido(s) associado(s).',
                        'error'
                        )
                } else {
                    Swal.fire(
                        'Erro',
                        'Nenhuma linha foi alterada.',
                        'error'
                        )
                }
                if(res.ids_alterados.length > 0) {
                    var pessoa_id = $("#pessoa_id").val();
                    $(".m-portlet__body .tab-secondary").fadeOut('slow', function(){
                        $(".m-portlet__body .tab-secondary").load('/conta-bancaria?pessoa_id='+pessoa_id, function(){
                            $('.m-portlet__body .tab-secondary').fadeIn('slow');
                        });
                    });
                }
            } else {
                if(!res.hasOwnProperty('msg')) {
                    throw new Error('Erro na resposta do servidor #2.');
                }
                Swal.fire(
                    'Erro',
                    res.msg,
                    'error'
                    )
            }
        }).fail(function(){
            throw new Error('Erro de comunicação com o servidor.');
        });

    } catch (e){
        toastr.error(e);
    }        
});

var btnAtualizarConta = $('#btn-atualizar-conta');

$(".select-on-check-all").on('click', function () {
    setUrl();
});

$(".checkbox-conta").on('click', function () {
    setUrl();
});

function setUrl() {

    var id = [];

    $('.checkbox-conta').each(function () {
        if($(this).is(':checked')) {
            id.push($(this).val());
        }
    });

    if (id.length != 1){
        btnAtualizarConta.hide();
    }else {
        url = '/conta-bancaria/atualiza-conta-pedidos?conta_id='+id;
        btnAtualizarConta.show('show');
        btnAtualizarConta.attr('href', url);
    }
}


$(document).ready(function () {
    btnAtualizarConta.hide();
});