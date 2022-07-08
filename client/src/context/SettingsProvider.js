import React, {useState, useRef} from "react"
import axios from "axios"

export const SettingsContext = React.createContext()

export default function SettingsProvider(props) {
    
    const userAxios = axios.create()

    const initState = {
        // converting the (user) string into an object
        user: JSON.parse(localStorage.getItem("user")) || {},

    }

    const [userState, setUserState] = useState(initState)
    const [image, setImage] = useState()


    const {user} = userState

    userAxios.interceptors.request.use(config => {
        // get token
        const token = localStorage.getItem("token")
        // similar to postman
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    // settings for changing themes

    const initialSettingsState = {
        profilePic: user.profilePic || "",
        theme: user.theme || ""
    }

    const themeRef = useRef(initialSettingsState.theme)
    const imageUrlRef = useRef(initialSettingsState.profilePic)

    console.log(user.theme, "user.theme")
    
    function updateUserTheme(updatedTheme, userId) {
        userAxios.put(`/api/users/updateUserTheme/${userId}`, updatedTheme)
        .then(res => {
            console.log(res.data, "res theme data")
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.getItem("user")
            setUserState(prevState => ({user: {...prevState.user, theme: res.data.theme}}))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function onThemeChange(e) {
        themeRef.current = e.target.value

        const themeObject = {
            theme: themeRef.current
        }

        updateUserTheme(themeObject, user._id)
    }

    function getUserSettings(userId) {
        userAxios.get(`/api/users/getUserSettings/${userId}`)
        .then(res => {
            const {theme, profilePic} = res.data
            themeRef.current = theme
            imageUrlRef.current = profilePic
            console.log(themeRef, "test theme ref")
            console.log(imageUrlRef, "test pic ref")
        })
    }

    function onImageChange(event) {
      setImage(event.target.files[0])
    }

    const cloud_name = "dpvv7zx2x"
    const upload_preset = "r8yzmaqu"


    function updateProfilePic(profilePic, userId) {
        userAxios.put(`/api/users/updateProfilePic/${userId}`, {profilePic})
        .then(res => {
            console.log(res.data, "update profile data")
            console.log(".then is hit")
            console.log(res, "res upd")
            console.log(profilePic, "image body")
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.getItem("user")
            setUserState(prevState => ({
                ...prevState,
                user: {...prevState.user, profilePic: res.data.profilePic}
            }))
            console.log(user, "user upd")

            console.log(res.data, "ress")
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function handleFileClick(e) {
    e.preventDefault()
        const formData = new FormData();
        formData.append("file", image)
        formData.append("upload_preset", upload_preset);
        const options = {
            method: "POST",
            body: formData,
            }
        
        return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options
        )
        .then((res) => res.json())
        .then((res) => {
            console.log(res, "response")
            // using useRef because update to cloudinary was behind when using useState
            imageUrlRef.current = res.secure_url
            updateProfilePic(imageUrlRef.current, user._id)
            console.log(user._id, "user id")
            console.log(res, "res.file")  
        })
       .catch((err) => console.log(err));
    }

    return (
        <SettingsContext.Provider 
            value={{
                themeRef,
                getUserSettings,
                onThemeChange,
                handleFileClick,
                imageUrlRef,
                onImageChange
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )
}