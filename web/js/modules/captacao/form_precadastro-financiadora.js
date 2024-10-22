var btnSubmit = $(".btnCadastroFinanciadora");
var form = btnSubmit.closest('form');

$(document).ready(function () {
    btnSubmit.on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            dataType: 'json',
            data: form.serialize(),
            success: function (response) {
                if (response.data.success) {
                    var newId = response.data.model.id;
                    var newName = response.data.model.nome;
                    var text = newId + ' - ' + newName;

                    var comboFinanciadora = $('#fld-financiadora');
                    comboFinanciadora.append(new Option(text, newId, true, true));
                    comboFinanciadora.val(newId).trigger('change');

                    toastr.success('Financiadora cadastrada com sucesso!');
                    $('#modal-principal').modal('hide');
                } else {
                    toastr.error(response.data.message);

                    var errors = response.data.errors;
                    $.each(errors, function (attribute, messages) {
                        $.each(messages, function (index, message) {
                            toastr.error(message);
                        });
                    });
                }
            },
            error: function (xhr, status, error) {
                toastr.error('Ocorreu um erro: ' + error);
            }
        });
    });
});
