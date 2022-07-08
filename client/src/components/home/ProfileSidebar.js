import React, {useContext} from "react"
import {Link} from "react-router-dom"
import 'antd/dist/antd.css'
import {SettingsContext} from "../../context/SettingsProvider"

function ProfileSidebar(props) {

    const {logout, 
            user: {
                username, 
                memberSince
            }
        } = props
        
    const {imageUrlRef, themeRef} = useContext(SettingsContext)
    
    const date = new Date(memberSince)
    const dateFormat = date.toDateString()

    return(
        <div className="profile-sidebar-container">
            <h2 data-theme-background={themeRef.current} className="color profile-title">My Profile</h2>
            <img src={imageUrlRef.current} alt="preview image" className="avatar"/>
            <h3 data-theme-background={themeRef.current} className="color profile-info profile-username"> {`Welcome ${username.charAt(0).toUpperCase() + username.slice(1)}!`}</h3>
            <h3 data-theme-background={themeRef.current} className="color profile-info">{`Member Since: ${dateFormat}`}</h3>
            <Link className="profile-info" to="/avatar">Change Profile Picture</Link>
            <br/>
            <Link className="profile-info" to="/theme">Change Theme</Link>
            <br/>
            <button className="profile-info logout-btn" onClick={logout}>Logout</button>
        </div>
    )
}

export default ProfileSidebar