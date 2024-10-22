carregaTabela()
function loadFromLocalStorageSuccess() {
    const data = localStorage.getItem('pagamentosSucesso');
    return data ? JSON.parse(data) : [];
}
function renderTable(data) {
    const tableBody = document.querySelector("#pagamentosTable tbody");
    var $i = 1;
    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${$i}</td>
            <td>${item.transacao}</td>
            <td>${item.nome}</td>
            <td>${item.numero}</td>
            <td>${item.valor}</td>`;
        tableBody.appendChild(row);
        $i++;
    });
}

$('.m-nav__item a[data-url="/pagamentos/baixa/pagamentos-sucesso?model=1"]').on('click', function(){
    carregaTabela()
});

function carregaTabela(){
    const data = loadFromLocalStorageSuccess();
    setTimeout(function() {
        renderTable(data);
    }, 500);
}
