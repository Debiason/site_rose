/** begin::guardar_valores */
var documentofiscal_id = String($("#documentofiscal_id").val()).replace(/\D/g, '');
var pedido_id          = String($("#pedido_id").val()).replace(/\D/g, '');
/** end::guardar_valores */

documentofiscal_id = documentofiscal_id.length === 0 ? 0 : documentofiscal_id

/** begin::instancia_gridfield */
var gridfieldItensDocFiscal = new Gridfield({
    element: '.gridfield-itens-documento-fiscal',
    type: 'advanced',
    actionCreate: '/item-documento-fiscal/create',
    actionRead: '/item-documento-fiscal/read',
    actionUpdate: '/item-documento-fiscal/update',
    hasCheckbox: true,
    mainParams: {
        'documentofiscal_id': documentofiscal_id,
        'pedido_id': pedido_id
    }
});
/** end::instancia_gridfield */


$(function () {

    /** usuarios que nao tem permissao para campos internos sai da funcao*/
    if ($("#campoInterno").val() == 0){
        return true;
    }

    /** begin::validar_valores */
    if(/* documentofiscal_id.length === 0 || */pedido_id.length === 0) {
        toastr.error('Parâmetros inválidos.');
        return false;
    }
    /** end::validar_valores */

    /** begin::select_all_itens */
    $("#checkAllItens").on('click', function() {
        var $inputCheck = $('.checkbox');
        var count       = $inputCheck.length;
        if($(this).is(':checked')){
            for(var i=0;i<count;i++) {
                $inputCheck[i].checked = true;
            }
        } else {
            for(var i=0;i<count;i++) {
                $inputCheck[i].checked = false;
            }
        }
    });
    /** end::select_all_itens */

    /** begin::mostrar_select_rubrica */
    var btnToggle = {
        duration: 'slow',
        start: function() {
            if($(this).css('display') === 'flex')
                $(".btn-gridfield-add").parent('li').hide('slow');
        },
        done: function() {
            if($(this).css('display') === 'none')
                $(".btn-gridfield-add").parent('li').show('slow');
        }
    }
    $("#op-rubrica").on('click', function() {
        $('.li-select-item-aprovado').hide('slow');
        $("#itens-aprovados").val("");
        $('.li-select-rubrica').toggle(btnToggle);
        $(document).trigger('event-status-select');
    });
    /** end::mostrar_select_rubrica */

    /** begin::mostrar_select_item */
    $("#op-item").on('click', function() {
        $('.li-select-rubrica').hide('slow');
        $("#rubricas-aprovadas").val("");
        $('.li-select-item-aprovado').toggle(btnToggle);
        $(document).trigger('event-status-select');
    });
    /** end::mostrar_select_item */

    /** begin::event_aplicar_rubrica */
    $("#btn-aplicar-rubrica").on('click', function(ev) {
        ev.preventDefault();

        var $selectRubrica = $("#rubricas-aprovadas option:selected");
        var rubrica_id     = String($selectRubrica.val()).replace(/\D/g, '');
        var rubrica_nome   = $.trim($selectRubrica.text());
        var marcados       = countItensSelecionados();

        if(rubrica_id === '') {
            toastr.error('O valor da rubrica está vazio.');
            return false;
        }

        if(rubrica_nome === '') {
            toastr.error('O nome da rubrica está vazio.');
            return false;
        }

        if(marcados === 0) {
            toastr.warning('Nenhum item foi selecionado.');
            return false;
        }

        var id = [];
        var i = 0;
        var idEdit = [];
        var indice = 0;

        $('.checkbox').each(function () {
            if ($(this).is(':checked')) {
                id.push($(this).data().id);
                idEdit[indice] = $(this).data().id;
            }
            indice++;
        });

        $.each(gridfieldItensDocFiscal.store, function (key, value) {
            if (id.indexOf(value.id) > -1 || value.id == idEdit[i] || id.indexOf(value.tempId) > -1) {
                value.rubricaaprovada_id = rubrica_id;
                value.rubricaNome = rubrica_nome;
            }
            i++;
        });
        $('.li-select-rubrica').hide('slow');
        $("#rubricas-aprovadas").val("");
        $(".btn-gridfield-add").parent('li').show('slow');

        $("#checkAllItens").attr('disabled', false);
        $('.checkbox').each(function () {
            $(this).attr('disabled', false);
        });

        gridfieldItensDocFiscal.load();
    });
    /** end::event_aplicar_rubrica */

    /** begin::event_aplicar_item_aprovado */
    $("#btn-aplicar-item-aprovado").on('click', function(ev) {
        ev.preventDefault();

        var $select      = $("#itens-aprovados option:selected");
        var item_id      = String($select.val()).replace(/\D/g, '');
        var nome         = $.trim($select.text());
        var rubrica_id   = String($select.attr('rubrica_id')).replace(/\D/g, '');
        var rubrica_nome = $.trim($select.attr('rubrica_nome'));
        var marcados     = countItensSelecionados();

        if(item_id === '') {
            toastr.error('O valor do item está vazio.');
            return false;
        }

        if(nome === '') {
            toastr.error('O nome do item está vazio.');
            return false;
        }

        if(marcados === 0) {
            toastr.warning('Nenhum item foi selecionado.');
            return false;
        }

        var id = [];
        var i = 0;
        var idEdit = [];
        var indice = 0;

        $('.checkbox').each(function () {
            if ($(this).is(':checked')) {
                id.push($(this).data().id);
                idEdit[indice] = $(this).data().id;
            }
            indice++;
        });

        $.each(gridfieldItensDocFiscal.store, function (key, value) {
            if (id.indexOf(value.id) > -1 || value.id == idEdit[i] || id.indexOf(value.tempId) > -1) {
                value.itemaprovado_id    = item_id;
                value.itemAprovadoNome   = nome;
                value.rubricaaprovada_id = rubrica_id;
                value.rubricaNome        = rubrica_nome;
            }
            i++;
        });
        $('.li-select-item-aprovado').hide('slow');
        $("#itens-aprovados").val("");
        $(".btn-gridfield-add").parent('li').show('slow');

        $("#checkAllItens").attr('disabled', false);
        $('.checkbox').each(function () {
            $(this).attr('disabled', false);
        });

        gridfieldItensDocFiscal.load();
    });
    /** end::btn-aplicar-item-aprovado */

    function countItensSelecionados() {
        var $inputCheck = $('.checkbox');
        var marcados    = [];

        // guardar valores
        $inputCheck.each(function(){
            if($(this).is(':checked'))
                marcados.push($(this).attr('data-id'));
        })

        return marcados.length;
    }

    $(".checkbox, #checkAllItens").on('click', function() {
        $("#rubricas-aprovadas").trigger('change');
    });

    /** begin::valida_rubrica_item_aprovado */
    $("#rubricas-aprovadas").on('change', function() {

        // variavéis
        var $selectRubricaAp   = $('option:selected', this);
        var rubricaSelecionada = String($selectRubricaAp.val()).replace(/\D/g, '');
        var itemaprovado_ids   = String($selectRubricaAp.attr('itemaprovado_id')).replace(/\D,/g, '');
        var dados              = gridfieldItensDocFiscal.store;

        itemaprovado_ids = itemaprovado_ids.length > 0 ? itemaprovado_ids.split(',') : [];

        // filtra os array vazios ou com undefined
        itemaprovado_ids = itemaprovado_ids.filter(function(entry){
            return String(entry).replace(/\D/g, '') != '';
        })

        //se valor selecionado for vazio
        if(rubricaSelecionada.length === 0) {
            $("#checkAllItens").attr('disabled', false);
            $('.checkbox').each(function () {
                $(this).attr('disabled', false);
            });
            return false;
        }

        var dataId = []; // array com ids do checkbox
        var iapId  = []; // array com ids dos itens aprovados 
        $.each(dados, function(index, obj) {
            dataId[index] = String(obj.id).length !== 0 ? String(obj.id) : String(obj.tempId) ;
            iapId[index]  = obj.itemaprovado_id ? obj.itemaprovado_id : 0;
        });

        if(itemaprovado_ids.length > 0) {
            var position;
            $('.checkbox').each(function (index) {

                position = dataId.indexOf(String($(this).data().id));
                if(itemaprovado_ids.indexOf(iapId[position]) < 0 && iapId[position] !== 0) {

                    if(!$("#checkAllItens").attr('disabled')) {
                        $("#checkAllItens")[0].checked = false;
                        $("#checkAllItens").attr('disabled', true);
                    }

                    $(this)[index].checked = false;
                    $(this).attr('disabled', true);
                } else {
                    $("#checkAllItens").attr('disabled', false);
                    $(this).attr('disabled', false);
                }
            });
        } else {
            $("#checkAllItens").attr('disabled', false);
            $('.checkbox').each(function () {
                console.log('teste oi');

                $(this).attr('disabled', false);
            })
        }
    });
    /** end::valida_rubrica_item_aprovado */
});

var fldChaveAcesso = $("input[name='DocumentoFiscal[chaveacesso]']");
var fldNumero = $("input[name='DocumentoFiscal[numero]']");
var fldValor = $("input[name='DocumentoFiscal[valor]'], input[name='documentofiscal-valor-disp']");
var fldTotalItens = $("input[name='DocumentoFiscal[total_itens]'], input[name='documentofiscal-total_itens-disp']");
var fldTotalDesconto = $("input[name='DocumentoFiscal[total_desconto]'], input[name='documentofiscal-total_desconto-disp']");
var fldSerie = $("input[name='DocumentoFiscal[serie]'], input[name='documentofiscal-serie-disp']");
var fldTotalFrete = $("input[name='DocumentoFiscal[total_frete]'], input[name='documentofiscal-total_frete-disp']");
var fldTotalIpi = $("input[name='DocumentoFiscal[total_ipi]'], input[name='documentofiscal-total_ipi-disp']");
var fldTotalDespesas = $("input[name='DocumentoFiscal[total_despesas]'], input[name='documentofiscal-total_despesas-disp']");
var fldLinhaDigitavel = $("input[name='DocumentoFiscal[linhadigitavel]']");
var fldvalorICMS = $("input[name='DocumentoFiscal[total_icms]']");
var fldSerieNota = $("input[name='DocumentoFiscal[serie]']");
var fldEspecieNota = $("input[name='DocumentoFiscal[especie]']");


fldChaveAcesso.on('change', function () {
    getInfoSync();
});

fldChaveAcesso.on('blur', function () {
    if ($(this).val() == '') {
        $("#documentofiscal-autorizacao_pagamento").prop('disabled', false);
        $(".field-documentofiscal-autorizacao_pagamento label").removeAttr('title');
        $(".field-documentofiscal-autorizacao_pagamento label").tooltip("disable");
    }
});

fldChaveAcesso.keyup(function() {
    if ($(this).val().length > 0) {
        $("#documentofiscal-autorizacao_pagamento").prop('disabled', true);
        $(".field-documentofiscal-autorizacao_pagamento label").attr('title', 'Opção desabilitada para documentos com chave de acesso.');
        $(".field-documentofiscal-autorizacao_pagamento label").tooltip("enable");
    }

    if ($(this).val().length >= 54 || $(this).val().length == 44) {
        getInfoSync();
    }
});

fldChaveAcesso.keypress(
    function(event){
        if (event.which == '13') {
            event.preventDefault();
        }
    });

fldLinhaDigitavel.on('change', function () {
    var linhaDigitavel = fldLinhaDigitavel.val();
    $(this).val(linhaDigitavel.replace(/[^\d]+/g,''));
    validarBoleto();
});

fldLinhaDigitavel.keyup(function() {
    var linhaDigitavel = fldLinhaDigitavel.val();
    $(this).val(linhaDigitavel.replace(/[^\d]+/g,''));

    if ($(this).val().length >= 47 || $(this).val().length == 48) {
        validarBoleto();
    }
});

var elementoCnpjAntigo = document.getElementById("cnpj-antigo");
var cnpjAntigo = elementoCnpjAntigo.dataset.cnpj;

function getInfoSync() {
    var chaveacesso = fldChaveAcesso.val();
    chaveacesso = chaveacesso.replace(/[^\d]+/g, '');

    var tipoNota = chaveacesso.substring(20, 22);

    if (tipoNota == 55) {
        chaveacesso = 'NFe' + chaveacesso;
        $('#documentofiscal-servico').prop("checked", false);
    } else if (tipoNota == 57 || tipoNota == 67) {
        chaveacesso = 'CTe' + chaveacesso;
        $('#documentofiscal-servico').prop("checked", true);
    }

    if(chaveacesso.length >= 47) {
        fldChaveAcesso.val(chaveacesso);
        $("#info-nota-fiscal").show("slow");
        $("#info-nota-fiscal").load("/documento-fiscal/get-info-sync?chaveacesso=" + chaveacesso + "&pedidoid=" + pedido_id);
    } else {
        $("#info-nota-fiscal").hide("slow");
    }

    setTimeout(function() {
        var cnpj = document.getElementById('documentofiscal-cnpj');
        var razaoSocial = document.getElementById('documentofiscal-razaosocial');
        var motivo = document.getElementById('motivoV')

        var elementoCnpjNf = document.getElementById("cnpjNf");
        var cnpjNf = elementoCnpjNf == null ? '' : elementoCnpjNf.dataset.cnpj;
        //var cnpjNf = elementoCnpjNf.dataset.cnpj;


        if (motivo != null && motivo.value != ''){
            console.log(motivo)
            var mensagem = $('#mensagem-nota-cancelada');
            mensagem.text('Atenção: '+ motivo.value);
            mensagem.attr('class', 'destaque-danger');
        }

        if (elementoCnpjNf != null){
            var elementoTipoPedido = document.getElementById("tipoPedido");
            var tipoPedido = elementoTipoPedido == null ? '' : elementoTipoPedido.dataset.pedido;
            //var tipoPedido = elementoTipoPedido.dataset.pedido;

            var elementoRazaoSocialNf = document.getElementById("razaoSocialNf");
            var razaoSocialNf = elementoRazaoSocialNf == null ? '' : elementoRazaoSocialNf.dataset.social;
            //var razaoSocialNf = elementoRazaoSocialNf.dataset.social;

            var mensagem = $('#mensagem-resultado');

            if (tipoPedido == "1" || tipoPedido == "44") {
                if (cnpj.value != cnpjNf) {
                    cnpj.value = cnpjNf;
                    razaoSocial.value = razaoSocialNf;
                    mensagem.text('O CNPJ da nota fiscal diverge com o favorecido do pedido.');
                    mensagem.attr('class', 'destaque-warning');
                    $("#mudar-cnpj-favorecido").show("slow")
                }
                if (cnpjAntigo == cnpjNf) {
                    mensagem.text('');
                    mensagem.attr('class', '');
                    $("#mudar-cnpj-favorecido").hide()
                }

            } else if (tipoPedido == "5" && cnpj.value != cnpjNf) {
                cnpj.value = cnpjNf;
                razaoSocial.value = razaoSocialNf;
            } else {
                if (cnpj.value != cnpjNf) {
                    cnpj.value = cnpjNf;
                    razaoSocial.value = razaoSocialNf;
                    mensagem.attr('class', 'letras-verdes');
                    mensagem.text('O CNPJ e a Razão social foram atualizados automaticamente para os dados da Nota Fiscal.');
                }
                if (cnpjAntigo == cnpjNf) {
                    mensagem.text('');
                    mensagem.attr('class', '');
                }
            }
        }
    }, 3000);

}

function preencherViaSync() {
    var chaveacesso = fldChaveAcesso.val();
    console.log('Preenchendo com dados do E-Docs');
    $.ajax({
        url: '/documento-fiscal/get-info-sync-ajax?chaveacesso=' + chaveacesso + '&pedidoid=' + pedido_id,
        async: false,
        success: function (resp) {
            fldNumero.val(resp.numero);
            fldSerie.val(resp.serie);
            fldNumero.change();
            fldValor.val(parseFloat(resp.valor).toFixed(2));
            fldTotalItens.val(parseFloat(resp.total_itens).toFixed(2));
            fldTotalDesconto.val(parseFloat(resp.total_desconto).toFixed(2));
            fldTotalFrete.val(parseFloat(resp.total_frete).toFixed(2));
            fldTotalIpi.val(parseFloat(resp.total_ipi).toFixed(2));
            fldTotalDespesas.val(parseFloat(resp.total_despesas).toFixed(2));
            $("input[name='DocumentoFiscal[dtemissao]']").val(resp.dtemissao);
            $("input[name='dtemissao-documentofiscal-dtemissao-disp']").val(resp.dtemissao_disp);
            fldvalorICMS.val(parseFloat(resp.total_icms).toFixed(2));
            fldSerieNota.val(parseFloat(resp.serie));
            fldEspecieNota.val(parseFloat(resp.especie));
            $('#documentofiscal-inicio_frete').val(resp.inicio_frete);
            $('#documentofiscal-fim_frete').val(resp.fim_frete);

            gridfieldItensDocFiscal.cleanStore();
            $.each(resp.itens, function (key, item) {
                gridfieldItensDocFiscal.addItem(item);
            });
            gridfieldItensDocFiscal.load();
        }
    });
}

function validarBoleto() {
    var linhadigitavel = fldLinhaDigitavel.val();
    linhadigitavel = linhadigitavel.replace(/\s/g, '');

    if(linhadigitavel.length >= 44) {
        $("#info-boleto").load("/documento-fiscal/validar-boleto?linhadigitavel=" + linhadigitavel);
        $("#info-boleto").show("slow");
    } else {
        $("#info-boleto").hide("slow");
    }
}

jQuery(document).ready(function() {
    escondeMostraFlagServico();
    fldChaveAcesso.change();
    fldLinhaDigitavel.change();
    fldValor.attr('required', 'required');
    /** verifica se usuario tem permissao para campos internos*/

    let itensDocumentoFiscal = $("input[id='fld-tem-itens_documento-fiscal']").val();

    if ($("#campoInterno").val() == 1 && itensDocumentoFiscal) {
        /** begin::inicia_gridfield */
        gridfieldItensDocFiscal.init();
        /** end::inicia_gridfield */
    }

    if (fldChaveAcesso.val().length > 0) {
        $("#documentofiscal-autorizacao_pagamento").prop('disabled', true);
        $(".field-documentofiscal-autorizacao_pagamento label").attr('title', 'Opção desabilitada para documentos com chave de acesso.');
        $(".field-documentofiscal-autorizacao_pagamento label").tooltip("enable");
    }
});

$('#documentofiscal-autorizacao_pagamento').click(function () {
    escondeMostraFlagServico();
});

function escondeMostraFlagServico() {

    var ap = $('#documentofiscal-autorizacao_pagamento');

    if (ap.is(":checked")) {
        $(".field-documentofiscal-servico").hide('slow');
        $("#documentofiscal-servico").prop( "checked", false );

    } else {
        $(".field-documentofiscal-servico").show('slow');
    }
}

$('#documentofiscal-servico').click(function () {
    var servico = $('#documentofiscal-servico');
    verificaNumero(servico);
    var af = $("#fld-autorizacaofornecimento");

    if (af.length == 0) {
        if (servico.is(":checked")) {
            $("#div-item-servico").show('slow');
            $("#fld-servico-nota").prop('required', true);
        } else {
            $("#div-item-servico").hide('slow');
        }
    }
});

function removerAnexoDocumentoFiscal(anexo_id, documentofiscal_id)
{
    var id_anexo = String(anexo_id).replace(/\D/g, '');
    var id_documentofiscal = String(documentofiscal_id).replace(/\D/g, '');

    if(!(!!id_anexo) || !(!!id_documentofiscal)) {
        toastr.error('Parâmetros [id_anexo] ou/e [id_documentofiscal] inválidos.');
        return false;
    }

    krajeeDialog.confirm("Você tem certeza que deseja remover o anexo?", function (result) {
        if (result) {
            var _csrf = String($('meta[name=csrf-token]').attr('content'));
            if(_csrf.length === 0) {
                toastr.error('Erro CSRF vazio, atualize a página.');
                return false;
            }
            var url = '/documento-fiscal/deletar-anexo'
            var dados = {
                method: 'post',
                dataType: 'json',
                data: {_csrf: _csrf, anexo_id: id_anexo, documentofiscal_id: id_documentofiscal}
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

fldNumero.change(function () {
    var select = document.getElementById("select2-fld-tipopagamentointerno-container");
    if (select != null){
        var valorSelecionado = select.textContent;
        verificaNumero(valorSelecionado)
    }

    var numero = fldNumero.val();
    numero = numero.replace(/[^0-9a-zA-Z]/g, '');
    numero = numero.padStart(9, '0');
    fldNumero.val(numero);
});

fldNumero.on('input', function() {
    var numero = $(this).val();
    numero = numero.replace(/[^0-9a-zA-Z]/g, '');
    $(this).val(numero);
});

function atualizaFavorecido (){
    var pedidoId = pedido_id;
    var elementoNumeroNf = document.getElementById('numeroNf');
    var numeroNf = elementoNumeroNf.dataset.nf;
    var elementoCnpjNf = document.getElementById('cnpjNf');
    var cnpjNf = elementoCnpjNf.dataset.cnpj;
    var mensagem =  $('#mensagem-resultado');

    var respostas = [
        'Favorecido modificado com sucesso!',
        'Erro, este cnpj não possui conta bancária cadastrada no nosso sistema, não será possível a troca do favorecido.',
        'Erro, este cnpj não possui cadastrado no nosso sistema, não será possível a troca do favorecido.',
        'A alteração já foi realizada, recarregue a página principal para visualizar a alteração.'
    ];

    $.ajax({
        url: "/documento-fiscal/atualiza-favorecido-by-nota-fiscal?pedidoId=" + pedidoId + "&cnpj=" + cnpjNf + "&numeroNf=" + numeroNf,
        async: false,
        success: function (resp) {
            $('#texto-mudar-cnpj-favorecido').hide()
            $('#mudar-cnpj-favorecido').hide()
            for (i = 0; i < respostas.length ; i++) {
                if (resp == respostas[i]) {
                    mensagem.text(respostas[i])
                } if(resp == respostas[0] || resp == respostas[3]){
                    mensagem.attr('class', 'letras-verdes');
                } else {
                    mensagem.attr('class', 'letras-vermelhas');
                }
            }
        }
    });
}

function verificaNumero(servico){
    if (fldChaveAcesso.val() == ''){
        if (servico == 'Nota Fiscal de Serviço'){
            var numero = fldNumero.val();
            numero = numero.replace(/[^0-9a-zA-Z]/g, '');
            var dataAtual = new Date();
            var ano = dataAtual.getFullYear();
            var ano2Digitos = ano.toString().slice(-2);
            var novoNum = ano2Digitos + "" + numero;
            novoNum = novoNum.padStart(9, '0');
            fldNumero.val(novoNum);
        } else if (typeof  servico != 'string' && servico.is(":checked")){
            var numero = parseInt(fldNumero.val());
            var dataAtual = new Date();
            var ano = dataAtual.getFullYear();
            var ano2Digitos = ano.toString().slice(-2);
            var novoNum = ano2Digitos + "" + numero;
            novoNum = novoNum.padStart(9, '0');
            fldNumero.val(novoNum);
        }else if (typeof  servico != 'string'){
            var numero = parseInt(fldNumero.val());
            numero = numero.toString();
            var novoNum = numero.substring(2);
            numero = novoNum.padStart(9, '0');
            fldNumero.val(numero);
        }else{
            var numero = parceInt(fldNumero.val());
            numero = numero.replace(/[^0-9a-zA-Z]/g, '');
            numero = numero.padStart(9, '0');
            fldNumero.val(numero);
        }
    }
}