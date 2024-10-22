var codigoProjetoSic = $("input[name='Diligencia[codigoprojeto_sic]']");
var codigoProjetoSicLabel = $("label[for=diligencia-codigoprojeto_sic]");
 var fldCentroCusto = $(" input[name='Diligencia[centrocusto_id]'], input[name='diligencia-centrocusto_id-disp']");
var codigoPrestacaoConta = $("#diligencia-prestacaoconta_id");
var temGlosa = $("input[name='Diligencia[glosa]']");

var flagDocumento = $("#diligencia-documento_assinatura_externa_flag");
var divDocumento = $("#div-dadosDocumentos");

$('.valoresGlosa').hide('slow');
codigoProjetoSic.hide();
codigoProjetoSicLabel.hide();

$('#diligencia-projeto_sic').change(function () {

    if ($('#diligencia-projeto_sic').is(':checked')) {
        codigoProjetoSic.show('slow');
        codigoProjetoSicLabel.show('slow');
        $('#fld-prestacaoconta').prop('disabled', true);
        $('#fld-prestacaoconta').val(null);
        $('#fld-centrocusto').prop('disabled', true);
        $('#fld-centrocusto').val(null);

        $('.PrestacaoNoAgrega').hide('slow');
    } else {
        codigoProjetoSic.hide('slow');
        codigoProjetoSicLabel.hide('slow');
        $('#fld-prestacaoconta').prop('disabled', false);
        $('#fld-centrocusto').prop('disabled', false);

        $('.PrestacaoNoAgrega').show('slow');
    }
});

temGlosa.change(function () {
    if (temGlosa.is(':checked')) {
        $('.valoresGlosa').show('slow');
    } else {
        $('.valoresGlosa').hide('slow');
    }
});


//checkBox para pagamento com cartão de credito
$(flagDocumento).on('click', function () {
    if ($(this).is(':checked')) {
        divDocumento.show("slow");
    } else {
        divDocumento.hide("slow");
    }
});

 $(document).ready(function(){
    // Monitora a mudança do valor do campo prestacaoconta_id
    $('#fld-prestacaoconta').on('change', function(){
        if ($(this).val() !== '') {

            getDadosPrestacaoConta($(this).val());

            var centrocusto = $("select[name='Diligencia[centrocusto_id]']");
            centrocusto.val(null);
            $('.form-cc').hide("slow");

            $('#diligencia-projeto_sic').prop('checked', false);
            codigoProjetoSic.hide('slow');
            codigoProjetoSicLabel.hide('slow');
        } else {
            $('.form-cc').show("slow");
            $('#diligencia-projeto_sic').prop('checked', false);

        }
    });
 });
$('#fld-centrocusto').on('change', function() {
    if ($(this).val() !== '') {
        $('.prestacao-conta-fld').hide("slow");
    } else {
        $('.prestacao-conta-fld').show("slow");
    }
});

$('#diligencia-projeto_sic').trigger('change');
$('#diligencia-glosa').trigger('change');
$('#diligencia-documento_assinatura_externa_flag').trigger('change');

$('#diligencia-dtficio-disp, #fld-dias_envio_resposta').change(function() {
    var dtficio = $('#diligencia-dtficio-disp').val();
    var dias_envio_resposta = $('#fld-dias_envio_resposta').val();
    if (dtficio != '' && dias_envio_resposta != '') {
        $.ajax({
            url: '/diligencia/calcular-data-maxima-resposta',
            type: 'post',
            data: {
                dtficio: dtficio,
                dias_envio_resposta: dias_envio_resposta
            },

            success: function(resp) {
                var dtmaxresposta = moment(resp, 'DD-MM-YYYY').format('YYYY-MM-DD');
                $('#diligencia-dtmaxresposta-disp').val(resp);
                $('#diligencia-dtmaxresposta').val(dtmaxresposta);
            },
        });
    }
});

function getDadosPrestacaoConta(id) {
    $.ajax({
        url:  "/prestacao-conta/get-dados",
        data: {
            id: id,
        },
        async: false,
        success: function (resp) {
            if (resp.nomeResponsavel) {
                $("#responsavel-pc-fld").show('slow');
                $("#responsavel-pc").val(resp.nomeResponsavel).trigger('change');
            } else {
                $("#responsavel-pc-fld").hide('slow');
                $("#responsavel-pc").val('').trigger('change');
            }
        },
    });
}