var formSrc = '#form_grupoacordo',
    alertSrc = '#alerts_form_grupoacordo',
    formUrlBase = '/default/grupo-acordo',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        nome: {
            required: true
        },
        descricao: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {
        var gridfieldAcordos = new Gridfield({
            element: '.gridfield-acordos',
            type: 'basic',
            action: '/grupo-acordo/get-acordos',
            submitOnlyId: true
        });

        jQuery(document).ready(function() {
            gridfieldAcordos.init();
        });
    };