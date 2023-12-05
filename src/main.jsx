// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./globals.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from "./routes/Register.jsx"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import Login from "./routes/Login.jsx"
import Callback from "./routes/Callback.jsx"
import Us from "./routes/Us.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/callback",
        element: <Callback />
    },
    {
        path: "/us",
        element: <Us />
    }
])

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1a1a1a"
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
    </ThemeProvider>
)