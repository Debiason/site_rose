$( document ).ready(function() {
    var el = document.getElementById('miniatura-documentos');
    let value = el.querySelector('#documento_0').value;
    let formato = $('#documento_0').attr('name')

    // exibe o primeiro documento ao abrir a pagina
    exibeArquivoPorTipo(formato, value);

    // remove a cor do primeiro botão referente ao documento 1 e acrescenta a cor selecionada
    $('#documento_0').removeClass('bg-light');
    $('#documento_0').addClass('bg-info');
    $('#documento_0').addClass('text-light');

    // chamada da função responsável por verificar se o documento chegou no final
    barraRolagem();
});

// evento ao clicar no botão do documento
var el = document.getElementById('miniatura-documentos');

el.addEventListener('click', function (e) {
    let documento = e.target.id;
    let id = $('#'+documento);
    let value = id.val();
    let formato = id.attr('name')

    // chamada da função responsável por verificar se o documento chegou no final
    documentoSelecionado(id)

    // chamada da função responsável por verificar se o documento chegou no final
    exibeArquivoPorTipo(formato, value);

    // obtém o indice do documeno através do valor do id do botão e armazena no campo input oculoto no html
    $('#indice-documento').val(parseInt(e.target.id.slice(-1)));

    // remove cor da da div caso clique fora e carrega primeiro documento na primeira página
    if (documento === 'miniatura-documentos') {
        proximoDocumento(0)
        $('#'+documento).removeClass('bg-info');
    }

});

function barraRolagem() {
    $('.container').bind('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            // incrementa o indice do documento na variável
            let indiceDocumento = parseInt($('#indice-documento').val()) + 1;

            // chamada da função responsável por carregar o próximo documento
            proximoDocumento(indiceDocumento);

            // armazena o indice do documento no input campo oculto no html
            $('#indice-documento').val(indiceDocumento);

            // volta para o inicio da div no documento recém-aberto
            $('.container').animate({
                scrollTop: 0
            },  1000,"linear");
        }
    });
}

// funão responsável por acionar o próximo documento a ser exibido
function proximoDocumento(indiceDocumento) {
    let value = el.querySelector('#documento_'+indiceDocumento).value;
    let id =  $('#documento_'+indiceDocumento);
    let formato = id.attr('name')

    // chamada da função responsável por adicionar cores nos botões ao clicar
    documentoSelecionado(id)

    // chamada da função responsável por exibir o conteúdo do arquivo no html
    exibeArquivoPorTipo(formato, value);
}

// função que incorpora no html arquivo pdf e imagem
function exibeArquivoPorTipo(formato, value) {
    if (formato === 'pdf') {
        $("#documento-completo").html('<object data="' + value + '" height="1200px" width="100%"></object>');

    } else {
        $("#documento-completo").height('1200').html('<img src="' + value + '" style="max-width: 100%">');

    }
}

// função aplica cores nos botões
function documentoSelecionado(id_btn) {
    // texto
    $('.card > button').removeClass('text-light');
    id_btn.addClass('text-light');

    // botão
    $('.card > button').removeClass('bg-info');
    id_btn.removeClass('bg-light');
    id_btn.addClass('bg-info');
}