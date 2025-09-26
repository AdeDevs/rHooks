import { useEffect, useMemo, useRef, useState } from "react"

export default function HomePage() {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem("theme")
        return stored ? JSON.parse(stored) : false
    })
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme))
    }, [theme])
    const toggleTheme = () => {
        setTheme(!theme)
    }

    const myRef = useRef()
    const [id, setId] = useState()
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [reason, setReason] = useState("")
    const [debtors, setDebtors] = useState(() => {
        const stored = localStorage.getItem("debtors")
        return stored ? JSON.parse(stored) : []
    })
    useEffect(() => {
        localStorage.setItem("debtors", JSON.stringify(debtors))
    }, [debtors])

    const handleSubmit = (e) => {
        e.preventDefault()
        const list = { name, amount, reason, id: Math.random() }
        setDebtors((prev) => [...prev, list])

        setName("")
        setAmount("")
        setReason("")
        setId("")
    }
    useEffect(() => {
        console.log(debtors)
    }, [debtors])
    const [searchParam, setSearchParam] = useState("")

    const filteredDebtors = useMemo(() => {
        return debtors.filter(debtor => debtor.amount >= searchParam)
    }, [searchParam, debtors])

    useEffect(() => {
        console.log(filteredDebtors)
    }, [debtors])

    return (
        <div className={`parent ${theme ? "" : "active"}`}>
            {/* <nav className="navigation">
                <ul>
                    <li>Home</li>
                    <li>Books</li>
                    <li onClick={toggleTheme}>Toggle</li>
                </ul>
            </nav> */}
            {/* <div className="card"> */}
            {/* <h1 ref={myRef}>Back to base</h1> */}
            <div className="forms">
                <button className="toggle" onClick={toggleTheme}>Toggle</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Debtor's Name" required />
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount Owed" required />
                    <textarea placeholder="Enter Debtor's Reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
                    <input type="text" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} placeholder="Search For Debtors" />
                    <button type="submit">save</button>
                </form>
                {filteredDebtors.length > 0 && (
                    <div className="debtors">
                        {filteredDebtors.map((debtor) => {
                            return (
                                <div className="debtor" key={debtor.id}>
                                    <h1>{debtor.name}</h1>
                                    <p>{debtor.amount}</p>
                                    <p>{debtor.reason}</p>
                                </div>
                            )
                        })}
                    </div>
                )}
                { }
            </div>
        </div>

        // </div>
    )
}