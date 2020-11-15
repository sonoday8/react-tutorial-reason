'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Board$MyReactReason = require("./Board.js");

var initialState_histories = [{
    squares: $$Array.init(9, (function (param) {
            return "";
          }))
  }];

var initialState = {
  histories: initialState_histories,
  stepNumber: 0,
  xIsNext: true
};

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

function reducer(state, action) {
  var histories = state.histories;
  var history = Caml_array.get(histories, histories.length - 1 | 0);
  var squares = $$Array.copy(history.squares);
  if (action.TAG) {
    var step = action._0;
    var jumpHistories = $$Array.sub(state.histories, 0, step + 1 | 0);
    return {
            histories: jumpHistories,
            stepNumber: step,
            xIsNext: step % 2 === 0
          };
  }
  var i = action._0;
  if (Caml_array.get(squares, i) !== "" || calculateWinner(squares) !== "") {
    return state;
  }
  Caml_array.set(squares, i, state.xIsNext ? "X" : "O");
  var histories$1 = $$Array.append(histories, [{
          squares: squares
        }]);
  return {
          histories: histories$1,
          stepNumber: state.stepNumber + 1 | 0,
          xIsNext: !state.xIsNext
        };
}

function Game(Props) {
  var match = React.useReducer(reducer, initialState);
  var setState = match[1];
  var state = match[0];
  var histories = state.histories;
  var history = Caml_array.get(histories, histories.length - 1 | 0);
  var winner = calculateWinner(history.squares);
  var status = winner === "" ? "Next player: " + (
      state.xIsNext ? "X" : "O"
    ) : "Winner: " + winner;
  var moves = $$Array.mapi((function (move, param) {
          var desc = move !== 0 ? "Go to move #" + String(move) : "Go to game start";
          return React.createElement("li", {
                      key: String(move)
                    }, React.createElement("button", {
                          onClick: (function (_evt) {
                              return Curry._1(setState, {
                                          TAG: /* JumpTo */1,
                                          _0: move
                                        });
                            })
                        }, desc));
        }), histories);
  return React.createElement("div", {
              className: "game"
            }, React.createElement("div", {
                  className: "game-board"
                }, React.createElement(Board$MyReactReason.make, {
                      squares: history.squares,
                      click: (function (i) {
                          return Curry._1(setState, {
                                      TAG: /* Click */0,
                                      _0: i
                                    });
                        })
                    })), React.createElement("div", {
                  className: "game-info"
                }, React.createElement("div", undefined, status), React.createElement("ol", undefined, moves)));
}

var make = Game;

exports.initialState = initialState;
exports.calculateWinner = calculateWinner;
exports.reducer = reducer;
exports.make = make;
/* initialState Not a pure module */
