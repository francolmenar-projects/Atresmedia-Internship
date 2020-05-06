function empty() {
    // Get the modal
    var modal = document.getElementById('myModal');

    modal.style.display = "block";
}

function close() {
    var modal = document.getElementById('myModal');

    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
}

function reload() {
    var pg = window.open("trash.html", "_self");
}

(function () {
    var id_modal = "myModal";
    var id_close = "close";
    var id_vaciar = "vaciarTodo";
    var id_cancelar = "cancelarVaciado";
    var id_confirmar = "confirmarVaciado";

    var modal = document.getElementById(id_modal);
    var span = document.getElementsByClassName(id_close)[0];

    document.getElementById(id_vaciar).addEventListener("click", empty);
    span.addEventListener("click", close);
    document.getElementById(id_cancelar).addEventListener("click", close);
    document.getElementById(id_confirmar).addEventListener("click", reload);

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}())