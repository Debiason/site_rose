var btnAtribuir = $("input[name='atribuir']");
var idsSelecionados = $("input[name='idsSelecionados']");
var idItens = $("input[name='idItens']");


console.log('1');

$(document).ready(function () {

    var x = document.getElementById("idsSelecionados");   // Get the element with id="demo"

    console.log('2');

    console.log(x);

/*
    idItens.val(idsSelecionados.val());

    console.log('2',idItens);*/
});

btnAtribuir.click(function (event) {
    event.preventDefault();


});