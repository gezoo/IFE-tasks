/**
 * Created by GEZOX on 2017/1/18.
 */

window.onload = function () {
    main();
};

function main() {
    initButtonHandler();
}

function initButtonHandler() {
    regHandler("focus", function (event) {
        var infoNode = event.target.parentNode.nextElementSibling;
        setNodeClass(infoNode, "show-info", infoMsg.info[event.target.name])
    });
    regHandler("blur", function (event) {
        validation(event.target, errHandler, okHandler);
    });
    EventUtil.addHandler($$("button[type=submit]")[0], "click", function (event) {
        var nodeList = $$("input");
        var result = true;
        Array.every(nodeList, function (node) {
            result = validation(node, errHandler, okHandler);
            if (result == false) {
                confirm("提交失败");
                return false;
            }
            return true;
        });
        if (result) {
            confirm("提交成功！");
        }
    })
}

function regHandler(type, fn) {
    var nodeList = $$("input");
    nodeList.forEach(function (node) {
        EventUtil.addHandler(node, type, fn);
    })
}

var infoMsg = {
    success: {
        "name": "名称可用",
        "password": "密码可用",
        "confirmPwd": "密码输入一致",
        "email": "格式正确"
    },
    error: {
        "name": ["名称不能为空", "长度为4~16个字符"],
        "password": ["密码不能为空", "最大长度为18个字符"],
        "confirmPwd": ["两次输入密码不同"],
        "email": ["Email格式错误"]
    },
    info: {
        "name": "必填，长度4~16个字符",
        "password": "长度为4~18个字符",
        "confirmPwd": "再次输入相同密码",
        "email": "Email格式为：**@**"
    }
};

function validation(node, errHandler, okHandler) {
    if (validatePatter[node.name](node.value) == false) {
        errHandler(node);
        return false;
    } else {
        okHandler(node);
        return true;
    }
}

var validatePatter = {
    errIndex: 0,
    "name": function (str) {
        if (str.length === 0) {
            return false;
            this.errIndex = 0;
        }
        if (str.length > 4 && str.length <= 16) {
            return true;
        }
        this.errIndex = 1;
        return false;
    },
    "password": function (str) {
        this.errIndex = 0;
        if (str.length === 0) {
            return false;
        }
        if (str.length > 18) {
            this.errIndex = 1;
            return false;
        }
        return true;
    },
    "confirmPwd": function (str) {
        var pwd = $("#txtPassword");
        if (pwd.value === str) {
            return true;
        }
        return false;
    },
    "email": function (str) {
        if (str.match(/*@*/)) {
            return true
        }
        return false;
    }
};

function errHandler(node) {
    var infoNode = node.parentNode.nextElementSibling;
    setNodeClass(infoNode, "show-info info-error", infoMsg.error[node.name][validatePatter.errIndex])
    node.dataset.validate = false;
}

function okHandler(node) {
    var infoNode = node.parentNode.nextElementSibling;
    setNodeClass(infoNode, "show-info info-success", infoMsg.success[node.name])
    node.dataset.validate = true;
}

function setNodeClass(node, className, msg) {
    node.className = className;
    node.innerHTML = msg;
}
