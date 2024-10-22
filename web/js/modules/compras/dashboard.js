$(document).ready(function () {
    $(".content-selecao-publica-encerrada").hide();
    $(".content-selecao-publica-em-analise").hide();
    $(".content-selecao-publica-aberta").load('/compras/processo-compra/index-abertos');
});

function clickAbertas(){
    closeAbas();
    $( "#li-selecao-publica" ).addClass("menu-item-here");
    $(".content-selecao-publica-aberta").show();
    $(".content-selecao-publica-aberta").load('/compras/processo-compra/index-abertos');
    $("#label-sub-menu").text('Abertos para cotação');
}

function clickEmAnalise(){
    closeAbas();
    $( "#li-selecao-publica" ).addClass("menu-item-here");
    $(".content-selecao-publica-em-analise").show();
    $(".content-selecao-publica-em-analise").load('/compras/processo-compra/index-em-analise');
    $("#label-sub-menu").text('Encerrados/Em análise técnica');
}

function clickEncerradas(){
    closeAbas();
    $( "#li-selecao-publica" ).addClass("menu-item-here");
    $(".content-selecao-publica-encerrada").show();
    $(".content-selecao-publica-encerrada").load('/compras/processo-compra/index-encerrados');
    $("#label-sub-menu").text('Encerrados');
}

function clickPregaoAberto(){
    closeAbas();
    $( "#li-pregao" ).addClass("menu-item-here");
    $(".content-pregao-aberto").show();
    $(".content-pregao-aberto").load('/compras/processo-compra/index-pregao-aberto');
    $("#label-sub-menu").text('Abertos para cotação');
}

function clickPregaoEncerrado(){
    closeAbas();
    $( "#li-pregao" ).addClass("menu-item-here");
    $(".content-pregao-encerrado").show();
    $(".content-pregao-encerrado").load('/compras/processo-compra/index-pregao-encerrado');
    $("#label-sub-menu").text('Encerrados');
}

function clickTomadaPrecoAberto(){
    closeAbas();
    $( "#li-tomada-preco" ).addClass("menu-item-here");
    $(".content-tomada-preco-aberto").show();
    $(".content-tomada-preco-aberto").load('/compras/processo-compra/index-tomada-preco-aberto');
    $("#label-sub-menu").text('Abertos para cotação');
}

function clickTomadaPrecoEncerrado(){
    closeAbas();
    $( "#li-tomada-preco" ).addClass("menu-item-here");
    $(".content-tomada-preco-encerrado").show();
    $(".content-tomada-preco-encerrado").load('/compras/processo-compra/index-tomada-preco-encerrado');
    $("#label-sub-menu").text('Encerrados');
}

function clickInexigibilidade(){
    closeAbas();
    $( "#li-inexigibilidade" ).addClass("menu-item-here");
    $(".content-inexigibilidade").show();
    $(".content-inexigibilidade").load('/compras/processo-compra/index-inexigibilidade');
    $("#label-sub-menu").text('');
}

function clickDispensa(){
    closeAbas();
    $( "#li-dispensa" ).addClass("menu-item-here");
    $(".content-dispensa").show();
    $(".content-dispensa").load('/compras/processo-compra/index-dispensa');
    $("#label-sub-menu").text('');
}

function closeAbas(){

    $( ".menu-nav li" ).removeClass("menu-item-here");
    $(".content-selecao-publica-aberta").hide();
    $(".content-selecao-publica-encerrada").hide();
    $(".content-selecao-publica-em-analise").hide();
    $(".content-pregao-aberto").hide();
    $(".content-pregao-encerrado").hide();
    $(".content-tomada-preco-aberto").hide();
    $(".content-tomada-preco-encerrado").hide();
    $(".content-inexigibilidade").hide();
    $(".content-dispensa").hide();

}