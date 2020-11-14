'use strict';

var React = require("react");
var Board$MyReactReason = require("./Board.js");

function Game(Props) {
  return React.createElement("div", {
              className: "game"
            }, React.createElement("div", {
                  className: "game-board"
                }, React.createElement(Board$MyReactReason.make, {})), React.createElement("div", {
                  className: "game-info"
                }, React.createElement("div", undefined), React.createElement("ol", undefined)));
}

var make = Game;

exports.make = make;
/* react Not a pure module */
