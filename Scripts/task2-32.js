/**
 * Created by GEZOX on 2017/1/20.
 */

class Validator {
    constructor(options) {
        this.options = options;
        if (!options) {
            return this;
        }
        this.form = {};
        this.field = {};
        this.handles = {};
        this.errors = {};
        if (options.formName) {
            if (document) {
                this.form = document.forms[options.formName];
                try {
                    Object.keys(this.options.fields).forEach((name) => {
                        let ele = this.form[name];
                        this.options.fields[name]["name"] = name;
                        this.options.fields[name]["el"] = ele;
                        this.options.fields[name]["id"] = ele.id;
                    })(this);
                } catch (ex) {
                }
            }
        }

        this.handleEvent();
        this.handleOnSubmit();
    }

    /**
     * 验证单个input
     * @param {String}name input name
     */
    validateByName(name) {
        this.field = this.options.fields[name];

        let el = this.form[name];
        this.field["value"] = el.value;
        this.field["name"] = name;

        //非text
        //TODO:验证 check radio select 等元素
        if (false) {
        }
        else {
            this.errors = parseRule(this.field);
        }
        let isSuccess = this.errors.result;

        if (isSuccess) {
            // console.log("success");

        } else {
            if (typeof this.field.err === 'function') {
                this.field.err(this.errors.error);
            }
        }
    }

    static validateField(field) {
        const {result, error} = parseRule(field);
        if (!result) {
            if (typeof field.err === 'function') {
                field.err(error);
            }
        }
    }

    /**
     * 整个表单验证
     * @param{Object}event 事件
     */
    validate(event) {

        this.handles.event = util.getCurrentEvent(event);

        let isSuccess = false;
        //遍历验证表单
        Object.keys(this.options.fields).forEach((name) => {
            if (!this.validateByName(name)) {
                isSuccess = false;
            }
        });

        // 如果有错误，则停止 submit 提交
        if (!isSuccess) {
            util.preventSubmit(this.handles.event);
        }

        // 执行回调函数
        if (typeof this.options.callback === 'function') {
            this.options.callback(isSuccess, this.errors);
        }

        return isSuccess;
    }

    /**
     * 注册表单onsubmit事件
     */
    handleOnSubmit() {
        const thisFormOnSubmit = this.form.onsubmit;
        this.form.onsubmit = (that => (e) => {
            try {
                const evt = util.getCurrentEvent(e);
                return that.validate(evt) && (thisFormOnSubmit === undefined || thisFormOnSubmit());
            } catch (ex) {
                return null;
            }
        })(this);
    }

    /**
     * 绑定控件onchange事件
     * @returns {null}
     */
    handleEvent() {
        try {
            Object.keys(this.options.fields).forEach((name) => {
                let validateFn = Validator.validateField;
                let field = this.options.fields[name];
                this.form[name].onchange = function (evt) {
                    validateFn(field);
                }
            })(this);
        }
        catch (ex) {
            return null;
        }
    }


    addDefineMethod(fnObj) {
        try {
            Object.keys(fnObj).forEach(key => {
                test[key] = fnObj[key];
            });
        } catch (ex) {
            return null
        }
    }

    handleGetArrayByName(name) {
        // field element
        const el = this.form[name];
        const result = [];

        // 如果节点对象不存在或长度为零
        if (!el || el.length === 0) {
            return result;
        }

        // 将节点转换为数组
        const elLength = el.length;

        // 排除 select， select 为数组形式
        if (elLength && !util.isSelect(el)) {
            for (let i = 0; i < elLength; i += 1) {
                result.push(el[i]);
            }
        } else {
            result.push(el);
        }
        return result;
    }
}

let test = {
    // 自然数
    numeric: /^\d+$/,
    // 整数
    integer: /^-?\d+$/,
    // 浮点数
    decimal: /^-?\d*\.?\d+$/,
    // 邮箱
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    // IP 地址 [ip ipv4、ipv6]
    ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
    // 电话号码
    tel: /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    // 手机号码
    phone: /^1[3-9]\d{9}$/,
    // 字母数字或下划线
    abc: /^\w+$/,
    // URL
    url: /[a-zA-Z]+:\/\/[^\s]*/,
    // 日期
    date: /^\d{4}-\d{1,2}-\d{1,2}$/,
    maxLength: function (value, number) {
        return value.length <= number;
    },
    minLength: function (val, num) {
        return val.length >= num;
    },
    isEmail: function (val) {
        return this.test("email", val);
    },
    isDate: function (val) {
        return this.test("date", val);
    },
    required: function (val) {
        return !(val === undefined || val === null || val === '');
    },
    test: function (val, name) {

        if (test.hasOwnProperty(name)) {
            let reg = test[name];
            if (reg != undefined) {
                return reg.test(val);
            }
        }
        return false;
    }
};

function parseRule(field) {
    // 成功标识
    let result = true;
    // 错误信息域
    let error = {
        id: field.id,
        name: field.name,
        value: field.el.value,
    };

    let rules = field.rules.split(/\s*\|\s*/g);

    let isRequired = rules.some(function (rule) {
        return rule === 'required';
    });

    let isEmpty = field.el.value === undefined || field.el.value === null || field.el.value === '';

    rules.forEach(function (rule, index) {
        // 标识不通过，则不继续验证该规则
        if (!result) {
            return;
        }

        // 转换：maxLength(12) => ['maxLength', 12]
        let parts = /^(.+?)\((.+)\)$/.exec(rule);
        let method = rule;
        let param = '';

        // 解析带参数的验证如 maxLength(12)
        if (parts) {
            method = parts[1];
            param = parts[2];
        }

        // 信息域规则中没有包含 required，并且该值为空，则不验证
        let jumpRule = !isRequired && isEmpty;

        // 匹配验证
        if (typeof test[method] === 'function' && !jumpRule) {
            if (!test[method].apply(test, [field.el.value, param])) {
                result = false;
            }
        }

        // 验证不通过，解析错误信息
        if (!result) {
            error["rule"] = method;
            error["message"] = function () {
                let seqText = field.fail ? field.fail.split(/\s*\|\s*/g)[index] : '';
                // 替换 {{value}} 和 {{param}} 中参数
                return seqText ? seqText.replace(/\{\{\s*value\s*}}/g, field.el.value).replace(/\{\{\s*param\s*}}/g, param) : seqText;
            }();
        }
    });

    if (!result) {
        let nextNode = field.el.nextElementSibling;
        if (nextNode != null && nextNode.className.match(/error/)) {
            if(!nextNode.className.match(/show/)){

            }
        }else{
            field.el.innerHTML+=`<div>${error.message}</div>`;
        }
    }

    return {
        result: result,
        error: error
    };
}

let util = {
    getCurrentEvent: function (evt) {
        return evt || window.event;
    },

    /**
     * 阻止表单提交
     */
    preventSubmit: function (evt) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        } else if (evt) {
            // IE 使用的全局变量
            evt.returnValue = false;
        }
    },
    isSelect: function (elArray) {
        return elArray[0].tagName === 'OPTION';
    }
};

// example
// let validator = new Validator({
//     formName: "form",
//     fields: {
//         // email: {
//         //     rules: "required|isEmail|maxLength(36)",
//         //     message: "必填|不是邮件地址格式|最大长度为{{param}}",
//         // },
//         text: {
//             rules: "required|maxLength(5)",
//             message: "必填|最大长度为{{param}}",
//         }
//     }
// });
//
// validator.validateByName("email");

