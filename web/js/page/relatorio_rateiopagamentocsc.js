$(".kv-row-checkbox").change(function () {
    barraDeStatus();
});

$(".select-on-check-all").change(function () {
    barraDeStatus();
});

function barraDeStatus() {
    //exibe barra de status
    $('#BarraDeStatus').show("slow");

    var superm = 0;
    var valor_super = 0;
    var lat = 0;
    var valor_lat = 0;
    var adm = 0;
    var valor_adm = 0;
    var total = 0;

    $('.kv-row-checkbox:checked').each(function() {
        if ($(this).closest('tr').find('.categoria').length > 0){
            superm += $.convertMoedaToFloat($(this).closest('tr').find('.super').text());
            valor_super += $.convertMoedaToFloat($(this).closest('tr').find('.valor_super').text());
            lat += $.convertMoedaToFloat($(this).closest('tr').find('.lat').text());
            valor_lat += $.convertMoedaToFloat($(this).closest('tr').find('.valor_lat').text());
            adm += $.convertMoedaToFloat($(this).closest('tr').find('.adm').text());
            valor_adm += $.convertMoedaToFloat($(this).closest('tr').find('.valor_adm').text());
            total += $.convertMoedaToFloat($(this).closest('tr').find('.total').text());
        }
    });

    if (superm > 0 ){
        $('#super').html("Valor Super: R$ " + $.convertFloatToMoeda(superm));
        $('#super').show("slow");
    }else{
        $('#super').hide("slow");
    }

    if (valor_super > 0 ){
        $('#valor_super').html("CSC p/ Super: R$ " + $.convertFloatToMoeda(valor_super));
        $('#valor_super').show("slow");
    }else{
        $('#valor_super').hide("slow");
    }

    if (lat > 0 ){
        $('#lat').html("Valor Lat: R$ " + $.convertFloatToMoeda(lat));
        $('#lat').show("slow");
    }else{
        $('#lat').hide("slow");
    }

    if (valor_lat > 0 ){
        $('#valor_lat').html("CSC p/ Lat: R$ " + $.convertFloatToMoeda(valor_lat));
        $('#valor_lat').show("slow");
    }else{
        $('#valor_lat').hide("slow");
    }

    if (adm > 0 ){
        $('#adm').html("Valor Projetos: R$ " + $.convertFloatToMoeda(adm));
        $('#adm').show("slow");
    }else{
        $('#adm').hide("slow");
    }

    if (valor_adm > 0 ){
        $('#valor_adm').html("CSC p/ Projetos: R$ " + $.convertFloatToMoeda(valor_adm));
        $('#valor_adm').show("slow");
    }else{
        $('#valor_adm').hide("slow");
    }

    if (total > 0 ){
        $('#total').html("Total: R$ " + $.convertFloatToMoeda(total));
        $('#total').show("slow");
    }else{
        $('#total').hide("slow");
    }

}