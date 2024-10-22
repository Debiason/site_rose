$(document).ready(function () {
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

    $(".sigWrapper").on('click', function () {
        let signaturePadGenerated = signaturePad.getSignatureString();
        if (signaturePadGenerated !== '[]') {
            $("#img-assinatura").parent('div').removeClass('has-error')
            $("#img-assinatura").parent('div').find('.help-block').html('');
        }
    });

    $(document).on('click', '.btnConfirmarEntrega', function () {
        let entregaId = $(this).data('id');
        $('#modalAssinatura').data('entrega-id', entregaId);
        $('#modalAssinatura').modal('show');

        $("#form-assinatura-entrega")[0].reset();
        $(".clearButton").click();
    });

    $('#btnSaveAssinatura').on('click', function () {
        let form = $("#form-assinatura-entrega");
        let signaturePadGenerated = signaturePad.getSignatureString();
        let pessoanome = $("#pessoarecebeunome").val();
        let pessoadocumento = $("#pessoarecebeudocumento").val();

        if (signaturePadGenerated === '[]') {
            toastr.error('A assinatura é obrigatória.');
            return false;
        }

        if (pessoanome == '') {
            toastr.error('O nome da pessoa que recebeu é obrigatório.');
            return false;
        }

        if (pessoadocumento == '') {
            toastr.error('O documento da pessoa que recebeu é obrigatório.');
            return false;
        }

        html2canvas([document.getElementById('sign-pad')], {
            allowTaint: true,
            backgroundColor: null,
            onrendered: function (canvas) {

                var newCanvas = trimCanvas(canvas);
                var canvas_img_data = newCanvas.toDataURL('image/png');
                var img_data = canvas_img_data.replace(/^data:image\/(png|jpg);base64,/, "");
                $("#img-assinatura").val(img_data);

                let inputAssinatura = $("#img-assinatura").val();
                if (inputAssinatura.length < 1) {
                    toastr.error('A assinatura é obrigatória');
                    return false;
                }

                let formData = form.serializeArray();
                let data = {};
                formData.forEach(field => {
                    data[field.name] = field.value;
                });
                data.assinatura = img_data;
                data.entrega_id = $('#modalAssinatura').data('entrega-id');

                saveToLocalDB(data);
            }
        });
    });

    function saveToLocalDB(data) {
        saveEntrega(data).then(message => {
            toastr.success(message);
            $('#btnConfirmarEntrega-' + data.entrega_id).prop('disabled', true);
            $('#btnConfirmarEntrega-' + data.entrega_id).html('Entrega confirmada');
            $('#btnConfirmarEntrega-' + data.entrega_id).removeClass('btn-outline-success');
            $('#btnConfirmarEntrega-' + data.entrega_id).addClass('btn-success');
            $('#modalAssinatura').modal('hide');
        }).catch(error => {
            toastr.error(error, 'Erro!');
        });
    }

    $(".clearButton").on('click', function () {
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
    $("." + element_show).show();
    $("." + element_hide).hide();
}
