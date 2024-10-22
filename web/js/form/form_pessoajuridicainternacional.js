var fldPublico = $("input[name='PessoaJuridicaInternacional[publico]']");
var fldPublicoClassicacao = $("input[name='PessoaJuridicaInternacional[publico_classificacao]']");

fldPublico.change(function () {
    var radioValue = $("input[name='PessoaJuridicaInternacional[publico]']:checked").val();
    $.verificaPublicoPrivado(radioValue, fldPublicoClassicacao);
});

fldPublico.ready(function () {
    var radioValue = $("input[name='PessoaJuridicaInternacional[publico]']:checked").val();
    $.verificaPublicoPrivado(radioValue, fldPublicoClassicacao);
});