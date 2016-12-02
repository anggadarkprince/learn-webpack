//import _ from 'lodash';
require("./css/styles.css");

function component () {
    var element = document.createElement('div');

    element.innerHTML = "Hello webpack";

    return element;
}

document.body.appendChild(component());
document.write(require("./content.js"));