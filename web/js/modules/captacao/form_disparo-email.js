var modelo = $("#disparoemail-modelo_id");
var layout = $("#disparoemail-layout_email");

$(document).ready(function () {
    getLayout();

    modelo.on("change", function () {
        getLayout();
    });
});

function getLayout() {
    $.ajax({
        url: "/captacao/disparo-email/get-layout",
        type: "POST",
        data: {
            modelo_id: modelo.val()
        },
        success: function (data) {
            if (data) {
                CKEDITOR.instances['disparoemail-layout_email'].setData(data);
            }
        }
    })
}