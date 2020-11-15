[@bs.val] external jsLog: string => unit = "console.log";

type history = {
    squares: array(string)
};
type state = {
    histories: array(history),
    stepNumber: int,
    xIsNext: bool
};

type action =
  | Click(int)
  | JumpTo(int);

let initialState = {
    histories: [|{
        squares: Array.init(9, (_) => "")
    }|],
    stepNumber: 0,
    xIsNext: true
};

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

let reducer = (state, action) => {
    let histories = state.histories;
    let history = histories[Array.length(histories) - 1];
    let squares = Array.copy(history.squares);
    switch (action) {
    | Click(i) => 
        if (squares[i] !== "" || calculateWinner(squares) !== "") {
            state;
        } else {
            Array.set(squares, i, (state.xIsNext ? "X" : "O"));
            let histories = Array.append(histories,[|{squares: squares}|]);
            {
                histories: histories,
                stepNumber: state.stepNumber + 1, 
                xIsNext: !state.xIsNext
            };
        }
    | JumpTo(step) =>
        let jumpHistories = Array.sub(state.histories, 0, (step + 1));
        {
            histories: jumpHistories,
            stepNumber: step,
            xIsNext: (step mod 2) === 0
        }
    };
};


[@react.component]
let make = () => {
    
    let (state, setState) = React.useReducer(reducer, initialState);
    /* let histories = Array.sub(state.histories, 0, (state.stepNumber + 1)); */
    let histories = state.histories;
    let history = histories[Array.length(histories) - 1];
    let status = {
        let winner = calculateWinner(history.squares);
        switch (winner) {
        | "" => "Next player: " ++  (state.xIsNext ? "X" : "O")
        | _  => "Winner: " ++  winner
        };
    };

    let moves = Array.mapi((move, _) => {
        let desc = (move !== 0) ? "Go to move #" ++ string_of_int(move) : "Go to game start";
        <li key={string_of_int(move)}>
            <button onClick={(_evt) => setState(JumpTo(move))}>{React.string(desc)}</button>
        </li>
        ;
        },histories);

    <div className="game">
        <div className="game-board">
            <Board squares={history.squares} click={(i) => setState(Click(i));}/>
        </div>
        <div className="game-info">
            <div>{React.string(status)}</div>
            <ol>{React.array(moves)}</ol>
        </div>
    </div>
};
