var comboAcordo = $("#extratoform-acordo_id");

$(document).ready(function () {

    comboAcordo.change(function (){
        carregaResumo();
    });
    carregaResumo();

    $('#extratoform-acordo_id').on('select2:select', function (e) {
        carregaResumo();
    });

    function carregaPendencias() {
        $(".dashboard-pendencias-conteudo").html("<div class=\"m-loader m-loader--success text-center\" style=\"width: 60px; display: inline-block;\"></div>Verificando pendências...");
        $(".dashboard-pendencias-conteudo").load('/site/pendencias');
    }

    function carregaResumo() {
        $(".dashboard-resumo-conteudo").html("<div class=\"m-loader m-loader--success text-center\" style=\"width: 60px; display: inline-block;\"></div>Carregando...");
        acordoId = comboAcordo.val();
        $(".dashboard-resumo-conteudo").load('/saldo/resumo?acordo_id=' + acordoId);
    }

    function carregaUltimasAtividades() {
        $(".dashboard-ultimas-atividades").html("<div class=\"m-loader m-loader--success text-center\" style=\"width: 60px; display: inline-block;\"></div>Carregando...");
        $(".dashboard-ultimas-atividades").load('/site/ultimas-atividades');
    }

    carregaPendencias();
    carregaUltimasAtividades();

    $('#m_calendar').fullCalendar({
        locale: 'pt-br',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
            //right: 'month,agendaWeek,agendaDay,listWeek'
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        navLinks: true,
        eventSources: [
            {
                url: '/dashboard/eventos-calendario'
            }
        ],
        eventRender: function(event, element) {
            if (element.hasClass('fc-day-grid-event')) {
                element.data('content', event.description);
                element.data('placement', 'top');
                mApp.initPopover(element);
            } else if (element.hasClass('fc-time-grid-event')) {
                element.find('.fc-title').append('<div class="fc-description">' + event.description + '</div>');
            } else if (element.find('.fc-list-item-title').lenght !== 0) {
                element.find('.fc-list-item-title').append('<div class="fc-description">' + event.description + '</div>');
            }
        }
    });

    $(document).on('click', '.dashboard-pendencias-conteudo .fa-chevron-circle-down', function(event){
        event.preventDefault();
        atalhoParecer();
    });

    $(document).on('click', '.dashboard-pendencias-conteudo .fa-chevron-circle-up', function(event) {
        event.preventDefault();
        var detalhesPendencia = $(".dashboard-detalhes-pendencia");
        detalhesPendencia.hide('slow');
        detalhesPendencia.empty();
    });

    $(document).on('click', '.avaliarInModal', function(event){
        event.preventDefault();
        $.loadInModal($(this).attr('href'), "Avaliar");
        atalhoParecer();
    });

    $(document).on('click', '.btnParecer', function(event){
        event.preventDefault();
        $.loadInModal($(this).attr('href'), "Parecer");
        atalhoParecer();

    });


    $("#modal-principal").on("hide.bs.modal", function () {
        location.reload();
    });
});

function atalhosCompras() {
    var atalhoCompras = $(".dashboard-atalhos-compras");
    atalhoCompras.load("/dashboard/atalhos-compras", function () {
        atalhoCompras.show("slow");
        setTimeout(function () {
            atalhoCompras.hide("slow");
        }, 5000);
    });
}

function atalhoParecer() {
    var detalhesPendencia = $(".dashboard-detalhes-pendencia");
        detalhesPendencia.load("/cotacao-aguardando-parecer/resumoitens", function () {
        detalhesPendencia.show("slow");
    });
}


