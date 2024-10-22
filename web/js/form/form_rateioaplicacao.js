var formSrc = '#form_rateioaplicacao',
    alertSrc = '#alerts_form_rateioaplicacao',
    formUrlBase = '/default/rateio-aplicacao',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    formValidateRules = $.extend(baseFormValidateRules, {
        id: {
            required: true
        },
        pedido: {
            required: true
        },
        mesDeReferencia: {
            required: true
        },
        anoDeReferencia: {
            required: true
        }
    }),

    handleLocalListeners = function(mainForm)
    {
        var comboMes = $("select[name='mesDeReferencia']", mainForm);
        var comboAno = $("select[name='anoDeReferencia']", mainForm);

        comboMes.ready(controlComboDiaMesAno('mes', comboMes));
        comboAno.ready(controlComboDiaMesAno('ano', comboAno));

        //functions
        function controlComboDiaMesAno(tipo, comboFilho){

            var urlBase = '/dia-mes-ano';
            var data = {
                'tipo': tipo,
                'dadosCombo': "[\"id\",\"nome\"]"
            };

            controlCombo(urlBase, data, comboFilho);
        }

        var gridfieldItemRateioParcela = new Gridfield({
            element: '.gridfield-itensRateiosAplicacoes',
            type: 'advanced',
            action: '/item-rateio-aplicacao/index',
            mainParams: {
                'pedido': $(formSrc+" input[name=id]").val()
            }
        });

        jQuery(document).ready(function() {
            gridfieldItemRateioParcela.init();
        });

        // aplica regras no evento change
        $("select[data-name='tipoAplicacao']", mainForm).change(function () {

            var selectTipoAplicacao = $(this),
                fldTipoAplicacaoNome = $("input[data-name='tipoAplicacaoNome']"),
                tipoAplicacaoId = parseInt(selectTipoAplicacao.val());

            var urlBase = '/rateio-aplicacao';
            var data = {
                'tipoAplicacao': tipoAplicacaoId,
                'dadosCombo': "[\"id\",\"nome\"]"
            };

            fldTipoAplicacaoNome.val($("select[data-name='tipoAplicacao'] option:selected").text());
        });
        
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