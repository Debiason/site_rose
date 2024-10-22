var tabId = '#tabTrechoPagamentoDiaria',
    modalFormSrc = '#form_trechopagamentodiaria',
    modalAlertSrc = '#alerts_form_trechopagamentodiaria',
    modalFormUrlBase = '/default/trecho-pagamento-diaria',
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
        horaSaida: {
            required: false
        },
        localChegada: {
            required: true
        },
        dtChegada: {
            required: true
        },
        horaChegada: {
            required: false
        },
        kmInicial: {
            required: false
        },
        kmFinal: {
            required: false
        },
        placa: {
            required: false
        },
        tipoVeiculo: {
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