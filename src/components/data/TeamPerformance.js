import React, { useEffect, useState } from "react"

import MultiSegmentDropdownQuery from "../MultiSegmentDropdownQuery"
import SpiderChart from "../SpiderChart"
import ToggleablesList from "../ToggleablesList"
import QualitativeData from "../QualitativeData"
import { getMatchNumbers, getMaximums, getRecordsCount, getTeamPerformance, getTeamsInMatchNumber } from "../../scripts/api"

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
    const [queriedData, setQueriedData] = useState([])
    const numericQueriedData = queriedData.filter((entry) => typeof entry.value == "number")
    const nonNumericQueriedData = queriedData.filter((entry) => typeof entry.value != "number")

    // global max values in numerical fields which are used to normalize spider chart data
    const [axisMaximums, setAxisMaximums] = useState({})
    
    // on start retrieve these maximums
    useEffect(() => {
        getMaximums((maximums) => {
            setAxisMaximums(maximums)
        })
    }, [])

    // on start or multi query change fetch query options
    useEffect(() => {
        getMatchNumbers((matchNumbers) => {
            getTeamsInMatchNumber(Number(multiQuery.match), (teamNames) => {
                getRecordsCount(Number(multiQuery.match), multiQuery.team, (recordsCount) => {
                    const recordNumbers = (new Array(recordsCount).fill()).map((_, i) => i)
                    
                    setMultiQueryOptions({
                        match: matchNumbers,
                        team: teamNames,
                        record: recordNumbers
                    })
                })
            })
        })

        if (multiQuery.team && multiQuery.match && multiQuery.record) getTeamPerformance(multiQuery.team, Number(multiQuery.match), Number(multiQuery.record), (data) => {
            setQueriedData(Object.entries(data[0].jsonScoutInput).map(e => ({ key: e[0], value: e[1] })))
        })
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
    const toggledSpiderChartData = numericQueriedData.filter(entry => toggleables.some(toggleable => toggleable.show && (toggleable.key == entry.key)))

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
                            <SpiderChart width={400} height={400} data={toggledSpiderChartData} axisMaximums={axisMaximums} />
                            <div className={"vertical-divider"} style={{ height: 400 }} />
                            <ToggleablesList style={{ height: 400 }} toggleables={toggleables} setShowAtIndex={setShowAtIndex} setLabelAtIndex={setLabelAtIndex} />
                        </div>
                        <hr />
                        <h2>Qualitative Overview</h2>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <QualitativeData entries={nonNumericQueriedData} />
                        </div>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default TeamPerformance