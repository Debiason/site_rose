var tabId = '#tabItemMaoObra',
    modalFormSrc = '#form_itemmaoobra',
    modalAlertSrc = '#alerts_form_itemmaoobra',
    modalFormUrlBase = '/default/item-mao-obra',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = $.extend(ItemCompra_formValidateRules,{
        jornadaTrabalho: {
            required: true
        },
        descricao: {
            required: true
        },
        cronograma: {
            required: true
        },
        dtEntregaMaxima: {
            required: true
        },
        valorEstimado: {
            required: true
        }
    }),

    handleLocalListeners = function(mainForm)
    {
        //inicializa funcoes do ItemCompra
        ItemCompra_handleLocalListeners();

        //define valor da chave para entidade principal
        var pedidoId = $(formSrc+' input[name=id]').val(),
            fldPedido = $(modalFormSrc+' input[name=pedido]');
        fldPedido.ready(function(){
            fldPedido.val(pedidoId);
        });
    };