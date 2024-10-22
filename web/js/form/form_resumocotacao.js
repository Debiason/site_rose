var modalFormSrc = '#form_resumocotacao',
    modalAlertSrc = '#alerts_form_resumocotacao',
    modalFormUrlBase = '/default/resumo-cotacao',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        parecer: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {
        // elements
        var fldParecer = $('textarea[name=parecer]', mainForm),
            btnEncaminharParecer = $('.btnEncaminharParecer', mainForm),
            btnAprovar = $('.btnAprovar', mainForm),
            btnRecusar = $('.btnRecusar', mainForm),
            btnEnviarParecerAnalise = $('.btnEnviarParecerAnalise', mainForm),
            btnSolicitarEmpenho = $('.btnSolicitarEmpenho', mainForm),
            btnAprovarEmpenho = $('.btnAprovarEmpenho', mainForm),
            btnReprovarEmpenho = $('.btnReprovarEmpenho', mainForm);
        
        var gridfieldInteracoes = new Gridfield({
            element: '.gridfield-interacoes',
            type: 'advanced',
            action: '/interacao-cotacao/index',
            mainParams: {
                'cotacao': $(modalFormSrc+" input[name=id]").val()
            },
            model: [
                {name: 'usuarioNome', type: 'string'},
                {name: 'descricao', type: 'string'},
                {name: 'dtRegistro', type: 'date'}
            ]
        });
    
        // triggers
        btnEncaminharParecer.click(alteraSituacao);
        btnAprovar.click(alteraSituacao);
        btnRecusar.click(alteraSituacao);
        btnEnviarParecerAnalise.click(alteraSituacao);
        btnSolicitarEmpenho.click(alteraSituacao);
        btnAprovarEmpenho.click(alteraSituacao);
        btnReprovarEmpenho.click(alteraSituacao);
        
        // functions
        function alteraSituacao() {
            modalFormUrlSave = modalFormUrlBase + '/' + $(this).data('actionUrl') + '/format/json';
            if (mainForm.validate().form()) {
                mainForm.submit();
            }
        };
        
        jQuery(document).ready(function() {
            gridfieldInteracoes.init();
        });
    };