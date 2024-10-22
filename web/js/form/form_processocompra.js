var fldMotivoReabertura = $('#motivoReabertura'),
    fldMotivoCancelamento = $('#motivoCancelamento'),
    comboSituacao = $("select[name='ProcessoCompra[situacao_id]']"),
    motivoReabertura = $("textarea[name='ProcessoCompra[motivoReabertura]']"),
    motivoCancelamento = $("textarea[name='ProcessoCompra[motivoCancelamento]']"),
    fldObservacaoParecer = $("#observacoes_parecer"),
    comboModalidadeCompra = $("select[name='ProcessoCompra[modalidadecompra_id]']"),
    btnModal = $("#btnModalConfirmacao"),
    btnSubmit = $("#btnSubmit"),
    btnSubmitSim = $("button[name='sim']"),
    btnSubmitNao = $("button[name='nao']"),
    fldModalidadeCompra = $("select[name='ProcessoCompra[modalidadecompra_id]']"),
    fldSubModalidadeCompra = $(".sub_modalidade_compra"),
    divInfoSelecaoPublica = $(".div-selecao-publica"),
    divInfoSelecaoPublicaOutros = $(".div-selecao-publica-outros"),
    fldImportacaoInexigibilidade = $("input[name='ProcessoCompra[importacao_inexigibilidade]']");

// btnSubmit.on('click', function(e){
//     bloqueiaBtnSubit(e, btnSubmit);
// });

btnSubmitSim.on('click', function(e){
    bloqueiaBtnSubit(e, btnSubmitSim);
});

btnSubmitNao.on('click', function(e){
    bloqueiaBtnSubit(e, btnSubmitNao);
});

comboSituacao.change(verificaSituacao);
comboModalidadeCompra.change(verificaTermoRatificacao);

fldModalidadeCompra.change(verificaModalidade);
fldImportacaoInexigibilidade.change(verificaModalidade);

function bloqueiaBtnSubit(e, btn){
    var countKartikValidadeForm = $('.has-error', "#w0").length;
    if(countKartikValidadeForm > 0) {
        e.preventDefault();
        return false;

    } else {
        $( "#w0" ).submit();
        btn
            .html("Enviando informações...")
            .addClass('disabled')
            .attr('disabled', 'disabled');
    }

    setTimeout(function(){
        countKartikValidadeForm = $('.has-error', "#w0").length;

        if(countKartikValidadeForm > 0) {
            btn.html('Salvar <i class="fas fa-save"></i>')
                .removeClass('disabled')
                .removeAttr('disabled');
        }
    },1000);
}

function verificaSituacao() {

    var situacaoId = comboSituacao.val();

    if (situacaoId == 195) {
        fldMotivoReabertura.show('slow');
        motivoReabertura.attr('required', true);
        fldMotivoCancelamento.hide('slow');
        motivoCancelamento.attr('required', false);
        btnModal.hide();
        btnSubmit.show();
    } else if (situacaoId == 132) {
        fldMotivoCancelamento.show('slow');
        motivoCancelamento.attr('required', true);
        fldMotivoReabertura.hide('slow');
        motivoReabertura.attr('required', false);

        $.ajax({
            url: '/processo-compra/get-dados-situacao/',
            data: {
                id: $("#processocompra-id").val()
            },
            async: false,
            success: function (resp) {
                //console.log(situacaoId, resp);
                if (situacaoId != resp){
                    btnModal.show();
                    btnSubmit.hide();
                }
            }
        });

    } else {
        fldMotivoCancelamento.hide('slow');
        fldMotivoReabertura.hide('slow');
        motivoCancelamento.attr('required', false);
        motivoReabertura.attr('required', false);
        btnModal.hide();
        btnSubmit.show();
    }
}

function verificaTermoRatificacao() {

    var modalidadeId = comboModalidadeCompra.val();
    geraTermoRatificacao = $("#processocompra-geratermoratificacao");
    var modalidadeSelecaoPuplica = 9;
    if (modalidadeId == modalidadeSelecaoPuplica) {
        geraTermoRatificacao.attr("checked", false)
    }
}

function initConfigGridfieldFornecedores(config)
{
    return gridfieldFornecedorProcessoCompra = new Gridfield({
        element: '.gridfield-fornecedor-processo-compra',
        type: 'advanced',
        actionCreate: '/fornecedor-processo-compra/create',
        actionRead: '/fornecedor-processo-compra/read',
        actionUpdate: '/fornecedor-processo-compra/update',
        dadosPost: config.dadosPost,
        hasCheckbox: true,
        mainParams: config.mainParams
    });
}

function removerFornecedoresSemEmail(objGrid)
{
    var fornecedores = objGrid.store;     
    if(fornecedores.length > 0) {
        $.each(fornecedores, function(index, obj){
            if(obj.hasOwnProperty('countContatos')) {
                if(obj.countContatos === 0) {
                    obj.id = obj.id === '' ? obj.tempId :  obj.id;
                    objGrid.remove(obj.id);
                }
            }
        });
        objGrid.load();
    }
}

function getSummaryTblFornecedores(objGrid) {
    var obj = Array.isArray(objGrid) ? objGrid[0] : objGrid;

    $("#grid-num-fornecedores").html(obj.store.length);
    $("#grid-num-email").html(0)
    var fornecedores = obj.store;
   
    if(fornecedores.length > 0) {
        var numEmail = 0;
        $.each(fornecedores, function(index, obj){
            if(obj.hasOwnProperty('countContatos')) {
                numEmail+=obj.countContatos;
            }
        });
        $("#grid-num-email").html(numEmail);
    }
}

function observarModificacoes(element, callback, ...param) {
    var target = document.querySelector(element);
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            callback(param);
        });
    });
    var config = { attributes: false, childList: true, characterData: false };
    observer.observe(target, config);
}

$(function(){

    fldMotivoReabertura.hide();
    fldMotivoCancelamento.hide();
    verificaSituacao();
    btnModal.hide();
    btnSubmit.show();

    getSummaryTblFornecedores(gridfieldFornecedorProcessoCompra);
    observarModificacoes("#tableFornecedorPc tbody", getSummaryTblFornecedores, gridfieldFornecedorProcessoCompra);

    $("#checkAllFornecedores").on('click', function(){
        var $checkboxs = $("#tableFornecedorPc input[type=checkbox]");

        if($checkboxs === "undefined" || $checkboxs.length === 0) return false;

        if($(this).is(':checked')){
            $checkboxs.each(function(){
                $(this).prop('checked', true);
            });
        } else {
            $checkboxs.each(function(){
                $(this).prop('checked', false);
            })
        }
    });

    $(".btn-gridfield-del-sem-email").on('click', function(){       
        removerFornecedoresSemEmail(gridfieldFornecedorProcessoCompra);            
    });

    $("#tableFornecedorPc").bind("DOMSubtreeModified", function(){
        if($("#checkAllFornecedores").is(':checked')) {
            $("#checkAllFornecedores").prop('checked', false);
            var $checkboxs = $("#tableFornecedorPc input[type=checkbox]");
            if($checkboxs === "undefined" || $checkboxs.length === 0) return false;
            $checkboxs.each(function(){
                $(this).prop('checked', false);
            })
        }
    });

    $("#checkAllItensProcesso").on('click', function(){
        var $checkboxs = $("#tableItemProcesso input[type=checkbox]");

        if($checkboxs === "undefined" || $checkboxs.length === 0) return false;

        if($(this).is(':checked')){
            $checkboxs.each(function(){
                $(this).prop('checked', true);
            });
        } else {
            $checkboxs.each(function(){
                $(this).prop('checked', false);
            })
        }
    });

    $("#tableItemProcesso").bind("DOMSubtreeModified", function(){
        if($("#checkAllItensProcesso").is(':checked')) {
            $("#checkAllItensProcesso").prop('checked', false);
            var $checkboxs = $("#tableItemProcesso input[type=checkbox]");
            if($checkboxs === "undefined" || $checkboxs.length === 0) return false;
            $checkboxs.each(function(){
                $(this).prop('checked', false);
            })
        }
    });

    $('#processocompra-dtlimitecotacao_hora').inputmask('99:99');
});


//checkBox para os dados de compra no mercado externo
$('input[name="ProcessoCompra[solicita_parecer_cotacao_aprovada]"]').on('click', function(){

    if ( $(this).is(':checked') ) {
        fldObservacaoParecer.show("slow");
    } else {
        fldObservacaoParecer.hide("slow");
    }
});


$(document).ready(function () {
    if ( $('input[name="ProcessoCompra[solicita_parecer_cotacao_aprovada]"]').is(':checked') ) {
        fldObservacaoParecer.show("slow");
    } else {
        fldObservacaoParecer.hide("slow");
    }
});

window.addEventListener('load', verificaModalidade);
function verificaModalidade(){
    var modalidadesPortalcompras = ["6", "9", "11", "15", "4"];
    var modalidadesImportacaocompras = 16;
    var modalidadeValor = fldModalidadeCompra.val();

    if (modalidadesPortalcompras.includes(modalidadeValor)) {
        divInfoSelecaoPublica.show('slow');
        fldSubModalidadeCompra.hide('slow');
        $("select[name='ProcessoCompra[modo_disputa_id]']").val(294);
        $("#span-modalidade-nome").text(fldModalidadeCompra.children(':selected').text());

        var arrayOutrosDados = ["6", "11", "15", "4"];
        if (arrayOutrosDados.includes(modalidadeValor)) {
            divInfoSelecaoPublicaOutros.hide('slow');
        } else {
            divInfoSelecaoPublicaOutros.show('slow');
        }

        var arrayLocal = ["6", "9", "4"];
        if (arrayLocal.includes(modalidadeValor)){
            $(".div-local").show('slow');
        } else {
            $(".div-local").hide('slow');
        }
    }else if(modalidadesImportacaocompras == modalidadeValor){
        fldSubModalidadeCompra.show('slow');
        if (fldImportacaoInexigibilidade.is(':checked')) {
            $("#span-modalidade-nome").text('Importação por inexigibilidade');
            divInfoSelecaoPublicaOutros.hide('slow');
            divInfoSelecaoPublica.show('slow');
        } else {
            divInfoSelecaoPublica.hide('slow');
        }
    }else {
        divInfoSelecaoPublica.hide('slow');
        fldSubModalidadeCompra.hide('slow');
        $("select[name='ProcessoCompra[modo_disputa_id]']").val(null);
    }
}


$('#select-all').click(function(){
    $('#processocompra-documentos_fornecedor').multiSelect('select_all');
    return false;
});
$('#deselect-all').click(function(){
    $('#processocompra-documentos_fornecedor').multiSelect('deselect_all');
    return false;
});