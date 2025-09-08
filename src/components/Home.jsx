import { useEffect, useMemo, useRef, useState } from "react"


export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchItem, setSearchItem] = useState("")
    const [query, setQuery] = useState("")
    const characters = ["Lelouch", "Kallen", "Nunally", "Lancelot", "Zero", "Todo"]
    const [items, setItems] = useState([])
    const [users, setUsers] = useState([])
    const apiUrl = "https://randomuser.me/api/?results=6"
    const storeUrl = "https://fakestoreapi.com/products/"
    async function GetProfile() {
        try {
            const res = await fetch(apiUrl)
            const data = await res.json()
            // console.log(data.results)
            const list = data.results
            setUsers(list)


            console.log(list)

        } catch {
            (e) => {
                console.log(e)
            }
        }
    }
    useEffect(() => {
        GetProfile()
    }, [])

    async function GetStoreInfo() {
        try {
            const res = await fetch(storeUrl)
            const data = await res.json()
            setItems(data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        GetStoreInfo()
    }, [])

    const filterItems = useMemo(() => {
        return items.filter(item => item.category.toLowerCase().includes(searchItem.toLowerCase()))
    }, [items, searchItem])
    

    const exactMatch = useMemo(() => {
        return characters.filter(char => char.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [query])

    const handleSearch = () => {
        setQuery(searchTerm)
    }


    return (
        <div className="parent">
            {/* <nav className="navigation">
                <ul>
                    <li>Home</li>
                    <li>Books</li>
                    <li>Authors</li>
                </ul>
            </nav> */}
            <main>
                <div className="home">
                    <div className="card">
                        <h1>Testing out hooks</h1>
                        <input type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} placeholder="Enter your search" />
                        <ul>{exactMatch.map((character) => <li key={character}>{character}</li>)}</ul>
                        <button onClick={handleSearch}>Search</button>
                        <ul>
                            {characters.map((character) => <li key={character}>{character}</li>)}
                        </ul>
                        <input type="text" placeholder="search items" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                        <ul>
                        {filterItems.map((item) => (
                            <li key={item.id}>{item.title}</li>
                        ))}
                        </ul>
                        {/* <div className="user">
                            {items.map((item) => (
                                <p key={item.id}>{item.title}</p>
                            ))}
                        </div> */}
                        <div className="user">
                            {users.map((user) => {
                                return (
                                    <div key={user.login.uuid}>
                                        <img src={user.picture.large} alt={user.name.first} />
                                        <p>{user.name.first} {user.name.last}</p>
                                        <a href="#">{user.cell}</a>
                                    </div>
                                )
                            })}
                        </div>
                        <button onClick={GetProfile}>change</button>
                    </div>

                </div>
            </main>
        </div>
    )
}