const botoesExpandir = document.querySelectorAll('.kv-expand-icon-cell'); // todos os botoes de expandir da tela
let lsUltimoRegistro = localStorage.getItem("ultimoRegistro"); // busca ultimo registro no local storage
let lsHoraUltimoRegistro = localStorage.getItem("horaUltimoRegistro"); // busca hora que clicou no registro no local storage
let dataAtual = new Date(); // nova data ao carregar a pagina
let horaUltimoRegistro = new Date(lsHoraUltimoRegistro); // transforma string do localstorage para date
let diffEmMinutos = (dataAtual.getTime() - horaUltimoRegistro.getTime()) / (1000 * 60); // calcula a diferença em minutos

if (diffEmMinutos > 20) {
    localStorage.removeItem("ultimoRegistro");
    localStorage.removeItem("horaUltimoRegistro");
} else {
    if (lsUltimoRegistro != null) {
        const botao = document.querySelector(`[data-key="${lsUltimoRegistro}"] .kv-expand-icon-cell`);
        if (botao != null) {
            window.onload = function () {
                botao.click();
            };
        }
    }
}

botoesExpandir.forEach(botaoExpandir => {
    botaoExpandir.addEventListener('click', () => {
        const linha = botaoExpandir.closest('[data-key]');
        let ultimoRegistroAberto = linha.dataset.key;
        localStorage.setItem("ultimoRegistro", ultimoRegistroAberto);
        localStorage.setItem("horaUltimoRegistro", new Date());
    });
});

