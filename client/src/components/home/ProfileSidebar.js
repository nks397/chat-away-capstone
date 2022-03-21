import React, {useContext} from "react"
import {Link} from "react-router-dom"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import {SettingsContext} from "../../context/SettingsProvider"



function ProfileSidebar(props) {

    const {logout, 
            user: {
                profilePic,
                username, 
                memberSince
            }
        } = props
    // const {username, memberSince} = user
    const {background} = useContext(SettingsContext)
    const {image, imageUrl, onImageChange} = useContext(SettingsContext)

    console.log(props.user, "user profileSidebar")

    return(
        <div className="profile-sidebar-container">
            <h2 data-theme-background={background} className="color">My Profile</h2>
            <img src={profilePic} alt="preview image" className="avatar"/>
            {/* <Avatar style={{backgroundColor: "green"}} size={64} icon={<UserOutlined />} /> */}
            <h3 data-theme-background={background} className="color">Username: @{username}</h3>
            <h3 data-theme-background={background} className="color">Member Since: {memberSince}</h3>
            <Link to="avatar">Change Profile Picture</Link>
            <br/>
            <Link to="theme">Change Theme</Link>
            <br/>
            <button style={{color: "black"}} onClick={logout}>Logout</button>
        </div>
    )
}

export default ProfileSidebar