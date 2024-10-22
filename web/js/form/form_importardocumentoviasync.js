var btnSimular = $("button[id='simular']"),
    btnFechar = $("button[id='fechar']"),
    btnVoltar = $("button[id='voltar']"),
    btnSalvar = $("button[id='importarDados']");


btnSimular.click(function () {

    $.ajax({
        url: '/documento-fiscal/importar-documento-via-sync/',
        type: 'post',
        data: {
            dados: $('#form-dados-importar').serializeArray(),
            acao: 'simular'
        },
        dataType: 'json',
        async: false,
        success: function (resp) {

            $("#form-dados-importar").hide();
            $("#dadosNotas").html(resp);
            $("#importar-documentos").show();


        }
    });

});

btnVoltar.click(function () {

    $("#form-dados-importar").show();
    $("#importar-documentos").hide();

});

btnFechar.click(function () {

$("#modal-principal").modal('hide');

});

/*Refaz os calculos do total */
$(document).on('click', '.checkBox-NotaFiscal', function(ev) {

    var valorTotalAtual = $('.span-valor-somatorio').val();
    var valorThis = this.value;
    valorTotalAtual = $.convertMoedaToFloat(valorTotalAtual);
    valorThis = $.convertMoedaToFloat(valorThis);

    var text = this.name;
    var selecionada = text.replace('valor', 'selecionada');

    if (this.checked) {
        $('input[name="'+ selecionada +'"]').val(1);

        valor = valorTotalAtual + valorThis;
        var retorno = $.convertFloatToMoeda(valor);
        $('.span-valor-somatorio').val(retorno);
    } else {
        $('input[name="'+ selecionada +'"]').val(0);

        valor = valorTotalAtual - valorThis;
        var retorno = $.convertFloatToMoeda(valor);
        $('.span-valor-somatorio').val(retorno);
    }
});