var btnSave = document.getElementById("btn-save");
var etiqueta = document.getElementById("posicaoClick");

function salvarEtiqueta(protocolo_id) {
    console.log('gsdfgdsfgsdgsdg')
    $.ajax({
        url: '/protocolo-nota-fiscal/salvar-protocolo-eletronico/',
        data: {
            protocolo_id: $("#input-protocolo-id").val(),
            left: getOffset(etiqueta).left,
            top: getOffset(etiqueta).top
        },
        async: false,
        success: function(resp) {
           // console.log(resp);
        }
    });
}