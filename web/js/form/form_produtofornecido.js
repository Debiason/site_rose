var tabId = '#tabProdutoFornecido',
    modalFormSrc = '#form_produtofornecido',
    modalAlertSrc = '#alerts_form_produtofornecido',
    modalFormUrlBase = '/default/produto-fornecido',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    modalFormValidateRules = {
        id: {
            required: true
        },
        fornecedor: {
            required: true
        },
        produto: {
            required: true
        },
        comercializa: {
            required: false
        }
    },

    handleLocalListeners = function(mainForm)
    {

    };