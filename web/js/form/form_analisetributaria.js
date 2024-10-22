$(document).ready(function () {
     $(".m-form__heading-title").hide();
     $("#incluir-documento-fiscal").hide();
     $("#incluir-documento-geral").hide();
     $("#importar-nf-via-sync").hide();
     $("#importar-documento").hide();
     calcularTributo();
     atualizaValor();
});

//Calculo dos impostos
$("#analise-tributaria").click(calcularTributo);
$("#analise-tributaria").keypress(calcularTributo);
$("#analise-tributaria").keydown(calcularTributo);
$("#analise-tributaria").keyup(calcularTributo);

$("#analise-tributaria").click(atualizaValor);
$("#analise-tributaria").keypress(atualizaValor);
$("#analise-tributaria").keydown(atualizaValor);
$("#analise-tributaria").keyup(atualizaValor);
$("#valor_arredondamento").change(atualizaValor);

function calcularTributo(){

     var totalImpostos = 0;
     var valorDoc = $("#valor-documento").val();

     $('table#analise-tributaria > tbody  > tr').each(function(index, tr) {

          var fldCheckBox = $(tr).find(".ckeckbox-imposto").is(':checked');
          var fldPorcentagemBase = $(tr).find(".fld-porcentagem-base").val();
          var fldBaseCalculo = $(tr).find(".fld-base");
          var fldAliquota = $(tr).find(".fld-aliquota").val();
          var fldSoma = $(tr).find(".fld-soma-imposto");
          var fldTotal = $(tr).find(".fld-total-impostos");
          var fldBaseCalculoVal = fldBaseCalculo.val();
          var soma = 0;

          if (fldCheckBox) {
               $(tr).find(".td-valor").attr('style', 'display: none');
               //$('#th-valor').attr('style', 'display:none')
               soma  = calculaValores(fldPorcentagemBase,fldBaseCalculoVal,fldAliquota,valorDoc);
               soma = Math.round(soma * 100) / 100;
               totalImpostos += soma;
               soma = $.convertFloatToMoeda(soma);
          }else {
               $(tr).find(".td-valor").attr('style', 'display: none');
              // $('#th-valor').attr('style', 'display:none')
               soma = '0,00';
          }

          fldSoma.html('R$'+soma);
          fldTotal.html('R$'+$.convertFloatToMoeda(totalImpostos));
     });

     var valorLiquido = valorDoc - totalImpostos;
     $(".valor-liquido").html($.convertFloatToMoeda(valorLiquido));

     return valorLiquido;
}

function calculaValores(fldPorcentagemBase,fldBaseCalculoVal,fldAliquota,valorDoc){
     var somaBase = 0;
     var atualizaValorBase = false;

     if (fldBaseCalculoVal.includes(',')) {
          fldBaseCalculoVal = $.converteMoedaFloat(fldBaseCalculoVal);
     }

     if (fldBaseCalculoVal != valorDoc) {
          fldPorcentagemBase = (fldBaseCalculoVal * 100) / valorDoc;
          fldPorcentagemBase = (fldPorcentagemBase * 100) / 100;
          //$(".fld-porcentagem-base").val(fldPorcentagemBase);
          atualizaValorBase = false;
     } else if (fldPorcentagemBase.includes(',')) {
          fldPorcentagemBase = $.converteMoedaFloat(fldPorcentagemBase);
     }

     if (fldAliquota.includes(',')) {
          fldAliquota = $.converteMoedaFloat(fldAliquota);
     }

     somaBase = (fldPorcentagemBase * valorDoc)/100;
     if (atualizaValorBase) {
          fldBaseCalculo.val($.convertFloatToMoeda(somaBase.toFixed(3)));
     }

     return (somaBase * fldAliquota)/100;

}
function atualizaValor(){
     var valor_arredondamento = $("#valor_arredondamento").val();
     var valor_liquido = calcularTributo();

     $(".valor-liquido").html($.convertFloatToMoeda(valor_liquido - valor_arredondamento));
}
