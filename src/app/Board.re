type state = {
    squares: array(string),
    xIsNext: bool
};
type action =
  | Click(int);

let initialState = {
    squares: Array.init(9, (_) => ""),
    xIsNext: true
};
let reducer = (state, action) => {
    switch (action) {
    | Click(i) => 
        if (state.squares[i] !== "") {
            state;
        } else {
            Array.set(state.squares, i, (state.xIsNext ? "X" : "O"));
            {
                squares: state.squares,
                xIsNext: !state.xIsNext
            };
        }
    };
};

/* [@bs.val] external jsAlert: string => unit = "alert"; */
[@bs.val] external jsLog: string => unit = "console.log";

let calculateWinner = (squares) => {
    let lines = [
        [|0, 1, 2|],
        [|3, 4, 5|],
        [|6, 7, 8|],
        [|0, 3, 6|],
        [|1, 4, 7|],
        [|2, 5, 8|],
        [|0, 4, 8|],
        [|2, 4, 6|]
    ];
    let res = List.filter((lst) => {
        (squares[lst[0]] !== "" && squares[lst[0]] === squares[lst[1]] && squares[lst[0]] === squares[lst[2]])
    }, lines);
    if (List.length(res) !== 0) {
        squares[List.hd(res)[0]];
    } else {
        "";
    }
};


[@react.component]
let make = () => {
    let (state, setState) = React.useReducer(reducer, initialState);
    let renderSquare = (i) => {
        <Square value={state.squares[i]} click={(_evt) => setState(Click(i));}/>; 
    };
    let status = {
        let winner = calculateWinner(state.squares);
        switch (winner) {
        | "" => "Next player: " ++  (state.xIsNext ? "X" : "O")
        | _  => "Winner: " ++  winner
        };
    };

    <div>
    <div className="status">{React.string(status)}</div>
    <div className="board-row">
    {renderSquare(0)}
    {renderSquare(1)}
    {renderSquare(2)}
    </div>
    <div className="board-row">
    {renderSquare(3)}
    {renderSquare(4)}
    {renderSquare(5)}
    </div>
    <div className="board-row">
    {renderSquare(6)}
    {renderSquare(7)}
    {renderSquare(8)}
    </div>
    </div>
}
