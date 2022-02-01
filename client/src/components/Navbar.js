import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {SettingsContext} from "../context/SettingsProvider"

function Navbar() {
    const { background } = useContext(SettingsContext)

    return(
        <div data-theme-background={background} className="navbar navBackground">
            Logo
            <Link style={{color: "white"}} to="/home">Home</Link>
            <Link style={{color: "white"}} to="/settings">Settings</Link>
        </div>
    )
}

export default Navbar