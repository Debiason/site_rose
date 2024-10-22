$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    //Receber os dados
    $form = $(this);
    var formdata = new FormData($form[0]);

    //Criar a conexao com o servidor
    var request = new XMLHttpRequest();

    //Progresso
    request.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
            var percent = (e.loaded / e.total) * 50;
            $form.find('.progress-bar').width(percent + '%').html(percent + '%');
        }
    });

    // Conclusão
    request.addEventListener('load', function(e){
        $form.find('.progress-bar').addClass('progress-bar-success').width(100 + '%').html('Completo...');

        var textbox = document.getElementById("barra-progresso");
        textbox.focus();
        textbox.scrollIntoView();
    });

    //Arquivo responsável
    request.open('post', '');
    request.send(formdata);
});