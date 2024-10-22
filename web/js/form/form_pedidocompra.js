var camposDevolucao = $("#devolucao"),
    comboSituacao = $("#fld-situacao"),
    btnDevolucao = $("#btn-devolver-item-correcao");

var btnSalvar = $("input[name='salvar']");

comboSituacao.change(verificaSituacao);
btnDevolucao.click(verificaSituacao);

function verificaSituacao() {

    var situacaoId = comboSituacao.val();

    if (situacaoId == 202 || situacaoId == 203) {
        camposDevolucao.show('slow');
        $('#compra-motivo_devolucao').attr('required', true);

    } else {
        camposDevolucao.hide('slow');
        $('#compra-motivo_devolucao').attr('required', false);
    }
}