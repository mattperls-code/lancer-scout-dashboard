import React, { useEffect, useState } from "react"

import { getMaximums, getTeamNames, getTeamOverview } from "../../scripts/api"
import arrayUnique from "array-unique"
import calculateTeamAnalytics from "../../scripts/analytics"
import ToggleablesList from "../ToggleablesList"
import MultiSpiderChart from "../MultiSpiderChart"
import QualitativeData from "../QualitativeData"
import ScatterPlot from "../ScatterPlot"

const TeamOverview = ({ state, setState }) => {
    // query is what team is currently queried
    // toggleables is what data is displayed on the spider chart 
    const { query, toggleables, xAxisKey, yAxisKey } = state

    // the available options for the dropdown
    const [queryOptions, setQueryOptions] = useState([])

    // queried form data
    const [queriedData, setQueriedData] = useState([])
    const teamAnalytics = calculateTeamAnalytics(queriedData)

    const spiderChartData = Object.entries(teamAnalytics.numeric).map(([ key, analysis ]) => ({ key, best: analysis.best, average: analysis.average, worst: analysis.worst }))

    // global max values in numerical fields which are used to normalize spider chart data
    const [axisMaximums, setAxisMaximums] = useState({})

    // on start retrieve team names and maximums
    useEffect(() => {
        getTeamNames(setQueryOptions)

        getMaximums((maximums) => {
            setAxisMaximums(maximums)
        })
    }, [])

    useEffect(() => {
        if (query) getTeamOverview(query, setQueriedData)
    }, [query])

    const setQuery = (newQuery) => {
        const temp = {...state}

        temp.query = newQuery

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

    const setXAxisKey = (key) => {
        const temp = {...state}

        temp.xAxisKey = key

        setState(temp)
    }

    const setYAxisKey = (key) => {
        const temp = {...state}

        temp.yAxisKey = key

        setState(temp)
    }
    
    const options = []

    arrayUnique(queryOptions).forEach((option) => {
        options.push(
            <option key={option}>
                {
                    option
                }
            </option>
        )
    })

    // filter queried spider chart data to only include entries toggled to show
    const toggledSpiderChartData = spiderChartData.filter(entry => toggleables.some(toggleable => toggleable.show && (toggleable.key == entry.key)))

    toggledSpiderChartData.forEach((entry) => {
        entry.label = toggleables.find(toggleable => toggleable.key == entry.key).label
    })

    return (
        <div style={{ margin: 0 }}>
            <div style={{ textAlign: "center", paddingTop: 20 }}>
                <div className={"query-segments"}>
                    <div className={"query-segment"}>
                        Team
                        <select value={query || ""} onChange={(e) => {
                            setQuery(e.target.value || null)
                        }}>
                            <option />
                            {
                                options
                            }
                        </select>
                    </div>
                </div>
            </div>
            <h1>
                {
                    `${query || "[N/A]"} Team Overview`
                }
            </h1>
            {
                query && (
                    <React.Fragment>
                        <hr />
                        <h2>Quantitative Overview</h2>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <MultiSpiderChart width={400} height={400} data={toggledSpiderChartData} axisMaximums={axisMaximums} />
                            <div className={"vertical-divider"} style={{ height: 400 }} />
                            <ToggleablesList style={{ height: 400 }} toggleables={toggleables} setShowAtIndex={setShowAtIndex} setLabelAtIndex={setLabelAtIndex} />
                        </div>
                        <hr />
                        <h2>Relational Analysis</h2>
                        <div style={{ width: "max-content", margin: "auto" }}>
                            <ScatterPlot width={800} height={400} style={{ marginBottom: "10px" }} xAxisData={teamAnalytics.numeric[xAxisKey]?.all || []} xAxisMax={axisMaximums[xAxisKey]} yAxisData={teamAnalytics.numeric[yAxisKey]?.all || []} yAxisMax={axisMaximums[yAxisKey]} />
                            <div className={"axis-selector"}>Dependent Variable (Vertical): <select value={yAxisKey || ""} onChange={(e) => setYAxisKey(e.target.value)}>
                                <option />
                                {
                                    (() => {
                                        const options = []

                                        Object.keys(teamAnalytics.numeric).forEach((option, index) => {
                                            options.push(
                                                <option key={index}>
                                                    {
                                                        option
                                                    }
                                                </option>
                                            )
                                        })

                                        return options
                                    })()
                                }
                            </select></div>
                            <div className={"axis-selector"}>Independent Variable (Horizontal): <select value={xAxisKey || ""} onChange={(e) => setXAxisKey(e.target.value)}>
                                <option />
                                {
                                    (() => {
                                        const options = []

                                        Object.keys(teamAnalytics.numeric).forEach((option, index) => {
                                            options.push(
                                                <option key={index}>
                                                    {
                                                        option
                                                    }
                                                </option>
                                            )
                                        })

                                        return options
                                    })()
                                }
                            </select></div>
                        </div>
                        <hr />
                        <h2>Qualitative Overview</h2>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <QualitativeData entries={Object.entries(teamAnalytics.nonNumeric).map(([ key, value ]) => ({ key, value }))} />
                        </div>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default TeamOverview