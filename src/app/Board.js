'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Square$MyReactReason = require("./Square.js");

var initialState_squares = $$Array.init(9, (function (param) {
        return "";
      }));

var initialState = {
  squares: initialState_squares,
  xIsNext: true
};

function reducer(state, action) {
  var i = action._0;
  if (Caml_array.get(state.squares, i) !== "") {
    return state;
  } else {
    Caml_array.set(state.squares, i, state.xIsNext ? "X" : "O");
    return {
            squares: state.squares,
            xIsNext: !state.xIsNext
          };
  }
}

function calculateWinner(squares) {
  var lines_0 = [
    0,
    1,
    2
  ];
  var lines_1 = {
    hd: [
      3,
      4,
      5
    ],
    tl: {
      hd: [
        6,
        7,
        8
      ],
      tl: {
        hd: [
          0,
          3,
          6
        ],
        tl: {
          hd: [
            1,
            4,
            7
          ],
          tl: {
            hd: [
              2,
              5,
              8
            ],
            tl: {
              hd: [
                0,
                4,
                8
              ],
              tl: {
                hd: [
                  2,
                  4,
                  6
                ],
                tl: /* [] */0
              }
            }
          }
        }
      }
    }
  };
  var lines = {
    hd: lines_0,
    tl: lines_1
  };
  var res = List.filter(function (lst) {
          if (Caml_array.get(squares, Caml_array.get(lst, 0)) !== "" && Caml_array.get(squares, Caml_array.get(lst, 0)) === Caml_array.get(squares, Caml_array.get(lst, 1))) {
            return Caml_array.get(squares, Caml_array.get(lst, 0)) === Caml_array.get(squares, Caml_array.get(lst, 2));
          } else {
            return false;
          }
        })(lines);
  if (List.length(res) !== 0) {
    return Caml_array.get(squares, Caml_array.get(List.hd(res), 0));
  } else {
    return "";
  }
}

function Board(Props) {
  var match = React.useReducer(reducer, initialState);
  var setState = match[1];
  var state = match[0];
  var renderSquare = function (i) {
    return React.createElement(Square$MyReactReason.make, {
                value: Caml_array.get(state.squares, i),
                click: (function (_evt) {
                    return Curry._1(setState, /* Click */{
                                _0: i
                              });
                  })
              });
  };
  var winner = calculateWinner(state.squares);
  var status = winner === "" ? "Next player: " + (
      state.xIsNext ? "X" : "O"
    ) : "Winner: " + winner;
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "status"
                }, status), React.createElement("div", {
                  className: "board-row"
                }, renderSquare(0), renderSquare(1), renderSquare(2)), React.createElement("div", {
                  className: "board-row"
                }, renderSquare(3), renderSquare(4), renderSquare(5)), React.createElement("div", {
                  className: "board-row"
                }, renderSquare(6), renderSquare(7), renderSquare(8)));
}

var make = Board;

exports.initialState = initialState;
exports.reducer = reducer;
exports.calculateWinner = calculateWinner;
exports.make = make;
/* initialState Not a pure module */
