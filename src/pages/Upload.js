import React, { useRef, useEffect } from "react"

import Webcam from "react-webcam"
import jsqr from "jsqr"
import { generateDataFromBuffer } from "../scripts/dataBuffer"
import { uploadForm } from "../scripts/api"

// TODO: use server

// todo: shouldn't be hard coded
const testForm = [{"title":"General","ui":{"type":"header"}},{"title":"Scout Name","ui":{"type":"text"},"dataType":"string"},{"title":"Match Number","ui":{"type":"number"},"dataType":"8bit"},{"title":"Team","ui":{"type":"dropdown","options":["321 RoboLancers","427 Lance-A-Bot","433 Firebirds"]},"dataType":"6bit"},{"title":"Alliance","ui":{"type":"radio","options":["Red","Blue"]},"dataType":"1bit"},{"title":"Autonomous","ui":{"type":"header"}},{"title":"Lane","ui":{"type":"radio","options":["Bump","No Bump","Charging Station"]},"dataType":"2bit"},{"title":"Auto Cubes Low","ui":{"type":"number"},"dataType":"2bit"},{"title":"Auto Cubes Mid","ui":{"type":"number"},"dataType":"2bit"},{"title":"Auto Cubes High","ui":{"type":"number"},"dataType":"2bit"},{"title":"Auto Cones Low","ui":{"type":"number"},"dataType":"2bit"},{"title":"Auto Cones Mid","ui":{"type":"number"},"dataType":"2bit"},{"title":"Auto Cones High","ui":{"type":"number"},"dataType":"2bit"},{"title":"Successfully Taxied","ui":{"type":"toggle"},"dataType":"boolean"},{"title":"Auto Balance","ui":{"type":"radio","options":["Not Applicable","Engaged","Docked"]},"dataType":"2bit"},{"title":"Teleop","ui":{"type":"header"}},{"title":"Teleop Cubes Low","ui":{"type":"number"},"dataType":"6bit"},{"title":"Teleop Cubes Mid","ui":{"type":"number"},"dataType":"6bit"},{"title":"Teleop Cubes High","ui":{"type":"number"},"dataType":"6bit"},{"title":"Teleop Cones Low","ui":{"type":"number"},"dataType":"6bit"},{"title":"Teleop Cones Mid","ui":{"type":"number"},"dataType":"6bit"},{"title":"Teleop Cones High","ui":{"type":"number"},"dataType":"6bit"},{"title":"Endgame","ui":{"type":"header"}},{"title":"Time Left When Starting Balance","ui":{"type":"radio","options":["0-10 Seconds","10-20 Seconds","20-30 Seconds","30+ Seconds"]},"dataType":"2bit"},{"title":"Time Taken To Balance","ui":{"type":"radio","options":["0-5 Seconds","5-10 Seconds","10-15 Seconds","15+ Seconds"]},"dataType":"2bit"},{"title":"Teleop Balance","ui":{"type":"radio","options":["Not Applicable","Engaged","Docked"]},"dataType":"2bit"},{"title":"Teleop Balance Partners","ui":{"type":"radio","options":["Not Applicable","Alone","1 Partner","2 Partners"]},"dataType":"2bit"},{"title":"Post Game","ui":{"type":"header"}},{"title":"Team Points Scored","ui":{"type":"number"},"dataType":"8bit"},{"title":"Penalties","ui":{"type":"number"},"dataType":"6bit"},{"title":"Quality Of Defense","ui":{"type":"slider"},"dataType":"4bit"},{"title":"Quality Under Defense","ui":{"type":"slider"},"dataType":"4bit"},{"title":"Speed","ui":{"type":"slider"},"dataType":"4bit"},{"title":"Driver Skill","ui":{"type":"slider"},"dataType":"4bit"},{"title":"Cycle Speed","ui":{"type":"radio","options":["Slow","Medium","Fast"]},"dataType":"2bit"},{"title":"Broke Down / Disconnected","ui":{"type":"toggle"},"dataType":"boolean"},{"title":"Comments","ui":{"type":"text"},"dataType":"string"}]

const form = testForm.filter(e => e.ui.type != "header")

const UploadPage = () => {
    const webcamRef = useRef()

    useEffect(() => {
        let finishedScanning = true

        const scan = (e) => {
            if (!finishedScanning) return alert("Existing upload task has not been resolved yet. Please allow the pending upload to finish before starting a new upload. If this issue persists, try refreshing the page or contact a developer.")
            else finishedScanning = false

            if (e.code != "Space") return

            const snapshot = webcamRef.current.getScreenshot()

            const tempImg = new Image()
            tempImg.src = snapshot
            tempImg.onload = () => {
                const canvas = document.createElement("canvas")
                canvas.width = 640
                canvas.height = 480

                const ctx = canvas.getContext("2d")
                
                ctx.drawImage(tempImg, 0, 0, 640, 480)
                const imageData = ctx.getImageData(0, 0, 640, 480)

                const output = jsqr(imageData.data, 640, 480)

                if(output == null){
                    finishedScanning = true

                    alert("Failed to scan qr code. Make sure the image is not blurry and contains a valid qr code.")
                } else {
                    const buffer = []

                    for (let i = 0;i<output.data.length;i++) buffer.push(output.data.charCodeAt(i))

                    const data = generateDataFromBuffer(buffer, form)

                    if(data == null){
                        finishedScanning = true
                        
                        return alert("Failed to parse QR code. Make sure the schema on the app matches the schema stored on the server.")
                    }

                    const receipt = {
                        id: data.id,
                        entries: Object.fromEntries(form.map((entry, index) => {
                            const value =  entry.ui.hasOwnProperty("options") ? entry.ui.options[data.entries[index]] : data.entries[index]
                            
                            return [ entry.title, value ]
                        }))
                    }

                    console.log({ receipt })

                    uploadForm(receipt.id, receipt.entries, () => {
                        finishedScanning = true

                        alert("Successfully uploaded form. Receipt is available in the console if needed.")
                    })
                }
            }
        }

        window.addEventListener("keydown", scan)

        return () => window.removeEventListener("keydown", scan)
    }, [])

    return (
        <React.Fragment>
            <h1>Welcome to the Upload Page</h1>
            <div style={{ textAlign: "center" }}>
                <Webcam style={{ borderRadius: "10px" }} ref={webcamRef} mirrored />
                <h2>Press Space to Scan and Upload</h2>
            </div>
        </React.Fragment>
    )
}

export default UploadPage