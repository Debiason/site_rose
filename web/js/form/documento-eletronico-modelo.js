/**
 * A propriedade imagem_assinatura dos objetos signatarios que esta em configuracao_modelo
 * é usada na tela de print em documento-eletronico/print-detail
 */

// devem ser carregados após o carregamento da página
$(function(){
    // guarda as informações do signatário caso haja 
    var configuracao_modelo = String($('#configuracao_modelo').val());

    // se tiver configurações coloca as imagens na posição e adiciona os labels caso tenha
    if(configuracao_modelo.length > 0) {
        gerarImagenAssinatura(null, JSON.parse(configuracao_modelo));
        addInputLabel(null, null, JSON.parse(configuracao_modelo))
    }

    // marca o checkbox caso tenha signatários e exibi os inputs
    if($("#documentoeletronicomodelo-signatarios").val().length > 0) {
        $("#tem_signatarios").attr('checked', true)
        $(".signatarios-box").show('slow');
    }

    // bloqueia assinatura se signatários for vazio ao carregar a tela
    if($("#documentoeletronicomodelo-signatarios").val().length === 0) {
        $("#configuracao_modelo").val('');
        $(".show-a4-print").addClass("disabled");
        $(".show-a4-print").attr("disabled", "disabled");
    }

    // aviso no botão de configuração da assinatura
    $('[data-toggle="popover"]').popover();
    $(".field-configuracao_modelo .input-group")
    .attr('data-toggle', "popover")
    .attr('title', "Definir posição assinatura")
    .attr('data-content', "Para definir a assinatura é necessário ao menos um signatário.");
});
/**
 * METÓDO CHANGE SELECT
 */
// bloqueia o botaõ de configurar assinatura se não tiver signatários
$("#documentoeletronicomodelo-signatarios").on('change', function(e){

    $("#configuracao_modelo").val('');

    if(String($(this).val()) === "") {
        $(".show-a4-print").addClass("disabled");
        $(".show-a4-print").attr("disabled", "disabled");
        return false;
    }
    $(".show-a4-print").removeClass("disabled");
    $(".show-a4-print").removeAttr("disabled");

});

$("#documentoeletronicomodelo-signatarios").on('select2:select', function(e){
    var select = e.params.data
    
    addInputLabel(select.id, select.text);
});

$("#documentoeletronicomodelo-signatarios").on('select2:unselect', function(e){
    var select = e.params.data
    
    delInputLabel(select.id);
});

/**
 * METÓDO CLICK BUTTON
 */
// mostrar input signatários e assinatura
$("#tem_signatarios").on('click', function(e){
    if($(this).is(':checked'))
        $(".signatarios-box").show('slow');
    else {
        $('#configuracao_modelo').val('');
        $("#documentoeletronicomodelo-signatarios").val('').change();;
        $(".signatarios-box").hide('slow');
    }
});

// ação antes de salvar o modelo
$("#w0").on('submit', function(e){

    // se não tiver signatário limpa os input dos signatários
    if(!$("#tem_signatarios").is(':checked')) { 
        $("#configuracao_modelo").val('');
        $("#documentoeletronicomodelo-signatarios").val('');
    } 
    else // se tiver signatários
    {

        var $input = null;
        var signatarios = [];
        var id = 0;
        var label = '';

        // faz um loop procurando por rótulos dos signatários
        $(".rotulo-signatario").each(function(){
            $input = $(this).find('input');
            
            if($input) {
                label = String($input.val());
                if(label.length === 0)
                    return;

               id = String($input.attr('id').replace(/\D/g, ''));
               label = $input.val();
               signatarios.push({id:id, label:label})
            }
        });

        // se existir rótulos para os signatários adiciona o rótulo e a key do mesmo
        if(signatarios.length > 0) {

            var configs = $("#configuracao_modelo").val();
            configs = JSON.parse(configs);
            var key = null;

            for(var i=0;i< configs.length;i++) {
                for(var j=0;j<signatarios.length;j++) {
                    if(configs[i].signatario.id === signatarios[j].id) {
                        key =  $("#documentoeletronicomodelo-signatarios option[value='"+signatarios[j].id+"']").text() ? 
                                    $("#documentoeletronicomodelo-signatarios option[value='"+signatarios[j].id+"']").text() : null;
                        configs[i].signatario.key = key;
                        configs[i].signatario.label = signatarios[j].label;
                        break;
                    }
                }
            }
            // adiciona as novas configurações ao input de configuração
            $("#configuracao_modelo").val(JSON.stringify(configs));
        }


        // verifica se o altura da imagem foi alterado, senão foi seta o padrão 55
        var configs = $("#configuracao_modelo").val();
        configs = JSON.parse(configs);
        var key = null;
        var heightImagem = ''
        for(var i=0;i< configs.length;i++) {
            if(configs[i].signatario.imagem_assinatura.hasOwnProperty('height')) {
                heightImagem = String(configs[i].signatario.imagem_assinatura.height).replace(/\D/g, '');
                if(heightImagem.length === 0)
                    configs[i].signatario.imagem_assinatura.height = 55;

            } else {
                configs[i].signatario.imagem_assinatura.height = 55;
            }
        }
        $("#configuracao_modelo").val(JSON.stringify(configs));
        // fim seta tamanho padrão imagemW
    }
})

// fechar print assinatura
$(".close-a4-print").click(function() {
    $("#overlay-assinatura").hide('slow');
});

/**
 * FUNÇÕES
 */
// validar campos obrigatórios
function signatariosObrigatorio(attribute, value) {
    return ($("#tem_signatarios").is(':checked') === true);
}

// Abrir print assinatura
$(".show-a4-print").click(function() {

    // fundo preto da tela de print
    $("#overlay-assinatura").show('slow');

    // guarda os signatários selecionados
    var signatarios = $("#documentoeletronicomodelo-signatarios").val();
    
    // valida se foi selecionado algum, só abre a tela de print se tiver algum
    if(signatarios.length === 0) {
        toastr.error("Nenhum signatário foi selecionado.");
        return false;
    }

    // Input que vai receber o array de objetos com a posição e altura das assinaturas
    var $configuracao_modelo = $('#configuracao_modelo');

    // Recebe array de objetos
    var results = $configuracao_modelo.val().length === 0 ? [] : JSON.parse($configuracao_modelo.val());

    if(results.length === 0) {

        $("#box-image-assinatura").html('');
        $('#configuracao_modelo').val('');

        for(var i=0;i<signatarios.length;i++) {
            gerarImagenAssinatura(signatarios[i]);
            setPosicaoAssinatura(signatarios[i]);
            setAlturaAssinatura(signatarios[i]);
        }
    }
});

/**
 * 
 * @param {number} signatario_id 
 * @param {Object} object 
 */
function gerarImagenAssinatura(signatario_id, object = null) {
    if(object !== null) {
        for(var i=0; i < object.length; i++) {
            $("#box-image-assinatura").append(
                $('<div>', {
                    id: 'resizer_' + object[i].signatario.id,
                    style: 'position:absolute;' + 
                        'left:' + object[i].signatario.imagem_assinatura.left + 'px;' + 
                        'top:' + object[i].signatario.imagem_assinatura.top + 'px;'
                })
                .append(
                    $('<img>', {
                        class: 'imagem-assinatura imagem-assinatura-'+ object[i].signatario.id,
                        alt: 'Imagem Assinatura '+ object[i].signatario.id,
                        src: '/img/assinatura-modelo.png',
                        height: object[i].signatario.imagem_assinatura.height ? object[i].signatario.imagem_assinatura.height : '78px'
                    })
                )
            );
            setPosicaoAssinatura(object[i].signatario.id);
            setAlturaAssinatura(object[i].signatario.id);
        }
        
    } else {
        $("#box-image-assinatura").append(
            $('<div>', {id: 'resizer_' + signatario_id})
            .append(
                $('<img>', {
                    class: 'imagem-assinatura imagem-assinatura-'+signatario_id,
                    alt: 'Imagem Assinatura '+signatario_id,
                    src: '/img/assinatura-modelo.png',
                    height: '78px'
                })
            )
        );
    }
}

/**
 * Criar/Alterar a posicao da assinatura dentro do objeto
 * 
 * @param {number} signatario_id
 * 
 * @return {void}
 */
function setPosicaoAssinatura(signatario_id) {

    /**
     * Metódo usado para capturar a posição das assinaturas, chamado 
     * dentro da inicialização do plugin peles metódos start e stop
     * 
     * @param {HTMLDivElement} element 
     * @param {number} signatario_id
     * 
     * @return {void}
     */
    var coordinates = function(element, signatario_id) {
        // pega o elemento
        element = $(element);

        // input que vai receber o array de objetos com a posição e altura das assinaturas
        var $posicaoAssinatura = $('#configuracao_modelo');

        // recebe array de objetos
        var results = $posicaoAssinatura.val().length === 0 ? [] : JSON.parse($posicaoAssinatura.val());

        // recebe a posição top e left da assinatura
        var top = element.position().top;
        var left = element.position().left;     

        // se não existir assinatura cadastrada ou estiver vazia ele cria o array de objeto
        if(results.length === 0) {

            results.push({signatario:{id: signatario_id,  key: null, label: null, imagem_assinatura: {left: left, top: top, height: null}}});

        } else { // atualiza ou adiciona a um objeto existente
            var exist = false;
            for(var i=0;i<results.length;i++) {
                if(results[i].signatario.id === signatario_id) {
                    results[i].signatario.imagem_assinatura.left = left;
                    results[i].signatario.imagem_assinatura.top = top;
                    exist = true;
                }
            }

            // se não existir adiciona
            if(exist === false) {
                results.push({signatario:{id: signatario_id, key: null, label: null, imagem_assinatura: {left: left, top: top, height: null}}});
            }
        }
               
        // adicionar o objeto em formato string ao campo para ser salvo
        $('#configuracao_modelo').val(JSON.stringify(results));
    }

    // inicia o plugin para alterar a posição das imagens
    $('#resizer_'+signatario_id).draggable({
        containment: ".a4-size",
        start: function() {
            coordinates('#resizer_'+signatario_id, signatario_id);
        },
        stop: function() {
            coordinates('#resizer_'+signatario_id, signatario_id);
        },
         cursor: "move",
    });
}

/**
 * Criar/Alterar a altura da assinatura dentro do objeto
 * 
 * @param {number} signatario_id
 * 
 * @return {void}
 */
function setAlturaAssinatura(signatario_id) {

    $('#resizer_' + signatario_id).resizable({
        aspectRatio: true,
        handles: 'all',
        alsoResize: '.imagem-assinatura-'+signatario_id,
        stop: function (evt, ui) {
            // input que vai receber o array de objetos com a posição e altura das assinaturas
            var $posicaoAssinatura = $('#configuracao_modelo');

            // recebe array de objetos
            var results = $posicaoAssinatura.val().length === 0 ? [] : JSON.parse($posicaoAssinatura.val());

            if(results.length === 0) {
                results.push({signatario:{id: signatario_id, key: null, label: null, imagem_assinatura: {height: ui.size.heigh}}});
    
            } else { // atualiza ou adiciona a um objeto existente
                var exist = false;
                for(var i=0;i<results.length;i++) {
                    if(results[i].signatario.id === signatario_id) {
                        results[i].signatario.imagem_assinatura.height =  ui.size.height;
                        exist = true;
                    }
                }
    
                // se não existir adiciona
                if(exist === false) {
                    results.push({signatario:{id: signatario_id, key: null, label: null, imagem_assinatura: {height: ui.size.heigh}}});
                }
            }

            $('#configuracao_modelo').val(JSON.stringify(results));
        }
    });
}

/**
 * Adiciona o input para criar um label que aparece abaixo da assinatura
 *  
 * @param {number|null} signtario_id 
 * @param {string|null} signatario_key 
 * @param {Object|null} object 
 * 
 * @return {void}
 */
function addInputLabel(signtario_id, signatario_key, object = null) {

    var divFormGroupChild = $(".field-documentoeletronicomodelo-signatarios");
    var divParent = divFormGroupChild.parent('div');


    if(object !== null) {
        for(var i=0;i<object.length; i++) {

            divParent.append(
                $('<div>', {
                    class: 'form-group highlight-addon rotulo-signatario', 
                    id: 'div-signatario-label-' + object[i].signatario.id
                })
                .append($('<label>', {
                    style: 'display:block'
                })
                .append($('<label>', {
                    class: 'has-star'
                })
                .text('Rótulo (' + object[i].signatario.key + ")")))
                .append(
                    $('<input>', {class: 'form-control', id: 'input-label-sig-'+object[i].signatario.id, value: object[i].signatario.label})
                )
            );
        }

    } else {
       
        divParent.append(
            $('<div>', {
                class: 'form-group highlight-addon rotulo-signatario', 
                id: 'div-signatario-label-' + signtario_id
            })
            .append($('<label>', {
                style: 'display:block'
            })
            .append($('<label>', {
                class: 'has-star'
            })
            .text('Rótulo (' + signatario_key + ")")))
            .append(
                $('<input>', {class: 'form-control', id: 'input-label-sig-'+signtario_id})
            )
        );
    }
}

/**
 * Remove do DOM a div com o input da label do signatário.
 * O atributo label só é não é removido do objeto, pois o input de configuração é apagado 
 * quando remove do o item do select do signatário
 * 
 * @param {number|null} signtario_id 
 * 
 * @return {void}
 */
function delInputLabel (signtario_id) {
    $("#input-label-sig-" + signtario_id).parent('.form-group').remove();
}