import React, {useContext, useEffect} from "react"
import { SettingsContext } from "../../context/SettingsProvider"
import { UserContext } from "../../context/UserProvider"

function ChangeProfilePic() {
 const {imageUrl, handleFileClick} = useContext(SettingsContext)
const {user} = useContext(UserContext)

const {profilePic} = user

console.log(user, "user from change prof pic")
console.log(imageUrl, "imageUrl")

    return (
        <div className="change-profile-container">
            <div className="image-container">
            <h1>Change Profile Picture</h1>
                <form action='/api/images' method="post" encType="multipart/form-data">
                <div className="image-wrapper">
                    {/* <img src={imageUrl} alt="preview image" className="preview-image"/> */}
                    <img src={profilePic} alt="preview image" className="preview-image"/>
                </div>
                <div className="file-wrapper">
                    {/* <input type="file" onChange={onImageChange} className="file-input"/> */}
                    {/* <input type="file" className="file-input"/> */}
                    <input type='file' name='image' className="file-input"/>
                
                </div>

                <button style={{color: "black"}} onClick={handleFileClick}>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default ChangeProfilePic