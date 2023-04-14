
import "./style.css"

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
        <>
        
        </>
    )
}

const App = () => {
    return (
        <>
            <div className="layout-container">
                <Section1 />
                <Section2 />
            </div>
        </>
    )
}

export default App;