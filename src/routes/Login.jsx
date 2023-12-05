import React, { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const router = useNavigate()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleRegister = () => {
        if (!username.length || !password.length) {
            setError("You need to fill in both fields. dummy.")
            return
        }
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
        })
            .then((res) => {
                if (res.ok) {
                    setError("")
                    setSuccess("Signed in! Redirecting to main page...")
                    setTimeout(() => {
                        router("/")
                    }, 500)
                } else {
                    setError("Account not found!")
                }
            })
    }

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", alignContent: "center", marginTop: "2%", flexDirection: "column", width: "300px" }}>
                    <TextField required onChange={handleUsernameChange} label={"Username"} sx={{ marginBottom: "20px" }} />
                    <TextField type={"password"} required onChange={handlePasswordChange} label={"Password"} sx={{ marginBottom: "20px" }} />
                    <Button onClick={handleRegister} variant={"contained"}>Login</Button>
                    <Typography sx={{ color: "lime", marginTop: "20px" }}>{success}</Typography>
                    <Typography sx={{ color: "red" }}>{error}</Typography>
                </Box>
            </Box>
        </React.Fragment>
    )
}