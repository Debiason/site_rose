var modalFormSrc = '#form_etapa',
    modalAlertSrc = '#alerts_form_etapa',
    modalFormUrlBase = '/default/etapa',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario

    modalFormValidateRules = {
        id: {
            required: true
        },
        meta: {
            required: true
        },
        unidade: {
            required: false
        },
        descricao: {
            required: true
        },
        quantidadeEsperada: {
            required: false
        },
        quantidadeAtendida: {
            required: false
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
        /**
         * Função para controlar combo aninhado
         * @param urlBase
         * @param data
         * @param comboFilho
         */
        var controlComboMeta = function(urlBase, data, comboFilho, textKey) {
            if (typeof(textKey)==='undefined') textKey = 'nome';
            try {
                ajaxCall({
                    url: urlBase + '/fetchpair/format/json',
                    data: data,
                    async: false,
                    success: function(resp) {

                        var options = '<option value="">Selecione... </option>';

                        $.each(resp.data, function () {
                            if(this.id == comboFilho.data('originalValue')) {
                                options += '<option value="' + this.id + '" selected >' + this[textKey] + '</option>';
                            }else{
                                options += '<option value="' + this.id + '">' + this[textKey]+ '</option>';
                            }
                        });

                        comboFilho.html(options);
                        comboFilho.data('metaDetail', resp.data);
                    }
                });

            } catch (e) {
                // abre notificação de falha
                showError("Falha ao carregar o combo: " + comboFilho.attr('name'));
            }
        };

        $("select[name='meta']", mainForm).ready(function() {
            var selectMeta = $("select[name='meta']", mainForm),
                modalFormParentParams = window['tabMainParams_dtTabEtapa'],
                acordoId = modalFormParentParams.acordo;

            if(typeof acordoId === 'undefined') {
                showError('Nao foi possivel carregar os dados das metas');
                return;
            }

            var urlBase = '/meta';
            var data = {
                'acordo': acordoId,
                'dadosCombo': "[\"id\",\"descricao\",\"dtInicio\",\"dtFim\"]"
            };

            var comboFilho = selectMeta;

            controlComboMeta(urlBase, data, comboFilho, 'descricao');
        });

        // aplica regras no evento change
        $("select[name='meta']", mainForm).change(function () {

            var select = $(this),
                metaId = parseInt(select.val()),
                metaDetail = select.data("metaDetail");

            var detail = $.grep(metaDetail, function(a) {
                return ( a.id === metaId);
            }).pop();

            if(detail.length === 0) {
                return;
            }

            $("input[name='dtInicio']", mainForm).val(moment(detail.dtInicio).format('DD/MM/YYYY'));
            $("input[name='dtFim']", mainForm).val(moment(detail.dtFim).format('DD/MM/YYYY'));
        });
    };