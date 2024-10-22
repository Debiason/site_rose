$("#fld-afsearch").on('change', function () {
    var af_id = $(this).val();
    if (af_id) {
        $.ajax({
            url: '/entrega/get-info-af',
            type: 'post',
            data: {
                af_id: af_id
            },
            success: function (data) {
                var regiaoId = data.regiao || '';
                $("#fld-pessoajuridicaregiao").val(regiaoId).trigger('change');
                if (data.endereco) {
                    $("#entrega-departamento").val(data.endereco).trigger('change');
                }
            }
        });
    }
});

$("#entrega-chaveacesso").focus();

$("#entrega-chaveacesso").on('input', function () {
    var chaveacesso = $(this).val();
    chaveacesso = chaveacesso.replace(/\D+/g, '');

    var tipoNota = chaveacesso.substring(20, 22);

    if (tipoNota == 55) {
        chaveacesso = 'NFe' + chaveacesso;
    } else if (tipoNota == 57 || tipoNota == 67) {
        chaveacesso = 'CTe' + chaveacesso;
    }

    if (chaveacesso.length >= 47) {
        $(this).val(chaveacesso);
    }
});

$("#entrega-chaveacesso").on('input', function (e) {

    if ($(this).val().length == 47 || $(this).val().length == 44) {
        var value = $(this).val();
        $.ajax({
            url: '/entrega/get-info-nota',
            type: 'post',
            data: {
                chaveacesso: value
            },
            success: function (data) {
                $("#entrega-notafiscal").val(data.numero);

                let totalQuantidade = 0;
                let observacao = '';

                data.itens.forEach(function (item) {
                    totalQuantidade += 1;
                    observacao += `${item.descricao[0]} - Quantidade: ${item.quantidade[0]}, Valor Total: ${item.valortotal[0]};\n`;
                });

                $("#entrega-volumesencaminhados-disp").val(totalQuantidade);
                $("#entrega-volumesencaminhados").val(totalQuantidade);
                $("#entrega-observacoes").val(observacao);

                if (data.dadosAf.af_id) {
                    $("#entrega-departamento").val(data.dadosAf.local);
                    $("#fld-afsearch").append('<option value=' + data.dadosAf.af_id + '>' + data.dadosAf.label + '</option>');
                    $("#fld-afsearch").attr('style', 'width: 100%;');
                    $("#fld-afsearch").select2();
                    setTimeout(function () {
                        $("#fld-afsearch").val(data.dadosAf.af_id).trigger('change');
                    }, 300);
                }

            }
        })
    }

    $("#dados-formulario").show('slow');
});

$("#form-entrega-danfe").on('keypress', function (e) {
    if (e.which === 13) {
        e.preventDefault();
    }
});