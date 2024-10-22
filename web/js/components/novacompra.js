var conteudoEtapa1 = $(".step1");
var conteudoEtapa2 = $(".step2");
var conteudoEtapa2Gas = $(".step2Gas");
var conteudoEtapa3 = $(".step3");
var conteudoCarrinho = $(".conteudo-carrinho");
var msgCarrinhoVazio = $(".msg-carrinho-vazio");
var loaderCarrinho = $(".loader-carrinho");
var totalItens = $(".conteudo-carrinho-total");
var btnSalvarEscolha = $("button[id='btn-salvar-escolha']");
var btnOpenModal =  $("button[id='btn-open-modal']");

const autoIncrementCar = {
    add: function add() {
        let id = localStorage.getItem('autoIncrementCar');
        if (id === null) {
            localStorage.setItem('autoIncrementCar', '0');
            id = 0
        } else {
            id = localStorage.getItem('autoIncrementCar');
            id = id.replace(/[^0-9]/g, '')
            if (id.length === 0 || Number(id) === 0)
                id = 0
        }
        let new_id = parseInt(id) + 1;

        localStorage.setItem('autoIncrementCar', new_id);
        return new_id;
    },
    reset: function reset() {
        return 0;
    }
};

function removerAnexo(id) {
    var anexos = localStorage.getItem('produtoAnexo');
    anexos = JSON.parse(anexos);

    if (!anexos || anexos.length === 0) return false;

    for (let i = 0; i < anexos.length; i++) {
        if (anexos[i].hasOwnProperty('carrinho_id'))
            if (id === anexos[i].carrinho_id) {
                anexos.splice(i, 1);
                localStorage.setItem('produtoAnexo', JSON.stringify(anexos));
            }
    }
    $("#box-imagem-anexo").hide('fast');
    $("#box-imagem-anexo #nameImageAnexo").html('');
    return true;
}

$.verificaPassagem = function () {
    var itensCarrinho = $.getItensCarrinho();
    console.log(itensCarrinho);
    if (itensCarrinho[0].produtoId == 11778) {
        $("#link-compra-produtos").hide();
        $("#link-passagem").show();
    } else {
        $("#link-passagem-grid").hide();
    }
};

$.configurarFormulario = function () {
    $(".btn-gerar-pedido").addClass('disabled');

    $('#selecionarTudo').change(function () {
        $('input[name="itensSelecionados[]"]').prop('checked', this.checked);
        if (this.checked) {
            $(".btn-gerar-pedido").removeClass('disabled');
        } else {
            $(".btn-gerar-pedido").addClass('disabled');
            conteudoEtapa1.show("slow");
            conteudoEtapa3.hide();
        }
    });

    $('input[name="itensSelecionados[]"]').change(function () {
        if ($('input[name="itensSelecionados[]"]:checked').length > 0) {
            $(".btn-gerar-pedido").removeClass('disabled');
        } else {
            $(".btn-gerar-pedido").addClass('disabled');
            conteudoEtapa1.show("slow");
            conteudoEtapa3.hide();
        }
    });

    document.getElementById('compra-responsavelcelular').addEventListener('input', function(event) {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        if (inputValue.length <= 11) {
            inputValue = inputValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
        } else {
            inputValue = inputValue.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4');
        }
        event.target.value = inputValue;
    });

    document.getElementById('compra-responsaveltelefone').addEventListener('input', function(event) {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        if (inputValue.length <= 11) {
            inputValue = inputValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
        } else {
            inputValue = inputValue.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4');
        }
        event.target.value = inputValue;
    });
};

$(window).on("load", function(){
    var itensCarrinho = $.getItensCarrinho();
    if (itensCarrinho.length == 0) {
        return;
    }
    var item = itensCarrinho[0]['_attributes'];
    var projetoId = item.projeto_id;
    $.configurarFormulario();
    if (projetoId === undefined) {
        $.alterar(0);
        $("#validaProjetoMarcado").show();
    }
});
$(document).ready(function () {
    $.carregaCarrinho();

    $(document).on('click', '.btn-grupo', function (event) {
        event.preventDefault();
        $.iniciarEtapa2($(this).attr('href'));
    });

    $(document).on('click', '.btn-cancelar', function (event) {
        $.cancelar();
    });

    $(document).on('change', '#fld-projeto_id', function (){
        $("#validaProjetoMarcado").hide();
    });

    // SEGUNDA ETAPA - AÇÕES DO BOTÃO VOLTAR
    $(document).on('click', '.step2 .btn-voltar', function (event) {
        conteudoEtapa2.html(" ");
        conteudoEtapa2.hide();
        conteudoEtapa1.show("slow");

        history.pushState({
            id: 'nova-compra=etapa-1'
        }, 'Agrega - Nova Compra', '?etapa=1');
    });

    // SEGUNDA ETAPA - AÇÕES DO BOTÃO ADICIONAR AO CARRINHO
    $(document).on('submit', '.step2 form', function (event) {
        event.preventDefault(); // stopping submitting

        if (validaPrazoMinimo()) {
            $.adicionarCarrinho(this);
        }
    });

    // SEGUNDA ETAPA - AÇÕES DO BOTÃO ALTERAR
    $(document).on('click', '.step2 form .btn-alterar', function (event) {
        var form = $('.step2 form');

        if (validaPrazoMinimo()) {
            $.alterarCarrinho(form);
        }

    });

    $(document).on('click', '.btn-gerar-pedido', function (event) {

        if ($.getItensCarrinho() == null || $.getItensCarrinho().length == 0) {
            toastr.warning('Seu carrinho está vazio', 'Atenção')
            return false;
        }

        if ($(this).hasClass('disabled')) {
            swal({
                title: "Atenção",
                html: "Não há itens selecionados no seu carrinho. <br> " +
                    "Por favor, selecione o item que você deseja comprar marcando a caixa de seleção.",
                type: "warning",
                confirmButtonColor: "#34bfa3",
            });
            return false;
        }

        $.iniciarEtapa3();
    });

    // TERCEIRA ETAPA - AÇÕES DO BOTÃO VOLTAR
    $(document).on('click', '.step3 .btn-voltar', function (event) {
        conteudoEtapa1.show("slow");
        conteudoEtapa3.hide();

        history.pushState({
            id: 'nova-compra=etapa-1'
        }, 'Agrega - Nova Compra', '?etapa=1');
    });

    // DETALHES PEDIDO - AÇÕES DO BOTÃO VOLTAR
    $(document).on('click', '.btn-voltar-detalhes', function (event) {
        conteudoEtapa3.show("slow");
        $('.compra-nova').show("slow");
        $('.detalhes-compra').hide();

        history.pushState({
            id: 'nova-compra=etapa-3'
        }, 'Agrega - Nova Compra', '?etapa=3');
    });

    // TERCEIRA ETAPA - AÇÕES DO BOTÃO ADICIONAR AO CARRINHO
    $(document).on('submit', '.step3 form', function (event) {
        event.preventDefault(); // stopping submitting

        if (validaVigenciaAcordo()) {

            if (verificaProdutoControladoUfvByAcordo()) {

                var laboratorio = $("#fld-laboratorio").val();

                if (!laboratorio) {
                    erro = '"Laboratório" não pode ficar em branco.';
                    toastr.error(erro);
                } else {
                    $.verDetalhes(this);
                }

            } else {
                $.verDetalhes(this);
            }
        }

    });

    $(document).on('change', '#itemproduto-dtmaximaentrega-disp', function (event) {
        validaPrazoMinimo();
    });

    $(document).on('change', '#fld-acordo', function (event) {
        validaVigenciaAcordo();
        //verificaProdutoControladoUfvByAcordo();
    });

    btnSalvarEscolha.click(function (event) {
        verificaProdutoControladoUfvByAcordo();
    });

    $.configurarFormulario();

});

$.iniciarEtapa2 = function (href) {
    history.pushState({
        id: 'nova-compra=etapa-2'
    }, 'Agrega - Nova Compra', '?etapa=2');

    conteudoEtapa1.hide();
    conteudoEtapa3.hide();
    conteudoEtapa2.load(href, function () {
        conteudoEtapa2.show("slow");
        $("#validaProjetoMarcado").show();
    });

    var itensCarrinho = $.getItensCarrinho();

    if (itensCarrinho.length == 0) {
        return;
    }

    var item = itensCarrinho[0]['_attributes'];
    var projetoId = item.projeto_id;

    if (importacao){
        projetoId = 3113;
    }

    if (href === '/compra/nova-etapa2/?grupo_id=95') {
        $(document).on('change', '#fld-produto', function (event) {
            setTimeout(function () {
                $("#fld-projeto_id").val(projetoId).trigger('change');
            }, 700);
        });
    }

    setTimeout(function () {
        $("#fld-projeto_id").val(projetoId).trigger('change');
    }, 700);

};

$.iniciarEtapa3 = function (href) {
    var todosCheckboxes = $('input[name="itensSelecionados[]"]');
    var id_checkbox = 0;
    // Itera sobre todos os checkboxes e verifica qual esta marcado
    todosCheckboxes.each(function(index) {
        if ($(this).is(':checked')) {
            id_checkbox = index;
        }
    });
    var itensCarrinho = $.getItensCarrinho();
    var item = itensCarrinho[id_checkbox]['_attributes'];
    var projetoId = item.projeto_id;
    var select2 = $('#fld-acordo');
    const radioInputEndereco = $('input[type="radio"][name="radio_endereco_entrega"]');

    history.pushState({
        id: 'nova-compra=etapa-3'
    }, 'Agrega - Nova Compra', '?etapa=3');

    $.verificaEndereco();
    $.verificaTermoReferencia();

    if (importacao) {
        projetoId = 3113;
    }

    var opcaoFiltrada = select2.find('option[value="' + projetoId + '"]');
    $('#fld-acordo').empty();
    $('#fld-acordo').append(new Option('Selecione ...', ''));
    $('#fld-acordo').append(opcaoFiltrada);
    $('#fld-acordo').select2();

    setTimeout(function () {
        $("#fld-acordo").val(projetoId).trigger('change');
    }, 300);

    setTimeout(function () {
        if ($('#tipo-entrega').val() === 'fisica') {
            $("#modalEnderecoEntrega").modal('show');
            $(".body-radio-entrega").load('/endereco-entrega/radio-button-options?acordo_id=' + projetoId);
        }
    }, 1500);

    $("#confirmar-btn").click(function () {
        $('#fld-acordo').prop('disabled', false);
    });
    conteudoEtapa1.hide();
    conteudoEtapa2.hide();
    conteudoEtapa3.show("slow");
};

$.carregaCarrinho = function () {

    //tenta preencher carrinho via ajax caso nao encontre no local storage
    if ($.getItensCarrinho() == null || $.getItensCarrinho().length == 0) {
        var itensCarrinhoAjax = '[]';
        loaderCarrinho.show("slow");
        $.ajax({
            url: '/compra/get-carrinho-ajax/',
            async: false,
            success: function (resp) {
                if (resp && resp.itens) {
                    itensCarrinhoAjax = resp.itens;
                }
            }
        });
    }

    if ($.getItensCarrinho() == null || $.getItensCarrinho().length == 0) {
        totalItens.html(0);
        conteudoCarrinho.hide();
        loaderCarrinho.hide("slow");
        msgCarrinhoVazio.show("slow");
    } else {
        msgCarrinhoVazio.hide();
        var j = 0;
        var itensCarrinho = $.getItensCarrinho();
        var htmlCarrinho = "<table class=\"table table-striped m-table\"><thead>" +
            "   <tr>" +
            "   <th><input type=\"checkbox\" id=\"selecionarTudo\" style=\"transform: scale(0.9); display: block; margin: auto;\"></th>" + // Checkbox
            "   <th>Produto</th>" +
            "   <th>Qtd</th>" +
            "   <th></th>" +
            "   </tr>" +
            "</thead>" +
            "<tbody>";
        for (var i in itensCarrinho) {
            var item = itensCarrinho[i],
                produtoNome = item.produtoNome,
                quantidade = item._attributes.quantidade,
                unidade = item.unidadeNome,
                acoes = '<a title="Editar" href="#" onclick="javascript:$.alterar(' + i + ')"><i class="fas fa-pencil-alt"></a></i> ' +
                    '<a title="Remover" href="#" onclick="javascript:$.remover(' + i + ')"><i class="far fa-trash-alt"></i></a>';
            if (typeof quantidade === 'undefined') {
                quantidade = '';
            }
            if (typeof unidade === 'undefined') {
                unidade = '';
            }
            htmlCarrinho += "<tr>";
            htmlCarrinho += "<td style=\"text-align: center; vertical-align: middle; transform: scale(0.9);\"><input type=\"checkbox\" name=\"itensSelecionados[]\"></td>"; // Checkbox
            htmlCarrinho += "<td style=\"max-width: 220px;\">" + produtoNome + "</td>";
            htmlCarrinho += "<td style=\"text-align: center; vertical-align: middle;\">" + quantidade + " " + unidade + "</td>";
            htmlCarrinho += "<td>" + acoes + "</td>";
            htmlCarrinho += "</tr>";
            j += 1;
        }
        htmlCarrinho += "</tbody></table>";
        conteudoCarrinho.html(htmlCarrinho);
        totalItens.html(j);
        loaderCarrinho.hide("slow");
        conteudoCarrinho.show("slow");
    }
};

$.adicionarCarrinho = function (form) {
    var data = $.getFormData(form);
    $(".btn-adicionar").on('click', function (){
        $('#fld-projeto_id').prop('disabled', false);
    })

    if ($.addItemCarrinho(data)) {
        toastr.success("Item adicionado ao carrinho de compra", "Adicionado!");
        $.carregaCarrinho();
        conteudoEtapa2.hide();
        conteudoEtapa1.show("slow");

        if (importacao) {
            urlItemAdicionado = '?etapa=1&importacao=true'
        } else {
            urlItemAdicionado = '?etapa=1'
        }

        history.pushState({
            id: 'nova-compra=etapa-1'
        }, 'Agrega - Nova Compra', urlItemAdicionado);
        $.configurarFormulario();

    } else {
        toastr.error("Não foi possível adicionar o item ao carrinho", "Erro!");
    }
};

$.alterarCarrinho = function (form) {
    var data = $.getFormData(form);
    var index = document.getElementById('indexItem').value;
    var itensCarrinho = $.getItensCarrinho();

    if (itensCarrinho[index].hasOwnProperty('carrinho_id')) {
        var inputFile = $('#anexoForm')[0];

        if (!!inputFile && !!inputFile.files[0])
            anexoProduto(inputFile.files[0], itensCarrinho[index].carrinho_id);

        data.carrinho_id = itensCarrinho[index].carrinho_id;
    } else {
        console.log('Oops, carrinho sem a propriedade carrinho_id');
    }

    itensCarrinho[index] = data;

    $.ajax({
        url: '/compra/salvar-carrinho-ajax?add=1',
        data: {'itens': JSON.stringify(itensCarrinho)},
        async: false,
        type: 'post',
    })

    toastr.success("Item alterado no carrinho", "Alterado!");
    $.carregaCarrinho();
    conteudoEtapa2.hide();
    conteudoEtapa1.show("slow");
    $.configurarFormulario();
};

$.getItensCarrinho = function () {
    var retorno = '';
    $.ajax({
        url: '/compra/get-carrinho-ajax/',
        async: false,
        success: function (resp) {
            if (resp.itens) {
                retorno = JSON.parse(resp.itens);
            }
        }
    });
    return retorno;
};

$.addItemCarrinho = function (item) {
    var itensCarrinho = $.getItensCarrinho();
    var autoincrement_id = autoIncrementCar.add();
    var inputFile = $('#anexoForm')[0];
    var add = 0;

    if (!!inputFile && !!inputFile.files[0]) {
        anexoProduto(inputFile.files[0], autoincrement_id);
    }

    item.carrinho_id = autoincrement_id;
    if (itensCarrinho.length > 0) {
        add = 1;
        itensCarrinho.push(item);
    } else {
        itensCarrinho = [item];
    }

    $.ajax({
        url: '/compra/salvar-carrinho-ajax?add='+add,
        data: {'itens': JSON.stringify(itensCarrinho)},
        async: false,
        type: 'post',
    })
    return true;
};

$.cancelar = function () {
    if ($.getItensCarrinho().length == 0) {
        toastr.warning("O carrinho já está vazio.", "Ooops!");
        conteudoEtapa2.html(" ");
        conteudoEtapa2.hide();
        conteudoEtapa3.hide();
        conteudoEtapa1.show("slow");
    } else {
    //    localStorage.setItem("itensCarrinho", "[]");
        autoIncrementCar.reset();
        $.limparCarrinhoAjax();
        $.carregaCarrinho();
        conteudoEtapa2.html(" ");
        conteudoEtapa2.hide();
        conteudoEtapa3.hide();
        conteudoEtapa1.show("slow");
        $("#link-compra-produtos").show('slow');
        $("#link-passagem-grid").show('slow');
        $("#link-passagem").hide('slow');
        toastr.info("Todos itens foram removidos do seu carrinho.", "Cancelado!");
    }

    history.pushState({
        id: 'nova-compra=etapa-1'
    }, 'Agrega - Nova Compra', '?etapa=1');
};

$.remover = function (index) {
    if (confirm("Você tem certeza que deseja remover este item?")){
        var itensCarrinho = $.getItensCarrinho();
        itensCarrinho.splice(index, 1);
        if (itensCarrinho.length === 0) {
            autoIncrementCar.reset();
            $.limparCarrinhoAjax();
        }else{
            $.ajax({
                url: '/compra/delete-carrinho-ajax',
                type: 'POST',
                data: { index: index },
                success: function(response) {
                    if (response.success) {
                        $.carregaCarrinho();
                        toastr.success("Item removido com sucesso");
                    } else {
                        $.carregaCarrinho();
                        toastr.error("Falha ao remover o item!");
                    }
                },
                error: function() {
                    $.carregaCarrinho();
                    toastr.error("Erro na requisição AJAX");
                }
            });
        }
        $.carregaCarrinho();
    }
      // return true;
};

$.alterar = function (index) {
    var itensCarrinho = $.getItensCarrinho();
    var item = itensCarrinho[index];
    $("#indexItem").val(index);
    var produto_id = item.produtoId;

    if (importacao) {
        urlEditar ='/compra/nova-etapa2/?acao=alterar&produto_id=' + produto_id + '&importacao=true';
    } else {
        urlEditar = '/compra/nova-etapa2/?acao=alterar&produto_id=' + produto_id;
    }

    if (index !== 0) {
        var attributes = itensCarrinho[0]['_attributes'];
        var projetoId = attributes.projeto_id;

        setTimeout(function () {
            $("#fld-projeto_id").val(projetoId).trigger('change');
        }, 700);
    }

    $.ajax({
        url: urlEditar,
        data: item,
        async: false,
        type: 'post',
        success: function (resp) {
            conteudoEtapa2.html(resp);
            conteudoEtapa1.hide();
            conteudoEtapa2.show("slow");

            history.pushState({
                id: 'nova-compra=etapa-2'
            }, 'Agrega - Nova Compra', '?etapa=2');
        }
    });

    $('#acaoEditarCarrinho').val(1);

    return true;
};

$.getProdutoAnexo = function () {
    var produtoAnexo = localStorage.getItem("produtoAnexo");// Recupera os dados armazenados
    return JSON.parse(produtoAnexo); // Converte string para objeto
};

$.getUsuarioLogado = function () {
    nomeCurto = document.getElementById('usuario-logado').innerHTML;
    nome = nomeCurto.split(" ");
    return nome[0];
};

$.getSituacao = function () {
    return situacao = document.getElementById('situacao').innerHTML;
};

$.verDetalhes = function (form) {
    var dadosPedido = $(form).serializeArray();
    var itensCarrinho = $.getItensCarrinho();
    var itensSelecionados = [];

    $('input[name="itensSelecionados[]"]:checked').each(function () {
        var index = $(this).closest('tr').index();
        itensSelecionados.push(itensCarrinho[index]);
    });

    $.ajax({
        url: '/compra/realizar-conferencia',
        data: {
            'dadosPedido': dadosPedido,
            'itensSelecionados': itensSelecionados
        },
        type: 'post',
    }).done(function (resp) {
        if (resp.success) {
            var msg = '<div class="list-group">';
            msg += "<div class='detalhes-pedido list-group-item list-group-item-action' style='word-wrap: break-word;'>";
            msg += '<h5 class="py-2">Detalhes do pedido</h5>';
            msg += "<p><strong>Projeto:</strong> " + resp.projeto + "</p>";
            if (resp.endereco !== false) {
                msg += "<p><strong>Endereço:</strong> " + resp.endereco + "</p>";
            }
            msg += "<p><strong>Finalidade:</strong> " + resp.dadosPedido['Compra[finalidade]'] + "</p>";
            msg += "<p><strong>Observação:</strong> " + resp.dadosPedido['Compra[observacoes]'] + "</p>";
            msg += "<p><strong>Pessoa responsável:</strong> " + resp.dadosPedido['Compra[responsavelnome]'] + "</p>";
            msg += "<p><strong>Celular:</strong> " + resp.dadosPedido['Compra[responsavelcelular]'] + "</p>";
            msg += "<p><strong>E-mail:</strong> " + resp.dadosPedido['Compra[responsavelemail]'] + "</p>";
            msg += "</div>";
            msg += "</div>";

            msg += '<div class="list-group mt-3">';
            msg += "<div class='detalhes-pedido list-group-item list-group-item-action'>";
            msg += '<h5 class="py-2">Itens</h5>';
            msg += "<div class='itens-pedido'>";
            for (var i = 0; i < resp.dadosItens.length; i++) {
                var item = resp.dadosItens[i];
                msg += "<li>" + item.produtoNome + "</li>";
            }
            msg += "</div>";
            msg += "</div>";

            msg += "<div class=\"row mt-4\">"
            msg += "<div class=\"col-md-6 text-left\">"
            msg += "<button type='button' class=\"btn btn-primary btn-voltar-detalhes\"><i class=\"fas fa-arrow-left\"></i> Alterar pedido</button>"
            msg += "</div>";
            msg += "<div class=\"col-md-6 text-right\">"
            for (var i = 0; i < itensSelecionados.length; i++) {
                var itemSelecionado = itensSelecionados[i];
                var temPassagem = false;
                if (itemSelecionado.produtoId == 11778) {
                    temPassagem = true;
                    break;
                }
            }
            if (temPassagem === true) {
                msg += "<button type=\"button\" id=\"btn-open-modal\" class=\"btn btn-success\">Gerar pedido de compra <i class=\"fas fa-arrow-right\"></i></button>"
            } else {
                msg += "<button type=\"submit\" class=\"btn btn-success btn-adicionar\">Gerar pedido de compra <i class=\"fas fa-arrow-right\"></i></button>"
            }
            msg += "</div>";
            msg += "</div>";

            $('.compra-nova').hide();
            $('.detalhes-compra').show("slow");
            $('.detalhes-compra').html(msg);

            $(document).ready(function () {
                $('.btn-adicionar').click(function () {
                    $('.detalhes-compra').hide();
                    $('.compra-nova').show();
                    $.gerarPedido(form, itensSelecionados);
                });

                // caso for passagem
                if (temPassagem === true) {
                    $("button[id='btn-open-modal']").on('click', function (e) {
                        $("#modalAviso").modal('show');
                    });

                    $("#confirmar-btn").click(function () {
                        $("#modalAviso").modal("hide");
                        $('.detalhes-compra').hide();
                        $('.compra-nova').show();
                        $.gerarPedido(form, itensSelecionados);
                    });
                }
            });
        } else {
            toastr.error("Não foi possível gerar o pedido de compra: " + resp.message, "Erro!");
        }
    })
};

$(document).on('click', '.btn-conf', function (event) {
    event.preventDefault();
    var form = $(this).closest('form');
    var acordo = $('#fld-acordo').val();
    var finalidade = $('#compra-finalidade').val();
    var enderecoentrega = $('#fld-enderecoentrega').val();
    var responsavelnome = $('#compra-responsavelnome').val();
    var responsaveltelefone = $('#compra-responsaveltelefone').val();
    var responsavelcelular = $('#compra-responsavelcelular').val();
    var responsavelemail = $('#compra-responsavelemail').val();
    var laboratorio = $('#fld-laboratorio').val();
    var controlado = verificaProdutoControladoUfvByAcordo();

    var erro = [];
    if (!acordo)
        erro.push('"Projeto" não pode ficar em branco.');
    if (!finalidade)
        erro.push('"Finalidade" não pode ficar em branco.');
    if (!enderecoentrega && $('#tipo-entrega').val() == 'fisica')
        erro.push('"Endereço de entrega" não pode ficar em branco.');
    if (!responsavelnome)
        erro.push('"Nome" não pode ficar em branco.');
    if (!responsaveltelefone)
        erro.push('"Telefone" não pode ficar em branco.');
    if (!responsavelcelular)
        erro.push('"Celular" não pode ficar em branco.');
    if (!validateEmail(responsavelemail))
        erro.push('"E-mail" não é um endereço de e-mail válido.');
    if (controlado && !laboratorio)
        erro.push('"Laboratório" não pode ficar em branco.');

    if (erro.length > 0) {
        for (var i = 0; i < erro.length; i++) {
            toastr.error(erro[i]);
        }

        event.preventDefault();
        return false;
    }

    $.verDetalhes(form);
});

$.gerarPedido = function (form, itens) {
    var dadosPedido = $(form).serializeArray();
    var itensCarrinho = $.getItensCarrinho();
    var produtoAnexo = $.getProdutoAnexo();
    var usuario = $.getUsuarioLogado();
    var situacao = $.getSituacao();
    $.ajax({
        url: '/compra/nova-etapa3',
        data: {
            'dadosPedido': dadosPedido,
            'itensCarrinho': itensCarrinho,
            'produtoAnexo': produtoAnexo,
            'itensSelecionados': itens
        },
        async: false,
        type: 'post',
    }).done(function (resp) {
        if (resp.success) {

            toastr.success('Seu pedido foi gerado com sucesso!', 'Pedido gerado');

            var numPedidos = Object.keys(resp.pedidos).length;
            var msg = "<div class='alert alert-success'>Pedido gerado com sucesso:</div>";
            if (numPedidos > 1) {
                var msg = "<div class='alert alert-success'>Pedidos gerados com sucesso:</div>";
            }

            msg += '<div class="list-group">';

            pedidoid = 0;
            $.each(resp.pedidos, function (key, value) {

                pedidoid = value.pedido;

                msg += '<a href="/compra/update?id=' + value.pedido + '" class="list-group-item list-group-item-action">';
                msg += '<div class="d-flex w-100 justify-content-between">';
                msg += '<h5 class="mb-1">Pedido: ' + value.pedido + "</h5>";
                msg += '</div>';

                msg += "<b>Itens: </b>" + "<br/>";

                msg += '<p class="mb-1">';
                $.each(value.itens, function (key, value) {
                    msg += '<li>' + value + '</li>';
                    if (value == 'Passagem aérea') {
                        msg += '<br/><p>' + 'Aviso:\n' +
                            'Os pedidos de compras de \n' +
                            'passagens aéreas serão \n' +
                            'processados até o próximo \n' +
                            'dia útil após o envio do \n' +
                            'pedido' + '</p>';
                    }
                });
                msg += '</p>';

                msg += "</a>";

            });

            if (numPedidos > 1) {
                var today = dataAtualFormatada();

                var textoAlertInfo = "<a href='/pedidos-compra/index?" +
                    "CompraSearch[solicitanteNome]=" + usuario +
                    "&CompraSearch[situacao_id]=" + situacao +
                    "&CompraSearch[dtregistro]=" + today + "'>" +
                    "<strong>Clique aqui!</strong>" +
                    "</a> para visualizar os pedidos gerados e enviá-los";

            } else {

                var textoAlertInfo = "<a href='/pedidos-compra/index?CompraSearch[id]=" + pedidoid + "'" +
                    "<strong>Clique aqui</strong>" +
                    "</a> para visualizar o pedido gerado e enviá-lo.";

            }

            msg += '<br><div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-brand alert-dismissible fade show" role="alert">\n' +
                '                    <div class="m-alert__icon">\n' +
                '                        <i class="flaticon-exclamation-1"></i>\n' +
                '                        <span></span>\n' +
                '                    </div>\n' +
                '                    <div class="m-alert__text">\n' +
                '                        ' + textoAlertInfo +
                '                    </div>\n' +
                '                </div>';

            $('.compra-nova').html(msg)
            localStorage.clear();

        } else {
            toastr.error("Não foi possível gerar o pedido de compra: " + resp.message, "Erro!");
        }
    }).fail(function () {
        toastr.error('Não foi possível se comunicar com servidor.')
    });
};

$.getFormData = function (form) {
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
    return indexed_array;
};

$.limparCarrinhoAjax = function () {
    $.ajax({
        url: '/compra/get-carrinho-ajax?limpar=1',
        async: false,
        success: function (resp) {
            console.log('limpando carrinho via ajax');
        }
    });
};

function dataAtualFormatada() {
    let data = new Date(),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function anexoProduto(inputFile, id) {

    if (!(!!inputFile) || id.length < 1) return false;

    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result,
            base64 = data.replace(/^[^,]*,/, '');
        let infoFile = {
            carrinho_id: id,
            file: base64,
            filename: inputFile.name,
            size: inputFile.size,
            extension: inputFile.name.split('.').pop().toLowerCase(),
        };
        let produtoAnexo = localStorage.getItem('produtoAnexo');
        produtoAnexo = produtoAnexo ? JSON.parse(produtoAnexo) : [];
        produtoAnexo.push(infoFile)
        localStorage.setItem('produtoAnexo', JSON.stringify(produtoAnexo));
    };
    reader.readAsDataURL(inputFile);

}

$("#busca-produto").on("change", function () {
    var produto_id = $(this).val();

    if (importacao) {
        $.iniciarEtapa2('/compra/nova-etapa2/?produto_id=' + produto_id + '&importacao=true');
    } else {
        $.iniciarEtapa2('/compra/nova-etapa2/?produto_id=' + produto_id);
    }

    $(this).val('');
});

$.goToBuscaRapida = function () {
    $('#busca-produto').select2('open');
};

function validaPrazoMinimo() {

    if ($("#itemproduto-dtmaximaentrega-disp").val() != undefined) {
        var dtmaximaentrega = gerarData($("#itemproduto-dtmaximaentrega-disp").val());
        var dtminima = new Date();

        dtminima.setDate(dtminima.getDate() + 20);
        dtminima.setHours(0, 0, 0, 0);

        if (dtmaximaentrega <= dtminima) {
            $('.validaPrazo').html("Selecione um período de pelo menos 20 dias").css('color', 'red');
            $('#itemproduto-dtmaximaentrega-disp').css('color', 'red');
            return false;
        } else {
            $('.validaPrazo').html("");
            $('#itemproduto-dtmaximaentrega-disp').css('color', 'black');
        }
    }

    return true;
}

function validaVigenciaAcordo() {

    if ($("#fld-acordo").val() != undefined) {

        var acordoId = $("#fld-acordo").val();
        var dtminima = new Date();
        var dtvigencia;

        dtminima.setDate(dtminima.getDate() + 15);
        dtminima.setHours(0, 0, 0, 0);

        $.ajax({
            url: '/acordo/getdtvigenciapedidocompra/',
            data: {
                acordoId: acordoId
            },
            async: false,
            success: function (resp) {
                dtvigencia = new Date(resp);
                dtvigencia.setHours(0, 0, 0, 0);
            }
        });

        if (dtvigencia < dtminima) {
            $('.validaVigencia').html("O projeto precisa ter pelo menos 15 dias de vigência para prosseguir com o pedido.").css('color', 'red');
            $('#fld-acordo').css('color', 'red');
            return false;
        } else {
            $('.validaVigencia').html("");
            $('#fld-acordo').css('color', 'black');
        }
    }

    return true;
}

function gerarData(str) {
    var partes = str.split("/");
    return new Date(partes[2], partes[1] - 1, partes[0]);
}

$('.compra-nova').on("click", "input[type=radio][name=radio_endereco_entrega]", function () {
    verificaProdutoControladoUfvByAcordo();
});

function verificaProdutoControladoUfvByAcordo() {

    if ($("#fld-acordo").val() != undefined) {

        var acordoId = $("#fld-acordo").val();
        var itensCarrinho = $.getItensCarrinho();
        var comboLaboratorio = $("#fld-laboratorio");
        var retorno = false;
        var enderecoEntrega = $("input[name='radio_endereco_entrega']:checked").val();
        var enderecoId = enderecoEntrega ? enderecoEntrega : null;

        $.ajax({
            url: '/acordo/get-produto-controlado-ufv/',
            data: {'acordoId': acordoId, 'produtoId': '', 'itensCarrinho': itensCarrinho, 'enderecoId': enderecoId},
            async: false,
            type: 'post',
            success: function (resp) {
                retorno = resp.controlado;
                if (resp.controlado) {

                    var nomes = '';
                    $.each(resp.produtos, function (index, element) {
                        nomes += element.nome + '; ';
                    });

                    if (resp.produtos.length > 1) {
                        var controladoUFV = '<span class="text-danger">' +
                            'Os produtos adicionados ao carrinho (' + nomes + ') são controlados e por exigências da UFV, deve se' +
                            ' informar em qual laboratório os itens serão armazenados e utilizados.' + '</span>';
                    } else {
                        var controladoUFV = '<span class="text-danger">' +
                            'O produto adicionado ao carrinho (' + nomes + ') é controlado e por exigências da UFV, deve se' +
                            ' informar em qual laboratório o item será armazenado e utilizado.' + '</span>';
                    }

                    $(".info-produto-controlado-ufv").html(controladoUFV);
                    comboLaboratorio.prop('required', true);
                    comboLaboratorio.attr('disabled', false);
                    $("#combo-laboratorio").show('slow');

                } else {
                    $(".info-produto-controlado-ufv").html('');
                    comboLaboratorio.attr('disabled', true);
                    comboLaboratorio.attr('required', false);
                    $("#combo-laboratorio").hide('slow');
                }
            }
        });
    }
    return retorno;
}

window.addEventListener('popstate', function (event) {
    var etapa = $.urlParam('etapa');
    console.log('etapa: ' + etapa);
    if (!etapa || etapa == 1) {
        conteudoEtapa1.show("slow");
        conteudoEtapa2.hide();
        conteudoEtapa3.hide();

        history.pushState({
            id: 'nova-compra=etapa-1'
        }, 'Agrega - Nova Compra', '?etapa=1');
    }
    if (etapa == 2) {
        conteudoEtapa1.hide();
        conteudoEtapa2.show("slow");
        conteudoEtapa3.hide();
    }
    if (etapa == 3) {
        conteudoEtapa1.hide();
        conteudoEtapa2.hide();
        conteudoEtapa3.show("slow");
    }
});

$.verificaEndereco = function () {
    var itensCarrinho = $.getItensCarrinho();
    const radioInputEndereco = $('input[type="radio"][name="radio_endereco_entrega"]');
    const compraRadioEnderecoEntrega = $("#compra-radio-endereco-entrega");
    const tipoEntregaInput = $("#tipo-entrega");

    function atualizarElemento(isFisica) {
        compraRadioEnderecoEntrega[isFisica ? 'show' : 'hide']("slow");
        tipoEntregaInput.val(isFisica ? 'fisica' : 'virtual');
        radioInputEndereco.prop('required', isFisica);
    }

    function selecionado() {
        var itensSelecionados = $('input[name="itensSelecionados[]"]:checked')
            .map(function () {
                var index = $(this).closest('tr').index();
                return itensCarrinho[index];
            })
            .get();

        const tiposEntrega = itensSelecionados.map(item => item._attributes.tipo_entrega);
        const fisica = tiposEntrega.includes('fisica') || tiposEntrega.includes('');
        atualizarElemento(fisica);
    }

    selecionado();
    $('input[name="itensSelecionados[]"]').change(selecionado);
};

$.verificaTermoReferencia = function () {
    var itensCarrinho = $.getItensCarrinho();

    function selecionado() {
        var itensSelecionados = $('input[name="itensSelecionados[]"]:checked')
            .map(function () {
                var index = $(this).closest('tr').index();
                return itensCarrinho[index];
            })
            .get();

        var item = itensSelecionados[0]['_attributes'];

        if (itensSelecionados.length == 1 && item.produtoId == 21256) { //locacao veiculo
            $(".field-compra-geratermoreferencia").hide('slow');
        } else {
            $(".field-compra-geratermoreferencia").show('slow');
        }
    }

    selecionado();
    $('input[name="itensSelecionados[]"]').change(selecionado);
};