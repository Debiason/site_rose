$(function () {
    var acordo_id = String($("#fld-acordo").val()).replace(/\D/g, '');
    var enderecoentrega_id = String($("#fld-enderecoentrega").val()).replace(/\D/g, '');
    var pedido_id = String($("#fld-hidden-pedido").val()).replace(/\D/g, '');

    if (acordo_id) {
        $(".body-radio-entrega").load('/endereco-entrega/radio-button-options?acordo_id=' + acordo_id
            + '&enderecoentrega_id=' + enderecoentrega_id + '&pedido_id=' + pedido_id);
    }

    $('#fld-acordo').on('select2:select', function (e) {
        try {
            var data = e.params.data;

            if (typeof data !== 'object')
                throw new Error('Os dados não são do tipo objeto, são ' + (typeof data) + '(s). Dados: ' + data);
            if (!data.hasOwnProperty('id'))
                throw new Error('Propriedade ID não encontrada em objeto.');

            $("#fld-enderecoentrega").val('');
            var acordo_id = data.id;

            console.log($('#produto-id-carrinho').val());
            if ($('#tipo-entrega').val() == 'fisica') {
                $("#modalEnderecoEntrega").modal('show');
            }
            setTimeout(function(){
                $(".body-radio-entrega")
                    .load('/endereco-entrega/radio-button-options?acordo_id=' + acordo_id);
            },500);

        } catch (e) {
            toastr.error(e.message);
        }
    });
});

$(".btn-adicionar").on('click', function (e) {
    var acordo = $('#fld-acordo').val();
    var finalidade = $('#compra-finalidade').val();
    var enderecoentrega = $('#fld-enderecoentrega').val();
    var responsavelnome = $('#compra-responsavelnome').val();
    var responsaveltelefone = $('#compra-responsaveltelefone').val();
    var responsavelcelular = $('#compra-responsavelcelular').val();
    var responsavelemail = $('#compra-responsavelemail').val();

    var erro = [];
    if (!acordo && $('#produto-id-carrinho').val() == 11778)
        erro.push('"Projeto" não pode ficar em branco.');
    if (!finalidade)
        erro.push('"Finalidade" não pode ficar em branco.');
    if (!enderecoentrega && $('#tipo-entrega').val() == 'fisica')
        erro.push('"Endereço de entrega" não pode ficar em branco.');
    if (!responsavelnome)
        erro.push('"Nome do técnico" não pode ficar em branco.');
    if (!responsaveltelefone)
        erro.push('"Telefone" não pode ficar em branco.');
    if (!responsavelcelular)
        erro.push('"Celular" não pode ficar em branco.');
    if (!validateEmail(responsavelemail))
        erro.push('"E-mail" não é um endereço de e-mail válido.');

    if (erro.length > 0) {
        for (var i = 0; i < erro.length; i++) {
            toastr.error(erro[i]);
        }

        e.preventDefault();
        return false;
    }

    if ($.getItensCarrinho() == null || $.getItensCarrinho().length == 0) {
        toastr.error('Seu carrinho está vazio', 'Erro')
        return false;
    }
    $("#w0").submit();
});

$("button[id='btn-open-modal']").on('click', function (e) {
    console.log('clique');
    $("#modalAviso").modal('show');
});

var btnModal = $("#btnModalConfirmacao"),
    btnConfirmacaoNoModal = $("#btnConfirmacaoNoModal"),
    btnSubmitForm = $("button[name='salvar']"),
    comboSituacao = $("select[name='Compra[situacao_id]']"),
    fldManterEmpenho = $("input[name='Compra[manter_empenho]']"),
    btnSalvarEscolha = $("button[id='btn-salvar-escolha']");

const situacaoInicial = $("select[name='Compra[situacao_id]']").val();

btnConfirmacaoNoModal.click(function () {

    // btnConfirmacaoNoModal.attr('disabled', 'disabled');
    // setTimeout(function () {
    //     btnConfirmacaoNoModal.attr('disabled', false);
    // }, 3000);

    var radioManterEmpenho = $("input[name='Compra[manter_empenho]']:checked").val();
    var fldJustificativa = $("textarea[name='Compra[justificatica_manter_empenho]']");
    if (radioManterEmpenho == 0) {
        $(".conteudo-modal").hide('slow');
        $(".conteudo-load-modal").show('slow');
    } else if (radioManterEmpenho == 1 && fldJustificativa.val() != '') {
        $(".conteudo-modal").hide('slow');
        $(".conteudo-load-modal").show('slow');
    }
});

comboSituacao.change(function () {

    var situacaoId = comboSituacao.val();

    //Verifica se a situacao antiga e 'em processo de compra' e a nova e 'em analise'
    if (situacaoInicial == 93 && (situacaoId == 92 || situacaoId == 202)) {

        //Verifica se existem empenhos compra para esta compra
        $.ajax({
            url: '/compra/verifica-empenho-compra/',
            data: {
                id: $('#fld-hidden-pedido').val()
            },
            async: false,
            success: function (resp) {

                if (resp.empenhoCompra) {
                    btnModal.show();
                    btnSubmitForm.hide();

                    var radioManterEmpenho = $("input[name='Compra[manter_empenho]']:checked").val();
                    var fldJustificativa = $("textarea[name='Compra[justificatica_manter_empenho]']");
                    if (radioManterEmpenho == 1) {
                        fldJustificativa.attr('required', true);
                    } else {
                        fldJustificativa.attr('required', false);
                    }

                    if (resp.af) {

                        var texto = "<strong>ATENÇÃO:</strong> Este pedido de compra possui empenhos associados e AF gerada.\n" +
                            "                    <br/>\n" +
                            "                    <strong>Os empenhos não podem ser desativados.<br/><br/>" +
                            " Deseja manter os empenhos já existentes?</strong>";
                        $(".texto-info-modal").html(texto);

                        $("input[name='Compra[manter_empenho]']").attr('disabled', true);

                    } else {
                        var texto = "<strong>ATENÇÃO:</strong> Este pedido de compra possui empenhos associados. <br/>\n" +
                            "                    <br/>\n" +
                            "                    <strong>Deseja manter os empenhos já existentes?</strong>";
                        $(".texto-info-modal").html(texto);
                        $("input[name='Compra[manter_empenho]']").attr('disabled', false);

                    }
                }
            }
        });
    }
});

fldManterEmpenho.change(function () {
    var radioManterEmpenho = $("input[name='Compra[manter_empenho]']:checked").val();
    var fldJustificativa = $("textarea[name='Compra[justificatica_manter_empenho]']");
    if (radioManterEmpenho == 1) {
        fldJustificativa.attr('required', true);
    } else {
        fldJustificativa.attr('required', false);
    }
});

btnSalvarEscolha.click(function (event) {
    $("#modalEnderecoEntrega").modal('hide');
});

