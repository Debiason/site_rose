var btnAceite = $("#btn-continuar");
var projeto_id = $("#fld-projeto_id");

$(document).ready(function () {

    $('#gas-etapa1 p').css('font-size', '16px');

    if ($("#fld-projeto_id").val() !== "") {
        $("#dados-nova-compra").show();
    }

    $("#fld-projeto_id").on('change', function (event) {
        $.ajax({
            url: '/projeto-extra/get-projeto-permite-compra-gas',
            data: {
                acordoId: $(this).val(),
            },
            async: false,
            success: function (resp) {
                if (resp === false) {
                    $('.validaCompraGas').html('Este projeto não permite a compra de gás.').css('color', 'red');
                    $('.validaCompraGas').show();
                    $("#options").hide('slow');
                } else {
                    $("#options").show('slow');
                    $('.validaCompraGas').html('');
                    $('.validaCompraGas').hide();
                }
            },
        });
    });

    $('#toggleCheckbox').change(function () {
        btnAceite.toggleClass('disabled');
    });

    btnAceite.on('click', function () {
        if (!btnAceite.hasClass('disabled')) {
            $('#gas-etapa2').show('slow');
            $('#gas-etapa1').hide('slow');
        } else {
            toastr.info('Você deve aceitar os termos de uso para continuar.');
        }
    });

    $('#btn-possui-cilindro').on('click', function () {
        $("#options").hide('slow');
        $("#options-com-cilindro").show('slow');
        $("#div-btn-voltar").show('slow');
    });

    $('#btn-nao-possui-cilindro').on('click', function () {
        $("#options").hide('slow');
        $("#options-sem-cilindro").show('slow');
        $("#div-btn-voltar").show('slow');
    });

    $('#btn-novo-pedido-locacao').on('click', function () {
        $(".dados-compra-gas").show('slow');
        $("#options").hide('slow');
    });

    $('#btn-novo-pedido-cilindro').on('click', function () {
        $.iniciarEtapa2('/compra/nova-etapa2/?produto_id=16184&projeto_id=' + projeto_id.val());
    });

    $('#btn-cilindro-alugado').on('click', function () {
        $.iniciarEtapa2('/compra/nova-etapa2/?grupo_id=89&classe_id=654&projeto_id=' + projeto_id.val() + '&aviso=1');
    });

    $("#btn-cilindro-proprio").on('click', function () {
        $("#options-after-cilindro-proprio").show('slow');
        $("#options-com-cilindro").hide('slow');
    });

    $('#btn-pagamento-direto').on('click', function () {
        var acordoValue = $("#fld-projeto_id").val();
        var url = "/pagamento-nota-fiscal/create?acordo=" + acordoValue + "&cilindro=1";
        window.location.href = url;
    });

    $("#btn-novo-pedido-gas").on('click', function () {
        $.iniciarEtapa2('/compra/nova-etapa2/?grupo_id=89&classe_id=654&projeto_id=' + projeto_id.val());
    });

    $("#btn-voltar-options").on('click', function () {
       $("#options").show('slow');
       $("#options-com-cilindro").hide('slow');

        $(".dados-compra-gas").hide('slow');
        $("#options-sem-cilindro").hide('slow');
        $("#options-com-cilindro").hide('slow');
        $("#options-after-cilindro-proprio").hide('slow');
    });
});