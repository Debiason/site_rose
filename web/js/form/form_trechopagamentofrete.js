var tabId = '#tabTrechoPagamentoFrete',
    modalFormSrc = '#form_trechopagamentofrete',
    modalAlertSrc = '#alerts_form_trechopagamentofrete',
    modalFormUrlBase = '/default/trecho-pagamento-frete',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        pedido: {
            required: true
        },
        localSaida: {
            required: true
        },
        dtSaida: {
            required: true
        },
        localChegada: {
            required: true
        },
        dtChegada: {
            required: true
        },
        kmInicial: {
            required: false
        },
        kmFinal: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
        //define valor da chave para entidade principal
        var pedidoId = $(formSrc+' input[name=id]').val(),
            fldPedido = $(modalFormSrc+' input[name=pedido]');
        fldPedido.ready(function(){
            fldPedido.val(pedidoId);
        });
    };