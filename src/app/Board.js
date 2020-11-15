'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Square$MyReactReason = require("./Square.js");

function Board(Props) {
  var squares = Props.squares;
  var click = Props.click;
  var renderSquare = function (i) {
    return React.createElement(Square$MyReactReason.make, {
                value: Caml_array.get(squares, i),
                click: (function (_evt) {
                    return Curry._1(click, i);
                  })
              });
  };
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "board-row"
                }, renderSquare(0), renderSquare(1), renderSquare(2)), React.createElement("div", {
                  className: "board-row"
                }, renderSquare(3), renderSquare(4), renderSquare(5)), React.createElement("div", {
                  className: "board-row"
                }, renderSquare(6), renderSquare(7), renderSquare(8)));
}

var make = Board;

exports.make = make;
/* react Not a pure module */
