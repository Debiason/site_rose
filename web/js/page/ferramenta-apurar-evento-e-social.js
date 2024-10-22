$(".kv-row-checkbox").change(function () {
    getIds();
});

$(".select-on-check-all").change(function () {
    getIds();
});

function getIds() {

    var id = [];
    var i = 0;

    $('.kv-row-checkbox:checked').each(function () {
        id[i] = $(this).closest('tr').find('.apuracao-id').text();
        i++;
    });

    let btnValidarTodos = $("button[id='validar-todos']");
    if (id != '') {
        btnValidarTodos.attr('disabled', true);
        btnValidarTodos.hide('slow');
    } else {
        btnValidarTodos.attr('disabled', false);
        btnValidarTodos.show('slow');
    }

    $("#modelIds").val(id);
}

$("button[id='validar-selecionados']").click(function (event) {
    event.preventDefault();
    fnbPageBlock();
    $('#btnAcao').val('validar-selecionados');
    $('#ferramenta-form').submit();
});

$("button[id='validar-todos']").click(function (event) {
    event.preventDefault();
    fnbPageBlock();
    $('#btnAcao').val('validar-todos');
    $('#ferramenta-form').submit();
});
$("button[id='apurar']").click(function (event) {
    event.preventDefault();
    fnbPageBlock();
    $('#btnAcao').val('apurar');
    $('#ferramenta-form').submit();
});


