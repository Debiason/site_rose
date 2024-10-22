$("#marcar-desmarcar").click(function(){
    if ($(this).prop( "checked")){
        marcardesmarcar(true);
    }else{
        marcardesmarcar(false);
    }
});

function marcardesmarcar(bool){
    $('.fld-recalcular-ordem').each(
        function(){
            $(this).prop("checked", bool);
        }
    );
}