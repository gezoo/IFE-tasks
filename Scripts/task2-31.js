/**
 * Created by GEZOX on 2017/1/19.
 */

let city = {
    "beijing": {name: "北京", school: ["北京大学", "清华大学", "中央美术学院", "北京电邮大学"]},
    "shanghai": {name: "上海", school: ["上海交通大学", "复旦大学"]},
    "guangzhou": {name: "广州", school: ["中山大学", "华南理工大学", "暨南大学"]},
    "shenzhen": {name: "深圳", school: ["深圳大学"]},
    "chongqing": {name: "重庆", school: ["重庆电邮大学"]}
};

window.onload = function () {
    main();
};

/**
 * 入口
 */
function main() {
    bindCity();
    bindSchool("beijing");//bind default
    EventUtil.addHandler($("#city"), "change", function (e) {
        bindSchool(e.target.value);
    });
    EventUtil.addHandler($("#radio"), "change", function (e) {
        radioChange(e.target)
    })
}

/**
 * 绑定城市列表
 */
function bindCity() {
    let html = "";
    for (let k in city) {
        html += `<option value='${k}'>${city[k].name}</option>`;
    }
    $("#city").innerHTML = html;
}

/**
 * 绑定学校列表
 * @param {String} val
 */
function bindSchool(val) {
    let html = "";
    let schools = city[val].school;
    schools.forEach(s => html += `<option name="${s}">${s}</option>`);
    $("#school").innerHTML = html;
}

/**
 * 切换radio
 * @param {Object}node 点击的radio
 */
function radioChange(node) {
    if (node.id === "students") {
        $("#worker_info").className = "hide";
        $("#school_info").className = "";
    } else {
        node.className = "";
        $("#worker_info").className = "";
        $("#school_info").className = "hide";
    }
}