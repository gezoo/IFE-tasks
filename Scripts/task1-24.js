
window.onload = function main() {
    init();
}

var $ = function (id) { return document.getElementById(id); }
var currnetCheckedNode;
var queue = [];

function init() {
    $("super").onclick = function (event) {
        var target = event.target;
        if (target.tagName === "DIV") {
            if (target == currnetCheckedNode) {
                clearClass();
            } else {
                clearClass();
                target.setAttribute("class", "focus");
                currnetCheckedNode = target;
            }
        }
    }

    $("btn-search").onclick = function () {        queue = [];
        preOrder($("super"));
        Search(queue, $("txt-value").value.trim());

    }

    $("btn-add").onclick = function () {
        if (currnetCheckedNode != null) {
            var htmlTemplate = "<div>" + $("txt-value").value.trim() + "</div>";
            currnetCheckedNode.innerHTML += htmlTemplate;
        }
    }
    $("btn-delete").onclick = function () {
        if (currnetCheckedNode != null) {
            var parentNode = currnetCheckedNode.parentElement;
            parentNode.removeChild(currnetCheckedNode);
        }
    }
}

function clearClass() {
    var divTags = $("region").getElementsByTagName("div");
    for (var i = 0; i < divTags.length; i++) {
        divTags[i].setAttribute("class", "");
    }
    currnetCheckedNode = null;
}

function preOrder(node) {
    queue.push(node);
    if (node.children.length != 0) {
        for (var i = 0; i < node.children.length; i++) {
            preOrder(node.children[i]);
        }
    }
}

function Search(nodes, word) {

    var index = 0;
    var timer = setInterval(function () {
        if (index != 0) {
            nodes[index - 1].style.backgroundColor = "white";
        }
        if (index === nodes.length) {
            clearInterval(timer);
            nodes = null;
        } else {
            if (nodes[index].firstChild.nodeValue.trim() === word) {
                nodes[index].style.backgroundColor = "red";
                clearInterval(timer);                
                nodes = null;
            } else {
                nodes[index].style.backgroundColor = "blue";
            }
            index++;
        }
    }, 500);
}