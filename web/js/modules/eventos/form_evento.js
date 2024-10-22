var submeter_obrigadorio = $('#submeter_obrigadorio');
var modalidade_pagamento_unica = $('#modalidade_pagamento_unica');
var devolver = $("#devolver-pedido-justificativa");
var submeter = $('#evento-submeter_arquivo');
devolver.hide();
submeter_obrigadorio.hide();
modalidade_pagamento_unica.hide();
var id = $("#evento-id").val();
// var alert = $("#aviso_coordenador");
// alert.hide();
if($('#disableFields').val() == 1){
    $('#naoMostrarCoordenador').hide();
}
$("#evento-nome").on('change', function() {
    let str = $(this).val()
    const result = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/\"/g, '').replace(/\'/g, '').replace(/,/g, '').toLowerCase()
    $("#evento-url_amigavel").val(result)
})

$("#evento_status_id").on('change', function() {
    if($("#evento_status_id").val() == 17){
        devolver.show('slow');
        $("#evento-devolver_pedido_justificativa").attr('required', true);
    }else{
        devolver.hide('slow');
    }
})

$("button[name='salvar']").click(function () {

    if($("#evento_status_id").val() == 17) {
        var justificativa = $("#evento-devolver_pedido_justificativa").val();
        $.ajax({
            url: '/eventos/evento/get-justificativa/',
            data: {
                justificativa: justificativa,
                id: id
            },
            async: false,
            success: function (resp) {
                console.log(resp)
            }
        });
    }
});

$("select[name='Evento[projeto_id]']").change(function () {
    acordoUfv();
})

$("select[name='Evento[projeto_id]']").ready(function () {
    acordoUfv();
})

function acordoUfv() {
    var avisoCoordenador = document.querySelector('#aviso_coordenador');
    var acordo = $("select[name='Evento[projeto_id]']").val();

    $.ajax({
        url: '/eventos/evento/get-acordo-ufv/',
        data: {
            acordoId: acordo,
        },
        async: false,
        success: function (resp) {
            if(resp == 1){
                avisoCoordenador.classList.remove('d-none');
            }else{
                avisoCoordenador.classList.add('d-none');
            }
        }
    });
}


const checkbox = document.getElementById('evento-submeter_arquivo');
if (checkbox.checked) {
    submeter_obrigadorio.show("slow");
}

const checkboxInscrUnica = document.getElementById('evento-inscricao_unica');
if (checkboxInscrUnica.checked) {
    modalidade_pagamento_unica.hide();
    $("#evento-forma_pagamento_unica").prop("checked", false);
    $("#evento-modalidade_unica").prop("checked", false);
}else{
    modalidade_pagamento_unica.show();
}
$('#evento-inscricao_unica').click(function () {
    if ($(this).is(':checked')) {
        modalidade_pagamento_unica.hide();
        $("#evento-forma_pagamento_unica").prop("checked", false);
        $("#evento-modalidade_unica").prop("checked", false);
    }else{
        modalidade_pagamento_unica.show();
    }
});

submeter.on('click', mostrarSubmeterObrigatório);

function mostrarSubmeterObrigatório(){
    if (submeter.is(':checked')) {
        submeter_obrigadorio.show("slow");
    } else {
        submeter_obrigadorio.hide("slow");
        $("#evento-submeter_obrigadorio").prop("checked", false);
    }
}

$("#evento-forma_pagamento_unica, #evento-modalidade_unica").on('change', verificarCheckBoxes);
function verificarCheckBoxes() {
    var formaPagamentoUnica = $("#evento-forma_pagamento_unica");
    var modalidadeUnica = $("#evento-modalidade_unica");
    var inscricaoUnica = $("#evento-inscricao_unica");

    if (formaPagamentoUnica.is(':checked') && modalidadeUnica.is(':checked')) {
        formaPagamentoUnica.prop('checked', false);
        modalidadeUnica.prop('checked', false);
        inscricaoUnica.prop('checked', true);
        modalidade_pagamento_unica.hide();
    }
}

