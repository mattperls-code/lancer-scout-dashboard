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

    // queried form data
    const [queriedData, setQueriedData] = useState({ raw: [], spiderChart: [] })

    // on start or multi query change fetch query options
    useEffect(() => {
        // TODO: use server
        setTimeout(() => {
            setMultiQueryOptions({
                match: [1, 2, 3, 4],
                team: ["Robolancers", "Firebirds", "Daisy"],
                record: [1, 2, 3, 4]
            })
        }, 300)

        // TODO: use server
        setTimeout(() => {
            setQueriedData({
                raw: [],
                spiderChart: [
                    {
                        key: "Offense",
                        value: 9,
                        max: 10
                    },
                    {
                        key: "Defense",
                        value: 5,
                        max: 10
                    },
                    {
                        key: "Speed",
                        value: 6,
                        max: 10
                    },
                    {
                        key: "Strength",
                        value: 10,
                        max: 10
                    },
                    {
                        key: "Driver Skill",
                        value: 8,
                        max: 10
                    },
                    {
                        key: "Communication",
                        value: 9,
                        max: 10
                    },
                    {
                        key: "Cycle Speed",
                        value: 6,
                        max: 10
                    },
                    {
                        key: "Auto Points",
                        value: 4,
                        max: 12
                    },
                    {
                        key: "Teleop Points",
                        value: 67,
                        max: 122
                    }
                ]
            })
        }, 300)
    }, [multiQuery])

    // update parent state when part of query changes, update dropdown options as needed
    const setMultiQuery = (value) => {
        const temp = {...state}

        temp.multiQuery = value

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

    // filter queried spider chart data to only include entries toggled to show
    const toggledSpiderChartData = queriedData.spiderChart.filter(entry => toggleables.some(toggleable => toggleable.show && (toggleable.key == entry.key)))

    toggledSpiderChartData.forEach((entry) => {
        entry.label = toggleables.find(toggleable => toggleable.key == entry.key).label
    })

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
                    <React.Fragment>
                        <hr />
                        <h2>Quantitative Overview</h2>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <SpiderChart width={400} height={400} data={toggledSpiderChartData} />
                            <div className={"vertical-divider"} style={{ height: 400 }} />
                            <ToggleablesList style={{ height: 400 }} toggleables={toggleables} setShowAtIndex={setShowAtIndex} setLabelAtIndex={setLabelAtIndex} />
                        </div>
                        <hr />
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default TeamPerformance