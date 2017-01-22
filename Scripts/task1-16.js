/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var $ = function (id) { return document.getElementById(id); }

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = $("aqi-city-input").value.trim();
    var value = $("aqi-value-input").value.trim();

    if (aqiData[city]) {
        alert("列表已存在数据");
        return false;
    }

    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("城市名必须为中英文字符！");
        return false;
    }
    if (!value.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return false;
    }

    aqiData[city] = value;
    return true;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tbody = $("aqi-table-tbody");

    var len = tbody.rows.length;

    tbody.insertRow(len);
    tbody.rows[len].insertCell(0);
    tbody.rows[len].id = "aqi-table-tbody-tr-" + len;
    tbody.rows[len].cells[0].appendChild(document.createTextNode($("aqi-city-input").value));
    tbody.rows[len].insertCell(1);
    tbody.rows[len].cells[1].appendChild(document.createTextNode($("aqi-value-input").value));
    tbody.rows[len].insertCell(2);
    var btnDel = document.createElement("button");
    btnDel.innerText = "删除";
    btnDel.value = len;
    btnDel.name = $("aqi-city-input").value;
    btnDel.onclick = function (evt) { delBtnHandle(evt); }
    tbody.rows[len].cells[2].appendChild(btnDel);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    if (!addAqiData()) return;
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(evt) {
    var deleteItem = evt.currentTarget.name;
    var deleteIndex = evt.currentTarget.value;

    delete aqiData[deleteItem];
    // do sth.
    //renderAqiList();
    $("aqi-table-tbody").removeChild($("aqi-table-tbody-tr-" + deleteIndex));
}


function init() {

    var thead = $("aqi-table").createTHead();
    thead.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
    var tbody = document.createElement("tbody");
    tbody.id = "aqi-table-tbody";
    $("aqi-table").appendChild(tbody);

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("add-btn").onclick = function () {
        addBtnHandle();
    }

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();
