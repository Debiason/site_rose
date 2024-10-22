$('#exportarRM').on('click', function () {
    $(this).prop('disabled', true);
    exportaRM(this.value);
});

function exportaRM(idPlanejamento) {
    if (idPlanejamento) {
        $.ajax({
            url: '/producao/planejamento/exporta-rm/',
            data: {
                idPlanejamento: idPlanejamento
            },
            async: false,
            success: function (resp) {
                if (resp) {
                    document.getElementById(resp['status']).innerHTML = resp['msg'];
                    document.getElementById(resp['status']).style.display = "block";
                } else {
                    document.getElementById("msg_error").style.display = "block";
                }

                location.reload();
            }
        });
    }
}