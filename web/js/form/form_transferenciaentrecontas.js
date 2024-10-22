var fldcheckboxConta = $("input[name='TransferenciaEntreContas[informarConta]']"),
    fldcheckboxPortador = $("input[name='TransferenciaEntreContas[informarPortador]']"),
    divContas = $('#informacaoConta'),
    divPortador = $('#informacaoPortador'),
    inputPortadorDestino = document.getElementById('transferenciaentrecontas-portador_destino'),
    inputPortadorOrigem = document.getElementById('transferenciaentrecontas-portador_origem');
fldcheckboxConta.on('click', function () {
    verificaChecked(fldcheckboxConta, divContas,fldcheckboxPortador,divPortador);
    limparCampos(divPortador);
});

fldcheckboxPortador.on('click', function () {
    verificaChecked(fldcheckboxPortador, divPortador,fldcheckboxConta,divContas);
    limparCampos(divContas);
});

$(document).ready(function () {
    verificaChecked(fldcheckboxConta, divContas,fldcheckboxPortador,divPortador);
    verificaChecked(fldcheckboxPortador, divPortador,fldcheckboxConta,divContas);
});

function verificaChecked(check, div, naocheck,escondeDiv){
    if (check.is(':checked')) {
        div.removeClass('d-none');
        naocheck.prop('checked', false);
        escondeDiv.addClass('d-none');
    } else {
        div.addClass('d-none');
    }
}

function limparCampos(div){
    if(div == fldcheckboxPortador){
        $("#transferenciaentrecontas-portador_destino").val(' ');
        $("#transferenciaentrecontas-portador_origem").val(' ');
    }else{
        $("#transferenciaentrecontas-agencia_d").val(' ');
        $("#transferenciaentrecontas-agenciadigito_d").val(' ');
        $("#transferenciaentrecontas-conta_d").val(' ');
        $("#transferenciaentrecontas-contadigito_d").val(' ');
        $("#transferenciaentrecontas-agencia_o").val(' ');
        $("#transferenciaentrecontas-agenciadigito_o").val(' ');
        $("#transferenciaentrecontas-conta_o").val(' ');
        $("#transferenciaentrecontas-contadigito_o").val(' ');
    }
}
inputPortadorDestino.addEventListener('keyup', function () {
    var portador = (this.value);
    portador = portador.toUpperCase(portador);
    document.getElementById('transferenciaentrecontas-portador_destino').value = portador;
});

inputPortadorOrigem.addEventListener('keyup', function () {
    var portador = (this.value);
    portador = portador.toUpperCase(portador);
    document.getElementById('transferenciaentrecontas-portador_origem').value = portador;
});
