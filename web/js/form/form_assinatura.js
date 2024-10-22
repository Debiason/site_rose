$(function() {
    /** Data-toogle hover */
    $('[data-toggle="popover"]').popover();

    /** Plugin de assinatura */
    var signaturePad = $('#smoothed').signaturePad({
        drawOnly: true,
        drawBezierCurves: true,
        lineTop: 120,
        bgColour: 'transparent',
        lineColour: 'transparent',
        penColour: '#000000',
        lineWidth: 0
    });

    $(".sigWrapper").on('click', function(){
        let signaturePadGenerated = signaturePad.getSignatureString();
        if(signaturePadGenerated !== '[]') {
            $("#img-assinatura").parent('div').removeClass('has-error')
            $("#img-assinatura").parent('div').find('.help-block').html('');
        }
    });

    /** Enviar formulário */
    $('#btnSaveAssinatura').on('click', function () {
        let form = $("#form-assinatura");
        let signaturePadGenerated = signaturePad.getSignatureString();
        let isEditando = $("#is-editando");
        if(isEditando === undefined) {
            toastr.error('O input com id "editando" não foi encontrado.', 'Error!');
            return false;
        }
        let isEditandoInt = String(isEditando.val()).replace(/\D/g, '');
        if(isEditandoInt.length === 0) {
            toastr.error('O input com id "editando" está sem valor.', 'Error!');
            return false;
        }
        if(parseInt(isEditandoInt) === 1) {
            if(signaturePadGenerated === '[]' && $("#img-assinatura").val().length === 0) {
                toastr.error('A assinatura é obrigatória.', 'Error!');
                return false;
            }
        }
        if(parseInt(isEditandoInt) === 0) {
            if(signaturePadGenerated === '[]') {
                toastr.error('A assinatura é obrigatória.', 'Error!');
                return false;
            }
        }

        html2canvas([document.getElementById('sign-pad')], {
            allowTaint: true,
            backgroundColor: null,
            onrendered: function (canvas) {
                
                if(parseInt(isEditandoInt) === 1) {
                    if(signaturePadGenerated !== '[]') {
                        var newCanvas = trimCanvas(canvas);
                        var canvas_img_data = newCanvas.toDataURL('image/png');
                        var img_data = canvas_img_data.replace(/^data:image\/(png|jpg);base64,/, "");
                        $("#img-assinatura").val(img_data);
                    }
                } else if(parseInt(isEditandoInt) === 0) {
                    var newCanvas = trimCanvas(canvas);
                    var canvas_img_data = newCanvas.toDataURL('image/png');
                    var img_data = canvas_img_data.replace(/^data:image\/(png|jpg);base64,/, "");
                    $("#img-assinatura").val(img_data);
                }

                let inputAssinatura = $("#img-assinatura").val();
                if (inputAssinatura.length < 1) {
                    toastr.error('A assinatura é obrigatória', 'Error!')
                    return false;
                }
                $.ajax({
                    url: form.attr('action'),
                    type: 'post',
                    data: form.serialize(),
                    success: function (response) {
                        if (response.success) {
                            var contentDiv = $(".usuario-update .tab-secondary");
                            contentDiv.fadeOut(function(){
                                contentDiv.load('/usuario-assinatura?user_id='+response.usuario_id, function(){
                                    contentDiv.fadeIn();
                                });
                            });
                            $("#modal-principal").modal('hide');
                            toastr.success('Cadastrado com sucesso!.', 'Cadastrado!')
                            return false;
                        }
                        var field = '';
                        for (prop in response) {
                            field = $("#"+prop);
                            if(field) {
                                field.parent('div').addClass('has-error')
                                field.parent('div').find('.help-block').html(response[prop]);
                            }
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error(errorThrown, 'Error!');
                    }
                });
            }
        });
    });
    /** Limpa a imagem e o campo hidden */
    $(".clearButton").on('click', function(){
        $("#img-assinatura").val('');
    });

    // remove a parte transparente da imagem
    function trimCanvas(c) {
        var ctx = c.getContext('2d'),
            copy = document.createElement('canvas').getContext('2d'),
            pixels = ctx.getImageData(0, 0, c.width, c.height),
            l = pixels.data.length,
            i,
            bound = {
                top: null,
                left: null,
                right: null,
                bottom: null
            },
            x, y;
        
        // Iterate over every pixel to find the highest
        // and where it ends on every axis ()
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
                x = (i / 4) % c.width;
                y = ~~((i / 4) / c.width);
    
                if (bound.top === null) {
                    bound.top = y;
                }
    
                if (bound.left === null) {
                    bound.left = x;
                } else if (x < bound.left) {
                    bound.left = x;
                }
    
                if (bound.right === null) {
                    bound.right = x;
                } else if (bound.right < x) {
                    bound.right = x;
                }
    
                if (bound.bottom === null) {
                    bound.bottom = y;
                } else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }
        
        // Calculate the height and width of the content
        var trimHeight = bound.bottom - bound.top,
            trimWidth = bound.right - bound.left,
            trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
    
        copy.canvas.width = trimWidth;
        copy.canvas.height = trimHeight;
        copy.putImageData(trimmed, 0, 0);
    
        // Return trimmed canvas
        return copy.canvas;
    }
});
function toogleImage(element_show, element_hide) {
    $("."+element_show).show();
    $("."+element_hide).hide();
}
