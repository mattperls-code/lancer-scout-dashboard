import React from "react"

const ToggleablesList = ({ toggleables, setShowAtIndex, setLabelAtIndex }) => {
    const toggleableRenders = []

    toggleables.forEach((toggleable, index) => {
        toggleableRenders.push(
            <div key={index} className={"toggleable"}>
                <input type={"checkbox"} checked={toggleable.show} onChange={() => setShowAtIndex(index, !toggleable.show)} />
                <div className={"label"}>
                    {
                        "\"" + toggleable.key + "\" as \""
                    }
                    <input type={"text"} value={toggleable.label} onChange={(e) => {
                        setLabelAtIndex(index, e.target.value)
                    }} />
                    {
                        "\""
                    }
                </div>
            </div>
        )
    })

    return (
        <div className={"toggleables"}>
            {
                toggleableRenders
            }
        </div>
    )
}

export default ToggleablesList