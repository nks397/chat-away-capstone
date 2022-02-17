import React, {useContext} from "react"
import { SettingsContext } from "../../context/SettingsProvider"

function ChangeProfilePic() {
 const {imageUrl, handleFileClick} = useContext(SettingsContext)
    
console.log(imageUrl, "imageUrl")
    return (
        <div className="change-profile-container">
            <div className="image-container">
            <h1>Change Profile Picture</h1>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="preview image" className="preview-image"/>
                </div>
                <div className="file-wrapper">
                    {/* <input type="file" onChange={onImageChange} className="file-input"/> */}
                    <input type="file" className="file-input"/>
                
                </div>
                <button style={{color: "black"}} onClick={handleFileClick}>Upload</button>
            </div>
        </div>
    )
}

export default ChangeProfilePic