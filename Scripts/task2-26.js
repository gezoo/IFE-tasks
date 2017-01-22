/// <reference path="jquery-3.1.1.js" />
$(document).ready(function () {
    $("[name=move]").click(function () {
        $(".ship").animate({ left: '20px' });
    });

    $("[name=create]").click(function () {
        var newShip = document.createElement("div");
        newShip.className = "ship";
        newShip.textContent = "一号";

        $(".space")[0].appendChild(newShip);
        var ship = createShip("一号", newShip);
        ship.start();
    });


});

///动力系统
function PowerSystems(es, ele) {
    this.es = es;
    this.ele = ele;
    var timer = null;
    this.status = '';
    this.left = 0;
    this.move = function () {
        var count = this.es.consume(5);
        if (count > 0) {
            this.left += 20;
            //this.ele.animate({ left: this.left + 'px' });
            $(".ship").animate({ left: this.left + 'px' }, 1000);
            $(".ship").textContent = "一号 " + count + "%";
        }
        if (count === 0) {
            //this.stop();
        }
    };
    this.stop = function () {
        if (timer != null) {
            this.status = 'stop';
            clearInterval(timer);
        }
    };
    this.start = function () {
        var self = this;
        timer = setInterval(function () {
            self.move();
        }, 1000);
    }

}

///能源系统
function EnergySystem() {
    this.power = 100;
    //接收能源
    this.receive = function (count) {
        if (this.power < 100) {
            this.power += count;
            if (this.power > 100) {
                this.power = 100;
            }
        }
        return this.power;
    };
    //消耗能源
    this.consume = function (count, fn) {
        if (this.power <= 0) {

        } else {
            this.power -= count;
            if (this.power < 0) {
                this.power = 0;
            }
        }
        return this.power;
    };

    this.start = function () {
        var self = this;
        var timer = setInterval(function () {
            self.receive(2);
        }, 1000);
    }
}

///信号系统
function SignalSystem() {
    this.receive = function (command) {
        switch (command.commond) {
            case "stop":
                break;
            case "start":
                break;
            default:
        }
    }

    this.start = function () {
        //while (true) {

        //}
    }

}

///自爆系统
function SelfDestruction() {

}

function Ship(shipName, ele) {
    this.name = shipName;
    this.element = ele;
    this.energySystem = new EnergySystem();
    this.powerSystems = new PowerSystems(this.energySystem, ele);
    this.signalSystem = new SignalSystem();
    this.selfDestruction = new SelfDestruction();

    this.position = {
        x: 0,
        y: 0
    }

    this.start = function () {
        this.energySystem.start();
        this.powerSystems.start();
        this.signalSystem.start();
    }
}

function createShip(shipName, ele) {
    if (shipQueue.length >= 4) {
        throw new Error("超出飞船最大数量");
    }
    var newShip = new Ship(shipName, ele);
    this.shipQueue.push(newShip);
    return newShip;
}

var shipQueue = [];


function Mediator() {
    var radioWaves = '';
}