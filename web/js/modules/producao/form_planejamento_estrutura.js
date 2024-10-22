document.getElementById('desmarcarCheckbox').onclick = function () {
    FndesmarcarCheckbox()
}

document.getElementById('excluirEstruturas').onclick = function () {

    decisao = confirm('Deseja remover as linhas que não estão marcadas da lista abaixo ?')
    if (decisao) {
        var elms1 = document.querySelectorAll("[id='EXPORTA']");
        for (var i = 0; i < elms1.length; i++)

            if (document.getElementsByName(elms1[i].name)[1].checked === false) {
                $('#table-estrutura').multipleInput('remove', apenasNumeros(elms1[i].name));
            }
    }
}

function apenasNumeros(string) {
    var numsStr = string.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
}

function FndesmarcarCheckbox() {

    var elms = document.querySelectorAll("[id='EXPORTA']");

    for (var i = 0; i < elms.length; i++)
        if (elms[i].checked == true) {

            elms[i].checked = false;
        } else {

            elms[i].checked = true;
        }
}
