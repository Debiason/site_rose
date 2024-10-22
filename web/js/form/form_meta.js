var dtInicioMensagem = $('#dtinicio-mensagem');
var dtFimMensagem = $('#dtfim-mensagem');

dtInicioMensagem.hide();
dtFimMensagem.hide();

var modalFormSrc = '#form_meta',
    modalAlertSrc = '#alerts_form_meta',
    modalFormUrlBase = '/default/meta',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        descricao: {
            required: true
        },
        dtInicio: {
            required: true
        },
        dtFim: {
            required: true
        },
        valorAprovado: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
        mainForm.ready(function() {
            var inputDtInicio = $("input[name='dtInicio']", mainForm),
                inputDtFim = $("input[name='dtFim']", mainForm),
                modalFormParentParams = window['tabMainParams_dtTabMeta'],
                acordoId = modalFormParentParams.acordo;

            if(typeof acordoId === 'undefined') {
                showError('Nao foi possivel obter o codigo do acordo');
                return;
            }

            var dtInicioAcordo = $('#form_convenio input[name=dtInicio]').val(),
                dtFimAcordo = $('#form_convenio input[name=dtFim]').val();

            if(!inputDtInicio.val()) {
                inputDtInicio.val(dtInicioAcordo);
            }

            if(!inputDtFim.val()) {
                inputDtFim.val(dtFimAcordo);
            }
        });
    };

    $('#meta-semetapa').change(function () {

            verificarPreenchimentoData()

            $('#meta-dtinicio-disp').change(function () {
                verificarPreenchimentoData();
            });

            $('#meta-dtfim-disp').change(function () {
                verificarPreenchimentoData();
            });
    });

    function verificarPreenchimentoData(){

        if($('#meta-semetapa').is(':checked')){
            var dtInicio =  $('#meta-dtinicio-disp').val();
            var dtFim =  $('#meta-dtfim-disp').val();

            if (dtInicio){
                dtInicioMensagem.hide('slow');
            }else{
                dtInicioMensagem.show('slow');
                $("#btn-salvar").hide('slow');

            }

            if (dtFim){
                dtFimMensagem.hide('slow');
            }else{
                dtFimMensagem.show('slow');
                $("#btn-salvar").hide('slow');
            }

            if (dtInicio && dtFim){
                $("#btn-salvar").show('slow')
            }

        }else{
            dtInicioMensagem.hide('slow');
            dtFimMensagem.hide('slow');
            $("#btn-salvar").show('slow')
        }
    }