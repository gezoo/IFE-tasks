var $ = function (selectors) {
    return document.querySelector(selectors);
}
var orderSeq = [];

function swithColor() {
    if (orderSeq.length != 0) {
        var index = 0;
        var timer = setInterval(function () {
            if (index > 0) {
                orderSeq[index - 1].style.backgroundColor = "white";
            }
            if (index === orderSeq.length) {
                clearInterval(timer);
                orderSeq = [];
            } else {
                orderSeq[index].style.backgroundColor = "gray";
                index++;
            }
        }, 500);
    }
}

function preOrder(node) {
    if (!(node == null)) {
        orderSeq.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}

function inOrder(node) {
    if (!(node == null)) {
        inOrder(node.firstElementChild);
        orderSeq.push(node);
        inOrder(node.lastElementChild);
    }
}

function postOrder(node) {
    if (!(node == null)) {
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        orderSeq.push(node);
    }
}

window.onload = function () {
    EventUtil.addHandler(document.body, "click", function (evt) {
        if (evt.target.tagName.toUpperCase() === "INPUT") {
            var root = $(".root");
            switch (evt.target.name) {
                case "preOrder":
                    preOrder(root);
                    swithColor();
                    break;
                case "inOrder":
                    inOrder(root);
                    swithColor();
                    break;
                case "postOrder":
                    postOrder(root);
                    swithColor();
                    break;
            }
        }
    });
};