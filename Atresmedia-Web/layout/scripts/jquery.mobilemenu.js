$('<form action="#"><select /></form>').appendTo("#mainav");
$("<option />", {
    selected: "selected",
    value: "",
    text: "MENU",
    id: ""
}).appendTo("#mainav select");
$("#mainav a").each(function () {
    var e = $(this);
    if ($(e).parents("ul ul ul").length >= 1) {
        $("<option />", {
            value: e.attr("href"),
            text: "- - - " + e.text(),
            id: e.attr("id")
        }).appendTo("#mainav select")
    } else if ($(e).parents("ul ul").length >= 1) {
        $("<option />", {
            value: e.attr("href"),
            text: "- - " + e.text(),
            id: e.attr("id")
        }).appendTo("#mainav select")
    } else if ($(e).parents("ul").length >= 1) {
        $("<option />", {
            value: e.attr("href"),
            text: "" + e.text(),
            id: e.attr("id") + "M"
        }).appendTo("#mainav select")
    } else {
        $("<option />", {
            value: e.attr("href"),
            text: e.text(),
            id: e.attr("id")
        }).appendTo("#mainav select")
    }
});
$("#mainav select").change(function () {
    var id = $(this).children(":selected").attr("id");
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page != "index.html") {
        page = "../index.html";
    }

    if (id == "buscarM") {
        var pg = window.open(page, "_self");
        pg.name = "0";
    } else if (id == "eliminarM") {
        var pg = window.open(page, "_self");
        pg.name = "2";
    } else if (id == "actualizarM") {
        var pg = window.open(page, "_self");
        pg.name = "1";
    } else if ($(this).find("option:selected").val() !== "#") {
        window.location = $(this).find("option:selected").val()
    }
})