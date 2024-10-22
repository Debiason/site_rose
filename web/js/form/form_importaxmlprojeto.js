var flagBbAgil =  $("input[name='ConvenioImportXmlForm[conta_bb_agil]']");
$(flagBbAgil).on('click', function () {
    if ($(this).is(':checked')) {
        $('#div-conta-bb-agil').show("slow");
    } else {
        $('#div-conta-bb-agil').hide("slow");
    }
});