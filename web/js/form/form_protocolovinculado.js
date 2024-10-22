var modalFormSrc = '#form_protocolovinculado',
    modalAlertSrc = '#alerts_form_protocolovinculado',
    modalFormUrlBase = '/default/protocolo-vinculado',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        pedido: {
            required: true
        },
        protocolo: {
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

        //elements
        var fldId = $(modalFormSrc+" input[name='id']"),
            comboProtocolo = $(modalFormSrc+" select[name='protocolo']");

        //triggers
        comboProtocolo.change(controlComboProtocolo);

        //functions
        function controlComboProtocolo() {
            fldId.val(comboProtocolo.select2('data')[0]['id']);
        }
    };