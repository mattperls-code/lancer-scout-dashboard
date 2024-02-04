import axios from "axios"

const uploadForm = (formId, formJson, callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"
    const matchNumber = 0 // TODO: read this off of the form json
    const teamName = formJson["Team"] // TODO: read this off of the form json
    const clientFormId = formId
    const jsonValues = formJson

    const body = {
        tournamentName,
        matchNumber,
        teamName,
        clientFormId,
        jsonValues
    }

    axios.post("http://localhost:3000/putNewTeamPerformance", body, {
        withCredentials: false
    })
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred uploading form", body, err))
}

const getMatchNumbers = (callback) => {
    return callback([ 0 ])

    // const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    // const body = {
    //     tournamentName
    // }

    // axios.post("http://localhost:3000/getMatchNumbers")
    //     .then(({ data }) => callback(data.data))
    //     .catch((err) => console.warn("Error occurred getting match numbers", body, err))
}

const getTeamNames = (callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName
    }

    axios.post("http://localhost:3000/getTeamNames", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting team names", body, err))
}

const getMatchNumbersWithTeam = (teamName, callback) => {
    return callback([ 1, 2, 3, 4 ])

    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        teamName
    }

    axios.post("http://localhost:3000/getMatchNumbersWithTeam", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting match numbers with team", body, err))
}

const getTeamsInMatchNumber = (matchNumber, callback) => {
    if (matchNumber == null) return callback([])
    
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        matchNumber
    }

    axios.post("http://localhost:3000/getTeamsInMatch", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting teams in match number", body, err))
}

const getRecordsCount = (matchNumber, teamName, callback) => {
    if (matchNumber == null || teamName == null) return callback([])

    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        matchNumber,
        teamName
    }

    axios.post("http://localhost:3000/getRecordsCount", body)
        .then(({ data }) => callback(data))
        .catch((err) => console.warn("Error occurred getting records count", body, err))
}

const getNumericFields = (callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName
    }

    axios.post("http://localhost:3000/getNumericFields", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting maximums", body, err))
}

const getMaximums = (callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName
    }

    axios.post("http://localhost:3000/getSchemaMaxima", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting maximums", body, err))
}

const getTeamPerformance = (teamName, matchNumber, recordNumber, callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        teamName,
        matchNumber,
        recordNumber
    }
    
    axios.post("http://localhost:3000/getTeamPerformance", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting team performance", body, err))
}

const getTeamOverview = (teamName, callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        teamName
    }
    
    axios.post("http://localhost:3000/getTeamOverview", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting team overview", body, err))
}

const getMatch = (matchNumber, callback) => {
    return callback([])

    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"
    
    const body = {
        tournamentName,
        matchNumber
    }

    axios.post("http://localhost:3000/getMatch", body)
        .then(({ data }) => callback(data.data))
        .catch((err) => console.warn("Error occurred getting match", body, err))
}

export {
    uploadForm,
    getMatchNumbers,
    getTeamNames,
    getMatchNumbersWithTeam,
    getTeamsInMatchNumber,
    getRecordsCount,
    getNumericFields,
    getMaximums,
    getTeamPerformance,
    getTeamOverview,
    getMatch
}