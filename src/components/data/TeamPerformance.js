import React from "react"

const TeamPerformance = ({ state, setState }) => {
    const increment = () => {
        const temp = {...state}

        temp.counter++

        setState(temp)
    }

    return (
        <React.Fragment>
            <h1>Team Performance</h1>
            <p>Counter: { state.counter }</p>
            <p style={{ cursor: "pointer" }} onClick={increment}>Click to increment</p>
        </React.Fragment>
    )
}

export default TeamPerformance