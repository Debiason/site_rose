var fldCentroCusto = $("select[name='DocumentoForm[centrocusto_id]']");
var fldProjeto = $("select[name='DocumentoForm[acordo_id]']");
var fldProjetoByCC = $("select[name='DocumentoForm[projeto_id]']");
var fldRubricaAprovada = $("select[name='DocumentoForm[rubricaaprovada_id]']");
var fldRubricaByCC = $("select[name='DocumentoForm[rubrica_id]']");
var fldDtInicio = $("input[name='DocumentoForm[dt_inicio]']");
var fldDtFim= $("input[name='DocumentoForm[dt_fim]']");
var divRubricaByCentroCusto = $("#rubricaAprovadaByCentroCusto");
var divRubricaAprovada = $("#rubricaAprovada");
var divAcordoByCentroCusto = $("#comboAcordoByCentroCusto");
var divAcordo = $("#comboAcordo");
var fldInicioDisp = $("#documentoform-dt_inicio-disp");
var fldFimDisp = $("#documentoform-dt_fim-disp");
const autorizacoesDePagamento = document.getElementById('tipo-documento-Autorizações de pagamento');
const capaComprasServicos = document.getElementById('tipo-documento-Capa de pedido de compras/serviços');
const capaPagamentos = document.getElementById('tipo-documento-Capa de pedido de pagamento');
const capaDiversos = document.getElementById('tipo-documento-Capa de pedido diversos');
const documentosCompra = document.getElementById('tipo-documento-Documentos de compra');
const documentosAcordo = document.getElementById('tipo-documento-Documentos do acordo');
const documentosFiscais = document.getElementById('tipo-documento-Documentos fiscais');
const documentosGerais = document.getElementById('tipo-documento-Documentos gerais');
const protocolosAnexados = document.getElementById('tipo-documento-Protocolos anexados');
const comprovantesPagamento = document.getElementById('tipo-documento-Comprovantes de pagamento');
const mapaCotacoes = document.getElementById('tipo-documento-Mapa de cotações');
const capaAf = document.getElementById('tipo-documento-Capa de AF');
const confirmacaoEntrega = document.getElementById('tipo-documento-Confirmações de entrega');
const checkboxTodos = document.getElementById('tipo-documento-todos');
const botaoLimpar = $("#btn-limpar");

fldCentroCusto.change(function () { // se houver alteração no centrocusto, ele zera o projeto e a rubrica e mostra o botao download.
    fldProjeto.val('').trigger('change').trigger("select2:select");
    if (fldCentroCusto.val().length > 0) {
        $("#btn-download-em-massa").show('slow');
        divAcordo.hide('slow');
        divAcordoByCentroCusto.show('slow');
        divRubricaAprovada.hide('slow');
        divRubricaByCentroCusto.show('slow');
    } else {
        $("#btn-download-em-massa").hide('slow');
        divAcordo.show('slow');
        divAcordoByCentroCusto.hide('slow');
        divRubricaAprovada.show('slow');
        divRubricaByCentroCusto.hide('slow');
    }
});

fldProjeto.change(function () {
    if (fldProjeto.val().length > 0) {
        $("#btn-download-em-massa").show('slow');
    } else {
        $("#btn-download-em-massa").hide('slow');
    }
});

fldProjetoByCC.change(function () {
    fldRubricaByCC.val('');
    if (fldProjetoByCC.val().length > 0) {
        $("#btn-download-em-massa").show('slow');
        divRubricaAprovada.show('slow');
        divRubricaByCentroCusto.hide('slow');
    } else {
        $("#btn-download-em-massa").hide('slow');
        divRubricaAprovada.hide('slow');
        divRubricaByCentroCusto.show('slow');
    }
});

function setCamposLocalStorage() {
    const campos
        = {
        campoCentroCusto: fldCentroCusto.val(),
        tituloCentroCusto: $('#select2-fld-centrocusto-container').attr('title'),
        campoProjetoByCC: fldProjetoByCC.val(),
        campoProjeto: fldProjeto.val(),
        tituloProjeto: $('#select2-fld-projeto-container').attr('title'),
        campoDataInicio: fldDtInicio.val(),
        campoDataFim: fldDtFim.val(),
        campoDataInicioDisp: fldInicioDisp.val(),
        campoDataFimDisp: fldFimDisp.val(),
        campoRubricaAprovada: fldRubricaAprovada.val(),
        campoRubricaByCC: fldRubricaByCC.val(),
        autorizacoesDePagamento: autorizacoesDePagamento.checked,
        capaComprasServicos: capaComprasServicos.checked,
        capaPagamentos: capaPagamentos.checked,
        capaDiversos: capaDiversos.checked,
        documentosCompra: documentosCompra.checked,
        documentosAcordo: documentosAcordo.checked,
        documentosFiscais: documentosFiscais.checked,
        documentosGerais: documentosGerais.checked,
        protocolosAnexados: protocolosAnexados.checked,
        comprovantesPagamento: comprovantesPagamento.checked,
        mapaCotacoes: mapaCotacoes.checked,
        capaAf: capaAf.checked,
        confirmacaoEntrega: confirmacaoEntrega.checked,
        todos: checkboxTodos.checked,
    };
    localStorage.setItem("CamposPreenchidos", JSON.stringify(campos));
}

$("#btn-download-em-massa").click(function (event) {

    setCamposLocalStorage();

    event.preventDefault();

    $.blockUI({
        message: $('#question'),
        css: {
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            color: '#fff',
            'z-index': 99999
        }
    });

    $("#modal-principal").modal('hide');

    var dadosPost = $('#download-em-massa-form').serializeArray();
    $.ajax({
        url: '/documento/download-em-massa',
        data: dadosPost,
        async: false,
        type: 'post',
    }).done(function (resp) {
    }).fail(function () {
        toastr.error('Não foi possível se comunicar com servidor.')
    });
});

$(".form-check-input").click(function () {
    var checks = $(".check-tipo-doc");
    if ($(this).val() == 'Todos' && $(this).is(':checked')) {
        checks.each(function () {
            $(this).prop("checked", true);
        })
    } else if ($(this).val() == 'Todos' && !$(this).is(':checked')) {
        checks.each(function () {
            $(this).prop("checked", false);
        })
    } else if ($(this).val() != 'Todos' && !$(this).is(':checked')) {
        checks.each(function () {
            if ($(this).val() == 'Todos') {
                $(this).prop("checked", false);
            }
        })
    }
});

botaoLimpar.click(function () {
    const campos = [
        fldRubricaByCC,
        fldProjetoByCC,
        fldInicioDisp,
        fldFimDisp,
        fldDtFim,
        fldDtInicio,
        fldRubricaAprovada,
        autorizacoesDePagamento,
        capaComprasServicos,
        capaPagamentos,
        capaDiversos,
        documentosCompra,
        documentosAcordo,
        documentosFiscais,
        documentosGerais,
        protocolosAnexados,
        comprovantesPagamento,
        mapaCotacoes,
        capaAf,
        confirmacaoEntrega,
        checkboxTodos
    ];

    fldProjeto.val('').trigger('change').trigger("select2:select");
    fldCentroCusto.val('').trigger('change').trigger("select2:select");

    campos.forEach(campo => {
        if (campo.type === 'checkbox') {
            campo.checked = false;
        } else {
            campo.val('');
        }
    });

    localStorage.removeItem("CamposPreenchidos");

    $("#btn-download-em-massa").hide("slow"); // esconde o botao caso esteja na tela
});

$(document).ready(function () {
    const campos = JSON.parse(localStorage.getItem('CamposPreenchidos'));
    if (campos) {
        if (campos.campoCentroCusto.length > 0) { // preencher select2
            fldCentroCusto.append(new Option(campos.tituloCentroCusto, campos.campoCentroCusto, true, true)).trigger('change').trigger("select2:select");
            if (campos.campoProjetoByCC.length > 0) {
                setTimeout(function () {
                    fldProjetoByCC.val(campos.campoProjetoByCC).trigger('change');
                }, 1000);
                setTimeout(function () {
                    fldRubricaAprovada.val(campos.campoRubricaAprovada);
                }, 1500);
            } else {
                if (campos.campoRubricaByCC.length > 0){
                    setTimeout(function () {
                        fldRubricaByCC.val(campos.campoRubricaByCC);
                    }, 1000);
                }
            }
        }

        if (campos.campoProjeto) { // preencher select2
            fldProjeto.append(new Option(campos.tituloProjeto, campos.campoProjeto, true, true)).trigger('change').trigger("select2:select");
            setTimeout(function () {
                fldRubricaAprovada.val(campos.campoRubricaAprovada);
            }, 500);
        }

        fldInicioDisp.val(campos.campoDataInicioDisp);
        fldFimDisp.val(campos.campoDataFimDisp);
        fldDtInicio.val(campos.campoDataInicio);
        fldDtFim.val(campos.campoDataFim);
        autorizacoesDePagamento.checked = campos.autorizacoesDePagamento;
        capaComprasServicos.checked = campos.capaComprasServicos;
        capaPagamentos.checked = campos.capaPagamentos;
        capaDiversos.checked = campos.capaDiversos;
        documentosCompra.checked = campos.documentosCompra;
        documentosAcordo.checked = campos.documentosAcordo;
        documentosFiscais.checked = campos.documentosFiscais;
        documentosGerais.checked = campos.documentosGerais;
        protocolosAnexados.checked = campos.protocolosAnexados;
        comprovantesPagamento.checked = campos.comprovantesPagamento;
        mapaCotacoes.checked = campos.mapaCotacoes;
        capaAf.checked = campos.capaAf;
        confirmacaoEntrega.checked = campos.confirmacaoEntrega;
        checkboxTodos.checked = campos.todos;
    }
});