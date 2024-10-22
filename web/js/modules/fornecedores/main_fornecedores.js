var mostrarPolitica = $('#mostraPolitica').val();
var checkbox = document.getElementById('checkPolitica');
var aceitou = document.querySelector('#politicaAceita');

if (mostrarPolitica == 0) {
    $('#modalPoliticaGestao').modal('show');
}
// Intercepta o evento de clique fora da modal
jQuery(document).ready(function (e) {
    jQuery('#modalPoliticaGestao').trigger('click');
});

$('#checkPolitica').click(function () {
    if (checkbox.checked) {
        aceitou.classList.remove('d-none');
    } else {
        aceitou.classList.add('d-none');
    }
});
$('#politicaAceita').click(function () {
    var id = $('#usuarioLogado').val();
    var mostrarMensagem = document.querySelector('#aviso_fornecedor');

    $.ajax({
        url: '/fornecedores/default/atualiza-politica/',
        data: {
            id: id
        },
        async: false,
        success: function (resp) {
            var div = document.createElement('div');
            div.classList.add('m-alert__text');
            if (resp == true) {
                $('#modalPoliticaGestao').modal('hide');
                div.innerHTML = "Aceite confirmado com sucesso.";
            } else {
                $('#modalPoliticaGestao').modal('hide');
                div.innerHTML = "<b>Atenção!</b> Ocorreu algum erro. Sua escolha não foi atualizada.";
            }
            mostrarMensagem.appendChild(div);
            mostrarMensagem.classList.remove('d-none');

            setTimeout(function () {
                mostrarMensagem.classList.add('d-none');
            }, 5000);
        }
    });
})

$('#modalPoliticaGestao').on('shown.bs.modal', function (event) {

    checkbox.addEventListener("click", function (e) {
        var lerMensagem = document.querySelector('#lerArquivo');

        if (checkbox.checked) {
            aceitou.classList.remove('d-none');
        } else {
            aceitou.classList.add('d-none');
        }
        lerMensagem.classList.add('d-none');
    })
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