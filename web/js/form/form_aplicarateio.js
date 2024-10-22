var modalFormSrc = '#form_aplicarateio',
    modalAlertSrc = '#alerts_form_aplicarateio',
    modalFormUrlBase = '/default/movimentacao',
    modalFormUrlSave = modalFormUrlBase + '/gera-rateio/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        valorLancamentos: {
            required: true
        },
        rateio: {
            required: true
        },
        valorRateio: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
        var gridfieldItens = new Gridfield({
            autoLoad: false,
            element: '.gridfield-itens',
            type: 'advanced',
            action: '',
            mainParams: {}
        });
        
        var loadSelectRubrica = function(acordoId) {
            
            var selectRubrica = $("select[data-name='rubrica']", mainForm);

            if(typeof acordoId === 'undefined') {
                showError('Código do projeto não informado');
                return;
            }

            var urlBase = '/rubrica';
            var data = {
                'acordo': acordoId,
                'dadosCombo': "[\"id\",\"nome\"]"
            };

            var comboFilho = selectRubrica;

            controlCombo(urlBase, data, comboFilho);
        };
        
        $("select[name='rateio']", mainForm).change(function () {

            var selectRateio = $(this),
                record = selectRateio.find("option:selected").data("record");
            
            var fldValorLancamentos = $("input[name='valorLancamentos']", mainForm),
                fldValorRateio = $("input[name='valorRateio']", mainForm);
            
            fldValorRateio.val(fldValorLancamentos.val());
            
            gridfieldItens.addArrayStore(record.itens);
            gridfieldItens.load();
        });
        
        $("select[data-name='rubrica']", mainForm).ready(function() {
            var modalFormParentParams = window['tabMainParams_dtTabBolsista'],
                acordoId = modalFormParentParams.acordo;

            loadSelectRubrica(acordoId);
        });
        
        $("select[data-name='rubrica']", mainForm).change(function () {
            var fldRubricaNome = $("input[data-name='rubricaNome']");
            fldRubricaNome.val($("select[data-name='rubrica'] option:selected").text());
        });
        
        $("input[data-name='operacao']", mainForm).change(function () {

            var radioOperacao = $(this),
                selectAcordo = $("select[data-name='acordo']", mainForm),
                selectRubrica = $("select[data-name='rubrica']", mainForm),
                operacao = radioOperacao.val();
                
            selectAcordo.empty();
            selectRubrica.empty();
            
            if(operacao === 'C') {
                selectAcordo.closest(".form-group").show();
            } else {
                selectAcordo.closest(".form-group").hide();
                var modalFormParentParams = window['tabMainParams_dtTabBolsista'],
                    acordoId = modalFormParentParams.acordo;
                loadSelect2({
                    url: select2AcordoAjaxUrl,
                    id: acordoId,
                    element: $("select[data-name='acordo']", mainForm)
                });
            }
        });
        
        $("select[data-name='acordo']", mainForm).change(function () {

            var fldAcordoNome = $("input[data-name='acordoNome']"),
                selectAcordo = $(this),
                recordAcordo = selectAcordo.select2('data')[0],
                acordoId = selectAcordo.val();
                
            fldAcordoNome.val(recordAcordo.nome);
            loadSelectRubrica(acordoId);
        });

        jQuery(document).ready(function() {
            gridfieldItens.init();
        });
    };