import React, { useState, useEffect } from "react"

const TournamentPage = () => {
    const [input, setInput] = useState("")
    const [tournamentName, setTournamentName] = useState("")

    useEffect(() => {
        if(localStorage.getItem("tournamentName") == null) localStorage.setItem("tournamentName", "Unnamed Tournament")

        setInput(localStorage.getItem("tournamentName"))
        setTournamentName(localStorage.getItem("tournamentName"))
    }, [])

    const handleApply = () => {
        if(confirm(`All entries submitted from now on will be listed under the tournament "${input}". Are you sure you want to continue?`)){
            localStorage.setItem("tournamentName", input)

            setTournamentName(input)
        }
    }

    return (
        <React.Fragment>
            <h1>Welcome to the Tournament Page</h1>
            <div className={"standard-content-container"}>
                <div className={"tournament-info-container"}>
                    <label>
                        Current Tournament Name: <b>{ tournamentName }</b>
                    </label>
                    <hr style={{ width: "540px" }} />
                    <label>
                        New Tournament Name: <input type={"text"} value={input} onChange={(e) => setInput(e.target.value)} />
                    </label>
                    <div className={"button"} onClick={handleApply}>Apply</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TournamentPage