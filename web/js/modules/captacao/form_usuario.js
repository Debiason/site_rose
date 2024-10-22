$('#usuario-telefone').on('input', function(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 13) {
        inputValue = inputValue.substring(0, 13);
    }

    if (inputValue.length <= 11) {
        if (inputValue.length === 8) {
            inputValue = inputValue.replace(/^(\d{4})(\d{4})$/, '$1-$2');
        } else {
            inputValue = inputValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
        }
    } else {
        inputValue = inputValue.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4');
    }
    event.target.value = inputValue;
});