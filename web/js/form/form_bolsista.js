var dtInicio = $("input[name='Bolsista[dtinicio]']"),
    tempoVigencia = $("input[name='Bolsista[tempovigencia]']"),
    fldValorBolsa = $("input[name='Bolsista[valorbolsa]'], input[name='bolsista-valorbolsa-disp']"),
    fldTipoBolsa = $("select[name='Bolsista[tipobolsa_id]']"),
    fldModalidadeBolsa = $("select[name='Bolsista[modalidadebolsa_id]']"),
    fldRubricaAprovada = $("select[id='fld-rubricaaprovada']"),
    fldMudancaProjeto = $('#mudancaprojeto-checkbox'),
    fldPessoa = $("#fld-pessoafisica"),
    divProjetoDestino = $('#projeto-destino'),
    divRubricaAprovada = $('#div-rubrica-item'),
    divBolsistaEtapa = $('#div-bolsista-etapa'),
    divInformacaoPessoa = $('#informacao-pessoa-fisica')
;

$(function(){
    $.fn.kvDatepicker.defaults.language = 'pt-BR';
    $.fn.kvDatepicker.defaults.format = 'dd/mm/yyyy';
})

fldMudancaProjeto.on('change', function() {
    if ($(this).is(':checked')) {
        divProjetoDestino.show("slow");
        divRubricaAprovada.hide();
        divBolsistaEtapa.hide();
    } else {
        divProjetoDestino.hide("slow");
        divRubricaAprovada.show();
        divBolsistaEtapa.show();
    }
});

fldTipoBolsa.change(function () {
    verificaTipoBolsa();
});
 fldTipoBolsa.ready(verificaTipoBolsa());
fldModalidadeBolsa.change(function () {
    setValorBolsa();
});

tempoVigencia.change(calculaDtFim);

fldRubricaAprovada.change(verificaItemAprovado);
fldRubricaAprovada.ready(verificaItemAprovado);

fldPessoa.change(function () {
    verificaDataNascimento();
});

// recalcula as datas quando um dos dois campos sao alterados
function calculaDtFim() {
    var dtFimInput = $("input[name='Bolsista[dtfim]']"),
        dtFimDisp = $("input[name='dtfim-bolsista-dtfim-disp']");

    var mesesVigencia = tempoVigencia.val();

    var novaData = moment(dtInicio.val());
    
    novaData = novaData.add(mesesVigencia, 'months').subtract(1, 'days');

    //var novoDia = String(novaData.date()).length === 1 ? '0'+ novaData.date() : novaData.date();
    
    datafimInput = novaData.year() + "-" + ("0" + (novaData.month() + 1)).slice(-2) + "-" + novaData.date();
    dtFimInput.val(datafimInput);

    datafimDisp = novaData.date() + "/" + ("0" + (novaData.month() + 1)).slice(-2) + "/" + novaData.year();
    dtFimDisp.kvDatepicker('update',datafimDisp);
}

//Mostra o campo valor da hora quando o bolsista é pago por hora
var formaPagamento = $("input[name='Bolsista[pagamento]']");

formaPagamento.change(function () {
    var radioValue = $("input[name='Bolsista[pagamento]']:checked").val();
    verificaBolsitaPagoPorHora(radioValue);
});

$(document).ready(function () {
    var radioValue = $("input[name='Bolsista[pagamento]']:checked").val();
    verificaBolsitaPagoPorHora(radioValue);
});

function verificaBolsitaPagoPorHora(radioValue){

    if (radioValue == 'Hora') {
        $('#valorHora').show('slow');
    } else {
        $('#valorHora').hide('slow');
    }
};


//Calcula o valor total pela hora e valor da hora

var fldValorHora = $("input[name='Bolsista[valorhora]'], input[name='bolsista-valorhora-disp']"),
    fldCargaHoraria = $("input[name='Bolsista[cargahorariatotal]'], input[name='bolsista-cargahorariatotal-disp']"),
    fldValorTotal = $("input[name='Bolsista[valorbolsa]'], input[name='bolsista-valorbolsa-disp']");

fldValorHora.change(calculaValorTotal);
fldCargaHoraria.change(calculaValorTotal);

function calculaValorTotal() {

    var valorHora = $.convertMoedaToFloat(fldValorHora.val());
    var cargaHoraria = $.convertMoedaToFloat(fldCargaHoraria.val());
    var valorCalculado = valorHora * cargaHoraria;
    fldValorTotal.val(valorCalculado);
}

function verificaTipoBolsa() {

    var tipoBolsaId = fldTipoBolsa.val();

        $.ajax({
            url: '/tipo-bolsa/get-tipo-valor-bolsa/',
            data: {
                id: tipoBolsaId
            },
            async: false,
            success: function (resp) {
                if (resp['estagio']) {
                    $('#modalidadeBolsista').hide('slow');
                    fldModalidadeBolsa.val(resp['modalidade']);
                    // fldValorBolsa.val(resp['valor']);
                }else {
                    $('#modalidadeBolsista').show('slow');
                    // fldModalidadeBolsa.val(null);
                }
            }
        });

}

function setValorBolsa() {

    var modalidadeBolsaId = fldModalidadeBolsa.val();

    $.ajax({
        url: '/modalidade-bolsa/get-valor-bolsa/',
        data: {
            id: modalidadeBolsaId
        },
        async: false,
        success: function (resp) {
            fldValorBolsa.val(resp);
        }
    });
}


function verificaItemAprovado(){

    var rubricaaprovada_id = fldRubricaAprovada.val();
    var divItemAprovado = $("#div-item-aprovado");
    var fldItemAprovado = $("#fld-itemaprovado");

    $.ajax({
        url: '/item-aprovado/combo-search/',
        data: {
            rubricaaprovada_id: rubricaaprovada_id
        },
        async: false,
        success: function (resp) {
            if (resp['output'].length == 0) {
                divItemAprovado.hide('slow');
                fldItemAprovado.attr('required', false);
            }else {
                divItemAprovado.show('slow');
                fldItemAprovado.attr('required', 'required');

            }
        }
    });
}

function removerAnexoDocumentoAcordo(anexo_id, documentoacordo_id)
{
    var id_anexo = String(anexo_id).replace(/\D/g, '');
    var id_documentoacordo = String(documentoacordo_id).replace(/\D/g, '');

    if(!(!!id_anexo) || !(!!id_documentoacordo)) {
        toastr.error('Parâmetros [id_anexo] ou/e [id_documentoacordo] inválidos.');
        return false;
    }

    krajeeDialog.confirm("Você tem certeza que deseja remover o anexo?", function (result) {
        if (result) {
            var _csrf = String($('meta[name=csrf-token]').attr('content'));
            if(_csrf.length === 0) {
                toastr.error('Erro CSRF vazio, atualize a página.');
                return false;
            }
            var url = '/documento-acordo/deletar-anexo'
            var dados = {
                method: 'post',
                dataType: 'json',
                data: {_csrf: _csrf, anexo_id: id_anexo, documentoacordo_id: id_documentoacordo}
            }
            $.ajax(url, dados)
                .done((response) => {

                    if(!response.hasOwnProperty('data'))
                        toastr.error('Erro na resposta do servidor, atributo [data]');

                    if(response.data.success){
                        $('#box-arquuivo-anexo-'+id_anexo).hide();
                        toastr.success(response.data.msg);
                    }else{
                        toastr.error(response.data.msg);
                    }
                })
                .fail(() => toastr.error('Erro de comunicação com o servidor.'));
        }
    });
}

function verificaDataNascimento() {
    var pessoaId = fldPessoa.val();

    if (fldPessoa.val()) {
        $.ajax({
            url: '/pessoa/verifica-data-nascimento/',
            data: {
                pessoa_id: pessoaId
            },
            async: false,
            success: function (resp) {
                if (resp == false) {
                    divInformacaoPessoa.text('Data de nascimento não encontrada no cadastro de pessoa física, ajuste o cadastro antes de prosseguir.')
                    divInformacaoPessoa.css('color', 'red');
                    divInformacaoPessoa.show();
                } else {
                    divInformacaoPessoa.hide()
                }
            }
        });
    } else {
        divInformacaoPessoa.hide()
    }
}
