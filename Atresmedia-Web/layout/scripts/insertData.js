const pAlta = "planta alta";
const pBaja = "planta baja";
const pSet = "planta set";
const gallery = "gallery";
const a3 = "a3";
const image = "imagen";
const departamentsA3 = "programas-a3/departamentos/nombre"
const programas_a3 = "programas-a3";
const nombre = "nombre";
const folder = "carpetas";

function sendData() {
    /* Get a reference to the database service */
    var database = firebase.database().ref();
    var prog = document.getElementById("Programa").value;
    console.log(prog);
    var planta = document.getElementById("Planta").value;
    var urlI = document.getElementById("url").value;


    var newDepartment = database.child(gallery + "/" + a3 + "/" + prog + "/" + planta).set({

        imagen: {
            nombre: prog,
            url: urlI
        }

    })

    var newDepartment = database.child(programas_a3 + "/" + prog).set({
        carpetas: {},
        nombre: {},
    })

    var aux = planta;
    var updates = {};
    updates[planta] = aux;

    var newDepartment = database.child(programas_a3 + "/" + prog + "/carpetas/").update(updates);

    var aux = prog;
    var updates = {};
    updates[prog] = aux;

    var newDepartment = database.child(programas_a3 + "/" + prog + "/nombre/" + planta + "/").update(updates);


    var aux = prog;
    var updates = {};
    updates[prog] = aux;

    var newDepartment = database.child(programas_a3 + "/departamentos/nombre/").update(updates);

    //var pg = window.open("gallery.html", "_self");
    // pg.name = "0";

}

(function () {
    document.getElementById("but").addEventListener("click", sendData);
}())