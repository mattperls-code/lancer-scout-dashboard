import React from "react"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "./pages/Home"
import TournamentPage from "./pages/Tournament"
import SchemaPage from "./pages/Schema"
import ScanPage from "./pages/Scan"
import DataPage from "./pages/Data"

import Page from "./components/Page"

const App = () => {
    const siteMap = {
        "/": <HomePage />,
        "tournament": <TournamentPage />,
        "schema": <SchemaPage />,
        "scan": <ScanPage />,
        "data": <DataPage />
    }

    const router = createBrowserRouter(Object.entries(siteMap).map(([ path, element ]) => ({ path, element })))

    return (
        <Page>
            <RouterProvider router={router} />
        </Page>
    )
}

export default App