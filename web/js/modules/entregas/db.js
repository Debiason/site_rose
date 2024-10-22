const dbName = "EntregaDB";
const dbVersion = 1;
let db;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            const objectStore = db.createObjectStore("entregas", {keyPath: "id", autoIncrement: true});
            objectStore.createIndex("nome", "nome", {unique: false});
            objectStore.createIndex("documento", "documento", {unique: false});
            objectStore.createIndex("email", "email", {unique: false});
            objectStore.createIndex("matricula", "matricula", {unique: false});
            objectStore.createIndex("assinatura", "assinatura", {unique: false});
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = function (event) {
            reject("Erro ao abrir o IndexedDB: " + event.target.errorCode);
        };
    });
}

function saveEntrega(data) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["entregas"], "readwrite");
            const objectStore = transaction.objectStore("entregas");
            const request = objectStore.add(data);

            request.onsuccess = function (event) {
                resolve("Entrega salva com sucesso!");
            };

            request.onerror = function (event) {
                reject("Erro ao salvar entrega no IndexedDB: " + event.target.errorCode);
            };
        });
    });
}

function getAllEntregas() {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["entregas"], "readonly");
            const objectStore = transaction.objectStore("entregas");
            const request = objectStore.getAll();

            request.onsuccess = function (event) {
                resolve(event.target.result);
            };

            request.onerror = function (event) {
                reject("Erro ao buscar entregas no IndexedDB: " + event.target.errorCode);
            };
        });
    });
}

function deleteEntrega(id) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["entregas"], "readwrite");
            const objectStore = transaction.objectStore("entregas");
            const request = objectStore.delete(id);

            request.onsuccess = function (event) {
                resolve("Entrega deletada com sucesso do IndexedDB!");
            };

            request.onerror = function (event) {
                reject("Erro ao deletar entrega do IndexedDB: " + event.target.errorCode);
            };
        });
    });
}

function syncData() {
    if (navigator.onLine) {
        getAllEntregas().then(entregas => {
            if (entregas.length > 0) {
                let promises = entregas.map(data => {
                    return saveEntregaOnline('/entregas/mapa-entrega/sync', data)
                        .then(() => deleteEntrega(data.id))
                        .catch(error => {
                            console.log(error);
                        });
                });

                Promise.all(promises).then(() => {
                    console.log("Todas as entregas foram sincronizadas.");
                    location.reload();
                });
            } else {
                console.log("Nenhuma entrega para sincronizar.");
            }
        }).catch(error => {
            console.log(error);
        });
    } else {
        console.log("Dispositivo offline. Não é possível sincronizar dados.");
    }
}

function saveEntregaOnline(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (response) {
                if (!response.success) {
                    toastr.error(response.msg, 'Erro!');
                    reject(response.msg);
                } else {
                    toastr.success('Entrega salva com sucesso!', 'Sucesso!');
                    resolve();
                }
            },
            error: function () {
                toastr.error('Erro ao salvar entrega.', 'Erro!');
                reject('Erro ao salvar entrega.');
            }
        });
    });
}

window.addEventListener('beforeunload', function (e) {
    if (!navigator.onLine) {
        e.preventDefault();
        e.returnValue = '';
    }
});

document.addEventListener('keydown', function (e) {
    if (!navigator.onLine && (e.key === 'F5' || (e.ctrlKey && e.key === 'r'))) {
        e.preventDefault();
    }
});

window.addEventListener('popstate', function (e) {
    if (!navigator.onLine) {
        history.pushState(null, document.title, location.href);
    }
});

if (!navigator.onLine) {
    history.pushState(null, document.title, location.href);
}

setInterval(syncData, 1000 * 30);

function updateConnectionStatus() {
    var statusBadge = $('#internet-status');
    if (navigator.onLine) {
        statusBadge.text('Online');
        statusBadge.removeClass('bg-danger').addClass('bg-success');
    } else {
        statusBadge.text('Offline');
        statusBadge.removeClass('bg-success').addClass('bg-danger');
    }
}

updateConnectionStatus();
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);