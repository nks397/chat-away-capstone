import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import {SettingsContext} from "../../context/SettingsProvider"
import {UserContext} from "../../context/UserProvider"


function ProfileSidebar(props) {

    const {logout, 
            user: {
                profilePic,
                username, 
                memberSince
            }
        } = props
    // const {username, memberSince} = user
    const {user} = useContext(UserContext)
    const {background} = useContext(SettingsContext)
    const {image, imageUrl, imageUrlRef, onImageChange, themeRef} = useContext(SettingsContext)
    // console.log(props.user, "user profileSidebar")
    console.log(props.user.profilePic, "user prof pic")

// useEffect(()=> {
    
// },[])

    return(
        <div className="profile-sidebar-container">
            <h2 data-theme-background={themeRef.current} className="color profile-title">My Profile</h2>
            <img src={imageUrlRef.current} alt="preview image" className="avatar"/>
            {/* <Avatar style={{backgroundColor: "green"}} size={64} icon={<UserOutlined />} /> */}
            <h3 data-theme-background={themeRef.current} className="color profile-info profile-username">Username: @{username.charAt(0).toUpperCase() + username.slice(1)}</h3>
            <h3 data-theme-background={themeRef.current} className="color profile-info">Member Since: {memberSince}</h3>
            <Link className="profile-info" to="/avatar">Change Profile Picture</Link>
            <br/>
            <Link className="profile-info" to="/theme">Change Theme</Link>
            <br/>
            <button className="profile-info logout-btn" onClick={logout}>Logout</button>
        </div>
    )
}

export default ProfileSidebar