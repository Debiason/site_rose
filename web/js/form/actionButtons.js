$(function () {
    $('#inclui-item-btn').on('click', function (e) {
        e.preventDefault();
        $('#msgError').show('slow');
    });
});
// $(".save-form").click(function (event) {
//     var btn = $(this);
//     event.preventDefault();
//     fnbPageBlock();
//     btn.prop('disabled', true);
//     btn.html('Aguarde ...');
//     $('#form-pedido').submit();
//     setTimeout(function(){
//         btn.prop('disabled', false);
//         btn.html('Salvar <i class="fas fa-save"></i>');
//         fnbPageUnblock();
//     }, 10000);
// });

// $("[name='salvar-e-continuar']").on('click', function(e) {
//     var btn = $(this);
//     e.preventDefault();
//     fnbPageBlock();
//     btn.prop('disabled', true);
//     btn.html('Aguarde <i class="fas fa-spinner fa-spin"></i>');
//     btn.closest('form').submit();
//     setTimeout(function(){
//         btn.prop('disabled', false);
//         btn.html('Salvar & continuar <i class="fas fa-arrow-right"></i>');
//         fnbPageUnblock();
//     }, 10000);
// });