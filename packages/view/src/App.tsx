
import "./style.css"
import "./public/style/index.css"
import IMG from "./public/asset/my-web.png";
import CounterClick from "./Counter";

const Section1 = () => {
    return (
        <div className="container container1">
            <h1>Hallo nama saya zidan</h1>
            <p>saat ini saya sedang mencari pekerjaan freelance untuk kedepanya.</p>
            <p>sangat josh sekali</p>
        </div>
    )
}

const Section2 = () => {
    return (
        <div className="container container2">
            <p>Mungkin Anda bisa menekan tombol ini</p>
            <div className="flex-button">
                <button>click ini</button>
                <button>juga ini</button>
            </div>
        </div>
    )
}

const Section3 = () => {
    return (
        <div className="container container3">
            <p>Ini adalah hasil projek saya sebelumnya</p>
            <p>bolehlah dilihat</p>
            <img src={IMG} alt="" />
        </div>
    )
}

// const App = () => {
//     return (
//         <>
//             <div className="layout-container">
//                 {/* <EnvSection /> */}
//                 <div style={{color : "red"}} className="container">
//                     {/* <p>{process.env.NODE_ENV}</p> */}
//                     <p>{process.env.name}</p>
//                 </div>
//                 <Section1 />
//                 <Section2 />
//                 <Section3 />
//                 <CounterClick />
//             </div>
//         </>
//     )
// }

const App = () =>{
    return (
        <>
            <h1 className="text-lg">Halloo, ada yang bisa saya bantu??</h1>
            <p>tailwind class</p>
        </>
    )
}

export default App;