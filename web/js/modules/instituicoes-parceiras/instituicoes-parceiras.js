var fldPesquisar = $("#search-instituicao");

$(document).ready(function () {
    $(".content-instituicoes-finalizadas").hide();
    $(".content-instituicoes-andamento").hide();
    $(".content-instituicoes-ativas").load('/instituicoes-parceiras/instituicao-parceira/index?status=ativas');
});

function clickAtivas() {
    fldPesquisar.val(null);
    closeAbas();
    $("#instituicoes-ativas").addClass("active");
    $(".content-instituicoes-ativas").show();
    $(".content-instituicoes-ativas").load('/instituicoes-parceiras/instituicao-parceira/index?status=ativas');
}

function clickEmAndamento() {
    fldPesquisar.val(null);
    closeAbas();
    $("#instituicoes-andamento").addClass("active");
    $(".content-instituicoes-andamento").show();
    $(".content-instituicoes-andamento").load('/instituicoes-parceiras/instituicao-parceira/index?status=andamento');
}

function clickFinalizada() {
    fldPesquisar.val(null);
    closeAbas();
    $("#instituicoes-finalizadas").addClass("active");
    $(".content-instituicoes-finalizadas").show();
    $(".content-instituicoes-finalizadas").load('/instituicoes-parceiras/instituicao-parceira/index?status=finalizadas');
}

function closeAbas() {
    $(".nav-link").removeClass("active");
    $(".content-instituicoes-ativas").hide();
    $(".content-instituicoes-finalizadas").hide();
    $(".content-instituicoes-andamento").hide();
}

function findInstituicao() {
    var find = fldPesquisar.val();

    if (find == '') {
        clickAtivas();
    } else {
        closeAbas();
        $(".content-instituicoes-ativas").show();
        $(".content-instituicoes-ativas").load('/instituicoes-parceiras/instituicao-parceira/find-instituicao?q=' + find);
    }

}