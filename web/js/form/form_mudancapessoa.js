var fldMotivo = $('#mudancapessoa-motivo_devolucao');
var labelMotivo = $("label[for='mudancapessoa-motivo_devolucao']");
var fldSituacao = $('#mudancapessoa-situacao_id');

fldSituacao.change(mostraMotivo);
document.ready(mostraMotivo);

function mostraMotivo() {
    if ($(this).val() == '251'){
        fldMotivo.show();
        labelMotivo.show();
        fldMotivo.prop('required', true);
    } else {
        fldMotivo.hide();
        labelMotivo.hide();
        fldMotivo.prop('required', false);
    }
}