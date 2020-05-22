$(document).ready(function () {
    load_items();
    $(".draggable-left, .draggable-right").sortable({
        connectWith: ".connected-sortable",
        stack: ".connected-sortable ul",
        update: function (ev, ui) {
            if (window.localStorage.getItem("state") == null) {
                window.localStorage.setItem("state", "1");
            }
            if (window.localStorage.getItem("state") == "1") {
                window.localStorage.setItem("from", $(this).attr("id"));
                reorder_lists($(this).attr("id"), $(this).sortable('toArray'));
                window.localStorage.setItem("state", "2");
            } else if (window.localStorage.getItem("state") == "2") {
                window.localStorage.setItem("to", $(this).attr("id"));
                reorder_lists($(this).attr("id"), $(this).sortable('toArray'));
                window.localStorage.setItem("state", "1");
            } else {
                window.localStorage.setItem("state", "1");
            }
            $("#box1_json").text("Box 1 Data : " + window.localStorage.getItem("vals1"));
            $("#box2_json").text("Box 2 Data : " + window.localStorage.getItem("vals2"));
        }
    }).disableSelection();
});

function reorder_lists(box_id, items) {
    if (box_id == "box1_list") {
        var box1_items = {};
        for (var i in items) {
            box1_items[items[i]] = document.getElementById(items[i]).innerHTML;
        }
        window.localStorage.setItem("vals1", JSON.stringify(box1_items));
    } else if (box_id == "box2_list") {
        var box2_items = {};
        for (var i in items) {
            box2_items[items[i]] = document.getElementById(items[i]).innerHTML;
        }
        window.localStorage.setItem("vals2", JSON.stringify(box2_items));
    }
}

function load_items() {
    var box1_default_items = {
        "b1_1": "box 1 item 1",
        "b1_2": "box 1 item 2",
        "b1_3": "box 1 item 3"
    };
    var box2_default_items = {
        "b2_1": "box 2 item 1",
        "b2_2": "box 2 item 2",
        "b2_3": "box 2 item 3"
    };
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (window.localStorage.getItem("vals1") == null) {
            window.localStorage.setItem("vals1", JSON.stringify(box1_default_items));
            window.localStorage.setItem("vals2", JSON.stringify(box2_default_items));
        }
        reload();
    } else {
        // Sorry! No Web Storage support..
        alert("Sorry your browser does not support localStorage may be it disable in in your browser, please check settings...!!!!");
    }
}

function store_new(box_id) {
    if (box_id == "box1_list") {
        var box1_items = JSON.parse(window.localStorage.getItem("vals1"));
        var last_index = Object.keys(box1_items).length + 1
        box1_items["nb1_" + last_index] = "new box 1 item" + last_index;
        $("#box1_list").append("<li id=nb1_" + last_index + ">new box 1 item " + last_index + "</li>");
        window.localStorage.setItem("vals1", JSON.stringify(box1_items));
    } else {
        var box2_items = JSON.parse(window.localStorage.getItem("vals2"));
        var last_index = Object.keys(box2_items).length + 1
        box2_items["nb2_" + last_index] = "new box 2 item" + last_index;
        $("#box2_list").append("<li id=nb2_" + last_index + ">new box 2 item " + last_index + "</li>");
        window.localStorage.setItem("vals2", JSON.stringify(box2_items));

    }

}

function reload() {
    var box1_items = JSON.parse(window.localStorage.getItem("vals1"));
    var box2_items = JSON.parse(window.localStorage.getItem("vals2"));
    for (var item in box1_items) {
        $("#box1_list").append("<li id=" + item + ">" + box1_items[item] + "</li>");
    }
    for (var item in box2_items) {
        $("#box2_list").append("<li id=" + item + ">" + box2_items[item] + "</li>");
    }
    $("#box1_json").text("Box 1 Data : " + window.localStorage.getItem("vals1"));
    $("#box2_json").text("Box 2 Data : " + window.localStorage.getItem("vals2"));
}

function update(from, to, item) {
    if (from != to) {
        var box1_items = JSON.parse(window.localStorage.getItem("vals1"));
        var box2_items = JSON.parse(window.localStorage.getItem("vals2"));
        if (from == "box1_list") {
            box2_items[item] = box1_items[item];
            delete box1_items[item];
        } else {
            box1_items[item] = box2_items[item];
            delete box2_items[item];
        }
        window.localStorage.setItem("vals1", JSON.stringify(box1_items));
        window.localStorage.setItem("vals2", JSON.stringify(box2_items));
    }
}