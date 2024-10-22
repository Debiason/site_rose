var checkboxModalidadeNaoEncontrado = document.getElementById('modalidadeNaoEncontrado');
var dadosNovaModalidade = $('#dadosNovaModalidade');
var comboModalidadeInscricao = $("select[id='fld-modalidade_inscricao']");
var divModalidadeInscricao = $('#div_modalidade_inscricao');

dadosNovaModalidade.hide("slow");

if (checkboxModalidadeNaoEncontrado.checked) {
    dadosNovaModalidade.show('slow');
    divModalidadeInscricao.hide('slow');
    verificaSelect()
} else {
    dadosNovaModalidade.hide('slow');
    divModalidadeInscricao.show('slow');
}

$("#modalidadeNaoEncontrado").on('click', function () {
    if ($(this).is(':checked')) {
        dadosNovaModalidade.show("slow");
        divModalidadeInscricao.hide('slow');
        verificaSelect();
    } else {
        dadosNovaModalidade.hide("slow");
        divModalidadeInscricao.show('slow');
    }
});

function verificaSelect() {
    if (comboModalidadeInscricao.val() == '') {
        comboModalidadeInscricao.val('1');
    }
}