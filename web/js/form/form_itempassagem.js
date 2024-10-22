var flddadosContato = $("#dadosContato"),
    fldResponsavelValor = $("input[name='ItemPassagem[contatonome]']"),
    fldcheckbox = $("input[name='ItemPassagem[seguro]']"),
    comboPassageiro = $("select[name='ItemPassagem[passageiro_id]']"),
    comboPais = $("select[name='ItemPassagem[origempais_id]']"),
    comboPaisDestino = $("select[name='ItemPassagem[destinopais_id]']"),
    fldPassaporte = $("input[name='ItemPassagem[passaporte]'], input[name='itempassagem-passaporte-disp']"),
    fldValidadePassaporte = $("input[name='ItemPassagem[validadepassaporte]']"),
    fldRg = $("input[name='ItemPassagem[rg]']"),
    divRg = $("#div-rg");

//referente ao ckeckBox de seguro para mostrar dados de contato
$(document).ready(function () {

    if ($("#fld-projeto_id").val() !== "") {
        $("#dados-nova-compra").show();
    }

    if (fldcheckbox.is(':checked')) {
        flddadosContato.show("slow");
    } else {
        flddadosContato.hide("slow");
    }

});

fldcheckbox.on('click', function () {

    if ($(this).is(':checked')) {
        flddadosContato.show("slow");
    } else {
        flddadosContato.hide("slow");
    }

});

//triggers
comboPassageiro.change(controlComboPassageiro);
comboPassageiro.ready(controlComboPassageiro);

comboPais.ready(controlComboPais());

comboPais.on("change", function () {
    setcomboEstadoCidade($(this).val());
})

comboPaisDestino.ready(controlComboPaisDestino());

comboPaisDestino.on("change", function () {
    setcomboEstadoCidadeDestino($(this).val());
})

$('#fld-paisorigem').on('select2:select', controlComboPais());
$('#fld-paisdestino').on('select2:select', controlComboPaisDestino());

function controlComboPassageiro() {

    var valorPassageiroId = comboPassageiro.val();
    getDados(valorPassageiroId);

}

function getDados(valorPassageiroId) {
    $.ajax({
        url: '/pessoa/getdados/',
        data: {
            id: valorPassageiroId
        },
        async: false,
        success: function (resp) {

            retorno = "CPF: " + (resp.documento == null ? '' : resp.documento) + "<br>";
            retorno += "RG: " + (resp.rgdocumento == null ? '' : resp.rgdocumento) +
                " - " + "Órgão emissor: " + (resp.emissor == null ? '' : resp.emissor) +
                " / " + (resp.estadorg == null ? '' : resp.estadorg) + "<br>";
            retorno += "Gênero: " + (resp.generopessoa == null ? '' : resp.generopessoa) + "<br>";
            retorno += "Nacionalidade: " + (resp.tipopessoa == 'FisicaNacional' ? 'Brasil' : resp.paisnome) + "<br>";
            retorno += "Endereço:  Rua: " + (resp.enderecorua == null ? '' : resp.enderecorua) +
                ", " + (resp.endereconumero == null ? '' : resp.endereconumero) +
                " - " + (resp.enderecocomplemento == null ? '' : resp.enderecocomplemento) +
                " Bairro: " + (resp.enderecobairro == null ? '' : resp.enderecobairro) +
                " - " + (resp.enderecocidade == null ? '' : resp.enderecocidade) +
                "/" + (resp.enderecoestado == null ? '' : resp.enderecoestado) +
                ", CEP: " + (resp.enderecocep == null ? '' : resp.enderecocep);

            $("#dadospassageiro").html(retorno);

            var labelPassaporte = document.querySelector("label[for='itempassagem-passaporte']");
            var labelDataPassaporte = document.querySelector("label[for='itempassagem-validadepassaporte']");
            var labelRg = document.querySelector("label[for='itempassagem-rg']");

            if (resp.tipopessoa != 'FisicaNacional' && resp.tipopessoa != 'JuridicaNacional' && resp.tipopessoa != null) {

                if (resp.passaporte) {
                    fldPassaporte.val(resp.passaporte);
                }

                fldPassaporte.attr('required', 'required');
                fldValidadePassaporte.attr('required', 'required');
                labelPassaporte.innerHTML = 'Passaporte <span class="letras-vermelhas">*</span>';
                labelDataPassaporte.innerHTML = 'Validade do passaporte <span class="letras-vermelhas">*</span>';

            } else {

                fldPassaporte.val('');
                fldPassaporte.attr('required', false);
                fldValidadePassaporte.attr('required', false);
                labelPassaporte.innerHTML = 'Passaporte';
                labelDataPassaporte.innerHTML = 'Validade do passaporte';

            }

            if (resp.rgdocumento == '') {

                divRg.show('slow');
                fldRg.attr('required', 'required');

            } else {

                divRg.hide('slow');
                fldRg.attr('required', false);
                fldRg.val(resp.rgdocumento);

            }
        }
    });
}

function controlComboPais() {

    var valorPaisId = comboPais.val();
    setcomboEstadoCidade(valorPaisId);

}

function setcomboEstadoCidade(valorPaisId) {

    if (valorPaisId == 30) {
        $("#comboInternacional").hide();
        $("#comboNacional").show();
    } else {
        $("#comboNacional").hide();
        $("#comboInternacional").show();
    }
}

function controlComboPaisDestino() {

    var valorPaisId = comboPaisDestino.val();
    setcomboEstadoCidadeDestino(valorPaisId);

}

function setcomboEstadoCidadeDestino(valorPaisId) {

    if (valorPaisId == 30) {
        $("#comboInternacionalDestino").hide();
        $("#comboNacionalDestino").show();
    } else {
        $("#comboNacionalDestino").hide();
        $("#comboInternacionalDestino").show();
    }
}

$(document).ready(function() {
    $('#enviar-btn').click(function() {

        $('#enviar-btn').prop('disabled', true);
        var dadosFormulario = $('#compra-direta-passagem').serialize();
        var acordo = $('#fld-projeto_id').val();
        var dadosPost = dadosFormulario + '&acordo=' + acordo;

        $.ajax({
            type: 'POST',
            url: '/compra/compra-direta-passagem',
            data: dadosPost,
            success: function(response) {
                if (response.success) {
                    setTimeout(function() {
                        $('#compradiretapassagemform-nome').val('');
                        $('#compradiretapassagemform-email').val('');
                        $('#compradiretapassagemform-telefone').val('');
                        $('#compradiretapassagemform-assunto').val('');
                        $('#compradiretapassagemform-mensagem').val('');
                    }, 1000);
                } else {
                    toastr.error('Ocorreu um erro ao enviar o email.')
                }
            },
            error: function() {
                console.log('Ocorreu um erro ao enviar a requisição.');
            },
            complete: function() {
                setTimeout(function() {
                    $('#enviar-btn').prop('disabled', false);
                }, 4000);
            }
        });
    });
});

$('#compradiretapassagemform-telefone').on('input', function () {
    var value = $(this).val().replace(/\D/g, '');

    if (value.length <= 2) {
        $(this).val('(' + value);
    } else if (value.length <= 6) {
        $(this).val('(' + value.substring(0, 2) + ') ' + value.substring(2));
    } else if (value.length <= 10) {
        $(this).val('(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + '-' + value.substring(6));
    } else {
        $(this).val('(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11));
    }
    if (value.length === 0) {
        $(this).val('');
    }
});