window.onload = function main() {
    initHandler();
}

var $ = function (id) { return document.getElementById(id); }
var lock = false;
function initHandler() {
    EventUtil.addHandler($("btn-dfd"), "click", function () {
        var dfsQueue = new Queue();
        if (lock === true) return;
        df_traverse(dfsQueue);
        changeColor(dfsQueue.arr, dfsQueue);
    });
    EventUtil.addHandler($("btn-bfd"), "click", function () {
        if (lock === true) return;
        var bfsQueue = new Queue();
        bf_traverse(bfsQueue);
        changeColor(bfsQueue.arr, bfsQueue);
    });
    EventUtil.addHandler($("btn-dfs"), "click", function () {
        if (lock === true) return;
        var dfsQueue = new Queue();
        df_traverse(dfsQueue);
        Search(dfsQueue.arr, $("search").value.trim(), dfsQueue);
    });
    EventUtil.addHandler($("btn-bfs"), "click", function () {
        if (lock === true) return;
        var bfsQueue = new Queue();
        bf_traverse(bfsQueue);
        Search(bfsQueue.arr, $("search").value.trim(), bfsQueue);
    });
}

function df_traverse(dfsQueue) {
    lock = true;
    function dfs(node) {
        dfsQueue.enqueue(node);
        if (node.children.length != 0) {
            for (var i = 0; i < node.children.length; i++) {
                dfs(node.children[i]);
            }
        }
    }
    dfs($("super"));
}

function bf_traverse(bfsQueue) {
    lock = true;
    var index = 0;
    function bfs(node, arr) {
        if (node != null) {
            arr.push(node);
            bfs(node.nextElementSibling, arr);
            node = arr[index++];
            bfs(node.firstElementChild, arr);
        }
    }
    bfs($("super"), bfsQueue.arr);
}

function changeColor(nodes, queue) {

    var index = 0;
    var timer = setInterval(function () {
        if (index != 0) {
            nodes[index - 1].style.backgroundColor = "white";
        }
        if (index === nodes.length) {
            clearInterval(timer);
            lock = false;
            queue.clear();
        } else {
            nodes[index].style.backgroundColor = "blue";
            index++;
        }
    }, 500);
}

function Search(nodes, word, queue) {

    var index = 0;
    var timer = setInterval(function () {
        if (index != 0) {
            nodes[index - 1].style.backgroundColor = "white";
        }
        if (index === nodes.length) {
            clearInterval(timer);
            queue.clear();
            lock = false;
        } else {
            if (nodes[index].firstChild.nodeValue.trim() === word) {
                nodes[index].style.backgroundColor = "red";
                clearInterval(timer);
                lock = false;
                queue.clear();
            } else {
                nodes[index].style.backgroundColor = "blue";
            }
            index++;
        }
    }, 500);
}

function Queue() {
    this.arr = [];
    this.clear = function () {
        this.arr = [];
    }
    this.dequeue = function () {
        this.arr.shift();
    },
    this.enqueue = function (value) {
        this.arr.push(value);
    },
    this.toString = function () {
        return this.arr.toString();
    }
}
