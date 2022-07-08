import React, {useContext} from "react"
import { SettingsContext } from "../../context/SettingsProvider"

function ChangeProfilePic() {
    const {imageUrlRef, handleFileClick, onImageChange} = useContext(SettingsContext)

    return (
        <div className="change-profile-container">
            <div className="image-container">
                <h1>Change Profile Picture</h1>
                <form action='/api/images' method="post" encType="multipart/form-data">
                    <div className="image-wrapper">
                        <img src={imageUrlRef.current} alt="preview image" className="preview-image"/>
                    </div>
                    <div className="file-wrapper">
                        <input type='file' name='image' className="file-input" onChange={onImageChange}/>
                    </div>
                    <button style={{color: "black"}} onClick={handleFileClick}>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default ChangeProfilePic