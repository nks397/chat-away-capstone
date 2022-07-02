import React, {useContext, useEffect} from "react"
import { SettingsContext } from "../../context/SettingsProvider"
import { UserContext } from "../../context/UserProvider"

function ChangeProfilePic() {
 const {imageUrl, imageUrlRef, handleFileClick, onImageChange} = useContext(SettingsContext)
const {user, updateProfilePic} = useContext(UserContext)

const {profilePic} = user

console.log(user, "user from change prof pic")
// console.log(updateProfilePic, "upd")

    return (
        <div className="change-profile-container">
            <div className="image-container">
            <h1>Change Profile Picture</h1>
                {/* <form action='/api/images' method="post" encType="multipart/form-data"> */}
                {/* <form> */}
                
                <form action='/api/images' method="post" encType="multipart/form-data">
                {/* seems like "action" prop doesnt know where to send back data */}
                <div className="image-wrapper">
                    {/* <img src={imageUrl} alt="preview image" className="preview-image"/> */}
                    <img src={imageUrlRef.current} alt="preview image" className="preview-image"/>
                </div>
                <div className="file-wrapper">
                    {/* <input type="file" onChange={onImageChange} className="file-input"/> */}
                    {/* <input type="file" className="file-input"/> */}
                    <input type='file' name='image' className="file-input" onChange={onImageChange}/>
                    {/* get value of file input and put in placeholder of imageUrl in updateProfilePic function */}
                </div>

                <button style={{color: "black"}} onClick={handleFileClick}>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default ChangeProfilePic