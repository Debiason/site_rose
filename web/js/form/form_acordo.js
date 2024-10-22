var formSrc = '#form_acordo',
    alertSrc = '#alerts_form_acordo',
    formUrlBase = '/default/acordo',
    formUrlSave = formUrlBase + '/save/format/json',
    formVerificaRegras = true, // indica se e para verificar regras nao bloqueantes antes de submeter o formulario
    
    formValidateRules = {
        id: {
            required: true
        },
        coordenador: {
            required: true
        },
        status: {
            required: true
        },
        rubricaDespesa: {
            required: true
        },
        nome: {
            required: true
        },
        dtInicio: {
            required: true
        },
        dtFim: {
            required: true
        },
        objetivo: {
            required: true
        },
        dtAprovacao: {
            required: true
        },
        numeroOficio: {
            required: true
        },
        tipo: {
            required: true
        },
        ativo: {
            required: true
        },
    },

    handleLocalListeners = function(mainForm)
    {

    };


var
    fldTipoProjeto = $("#tipoProjeto"),
    fldEnderecoExecutora = $("#fld-endereco-executora"),
    divEnderecoExecutora = $("#endereco-executora"),
    divMostrarEnderecoExecutora = $("#instituicao-executora"),
    btnVerEndereco = $("#ver-endereco-executora");

var comboCentroCusto = fldTipoProjeto.val() === 'contrato' ? $("select[name='Contrato[centrocusto_id]']") :
    $("select[name='Convenio[centrocusto_id]']");

$(document).ready(function () {
    instituicaoExecutora();
    enderecoExecutora();
});

comboCentroCusto.change(() => {
    enderecoExecutora();
});

function enderecoExecutora() {

    if (comboCentroCusto.val()) {
        divEnderecoExecutora.show("slow");
    } else {
        divEnderecoExecutora.hide("slow");
    }
}

fldEnderecoExecutora.click(() => {
    instituicaoExecutora();
});

function instituicaoExecutora() {

    if (fldEnderecoExecutora.is(':checked') && comboCentroCusto.val()) {
        divMostrarEnderecoExecutora.show("slow");
    } else {
        divMostrarEnderecoExecutora.hide("slow");
    }
}

btnVerEndereco.click(() => {
    $.ajax({
        url: '/acordo/get-endereco-instituicao-executora',
        data: {
            centroCustoId: comboCentroCusto.val()
        },
        async: false,
        success: function (resp) {
            if (resp)  {
                $("#dadosEndereco").html("" +
                    "<ul>" +
                        "<li className='list-group-item'><strong>Razão Social:</strong> "+resp['razaoSocial']+"</li>" +
                        "<li className='list-group-item'><strong>Descricão:</strong> "+resp['descricao']+"</li>" +
                        "<li className='list-group-item'><strong>Endereço:</strong> "+resp['endereco']+"</li>"+
                        "<li className='list-group-item'><strong>Cidade:</strong> "+resp['cidade']+"</li>"+
                        "<li className='list-group-item'><strong>Estado:</strong> "+resp['estado']+"</li>" +
                    "</ul>")

                $('#enderecoExecutoraModal').modal('show');

            } else {
                $("#dadosEndereco").html("Nenhum endereço localizado");

                $('#enderecoExecutoraModal').modal('hide')
            }
        }
    });
});