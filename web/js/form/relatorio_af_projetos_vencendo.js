$(document).ready(function() {

   $("#botaoSalvar").on('click', function(e) {
      $("#fld-projeto, #fld-centrocusto").prop('disabled', false);
   });

   $("#relatorioform-dtinicio, #relatorioform-dtfim").on("change", verificaDataPreenchida);
   verificaDataPreenchida();
});

function verificaDataPreenchida() {
   if ($("#relatorioform-dtinicio").val() != '') {
      $("#fld-projeto, #fld-centrocusto").val('').trigger('change');
      $("#fld-projeto, #fld-centrocusto").prop('disabled', true);
   } else {
      if ($("#relatorioform-dtfim").val() == '') {
         $("#fld-projeto, #fld-centrocusto").prop('disabled', false);
      }
   }
}
