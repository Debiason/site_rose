(function () {
    'use strict'

    document.querySelector('#navbarSideCollapse').addEventListener('click', function () {
        document.querySelector('.offcanvas-collapse').classList.toggle('open')
    })
})()

$(document).ready(function(){

    if($(".menu-detalhes-relatorios")){
        var nomeRelatorio = $(".relatorio-projeto").data("relatorio");
        $(".menu-detalhes-relatorios").find('a').removeClass('active');
        $('a[href*='+nomeRelatorio+']').addClass("active");
    }

});