var btnAprovar = $("#btnAprovarParecer"),
    btnReprovar = $("#btnReprovarParecer"),
    btnSubmit = $("#btnSubmit"),
    observacoesParecer = $("#observacoesParecer"),
    justificativaParecer = $("#cotacaoaguardandoparecer-parecer");

btnAprovar.click(function () {
    btnSubmit.val('aprovar');
    btnSubmit.attr('class', 'btn btn-success');
    if (observacoesParecer.val() != null){
        justificativaParecer.attr('required', 'required');
    }
});

btnReprovar.click(function () {
    btnSubmit.val('recusar');
    btnSubmit.attr('class', 'btn btn-danger');
    justificativaParecer.attr('required', 'required');
});