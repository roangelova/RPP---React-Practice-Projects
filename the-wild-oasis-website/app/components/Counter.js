"use client"

import { useState } from "react";

function Counter({data}) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => setCount((c) => c + 1)}>+</button>

            <div>We can get our data from the server component and it now has {data.length} elements!</div>
        </div>
    );
}

export default Counter;