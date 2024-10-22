var fldCentroCusto = $("select[name='RelatorioForm[centrocusto_id]']"),
    fldProjeto = $("select[name='RelatorioForm[projeto_id]']"),
    fldProjetoSic = $('#relatorioform-projeto_sic');

fldProjetoSic.on('change', function () {
    if (fldProjetoSic.val().length === 0) {
        fldCentroCusto.prop('disabled', false);
        fldProjeto.prop('disabled', false);
    } else {
        fldCentroCusto.prop('disabled', true).val(null).trigger('change');
        fldProjeto.prop('disabled', true).val(null).trigger('change');
    }
});