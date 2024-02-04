const calculateTeamAnalytics = (teamPerformances) => {
    const teamAnalytics = {
        numeric: {},
        nonNumeric: {}
    }

    if (teamPerformances.length == 0) return teamAnalytics

    const numericFields = Object.keys(teamPerformances[0]).filter(key => typeof teamPerformances[0][key] == "number")
    const nonNumericFields = Object.keys(teamPerformances[0]).filter(key => typeof teamPerformances[0][key] != "number")

    numericFields.forEach(field => {
        teamAnalytics.numeric[field] = {
            all: [],
            best: 0,
            average: 0,
            worst: 0
        }

        teamPerformances.forEach(performance => {
            teamAnalytics.numeric[field].all.push(performance[field])
            teamAnalytics.numeric[field].average += performance[field]
        })

        teamAnalytics.numeric[field].best = Math.max(...teamAnalytics.numeric[field].all)
        teamAnalytics.numeric[field].worst = Math.min(...teamAnalytics.numeric[field].all)
        teamAnalytics.numeric[field].average /= teamPerformances.length
    })

    nonNumericFields.forEach(field => {
        teamAnalytics.nonNumeric[field] = []

        teamPerformances.forEach(performance => teamAnalytics.nonNumeric[field].push(performance[field]))
    })
    
    return teamAnalytics
}

export default calculateTeamAnalytics