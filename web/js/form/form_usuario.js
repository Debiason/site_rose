var pessoa = $("#pessoa_id"),
    msgEmailNaoEncontrado = $("#msgEmailNaoEncontrado");

pessoa.change(setEmail);

function setEmail() {
    $.ajax({
        url: '/pessoa/getemail/',
        data: {
            pessoaId: pessoa.val()
        },
        async: false,
        success: function (resp) {

            $("#usuario-email").val(resp);

            if (resp == '') {
                msgEmailNaoEncontrado.show('slow');
            } else {
                msgEmailNaoEncontrado.hide('slow');
            }
        }
    });
}

function existeFornecedor() {
    var pessoaId = $("#pessoa_id").val()
    $.ajax({
        url: '/pessoa/get-info-fornecedor/?pessoaId=' + pessoaId,
        async: false,
        success: function (resp) {
            var existeNaTabelaFornecedor = resp;
            var valorPerfil = $("#perfil").val();
            if(valorPerfil === "Fornecedor" && existeNaTabelaFornecedor == 0 ){
                $("#botao_salvar").attr('disabled', true);
                $("#erro_fornecedor-texto").show('slow');
            } else {
                $('#botao_salvar').attr('disabled', false);
                $("#erro_fornecedor-texto").hide('slow');
            }
        }
    });
}

$("#perfil").change(existeFornecedor);
$("#pessoa_id").change(existeFornecedor);

function verificaUnidade(){
    var setorDropdown = $('setor-dropdown');
    if ($('#usuario-unidade_fundacao_id').val() !== '') {
        $('#usuario-setor_id').show();
        $("label[for='usuario-setor_id']").show()
    } else {
        $('#usuario-setor_id').hide();
        $("label[for='usuario-setor_id']").hide()
    }
}

$('#usuario-unidade_fundacao_id').change(verificaUnidade)
$(document).ready(verificaUnidade);

$("#botao_salvar").on('click', function (e) {

    if ($("#perfil").val() == '' && $("#pessoa_id").val() != '') {
        e.preventDefault();
    }

    setTimeout(function () {
        if ($("#perfil").val() == '') {
            $("#perfil").addClass('is-invalid');
            $("#erro-perfil-texto").show();
            $("#erro-perfil-texto").css({
                "margin-top": "-9px",
                "margin-bottom": "10px",
            });
        } else {
            $("#erro-perfil-texto").hide();
            $("#perfil").addClass('is-valid');
        }
    }, 300);
});

$("#perfil").on('select2:select', function () {
    $("#erro-perfil-texto").hide();
    $("#perfil").addClass('is-valid');
});