import React from "react"
import {Link} from "react-router-dom"
function Settings() {
    return(
            <div className="settings-container">
                <h1><i class="fas fa-user-cog"></i> User Settings</h1>
                <hr/>
                <Link className="settings-link" to="/avatar">Change Avatar</Link>
                <hr/>
                <Link className="settings-link" to="/theme">Change Theme</Link>
                <hr/>
                <h1><i class="fas fa-info-circle"></i> App Info</h1>
                <hr/>
                <Link className="settings-link" to="/about">About</Link>
                <hr/>
                <Link className="settings-link" to="/contact">Contact</Link>
            </div>
    )
}

export default Settings