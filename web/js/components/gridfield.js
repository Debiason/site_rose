var Gridfield = function (options) {

    this.autoLoad = typeof options.autoLoad !== 'undefined' ? options.autoLoad : true;
    this.element = options.element;
    this.type = options.type;
    this.actionCreate = options.actionCreate;
    this.actionRead = options.actionRead;
    this.actionUpdate = options.actionUpdate;
    this.action = options.action;
    this.form = options.form;
    this.displayField = options.displayField || 'nome';
    this.valueField = options.valueField || 'id';
    this.submitOnlyId = options.submitOnlyId || false;
    this.mainParams = options.mainParams || false;
    this.allowRemove = options.allowRemove || true;
    this.allowEdit = options.allowEdit || true;
    this.hasCheckbox = options.hasCheckbox || false;
    this.actionDelete = options.actionDelete;
    this.deleteAjax = options.deleteAjax || false;
    this.submitForm = options.submitForm || false;
    this.formatCampo = options.formatCampo || null;
    this.dadosPost = options.dadosPost || null;
    this.actionDeleteEmMassa = options.actionDeleteEmMassa || null;
    this.actionHistorico = options.historico || false;

    this.model = options.model || '';
    this.store = [];

    this.allowEdit = this.allowEdit != '999999' ? this.allowEdit : false;

    this.floatFields = [
        "quantidade",
        "valor",
        "valorTotal"
    ];

    var me = this;

    // exclusão em massa
    if($(me.element + " .btn-gridfield-del")) {        
        $(me.element + " .btn-gridfield-del").on("click", function () {
            let countCheckedChecked = $(me.element + " .checkbox:checked").length;
            let i = 0;
            var id = '';
            if(countCheckedChecked > 0) {
                $(me.element + " .checkbox").each(function (index) {
                    if ($(this).is(':checked')) {
                        id = String($(this).data().id).replace(/\D/g, '');
                        
                        if(id.length > 0) {
                            me.remove(id);
                        }
                        i++;
                    }
                });

                if(i === countCheckedChecked)
                    me.load();
            }
        });
    }

    // exclusao em massa com ajax
    if($(me.element + " .btn-excluirEmMassa")) {
        $(me.element + " .btn-excluirEmMassa").on("click", function () {
            let countCheckedChecked = $(me.element + " .checkbox:checked").length;
            let i = 0;
            var id = '';
            var ids = [];
            if(countCheckedChecked > 0) {
                $(me.element + " .checkbox").each(function (index) {
                    if ($(this).is(':checked')) {
                        id = String($(this).data().id).replace(/\D/g, '');
                        if(id.length > 0) {
                            ids.push($(this).data().id);
                            me.remove(id);
                        }
                        i++;
                    }
                });

                $.ajax({
                    url: me.actionDeleteEmMassa,
                    data: {
                        ids: ids
                    },
                    async: false,
                    success: function (resp) {

                    }
                });

                if(i === countCheckedChecked)
                    me.load();
            }
        });
    }

    //controla acao do botao adicionar
    $(this.element + " .btn-gridfield-add").on("click", function () {
        if (me.type == "advanced") {
            $(me.element + " .gridfield-form").load(me.actionCreate + "?" + $.param(me.mainParams), function () {
                $(me.element + " .gridfield-form").show("slow");
            });

        } else {
            me.add();
            me.load();
        }
    });

    //controla acao do botao habilitar/desabilitar e-mail
    $(this.element + " .btn-gridfield-habilitarEmail").on("click", function () {

        var id = [];
        var i = 0;
        var idEdit = [];
        var indice = 0;

        $('.checkbox').each(function () {
            if ($(this).is(':checked')) {
                id.push($(this).data().id);
                idEdit[indice] = $(this).data().id;
            }
            indice++;
        });

        valorAtutal = me.store[0]['recebeemailValor'];

        $.each(me.store, function (key, value) {
            if (id.indexOf(value.id) > -1 || value.id == idEdit[i] || id.indexOf(value.tempId) > -1) {
                if (valorAtutal == '<span class=letras-verdes>Sim</span>') {
                    value.recebeemailValor = '<span class=valor-debito>Não</span>';
                } else {
                    value.recebeemailValor = '<span class=letras-verdes>Sim</span>';
                }
            }
            i++;
        });
        me.load();

    });

    //controla acao do botao cotar/nao cotar
    $(this.element + " .btn-gridfield-cotar").on("click", function () {

        var id = [];
        var i = 0;

        $('.checkbox:checked').each(function () {
            id[i] = $(this).data().id;
            $.each(me.store, function (key, value) {
                if (value.id == id[i] || value.tempId == id[i]) {
                    if (value.cotarItem == '<span class=letras-verdes>Sim</span>') {
                        value.cotarItem = '<span class=valor-debito>Não</span>';
                    } else {
                        value.cotarItem = '<span class=letras-verdes>Sim</span>';
                    }
                }
            });
            me.load();
            i++;
        });

    });

    //controla acao do botao remover
    $("body").on("click", this.element + " .btn-gridfield-remove", function () {

        var id = $(this).data('id');

        if (me.deleteAjax) {

            $.ajax({
                url: me.actionDelete + "?" + $.param(me.mainParams),
                data: {
                    id: id,
                },
                async: false,
                type: 'post',
                success: function (resp) {
                    window.location.reload();
                }
            });

        } else {
            me.remove(id);
            me.load();
        }

    });

    //controla acao do botao fracassar item
    $("body").on("click", this.element + " .btn-gridfield-feacassar-item", function () {

        var id = [];
        var i = 0;

        $('.checkbox:checked').each(function () {
            id[i] = $(this).data().id;
            $.each(me.store, function (key, value) {
                if (value.id == id[i] || value.tempId == id[i]) {
                    console.log(value);
                    if (value.situacao == '<span class=valor-debito>Item fracassado</span>') {
                        value.situacao = 'Em processo de compra';
                    } else {
                        value.situacao = '<span class=valor-debito>Item fracassado</span>';
                    }
                }
            });
            me.load();
            i++;
        });

    });

    //controla acao do botao item deserto
    $("body").on("click", this.element + " .btn-gridfield-item-deserto", function () {

        var id = [];
        var i = 0;

        $('.checkbox:checked').each(function () {
            id[i] = $(this).data().id;
            $.each(me.store, function (key, value) {
                if (value.id == id[i] || value.tempId == id[i]) {
                    console.log(value);
                    if (value.situacao == '<span class=valor-debito>Item deserto</span>') {
                        value.situacao = 'Em processo de compra';
                    } else {
                        value.situacao = '<span class=valor-debito>Item deserto</span>';
                    }
                }
            });
            me.load();
            i++;
        });

    });

    //controla acao do botao editar
    $("body").on("click", this.element + " .btn-gridfield-edit", function () {
        var id = $(this).data('id');
        me.edit(id);
        me.load();
    });

    //controla acao do botao submit em formularios
    $(this.element).on('submit', '.gridfield-form form', function (event) {
        if (me.submitForm) {
            return true;
        }
        event.preventDefault(); // stopping submitting
        var btnTitle = $(me.element).find('button[type=submit]').text()
        if (btnTitle == 'Alterar') {
            console.log('gridfield - alterar');
            me.advancedUpdate(this);
        } else {
            console.log('gridfield - adicionar');
            me.advancedAdd(this);
        }
        me.load();

        return false;
    });

    //controla acao do botao adicionar em formularios
    /*$(this.element+" .btn-gridfield-form-add").on("click", function() {
        me.advancedAdd();
        me.load();
    });*/

    //controla acao do botao cancelar em formularios
    $("body").on("click", this.element + " .btn-gridfield-form-cancel", function () {
        //oculta formulario
        $(me.element + " .gridfield-form").hide("slow", function () {
            //limpa formulario
            $(me.element + " .gridfield-form").html("");
        });
    });

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
};

Gridfield.prototype.init = function () {
    var me = this;
    try {
        var dataParams = {
            sort: 'id',
            dir: 'DESC'
        };
        if (me.mainParams) {
            dataParams = $.extend(true, dataParams, me.mainParams);
        } else {
            dataParams = $.extend(true, dataParams, {
                id: $(me.element).closest("form").find("input[name=id]").val()
            });
        }
        if (me.autoLoad) {

            var dadosTable;

            if (me.dadosPost != null){
                var dadosTable = JSON.parse(me.dadosPost);
            }else {
                $.ajax({
                    url: me.actionRead,
                    data: dataParams,
                    async: false,
                    success: function (resp) {
                        dadosTable = resp.data;
                    }
                });
            }

            $(me.element + " .store").val(JSON.stringify(dadosTable));
            $(me.element + " .store").data("gridfieldStore", dadosTable);
            me.store = $(me.element + " .store").data("gridfieldStore");
            me.load();

        } else {
            me.cleanStore();
            me.load();
        }

    } catch (e) {
        console.log(e);
        toastr.error('Não foi possivel buscar registros do gridfield: ' + me.element, "Erro:");
    }
};

Gridfield.prototype.load = function () {
    var me = this,
        value = me.store;
    $(me.element + " .store").data("gridfieldStore", value);

    if (this.submitOnlyId) {
        value = $.map(value, function (obj) {
            return obj[me.valueField];
        });
    }

    $(me.element + " .store").val(JSON.stringify(value));
    var lines = '';
    if (me.type == "advanced") {
        var model = me.model ? me.model : $(me.element + " .gridfield-table").data("model").split(";");
        var colspanValue = model.length + 1;

        if($(me.element).find("#checkAllItens")){
            colspanValue++;
        }

        $.each(me.store, function () {
            var item = this;
            var idToAction = item.id || item.tempId;
            lines += '<tr>';

            if (me.hasCheckbox) {
                lines += '<td>' + '<input class="checkbox" type="checkbox" data-id=' + idToAction + '>' + '</td>';
            }

            $.each(model, function (i, att) {
                var paramName = att.name ? att.name : att;
                var displayValue = att.name ? item[att.name] : item[att];
                // FORMATA OS CAMPOS
                if ((att.name && att.type === 'float') || (!att.name && $.isNumeric(displayValue) && me.formatCampo != 'codigo' && paramName != 'numero' && paramName != 'cnpj')) {
                    displayValue = me.formatNumberDefault(displayValue);
                } else if (att.name && att.type === 'date') {
                    displayValue = formatDate(displayValue);
                }
                lines += '<td>' + (displayValue ? displayValue : '') + '</td>';
            });
            // MONTA COLUNA DE ACAO
            lines += '<td>';
            if (me.allowEdit) {
            //if (me.allowEdit && me.allowEdit != '999999') {
                lines += '<a title="Editar" href="javascript:;" class="btn dark btn-sm btn-outline sbold uppercase btn-gridfield-edit" data-id="' + idToAction + '"><i class="fas fa-pencil-alt"></i></a>';
            }
            if (me.allowRemove) {
                lines += '<a id="btnDelete" title="Remover" href="javascript:;" class="btn dark btn-sm btn-outline sbold uppercase btn-gridfield-remove" data-id="' + idToAction + '"><i class="fas fa-trash-alt"></i></a>';
            }
            if (me.actionHistorico) {
                lines += '<a title="Histórico" href="' + me.actionHistorico + idToAction + '" target="_blank" class="btn dark btn-sm btn-outline sbold uppercase"><i class="fas fa-history"></i></a>';
            }
            lines += '</td>';
            lines += '</tr>';
        });
    } else {
        $.each(me.store, function () {
            lines += '<tr><td>' + this[me.valueField] + '</td><td>' + this[me.displayField] + '</td><td><a href="javascript:;" class="btn dark btn-sm btn-outline' +
                ' sbold uppercase btn-gridfield-remove" data-id="' + this[me.valueField] + '"><i class="fa fa-trash"></i></a></td></tr>';
        });
        var colspanValue = 3;
    }
    if (!lines) {
        lines = '<tr><td colspan="' + colspanValue + '">Nenhum item foi adicionado.</td></tr>';
    }
    $(me.element + " table tbody").html(lines);
};

Gridfield.prototype.add = function () {
    var me = this;
    var selected = $(me.element + " select").select2('data')[0];
    var itemExist = false;

    if ($.isEmptyObject(selected) || typeof selected === 'undefined') {
        toastr.error('Selecione um registro!', "Erro:");
        return;
    }

    var selectedAdd = {};
    selectedAdd[me.valueField] = selected.id;
    selectedAdd[me.displayField] = selected.nome || selected.text;

    $.each(me.store, function () {
        if (this[me.valueField] == selected.id) {
            itemExist = true;
        }
    });

    if (!itemExist) {
        me.store.unshift(selectedAdd);
        $(me.element + " .store").data("gridfieldStore", me.store);
    } else {
        toastr.warning('Este registro já foi adicionado.', "Atençao:");
    }

    $(me.element + " select").val(null).trigger("change");
};

Gridfield.prototype.remove = function (id) {
    var me = this;
    var newStore = [];
    var itemRemoved = false;


    if (me.type == "advanced") {
        $.each(me.store, function () {
            if (this.tempId != id && this.id != id) {
                newStore.push(this);
            } else {
                itemRemoved = true;
            }
        });
    } else {
        $.each(me.store, function () {
            if (this[me.valueField] != id) {
                newStore.push(this);
            } else {
                itemRemoved = true;
            }
        });
    }

    $(me.element + " .store").data('gridfieldStore', newStore);
    me.store = $(me.element + " .store").data("gridfieldStore");

    if (itemRemoved) {
        //toastr.warning('Registro removido.', "Atenção:");
    }
};

Gridfield.prototype.edit = function (id) {
    var me = this;
    var item;

    $.each(me.store, function () {
        if (this.tempId == id || this.id == id) {
            item = this;
            $.ajax({
                url: me.actionUpdate + "?" + $.param(me.mainParams),
                data: item,
                async: false,
                type: 'post',
                success: function (resp) {
                    $(me.element + " .gridfield-form").html(resp);
                    $(me.element + " .gridfield-form").show("slow");
                }
            });
            return false;
        }
    });
};

Gridfield.prototype.getFormData = function (form) {
    var $form = $(form);
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    var _attributes = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    $.map(unindexed_array, function (n, i) {
        var name = n['name'];
        name = name.substring(name.indexOf("[") + 1);
        name = name.replace(']', '');
        _attributes[name] = n['value'];
    });

    indexed_array['_attributes'] = _attributes;

    return indexed_array['_attributes'];
};

Gridfield.prototype.advancedAdd = function (form) {
    var me = this;
    var data = me.getFormData(form);
    var model = {
        id: '',
        tempId: $.now()
    };
    //console.log(data);
    var item = $.extend(true, data, model);
    if (me.addItem(item)) {
        $(me.element + " .gridfield-form").html();
        $(me.element + " .gridfield-form").hide();
        me.load();
    }
};

Gridfield.prototype.advancedUpdate = function (form) {
    var me = this;
    var data = me.getFormData(form);
    var newStore = [];
    var item = data;

    $.each(me.store, function () {
        var idToAction = item.id || item.tempId;
        if (this.id) {
            if (this.id != item.id) {
                newStore.push(this);
            } else {
                newStore.push(data);
            }
        } else {
            if (this.tempId && this.tempId == data['tempId']) {
                newStore.push(data);
            }else {
                newStore.push(this);
            }
        }
    });

    me.updateStore(newStore);
    $(me.element + " .gridfield-form").html();
    $(me.element + " .gridfield-form").hide();
    me.load();

};

Gridfield.prototype.addItem = function (item) {
    var me = this;
    var items = me.store;

    items.push(item);
    me.updateStore(items);
    return true;
};

Gridfield.prototype.updateStore = function (data) {
    var me = this;
    $(me.element + " .store").data("gridfieldStore", data);
    me.store = $(me.element + " .store").data("gridfieldStore");
};

Gridfield.prototype.cleanStore = function () {
    var me = this;
    $(me.element + " .store").val(JSON.stringify([]));
    $(me.element + " .store").data("gridfieldStore", []);
    me.store = $(me.element + " .store").data("gridfieldStore");
};

Gridfield.prototype.getFloatFields = function () {
    var me = this;

    if (!me.model) {
        return me.floatFields;
    }

    var floatFields = [];

    $.each(me.model, function (key, field) {
        if (field.type === 'float') {
            floatFields.push(field.name);
        }
    });

    return floatFields;
};

Gridfield.prototype.addArrayStore = function (data) {
    var me = this;
    var model = {};

    me.cleanStore();

    $.each(data, function (i, item) {
        model = {
            id: '',
            tempId: $.now()
        };
        model = $.extend(true, model, item);
        me.store.unshift(model);
    });
};

Gridfield.prototype.formatNumber = function (thousands, decimal, precision, prefix, postfix) {
    return {
        display: function (d) {
            if (typeof d !== 'number' && typeof d !== 'string') {
                return d;
            }

            var negative = d < 0 ? '-' : '';
            var notflo = d;
            var flo = parseFloat(d);

            // If NaN then there isn't much formatting that we can do - just
            // return immediately, escaping any HTML (this was supposed to
            // be a number after all)
            if (isNaN(flo)) {
                return notflo;
            }

            d = Math.abs(flo);

            var intPart = parseInt(d, 10);
            var floatPart = precision ?
                decimal + (d - intPart).toFixed(precision).substring(2) :
                '';

            return negative + (prefix || '') +
                intPart.toString().replace(
                    /\B(?=(\d{3})+(?!\d))/g, thousands
                ) +
                floatPart +
                (postfix || '');
        }
    };
};

Gridfield.prototype.formatNumberDefault = function (data) {
    var me = this;
    var formated = me.formatNumber('.', ',', 2).display(data);
    if (!formated) {
        return '0,00';
    }
    return formated;
};