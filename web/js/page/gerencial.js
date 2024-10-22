var comboAcordo = $("#fld-acordo");
var comboAcordoAux = $("#fld-acordo-aux");
var comboCentro = $("#fld-centro");
var comboDepartamento = $("#fld-departamento");
var comboDepartamentoAux = $("#fld-departamento-aux");
var comboFinanciadora = $("#fld-financiadora");
var dtinicio = $("#gerenacialform-dtinicio");
var dtfim = $("#gerenacialform-dtfim");
var btnTipoPedido = $(".tipoPedidoFiltro");
var btnTipoCompra = $(".tipoCompraFiltro");
var navPedidos = $("#nav-pedidos");
var navCompras = $("#nav-compras");
var navSaldos = $("#nav-saldos");
var navProjetos = $("#nav-projetos");
var navBolsistas = $("#nav-bolsistas");
var divPedidos = $("#div-pedidos-finalizados");
var divCompras = $("#div-compras-finalizadas");
var divSaldos = $("#div-saldos");
var divProjetos = $("#div-projetos");
var divBolsistas = $("#div-bolsistas");

$(document).ready(function () {
    carregaDadosGerenciaisSaldo();
});

navCompras.click(function () {
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (acordoId == null || acordoId == '') {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    divPedidos.hide();
    divSaldos.hide();
    divProjetos.hide();
    divBolsistas.hide();
    divCompras.show();

    criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId);
});

navPedidos.click(function () {
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (acordoId == null || acordoId == '') {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    divPedidos.show();
    divCompras.hide();
    divSaldos.hide();
    divProjetos.hide();
    divBolsistas.hide();

    criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId);
});

navSaldos.click(function () {
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (acordoId == null || acordoId == '') {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    divSaldos.show();
    divCompras.hide();
    divPedidos.hide();
    divProjetos.hide();
    divBolsistas.hide();

    criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId);
});

navProjetos.click(function () {
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (acordoId == null || acordoId == '') {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    divProjetos.show();
    divCompras.hide();
    divPedidos.hide();
    divSaldos.hide();
    divBolsistas.hide();

    criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId);
});

navBolsistas.click(function () {
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let dataFim = dtfim.val();
    let dataInicio = dtinicio.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (acordoId == null || acordoId == '') {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }


    divProjetos.hide();
    divCompras.hide();
    divPedidos.hide();
    divSaldos.hide();
    divBolsistas.show();

    const paramsObject = {
        centro_id: comboCentroId,
        departamento_id: comboDepartamentoId,
        dtinicio: dataInicio,
        dtfim: dataFim,
        acordo_id: acordoId,
        financiadora_id: financiadoraId
    };

    const params = $.param(paramsObject);
    carregaDadosGerenciaisBolsistas(params);
});

let comboCentroValue = comboCentro.val();
let comboDepartamentoValue = comboDepartamento.val();
let comboDepartamentoAuxValue = comboDepartamentoAux.val();
let comboAcordoValue = comboAcordo.val();
let comboAcordoAuxValue = comboAcordoAux.val();
let comboFinanciadoraValue = comboFinanciadora.val();

comboCentro.change(function () {
    let newComboCentroValue = comboCentro.val();

    // Verifica se o valor foi alterado pelo usuário
    if (newComboCentroValue != comboCentroValue) {
        comboCentroValue = newComboCentroValue;

        let comboDepartamentoId = 'undefined';

        comboAcordo.val('').trigger('change');
        comboFinanciadora.val('').trigger('change');
        comboDepartamento.val('').trigger('change');

        $("#div-departamento").hide();
        $("#div-departamento-aux").show();

        criarECarregarDados(newComboCentroValue, comboDepartamentoId);
    }
});

comboDepartamento.change(function () {
    let newComboDepartamentoValue = comboDepartamento.val();

    // Verifica se o valor foi alterado pelo usuário
    if (newComboDepartamentoValue != comboDepartamentoValue) {

        comboDepartamentoValue = newComboDepartamentoValue;
        let comboCentroId = 'undefined';

        $("#div-acordo").hide();
        comboAcordo.val('').trigger('change');
        $("#div-acordo-aux").show();

        if (newComboDepartamentoValue == '') {
            $("#div-acordo").show();
            $("#div-acordo-aux").hide();
            comboAcordoAux.val('').trigger('change');
            comboCentroId = comboCentro.val();
        }

        criarECarregarDados(comboCentroId, newComboDepartamentoValue);
    }
});

comboDepartamentoAux.change(function () {
    let newComboDepartamentoValue = comboDepartamentoAux.val();

    if (newComboDepartamentoValue == '' || newComboDepartamentoValue == null) {
        newComboDepartamentoValue = null;
        $("#div-acordo").show();
        $("#div-acordo-aux").hide();
    }

    if (comboDepartamentoAuxValue == '' || comboDepartamentoAuxValue == null) {
        comboDepartamentoAuxValue = null;
    }

    // Verifica se o valor foi alterado pelo usuário
    if (newComboDepartamentoValue !== comboDepartamentoAuxValue) {
        comboDepartamentoAuxValue = newComboDepartamentoValue;

        let comboCentroId = 'undefined';
        let comboDepartamentoId = comboDepartamentoAux.val();

        $("#div-acordo").hide();
        $("#div-acordo-aux").show();

        if (comboDepartamentoId == '' || comboDepartamentoId == null) {
            comboAcordoAux.val('').trigger('change');
            $("#div-acordo-aux").hide();
            comboAcordo.val('').trigger('change');
            $("#div-acordo").show();
            comboCentroId = comboCentro.val();
        }

        criarECarregarDados(comboCentroId, comboDepartamentoId);
    }
});

dtinicio.change(function () {
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (acordoId == '' || acordoId == null) {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId);
});

dtfim.change(function () {
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (acordoId == '' || acordoId == null) {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId);
});

comboAcordo.change(function () {
    let newComboAcordoValue = comboAcordo.val();

    if (newComboAcordoValue != comboAcordoValue) {
        comboAcordoValue = newComboAcordoValue;

        let comboDepartamentoId = comboDepartamento.val();
        let comboCentroId = comboCentro.val();
        let acordoId = comboAcordo.val();

        $("#div-financiadora").hide();
        $("#div-financiadora-aux").show();

        if (acordoId == '') {
            $("#fld-financiadora").val('').trigger('change');
            $("#div-financiadora").show();
            $("#div-financiadora-aux").hide();
        }

        criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, null);
    }
});

comboAcordoAux.change(function () {
    let newComboAcordoValue = comboAcordoAux.val();

    if (newComboAcordoValue == '' || newComboAcordoValue == null) {
        newComboAcordoValue = null;
    }
    if (comboAcordoAuxValue == '' || comboAcordoAuxValue == null) {
        comboAcordoAuxValue = null;
    }

    if (newComboAcordoValue !== comboAcordoAuxValue) {
        comboAcordoAuxValue = newComboAcordoValue;

        let comboDepartamentoId = comboDepartamentoAux.val();
        let comboCentroId = '';
        let acordoId = comboAcordoAux.val();

        $("#div-financiadora").hide();
        $("#div-financiadora-aux").show();

        if (acordoId == '') {
            $("#fld-financiadora").val('').trigger('change');
            $("#div-financiadora").show();
            $("#div-financiadora-aux").hide();
        }

        if (comboDepartamentoId != '' || comboDepartamentoId != null) {
            comboCentroId = 'undefined';
        }

        if (comboDepartamentoId == null || comboDepartamentoId == '') {
            comboDepartamentoId = comboDepartamento.val();
        }

        criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, null);
    }
});

comboFinanciadora.change(function () {
    let newComboFinanciadoraValue = comboFinanciadora.val();

    if (newComboFinanciadoraValue != comboFinanciadoraValue) {
        comboFinanciadoraValue = newComboFinanciadoraValue;

        let comboDepartamentoId = comboDepartamento.val();
        let comboCentroId = '';
        let acordoId = comboAcordo.val();
        let financiadoraId = comboFinanciadora.val();

        if (acordoId == null || acordoId == '') {
            acordoId = 'undefined';
        }

        if (financiadoraId == null || financiadoraId == '') {
            comboCentroId = comboCentro.val();
        }

        criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId);
    }
});

btnTipoPedido.click(function () {
    let comboTipoPedidoId = this.id;
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let dataFim = dtfim.val();
    let dataInicio = dtinicio.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (acordoId == null || acordoId == '') {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    const paramsObject = {
        centro_id: comboCentroId,
        departamento_id: comboDepartamentoId,
        tipoPedidoId: comboTipoPedidoId,
        dtinicio: dataInicio,
        dtfim: dataFim,
        acordo_id: acordoId,
        financiadora_id: financiadoraId
    };

    const params = $.param(paramsObject);
    carregaDadosGerenciaisPedidos(params);
});

btnTipoCompra.click(function (){
    let comboTipoCompraId = this.id;
    let comboDepartamentoId = comboDepartamento.val() ? comboDepartamento.val() : comboDepartamentoAux.val();
    let comboCentroId = comboCentro.val();
    let dataFim = dtfim.val();
    let dataInicio = dtinicio.val();
    let acordoId = comboAcordo.val() ? comboAcordo.val() : comboAcordoAux.val();
    let financiadoraId = comboFinanciadora.val();

    if (acordoId == null || acordoId == '') {
        acordoId = 'undefined';
    }

    if (comboDepartamentoId == '' || comboDepartamentoId == null) {
        comboDepartamentoId = 'undefined';
    }

    if (comboDepartamentoId != 'undefined') {
        comboCentroId = 'undefined';
    }

    const paramsObject = {
        centro_id: comboCentroId,
        departamento_id: comboDepartamentoId,
        comboTipoCompraId: comboTipoCompraId,
        dtinicio: dataInicio,
        dtfim: dataFim,
        acordo_id: acordoId,
        financiadora_id: financiadoraId
    };

    const params = $.param(paramsObject);
    carregaDadosGerenciaisCompras(params);
});

function carregaDadosGerenciaisPedidos(params) {

    let elementoAtivo = $(".tipoPedidoFiltro.nav-link.active");
    if (elementoAtivo.length > 0) {
        elementoAtivo.removeClass('active');
        $("#11").addClass('active');
    }

    $("#dashboard-compras-centro-departamento").empty();

    setTimeout(function () {
        var divDashboard = document.getElementById('dashboard-pedidos-centro-departamento');
        //atributo do Apex setado ao não carregar o gráfico
        var widgetApexCharts = divDashboard.querySelector('widget-apexcharts');
        if (widgetApexCharts) {
            carregaDadosGerenciaisPedidos(params);
        }
    }, 2000);

    //Pedidos por centro / departamento
    $("#dashboard-pedidos-centro-departamento")
        .html('<div class="text-center" style="padding: 20% 0px"><div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">' +
            '<span class="sr-only">Loading...</span></div></br></br>Carregando...</div>');

    $("#dashboard-pedidos-centro-departamento").load('/gerencial/pedidos-centro-departamento', params);

    $("#gasto-total-pedido").html('<div class="text-center"><div class="spinner-border" role="status">' +
        '<span class="sr-only">Loading...</span></div></div>');
    setTimeout(function () {
        atribuiGastoTotalPedido();
    }, 1000);

    setTimeout(function () {
        document.getElementById("w0").id = "chartPedidos";
    }, 2000);
}

function carregaDadosGerenciaisCompras(params) {

    let elementoAtivo = $(".tipoCompraFiltro.nav-link.active");
    if (elementoAtivo.length > 0) {
        elementoAtivo.removeClass('active');
        $("#88").addClass('active');
    }

    $("#dashboard-pedidos-centro-departamento").empty();

    setTimeout(function () {
        var divDashboard = document.getElementById('dashboard-compras-centro-departamento');
        //atributo do Apex setado ao não carregar o gráfico
        var widgetApexCharts = divDashboard.querySelector('widget-apexcharts');
        if (widgetApexCharts) {
            carregaDadosGerenciaisCompras(params);
        }
    }, 3000);

    $("#dashboard-compras-centro-departamento")
        .html('<div class="text-center" style="padding: 20% 0px"><div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">' +
            '<span class="sr-only">Loading...</span></div></br></br>Carregando...</div>');
    $("#dashboard-compras-centro-departamento").load('/gerencial/compras-centro-departamento', params);

    $("#gasto-total-compra").html('<div class="text-center"><div class="spinner-border" role="status">' +
        '<span class="sr-only">Loading...</span></div></div>');
    setTimeout(function () {
        atribuiGastoTotalCompra();
    }, 1000);

    setTimeout(function () {
        document.getElementById("w0").id = "chartCompras";
    }, 2000);
}

var ajaxRequest = null;

function carregaDadosGerenciaisSaldo(params) {
    //Saldo por centro / departamento
    $("#dashboard-projetos-centro-departamento").empty();
    $("#dashboard-bolsistas-centro-departamento").empty();

    $("#dashboard-saldo-centro-departamento")
        .html("<div class=\"m-loader m-loader--success text-center\" " +
            "style=\"width: 60px; display: inline-block;\"></div>Carregando...");

    $("#dashboard-saldo-centro-departamento").load('/gerencial/saldo-centro-departamento', params);

    setTimeout(function (){
        if (ajaxRequest !== null) {
            ajaxRequest.abort();
        }
        ajaxRequest = $.ajax({
            url: '/gerencial/get-saldo-tipo-rubrica',
            data: {
                params: params
            },
            success: function (data) {
                var saldoData = JSON.parse(data);
                var gastoCapital = saldoData.gastoCapital;
                var gastoCorrente = saldoData.gastoCorrente;

                var options = {
                    series: [gastoCapital, gastoCorrente],
                    chart: {
                        type: 'pie',
                        height: 300,
                        stacked: true,
                        toolbar: {
                            show: true,
                            autoSelected: 'zoom'
                        },
                        defaultLocale: 'en',
                        locales: [{
                            name: 'en',
                            options: {
                                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                                shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                                toolbar: {
                                    download: 'Download SVG',
                                    selection: 'Selection',
                                    selectionZoom: 'Selection Zoom',
                                    zoomIn: 'Zoom In',
                                    zoomOut: 'Zoom Out',
                                    pan: 'Panning',
                                    reset: 'Reset Zoom',
                                }
                            }
                        }]
                    },
                    tooltip: {
                        y: {
                            formatter: function (value) {
                                return value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
                            }
                        }
                    },
                    fill: {
                        opacity: 0.8
                    },
                    stroke: {
                        colors: ['#fff']
                    },
                    legend: {
                        formatter: function (val, opts) {
                            if (opts.seriesIndex === 0) {
                                return "Capital - " + saldoData.gastoCapital.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
                            } else if (opts.seriesIndex === 1) {
                                return "Correntes - " + saldoData.gastoCorrente.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
                            }
                        },
                        verticalAlign: 'bottom',
                        horizontalAlign: 'right'
                    },
                    labels: ['Capital', 'Correntes']
                };

                var chart = new ApexCharts(document.querySelector("#grafico-pizza-rubricas"), options);
                chart.render();
                $("#spinner").hide();
            },
            error: function () {
                console.error("Ocorreu um erro durante o carregamento dos dados.");
            }
        });
    }, 1000);
}

function carregaDadosGerenciaisProjetos(params) {
    $("#dashboard-bolsistas-centro-departamento").empty();
    $("#dashboard-saldos-centro-departamento").empty();

    //Projetos por centro / departamento
    $("#dashboard-projetos-centro-departamento")
        .html("<div class=\"m-loader m-loader--success text-center\" " +
            "style=\"width: 60px; display: inline-block;\"></div>Carregando...");

    setTimeout(function () {
        $("#dashboard-projetos-centro-departamento").load('/gerencial/projetos-centro-departamento', params);
    }, 500);
}

function carregaDadosGerenciaisBolsistas(params) {

    $("#dashboard-projetos-centro-departamento").empty();
    $("#dashboard-saldo-centro-departamento").empty();

    $("#dashboard-bolsistas-centro-departamento")
        .html("<div class=\"m-loader m-loader--success text-center\" " +
            "style=\"width: 60px; display: inline-block;\"></div>Carregando...");

    setTimeout(function () {
        $("#dashboard-bolsistas-centro-departamento").load('/gerencial/bolsistas-centro-departamento', params);
    }, 500);
}

function atribuiGastoTotalPedido(){
    var valor = $("#gasto-total-carregado-pedido").data("valor")

    if (valor == undefined) {
        atribuiGastoTotalPedido()
    }

    var valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    $("#gasto-total-pedido").html(valorFormatado);
}

function atribuiGastoTotalCompra(){
    var valor = $("#gasto-total-carregado-compra").data("valor")

    if (valor == undefined) {
        atribuiGastoTotalCompra()
    }

    var valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    $("#gasto-total-compra").html(valorFormatado);
}

function criarECarregarDados(comboCentroId, comboDepartamentoId, acordoId, financiadoraId) {
    $("#dashboard-saldo-centro-departamento").empty();

    const paramsObject = {
        centro_id: comboCentroId,
        departamento_id: comboDepartamentoId,
        dtinicio: dtinicio.val(),
        dtfim: dtfim.val(),
        acordo_id: acordoId,
        financiadora_id: financiadoraId,
        tipoPedidoId: null,
        comboTipoCompraId: null
    };

    const params = $.param(paramsObject);

    setTimeout(function (){
        if (navProjetos.hasClass('active')) {
            carregaDadosGerenciaisProjetos(params);
        } else if (navSaldos.hasClass('active')) {
            carregaDadosGerenciaisSaldo(params);
        } else if (navBolsistas.hasClass('active')) {
            carregaDadosGerenciaisBolsistas(params);
        } else if (navPedidos.hasClass('active')) {
            carregaDadosGerenciaisPedidos(params);
        } else if (navCompras.hasClass('active')) {
            carregaDadosGerenciaisCompras(params);
        }
    }, 200);
}
