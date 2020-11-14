[@bs.val] external jsAlert: string => unit = "alert";

[@react.component]
let make = (~value, ~click) => {
    <button className="square" onClick=click>
    {React.string(value)}
    </button>
};