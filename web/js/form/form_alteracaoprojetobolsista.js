var divDadosBolsista =  $("#dadosBolsista"),
    comboBolsista = $("select[name='RelatorioForm[bolsista_id]']");

//triggers
comboBolsista.change(function () {
    getDados(this.value);
});

function getDados(pessoaId) {
    divDadosBolsista.load("/bolsista/get-dados-bolsista?pessoa_id=" + pessoaId);
    divDadosBolsista.show("slow");
}

