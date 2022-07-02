import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {SettingsContext} from "../context/SettingsProvider"

function Navbar() {
    const { background, themeRef } = useContext(SettingsContext)

    return(
        <div data-theme-background={themeRef.current} className="navbar navBackground">
            {/* Logo */}
            <h2 className="logo">
               <span> <i class="fa-solid fa-message"></i> </span>
                 Chat Away
            </h2>
            <Link style={{color: "white"}} to="/home">Home</Link>
            <Link style={{color: "white"}} to="/settings">Settings</Link>
        </div>
    )
}

export default Navbar