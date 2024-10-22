var comboInteracaosearch = $("select[name='interacaosearch']");

comboInteracaosearch.change(getDados);

function getDados() {
    var texto = comboInteracaosearch.text();
    var cotacao = texto.substring(31, 38);

    $('#cotacao-id').val(cotacao);
}

