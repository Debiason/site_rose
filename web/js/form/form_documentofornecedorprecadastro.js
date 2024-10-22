var fornecedorId = $("input[name='PreCadastroFornecedorForm[fornecedor_id]']").val();

var gridfieldDocumentoFornecedor = new Gridfield({
    element: '.gridfield-documento-fornecedor',
    type: 'advanced',
    actionCreate: '/fornecedores/documento-fornecedor/create-pre-cadastro',
    actionRead: '/fornecedores/documento-fornecedor/read',
    actionUpdate: '/fornecedores/documento-fornecedor/update-pre-cadastro',
    deleteAjax: true,
    submitForm: true,
    actionDelete: '/fornecedores/documento-fornecedor/delete-pre-cadastro',
    mainParams: {
        fornecedor_id: fornecedorId
    }
});

jQuery(document).ready(function() {
    gridfieldDocumentoFornecedor.init();
});

// $('#documentofornecedor-essencialpagamento').ready(function () {
//     if ($('#documentofornecedor-essencialpagamento').is(':checked')) {
//         $('#fld-essencial').val('<span class=letras-verdes>Sim</span>');
//     } else {
//         $('#fld-essencial').val('<span class=valor-debito>Não</span>');
//     }
// });
//
// $('#documentofornecedor-essencialpagamento').change(function () {
//     if ($('#documentofornecedor-essencialpagamento').is(':checked')) {
//         $('#fld-essencial').val('<span class=letras-verdes>Sim</span>');
//     } else {
//         $('#fld-essencial').val('<span class=valor-debito>Não</span>');
//     }
// });

$('#documentofornecedor-dtvencimento').change(function () {
    var date = $('#documentofornecedor-dtvencimento').val();
    var partes = date.split('-');
    var dataFormatada = partes[2]+'/'+partes[1]+'/'+partes[0];
    $('#fld-dt_vencimento').val(dataFormatada);
});

$('#documentofornecedor-anexo').change(function (event) {
    var selectedFile = document.getElementById('documentofornecedor-anexo').files[0];
    $('#fld-anexo').val(selectedFile.name);
});


