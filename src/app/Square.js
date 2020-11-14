'use strict';

var React = require("react");

function Square(Props) {
  var value = Props.value;
  var click = Props.click;
  return React.createElement("button", {
              className: "square",
              onClick: click
            }, value);
}

var make = Square;

exports.make = make;
/* react Not a pure module */
