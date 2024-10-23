$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    console.log('name');
    console.log(name);
    return decodeURI(results[1]) || 0;
};

/**
 * Override the default yii confirm dialog. This function is
 * called by yii when a confirmation is requested.
 *
 * @param message the message to display
 * @param okCallback triggered when confirmation is true
 * @param cancelCallback callback triggered when cancelled
 */
yii.confirm = function (message, okCallback, cancelCallback) {
    swal({
        title: message,
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: true,
        allowOutsideClick: true,
    })
        .then((result) => {
            if (result.value) {
                okCallback();
            }
        });
};


$(document).on('click', '.showModalButton', function () {
     //check if the modal is open. if it's open just reload content not whole modal
     //also this allows you to nest buttons inside of modals to reload the content it is in
     //the if else are intentionally separated instead of put into a function to get the
     //button since it is using a class not an #id so there are many of them and we need
     //to ensure we get the right button and content.
     $('#modal-principal').find('#modalContent').html("<div class=\"m-loader m-loader--success text-center\" style=\"width: 60px; display: inline-block;\"></div>Carregando...");
     if ($('#modal-principal').data('bs.modal').isShown) {
         $('#modal-principal').find('#modalContent')
             .load($(this).attr('value'));
         //dynamiclly set the header for the modal via title tag
         document.getElementById('modalHeader').innerHTML = '<h4>' + $(this).attr('title') + '</h4>';
         //scroll to top
         $("#modal-principal .modal-body").scrollTop(0);
     } else {
         //if modal isn't open; open it and load content
         $('#modal-principal').modal('show')
             .find('#modalContent')
             .load($(this).attr('value'));
         //dynamiclly set the header for the modal via title tag
         var title = $(this).data('title');
         console.log(title);
         if (!title) {
             title = $(this).attr('title');
         }
         document.getElementById('modalHeader').innerHTML = '<h4>' + title + '</h4>';
         //scroll to top
         $("#modal-principal .modal-body").scrollTop(0);
     }
 });

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
    $('[data-toggle="popover"]').popover()
});

$.activateMenuItem = function () {
    var currentRef = "/" + window.location.pathname.split("/")[1];
    if (currentRef !== "/") {
        var currentLink = $("#m_header_menu").find("a[href='" + currentRef + "']");
        $("#m_header_menu li").removeClass("m-menu__item--active");
        $(currentLink).closest("ul.m-menu__nav li.m-menu__item.menu-pai").addClass("m-menu__item--active");
    }
};

$('#modal-principal').on('hidden.bs.modal', function (e) {
    var modalContent = $('#modal-principal').find('#modalContent');
    var formName = modalContent.find('form').attr('id');
    modalContent.html("");

    if (formName === 'ParcelaLiberacao') {
        location.reload();
    }
});

$(document).ready($.activateMenuItem());

// $.carregaMascaras = function () {
//     $(".form-control.krajee-datepicker:not([data-mask-type='mesano'])").inputmask("99/99/9999");  tatic mask
//     $(".form-control.krajee-datepicker[data-mask-type='mesano']").inputmask("99/9999");  tatic mask
//     $(".form-control.krajee-datepicker[data-mask-type='ano']").inputmask("9999");  tatic mask
//     $("[data-mask-type='cpf']").inputmask("999.999.999-99");  //static mask
//     $("[data-mask-type='cep']").inputmask("99999-999");  //static mask

//     //forca evento change para atualizacao do campo verdadeiro
//     $(".form-control.krajee-datepicker").on('keyup', function (e) {
//         var tamanho = 10;
//         if ($(this).data('maskType') == 'mesano') {
//             tamanho = 7;
//         }
//         if ($(this).data('maskType') == 'ano') {
//             tamanho = 4;
//         }
//         var tamanhoPreenchido = $(this).val().replace('_', '').length;
//         if (tamanho == tamanhoPreenchido) {
//             $(this).trigger('change');
//         }
//     });
// };

// $(document).ready($.carregaMascaras());

// $("#notificacao-visualizada").click(function () {
//     $.ajax({
//         url: '/notificacao/set-notificacao-lida/',
//         async: false,
//         success: function (resp) {
//             if (resp = true) {
//                 $("#existeNotificacao").hide();
//             }
//         }
//     });
// });

// $.convertMoedaToFloat = function (valor) {
//     return isNaN(valor) == false ? parseFloat(valor) : parseFloat(valor.replace("R$", "").replace(/\./g, '').replace(",", "."));
// };

// /*
//     n = numero a converter
//     c = numero de casas decimais
//     d = separador decimal
//     t = separador milhar
//  */
// $.convertFloatToMoeda = function (n, c, d, t) {
//     c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
//     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
// };

 //add class css quando select2 possuir append
$('.form-group').bind("DOMSubtreeModified", function () {
    var group = $(".input-group-append").parent();
    if (group) {
        var s2container = group.find(".select2-container--default");
        var append = group.find(".input-group-append");
        s2container.attr("style", "width: 90%;");
        append.attr("style", "width: 10%;");
        append.find("button").attr("style", "width: 100%;");
    }
});

function removerAcentos(s) {
    let map = { "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E",
        "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o",
        "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U",
        "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C" };

    return String(s).replace(/[\W\[\] ]/g, function (a) {
        return map[a] || a
    });
}


$(document).ready(function () {
    var $chkboxes = $('.kv-row-checkbox');
    var lastChecked = null;

    $chkboxes.click(function (e) {
        if (!lastChecked) {
            lastChecked = this;
            return;
        }

        if (e.shiftKey) {
            var start = $chkboxes.index(this);
            var end = $chkboxes.index(lastChecked);

            $chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', e.target.checked).closest('tr').addClass('table-danger');
        }

        lastChecked = this;
    });

    $image_crop = $('#image_demo').croppie({
        enableExif: true,
        viewport: {
            width: 200,
            height: 200,
            type: 'square' //circle
        },
        boundary: {
            width: 300,
            height: 300
        }
    });

    $('#input-media-profile').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (event) {
            $image_crop.croppie('bind', {
                url: event.target.result
            }).then(function () {
                console.log('jQuery bind complete');
            });
        }
        reader.readAsDataURL(this.files[0]);
        $('#uploadimageModal').modal('show');
    });

    $('.crop_image').click(function (event) {
        event.preventDefault();
        $image_crop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (response) {

            var csrfToken = $('meta[name="csrf-token"]').attr('content');

            $.ajax({
                url: "usuario/upload-foto",
                type: "POST",
                cache: false,
                data: {image: response},
                success: function (resp) {
                    $('#uploadimageModal').modal('hide');
                    if (resp.success === false) {
                        alert(resp.msg);
                        return false;
                    } else {
                        let d = new Date();
                        $(".pro-image-avatar").attr('src', resp.src + "?v=" + d.getTime());
                        return false;
                    }
                }
            });
            $("#input-media-profile").val('');
        })
    });

    $("#uploadimageModal .close").click(function (event) {
        event.preventDefault();
        $("#input-media-profile").val('');
    });

    $(document).on('click', '#modal-principal button', function (event) {
        if (this.name == 'continuarMesmoAssim') {
            var btn = $(this);
            var formRef = btn.closest('form').length;
            event.preventDefault();
            btn.prop('disabled', true);
            if (formRef > 0) {
                $('#form-pedido').submit();
            }
            setTimeout(function(){
                btn.prop('disabled', false);
            }, 10000);
        }
    });

    $("button[name='continuarMesmoAssim']").click(function (event) {
        var btn = $(this);
        btn.prop('disabled', true);
        fnbPageBlock();
        setTimeout(function(){
            btn.prop('disabled', false);
        }, 10000);
    });

    $("button[name='salvar']").click(function (event) {
        var btn = $(this);
        event.preventDefault();
        btn.prop('disabled', true);
        $('#form-pedido').submit();
        setTimeout(function(){
            btn.prop('disabled', false);
        }, 5000);
    });

    var elements = document.querySelectorAll('.block-on-submit');
    if (elements) {
        elements.forEach(function (element) {
            var formPrincipal = element.closest('form');
            if (formPrincipal) {
                formPrincipal.addEventListener('submit', function (event) {

                    element.disabled = true;
                    fnbPageBlock();

                    setTimeout(function () {
                        var isInvalid = document.querySelectorAll('.is-invalid').length > 0;
                        if (isInvalid) {
                            element.disabled = false;
                            fnbPageUnblock();
                        }
                    }, 300);

                });
            }
        });
    }
});

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

 function escolherImagemPerfil() {
     document.getElementById('input-media-profile').click();
 }

// $.converteMoedaFloat = function(valor){

//     if(valor === ""){
//         valor =  0;
//     }else{
//         valor = valor.replace("R$","");
//         valor = valor.replace(".","");
//         valor = valor.replace(".","");
//         valor = valor.replace(",",".");
//         valor = parseFloat(valor);
//     }
//     return valor;

// };

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// function fnbPageBlock(message = 'Aguarde...') {
//     $.blockUI({
//         css: {
//             backgroundColor: 'transparent',
//             color: '#FFFFFF',
//             border: 'none'
//         },
//         message: '<div class="m-loader m-loader--success" style="width: 30px; display: inline-block;"></div><br><br>' + message,
//         baseZ: 1500,
//         overlayCSS: {
//             backgroundColor: '#000000',
//             opacity: 0.7,
//             cursor: 'wait'
//         }
//     });
// }

// function fnbPageUnblock() {
//     $.unblockUI();
// }

// $(".input-filter-table").on('input', function(){

//     var $input = $(this);
//     var $table = $(this).closest('table');
//     var $tableBody = $table.find('tbody');   

//     if($tableBody.length === 0) {
//         console.error('O elemento table precisa possuir o elemento tbody.');
//         return false;
//     }

//     setTimeout(function() {
//             var search = String($.trim($input.val()));
//             var trs = $tableBody.find($("tr"));
//             if(search.length > 0) {
//                 search = removerAcentos(search);
//                 search = search.toLocaleLowerCase();

//                 if(trs.length === 0){
//                     console.warn('Nenhuma td foi encontrada.');
//                     return false;
//                 }

//                 trs.each(function(index, td){
//                     var textTd = $.trim($(td).text()).toLocaleLowerCase();
//                     textTd = removerAcentos(textTd);

//                     console.log(textTd, ' - ', search, textTd.indexOf(search) >= 0);
                    

//                     if(textTd.indexOf(search) >= 0) {
//                         $(td).css('display', 'table-row');
//                     } else {
//                         $(td).css('display', 'none');
//                     }
//                 })
                
//             } else {
//                 trs.each(function(index, td){
//                     $(td).css('display', 'table-row');
//                 });
//             }
//     }, 1000);
// });

// $.mascaraCPF = function(cpf){
//     cpf=cpf.replace(/\D/g,"")
//     cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
//     cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
//     cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
//     return cpf
// };

// $.mascaraCNPJ = function(cnpj){
//     cnpj=cnpj.replace(/\D/g,"")
//     cnpj=cnpj.replace(/^(\d{2})(\d)/,"$1.$2")
//     cnpj=cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
//     cnpj=cnpj.replace(/\.(\d{3})(\d)/,".$1/$2")
//     cnpj=cnpj.replace(/(\d{4})(\d)/,"$1-$2")
//     return cnpj
// };


// $.verificaPessoaExiste = function(campo, valor){

//     $.ajax({
//         url: '/pessoa/verifica-pessoa-existe/',
//         type: 'post',
//         data: {
//             campo: campo,
//             valor: valor

//         },
//         async: false,
//         success: function(resp) {
//             if (resp.jaExiste == true) {
//                 $('.msgPessoaJaExiste').show();
//                 $('.msgPessoaJaExiste').html(
//                     "<span style='color:red ;'>Já existe uma pessoa cadastrada com estes dados, favor verificar: <br/>" +
//                     "Nome: " + resp.pessoa.nome +
//                     "</span>")
//             } else {
//                 $('.msgPessoaJaExiste').hide();
//             }
//         }
//     });

// };

// $.exibeTraducaoDescricao = function () {
//     if ($("input[id='fld-importacao']").is(':checked')) {
//         $("#dadosTraducao").show("slow");
//     } else {
//         $("#dadosTraducao").hide("slow");
//     }
// };

// $.verificaPublicoPrivado = function (radioValue, fldPublicoClassicacao) {
//     if (radioValue == 'Privado') {
//         $('#div-publico-classificacao').hide('slow');
//         fldPublicoClassicacao.attr('required', false);
//     } else {
//         $('#div-publico-classificacao').show('slow');
//         fldPublicoClassicacao.attr('required', 'required');
//     }
// };

// function spinnerShow(){
//     document.getElementById("spinner-back").classList.add("show");
//     document.getElementById("spinner-front").classList.add("show");
// }
// function spinnerHide(){
//     document.getElementById("spinner-back").classList.remove("show");
//     document.getElementById("spinner-front").classList.remove("show");
// }

// JSON.safeStringify = (obj, indent = 2) => {
//     let cache = [];
//     const retVal = JSON.stringify(
//         obj,
//         (key, value) =>
//             typeof value === "object" && value !== null
//                 ? cache.includes(value)
//                 ? undefined // Duplicate reference found, discard key
//                 : cache.push(value) && value // Store value in our collection
//                 : value,
//         indent
//     );
//     cache = null;
//     return retVal;
// };

// function JSONstringify(json) {
//     if (typeof json != 'string') {
//         json = JSON.safeStringify(json);
//     }

//     var
//         arr = [],
//         _string = 'color:green',
//         _number = 'color:darkorange',
//         _boolean = 'color:blue',
//         _null = 'color:magenta',
//         _key = 'color:red';

//     json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//         var style = _number;
//         if (/^"/.test(match)) {
//             if (/:$/.test(match)) {
//                 style = _key;
//             } else {
//                 style = _string;
//             }
//         } else if (/true|false/.test(match)) {
//             style = _boolean;
//         } else if (/null/.test(match)) {
//             style = _null;
//         }
//         arr.push(style);
//         arr.push('');
//         return '%c' + match + '%c';
//     });

//     arr.unshift(json);

//     console.log.apply(console, arr);
// }

function getFileIcon(extensao)
{
    extensao = String(extensao).replace(/[^a-zA-Z0-9]/g, '');

    extensao = extensao.toLocaleLowerCase();
    let retorno = {};
    switch(extensao) {
        case 'doc':
        case 'docx':
        case 'odt':
            retorno = {text:'(Word) ', icon: 'far fa-file-word'};
            break;
        case 'xls':
        case 'xlsx':
        case 'ods':
            retorno = {text:'(Excel) ', icon: 'far fa-file-excel'}
            break;
        case 'ppt':
        case 'pptx':
        case 'pps':
        case 'odp':
            retorno = {text:'(PowerPoint) ', icon: 'far fa-file-powerpoint'}
            break;
        case 'pdf':
            retorno = {text:'(PDF) ', icon: 'far fa-file-pdf'}
            break;
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'svg':
            retorno = {text:'(Imagem) ', icon: 'far fa-image'}
            break;
        default:
            retorno = {text:'Arquivo', icon: 'fas fa-file'}
    }
    return retorno;
}

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$(document).on('select2:open', () => {
    document.querySelector('.select2-search__field').focus();
});

// var fldcheckbox = $("#pagamentonotafiscal-boleto , #pagamentointerno-boleto");
// fldcheckbox.on('click', function () {
//     var model = $('#modelId');
//     if (!($(this).is(':checked')) && model.val()) {
//         $.ajax({
//             url: '/pedido/verifica-boleto-pedido/',
//             data: {
//                 id: model.val()
//             },
//             async: false,
//             success: function (resp) {
//                 if (!resp){
//                     fldcheckbox.prop('checked', true);
//                     $('#contaBancaria').addClass('d-none')
//                     toastr.warning('Para desmarcar a opção, o boleto precisa ser excluído.');
//                 }
//             }
//         });
//     }
// });

// /* TODO Insights IA */
// /* Funcionalidade em fase BETA */

// function analisarCotacoesViaIa(processoCompraId) {
//     // Primeiro, chama o fnbPageBlock para exibir o loader
//     fnbPageBlock('Executando análise com IA...');

//     // Usa setTimeout para garantir que o bloqueio seja exibido antes da requisição AJAX
//     setTimeout(function() {
//         $.ajax({
//             url: '/processo-compra/analisar-cotacoes-via-ia?processoCompraId=' + processoCompraId,
//             async: true, // Torna a requisição assíncrona
//             success: function (resp) {
//                 $('.card-analise-ia .content').html(resp.analise);
//                 $('.card-analise-ia').show('slow');

//                 // Desmarca todos os checkboxes primeiro
//                 $('td.grid-resumocotacao input[type="checkbox"]').each(function() {
//                     if ($(this).is(':checked')) {
//                         $(this).click();
//                     }
//                 });

//                 // Marca os checkboxes recomendados
//                 $('td.grid-resumocotacao input[type="checkbox"]').each(function() {
//                     if (resp.cotacoes_recomendadas.includes(parseInt($(this).val()))) {
//                         $(this).click();
//                     }
//                 });

//                 fnbPageUnblock();
//             },
//             error: function (xhr, status, error) {
//                 console.error('Erro na requisição AJAX:', error);
//                 fnbPageUnblock();
//             }
//         });
//     }, 100); // Pequeno atraso de 100ms para garantir que o loader seja exibido
// }