var btnAutorizar = $("button[class='btn btn-outline-success autorizar']");

btnAutorizar.click(function () {
    salvaAutorizacao();
});

$("input[name='selection_all']").ready(function () {
    $("input[name='selection_all']").hide();
    $("#msgAutorizado").hide('slow');
    $("#msgNaoAutorizado").hide('slow');

});

function salvaAutorizacao() {

    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).val();
        i++;
    });

    $.ajax({
        url: '/termo-ratificacao/autorizar/',
        data: {
            id: id
        },
        async: false,
        success: function (resp) {
            if (resp == true){
                location.reload();
                $("#msgAutorizado").show('slow');
                $("#msgNaoAutorizado").hide('slow');
            } else {
                $("#msgNaoAutorizado").show('slow');
                $("#msgAutorizado").hide('slow');
            }

        }
    });

}
