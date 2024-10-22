$('#msg').addClass('d-none')
document.addEventListener('DOMContentLoaded', function () {
    var campoValor = $('#suprimentofundo-valor');
    var valor = parseFloat(campoValor.val());
    var empenho_id = document.getElementById('empenho_id').value;

    $('#suprimentofundo-valor-disp').change(function () {
        var buttonDiv = document.getElementById('button_salvar');
        var button = buttonDiv.querySelector('button');

        var inputField = document.getElementById('suprimentofundo-valor-disp');

        var inputValue = inputField.value.toString().replace(".", "");
        inputValue = parseFloat(inputValue.toString().replace(",", "."));

        if (!isNaN(inputValue) && empenho_id) {
            if (inputValue > valor) {
                button.disabled = true;
                $('#msg').removeClass('d-none')
            } else {
                button.disabled = false;
                $('#msg').addClass('d-none')
            }
        }
    });

    var situacao_atual = document.getElementById('fld-situacao');
    var situacao_id = '';

    if (empenho_id) {
        situacao_id = 'Em análise';
    }

    if (situacao_atual) {
        if (!empenho_id && situacao_atual.value == 49) {
            situacao_id = 'Em Pagamento';
        }
    }

    var dropdown = document.getElementById('fld-situacao');

    if (dropdown) {
        var options = dropdown.options;

        for (var i = 0; i < options.length; i++) {
            if (options[i].text === situacao_id) {
                dropdown.remove(i);
                break;
            }
        }
    }
});

