var checkIndeterminado = $("input[name='FuncionarioAcordo[contratoIndeterminado]']"),
    dtfim = $("input[name='dtfim-funcionarioacordo-dtfim-disp'], input[name='FuncionarioAcordo[dtfim]']");

$(document).ready(function () {
    if (checkIndeterminado.is(':checked')) {
        $("#requiredFim").hide();
        dtfim.attr('disabled', 'disabled');
        dtfim.attr('required', false);
    }  else {
        dtfim.attr('disabled', false);
        dtfim.attr('required', 'required');
        if (dtfim.val() != null) {
            $("#requiredFim").hide();
        } else {
            $("#requiredFim").show();
        }
    }
});

checkIndeterminado.on('click', function () {
   if (checkIndeterminado.is(':checked')) {
       dtfim.attr('disabled', 'disabled');
       dtfim.attr('required', false);
       dtfim.val(null);
       $("#requiredFim").hide('slow');
   }  else {
       dtfim.attr('disabled', false);
       dtfim.attr('required', 'required');
       $("#requiredFim").show('slow');
   }
});