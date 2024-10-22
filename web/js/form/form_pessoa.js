var fldTipoEntidade = $("select[name='PessoaJuridicaNacional[tipoentidadejuridica_id]']");
var comboEmpresaFilial = $('#empresaFilial');
var labelEntidadePai = $('#label-entidade-pai');
var fldPublico = $("input[name='PessoaJuridicaNacional[publico]']");
var fldPublicoClassicacao = $("input[name='PessoaJuridicaNacional[publico_classificacao]']");
var btnPreencherFormulario = $(".btn-preencher-data-nascimento");
var fldCpf = $("#pessoafisicanacional-cpf");

btnPreencherFormulario.click(preencherViaAPI);

$('#pessoa-contabloqueada').click(function() {
    $('#pessoa-justificativa').attr('hidden', false);
    $('#pessoa-justificativa').attr('required', 'required');
    $("label[for='pessoa-justificativa']").html('Justificativa para bloqueio/desbloqueio');
});

fldPublico.change(function () {
    var radioValue = $("input[name='PessoaJuridicaNacional[publico]']:checked").val();
    $.verificaPublicoPrivado(radioValue, fldPublicoClassicacao);
});

fldPublico.ready(function () {
    var radioValue = $("input[name='PessoaJuridicaNacional[publico]']:checked").val();
    $.verificaPublicoPrivado(radioValue, fldPublicoClassicacao);
});

fldTipoEntidade.change(function () {
    //verifica se selecionou o tipo filial, se sim, mostra o combo de empresas
    verificaEntidadePai();
});

$(document).ready(function () {
    //verifica se selecionou o tipo filial, se sim, mostra o combo de empresas
    verificaEntidadePai();
});

function verificaEntidadePai() {

    const tipoEntidade = fldTipoEntidade.val();

    $.ajax({
        url: '/pessoa-juridica-nacional/get-tipo-entidade',
        data: {
        },
        async: false,
        success: function (resp) {
            if (resp[tipoEntidade]['pai_id'] != null) {
                comboEmpresaFilial.show('slow');
                const pai = resp[tipoEntidade]['pai_id'];
                labelEntidadePai.text(resp[pai]['nome']);
            } else {
                comboEmpresaFilial.hide('slow');
            }
        }
    });
}

function preencherViaAPI() {

    fnbPageBlock();

    btnPreencherFormulario.prop('disabled', true)
    setTimeout(function(){
        btnPreencherFormulario.prop('disabled', false);
    }, 10000);

    var cpf = fldCpf.val().replace(/[^\d]+/g,'');
    if(cpf.length != 11){
        toastr.error('CPF não tem 11 dígitos')
        return false
    }

    if(cpf == ''){
        return false;
    }

    $.ajax({
        url: '/pessoa-fisica-nacional/get-dados-api?cpf=' + cpf,
        async: false,
        success: function (resp) {
            if(resp.status == 1){
                $("input[name='PessoaFisicaNacional[nome]']").val(resp.nome);
                $("#pessoafisicanacional-dtnascimento-disp").val(resp.nascimento).trigger('change');
                if(resp.genero == 'F'){
                    $('input[name="PessoaFisicaNacional[genero]"][value="Feminino"]').prop('checked', true);
                }
                if(resp.genero == 'M'){
                    $('input[name="PessoaFisicaNacional[genero]"][value="Masculino"]').prop('checked', true);
                }

                if (window.location.href.indexOf("update") > -1) {
                    $('input[name="PessoaFisicaNacional[nomemae]"]').val(resp.mae);
                }
                toastr.success('Dados inseridos.')

            } else {
                toastr.error('Erro ao buscar dados "' + resp.erro +'"')
            }
            fnbPageUnblock();
            window.location.reload();
        }
    });
}