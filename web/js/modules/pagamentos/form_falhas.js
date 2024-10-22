carregaTabelaFalha()
function carregaTabelaFalha(){
    const data = loadFromLocalStorage();
    setTimeout(function() {
        renderTable(data);
    }, 500);
}
function loadFromLocalStorage() {
    const data = localStorage.getItem('pagamentosFalha');
    return data ? JSON.parse(data) : [];
}
function renderTable(data) {
    const tableBody = document.querySelector("#pagamentosTable tbody");
    var $i = 1;
    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${$i}</td>
            <td>${item.nome}</td>
            <td>${item.numero}</td>
            <td>${item.motivo}</td>`;
        tableBody.appendChild(row);
        $i++;
    });
}

$('.m-nav__item a[data-url="/pagamentos/baixa/pagamentos-falha?model=1"]').on('click', function(){
    carregaTabelaFalha()
});
