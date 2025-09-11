import { useEffect, useMemo, useRef, useState } from "react"


export default function HomePage() {
    const [id, setId] = useState(() => {
        const storedId = localStorage.getItem("id");
        return storedId ? JSON.parse(storedId) : 0; // start at 0 if none saved
    });
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [entry, setEntry] = useState("")
    const [active, setActive] = useState(() => {
        const stored = localStorage.getItem("active");
        return stored ? JSON.parse(stored) : false;
    });
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem("items");
        return storedItems ? JSON.parse(storedItems) : [];
    });
    // const [searchParam, setSearchParam] = useState("")
    // const [searchItem, setSearchItem] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { name, date, entry, id };
        setItems((prevItems) => [...prevItems, newItem]);
        setName("");
        setDate("");
        setEntry("");
        setId((prevId) => prevId + 1);
        setActive(true);
    };
    useEffect(() => {
        localStorage.setItem("id", JSON.stringify(id));
    }, [id]);
    useEffect(() => {
        localStorage.setItem("active", JSON.stringify(active));
    }, [active]);
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
        console.log(items);
    }, [items]);


    // const handleSearch = useMemo(() => {
    //     return items.filter(item => item.name.toLowerCase().includes(searchParam.toLowerCase()))
    // }, [items, searchParam])

    return (
        <div className="parent">
            {/* <h1>Bored, Here's a form, please input the appropriate info and click submit</h1> */}
            {/* <nav className="navigation">
                <ul>
                    <li>Home</li>
                    <li>Books</li>
                    <li>Authors</li>
                </ul>
            </nav> */}
            <div className="card">
                <h1>Bored, Here's a form, please input the appropriate info and click submit</h1>
                <div className="inputs">
                    <form onSubmit={handleSubmit}>
                        <div className="split">
                            <input className="date-form" type="text" placeholder="Enter Your Entry Title" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                        <textarea type="text" placeholder="Make Your Entry" value={entry} onChange={(e) => setEntry(e.target.value)} required />
                        <button>Save</button>
                    </form>
                </div>
                <div className={`search ${active ? "active" : ""}`}>
                    {items.map((item, idx) => {
                        return (
                            <div key={item.id} className="results">
                                <h1>{item.name}</h1>
                                <p className="text date">Entry made at {item.date}</p>
                                <p className="text">{item.entry}</p>
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