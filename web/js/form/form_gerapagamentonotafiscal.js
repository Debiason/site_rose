var btnProx = $("#btn-proximo");
var btnVoltar = $("#btn-voltar");
var btnSalvarHome = $("#salvar-home");
var checkBoxSeguro = $("input[name='RelatorioForm[pagamento_seguro_bolsista]']");

$("#home-tab").click(function () {
    btnVoltar.click();
})

$("#bolsista-tab").click(function () {
    btnProx.click();
});

checkBoxSeguro.click(function () {
    if (checkBoxSeguro.is(':checked')) {
        $(".nav-bolsista").show('slow');
        btnProx.show('slow');
        btnSalvarHome.hide('slow');
        $("#fld-acordo-basico").hide('slow');
        $("#fld-acordo-seguro").show('slow');
        $("label[for='relatorioform-valor']").text('Valor do seguro por bolsista');
        $(".fld-dtreferencia").show('slow');
    } else {
        $(".nav-bolsista").hide('slow');
        btnProx.hide('slow');
        btnSalvarHome.show('slow');
        $("#fld-acordo-seguro").hide('slow');
        $("#fld-acordo-basico").show('slow');
        $("label[for='relatorioform-valor']").text('Valor por projeto');
        $(".fld-dtreferencia").hide('slow');
    }
});

btnVoltar.click(function () {
    $("#home-tab").attr('class', 'nav-link active');
    $("#home-tab").attr('aria-selected', true);
    $("#home").attr('class', 'tab-pane fade active');

    $("#bolsista").attr('class', 'tab-pane fade');
    $("#bolsista-tab").attr('class', 'nav-link');
    $("#bolsista-tab").attr('aria-selected', 'false');
});

btnProx.click(function () {

    var acordo = $('#relatorioform-acordo_id-0').val();
    var acordoSeguro = $('#relatorioform-id-0').val();
    var favorecido = $('#fld-favorecido').val();
    var contaBancaria = $('#fld-contabancaria').val();
    var dtPagamento = $('#relatorioform-dtpagamento').val();
    var valor = $('#relatorioform-valor').val();
    var dtReferencia = $('#relatorioform-dtreferencia').val();

    var erro = [];

    if (checkBoxSeguro.is(':checked')) {
        if(!acordoSeguro)
            erro.push('"Projeto" não pode ficar em branco.');
    } else {
        if(!acordo)
            erro.push('"Projeto" não pode ficar em branco.');
    }

    if(!favorecido)
        erro.push('"Favorecido" não pode ficar em branco.');
    if(!contaBancaria)
        erro.push('"Conta bancária" não pode ficar em branco.');
    if(!dtPagamento)
        erro.push('"Data de pagamento" não pode ficar em branco.');
    if(!valor)
        erro.push('"Valor" não pode ficar em branco.');
    if(!dtReferencia)
        erro.push('"Data de referência" não pode ficar em branco.');

    if(erro.length > 0) {
        for(var i=0;i<erro.length;i++) {
            toastr.error(erro[i]);
        }
    } else {

        $("#home-tab").attr('class', 'nav-link');
        $("#home").attr('class', 'tab-pane fade');

        $("#bolsista-tab").attr('class', 'nav-link active show');
        $("#bolsista-tab").attr('aria-selected', true);
        $("#bolsista").attr('class', 'tab-pane fade active show');

        //Carrega dados dos bolsistas dos projetos selecionados
        var dadosForm = $('#form-ferramenta-nf').serializeArray();

        $.ajax({
            url: '/ferramentas/get-bolsistas-by-acordo',
            data: dadosForm,
            async: false,
            success: function (resp) {
                $("#select-bolsistas").html(resp);
                $("#select-bolsistas").show("slow");
            }
        });

    }

});

/*Faz os calculos dos valores ao marcar os desmarcar um bolsista*/
$(document).on('click', '.checkBox-Bolsista', function (ev) {

    var valorAtual = $('#relatorioform-valor').val();
    var acordo = this.name.split('[');
    acordo = acordo[1].split(']')[0];

    var classInputValorPdd = 'span-valor-projeto-' + acordo;
    var inputValorPorProjeto = document.getElementById(classInputValorPdd);
    var valorPorProjeto = inputValorPorProjeto.value;
    var inputValorTotal = document.getElementsByClassName('span-valor-total')[0];
    var valortotalInicial = inputValorTotal.value;

    if (this.checked) {
        valor = parseFloat(valorPorProjeto) + parseFloat(valorAtual);
        inputValorPorProjeto.value = valor;

        valorTotal = parseFloat(valortotalInicial) + parseFloat(valorAtual);
        inputValorTotal.value = valorTotal;
    } else {
        valor = valorPorProjeto - valorAtual;
        inputValorPorProjeto.value = valor;

        valorTotal = valortotalInicial - valorAtual;
        inputValorTotal.value = valorTotal;
    }
});

/*Faz os calculos dos valores ao marcar os desmarcar um bolsista*/
$(document).on('click', '.checkBox-Bolsista-Compartilhado', function (ev) {

    const valorAtual = $('#relatorioform-valor').val();
    let acordo = this.name.split('[');
    acordo = acordo[1].split(']')[0];

    const classInputValorPddCompartilhado = 'span-valor-projeto-compartilhado-' + acordo;
    const inputValorPorProjetoCompartilhado = document.getElementById(classInputValorPddCompartilhado);
    const valorPorProjetoCompartilhado = inputValorPorProjetoCompartilhado.value;

    const inputValorTotal = document.getElementsByClassName('span-valor-total')[0];
    const valortotalInicial = inputValorTotal.value;

    let valor, valorTotal;
    if (this.checked) {
        valor = parseFloat(valorPorProjetoCompartilhado) + parseFloat(valorAtual);
        inputValorPorProjetoCompartilhado.value = valor;

        valorTotal = parseFloat(valortotalInicial) + parseFloat(valorAtual);
        inputValorTotal.value = valorTotal;
    } else {
        valor = valorPorProjetoCompartilhado - valorAtual;
        inputValorPorProjetoCompartilhado.value = valor;

        valorTotal = valortotalInicial - valorAtual;
        inputValorTotal.value = valorTotal;
    }
});
