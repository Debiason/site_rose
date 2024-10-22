//elements
var comboAcordo = $("select[id='fld-acordo']");


//triggers
comboAcordo.change(getDados);

//functions
function getDados() {

    let acordoId = comboAcordo.val();

    $.ajax({
        url: '/acordo/getsaldotipo/',
        data: {
            id: acordoId
        },
        async: false,
        success: function (resp) {
            let valorFormatado = $.convertFloatToMoeda(resp.saldo);
            let tipo = resp.tipo;
            let redireciona = resp.redireciona;
            let tipoProjeto = tipo === 'Convenio' ? 'convenio' : 'contrato';
            let portal_transferegov = resp.portal_transferegov;

            $("span[id='saldoProjeto']").text(valorFormatado);

            let linkProjeto = $("a[id='urlProjeto']");
            let linkProjetoRubrica = $("a[id='urlProjetoRubrica']");
            let linkProjetoItem = $("a[id='urlProjetoItem']");
            let urlProjeto = "/" + tipoProjeto + "/"+ redireciona +"?id=" + acordoId;

            linkProjeto.attr("href", urlProjeto);
            linkProjeto.attr("target", '_blank');
            linkProjetoRubrica.attr("href", urlProjeto + '#rubrica-aprovada');
            linkProjetoRubrica.attr("target", '_blank');
            linkProjetoItem.attr("href", urlProjeto + '#item-aprovado');
            linkProjetoItem.attr("target", '_blank');

            if (portal_transferegov) {
                document.getElementById("div-portal_transferegov").style.display = "block";
            } else {
                document.getElementById("div-portal_transferegov").style.display = "none";
            }
        }
    });
}

function converteFloatMoeda(num) {
    let x = 0;

    if (num < 0) {
        num = Math.abs(num);
        x = 1;
    }
    if (isNaN(num)) num = "0";
    let cents = Math.floor((num * 100 + 0.5) % 100);

    num = Math.floor((num * 100 + 0.5) / 100).toString();

    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.'
            + num.substring(num.length - (4 * i + 3));
    let ret = num + ',' + cents;
    if (x == 1) ret = ' - ' + ret;

    let valor = "R$ " + ret;

    return valor;
}