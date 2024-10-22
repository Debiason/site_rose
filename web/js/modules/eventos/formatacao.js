var nome = document.getElementById('nome');
var linkEvento = $("#linkEvento")
var hr = $("#hr")
var textSlug = document.getElementById('slug');

if (textSlug.value == ''){
    linkEvento.hide("slow");
    hr.hide("slow");
}else{
    hr.show("slow");
    linkEvento.show("slow");
    document.getElementById('link').value = 'https://eventos.funarbe.org.br/'+textSlug.value;
    verificaLink(textSlug.value);
}

nome.addEventListener('keyup', function () {
    var slug = (this.value);
    slug = removerAcentos(slug);
    slug = slug.toLowerCase().
    replace(/[^\w\s]/gi, '').
    replace(/\s+/g, '-');
    document.getElementById('slug').value = slug;
    linkEvento.show("slow");
    hr.show("slow");
    document.getElementById('link').value = 'https://eventos.funarbe.org.br/'+slug;
    verificaLink(slug);
});

textSlug.addEventListener('keyup', function () {
    var slug = (this.value);
      slug = slug.toLowerCase();
     document.getElementById('slug').value = slug;
     document.getElementById('link').value = 'https://eventos.funarbe.org.br/'+slug;
    verificaLink(slug);
});

function removerAcentos(slug) {
    slug = slug.toLowerCase();
    slug = slug.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    slug = slug.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    slug = slug.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    slug = slug.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    slug = slug.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    slug = slug.replace(new RegExp('[Ç]','gi'), 'c');
    return slug;
}

function verificaLink($link){
    console.log($link)
    var divVerifica = document.getElementById("verificaUrl");
    $.ajax({
        url: 'verifica-link/',
        data: {
            link: $link,
        },
        async: false,
        success: function(resp) {
             if(resp == true){
                 divVerifica.classList.add('text-success')
                 divVerifica.classList.remove('text-danger')
                 divVerifica.innerHTML = "Link válido";
             }else{
                 divVerifica.classList.add('text-danger')
                 divVerifica.classList.remove('text-success')
                 divVerifica.innerHTML = "O link não é válido!";
             }

        }
    });
}

