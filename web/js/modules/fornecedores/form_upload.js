var fldLinhaDigitavel = $("input[name='Af[linha_digitavel]']");
var fldChaveAcesso = $("#af-chave_acesso");
var fldNumeroNota = $("#af-numeronf");

$(document).ready(function() {
    $('#af-numeronf').prop('required', true);
    $('#af-dtemissao-disp').prop('required', true);
    $('label[for=numero_nota]').text('Número da Nota Fiscal *');
    $('label[for=data_emissao]').text('Data de Emissão *');
    if (fldChaveAcesso.length === 0) {
        $('label[for=arquivo_nota]').text('Anexar Nota Fiscal *');
    }
    $('#boleto').closest('.form-group').hide();

    $('#af-documentofiscal').change(function() {
        if ($(this).get(0).files.length > 0 &&  $("#af-formapagamento_id").val() == 1) {
            $('#boleto').closest('.form-group').show('slow');
            var file = this.files[0];
            console.log(file)
            var warning = document.getElementById('file-warning');
            if (file.type !== 'application/pdf') {
                warning.style.display = 'block';
                this.value = '';
                $('#boleto').closest('.form-group').hide();
            }else{
                warning.style.display = 'none';
            }
        } else {
            $('#af-boleto').val('');
            $('#af-dtvencimento-disp').val('');
            $('#af-linha_digitavel').val('');
            $('#boleto').closest('.form-group').hide();
        }
    });
    $('#af-linha_digitavel').change( function() {
        var linhaDigitavel = $(this).val();
        if (linhaDigitavel) {
            $('#af-boleto').prop('required', true);
            $('#af-dtvencimento-disp').prop('required', true);
            $('label[for=arquivo_boleto]').text('Anexar Boleto *');
            $('label[for=data_vencimento]').text('Data de Vencimento *');
        } else {
            $('#af-boleto').prop('required', false);
            $('#af-boleto').val('');
            $('label[for=arquivo_boleto]').text('Anexar Boleto');
            $('#af-dtvencimento-disp').prop('required', false);
            $('#af-dtvencimento-disp').val('');
            $('label[for=data_vencimento]').text('Data de Vencimento');
        }
    });

    var recarregaData = document.getElementById('af-dtvencimento-disp').value;

    if (fldLinhaDigitavel.val().length > 40) {
        validarBoletoAjax(); //quando esse código roda, preenche o campo data vencimento com o valor na tela.
    }

    // esse código recupera a data antiga (antes do código acima rodar) e retorna ao valor
    if (recarregaData !== null){
        setTimeout(function(){
            $('#af-dtvencimento-disp-').val(recarregaData).trigger('change');
        }, 500);
    }
});

fldLinhaDigitavel.on('change', function () {
    validarBoletoAjax();
});

fldLinhaDigitavel.keyup(function() {
    validarBoletoAjax();
});

fldChaveAcesso.keyup(function() {
    if ($(this).val().length >= 54 || $(this).val().length == 44) {
        getInfoSync();
    }
});

fldChaveAcesso.on('input', function() {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
});

if (fldChaveAcesso.length > 0) {
    fldChaveAcesso.attr('autocomplete', 'off');
    fldChaveAcesso.attr('required', 'required');
}

function validarBoletoAjax() {
    var dtVencimento = '';
    var linhadigitavel = fldLinhaDigitavel.val();
    linhadigitavel = linhadigitavel.replace(/[^\d]+/g,'');

    var validacaoBoleto = validarBoleto(linhadigitavel)

    if(validacaoBoleto.sucesso) {
        linhadigitavel = validacaoBoleto.linhaDigitavel;
        dtVencimento = validacaoBoleto.vencimento;
    }

    fldLinhaDigitavel.val(linhadigitavel);

    if(linhadigitavel.length >= 44) {
        $("#info-boleto").load("/documento-fiscal/validar-boleto?linhadigitavel=" + linhadigitavel);
        dtVencimento = $('#dataVencimento').text();
        setTimeout(function(){
            if (dtVencimento != ''){
                let formattedDate = convertDate(dtVencimento);
                $("input[name='Af[dtvencimento]']").val(formattedDate);
                $("input[name='dtvencimento-af-dtvencimento-disp']").val(dtVencimento);
            }
            $("#info-boleto").show("slow");

            var content = $('#info-boleto').text();
            var btnSalvar = $("button[name='salvar-af']");

            if (content.includes("Boleto inválido! Verifique a linha digitável informada")) {
                btnSalvar.prop('disabled', true);
                btnSalvar.attr('title', 'Boleto inválido! Verifique a linha digitável informada.');
                btnSalvar.tooltip();
            } else if (content.includes("Valor:")) {
                btnSalvar.prop('disabled', false);
                btnSalvar.removeAttr('title');
                btnSalvar.tooltip('dispose');
            }

        }, 1000);
    }
}

function convertDate(dateStr) {// recebe no formato dd/mm/yyyy e retorna yyyy-mm-dd

    var parts = dateStr.split('/');
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    return year + '-' + month + '-' + day;

}

function getInfoSync() {
    var chaveacesso = fldChaveAcesso.val();
    chaveacesso = chaveacesso.replace(/\D+/g, '');

    $.ajax(
        {
            url: "/documento-fiscal/get-info-sync-ajax?chaveacesso=" + chaveacesso,
            async: false,
            success: function (data) {

                var dtemissao = data.dtemissao;
                var parts = dtemissao.split('-');
                var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0];

                $("#af-numeronf").val(data.numero).trigger('change');
                $("#af-dtemissao").val(dtemissao).trigger('change');
                $("#af-dtemissao-disp").val(formattedDate).trigger('change');
                $("#af-valor_baixa-disp").val(data.valor).trigger('change');
            },
            error: function (data) {
                toastr.info('Não foi possível buscar as informações da nota através da chave de acesso. ' +
                    'Prossiga inserindo o anexo da nota fiscal.');

                fldChaveAcesso.attr('required', false);
            }
        }
    );
}

fldNumeroNota.on('change keyup', function () {
    $(this).val($(this).val().replace(/\D/g, ''));
});
