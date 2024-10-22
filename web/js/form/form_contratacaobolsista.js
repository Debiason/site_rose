var fldpessoaNome = $("#pessoaNome"),
    flddadosBolsista = $("#dadosBolsista"),
    fldpessoaid = $("input[name='ContratacaoBolsista[pessoa_id]']"),
    fldcpf = $("input[name='ContratacaoBolsista[cpf]']");






//triggers
fldcpf.blur(controlComboPessoa);


function controlComboPessoa() {

    var valorcpf = fldcpf.val().replace(/[^0-9]/g,'');
    getNome(valorcpf);

}

function getNome(valorcpf) {
    $.ajax({
        url: '/pessoa/getnome/',
        data: {
            cpf: valorcpf
        },
        async: false,
        success: function (resp) {
            retorno =  "<br>" +"<br>" + "<strong>Nome: </strong>" + (resp.nome == null ? '' : resp.nome);

            fldpessoaNome.html(retorno);

            if (resp.nome == null) {
                fldpessoaNome.hide("slow");
                flddadosBolsista.show("slow");
            }else{
                fldpessoaid.val(resp.id);
                fldpessoaNome.show("slow");
                flddadosBolsista.hide("slow");
            }
        }
    });
}

