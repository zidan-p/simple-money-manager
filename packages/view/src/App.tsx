
import { forwardRef, useEffect, useRef } from "react"
import "./public/style/index.css"


const MySentence= forwardRef<HTMLDivElement, any>((props,ref) => (
    <div ref={ref} className="max-w-lg bg-white rounded p-5 shadow select-none absolute">
        <h1 className="text-2xl font-bold">Hello Tailwind</h1>
        <p className="text-gray-800">
            this is the best way that i could think to start building my project. 
            actualy there are many more architecture could be used, but only this that come to my mind.
            so, i hope i can finish this project as quick as possible.
        </p>
        <p className="bg-red-100 rounded text-red-900 px-2">sorry my broke grammar</p>
    </div>
))

const App = () =>{

    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const isClicked = useRef<boolean>(false);
    const coords = useRef<{

        //cursor posotion in element
        startX : number,
        startY : number,

        //element position in container
        lastX  : number,
        lastY  : number
    }>({
        startX : 0,
        startY : 0,
        lastX  : 0,
        lastY  : 0
    })

    useEffect(()=>{
        if(!containerRef.current || ! boxRef.current) return;

        const container = containerRef.current;
        const box = boxRef.current;

        const onMounseDown = (e : MouseEvent) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;

            console.log(`
            start X : ${coords.current.startX}
            start Y : ${coords.current.startY}
            `);
        }

        const onMouseUp = (e : MouseEvent) => {
            isClicked.current = false;
            coords.current.lastX = box.offsetLeft;
            coords.current.lastY = box.offsetTop;

            console.log(`
            last X : ${coords.current.lastX}
            last Y : ${coords.current.lastY}
            `);
        }

        const onMouseMove = (e : MouseEvent) => {
            if(!isClicked.current) return;

            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY;

            box.style.top = `${nextY}px`;
            box.style.left = `${nextX}px`;

            console.log("mouse move")
        }

        
        box.addEventListener("mousedown",onMounseDown);
        box.addEventListener("mouseup",onMouseUp);
        container.addEventListener("mousemove",onMouseMove);
        container.addEventListener("mouseleave",onMouseUp); // to prevent isclicked value always true when overflow

        const cleanUp = () => {
            box.removeEventListener("mousedown", onMounseDown);
            box.removeEventListener("mouseup", onMouseUp);
            container.removeEventListener("mousemove",onMouseMove);
            container.removeEventListener("mouseleave",onMouseUp);
        }

        return cleanUp;
    })

    return (
        <div ref={containerRef} className="h-screen bg-gray-200">
            <MySentence ref={boxRef} />
        </div>
    )
}

export default App;