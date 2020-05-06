const history = "historial";
const hour = "hora";
const date = "fecha";
const id = "id";
const type = "tipo";
const total = "totalComentarios";

var CommentsPerPage = 3;


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
    }

    /* Add the link */
    li.appendChild(a);
    li.setAttribute("id", id);
    /* Check if it is the current page */
    if (current) {
        li.setAttribute("class", "current");
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
        createLi("« Anterior", ul, false);

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
            createLi("...", ul, false);

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
        if (maxPage - numberPagesIndex > current) {
            /* Set the "..." page */
            createLi("...", ul, false);

            /* Set the indexes from the last page */
            for (var i = 0; i < numberPagesBegin; i++) {
                aux = maxPage - numberPagesBegin + i + 1;
                createLi(aux, ul, false);
            }
        }
        createLi("Siguiente »", ul, false);
    }
}

/**
 *
 * @param {*} htmlComment: the html of the comment we are appending
 * @param comment: the comment to append to the feed
 */
function writeUpdate(htmlComment, comment) {
    /* Add the content of the comment */
    htmlComment += 'El elemento ' + comment.id + ' se actualizó cambiando los valores: ';

    /* Get the number of attributes changed */
    var newElements = $.map(comment.elementosNuevos, function (el) {
        return el
    });
    var oldElements = $.map(comment.elementosAntiguos, function (el) {
        return el
    });

    for (var i = 0; i < newElements.length; i++) {
        htmlComment += oldElements[i] + ' por ' + newElements[i];
        if (i + 1 == newElements.length) {
            htmlComment += '.';
        } else if (i + 1 == newElements.length - 1) {
            htmlComment += ' y '
        } else {
            htmlComment += ', ';
        }
    }
    return htmlComment;
}

/**
 *
 * @param {*} htmlComment: the html of the comment we are appending
 * @param comment: the comment to append to the feed
 */
function writeDelete(htmlComment, comment) {
    /* Add the content of the comment */
    htmlComment += 'El elemento ' + comment.id + ' se eliminó.';
    return htmlComment;
}

/**
 *
 * @param {*} htmlComment: the html of the comment we are appending
 * @param comment: the comment to append to the feed
 */
function writeTrash(htmlComment, comment) {
    /* Add the content of the comment */
    htmlComment += 'El elemento ' + comment.id + ' se recuperó de la papelera de reciclaje.';
    return htmlComment;
}

/**
 * Adds a new comment in the feed
 *
 * @param {*} ulID: id of the ul to append the new comment
 * @param auxID: id to append to the standard id
 * @param comment: the comment to append to the feed
 */
function createComment(ulID, auxID, comment) {
    /* Get the list */
    var ulElement = document.getElementById(ulID);

    /* Set the HTML for the new comment */
    var htmlComment = '<li id="LIHistory' + auxID + '"><article><header>';

    /* Header Information */
    htmlComment += '<h1 class="historyHeader" id="OperationType' + auxID + '">' + comment.tipo;
    htmlComment += '<time class="historyDate" id="time' + auxID + '">' + comment.fecha + '    @     ' + comment.hora + '</time></h1></header>';

    /* Content of the comment */
    htmlComment += '<div id="historyContent' + auxID + '" class="comcont"><p>'
    if (comment.tipo == "Actualización") {
        htmlComment = writeUpdate(htmlComment, comment);
    } else if (comment.tipo == "Borrado") {
        htmlComment = writeDelete(htmlComment, comment);
    } else if (comment.tipo == "Recuperación") {
        htmlComment = writeTrash(htmlComment, comment);
    }
    htmlComment += '</p></div></article></li>';
    ulElement.innerHTML += htmlComment;
}

function loadComments() {
    /* Get a reference to the database service */
    var database = firebase.database().ref();

    database.once("value").then(element_arr = function (snapshot) {
        /* Get all the comments */
        var comments = getArrayFromDB(history, snapshot);

        /* Get the number of comments in the database */
        var numComments = snapshot.child(history + "/" + total).val();

        /* Get the page to display */
        var indexToDisplay = parseInt(window.name);

        /* Calculate the number of indexes */
        var indexNumber = parseInt(numComments / CommentsPerPage) + 1;
        setIndexPage((indexToDisplay + 1), indexNumber);

        for (var i = comments.length; i >= 0; i--) {
            if (typeof comments[i] == "object") {
                createComment("ULHistory", i, comments[i])
            }
        }

    });
}

(function () {
    /* Load the Comments */
    loadComments();
}())