var modalFormSrc = '#form_documentogeral',
    modalAlertSrc = '#alerts_form_documentogeral',
    modalFormUrlBase = '/default/documento-geral',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        pedido: {
            required: true
        },
        anexo: {
            required: true
        },
        nome: {
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