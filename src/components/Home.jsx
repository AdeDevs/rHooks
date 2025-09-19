import { useEffect, useMemo, useRef, useState } from "react"

export default function HomePage() {
    const [userName, setUserName] = useState(() => {
        const storedUser = localStorage.getItem("name")
        return storedUser ? JSON.parse(storedUser) : ""
    })

    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(userName));
    },[userName])
    


    return (
        <div className="parent">            
            <nav className="navigation">
                <ul>
                    <li>Home</li>
                    <li>Books</li>
                    <li>Authors</li>
                </ul>
            </nav>
            <div className="card">
                <h1>Back to base</h1>
                <p>{userName}</p>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>

        </div>
    )
}