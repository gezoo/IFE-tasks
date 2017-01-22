/**
 * Created by GEZOX on 2017/1/19.
 */

let person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "SSSS"
});
console.log(person.name);

let book = {
    _year: 2010,
    edition: 1,
    toString:function () {
        return this;
    }
};

Object.defineProperty(book, "year", {
    get: function () {
        return this._year;
    },
    set: function (newValue) {
        if (newValue > 2010) {
            this._year = newValue;
            this.edition += newValue;
        }
    }
});

book.year = 2015;
console.log(book.year + " " + book.edition);

let hello = {
    _year: 2010,
    year: {
        get: function () {
            return this._year;
        },
        set: function (newValue) {
            if (newValue > 2010) {
                this._year = newValue;
            }
        }
    }
};

function test() {
    console.log(this.toString());
    console.log(book.toString());
}
let  t = new test();

