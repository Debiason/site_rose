var tabId = '#tabPermissaoUsuario',
    modalFormSrc = '#form_permissaousuario',
    modalAlertSrc = '#alerts_form_permissaousuario',
    modalFormUrlBase = '/default/permissao-usuario',
    modalFormUrlSave = modalFormUrlBase + '/save/format/json',
    modalFormVerificaRegras = false, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    modalFormParentUrlBase = '/default/usuario',

    modalFormValidateRules = {
        id: {
            required: true
        },
        usuario: {
            required: true
        },
        perfil: {
            required: true
        },
        grupoRegra: {
            required: true
        },
        permissoes: {
            required: true
        },
        dtRegistro: {
            required: false
        },
    },

    handleLocalListeners = function(mainForm)
    {
        jQuery(document).ready(function(){
            var permissoes = JSON.parse($("input[name=permissoes]").val());
            var permissoesTree = arrayToTree(permissoes);
            var selectTemplatePermissao = $('select[name=templatePermissao]');

            $('#treePermissoes').jstree({
                "core" : {
                    "expand_selected_onload" : false,
                    "check_callback" : true,
                    "worker" : true,
                    "animation" : true,
                    "themes" : {
                        "variant" : "large"
                    },
                    'data' : {
                        'text': 'Entidades',
                        'type': 'root',
                        'state': {
                            'opened': true
                        },
                        'children': permissoesTree
                    }
                },
                "checkbox" : {
                    "keep_selected_style" : false
                },
                "plugins" : [ "contextmenu", "checkbox", "search", "types", "ui" ],
                "types": {
                    "root": {
                        "icon": "jstree-icon jstree-themeicon fa fa-folder icon-state-warning jstree-themeicon-custom"
                    },
                    "entity": {
                        "icon": "jstree-icon jstree-themeicon fa fa-database icon-state-info jstree-themeicon-custom"
                    },
                    "action": {
                        "icon": "jstree-icon jstree-themeicon fa fa-key icon-state-success jstree-themeicon-custom"
                    }
                },
                "contextmenu":{
                    "items": function($node) {
                        var tree = $("#treePermissoes").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Adicionar",
                                "submenu": {
                                    "create_folder": {
                                        "separator_after": true,
                                        "label": "Entidade/Grupo",
                                        "action": function (data) {
                                            var inst = $.jstree.reference(data.reference),
                                                obj = inst.get_node(data.reference);
                                            inst.create_node(obj, {type: "entity"}, "last", function (new_node) {
                                                setTimeout(function () {
                                                    inst.edit(new_node);
                                                }, 0);
                                            });
                                        }
                                    },
                                    "create_file": {
                                        "label": "Action/Valor",
                                        "action": function (data) {
                                            var inst = $.jstree.reference(data.reference),
                                                obj = inst.get_node(data.reference);
                                            inst.create_node(obj, {type: "action"}, "last", function (new_node) {
                                                setTimeout(function () {
                                                    inst.edit(new_node);
                                                }, 0);
                                            });
                                        }
                                    }
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Renomear",
                                "action": function (obj) {
                                    tree.edit($node);
                                }
                            },
                            "Remove": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Excluir",
                                "action": function (obj) {
                                    tree.delete_node($node);
                                }
                            }
                        };
                    }
                }
            });
            $('#treePermissoes').on("click", function() {
                //atualiza campo permissoes com os valores definidos na arvore
                var treeData = $('#treePermissoes').jstree().get_json();
                $("input[name=permissoes]").val(JSON.stringify(treeToArray(treeData[0].children)));
            });
            $('.btn-carregar-template').on("click", function() {
                //atualiza arvore baseado no template
                $('#treePermissoes').jstree(true).settings.core.data = {
                    'text': 'Entidades',
                    'type': 'root',
                    'state': {
                        'opened': true
                    },
                    'children': arrayToTree(JSON.parse(selectTemplatePermissao.val()))
                };
                $('#treePermissoes').jstree(true).refresh();
                //atualiza campo permissoes com os valores definidos na arvore
                var treeData = $('#treePermissoes').jstree().get_json();
                $("input[name=permissoes]").val(JSON.stringify(treeToArray(treeData[0].children)));
            });
        });
    };