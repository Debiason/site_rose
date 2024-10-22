$("#usuario-dtfim-disp").attr('autocomplete', 'off');
$("#usuario-dtinicio-disp").attr('autocomplete', 'off');
$("#usuario-dtfim-disp").on('change', function () {
    $("#usuario-dtinicio-disp").attr('required', 'required');
});

function ajaxGetInteracoes(id) {
    $.ajax({
        url: '/usuario/get-interacoes',
        data: {
            id: id,
            dtinicio: $('#usuario-dtinicio').val(),
            dtfim: $('#usuario-dtfim').val(),
        },
        success: function (data) {
            if ($("#grafico-interacoes-" + id).length > 0) {
                console.log('hre');
                var options = {
                    series: [{
                        name: 'Interações',
                        data: data.dataSeries
                    }],
                    chart: {
                        toolbar: {
                            show: false
                        },
                        type: 'area',
                        stacked: false,
                        height: 250,
                        width: 1000,
                    },
                    dataLabels: {
                        enabled: false
                    },
                    markers: {
                        size: 0
                    },
                    title: {
                        text: 'Movimento de Interações',
                        align: 'left'
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            inverseColors: false,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 90, 100]
                        }
                    },
                    yaxis: {
                        labels: {
                            formatter: function (val) {
                                return val.toFixed(0);
                            }
                        },
                        title: {
                            text: 'Número de Interações'
                        }
                    },
                    xaxis: {
                        type: 'category', // Use 'category' para horas específicas
                        labels: {
                            show: true,
                            formatter: function (value) {
                                return value; // Mostrar a hora como está
                            }
                        }
                    },
                };
                console.log("#grafico-interacoes-" + id);
                var chart = new ApexCharts(document.querySelector("#grafico-interacoes-" + id), options);
                chart.render();
            } else if ($("#chart").length > 0) {
                var dataSeries = data.dataSeries;
                var firstLogin = data.firstLogin;

                var options = {
                    series: [{
                        name: 'Interações',
                        data: dataSeries
                    }],
                    chart: {
                        height: 250,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        enabled: false
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    yaxis: {
                        labels: {
                            formatter: function (val) {
                                return val.toFixed(0);
                            }
                        },
                        title: {
                            text: 'Número de Interações'
                        }
                    },
                    xaxis: {
                        type: 'category',
                    },
                    annotations: {
                        points: Object.keys(firstLogin).map(date => ({
                            x: date,
                            y: 0,
                            marker: {
                                size: 4,
                                fillColor: firstLogin[date] ? '#1FD655' : '#cccccc'
                            },
                            label: {
                                borderColor: firstLogin[date] ? '#1FD655' : '#cccccc',
                                offsetY: 0,
                                style: {
                                    color: '#fff',
                                    background: firstLogin[date] ? '#1FD655' : '#cccccc'
                                },
                                text: firstLogin[date] ? 'Primeiro Login: ' + firstLogin[date] : 'Sem login'
                            }
                        }))
                    }
                };

                var chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();
            }
        }
    })
}

$(document).ready(function () {
    var id = $('#usuario-id').val();
    ajaxGetInteracoes(id);

    $('.kv-expand-icon-cell').on('click', function () {
        var id = $(this).closest('tr').data('key');
        ajaxGetInteracoes(id);
    });
});