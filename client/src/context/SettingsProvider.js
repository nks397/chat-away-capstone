import React, {useState, useContext} from "react"
import usePersistedState from "use-persisted-state"
// import {UserContext} from "./UserProvider"

export const SettingsContext = React.createContext()

export default function SettingsProvider(props) {
    const useThemeState = usePersistedState("theme")
    const useProfilePicState = usePersistedState("imageUrl")
    // const {user} = useContext(UserContext)
    
    // settings for changing themes
    const [theme, setTheme] = useThemeState({background: "light"})
    const {background} = theme
    
    function onChange(e) {
        const {name, value} = e.target
        setTheme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // settings for changing profile picture
    const initialState = {
        // profilePic: user.profilePic || "",
        defaultPic: "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
    }

    // function onImageChange(e) {
    //     if (e.target.files && e.target.files[0]) {
    //         setImage(URL.createObjectURL(e.target.files[0]))
            
    //     }
    // }
    // 

    const [imageUrl, setImageUrl] = useProfilePicState(initialState.defaultPic)

    const cloud_name = "dpvv7zx2x"
    const upload_preset = "r8yzmaqu"

//     const {profilePic} = user
    
//    const [profilePicture, setProfilePicture] = useState(profilePic)

    function handleFileClick() {
        const { files } = document.querySelector(".file-input");
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", upload_preset);
        const options = {
            method: "POST",
            body: formData,
            }
        return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options
        )
        .then((res) => res.json())
        .then((res) => {
            setImageUrl(res.secure_url)
            
            // console.log(user, "user object")
            
        })
       
       .catch((err) => console.log(err));
    }
    
    return (
        <SettingsContext.Provider 
            value={{
                theme,
                setTheme,
                background,
                onChange,
                handleFileClick,
                imageUrl
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )
}