var fornecedorId = $("input[name='PreCadastroFornecedorForm[fornecedor_id]']").val();

var gridfieldFornecedorRepresentado = new Gridfield({
    element: '.gridfield-fornecedor-representado',
    type: 'advanced',
    actionCreate: '/fornecedores/fornecedor-representado/create-pre-cadastro',
    actionRead: '/fornecedores/fornecedor-representado/read',
    //actionUpdate: '/fornecedores/fornecedor-representado/update-pre-cadastro',
    deleteAjax: true,
    submitForm: true,
    allowEdit: '999999',
    actionDelete: '/fornecedores/fornecedor-representado/delete-pre-cadastro',
    mainParams: {
        'fornecedor_id': fornecedorId
    }
});

jQuery(document).ready(function() {
    gridfieldFornecedorRepresentado.init();
});

$(document).ready(function () {
    $("input[name='DocumentoFornecedor[anexo]']").attr('required', 'required');
});