var acordo = document.getElementById('fld-relatorio-projeto_evento');

if (acordo.options[acordo.selectedIndex].value == "") {
    console.log('vazio')
    document.querySelector("#comAcordo").style.display = 'none';
    document.querySelector("#semAcordo").style.display = 'block';
}else{
    console.log('cheio')
    document.querySelector("#semAcordo").style.display = 'none';
    document.querySelector("#comAcordo").style.display = 'block';
}
$('#fld-relatorio-projeto_evento').change(function () {
    var acordo = document.getElementById('fld-relatorio-projeto_evento');

    if (acordo.options[acordo.selectedIndex].value == "") {

        document.querySelector("#comAcordo").style.display = 'none';
        document.querySelector("#semAcordo").style.display = 'block';
    } else {

        document.querySelector("#comAcordo").style.display = 'block';
        document.querySelector("#semAcordo").style.display = 'none';
    }
});