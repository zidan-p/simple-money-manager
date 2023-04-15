import { useState } from "react"




function CounterClick(){
    const [count, setCount] = useState(0);

    return (
        <div className="container">
            <h3>klik counter ini [teredit]</h3>
            <div style={{
                display: "flex",
                flexDirection : "column",
                gap : "5px",
                maxWidth: "200px",
                margin : "auto"
            }}>
                <div 
                    style={{
                        fontSize : "23pt"
                    }}
                >
                    {count}
                </div>
                <button
                    className="button-primary"
                    onClick={()=>setCount(count + 1)}
                >
                    tambah
                </button>
            </div>
        </div>
    )
}

export default CounterClick