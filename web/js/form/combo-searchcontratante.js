//elements
var comboContratante = $("select[id='fld-contratantes']");

//triggers
comboContratante.change(setUrl);

//functions

//Atualiza url do botoao referente ao favorecido, setando o id do favorecido selecionado
function setUrl() {
    contratanteId = comboContratante.val();
    btnEditarContratante = $("a[id='btnEditarContratante']");
    btnEditarContratante.attr('href', '/mudanca-pessoa/create?pessoa_id='+contratanteId);
}