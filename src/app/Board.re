/* [@bs.val] external jsAlert: string => unit = "alert"; */
/* [@bs.val] external jsLog: string => unit = "console.log"; */


[@react.component]
let make = (~squares, ~click) => {
    let renderSquare = (i) => {
        <Square value={squares[i]} click={(_evt) => click(i);}/>; 
    };
    <div>
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
