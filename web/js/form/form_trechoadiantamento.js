var tabId = '#tabTrechoAdiantamento',
    modalFormSrc = '#form_trechoadiantamento',
    modalAlertSrc = '#alerts_form_trechoadiantamento',
    modalFormUrlBase = '/default/trecho-adiantamento',
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