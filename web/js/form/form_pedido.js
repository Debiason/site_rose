var baseFormValidateRules = {
        id: {
            required: true
        },
        solicitante: {
            required: true
        },
        situacao: {
            required: false
        },
        tipoPedido: {
            required: false
        },
        finalidade: {
            required: true
        },
        observacoes: {
            required: false
        },
        ativo: {
            required: false
        },
        exibeDashboard: {
            required: false
        },
        dtregistro: {
            required: false
        }
    };

//functions
function getProcesso(){
    ajaxCall({
        url: formUrlBase + '/get-processo/format/json',
        async: false,
        success: function(resp) {
            processoId = resp.data.processoId;
        }
    });
    return processoId;
}

function loadComboSituacao() {
    var combo = $("select[name='situacao']");
    var urlBase = '/situacao';
    var data = {
        'processo': getProcesso(),
        'situacaoAtual': combo.data("originalValue"),
        'dadosCombo': '["id","nome"]'
    };

    controlCombo(urlBase, data, combo);
}

function getAvisos(){
    // carrega os avisos associados ao formulario
    var me = $('.avisos', formSrc),
        acordo = $("select[name=acordo]").select2('data')[0]['id'],
        data = {
            'acordo': acordo
        };
    ajaxCall({
        url: formUrlBase + '/get-avisos/format/json',
        data: {
            'dados': JSON.stringify(data)
        },
        dataType: "json",
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText),
                responseMsg = responseText.msg,
                msg = responseMsg ? responseMsg : 'Falha ao retornar avisos do formulario';
            showError(msg);
        },
        success: function(data, textStatus, jqXHR){
            var responseText = jQuery.parseJSON(jqXHR.responseText),
                avisos = '';
            $.each(responseText.data.avisos, function () {
                if (avisos != ''){
                    avisos += '<br>';
                }
                avisos += this;
            });
            me.html(avisos);
            me.fadeIn('slow');
        }
    });
}

function loadResumo() {
    idPedido = $(formSrc+" input[name=id]").val();
    var url = formUrlBase+'/resumo/id/'+idPedido;
    $('#modal-resumo-content').load(url, null, function() {
        App.unblockUI(); //release the block
        $('#modal-resumo').modal('show');
        $(".resumo-btn-confirmsend").click(confirmSend);
    });
    App.blockUI({
        message: 'Carregando...',
        boxed: true
    });
}

function loadUltimosPedidos() {
    var tipoPedido = $("input[name=tipoPedido]").val();
    var favorecido = $("select[name=favorecido]").select2('data')[0]['id'];
    ajaxCall({
        url: formUrlBase + '/index/format/json',
        data: {
            "tipoPedido": tipoPedido,
            "favorecido": favorecido
        },
        dataType: "json",
        error: function(jqXHR, textStatus, errorThrown) {
            var responseText = jQuery.parseJSON(jqXHR.responseText),
                responseMsg = responseText.msg,
                msg = responseMsg ? responseMsg : 'Falha ao retornar últimos pedidos do favorecido';
            showError(msg);
        },
        success: function(data, textStatus, jqXHR){
            var resp = jQuery.parseJSON(jqXHR.responseText);
            var lines = '';
            $.each(resp.data, function () {
                lines += '<tr>';
                lines += '<td>'+this.id+'</td>';
                lines += '<td>'+this.acordo+' - '+this.acordoNome+'</td>';
                lines += '<td>'+formatNumberCurrencySymbolColors(this.valor)+'</td>';
                lines += '<td>'+this.situacaoNome+'</td>';
                lines += '<td>'+formatDate(this.dtRegistro)+'</td>';
                lines += '</tr>';
            });

            $(".table-ultimos-pedidos tbody").html(lines);
            $("#modal-ultimos-pedidos").modal('show');
        }
    });
}

function confirmSend() {
    idPedido = $(formSrc+" input[name=id]").val();
    form = $(formSrc);
    ajaxCall({
        url: formUrlBase + '/send/id/'+idPedido+'/format/json',
        data: form.serialize(),
        beforeSend:function(){
            App.blockUI({
                message: 'Enviando',
                boxed: true
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {

            var response = jqXHR.responseJSON,
                responseMsg = response.msg;

            if(response && response.error) {
                var i = 0;
                jQuery.each(response.error.errors, function( key, val ) {
                    var msg = 'Campo ' + key + ': ' + val.join(', ');
                    App.alert({
                        container: alertSrc,
                        type: 'danger',
                        icon: 'warning',
                        message: msg,
                        reset: (i === 0 ? true : false),
                        focus: (i === 0 ? true : false)
                    });
                    i++;
                });
            } else if(response) {

                var posIniMsg = responseMsg.indexOf("[{\"mensagem\":"),
                    posFimMsg = responseMsg.indexOf("}]"),
                    msg = (posIniMsg === -1 || posFimMsg === -1) ? null : responseMsg.slice(posIniMsg, posFimMsg + 2);
                var resp = msg ? jQuery.parseJSON(msg) : null;
                // Erros associados a regras de negocio
                if(resp) {
                    jQuery.each(resp, function( i, el ) {
                        App.alert({
                            container: alertSrc,
                            type: el.type == 1 ? 'warning' : 'danger',
                            icon: 'warning',
                            message: el.mensagem,
                            reset: (i === 0 ? true : false),
                            focus: (i === 0 ? true : false)
                        });
                    });
                } else { // Erros que nao sao nem de validacao de formulario nem de regras de negocio
                    App.alert({
                        container: alertSrc,
                        type: 'danger',
                        icon: 'warning',
                        message: responseMsg
                    });
                }
            } else {
                App.alert({
                    container: alertSrc,
                    type: 'danger',
                    icon: 'warning',
                    message: 'Erro ao realizar a requisição. Tente novamente.'
                });
            }
            $('#modal-resumo').modal('hide');
        },
        success: function(data, textStatus, jqXHR){
            var msg = data.mensagem;
            $(location).attr('href', formUrlBase + '/index/');
            App.alert({
                container: alertSrc,
                type: 'success',
                icon: 'check',
                message: msg
            });
            $('#modal-resumo').modal('hide');
        },
        complete: function(jqXHR, textStatus){
            App.unblockUI(); //release the block
        }
    });
}

function confirmaVisualizacao(){
    idPedido = $(formSrc+" input[name=id]").val();
    if(idPedido) {
        ajaxCall({
            url: formUrlBase + '/confirma-visualizacao/format/json',
            data: {
                id: idPedido
            }
        });
    }
}


function gerarProcessoCompra(){
    var checkedData = $(".tab-pane.active table").DataTable().rows($(".tab-pane.active table").find(".mt-checkbox :checked").closest("tr")).data();

    if(checkedData.length === 0){

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr.warning('Você deve selecionar algum item!');
        return;
    }

    App.blockUI({
        message: 'Carregando',
        boxed: true
    });

    var pedidoId = $(formSrc+' input[name=id]').val(),
        recordAcordo = $(formSrc+' select[name=acordo]').select2('data')[0],
        procedimentoCompra = '',
        valorEstimado = 0.00,
        itens = [];

    ajaxCall({
        url: '/acordo/fetchpair/format/json',
        data: {
            id: recordAcordo.id,
            dadosCombo: '["id","procedimentoCompra"]'
        },
        async: false,
        success: function(resp) {
            procedimentoCompra = resp.data[0].procedimentoCompra;
        }
    });

    $.each(checkedData, function () {
        itens.push({
            tempId: this.id,
            itemCompra: this.id,
            descricao: this.descricao ? this.descricao : "",
            produtoNome: this.produtoNome
        });
        valorEstimado += this.valorEstimado ? this.valorEstimado : 0.00;
    });

    // Define as informacoes que sera setadas automaticamente no formulario de processo de compra
    var dados = {
        'pedido': parseInt(pedidoId),
        'procedimentoCompra': procedimentoCompra,
        'valorTotalEstimado': valorEstimado,
        'itens': itens
    };

    localStorage.setItem("dadosFromPedido", JSON.stringify(dados));

    // Redireciona para o formulario de processo de compra
    window.location = '/default/processo-compra/insert';
}

//triggers
$(".btn-send").click(loadResumo);
$("select[name=acordo]").change(getAvisos);

$(document).ready(function () {
    getAvisos();
    loadComboSituacao();
    confirmaVisualizacao();
});