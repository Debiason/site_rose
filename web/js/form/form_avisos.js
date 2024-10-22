var comboAcordo = $("select[id='fld-acordo']"),
    spanVigencia = $("span[id='vigenciaAcordo']");

//triggers
comboAcordo.change(atualizaAvisoVigenciaAcordo);

//functions
function atualizaAvisoVigenciaAcordo() {

    var acordoId = comboAcordo.val();

    $.ajax({
        url: '/acordo/getdtvigencia/',
        data: {
            acordoId: acordoId
        },
        async: false,
        success: function (resp) {

            var vigencia = resp['data'];
            var msgVigencia = 'A data de vigência do projeto é ' + vigencia + '.';
            var aviso = msgVigencia;

            const msgNovoModelo = 'Este projeto está no novo modelo da UFV.';
            if (resp['novo_modelo_ufv']) {
                aviso = aviso +"<br/>"+ msgNovoModelo;
            }

            spanVigencia.html(aviso);
        }
    });
}
