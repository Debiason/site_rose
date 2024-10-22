var formSrc = '#form_dossieimportacao',
    alertSrc = '#alerts_form_dossieimportacao',
    formUrlBase = '/default/dossie-importacao',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    formValidateRules =
    {
        id: {
            required: true
        },
        processoCompra: {
            required: true
        },
        compradorResponsavel: {
            required: true
        },
        tipoDossie: {
            required: true
        },
        exportador: {
            required: true
        },
        moeda: {
            required: true
        }
    },

    handleLocalListeners = function(mainForm)
    {
        // elements form
        var selectExportador = $("select[name=exportador]", mainForm),
            selectRepresentante = $("select[name=representante]", mainForm),
            radioFormaPagamento = $("input[name=formaPagamento]", mainForm),
            checkImportacao = $("input[name=avulsa]", mainForm);
    
        // triggers
        selectExportador.change(loadSelectRepresentante);
        
        selectRepresentante.ready(loadSelectRepresentante);
        
        radioFormaPagamento.change(loadDadosTransferencia);
        radioFormaPagamento.ready(loadDadosTransferencia);
        
        checkImportacao.change(loadDadosImportacao);
        checkImportacao.ready(loadDadosImportacao);
        
        // functions
        function loadSelectRepresentante() {
            
            var exportadorId = selectExportador.val();
            
            if(!exportadorId) {
                return;
            }
            
            var urlBase = '/fornecedor';
            var data = {
                'pai': exportadorId,
                'dadosCombo': '["id","nome"]'
            };
            
            controlCombo(urlBase, data, selectRepresentante, '', true);
        }
        
        function loadDadosTransferencia()
        {
            var formaPagamento = $("input[name=formaPagamento]:checked", mainForm).val(),
                dadosTransferencia = $(".dados-transferencia", mainForm);
            
            if(formaPagamento === 'Transferência') {
                dadosTransferencia.show();
            } else {
                $(".dados-transferencia input, .dados-transferencia select").val('');
                dadosTransferencia.hide();
            }
        }
        
        function loadDadosImportacao()
        {
            var importacaoAvulsa = $("input[name=avulsa]:checked", mainForm).val(),
                dadosImportacao = $(".dados-importacao", mainForm);
            
            if(importacaoAvulsa) {
                dadosImportacao.show();
            } else {
                $(".dados-importacao input, .dados-importacao select").val('');
                dadosImportacao.hide();
            }
        }
    };