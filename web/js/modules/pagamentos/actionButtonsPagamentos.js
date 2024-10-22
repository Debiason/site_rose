$("[name='processar']").on('click', function(e) {
    var btn = $(this);
    localStorage.removeItem('pagamentosFalha');
    localStorage.removeItem('pagamentosSucesso');
    e.preventDefault();
    fnbPageBlock();
    btn.prop('disabled', true);
    btn.closest('form').submit();
});

document.addEventListener('DOMContentLoaded', (event) => {
    const processarBtn = document.getElementById('processarBtn');

    processarBtn.addEventListener('click', (event) => {
        localStorage.removeItem('pagamentosFalha');
        localStorage.removeItem('pagamentosSucesso');
    });
});
