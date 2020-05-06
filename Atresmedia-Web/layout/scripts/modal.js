function empty(modal) {
    // Get the modal
    aux_modal = modal.target.myParam;
    aux_modal.style.display = "block";
}

function close(modal) {
    // When the user clicks on <span> (x), close the modal
    aux_modal = modal.target.myParam;
    aux_modal.style.display = "none";
}

function reload(page) {
    var pg = window.open(page.target.myParam, "_self");
}

/**
 * Seting the listener of the buttons to delete or empty the elements
 */
function set_elements(id_action, id_cancelar, id_confirmar, modal, span, page) {
    for (var i = 0; i < id_action.length; i++) {
        document.getElementById(id_action[i]).addEventListener("click", empty);
        document.getElementById(id_action[i]).myParam = modal;
    }

    span.addEventListener("click", close);
    span.myParam = modal;

    document.getElementById(id_cancelar).addEventListener("click", close);
    document.getElementById(id_cancelar).myParam = modal;

    document.getElementById(id_confirmar).addEventListener("click", reload);
    document.getElementById(id_confirmar).myParam = page;

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/**
 * Prepare the variables ids of the trash.html
 */
function trash() {
    var id_modal = "myModal";
    var id_close = "close";
    var id_vaciar = ["vaciarTodo"];
    var id_cancelar = "cancelarVaciado";
    var id_confirmar = "confirmarVaciado";

    var modal = document.getElementById(id_modal);
    var span = document.getElementsByClassName(id_close)[0];
    set_elements(id_vaciar, id_cancelar, id_confirmar, modal, span, "trash.html");
}

/**
 * Prepare the variables ids of the full-width.html
 */
function info() {
    var id_modal = "myModalInfo";
    var id_close = "close";
    var id_eliminado = ["eliminarElementoUpInfo", "eliminarElementoDownInfo"];
    var id_cancelar = "cancelarEliminado";
    var id_confirmar = "confirmarEliminado";

    var modal = document.getElementById(id_modal);
    var span = document.getElementsByClassName(id_close)[0];
    set_elements(id_eliminado, id_cancelar, id_confirmar, modal, span, "gallery.html");
}

/**
 * Prepare the variables ids of the eliminar.html
 */
function eliminar() {
    var id_modal = "myModalDelete";
    var id_close = "close";
    var id_eliminado = ["eliminarElementoUp", "eliminarElementoDown"];
    var id_cancelar = "cancelarEliminado";
    var id_confirmar = "confirmarEliminado";

    var modal = document.getElementById(id_modal);
    var span = document.getElementsByClassName(id_close)[0];
    set_elements(id_eliminado, id_cancelar, id_confirmar, modal, span, "../index.html");
}

/**
 * Prepare the variables ids of the deleted.html
 */
function deleted() {
    var id_modal = "myModalDeleted";
    var id_close = "close";
    var id_eliminado = ["vaciarElementoUpInfo", "vaciarElementoDownInfo"];
    var id_cancelar = "cancelarEliminado";
    var id_confirmar = "confirmarEliminado";

    var modal = document.getElementById(id_modal);
    var span = document.getElementsByClassName(id_close)[0];
    set_elements(id_eliminado, id_cancelar, id_confirmar, modal, span, "trash.html");
}

/**
 * Prepare the variables ids of the singleID.html
 */
function singleID() {
    var id_modal = "myModalID";
    var id_close = "close";
    var id_eliminado = ["eliminarElementoUpID", "eliminarElementoDownID"];
    var id_cancelar = "cancelarEliminado";
    var id_confirmar = "confirmarEliminado";

    var modal = document.getElementById(id_modal);
    var span = document.getElementsByClassName(id_close)[0];
    set_elements(id_eliminado, id_cancelar, id_confirmar, modal, span, "trash.html");
}

(function () {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "trash.html") {
        trash();
    }
    if (page == "full-width.html") {
        info();
    }
    if (page == "eliminar.html") {
        eliminar();
    }
    if (page == "deletedElement.html") {
        deleted();
    }
    if (page == "singleIDInfo.html") {
        singleID();
    }
}())