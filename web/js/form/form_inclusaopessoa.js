var formSrc = '#form_inclusaopessoa',
    alertSrc = '#alerts_form_inclusaopessoa',
    formUrlBase = '/default/inclusao-pessoa',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        pessoa: {
            required: true
        },
        documentosOficiais: {
            required: true
        },
        dadosContato: {
            required: false
        },
        dadosEndereco: {
            required: false
        },
        dadosBancarios: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {

    };

    function getAvisos(){
        // carrega os avisos associados ao formulario
        var me = $('.avisos', formSrc),
            idPedido = $(formSrc+" input[name=id]").val(),
            data = {
                'pedido': idPedido
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