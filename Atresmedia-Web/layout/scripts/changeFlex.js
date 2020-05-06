const elements = "elementos";
const total = "total";

function eliminarFlex() {
    var slider = $('.basicslider').data('flexslider');
    slider.flexAnimate(2); //set the slice of eliminar
}

function actualizarFlex() {
    var slider = $('.basicslider').data('flexslider');
    slider.flexAnimate(1); // set the slice of actualizar
}

function buscarFlex() {
    var slider = $('.basicslider').data('flexslider');
    slider.flexAnimate(0); // set the slice of actualizar
}

function searchElement(buttonName, nextPage) {
    /* Get a reference to the database service */
    var database = firebase.database().ref();

    database.once("value").then(element_arr = function (snapshot) {

        var id = document.getElementById(buttonName).value;
        id = id.toUpperCase();
        var elementArray = snapshot.child(elements).val();
        var maxElem = elementArray.total;
        for (var i = 1; i <= maxElem; i++) {
            var aux = snapshot.child(elements + "/" + i).val()
            var idAux = aux.id;
            if (id == idAux) {
                var newWindow = window.open(nextPage, "_self");
                newWindow.name = aux.path;
                return;
            }
        }
        var pg = window.open("pages/gallery.html", "_self");
        newWindow.name = id;
    });
}

function eliminarElemento() {
    searchElement("eliminarInput", "pages/eliminar.html");
}

function actualizarElemento() {
    searchElement("actualizarInput", "pages/actualizar.html");
}


function buscarElemento() {
    searchElement("buscarInput", "pages/singleIDInfo.html");
}

(function () {
    // Setting the listeners
    document.getElementById("eliminar").addEventListener("click", eliminarFlex);
    document.getElementById("actualizar").addEventListener("click", actualizarFlex);
    document.getElementById("buscar").addEventListener("click", buscarFlex);

    document.getElementById("eliminarB").addEventListener("click", eliminarElemento);
    document.getElementById("actualizarB").addEventListener("click", actualizarElemento);
    document.getElementById("buscarB").addEventListener("click", buscarElemento);

    // Check what slide show
    if (window.name == "0") {
        setTimeout(buscarFlex, 1000);
        window.name = "0";
    } else if (window.name == "1") {
        setTimeout(actualizarFlex, 1000);
        window.name = "0";
    } else if (window.name == "2") {
        setTimeout(eliminarFlex, 1000);
        window.name = "0";
    } else {
        window.name = "0";
    }
}())


