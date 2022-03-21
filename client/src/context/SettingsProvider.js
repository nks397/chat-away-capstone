import React, {useState, useContext} from "react"
import usePersistedState from "use-persisted-state"
import {UserContext} from "./UserProvider"

export const SettingsContext = React.createContext()

export default function SettingsProvider(props) {
    const useThemeState = usePersistedState("theme")
    const useProfilePicState = usePersistedState("imageUrl")
    const {user, updateProfilePic} = useContext(UserContext)
    
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
        profilePic: user.profilePic || "",
    }

    // function onImageChange(e) {
    //     if (e.target.files && e.target.files[0]) {
    //         setImage(URL.createObjectURL(e.target.files[0]))
            
    //     }
    // }
    // 

    const [imageUrl, setImageUrl] = useProfilePicState(initialState.profilePic)

    const cloud_name = "dpvv7zx2x"
    const upload_preset = "r8yzmaqu"

//     const {profilePic} = user
    
//    const [profilePicture, setProfilePicture] = useState(profilePic)


    function handleFileClick() {
        const { files } = document.querySelector(".file-input");
        console.log(files, "files")
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", upload_preset);
        const options = {
            method: "POST",
            body: formData,
            }
            // console.log(formData, "formData")
            // formData is sending a blank object to the backend
        return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options
        )
        .then((res) => res.json())
        .then((res) => {
            setImageUrl(res.secure_url)
            // const user = {
            //     ...prevState.Us
            //     profilePic: imageUrl
            // }
            
            updateProfilePic(imageUrl, user._id)
            // console.log(user, "user in settingsProv")
           
// have to hit upload more than once to see the value override for the profile
// property in local storage. After it does override, after logging out, the overridne data doesnt remain when logging back in
// and it goes back to it's defaulted value

            // send put request to /user/user._id
            // put request will contain res.secure_url and will be put in the body
            // update user state
            // 
            console.log(user, "user object")   
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