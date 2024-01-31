import axios from "axios"

const uploadForm = (formId, formJson, callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"
    const matchNumber = 0 // TODO: read this off of the form json
    const clientFormId = formId
    const jsonValues = formJson

    const body = {
        tournamentName,
        matchNumber,
        teamNumber: 321,
        clientFormId,
        jsonValues
    }

    axios.post("http://localhost:3000/putNewTeamPerformance", body, {
        withCredentials: false
    })
        .then(callback)
        .catch((err) => console.warn("Error occurred uploading form", body, err))
}

const getTeamNames = (callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName
    }

    axios.post("http://localhost:3000/getTeamNames", body)
        .then(callback)
        .catch((err) => console.warn("Error occurred getting team names", body, err))
}

const getMatchNumbersWithTeam = (teamName) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        teamName
    }

    axios.post("http://localhost:3000/getMatchNumbersWithTeam", body)
        .then(callback)
        .catch((err) => console.warn("Error occurred getting match numbers with team", body, err))
}

const getRecordsCount = (teamName, matchNumber, callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        teamName,
        matchNumber
    }

    axios.post("http://localhost:3000/getRecordsCount", body)
        .then(callback)
        .catch((err) => console.warn("Error occurred getting records count", body, err))
}

const getTeamOverview = (teamName, callback) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"

    const body = {
        tournamentName,
        teamName
    }
    
    axios.post("http://localhost:3000/getTeamOverview", body)
        .then(callback)
        .catch((err) => console.warn("Error occurred getting team overview", body, err))
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
        .then(callback)
        .catch((err) => console.warn("Error occurred getting team performance", body, err))
}

const getMatch = (matchNumber) => {
    const tournamentName = localStorage.getItem("tournamentName") ?? "Unnamed Tournament"
    
    const body = {
        tournamentName,
        matchNumber
    }

    axios.post("http://localhost:3000/getMatch", body)
        .then(callback)
        .catch((err) => console.warn("Error occurred getting match", body, err))
}

export {
    uploadForm,
    getTeamNames,
    getMatchNumbersWithTeam,
    getRecordsCount,
    getTeamOverview,
    getTeamPerformance,
    getMatch
}