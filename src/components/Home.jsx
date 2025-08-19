import { useEffect, useState } from "react"

export default function HomePage() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
   useEffect(() => {
    const handleResize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    window.addEventListener("resize", handleResize)

    // return () => {window.removeEventListener("resize", handleResize)}
   }, [])
    return (
        <div className="parent">
            <nav className="navigation">
                <ul>
                    <li>Home</li>
                    <li>Books</li>
                    <li>Authors</li>
                </ul>
            </nav>
            <main>
                <div className="home">
                    <div className="card">
                       <h1>Testing out hooks</h1>
                       <p>{size.width}</p>
                       <p>{size.height}</p>
                    </div>
                </div>
            </main>
        </div>
    )
}