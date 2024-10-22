$(document).ready(function () {
    $(document).on('change', '#fld-projeto_id', function (event) {
        $("#dados-compra-direta").hide('slow');
        getDadosAcordo();
    });

    $(document).on('click', '#btn-compra-direta', function () {
         $("#option-compra-direta").hide('slow');
        $("#dados-nova-compra").hide('slow');
        $("#dados-compra-direta").show('slow');
    });

    $(document).on('click', '#btn-novo-pedido', function () {
        $("#option-compra-direta").hide('slow');
        $("#dados-nova-compra").show('slow');
        $("#dados-compra-direta").hide('slow');
    });
});

function getDadosAcordo() {

    if ($("#fld-projeto_id").val() != undefined) {

        var acordoId = $("#fld-projeto_id").val();
        var dtminima = new Date();
        var dtvigencia;

        dtminima.setDate(dtminima.getDate() + 15);
        dtminima.setHours(0, 0, 0, 0);

        $.ajax({
            url: '/acordo/getdtvigenciapedidocompra/',
            data: {
                acordoId: acordoId
            },
            async: false,
            success: function (resp) {
                dtvigencia = new Date(resp);
                dtvigencia.setHours(0, 0, 0, 0);
            }
        });

        $.ajax({
            url: '/acordo/dados-extras/',
            data: {
                acordoId: acordoId
            },
            async: false,
            success: function (resp) {
                let permiteCompraDireta = resp.permite_compra_direta_passagem;

                if (permiteCompraDireta) {
                    $("#option-compra-direta").show('slow');
                    $("#dados-compra-diret").hide('slow');
                    $("#dados-nova-compra").hide('slow');
                } else {
                    $("#option-compra-direta").hide('slow');
                    $("#dados-nova-compra").show('slow');
                    $("#dados-compra-direta").hide('slow');
                }

            }
        });

        $.ajax({
            url: '/acordo/getsaldotipo/',
            data: {
                id: acordoId
            },
            success: function (resp) {
                var valorFormatado = "R$ " + $.convertFloatToMoeda(resp.saldo);

                $("span[id='saldoProjeto']").text(valorFormatado);

                if (resp.saldo < 0.00) {
                    $("#enviar-btn").prop("disabled", true);
                    $("#saldoNegativo").show("slow");
                } else {
                    $("#enviar-btn").prop("disabled", false);
                    $("#saldoNegativo").hide("slow");
                }
            }
        });

        if (dtvigencia < dtminima) {
            $('.validaVigencia').html("O projeto precisa ter pelo menos 15 dias de vigência para prosseguir com o pedido.").css('color', 'red');
            $('#fld-projeto_id').css('color', 'red');
            return false;
        } else {
            $('.validaVigencia').html("");
            $('#fld-projeto_id').css('color', 'black');
        }
    }

    return true;
}