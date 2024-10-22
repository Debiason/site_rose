$("button[id='btn-ativar-pessoa']").click(function () {
    getIds();
});

function getIds() {

    try {

        var id = [];
        var i = 0;

        $('.kv-row-checkbox:checked').each(function () {
            id[i] = $(this).val();
            i++;
        });

        if (id.length === 0) {
            throw new Error('Nenhum registro foi selecionado.');
        } else {

            //Ativa ou desativa o(s) registro(s) selecionado(s)
            $.ajax({
                url: '/pessoa/alterar-status/',
                data: {
                    id: id
                },
                async: false,
                success: function (resp) {
                    if (resp.data.success == false) {
                        throw new Error('Não foi possível realizar a alteração.');
                    } else {

                        if (resp.data.idsNaoAlterados.length == 0){
                            toastr.success('Alteração realizada com sucesso.');
                        }else {
                            Swal.fire(
                                'Atenção',
                                '<p>O(s) código(s) ' + resp.data.idsAlterados.join(', ') + ' FOI (FORAM) alterado(s) com sucesso.</p>'+
                                '<p>O(s) código(s) ' + resp.data.idsNaoAlterados.join(', ') + ' NÃO FOI (FORAM) alterado(s).</p>',
                                'warning'
                            )
                        }
                    }

                    window.location.reload();
                }
            });
        }
    } catch (e) {
        toastr.error(e);
    }

}