ajaxGetDadosPessoaJuridica();

$("#fld-pessoajuridicadois").change(function () {
    ajaxGetDadosPessoaJuridica();
});

function ajaxGetDadosPessoaJuridica() {

    if ($("#fld-pessoajuridicadois").val() != '') {
        $("#div-endereco").show('slow');
    }

    $.ajax({
        url: '/pessoa/getdados',
        data: {
            id: $("#fld-pessoajuridicadois").val()
        },
        async: false,
        success: function (response) {
            var enderecoPartes = [
                response.enderecorua,
                response.endereconumero,
                response.enderecocomplemento,
                response.enderecobairro,
                response.enderecocidade + ' - ' + response.enderecoestado,
                formatarCep(response.enderecocep)
            ];

            var enderecoCompleto = enderecoPartes.filter(Boolean).join(', ');

            $('#afinterna-endereco').val(enderecoCompleto);
        }
    });
}
function formatarCep(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep.length === 8) {
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    return cep;
}