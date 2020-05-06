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

var numComments = 0;

const infoReference = ["DepartamentoInfo", "ProgramaInfo", "PlantaInfo", "UsuarioInfo",
    "TelefonoInfo", "NombreInfo", "IPInfo", "PatrimonioInfo", "ModeloInfo", "NCInfo",
    "MCInfo", "INInfo", "MicroInfo", "ObservacionesInfo", "PuestoInfo", "DB_IDInfo"];

const infoReferenceDB = ["NULL", "NULL", "NULL", "usuario", "telefono", "nombre",
    "ip", "patrimonio", "modelo", "nc", "mc", "in", "micro", "observaciones", "puesto", "DB_ID"]

const cellsID = ["ProgramaInfo", "PuestoInfo", "NombreInfo", "IPInfo", "ModeloInfo"];

var previousValues = [];


function eliminarFlex() {
    var pg = window.open("../index.html", "_self");
    pg.name = "2";
}

function actualizarFlex() {
    var pg = window.open("../index.html", "_self");
    pg.name = "1";
    ;
}

function buscarFlex() {
    var pg = window.open("../index.html", "_self");
    pg.name = "0";
}

/**
 * Writes into the database history the changed values
 *
 * @param {*} changedValues: data with the changed values
 */
function writeHistory(changedValues, elementName) {
    var auxID = parseInt(numComments) + 1;
    var newComment = '{"' + auxID + '" : ';

    /* Store the old values */
    newComment += '{"elementosAntiguos" : {';
    for (var i = 0; i < changedValues.length; i++) {
        newComment += '"' + changedValues[i][2] + '": "' + changedValues[i][0] + '"';
        if (i + 1 == changedValues.length) {
            newComment += '}';
        } else {
            newComment += ',';
        }
    }

    /* Store the new values */
    newComment += ',"elementosNuevos" : {';
    for (var i = 0; i < changedValues.length; i++) {
        newComment += '"' + changedValues[i][2] + '": "' + changedValues[i][1] + '"';
        if (i + 1 == changedValues.length) {
            newComment += '}';
        } else {
            newComment += ',';
        }
    }
    var d = new Date();

    newComment += ',"fecha" : "' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '",';
    newComment += '"hora" : "' + d.getHours() + ':' + d.getMinutes() + '",';
    newComment += '"id" : "' + elementName + '",';

    /* Store the type of action */
    newComment += '"tipo" : "Actualización"';


    newComment += '}}';
    /* Save the new comment */
    newComment = JSON.parse(newComment);
    firebase.database().ref('historial/').update(newComment);

    /* Update the comment counter */
    var counter = '{"totalComentarios" : "' + auxID + '"}';
    counter = JSON.parse(counter);
    firebase.database().ref('historial/').update(counter);
}

function enviarDatos() {
    /* The data to be updated */
    var newData = readTableData(null);

    /* Json containing the data to be updated */
    var updateData = {};
    var updates = {};

    /* The changed values, old and new */
    var changedValues = [[]];
    var auxChanged = 0;

    /* Check what values have changed */
    for (var i = 0; i < previousValues.length; i++) {
        /* If it is equal to null means that there is no direct representation of it in the database */
        if (infoReferenceDB[i] != "NULL") {
            /* Check if the entry is defined in the actual table */
            if (newData[i] == previousValues[i] || typeof newData[i] == "undefined") {
                /* Get the same data as in the database */
                updateData[infoReferenceDB[i]] = previousValues[i];
            }
            /* The data has been changed */
            else {
                updateData[infoReferenceDB[i]] = newData[i];

                /* Store the info in the changedValues matrix */
                changedValues[auxChanged][0] = previousValues[i];
                changedValues[auxChanged][1] = newData[i];
                changedValues[auxChanged][2] = infoReferenceDB[i];
                auxChanged++;
            }
        }
    }
    /* create the updated JSON file */
    updates[window.name] = updateData;

    /* write the comment into the history */
    writeHistory(changedValues, previousValues[5]);
    firebase.database().ref().update(updates);
    var pg = window.open("singleIDInfo.html", "_self");
}

function toUpdate(event) {
    var pg = window.open("actualizar.html", "_self");
    pg.name = event.target.id;
}

function goToAdd(event) {
    var pg = window.open("add.html", "_self");
    pg.name = window.name;
}

function toUpdateName() {
    var pg = window.open("actualizar.html", "_self");
    pg.name = window.name;
}

function toDelete() {
    var pg = window.open("eliminar.html", "_self");
}

function toSingleID() {
    var pg = window.open("singleIDInfo.html", "_self");
    pg.name = event.target.id;
}

function toHome() {
    var pg = window.open("../index.html", "_self");
    pg.id = "Joder";
}

function toTrash() {
    var pg = window.open("trash.html", "_self");
}

function toGallery() {
    var pg = window.open("gallery.html", "_self");
}

function toFullWidth() {
    var pg = window.open("full-width.html", "_self");
    pg.name = event.target.id;
}

/**
 * Gets the array of elements stored in the path given of the database
 * @param path: the path to look into the DB
 * @param snapshot: the snapshot of the database
 *
 * @returns the array of elements stored in the DB
 */
function getArrayFromDB(path, snapshot) {
    var element_arr = [];
    var elements = snapshot.child(path).val();
    element_arr = $.map(elements, function (el) {
        return el
    }); // Get the names of the departmets
    return element_arr;
}

/**
 * Returns the last folder of a given path
 *
 * @param {*} path : the path of the folder we want to get
 */
function getLastFolder(path) {
    var limit = 0;
    /* remove the las two folders path */
    for (var i = path.length; i > 0; i--) {
        if (path.charAt(i - 1) == "/") {
            limit = i;
            break;
        }
    }
    /* create the real path */
    return path.substring(limit, path.length);
}

/**
 * Remove the last folder of a given path
 *
 * @param path: the path of the folder
 */
function removeLastFolder(path) {
    var limit = 0;

    /* remove the las two folders path */
    for (var i = path.length; i > 0; i--) {
        if (path.charAt(i - 1) == "/") {
            limit = i;
            break;
        }
    }

    /* create the real path */
    return path.substring(0, limit - 1);
}

/**
 * Load one cell of data into the table
 *
 * @param path: the path of the information in the firebase database
 * @param page: actual HTML page
 * @param snapshot: a snapshot of the database
 * @param column: the column of the given cell
 * @param rowNum: the row of the given cell
 *
 */
function loadSingleData(path, page, snapshot, column, rowNum) {
    var element = snapshot.child(path).val();

    /* Get the cell in the table */
    var info = document.getElementById(infoReference[column] + rowNum);
    if (!info) {
        return;
    }
    switch (column) {
        case 0: // Departamento
            path = removeLastFolder(path);
            path = removeLastFolder(path);
            path = removeLastFolder(path);
            path = getLastFolder(path);
            info.textContent = path;
            break;
        case 1: // Programa
            path = removeLastFolder(path);
            path = getLastFolder(path);
            info.textContent = path.toUpperCase();
            break;
        case 2: // Planta
            path = removeLastFolder(path);
            path = removeLastFolder(path);
            var nextPath = path + "/a/";
            path = getLastFolder(path);
            /* Set the link to see the data of a single floor */
            if (page == "actualizar.html" || page == "singleIDInfo.html") {
                info.innerHTML += '<a id="' + nextPath + '" href="#">' + path + '</a>';
                document.getElementById(nextPath).addEventListener("click", toFullWidth);
            } else {
                info.textContent = path;
            }
            break;
        case 3: // Usuario
            info.textContent = element.usuario;
            break;
        case 4: // Tlf
            info.textContent = element.telefono;
            break;
        case 5: // Nombre
            /* Set the link to see the data of a single element */
            if (page == "full-width.html") {
                info.innerHTML += '<a id="' + path + '" href="#">' + element.nombre + '</a>';
                document.getElementById(path).addEventListener("click", toSingleID);
            } else {
                info.textContent = element.nombre;
            }
            break;
        case 6: // IP
            info.textContent = element.ip;
            break;
        case 7: // Patrimonio
            info.textContent = element.patrimonio;
            break;
        case 8: // Modelo
            info.textContent = element.modelo;
            break;
        case 9: // NC
            info.textContent = element.nc;
            break;
        case 10: // MC
            info.textContent = element.mc;
            break;
        case 11: // IN
            info.textContent = element.in;
            break;
        case 12: // Micro
            info.textContent = element.micro;
            break;
        case 13: // Observaciones
            info.textContent = element.observaciones;
            break;
        case 14: // Puesto
            info.textContent = element.puesto;
            break;
    }
}

/**
 * Creates a new row with the given number of cells
 *
 * @param tableID: the id of the table to add the new row
 * @param cellsNumber: the number of cells of the new row
 * @param offset: the number which will be added to the standard id name of the cells
 * @param idArr: array with the standard ID for all the cells
 *
 */
function createNewRow(tableID, cellsNumber, offset, idArr) {
    var table = document.getElementById(tableID);

    var row = table.insertRow(table.length);
    for (var i = 0; i < cellsNumber; i++) {
        var cell = row.insertCell(i);
        cell.setAttribute("id", idArr[i] + offset);
    }
}

/**
 * Adds to the header the area name and the floor
 *
 * @param headerID: the id of the header we are adding the new text
 * @param path: the path with the department and the program
 *
 * @returns an array with the floor and the department
 */
function setInfoHeader(headerID, path) {
    /* change the text of the information header */
    var header = document.getElementById(headerID);
    var auxPath = removeLastFolder(path);

    /* Planta */
    auxPath = removeLastFolder(auxPath);
    var planta = getLastFolder(auxPath);

    /* Departamento */
    auxPath = removeLastFolder(auxPath);
    var departamento = getLastFolder(auxPath);

    /* Set the header text */
    header.innerHTML += ":<i><b> " + departamento + ", " + planta + "</i></b>";
    return [planta, departamento];
}

/**
 * Loads all the data of the map associated to the given path
 *
 * @param path: the path of the map clicked
 * @param page: actual HTML page
 * @param snapshot: the snapshot of the database
 */
function loadData(path, page, snapshot) {
    /* change the text of the information header */
    var arr = setInfoHeader("InfoHeader", path); // [0] floor, [1] department

    /* Get the correct path name */
    path = removeLastFolder(path);
    path = removeLastFolder(path);

    /* Get the programs */
    var arrProg = getArrayFromDB(programas_a3 + "/" + arr[1] + "/" + nombre + "/" + arr[0], snapshot);
    var actualStart = 0;
    /* Show the info of all the programs */
    for (var i = 0; i < arrProg.length; i++) {
        var programPath = gallery + "/" + a3 + "/" + arr[1] + "/" + arr[0] + "/" + arrProg[i];
        var devicesInProgram = getArrayFromDB(programPath, snapshot);
        /* Check all the devices in a program */
        for (var j = 0; j < devicesInProgram.length; j++) {
            var finalPath = programPath + "/" + devicesInProgram[j].DB_ID;
            var aux = actualStart + j + 1;
            /* Create the new row */
            createNewRow("infoTable", 5, aux, cellsID);

            /* Go through all the fields */
            for (var z = 0; z < infoReference.length; z++) {
                loadSingleData(finalPath, page, snapshot, z, aux);
            }
        }
        /* update the index */
        actualStart += devicesInProgram.length;
    }
}

/**
 * Reads and stores the data of the table
 * @param snapshot: image of the actual database
 *
 * @returns the data of the table in the form of an array
 */
function readTableData(snapshot) {
    var arr = [];
    /* Check all the possible cells */
    for (var i = 0; i < infoReference.length; i++) {
        /* Get the cell */
        var cell = document.getElementById(infoReference [i] + "0");
        /* Check if the cell exists */
        if (cell) {
            /* Store the values */
            arr[i] = cell.textContent;
        }
        /* The cell does not exists so we have to access the database */
        else if (snapshot) {
            arr[i] = snapshot.child(window.name + "/" + infoReferenceDB[i]).val();
        }
    }
    return arr;
}

/**
 * Sets the image displayed and load the table data if needed
 */
function setImage() {
    /* Get a reference to the database service */
    var database = firebase.database().ref();

    database.once("value").then(element_arr = function (snapshot) {
        /* Set global variable */
        numComments = snapshot.child('historial/totalComentarios').val();

        /* map clicked previously*/
        var path = window.name;

        /* To know if we display all the information of the map or only one specified */
        var pathAux = window.location.pathname;
        var page = pathAux.split("/").pop();

        /* Display only one data */
        if (page == "singleIDInfo.html" || page == "actualizar.html" || page == "eliminar.html") {
            for (var i = 0; i < infoReference.length; i++) {
                loadSingleData(path, page, snapshot, i, 0);
            }
            /* If we are going to update the information, we save the previous values */
            if (page == "actualizar.html") {
                previousValues = readTableData(snapshot);
            }
        }
        /* Display all the data of the given map */
        else if (page == "full-width.html") {
            loadData(path, page, snapshot);
        }

        /* create the real path */
        path = removeLastFolder(path);
        path = removeLastFolder(path);
        var element = snapshot.child(path + "/" + image).val();
        var elementURL = element.url;

        /* Get the image element */
        var ul = document.getElementById("plano");
        ul.setAttribute("src", elementURL);
    });
}

/**
 * Add the listeners for the update buttons
 *
 * @param {*} listUpdate : ID array of the buttons
 * @param {*} listUpdateInfo : ID array of the buttons
 */
function addListenerBut(listUpdate, listUpdateInfo, goToAddEl) {
    /* Send the update data */
    for (var i = 0; i < listUpdate.length; i++) {
        var but = document.getElementById(listUpdate[i]);
        /* Check if the button exists */
        if (but) {
            but.addEventListener("click", enviarDatos);
        }
    }

    /* Go to the update page */
    for (var i = 0; i < listUpdateInfo.length; i++) {
        var but = document.getElementById(listUpdateInfo[i]);

        /* Check if the button exists */
        if (but) {
            but.addEventListener("click", toUpdateName);
        }
    }

    /* Go to the add page */
    for (var i = 0; i < goToAddEl.length; i++) {
        var but = document.getElementById(goToAddEl[i]);

        /* Check if the button exists */
        if (but) {
            but.addEventListener("click", goToAdd);
        }
    }
}

/**
 * Add the listeners for the restore buttons
 *
 * @param {*} restoreElement : ID array of the buttons
 */
function addListenerDeleted(restoreElement) {
    /* Restore done, going to gallery */
    for (var i = 0; i < restoreElement.length; i++) {
        var but = document.getElementById(restoreElement[i]);
        º
        /* Check if the button exists */
        if (but) {
            but.addEventListener("click", toGallery);
        }
    }
}

(function () {
    /* Setting the listeners */
    document.getElementById("eliminar").addEventListener("click", eliminarFlex);
    document.getElementById("actualizar").addEventListener("click", actualizarFlex);
    document.getElementById("buscar").addEventListener("click", buscarFlex);

    /* Definning the ID of the buttons with listeners */
    var updateInfo = ["actualizarElementoUp", "actualizarElementoDown"];
    var goToUpdate = ["actualizarElementoUpInfo", "actualizarElementoDownInfo"];
    var restoreElement = ["restaurarElementoUpInfo", "restaurarElementoDownInfo"];
    var goToAddEl = ["addElementoDownInfo", "addElementoUpInfo"];

    /* Add the listeners to the buttons */
    addListenerBut(updateInfo, goToUpdate, goToAddEl);
    addListenerDeleted(restoreElement);

    /* Load the image and the data associated to it */
    setImage();
}())