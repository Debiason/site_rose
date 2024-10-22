document.querySelector("#semCc").style.display = 'block';
document.querySelector("#comCc").style.display = 'none';
document.querySelector('#i0').required = true;
document.querySelector('#i1').required = true;

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


