import React, { useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
    const router = useNavigate()

    const environment = import.meta.env.VITE_ENVIRONMENT ?? "development"

    const navigateToRegister = () => router("/register")
    const navigateToLogin = () => router("/login")
    fetch("/api/isloggedin", {
        method: "POST"
    })
        .then((res) => res.json())
        .then((res) => {
            setLoggedIn(res.isLoggedIn)
        })
        .then(() => {
            fetch("/api/isspotifyauthenticated")
                .then((res) => res.json())
                .then((res) => {
                    setSpotifyAuthenticated(Boolean(res))
                    if (res) {
                        setTimeout(() => {
                            router("/us")
                        }, 500)
                    }
                })
        })

    const startAuthFlow = () => {
        const scope = "user-read-recently-played"
        const redirect_uri = environment === "production" ? "https://us.shrapnelnet.co.uk" : "http://localhost:3000/callback"
        const client_id = "dfa8c994b3814a3784a1606ec12fbd8a"
        const response_type = "code"
        const url = "https://accounts.spotify.com/authorize?"
        const params = new URLSearchParams()
        params.set("scope", scope)
        params.set("redirect_uri", redirect_uri)
        params.set("client_id", client_id)
        params.set("response_type", response_type)
        window.location.href = url + params.toString()
    }

    return (
        <React.Fragment>
            {
                loggedIn
                ?
                    <React.Fragment>
                        {
                            spotifyAuthenticated
                            ?
                                <Box>
                                    <Typography>Spotify Authenticated!</Typography>
                                </Box>
                            :
                                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                                    <Button onClick={startAuthFlow} variant={"contained"}>Log in with spotify:3</Button>
                                </Box>
                        }
                    </React.Fragment>
                :
                    <React.Fragment>
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                            <Typography>Pleas register or the thing wont work :(</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                            <Button onClick={navigateToRegister}>Register</Button>
                            <Button onClick={navigateToLogin}>Login</Button>
                        </Box>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}