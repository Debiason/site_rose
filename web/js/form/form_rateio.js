var formSrc = '#form_rateio',
    alertSrc = '#alerts_form_rateio',
    formUrlBase = '/default/rateio',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        }
    },

    handleLocalListeners = function(mainForm)
    {
        var gridfieldItens = new Gridfield({
            element: '.gridfield-itens',
            type: 'advanced',
            action: '/item-rateio/index',
            mainParams: {
                'rateio': $(formSrc+" input[name=id]").val()
            }
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
        
        $("select[data-name='rubrica']", mainForm).change(function () {
            var fldRubricaNome = $("input[data-name='rubricaNome']");
            fldRubricaNome.val($("select[data-name='rubrica'] option:selected").text());
        });
        
        $("select[data-name='acordo']", mainForm).change(function () {

            var fldAcordoNome = $("input[data-name='acordoNome']"),
                selectAcordo = $(this),
                recordAcordo = selectAcordo.select2('data')[0],
                acordoId = selectAcordo.val();
                
            fldAcordoNome.val(recordAcordo.nome);
            loadSelectRubrica(acordoId);
        });
        
        $("input[data-name='operacao']", mainForm).change(function () {

            var radioOperacao = $(this),
                selectAcordo = $("select[data-name='acordo']", mainForm),
                selectRubrica = $("select[data-name='rubrica']", mainForm),
                operacao = radioOperacao.val();
                
            selectAcordo.empty();
            selectRubrica.empty();
            
            if(operacao === 'C') {
                selectAcordo.attr("required", true);
                selectAcordo.closest(".form-group").show();
            } else {
                selectAcordo.closest(".form-group").hide();
                selectAcordo.removeAttr('required');
            }
        });
        
        jQuery(document).ready(function() {
            gridfieldItens.init();
        });
    };