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
const elements = "elementos";
const previous = "« Anterior";
const next = "Siguiente »";
const dots = "...";
const ulFotosID = "fotos";

var imagesPerPage = 29;

var copy = false;


/**
 * Return the String corresponding to the array passed as argument
 *
 * @returns str: String of the array with the format: "element1, element,..."
 */
function printArray(arr) {
    var str = "";
    for (var key in arr) {
        str += arr[key] + " , ";
    }
    return str;
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

    /* Get the names of the departments */
    element_arr = $.map(elements, function (el) {
        return el
    });

    return element_arr;
}

/**
 * Remove the first folder of a given path
 *
 * @param path: the path of the folder
 *
 * @returns the path without the last folder
 */
function removeFirstFolder(path) {
    var limit = 0;
    /* Remove the lasT folder of the path */
    for (var i = 0; i < path.length; i++) {
        /* Check if I found an backslash char */
        if (path.charAt(i) == "/") {
            limit = i + 1;
            break;
        }
    }

    /* create the path without the last folder */
    return path.substring(limit, path.length);
}

/**
 * Jumps to the page of the clicked index
 */
function goToIndex() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (event.target.text == previous) {
        var pg = window.open(page, "_self");
        pg.name = parseInt(window.name) - 1;
    } else if (event.target.text == next) {
        var pg = window.open(page, "_self");
        pg.name = parseInt(window.name) + 1;
    } else if (event.target.text == dots) {
        return;
    } else {
        var pg = window.open(page, "_self");
        pg.name = parseInt(event.target.text) - 1;
    }
}

/**
 * Creates a new li element with the given id and text
 * @param text: the text of the element to be created
 * @param ul: the unsorted list to wich we are going to add the element
 * @param current: true if it is the current page
 */
function createLi(text, ul, current) {
    /* Create the link */
    var a = document.createElement("a");
    /* set the id */
    var id = text + "_indexPage";
    /* create the element to be added */
    var li = document.createElement("li");

    /* Set the text */
    a.textContent = text;
    /* Check if it is a clickable element */
    if (text != "..." && !current) {
        a.setAttribute("href", "#");
        a.setAttribute("onClick", "return false;");
    }

    /* Add the link */
    li.appendChild(a);
    li.setAttribute("id", id);
    /* Check if it is the current page */
    if (current) {
        li.setAttribute("class", "current");
    } else {
        li.addEventListener("click", goToIndex);
    }
    /* add the list */
    ul.appendChild(li);
}

/**
 * Creates the bottom index page
 * @param current: actual page number
 * @param maxPage: the last page number
 */
function setIndexPage(current, maxPage) {
    var ul = document.getElementById("indexPage");
    /* The number of index pages showed before and after the begining/ending */
    var numberPagesBegin = 2;

    /* The number of index pages showed before and after the current page */
    var numberPagesIndex = 2;
    /* Aux for the loop */
    var aux;

    /* Set the previous indexes */
    if (current > 1) { // Check if it has previous or not
        createLi(previous, ul, false);

        /* Set the indexes from the first page */
        for (var i = 0; i < numberPagesBegin; i++) {
            /* Check that it is not the current index */
            if (i + 1 < current) {
                createLi(i + 1, ul, false);
            }
        }
        /* Check not to duplicate indexes */
        if (current - numberPagesBegin > 1) {
            /* Set the "..." page */
            createLi(dots, ul, false);

            /* Set the indexes previous to the current */
            for (var i = 0; i < numberPagesIndex; i++) {
                aux = current - numberPagesIndex + i;
                /* Check that we do not arrive to the page 0 */
                if ((aux > 0) && (aux > numberPagesBegin)) {
                    createLi(aux, ul, false);
                }
            }
        }
    }
    /* Set the current index */
    createLi(current, ul, true);

    /* Set the following indexes */
    if (current < maxPage) {
        /* Set the indexes following to the current */
        for (var i = 0; i < numberPagesIndex; i++) {
            aux = current + (i + 1);
            /* Check that we do not arrive to the page 0 */
            if ((aux <= maxPage) && (aux <= maxPage - numberPagesBegin)) {
                createLi(aux, ul, false);
            }
        }
        /* Check not to duplicate indexes */
        if (maxPage - numberPagesIndex >= current) {
            /* Set the "..." page */
            if (maxPage - numberPagesIndex > current) {
                createLi("...", ul, false);
            }
            /* Set the indexes from the last page */
            for (var i = 0; i < numberPagesBegin; i++) {
                aux = maxPage - numberPagesBegin + i + 1;
                createLi(aux, ul, false);
            }
        }
        if (maxPage - current < numberPagesBegin) {
            for (var i = 0; i < (maxPage - current); i++) {
                aux = current + i + 1;
                if (aux <= maxPage) {
                    createLi(aux, ul, false);
                }
            }
        }
        createLi(next, ul, false);
    }
}

/**
 * Creates the index page
 *
 * @param snapshot: the snapshot of the database
 */
function createIndex(snapshot) {
    /* Number of images in the gallery */
    var aux = snapshot.child(elements).val();
    var numImages = parseInt(aux.totalImagenes);

    /* Calculate the number of indexes */
    imagesPerPage = parseInt(imagesPerPage);
    var indexNumber = parseInt(numImages / imagesPerPage);

    /* Check if we have to add a new index */
    if ((numImages % imagesPerPage) != 0) {
        indexNumber++;
    }

    var indexToDisplay = parseInt(window.name);
    setIndexPage((indexToDisplay + 1), indexNumber);

}

/**
 * A new image is created
 *
 * @param ulID: the id of the list where we will insert the pictures
 * @param snapshot: the snapshot of the database
 * @param departmentAux: the department of the new image
 * @param folderAux: the folder of the new image
 * @param i: the number of the image
 */
function createImage(ulID, snapshot, departmentAux, folderAux, i) {
    /* Attributes */
    var alt = gallery + "/" + a3 + "/" + departmentAux + "/" + folderAux;
    var id = (i + 1);
    var name = gallery + "/" + a3 + "/" + departmentAux + "/" + folderAux;
    var url = snapshot.child(gallery + "/" + a3 + "/" + departmentAux + "/" + folderAux + "/" + image + "/url").val();

    /* Set the name of the link of each image */
    var ImageLinkName = removeFirstFolder(name);
    ImageLinkName = removeFirstFolder(ImageLinkName);
    ImageLinkName = ImageLinkName.replace("/", ", ");

    var img = '<img src="' + url + '" alt="' + alt + '" id="' + id + '" name="' + name + '" title="' + ImageLinkName + '"style="height: 200px; width: 200px;">';
    return img;
}

/**
 * It sets the images of the galery and the index bar
 */
function setImageList() {
    /* Get a reference to the database service */
    var database = firebase.database().ref();

    database.once("value").then(element_arr = function (snapshot) {
        /* Create the index */
        createIndex(snapshot);

        /* Get the unsorted list */
        var ul = document.getElementById("fotos");

        /* Get all the images positions */
        var items = ul.getElementsByTagName("li");

        /* Array of folders */
        var folders_arr = [[]];
        var folderCounter = 0;
        var allFolders = [];

        /* Array of programs */
        var prog_arr = [];

        /* Get all the departments */
        var departments_arr = getArrayFromDB(departamentsA3, snapshot);

        /* Check all the departments for getting all the information*/
        var aux = 0;
        for (var i = 0; i < departments_arr.length; i++) {
            /* Get all the programs in a given department */
            prog_arr = getArrayFromDB(programas_a3 + "/" + departments_arr[i] + "/" + nombre, snapshot);

            /* Get all the folders in a given department */
            folders_arr[i] = getArrayFromDB(programas_a3 + "/" + departments_arr[i] + "/" + folder, snapshot);
            folderCounter += folders_arr[i].length;
            for (var j = 0; j < folders_arr[i].length; j++) {
                allFolders[aux] = folders_arr[i][j];
                aux++;
            }
        }

        var inicio = parseInt(window.name) * imagesPerPage;
        var i = inicio;
        var fin;
        if ((imagesPerPage + inicio) > folderCounter) {
            fin = folderCounter;
        } else {
            fin = (imagesPerPage + inicio);
        }

        var listID = 1;
        /* Go through all the different maps */
        i = 0;
        //for(i; i < fin; i++){ 
        for (var j = 0; j < departments_arr.length; j++) {
            for (var z = 0; z < folders_arr[j].length; z++) {
                /* Get the list */
                var ulElement = document.getElementById(ulFotosID);

                var htmlImage = '<li id = "foto' + listID + '"class="one_quarter';

                if (i % 4 == 0) {
                    htmlImage += ' first';
                }

                htmlImage += '">';
                htmlImage += '<a href="#"  onClick="return false;" id="link' + (i + 1) + '">';

                var img = createImage(ulFotosID, snapshot, departments_arr[j], allFolders[i], i);
                var name = gallery + "/" + a3 + "/" + departments_arr[j] + "/" + allFolders[i];

                /* Set the name of the link of each image */
                var ImageLinkName = removeFirstFolder(name);
                ImageLinkName = removeFirstFolder(ImageLinkName);
                ImageLinkName = ImageLinkName.replace("/", ", ");

                /* Set the new object in the right position */
                htmlImage += img;

                htmlImage += '' + ImageLinkName + '</a></li>';

                ulElement.innerHTML += htmlImage;
                listID++;
                i++;
            }
        }

        //}
        /* Set the image listeners */
        setImageListeners("foto", (fin - inicio));
    });
}

/**
 * Open the window with the information of the image
 */
function ImageInfo() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "trash.html") {
        var pg = window.open("deletedElement.html", "_self");
    } else {
        var pg = window.open("full-width.html", "_self");
        pg.name = event.target.name + "/a/";
    }
}

/**
 * Set the listeners for clicking in the images
 * @param id: 0X
 */
function setImageListeners(id, fin) {
    var ul = document.getElementById("fotos"); // Get the unsorted list
    var items = ul.getElementsByTagName("li"); // Get all the images positions
    for (var i = 0; i < fin; i++) {
        var aux = i + 1;
        var aux1 = document.getElementById(id + aux);
        aux1.addEventListener("click", ImageInfo)
        aux1.param = aux1.name;
    }
}

(function () {
    /* Set the list of images */
    setImageList();

}())