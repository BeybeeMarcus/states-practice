import { useState } from "react";

function Count() {
    const [count, setCount] = useState(0)

    function decrementValue() {
        setCount(count - 1)
        if (count <= 0) {
            setCount(0);
        }
    }

    function incrementValue() {
        setCount(count + 1)
        if (count >= 10) {
            setCount(10);
        }
    }

    return (

        <>
            
                <span className="h1" style={{ marginLeft: '0px' }} id="result">{count}</span>
                <br />
                <button className="btn btn-primary" onClick={incrementValue}> + Increment </button>
                <br />
                <button className="btn btn-success" onClick={decrementValue}> - Decrement </button>
            
        
        </>
        
    );
}
export default Count;
