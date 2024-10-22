$("#checkAllCategorias").on('click', function(){
    var $checkboxs = $("#categoriasFornecidas input[type=checkbox]");

    if($checkboxs === "undefined" || $checkboxs.length === 0) return false;

    if($(this).is(':checked')){
        $checkboxs.each(function(){
            $(this).prop('checked', true);
        });
    } else {
        $checkboxs.each(function(){
            $(this).prop('checked', false);
        })
    }
});


