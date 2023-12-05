import React, { useState } from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Callback() {
    const [denied, setDenied] = useState(false)
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const environment = import.meta.env.VITE_ENVIRONMENT ?? "development"
    const navigate = useNavigate()
    if (document.location.search.includes("access_denied")) {
        setDenied(true)
    }
    const initialAccessCode = document.location.search.replace("?code=", "")
    const headers = new Headers()
    headers.set("Authorization", `Basic ${btoa(`${client_id}:${client_secret}`)}`)
    headers.set("Content-Type", "application/x-www-form-urlencoded")
    const body = new URLSearchParams()
    body.set("grant_type", "authorization_code")
    body.set("code", initialAccessCode)
    body.set("redirect_uri", environment === "production" ? "https://us.shrapnelnet.co.uk" : "http://localhost:3000/callback")
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers,
        body
    })
        .then((res) => res.json())
        .then((res) => {
            if (!res.access_token || !res.refresh_token) {
                return
            }
            fetch("/api/setcredentials", {
                method: "POST",
                body: JSON.stringify({ refresh_token: res.refresh_token, access_token: res.access_token })
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