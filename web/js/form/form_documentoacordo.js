var tipoDocumento = $("select[name='DocumentoAcordo[checklistacordo_id]']");
var divPessoa = $("#pessoa-relacionada");

tipoDocumento.change(verificaAssociacaoPessoa);

function verificaAssociacaoPessoa() {
    $.ajax({
        url: '/documento-acordo/get-tipo-possui-pessoa/',
        data: {
            tipoDocumento: tipoDocumento.val()
        },
        async: false,
        success: function (resp) {
           if (resp)  {
               divPessoa.show('slow');
           } else {
               divPessoa.hide('slow');
           }
        }
    });
}