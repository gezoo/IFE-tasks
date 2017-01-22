var $ = function (id) {
    return document.getElementById(id);
};

/*
 * 队列操作类
 */
function Queue(id, className, maxCount) {
    this.id = id;
    this.className = className;
    this.maxCount = maxCount;
    this.arr = [];
    this.leftIn = function (numbers) {
        for (var i = 0; i < numbers.length; i++) {
            if (this.isMaxCount() === true) {
                this.arr.shift();
            }
            this.arr.unshift(numbers[i]);
        }
        this.renderQueue();
    };
    this.rightIn = function (numbers) {
        if (this.contain(numbers)) return;

        if (this.isMaxCount() === true) {
            this.arr.shift();
        }
        this.arr.push(numbers);
        this.renderQueue();
    };
    this.leftOut = function () {
        var value = this.arr.shift();
        this.renderQueue();
        alert(value);
    };
    this.rightOut = function () {
        var value = this.arr.pop();
        this.renderQueue();
        alert(value);
    };
    this.remove = function (index) {
        this.arr.splice(index, 1);
        this.renderQueue();
    };
    this.isEmpty = function () {
        if (this.arr.length === 0) return true;
        return false;
    };
    this.contain = function (value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (value === this.arr[i]) {
                return true;
            }
        }
        return false;
    };
    this.isMaxCount = function () {
        if (this.arr.length === this.maxCount) {
            return true;
        }
        return false;
    };
    this.renderQueue = function () {
        var html = "";
        for (var i = 0; i < this.arr.length; i++) {
            html += "<span class='" + this.className + "' data-item='" + this.arr[i] + "' data-index='" + i + "'>" + this.arr[i] + "</span>";
        }
        $(this.id).innerHTML = html;
    };
}

/*
 * 初始化
 */
function init() {
    var tagQueue = new Queue("tagRegion", "item", 10);
    var textQueue = new Queue("tagRegion1", "item1", 10);
    $("inpuTag").onkeyup = function (evt) {
        //enter,space, 逗号
        if (evt.keyCode === 13 || evt.keyCode === 32 || evt.keyCode === 188) {
            var inputValue = $("inpuTag").value.trim().replace(',', '');
            tagQueue.rightIn(inputValue);
            $("inpuTag").value = "";
            $("inpuTag").focus();
        }
    }
    $("btn-ok").onclick = function () {
        var textArr = $("textarea").value.split(/,|，|、|\s|\n|\r|\t/);
        textQueue.leftIn(textArr);
    }
    util.mouseOver("tagRegion");
    util.mouseOut("tagRegion");
    util.mouseClick("tagRegion", tagQueue);
}

/*
 * 事件绑定工具类
 */
var util = {
    mouseOver: function (id) {
        EventUtil.addHandler($(id), "mouseover", function (event) {
            var currentNode = event.target;
            if (currentNode.tagName.toLocaleLowerCase() == "span") {
                currentNode.textContent = "点击删除" + currentNode.dataset.item;
            }
        });
    },
    mouseOut: function (id) {
        EventUtil.addHandler($(id), "mouseout", function (event) {
            var currentNode = event.target;
            if (currentNode.tagName.toLocaleLowerCase() == "span") {
                currentNode.textContent = currentNode.dataset.item;
            }
        });
    },
    mouseClick: function (id, queue) {
        EventUtil.addHandler($(id), "click", function (event) {
            var index = event.target.dataset.index;
            if (index != null) {
                queue.remove(index);
            }
        });
    }
}

init();
