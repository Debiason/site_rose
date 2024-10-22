$(document).ready(function () {
    $(".content-bolsa-encerrada").hide();
    $(".content-bolsa-aberta").load('/bolsas/bolsas/index-bolsas-abertas');
});

function clickBolsasAbertas(){
    closeAbas();
    $( "#li-bolsas" ).addClass("menu-item-here");
    $(".content-bolsa-aberta").show();
    $(".content-bolsa-aberta").load('/bolsas/bolsas/index-bolsas-abertas');
    $("#label-sub-menu").text('Editais de Bolsa abertos para Inscrição');
    $("#label-encerrados").text('');
    $("#label-encerrados").removeClass();
}

function clickBolsasEmAndamento(){
    closeAbas();
    $( "#li-bolsas" ).addClass("menu-item-here");
    $(".content-bolsa-encerrada").show();
    $(".content-bolsa-encerrada").load('/bolsas/bolsas/index-bolsas-em-andamento');
    $("#label-sub-menu").text('Editais de Bolsa encerrados');
    $("#label-encerrados").text('Os candidatos selecionados para a entrevista foram comunicados por e-mail');
    $("#label-encerrados").addClass('label label-lg label-light-primary label-inline mt-2');
}

function clickBolsasEncerradas(){
    closeAbas();
    $( "#li-bolsas" ).addClass("menu-item-here");
    $(".content-bolsa-encerrada").show();
    $(".content-bolsa-encerrada").load('/bolsas/bolsas/index-bolsas-encerradas');
    $("#label-sub-menu").text('Editais de Bolsa encerrados');
    $("#label-encerrados").text('Os candidatos selecionados para a entrevista foram comunicados por e-mail');
    $("#label-encerrados").addClass('label label-lg label-light-primary label-inline mt-2');
}

function clickEstagiosAbertos(){
    closeAbas();
    $( "#li-estagios" ).addClass("menu-item-here");
    $(".content-estagio-aberto").show();
    $(".content-estagio-aberto").load('/bolsas/bolsas/index-estagios-abertos');
    $("#label-sub-menu").text('Editais de Estágio abertos para Inscrição');
    $("#label-encerrados").text('');
    $("#label-encerrados").removeClass();
}

function clickEstagiosEmAndamento(){
    closeAbas();
    $( "#li-estagios" ).addClass("menu-item-here");
    $(".content-estagio-encerrado").show();
    $(".content-estagio-encerrado").load('/bolsas/bolsas/index-estagios-em-andamento');
    $("#label-sub-menu").text('Editais de Estágio encerrados');
    $("#label-encerrados").text('Os candidatos selecionados para a entrevista foram comunicados por e-mail');
    $("#label-encerrados").addClass('label label-lg label-light-primary label-inline mt-2');
}

function clickEstagiosEncerrados(){
    closeAbas();
    $( "#li-estagios" ).addClass("menu-item-here");
    $(".content-estagio-encerrado").show();
    $(".content-estagio-encerrado").load('/bolsas/bolsas/index-estagios-encerrados');
    $("#label-sub-menu").text('Editais de Estágio encerrados');
    $("#label-encerrados").text('Os candidatos selecionados para a entrevista foram comunicados por e-mail');
    $("#label-encerrados").addClass('label label-lg label-light-primary label-inline mt-2');
}

function closeAbas(){

    $( ".menu-nav li" ).removeClass("menu-item-here");
    $(".content-bolsa-aberta").hide();
    $(".content-bolsa-encerrada").hide();
    $(".content-estagio-aberto").hide();
    $(".content-estagio-encerrado").hide();

}