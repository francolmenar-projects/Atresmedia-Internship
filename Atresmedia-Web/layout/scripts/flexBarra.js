/**
 * Opens the initial page with the delete flex
 */
function eliminarFlex(){
    var pg = window.open("../index.html", "_self");
    pg.name = "2";
}

/**
 * Opens the initial page with the update flex
 */
function actualizarFlex(){
    var pg = window.open("../index.html", "_self");
    pg.name = "1";
}

/**
 * Opens the initial page with the search flex
 */
function buscarFlex(){
    var pg = window.open("../index.html", "_self");
    pg.name = "0";
}

/**
 * Opens the history page with the search flex
 */
function toHistory(){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page == "index.html"){
        var pg = window.open("pages/historial.html", "_self");
        pg.name = "0";
    }
    else{
        var pg = window.open("historial.html", "_self");
        pg.name = "0";
    }
}

/**
 * Opens the history page with the search flex
 */
function toTrash(){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page == "index.html"){
        var pg = window.open("pages/trash.html", "_self");
        pg.name = "0";
    }
    else{
        var pg = window.open("trash.html", "_self");
        pg.name = "0";
    }
}

/**
 * Opens the history page with the search flex
 */
function toGallery(){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page == "index.html"){
        var pg = window.open("pages/gallery.html", "_self");
        pg.name = "0";
    }
    else{
        var pg = window.open("gallery.html", "_self");
        pg.name = "0";
    }
}

/**
 * Opens the New page with the search flex
 */
function toNew(){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page == "index.html"){
        var pg = window.open("pages/nuevo.html", "_self");
        pg.name = "0";
    }
    else{
        var pg = window.open("nuevo.html", "_self");
        pg.name = "0";
    }
}

(function() {
    /* Setting the listeners */
    document.getElementById("eliminar").addEventListener("click", eliminarFlex);
    document.getElementById("actualizar").addEventListener("click", actualizarFlex);
    document.getElementById("buscar").addEventListener("click", buscarFlex);

    document.getElementById("GaleriaTab").addEventListener("click", toGallery);
    var aux = document.getElementById("GaleriaTab2");
    if(aux){
        aux.addEventListener("click", toGallery);
    }

    document.getElementById("PapeleraTab").addEventListener("click", toTrash);
    var aux = document.getElementById("PapeleraTab2");
    if(aux){
        aux.addEventListener("click", toTrash);
    }

    document.getElementById("HistorialTab").addEventListener("click", toHistory);
    var aux = document.getElementById("HistorialTab2");
    if(aux){
        aux.addEventListener("click", toHistory);
    }

    var aux = document.getElementById("NuevoTab");
    if(aux){
        aux.addEventListener("click", toNew);
    }

}())    