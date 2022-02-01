import React, {useContext, useEffect, useState} from "react"
import { SettingsContext } from "../../context/SettingsProvider"

function ChangeProfilePic() {
 const {image, onImageChange} = useContext(SettingsContext)
    
console.log(image, "imagees")
    return (
        <div className="change-profile-container">
            <div className="image-container">
            <h1>Change Profile Picture</h1>
                <div className="image-wrapper">
                    <img src={image} alt="preview image" className="preview-image"/>
                </div>
                <div className="file-wrapper">
                    <input type="file" onChange={onImageChange} className="file-input"/>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePic