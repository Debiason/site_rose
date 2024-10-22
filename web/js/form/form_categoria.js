var fornecedorId = $("input[name='PreCadastroFornecedorForm[fornecedor_id]']").val();

var gridfieldCategoriasFornecidas = new Gridfield({
    element: '.gridfield-categoria-fornecida',
    type: 'advanced',
    actionCreate: '/fornecedores/categoria-fornecida/create-pre-cadastro',
    actionRead: '/fornecedores/categoria-fornecida/read',
    actionUpdate: '/fornecedores/categoria-fornecida/update-pre-cadastro',
    deleteAjax: true,
    submitForm: true,
    actionDelete: '/fornecedores/categoria-fornecida/delete-pre-cadastro',
    mainParams: {
        'fornecedor_id': fornecedorId
    }
});

jQuery(document).ready(function() {
    gridfieldCategoriasFornecidas.init();
});