import React, { useEffect, useState } from "react"
import { Box, Icon, Typography } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function Us() {
    const [tylerSrc, setTylerSrc] = useState("/sadmac.png")
    const [tylerArtist, setTylerArtist] = useState("")
    const [tylerName, setTylerName] = useState("")
    const [tobiSrc, setTobiSrc] = useState("/sadmac.png")

    useEffect(() => {
        fetch("/api/currentlyplaying", {
            method: "POST",
            body: JSON.stringify({username: "tyler"})
        })
            .then((res) => res.json())
            .then((res) => {
                setTylerSrc(res.image)
                setTylerArtist(res.artist)
                setTylerName(res.name)
            })
    }, [])

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", textAlign: "center" }}>
                    <Typography>Tyler is listening to:</Typography>
                    <img width={300} height={300} src={tylerSrc} alt="what tyler is listening to" />
                    <Typography>{tylerName}</Typography>
                    <Typography>by {tylerArtist}</Typography>
                </Box>
                <Icon sx={{ margin: "0 50px" }}>
                    <FavoriteIcon sx={{ color: "red" }} />
                </Icon>
                <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", textAlign: "center" }}>
                    <Typography>Tobi is listening to:</Typography>
                    <img width={300} height={300} src={tobiSrc} alt="what tobi is listening to" />
                </Box>
            </Box>
        </React.Fragment>
    )
}