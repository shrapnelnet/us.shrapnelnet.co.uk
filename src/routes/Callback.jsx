import React, { useState } from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Callback() {
    const navigate = useNavigate()
    const [denied, setDenied] = useState(false)
    if (document.location.search.includes("access_denied")) {
        setDenied(true)
    }
    const access_code = document.location.search.replace("?code=", "")
    fetch("/api/authorize", {
        method: "POST",
        body: JSON.stringify({access_code})
    })
        .then((res) => res.json())
        .then((res) => {
            const { refresh_token, access_token } = res
            fetch("/api/setcredentials", {
                method: "POST",
                body: JSON.stringify({refresh_token, access_token})
            })
                .then((res) => {
                    if (res.ok) {
                        navigate("/us")
                    }
                })
        })
    return (
        <React.Fragment>
            {
                denied
                ?
                    <React.Fragment>
                        <Typography>:( something fucked up!</Typography>
                    </React.Fragment>
                :
                    null
            }
        </React.Fragment>
    )
}