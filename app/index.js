//import _ from 'lodash';
require("./css/styles.css");

function component () {
    var element = document.createElement('div');

    element.innerHTML = "Hello webpack";

    return element;
}

document.body.appendChild(component());
document.write(require("./content.js"));

var inc = require('./increment').increment;
var a = 1;
console.log(inc(a)); // 2


var a = require("./modules/a");
var b = require("./modules/b");
console.log("before ensure " + b.xyz());
require.ensure(["./modules/c"], function(require) {
    var c = require("./modules/c"); // ensure module c has loaded
    console.log(c.printing());

    var b = require("./modules/b").xyz();
    console.log(b);
    var d = require("./modules/d");
    console.log(d);
});