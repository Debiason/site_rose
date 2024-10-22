var formSrc = '#form_emissaodeclaracao',
    alertSrc = '#alerts_form_emissaodeclaracao',
    formUrlBase = '/default/emissao-declaracao',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = $.extend(baseFormValidateRules, {
        id: {
            required: true
        },
        pessoa: {
            required: true
        },
        declaracao: {
            required: true
        },
        dtViagem: {
            required: false
        },
        localViagem: {
            required: false
        },
        finalidadeViagem: {
            required: false
        },
        despesasDiaria: {
            required: false
        },
        despesasPassagem: {
            required: false
        },
        despesasInscricao: {
            required: false
        }
    }),

    handleLocalListeners = function(mainForm)
    {
        $("select[name='declaracaoViagem']").hide();

        controlComboTipoDeclaracao();

        $("select[name='declaracao']", mainForm).change(function(){
            controlComboTipoDeclaracao();
        });

        function controlComboTipoDeclaracao() {
            if ($("select[name='declaracao']").val() == 82) {
                $('.declaracaoViagem').show();
            } else {
                $('.declaracaoViagem').hide();
            }
        }
    };