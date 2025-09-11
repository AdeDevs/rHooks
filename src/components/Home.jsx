import { useEffect, useMemo, useRef, useState } from "react"


export default function HomePage() {
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [club, setClub] = useState("")
    const [active, setActive] = useState(false)
    const [items, setItems] = useState([
    ])
    const [searchParam, setSearchParam] = useState("")
    const [searchItem, setSearchItem] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const newItem = { name, age, club, id };
        setItems((prevItems) => [...prevItems, newItem])
        setName("")
        setAge("")
        setClub("")
        setId(id + 1)
        setActive(true)
    }

    useEffect(() => {
        console.log(items)
    }, [items])

    const handleSearch = useMemo(() => {
        return items.filter(item => item.name.toLowerCase().includes(searchParam.toLowerCase()))
    }, [items, searchParam])

    return (
        <div className="parent">
            {/* <nav className="navigation">
                <ul>
                    <li>Home</li>
                    <li>Books</li>
                    <li>Authors</li>
                </ul>
            </nav> */}
                    <div className="card">
                        <div className="inputs">
                            <form onSubmit ={handleSubmit}>
                            <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="number" placeholder="Enter Your Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                            <input type="text" placeholder="Enter Your Favourite Club" value={club} onChange={(e) => setClub(e.target.value)} required />
                            <button >Submit</button>
                            </form>
                        </div>
                        <div className={`search ${active ? "active" : ""}`}>
                        {items.map((item) => {
                            return (
                                <div key={item.id} className="results">
                                    <h1>{item.name}</h1>
                                    <p>{item.age}</p>
                                    <p>{item.club}</p>
                                </div>
                            )
                        })}
                        </div>
                        {/* <input type="text" placeholder="search" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
                        {handleSearch.map((item) => {
                            return (
                                <div key={item.id} className="search">
                                    <p>{item.name}</p>
                                    <p>{item.age}</p>
                                    <p>{item.club}</p>
                                </div>
                            )
                        })} */}
                    </div>

        </div>
    )
}