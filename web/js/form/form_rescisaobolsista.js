var fldSituacao = $('#fld-situacao');
var fldFinalidade = $('.field-rescisaobolsista-finalidade');

fldFinalidade.hide();

var situacaoOld = fldSituacao.val();
fldSituacao.change(function () {
    var situacao = $(this).val();
    console.log(situacao);
    if (situacao == "288") {
        $('#devolucao-solicitacaobolsista').show("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', 'required');
    } else {
        $('#devolucao-solicitacaobolsista').hide("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', false);
    }

    if (situacaoOld == 289 && situacao == 286) {
        $('#devolucao-solicitacaobolsista').show("slow");
        $('#contratacaobolsista-motivo_devolucao').attr('required', 'required');
    }
});

$(".btnImplementarBolsista").click(function () {
    var btn = $(this);

    btn.prop('disabled', true);
    btn.html('Aguarde ...');

    setTimeout(function(){
        btn.prop('disabled', false);
        btn.html('Rescindir Bolsa');
    }, 5000);
});

$('.multiple-input-list__item:nth-child(2) .multiple-input-list__btn').css('display', 'none');
$('.multiple-input-list__item:nth-child(3) .multiple-input-list__btn').css('display', 'none');

$('form').submit(function() {
    $(this).find('select[disabled]').prop('disabled', false);
});
