var kanban = new jKanban({
    element          : '#kanban',                                    // selector of the kanban container
    gutter           : '5px',                                       // gutter of the board
    widthBoard       : '310px',                                      // width of the board
    responsivePercentage: false,                                     // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
    dragItems        : true,                                         // if false, all items are not draggable
    boards           : [],                                           // json of boards
    dragBoards       : true,                                         // the boards are draggable, if false only item can be dragged
    addItemButton    : false,                                        // add a button to board for easy item creation
    buttonContent    : '+',                                          // text or html content of the board button
    itemHandleOptions: {
        enabled             : false,                                 // if board item handle is enabled or not
        handleClass         : "item_handle",                         // css class for your custom item handle
        customCssHandler    : "drag_handler",                        // when customHandler is undefined, jKanban will use this property to set main handler class
        customCssIconHandler: "drag_handler_icon",                   // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
        customHandler       : "<span class='item_handle'>+</span> %s"// your entirely customized handler. Use %s to position item title
    },
    click            : function (el) {openNav(el)},                             // callback when any board's item are clicked
    dragEl           : function (el, source) {},                     // callback when any board's item are dragged
    dragendEl        : function (el) {},                             // callback when any board's item stop drag
    dropEl           : function (el, target, source, sibling) {updateItem(el, target, source, sibling);},    // callback when any board's item drop in a board
    dragBoard        : function (el, source) {},                     // callback when any board stop drag
    dragendBoard     : function (el) {},                             // callback when any board stop drag
    buttonClick      : function(el, boardId) {}                      // callback when the board's button is clicked
});

$( document ).ready(function() {
    loadKanban();

    setInterval(function (){refreshKanban()}, 15000); //atualiza kanban a cada 15s
});

function loadKanban() {

    var fldUsuario = $("#fld-usuario-resposta");
    var usuarioId = fldUsuario.val() != 'undefined' ? fldUsuario.val() : '';
    var fldDtenvioresposta = $("#dtenvioresposta");
    var dtenvioresposta = fldDtenvioresposta.val() != 'undefined' ? fldDtenvioresposta.val() : '';

    $.get( "/diligencia/get-kanban-boards?usuarioresposta_id="+usuarioId+"&dtenvioresposta="+dtenvioresposta, function( data ) {
        kanban.addBoards(data.boards)
    });
}

function refreshKanban() {
    console.log('refresh kanban');

    var fldUsuario = $("#fld-usuario-resposta");
    var usuarioId = fldUsuario.val() != 'undefined' ? fldUsuario.val() : '';
    var fldDtenvioresposta = $("#dtenvioresposta");
    var dtenvioresposta = fldDtenvioresposta.val() != 'undefined' ? fldDtenvioresposta.val() : '';

    $.get( "/diligencia/get-kanban-boards?usuarioresposta_id="+usuarioId+"&dtenvioresposta="+dtenvioresposta, function( data ) {
        $.each(data.boards, function(i, board) {
            kanban.removeBoard(board.id);
        });

        kanban.addBoards(data.boards)
    });
}

function openItem(el) {

}

function updateItem(el, target, source, sibling) {
    var id = $(el).data( "uid" );
    var new_board = $(target).parent(".kanban-board");
    var old_board = $(source).parent(".kanban-board");
    var new_board_order = $(new_board).data("order");

    $.ajax({
        url:  "/diligencia/kanban-update-item",
        data: {
            id: id,
            ordem: new_board_order
        },
        type: 'post',
        async: false,
        success: function (resp) {
            toastr.success("Status da Diligência alterado", "Alterado!");
            refreshKanban();
        },
        error: function (e) {
            toastr.error('Não foi possível alterar', 'Erro!');
        }
    });
}

function openNav(el) {
    var id = $(el).data( "uid" );
    $(".sidenav-content").html("");
    $(".sidenav-content").load("/diligencia/kanban-item-detail?id="+id, function () {
        document.getElementById("kanbanSidenav").style.width = "600px";
    });

}

function closeNav() {
    document.getElementById("kanbanSidenav").style.width = "0";
}

/*
window.addEventListener('click', function(e){
    if (document.getElementById('kanbanSidenav').contains(e.target)
        && 1 === 1
        ){
        // Clicked in box
    } else{
        // Clicked outside the box
        closeNav();
    }
});*/
