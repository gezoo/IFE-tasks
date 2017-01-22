window.onload = function () {
    var tree = document.getElementById("tree-area");
    tree.onclick = function (event) {
        if (event.target.tagName === "SPAN") {
            if (event.target.className === "icon") {
                var className = event.target.parentElement.nextElementSibling.className;

                var classNameTemp = "";
                if (className.match(/close/)) {
                    classNameTemp = className.replace(/close/, "open");
                    event.target.textContent = "-";
                } else if (className.match(/open/)) {
                    classNameTemp = className.replace(/open/, "close");
                    event.target.textContent = "+";
                }
                if (classNameTemp != "") {
                    event.target.parentElement.nextElementSibling.className = classNameTemp;
                }
            }

            if (event.target.className === "add") {

                var value = prompt("请添加子节点值");
                var node = event.target.parentElement.parentElement.nextElementSibling;
                node.innerHTML += "<div>" + value + "<span class='operation'><span class='minus'>-</span></span></div>";
            }
            if (event.target.className === "minus") {

            }
        }
    }

    var btnSearch = document.getElementById("btnSearch");

    btnSearch.onclick = function () {
        var searchValue = document.getElementById("txtSearch").value.trim();
        var parentNode = document.getElementById("tree-area");
        var s = new Search(parentNode, searchValue, function (node) {
            node.style.color = "red";
            var className = node.parentElement.className;

            if (className.match(/close/)) {
                var classNameTemp = className.replace(/close/, "open");
                var icon = node.parentElement.parentElement.getElementsByClassName("icon");
                icon[0].textContent = "-";
                node.parentElement.className = classNameTemp;
            }
        });
        s.init();
    }
}


function Search(parentNode, searchValue, callback) {

    this.preOrder = function (node) {
        if (searchValue === node.textContent) {
            callback(node);
        }
        if (node.children.length != 0) {
            for (var i = 0; i < node.children.length; i++) {
                this.preOrder(node.children[i]);
            }
        }
    }

    this.init = function () {
        this.preOrder(parentNode);
    }
}