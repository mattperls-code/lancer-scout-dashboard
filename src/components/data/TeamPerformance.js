import React, { useEffect, useState } from "react"

import MultiSegmentDropdownQuery from "../MultiSegmentDropdownQuery"
import SpiderChart from "../SpiderChart"
import ToggleablesList from "../ToggleablesList"

const TeamPerformance = ({ state, setState }) => {
    // multiQuery is what team is currently queried
    // toggleables is what data is displayed on the spider chart 
    const { multiQuery, toggleables } = state

    // the available options for the dropdown
    // updates in downward direction on any mutations
    const [multiQueryOptions, setMultiQueryOptions] = useState({
        match: [],
        team: [],
        record: []
    })

    // on start fetch query options
    useEffect(() => {
        const temp = {...multiQueryOptions}

        // TODO: get all match numbers
        temp.match = [1, 2, 3, 4]

        // TODO: get all teams in selected match
        temp.team = ["Robolancers", "Firebirds", "Daisy"]

        // TODO: get all records of the selected team for the selected match
        temp.record = [1, 2, 3]

        setMultiQueryOptions(temp)
    }, [])

    // update parent state when part of query changes, update dropdown options as needed
    const setMultiQuery = (value) => {
        const temp = {...state}

        temp.multiQuery = value

        // TODO: update multiQueryOptions based on selections

        setState(temp)
    }

    // update parent state on checkbox event for spider chart toggleables
    const setShowAtIndex = (index, value) => {
        const temp = {...state}

        temp.toggleables[index].show = value

        setState(temp)
    }

    // update parent state on label value change for spider chart toggleables
    const setLabelAtIndex = (index, value) => {
        const temp = {...state}

        temp.toggleables[index].label = value

        setState(temp)
    }

    return (
        <div style={{ margin: 0 }}>
            <div style={{ textAlign: "center", paddingTop: 20 }}>
                <MultiSegmentDropdownQuery multiQuery={multiQuery} setMultiQuery={setMultiQuery} multiQueryOptions={multiQueryOptions} />
            </div>
            <h1>
                {
                    `${multiQuery.team || "[N/A]"} in Match #${multiQuery.match || "[N/A]"} (Record ${multiQuery.record || "[N/A]"})`
                }
            </h1>
            {
                (multiQuery.match && multiQuery.team && multiQuery.record) && (
                    <div>
                        <SpiderChart width={400} height={400} data={[
                            {
                                label: "Offense",
                                value: 9,
                                max: 10
                            },
                            {
                                label: "Defense",
                                value: 5,
                                max: 10
                            },
                            {
                                label: "Speed",
                                value: 6,
                                max: 10
                            },
                            {
                                label: "Strength",
                                value: 8,
                                max: 10
                            },
                            {
                                label: "Communication",
                                value: 7,
                                max: 10
                            },
                            {
                                label: "Driver Skill",
                                value: 8,
                                max: 10
                            }
                        ]} />
                        <ToggleablesList toggleables={toggleables} setShowAtIndex={setShowAtIndex} setLabelAtIndex={setLabelAtIndex} />
                    </div>
                )
            }
        </div>
    )
}

export default TeamPerformance