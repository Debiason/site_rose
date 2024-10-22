$(document).ready(function() {
    $('#modal-principal').on('hidden.bs.modal', function () {
        location.reload();
    });
});