var modalFormSrc = '#form_rubricaaprovada',
    modalAlertSrc = '#alerts_form_rubricaaprovada',
    modalFormUrlBase = '/default/rubrica-aprovada',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        rubrica: {
            required: true
        },
        frequencia: {
            required: true
        },
        valorAprovado: {
            required: true
        }
    },

    handleLocalListeners = function(mainForm)
    {
        // carrega os avisos associados ao formulario
        $('.avisos', mainForm).ready(function () {
            var me = $('.avisos', mainForm);
            ajaxCall({
                url: modalFormUrlBase + '/get-avisos/format/json',
                data: tabMainParams_dtTabRubricaAprovada,
                dataType: "text",

                error: function(jqXHR, textStatus, errorThrown) {
                    var responseText = jQuery.parseJSON(jqXHR.responseText),
                        responseMsg = responseText.msg,
                        msg = responseMsg ? responseMsg : 'Falha ao retornar avisos do formulario';
                    showError(msg);
                },
                success: function(data, textStatus, jqXHR){
                    var responseText = jQuery.parseJSON(jqXHR.responseText),
                        avisos = responseText.data.avisos;
                    me.html(avisos);
                    me.show();
                }
            });
        });
    };