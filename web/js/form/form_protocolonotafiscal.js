$(function(){
    var tipo_pessoa = $("#tipo_pessoa").val();
    var rmtipoclifor = $("#rmtipoclifor").val();
    liberarCNPJ(tipo_pessoa, rmtipoclifor)
})
// Preenchimento via pedido
$('#fld-pedidosearch').on('select2:select', function (e) {

    var data = e.params.data;
    var id = data.id;
    var _csrf = String($('meta[name=csrf-token]').attr('content'));
        
    if(_csrf.length === 0) {
        throw new Error('Erro CSRF vazio, atualize a página.');
    }
    var dataJson = {
        method: 'post',
        dataType: "json",
        data: {pedido_id: id, _csrf:_csrf},
        url: '/documento-fiscal/get-documento-fiscal-pedido'
    };

    $.ajax(dataJson)
    .done(function(response){
        var results = response.data;       
        
        if(results.length === 0) {
            $("#select-documento-fiscal").hide();
            $("#documento_fiscal_id").html('');
            return false;
        }

        liberarCNPJ(results[0].tipo_pessoa, results[0].rmtipoclifor);

        var option ="<option value=''>Selecione</option>";

        $.each(results, (index, value) => {           
            option+="<option value='"+value.id+"'>"+value.text+"</option>";
        })
        $("#documento_fiscal_id").html(option);
        $("#select-documento-fiscal").show();
    });
});

$("#documento_fiscal_id").on('change', function() {
    
    var documento_fiscal_id = String($(this).val());

    if(documento_fiscal_id.length === 0) {

        $("#protocolonotafiscal-cnpj").val('');
        $("#protocolonotafiscal-razaosocial").val('');
        $("#protocolonotafiscal-valor").val('');
        $("#protocolonotafiscal-numero").val('');
        $("#protocolonotafiscal-valor-disp").val('');
        $("#protocolonotafiscal-dtemissao").val('');
        $("#protocolonotafiscal-dtemissao-disp").val('');

    } else {
        
        var _csrf = String($('meta[name=csrf-token]').attr('content'));      

        if(_csrf.length === 0) {
            toastr.error('Erro CSRF vazio, atualize a página.');
            return false;
        }

        var url = '/documento-fiscal/get-dados-documento-fiscal'
        var dados = {
            method: 'post',
            dataType: 'json',
            data: {_csrf: _csrf, documento_fiscal_id: documento_fiscal_id}
        }
        $.ajax(url, dados)
        .done((response) => {

            var results = response.data;
            
            $("#protocolonotafiscal-cnpj").val(results.cnpj);
            $("#protocolonotafiscal-razaosocial").val(results.razaosocial);
            $("#protocolonotafiscal-valor").val(results.valor);
            $("#protocolonotafiscal-numero").val(results.numero);
            $("#protocolonotafiscal-valor-disp").val(results.valor);
            $("#protocolonotafiscal-dtemissao").val(results.dtemissao);
            $("#protocolonotafiscal-dtemissao-disp").val(results.dtemissaoFormatada);
        })
        .fail(() => toastr.error('Erro de comunicação com o servidor.'))
    }
})

$('#fld-pessoa').on('select2:select', function (e) {
    var data = e.params.data;
    if(!data.hasOwnProperty('tipo_pessoa')) {
        throw new Error('Atributo [tipo_pessoa] não existe.')
    }
    
    liberarCNPJ(data.tipo_pessoa, data.rmtipoclifor);
});

// Preenchimento via AF
$('#fld-afsearch').on('select2:select', function (e) {

    try{
        var data = e.params.data;

        if(typeof data !== 'object')
            throw new Error('Os dados não são do tipo objeto, são ' + (typeof data) + '(s). Dados: ' + data);
        if(!data.hasOwnProperty('id'))
            throw new Error('Propriedade ID não encontrada em objeto.');

        var _csrf = String($('meta[name=csrf-token]').attr('content'));
        if(_csrf.length === 0) {
            throw new Error('Erro CSRF vazio, atualize a página.');
        }

        var id = data.id;
        var dataJson = {
            method: 'post',
            dataType: "json",
            data: {af_id: id, _csrf: _csrf},
            url: '/fornecedor/dados-fornecedor-af'
        };

        $.ajax(dataJson)
            .done(function(response){
                if(!response.hasOwnProperty('data'))
                    throw new Error('Erro no retorno da resposta.');

                var results = response.data;

                $("#protocolonotafiscal-cnpj").val(results.cnpj);
                $("#protocolonotafiscal-valor").val(results.valor);
                $("#protocolonotafiscal-valor-disp").val(results.valor);
                $("#protocolonotafiscal-razaosocial").val(results.razaosocial);

                if(results.razaosocial_id && results.razaosocial && results.tipo_pessoa) {
                    var $select = $('#fld-pessoa');
                    $select.empty();
                    $select.append('<option value="'+results.razaosocial_id+'" selected>'+results.razaosocial+'</option>').trigger('change');
                    $select.trigger('change.select2');
                    
                    liberarCNPJ(results.tipo_pessoa, results.rmtipoclifor);
                }

            })
            .fail(function() {
                throw new Error('Erro de comunicação com o servidor.');
            })

    } catch (e) {
        toastr.error(e.message);
    }
});

function liberarCNPJ(tipo_pessoa, rmtipoclifor) {
    tipo_pessoa = String(tipo_pessoa).toLocaleLowerCase();
    var codsProdutorRural = String($("#codsProdutorRural").val()).split('|');

    if(codsProdutorRural.indexOf(rmtipoclifor) > -1) {

        $(".field-protocolonotafiscal-cnpj").parent('.col-3').hide();
        $("#protocolonotafiscal-cnpj").val('');

    } else if(tipo_pessoa.indexOf('internacional') > -1) {

        $(".field-protocolonotafiscal-cnpj").parent('.col-3').hide();
        $("#protocolonotafiscal-cnpj").val('');

    } else {
        $(".field-protocolonotafiscal-cnpj").parent('.col-3').show();
    }
    
    
    
    $("#rmtipoclifor").val(rmtipoclifor);
    $("#tipo_pessoa").val(tipo_pessoa);
}

$("#protocolonotafiscal-numero").change(function () {
    var numero = $("#protocolonotafiscal-numero").val();
    numero = numero.replace(' ', '');
    numero = numero.replace('.', '');
    numero = numero.padStart(9, '0');
    $("#protocolonotafiscal-numero").val(numero);
});