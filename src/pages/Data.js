import React, { useState, useRef, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"

import TeamOverview from "../components/data/TeamOverview"
import TeamPerformance from "../components/data/TeamPerformance"
import TeamComparison from "../components/data/TeamComparison"
import MatchOverview from "../components/data/MatchOverview"

const DataPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const [tabs, setTabs] = useState([])

    const [showAddOptions, setShowAddOptions] = useState(false)
    const addButtonRef = useRef()

    // list of all keys in the schema that point to a numeric data type
    const [toggleableKeys, setToggleableKeys] = useState(["Offense", "Defense", "Speed", "Strength", "Driver Skill", "Communication"])

    useEffect(() => {
        const handleClick = (e) => {
            if(addButtonRef.current && !addButtonRef.current.contains(e.target)){
                setShowAddOptions(false)
            }
        }

        addEventListener("click", handleClick)

        // TODO: fetch toggleableKeys from server

        return () => removeEventListener("click", handleClick)
    }, [])

    const addTab = (tab) => {
        const temp = [...tabs]

        temp.push(tab)

        setCurrentTabIndex(temp.length - 1)
        setTabs(temp)
        setShowAddOptions(false)
    }

    const addTeamOverview = () => addTab({
        type: "Team Overview",
        title: "Team Overview",
        state: {
            counter: 0
        }
    })

    const addTeamPerformance = () => addTab({
        type: "Team Performance",
        title: "Team Performance",
        state: {
            multiQuery: {
                match: null,
                team: null,
                record: null
            },
            toggleables: toggleableKeys.map(key => ({ key, show: true, label: key }))
        }
    })

    const addTeamComparison = () => addTab({
        type: "Team Comparison",
        title: "Team Comparison",
        state: {
            counter: 0
        }
    })

    const addMatchOverview = () => addTab({
        type: "Match Overview",
        title: "Match Overview",
        state: {
            counter: 0
        }
    })

    const tabRenders = []

    tabs.forEach((tab, index) => {
        const deleteTab = (e) => {
            e.stopPropagation()

            const confirmed = confirm("Are your sure you want to delete this tab? You will not be able to recover it.")

            if(confirmed){
                const temp = [...tabs]
                
                temp.splice(index, 1)

                if (index < currentTabIndex || (index == currentTabIndex && index == tabs.length - 1)) setCurrentTabIndex(currentTabIndex - 1)

                setTabs(temp)
            }
        }

        tabRenders.push(
            <div key={index} className={"tab " + ((index == currentTabIndex) ? "active" : "inactive")} onClick={() => setCurrentTabIndex(index)}>
                {
                    tab.title
                }
                <div className={"delete-container"} onClick={deleteTab}>
                    <FontAwesomeIcon icon={faXmark} className={"delete-svg"} />
                </div>
            </div>
        )
    })

    let ContentComponent = () => <h1>You should prolly add some tabs lol</h1>

    if(tabs.length != 0){
        switch(tabs[currentTabIndex].type){
            case "Team Overview":
                ContentComponent = TeamOverview
                break
            case "Team Performance":
                ContentComponent = TeamPerformance
                break
            case "Team Comparison":
                ContentComponent = TeamComparison
                break
            case "Match Overview":
                ContentComponent = MatchOverview
                break
        }
    }

    return (
        <React.Fragment>
            <div className={"tabs-container"}>
                <div className={"add"}>
                    <div ref={addButtonRef} className={"icon-container"} onClick={() => setShowAddOptions(true)}>
                        <FontAwesomeIcon icon={faPlus} className={"icon-svg"} />
                    </div>
                    {
                        showAddOptions && (
                            <div className={"options-menu"}>
                                <div className={"option"} onClick={addTeamOverview}>Team Overview</div>
                                <div className={"option"} onClick={addTeamPerformance}>Team Performance</div>
                                <div className={"option"} onClick={addTeamComparison}>Team Comparison</div>
                                <div className={"option"} onClick={addMatchOverview}>Match Overview</div>
                            </div>
                        )
                    }
                </div>
                {
                    tabRenders
                }
            </div>
            <div className={"tab-content-container"}>
                <ContentComponent state={tabs[currentTabIndex]?.state} setState={(state) => {
                    const temp = [...tabs]

                    temp[currentTabIndex].state = state

                    setTabs(temp)
                }} />
            </div>
        </React.Fragment>
    )
}

export default DataPage