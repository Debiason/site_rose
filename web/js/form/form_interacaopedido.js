/*
var modalFormSrc = '#form_interacaopedido',
    modalAlertSrc = '#alerts_form_interacaopedido',
    modalFormUrlBase = '/default/interacao-pedido',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        pedido: {
            required: true
        },
        descricao: {
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
    };*/

$(window).scroll(function() {
    $( "span" ).css( "display", "inline" ).fadeOut( "slow" );
});

$( "#other" ).click(function() {
    $( "#target" ).scroll();
});

