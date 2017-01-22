var $ = function (selector) { return document.querySelector(selector); }

window.onload = function () {
    main();
};

/**
 * 入口
 */
function main() {
    initHandler();
}

/**
 * 初始化事件
 */
function initHandler() {
    $("#tree-area").onclick = function (event) {
        var currentNode = event.target;
        if (currentNode.className === "icon") {
            currentNode.textContent = currentNode.textContent == "+" ? "-" : "+";
            changeClass(currentNode.parentElement.nextElementSibling);
        }
        if (currentNode.className === "add") {
            var newNodeValue = prompt("添加节点");
            var addParentNode = currentNode.parentElement.nextElementSibling;
            addNode(addParentNode, newNodeValue);
        }
        if (currentNode.className === "delete") {
            var node = currentNode.parentElement.parentElement;
            deleteNode(node.parentElement, node);
        }
    }

    $("#btnSearch").onclick = function () {
        var searchValue = $("#txtSearch").value.trim();
        var parentNode = $("#tree-area");
        //var s = new Search(searchValue, changeColor);
        //s.preOrder(parentNode);
        search(parentNode, searchValue, changeColor);
    }

    $("#btnClear").onclick = function () {
        window.location.reload();
    }
}

/**
 * 更改css类
 * param{any} node 节点
 */
function changeClass(node) {
    if (node != undefined) {
        node.className = node.className.match(/closeSubtree/) ? "showSubtree" : "closeSubtree";
    }
}

function changeColor(node) {
    node.style.color = "red";
    if (node.parentElement.className === "file") {
        changeClass(node.parentElement.parentElement);
    }
}

function addNode(parentNode, value) {
    var newHtml = "<li class='file'><div class='title'>" + value + "<span class='delete'>x</span></div></li>";
    parentNode.innerHTML += newHtml;
}

function deleteNode(parentNode, removeNode) {
    parentNode.removeChild(removeNode);
}

//function Search(searchValue, callback) {
//    this.preOrder = function (node) {
//        if (searchValue === node.textContent) {
//            callback(node);
//        }
//        if (node.children.length != 0) {
//            for (var i = 0; i < node.children.length; i++) {
//                this.preOrder(node.children[i]);
//            }
//        }
//    }

//    //this.init = function () {
//    //    this.preOrder(parentNode);
//    //}
//}

function search(parentNode, searchValue, callback) {
    function preOrder(node) {
        if (searchValue === node.textContent) {
            callback(node);
        }
        if (node.children.length != 0) {
            for (var i = 0; i < node.children.length; i++) {
                preOrder(node.children[i]);
            }
        }
    }

    preOrder(parentNode);
}
