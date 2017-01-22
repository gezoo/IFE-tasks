/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

var $ = function (id) {return document.getElementById(id); };

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

function GetWeekIndex(dateobj) {
    var firstDay = GetFirstWeekBegDay(dateobj.getFullYear());
    if (dateobj < firstDay) {
        firstDay = GetFirstWeekBegDay(dateobj.getFullYear() - 1);
    }
    var d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
    return Math.floor(d / 7) + 1;
}
function GetFirstWeekBegDay(year) {
    var tempdate = new Date(year, 0, 1);
    var temp = tempdate.getDay();
    if (temp == 1)
        return tempdate;
    temp = temp == 0 ? 7 : temp;
    tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
    return new Date(tempdate);
}

// 用于渲染图表的数据
var chartData = {};
var colColor = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95', '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
var colWidth = { "day": 20, "week": 40, "month": 60 };
var chineseDateName = { "day": "", "week": "周", "month": "月" }
// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    initAqiChartData();
    var html = "";
    for (var date in chartData) {
        var color = colColor[Math.floor(Math.random() * colColor.length)];
        var data = chartData[date];
        html += "<div class='col' title='" + date + chineseDateName[pageState.nowGraTime] + "," + data.toFixed(2) + "' style='width:" + colWidth[pageState.nowGraTime] + "px;height:" + data.toFixed(2) + ";background:" + color + "'></div>";
    }
    $("chart").innerHTML = html;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(nowGraTime) {
    // 确定是否选项发生了变化 
    // 设置对应数据
    if (pageState.nowGraTime != nowGraTime) {
        pageState.nowGraTime = nowGraTime;

        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 确定是否选项发生了变化 
    // 设置对应数据
    if (city != pageState.nowSelectCity) {
        pageState.nowSelectCity = city;
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var timeNode = document.getElementsByName("gra-time");
    for (var i = 0; i < timeNode.length; i++) {
        timeNode[i].attributes.checked = null;
    }
    $("form-gra-time").onclick = function (evt) {
        if (evt.target.tagName.toLowerCase() == "input") {
            evt.target.getAttribute["checked"] = "checked";
            graTimeChange(evt.target.value);
        }
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var html = "";
    for (var data in aqiSourceData) {
        html += "<option data-city='" + data + "'>" + data + "</option>";
    }
    $("city-select").innerHTML = html;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    $("city-select").onchange = function (evt) {
        citySelectChange(evt.target.value);
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = {};
    for (var sourceData in aqiSourceData) {
        if (sourceData === pageState.nowSelectCity) {
            var cityDatas = aqiSourceData[sourceData];
            if (pageState.nowGraTime === "day") {
                chartData = cityDatas;
            } else {
                setChartData(cityDatas, pageState.nowGraTime);
            }
        }
    }
}

function setChartData(cityDatas, type) {
    for (var cityDate1 in cityDatas) {
        var index = 0;
        var count = 0;
        if (type === "week") {
            index = GetWeekIndex(new Date(cityDate1));
            count = 7;
        } else {
            index = new Date(cityDate1).getMonth() + 1;
            count = 30;
        }
        var indexTotal = chartData[index];
        if (indexTotal === undefined) {
            chartData[index] = cityDatas[cityDate1] / count;
        } else {
            chartData[index] += cityDatas[cityDate1] / count;
        }
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();

