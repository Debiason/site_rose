$("[name='salvar-e-continuar']").on('click', function(e) {
    var btn = $(this);
    e.preventDefault();
    fnbPageBlock();
    btn.prop('disabled', true);
    btn.html('Aguarde <i class="fas fa-spinner fa-spin"></i>');
    btn.closest('form').submit();
    setTimeout(function(){
        btn.prop('disabled', false);
        btn.html('Salvar & continuar <i class="fas fa-arrow-right"></i>');
        fnbPageUnblock();
    }, 10000);
});