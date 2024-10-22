
document.querySelector("#semCc").style.display = 'block';
document.querySelector("#comCc").style.display = 'none';

$('#fld-centrocusto').change(function () {
    var centroCusto = document.getElementById('fld-centrocusto');

    if (centroCusto.options[centroCusto.selectedIndex].value == "" ) {
        document.querySelector("#comCc").style.display = 'none';
        document.querySelector("#semCc").style.display = 'block';
    }else{
        document.querySelector("#comCc").style.display = 'block';
        document.querySelector("#semCc").style.display = 'none';
    }
});


