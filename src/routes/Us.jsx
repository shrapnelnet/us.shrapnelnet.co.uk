import React, { useEffect, useState } from "react"
import { Box, Icon, Typography } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function Us() {
    const [tylerSrc, setTylerSrc] = useState("/sadmac.png")
    const [tylerArtist, setTylerArtist] = useState("")
    const [tylerName, setTylerName] = useState("")
    const [tobiSrc, setTobiSrc] = useState("/sadmac.png")
    const [tobiArtist, setTobiArtist] = useState("")
    const [tobiName, setTobiName] = useState("")

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

        fetch("/api/currentlyplaying", {
            method: "POST",
            body: JSON.stringify({username: "tobi"})
        })
            .then((res) => res.json())
            .then((res) => {
                setTobiSrc(res.image)
                setTobiArtist(res.artist)
                setTobiName(res.name)
            })
    }, [])

    return (
        <React.Fragment>
            <Box id={"main"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", textAlign: "center" }}>
                    <Typography sx={{ paddingBottom: "15px" }}>Tyler is listening to:</Typography>
                    <img width={300} height={300} src={tylerSrc} alt="what tyler is listening to" />
                    <Typography sx={{ marginTop: "20px" }}>{tylerName}</Typography>
                    <Typography>by {tylerArtist}</Typography>
                </Box>
                <Icon sx={{ margin: "0 50px" }}>
                    <FavoriteIcon sx={{ color: "red" }} />
                </Icon>
                <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", textAlign: "center" }}>
                    <Typography sx={{ paddingBottom: "15px" }}>Tobi is listening to:</Typography>
                    <img width={300} height={300} src={tobiSrc} alt="what tobi is listening to" />
                    <Typography sx={{ marginTop: "20px" }}>{tobiName}</Typography>
                    <Typography>by {tobiArtist}</Typography>
                </Box>
            </Box>
        </React.Fragment>
    )
}