var
    fldvalor = $("input[name='Contato[valor]']"),
    fldTipoContato = $("select[name='Contato[tipocontato_id]']"),
    comboCategoriaContato = $("select[name='Contato[categoriaContato]']");
    campoNome = $("select[name='nome");



//triggers
comboCategoriaContato.change(function () {

    escondeInformacao();

    var categoriaSelecionada = comboCategoriaContato.val();
    $("#contato-valor").val('').trigger('change');
    $("#contato-valor").removeClass('is-invalid');
    $(".btn-success").prop('disabled', false);

    if (categoriaSelecionada == 79) {
        validaDadosTelefone();
    } else if (categoriaSelecionada == 81) {
        $('#contato-valor').off('input');
        validaDadosEmail();
    } else {
        // remover os eventos de validação do campo para evitar que eventos de validação anteriores afetem a categoria atualmente selecionada.
        $('#contato-valor').off('input');
        $('#contato-valor').off('blur');
    }
});
fldTipoContato.change(apareceInformacao);

//functions
function apareceInformacao(){

    valId = fldTipoContato.val();
    console.log('teste')
    $.ajax({
        url: '/tipo-contato/getnome/',
        data: {
            id: valId
        },
        async: false,
        success: function (resp) {


            $(".field-contato-valor label").text(resp);
        }
    });

    fldvalor.show("slow");


}

function escondeInformacao(){

    $(".field-contato-valor label").text(' ');
    fldvalor.hide("slow");

}

function validaDadosTelefone() {
    $('#contato-valor').on('input', function(event) {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');

        if (inputValue.length > 13) {
            inputValue = inputValue.substring(0, 13);
        }

        if (inputValue.length <= 11) {
            if (inputValue.length === 8) {
                inputValue = inputValue.replace(/^(\d{4})(\d{4})$/, '$1-$2');
            } else if (inputValue.length === 9) {
                inputValue = inputValue.replace(/^(\d{5})(\d{4})$/, '$1-$2');
            } else {
                inputValue = inputValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
            }
        } else {
            inputValue = inputValue.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4');
        }
        event.target.value = inputValue;
    });

    $("#contato-valor").on('blur', function(event) {
        let inputValue = $("#contato-valor").val();

        if (inputValue.length < 9 && inputValue.length != 0) {
            $("#contato-valor").addClass('is-invalid');
            $(".btn-success").prop('disabled', true);
        } else {
            $("#contato-valor").removeClass('is-invalid');
            $("#contato-valor").addClass('is-valid');
            $(".btn-success").prop('disabled', false);
        }
    });
}

function validaDadosEmail() {
    $("#contato-valor").on('blur', function (event) {
        let inputValue = $("#contato-valor").val();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (inputValue.length != 0 && !emailRegex.test(inputValue)) {
            $("#contato-valor").addClass('is-invalid');
        } else {
            $("#contato-valor").removeClass('is-invalid');
            $("#contato-valor").addClass('is-valid');
        }
    });
}

$(document).ready(function () {
    if (!fldTipoContato.val().trim()) {
        $(".field-contato-valor label").text(' ');
        fldvalor.hide();
    }else {
        console.log(fldTipoContato.val())
        var valId = fldTipoContato.val();

        $.ajax({
            url: '/tipo-contato/getnome/',
            data: {
                id: valId
            },
            async: false,
            success: function (resp) {
                $(".field-contato-valor label").text(resp);
            }
        });

        fldvalor.show("slow");
    }
});
