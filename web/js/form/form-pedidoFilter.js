var divDtTransacao =  $("#div-dttransacao");

$("#rubrica").on('change',function () {
    var rubrica = $("#rubrica").val();
    if (rubrica){
        divDtTransacao.show("slow");
    }else{
        divDtTransacao.hide("slow");
    }
});