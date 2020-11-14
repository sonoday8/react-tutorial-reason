'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.js");
var Game$MyReactReason = require("./app/Game.js");

((require('./index.css')));

ReactDOMRe.renderToElementWithId(React.createElement(Game$MyReactReason.make, {}), "root");

/*  Not a pure module */
