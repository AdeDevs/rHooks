import { useEffect, useMemo, useRef, useState } from "react"

export default function HomePage() {
    const myRef = useRef()

    const changeThings = () => {
        const change = myRef.current
        change.style.color = "red"
        change.style.transition = "all .3s ease-in-out"
        change.innerText = "I have been changed"
    }
    useEffect(() => {
        console.log(myRef.current)
    }, [myRef])

    const [users, setUsers] = useState(() => {
        const stored = localStorage.getItem("list")
        return stored ? JSON.parse(stored) : []
    })
    
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(users))
    }, [users])

    const [id, setId] = useState()
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [level, setLevel] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const list = { name, age, level, id: Math.random() }
        setUsers((prev) => [...prev, list])
        setName("")
        setAge("")
        setLevel("")
        setId("")
        alert("submitted")
        console.log(users);

    }
    // useEffect(() => {handleSubmit()},[])

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
                <h1 ref={myRef}>Back to base</h1>
                <button onClick={changeThings}>Change</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name"/> <br />
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter Your Age"/> <br />
                    <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Enter Your Level"/>
                    <button type="submit">Submit</button>
                </form>

                <div>
                    <ul >
                        {users.map((list) => (
                                <li key={list.id}> My name is {list.name}, my age is {list.age} and my level is {list.level}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}