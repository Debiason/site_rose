//elements
var tabOptions = $(".tab-options"),
    tabContent = $(".tab-content"),
    tabLoader = $(".tab-loader"),
    defaultTab = $(".tab-default"),
    secondaryTab = $(".tab-secondary"),
    tabOptionsLinks = $(".tab-options a");

//triggers
tabOptionsLinks.click(controlOptionClick);

// todo REMOVER HTML DA ABA PRINCIPAL AO EXIBIR ABA SECUNDARIA


//functions
function controlOptionClick() {
    if ($(this).hasClass("inactive")) {
        return;
    }
    $(".tab-secondary-action-buttons").hide();


    var url = $(this).data("url"),
        type = $(this).data("type"),
        tab = $(this).attr("href").replace('#', '');

    tabOptionsLinks.removeClass('active');
    $(this).addClass('active');

    if (type == 'default') {
        console.log('exibindo aba principal');
        var tabToShow = defaultTab;
        secondaryTab.hide("slow");
        //defaultTab.html(sessionStorage.getItem('defaultTabHtml')); //carrega o coteudo armazenado da aba principal
        onComplete(tabToShow);
    } else {
        console.log('exibindo aba secundaria');
        var tabToShow = secondaryTab;
        //Exibe loader
        tabLoader.html('<div class="m-loader m-loader--success" style="width: 30px; display: inline-block;"></div>');
        tabLoader.show("");
        secondaryTab.hide();
        secondaryTab.html(""); //Limpa conteudo da aba secundaria
        /*if(defaultTab.html()) {
            sessionStorage.setItem('defaultTabHtml', defaultTab.html()); //armazena conteudo da aba principal
            defaultTab.html(""); //limpa coteudo da aba principal
        }*/
        defaultTab.hide("slow");
        secondaryTab.load(url, onComplete(tabToShow));
    }
    $.proxTab();
}

function onComplete(tabToShow) {
    tabLoader.hide("");
    tabToShow.show("slow");

    var tab = $.getCurrentTab().attr("href").replace("#", ""),
        type = $.getCurrentTab().data("type"),
        required = $.getCurrentTab().data("required");

    if (type !== 'default') {
        if (required) {
            $.checkTabIsCompleted(tab);
        }
        $(".tab-secondary-action-buttons").show();
    } else {
        $(".tab-secondary-action-buttons").hide();
    }

    if (tab === 'resumo') {
        $('.tab-secondary-action-buttons button[name=continuar]').hide();
        $('.tab-secondary-action-buttons button[name=enviar]').show();
    } else {
        $('.tab-secondary-action-buttons button[name=continuar]').show();
        $('.tab-secondary-action-buttons button[name=enviar]').hide();
    }
}

$.urlTabParam = function () {
    var results = new RegExp('[\#]([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
};

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
};

$.goToTab = function (tab) {
    var url = window.location.href;
    var splitUrl = url.split('#');
    window.location.replace(splitUrl[0] + '#' + tab);

    var type = $('a[href="#' + tab + '"]').data('type');
    if (type != 'default') {
        $('a[href="#' + tab + '"]').trigger("click");
    }
};

$.reloadTab = function () {
    var tabParam = $.urlTabParam();
    $.goToTab(tabParam);
};

$.getCurrentTab = function () {
    return $(".m-nav__link.active");
};

$.getNextTab = function () {
    var currentTab = $.getCurrentTab();
    var nextTab = currentTab.parent().next("li").children("a");
    return nextTab;
};

$.getPrevTab = function () {
    var currentTab = $.getCurrentTab();
    var prevTab = currentTab.parent().prev("li").children("a");
    return prevTab;
};

$.goToNextTab = function () {
    var tab = $.getNextTab().attr("href").replace('#', '');
    if (tab === 'resumo') {
        $('.tab-secondary-action-buttons button[name=continuar]').hide();
        $('.tab-secondary-action-buttons button[name=enviar]').show();
    }
    $.goToTab(tab);
};

$.goToPrevTab = function () {
    var tab = $.getPrevTab().attr("href").replace('#', '');
    $.goToTab(tab);
};

$.checkTabIsCompleted = function (tab) {
    if (tab === 'resumo') {
        return;
    }
    var url = "/" + tab + "/is-completed";
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {pedido_id: $.urlParam("id")}
    })
        .done(function (response) {
            isCompleted = response.isCompleted;
            if (!isCompleted) {
                $('.tab-secondary-action-buttons button[name=continuar]').prop("disabled", true);
            } else {
                $('.tab-secondary-action-buttons button[name=continuar]').prop("disabled", false);
            }
        });
};

$.submitViaAjax = function (form, callback = null) {
    if (form) {
        if (!$(form).hasClass('gridview-filter-form')) {
            var url = $(form).attr('action');

            if ($(form).data('noajax')) {
                return false;
            }

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                enctype: form.enctype,
                processData: false,
                contentType: false,
                data: new FormData(form)
            })
                .done(function (response) {
                    if (callback && typeof callback === 'function') {
                        callback(response)
                    }
                    if (response.data.success == true) {
                        fnbPageUnblock();
                        habilitaBotaoAfterSubmit();
                        toastr.success(response.data.message, "Sucesso!");
                        if (response.data.reloadTab) {
                            window.open(response.data.redirect, '_self');
                        } else if (response.data.redirectNewTab) {
                            window.open(response.data.redirect, '_blank');
                        } else if (response.data.redirect) {
                            $.loadInModal(response.data.redirect, response.data.title);
                        } else {
                            $('#modal-principal').modal('hide');
                            $.reloadTab();

                            if (response.data.reload) {
                                location.reload();
                            }
                        }

                        if (response.data.callback) {
                            var functionCallback = response.data['callback'];
                            window[functionCallback](response.data);
                        }

                    } else {
                        fnbPageUnblock();
                        habilitaBotaoAfterSubmit();
                        toastr.error(response.data.message, "Erro!");
                        $('#modal-principal .modal-body').scrollTop(0);
                        $('#modal-principal .modal-body .regrastabs').html(response.data.regras);
                        $('#modal-principal .modal-body .flashMessage').html(response.data.flashMessage);
                    }
                })
                .fail(function (response) {
                    fnbPageUnblock();
                    habilitaBotaoAfterSubmit();
                    toastr.error('Erro de comunicação com o servidor.');
                });
        }
    }
};

$.loadInModal = function (url, title) {
    $('#modal-principal').modal('show')
        .find('#modalContent')
        .load(url);
    document.getElementById('modalHeader').innerHTML = '<h4>' + title + '</h4>';
    //$('#modal-principal .modal-body').scrollTop(0);
};

$.proxTab = function () {
    if (!!$.getNextTab().attr("href") === false) return false;
    var proxTab = $.getNextTab().attr("href").replace('#', '');
    $('#proxTab').val(proxTab);
};

$.generateRandomIds = function () {

    defaultTab
        .find(".form-check input[type=radio], .custom-radio input[type=radio], .custom-checkbox input[type=checkbox]")
        .each(function () {

            var idAtual = $(this).attr('id');
            var idGen = Math.round(new Date().getTime() + (Math.random() * 100));
            $(this).attr('id', idGen);
            $('label[for="' + idAtual + '"]').attr('for', idGen);

        });
};

$(document).on('click', '.tab-secondary .grid-view a', function () {

    var url = $(this).attr('href');
    var title = $(this).attr('title');

    if (title !== 'Alterar' && title !== 'Exibir') {
        return;
    }

    $.loadInModal(url, title);
    return false;
});

$(document).on('submit', '#modal-principal form', function (event) {
    var btn = $(this);
    var formName = btn.closest('#modal-principal form').attr('id');

    var elements = document.querySelectorAll('.block-on-submit');
    if (elements) {
        elements.forEach(function (element) {
            var formPrincipal = document.getElementById(formName);
            if (formPrincipal) {
                element.disabled = true;
                fnbPageBlock();
                setTimeout(function () {
                    var isInvalid = document.querySelectorAll('.is-invalid').length > 0;
                    if (isInvalid) {
                        element.disabled = false;
                        fnbPageUnblock();
                    }
                }, 300);
            }
        });
    }

    if (formName !== 'ParcelaLiberacao') {
        event.preventDefault(); // stopping submitting.
        $.submitViaAjax(this);
    }
});

/* BEGIN - CONTINUAR MESMO ASSIM */

$('button[name="continuarMesmoAssim"]').on('click', function () {
    var implementarBolsista = $(".btnImplementarBolsista").length;
    fnbPageBlock();
    $('.tab-default form').data('button', this.name);
    if (implementarBolsista > 0) {
        window.location.href = $(".btnImplementarBolsista").attr("href") + '&acao=continuarMesmoAssim';
    } else {
        $('.tab-default form').submit();
    }
});

$(document).on('click', '#modal-principal button', function (event) {
    $('#modal-principal #btnAcaoTabs').val(this.name);
    if (this.name == 'continuarMesmoAssim') {
        $('#modal-principal form').submit();
    }
});

/* END - CONTINUAR MESMO ASSIM */


// Salvar ou enviar do formulário principal
$('.tab-default form button[type="submit"]').on('click', function () {
    $('.tab-default form').data('button', this.name);
    $('#btnAcaoPosContinuar').val(this.name);
});

$(".tab-default form").on('submit', function () {
    $('#btnAcao').val($(this).data('button'));
});

//desabilita botao por 5s para evitar duplicidade
$(document)
    .on('click', '#modal-principal button[type="submit"], #modal-principal input[type="submit"], #modal-principal #salvarDados', function (event) {
        var btn = $(this);
        var formName = btn.closest('#modal-principal form').attr('id');

        if (formName !== 'ParcelaLiberacao') {
            event.preventDefault();
            btn.prop('disabled', true);
            btn.closest('#modal-principal form').submit();
            setTimeout(function () {
                btn.prop('disabled', false);
            }, 10000);
        }
    });


$('.tab-secondary-action-buttons button').on('click', function () {

    var acao = this.name;
    if (acao === 'continuar') {
        $.goToNextTab();
        return;
    }

    if (acao === 'voltar') {
        $.goToPrevTab();
        return;
    }

    if (acao === 'enviar') {
        var defaultTabName = $(".tabs-component .m-nav__item a[data-type=default]").attr("href").replace("#", "");
        $.goToTab(defaultTabName);
        $('.tab-default button[name="enviar"]').click();
        return;
    }

});

$('.precadastro-favorecido').on('click', function () {
    event.preventDefault();
    $.loadInModal($(this).attr('href'), "Pré-Cadastro");
});

//Recarrega conteudo dentro das abas do modal, mantendo as abas
// Utilizado nas tabs
$(document).on('click', '.openModalTab', function (event) {

    event.preventDefault();

    $('#modal-principal').modal('show')
        .find('.tab-content')
        .load($(this).attr('data-url'));
    document.getElementById('modalHeader').innerHTML = '<h4>Editar</h4>';

});

$(document).ready(function () {

    if ($('body').find('.tabs-component').length !== 0) {

        var tabParam = $.urlTabParam();
        if (tabParam) {
            $.goToTab(tabParam);
        } else {
            var acao = $.urlParam("acao");
            if (acao === 'salvar-e-continuar') {
                $.goToNextTab();
            }
        }
        $.generateRandomIds();
        $.proxTab();
    }

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});

function atualizaFavorecidoPreCadastro(data) {

    var favorecidoId = data.model.favorecido.id;
    var favorecidoNome = data.model.favorecido.nome;

    var contaBancariaId = data.model.contabancaria.id;
    var contaBancariaNome = data.model.contabancaria.text;

    $("#fld-favorecido").empty();
    $("#fld-favorecido").append('<option value=' + favorecidoId + '>' + favorecidoNome + '</option>');
    $("#fld-favorecido").attr('style', 'width: 100%;');
    $("#fld-favorecido").select2();
    $("#fld-favorecido").val(favorecidoId).trigger('change.select2');

    $("#fld-contabancaria").empty();
    $("#fld-contabancaria").append('<option value=' + contaBancariaId + '>' + contaBancariaNome + '</option>');
    $("#fld-contabancaria").prop("disabled", false);
    $("#fld-contabancaria").select2();
    $("#fld-contabancaria").val(contaBancariaId).trigger('change.select2');

    if ($('#pagamentopessoa-pis')) {

        $('#pagamentopessoa-pis').val('');

        var pis = data.model.pis;
        $('#pagamentopessoa-pis').val(pis);
    }
}

function habilitaBotaoAfterSubmit() {
    var elements = document.querySelectorAll('.block-on-submit');
    if (elements) {
        elements.forEach(function (element) {
            element.disabled = false;
        });
    }
}