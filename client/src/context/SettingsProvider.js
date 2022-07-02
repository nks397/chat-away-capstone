import React, {useState, useContext, useEffect, useRef} from "react"
import usePersistedState from "use-persisted-state"
import {UserContext} from "./UserProvider"
import axios from "axios"

export const SettingsContext = React.createContext()

export default function SettingsProvider(props) {
    const useThemeState = usePersistedState("theme")
    const useProfilePicState = usePersistedState("imageUrl")
    const {user} = useContext(UserContext)
    
const userAxios = axios.create()

const initState = {
    // converting the (user) string into an object
    user: JSON.parse(localStorage.getItem("user")) || {},

    // getting the token
    token: localStorage.getItem("token") || "",

    // where the messages will be stored
    messages: [],

    // all users arr
    members: [],
    
    conversations: [],
    
    errMsg: ""
}

const [userState, setUserState] = useState(initState)

    userAxios.interceptors.request.use(config => {
        // get token
        const token = localStorage.getItem("token")
        // similar to postman
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    // settings for changing themes
    
    // const initialThemeState = {
    //     theme: user.theme || ""
    // }

    const initialState = {
        profilePic: user.profilePic || "",
        theme: user.theme || ""
    }
    

    // const [theme, setTheme] = useThemeState(initialThemeState.theme)
    // const [theme, setTheme] = useState(initialThemeState.theme)
    console.log(user.theme, "user.theme")
    
    // const {background} = theme
    
    // console.log(theme, "theme")
    // console.log(background, "background")
    
    
    function updateUserTheme(updatedTheme, userId) {
        userAxios.put(`/api/users/updateUserTheme/${userId}`, updatedTheme)
        // get theme's value to change in state here
        // .then((res) => console.log(res.data, "themeData"))
        .then(res => {
            console.log(res.data, "res theme data")
            const {user} = userState
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.getItem("user")
            // user object doesn't match what is being sent back
            // what's being sent back doesn't match what's being clicked
            // setUserState(prevState => ({...prevState, user: res.data}))
            setUserState(prevState => ({user: {...prevState.user, theme: res.data.theme}}))

            // setUserState(prevState => ({...prevState, theme: res.data.theme}))
            console.log(user, "user in theme")
        })
        .catch(err => console.log(err.response.data.errMsg))
        // figure out how to change this state's value based on the radios that are clicked
    }
    
    // const themeObject = {
    //     theme: background
    // }
    // console.log(themeObject, "themeObj")
    
    // value for theme in state is not persisting upon refresh
    // the value for theme in state is behind
    
    const themeRef = useRef(initialState.theme)
    
    
    function onChange(e) {
        // see if i can use useRef
        // const {name, value} = e.target
        // see if i can target the value and the name for useRef
        themeRef.current = e.target.value
        // themeRef.current = {[name]: value}

        console.log(themeRef.current, "test ref")
        // setTheme(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }))
        
        // setTheme is causing state to be a value behind
        const themeObject = {
            theme: themeRef.current
        }
        
        console.log(themeRef, "theme ref")
        // console.log(background, "background")
        // console.log(theme, "theme state")
        console.log(themeObject, "theme object")
        updateUserTheme(themeObject, user._id)
    }

    // get value from user object and pass it into the change theme function
    // call changeTheme inside of use effect
console.log(themeRef.current, "refff")
    // function renderTheme(userId) {
    //     userAxios.get(`/api/users/getUserTheme/${userId}`)
    //     .then(res => themeRef.current = res.data)
    //     // console.log(value, "value?")
    //     // themeRef.current = value
    //     // value equals user.theme which is dark
    //     // const themeValue = value
    //     // console.log(themeValue, "is renderTheme working")
    // }

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

    // function renderProfilePic(userId) {
    //     userAxios.get(`/api/users/getUserPic/${userId}`)
    //     .then(res => imageUrlRef.current = res.data)
    //     // .then(res => console.log(res.data, "data"))
    //     // imageUrlRef.current = value
    //     // const picValue = value
    //     // console.log(picValue, "is renderPic working")
    // }
    
    // settings for changing profile picture
    // const initialState = {
    //     profilePic: user.profilePic || "",
    // }
    

    const [image, setImage] = useState()

    function onImageChange(event) {
      setImage(event.target.files[0])
    }
    console.log(image, "imageee")

//     const [imageUrl, setImageUrl] = useProfilePicState(initialState.profilePic)
// console.log(initialState.profilePic, "test prof pic")
    const cloud_name = "dpvv7zx2x"
    const upload_preset = "r8yzmaqu"


function updateProfilePic(profilePic, userId) {
    console.log(userId, "userId")
       
    userAxios.put(`/api/users/updateProfilePic/${userId}`, {profilePic})
    .then(res => {
        console.log(res.data, "update profile data")
        // add error handling
        console.log(".then is hit")
        console.log(res, "res upd")
        console.log(profilePic, "image body")
        const {user} = userState
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.getItem("user")
        // console.log(user, "user from userstate")
        setUserState(prevState => ({
            ...prevState,
            // user: {...prevState.user, profilePic: image}
            user: {...prevState.user, profilePic: res.data.profilePic}
            // user: {...prevState.user, profilePic: image}
            // profilePic: {...prevState.user.profilePic, image}
        // need to update profile pic from state
        }))
        console.log(user, "user upd")

        // console.log(profilePic, "update user object")
        console.log(res.data, "ress")
    })
    .catch(err => console.log(err.response.data.errMsg))

}

const imageUrlRef = useRef(initialState.profilePic)
console.log(imageUrlRef, "ref for image")

    function handleFileClick(e) {
    e.preventDefault()
        // const { files } = document.querySelector(".file-input");
        // console.log(files[0], "files")
        // console.log(upload_preset, "upload preset")
        const formData = new FormData();
        // formData.append("file", files[0]);
        formData.append("file", image)
        formData.append("upload_preset", upload_preset);
        const options = {
            method: "POST",
            body: formData,
            }
        
            console.log(options, "options")
        return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options
        )
        .then((res) => res.json())
        .then((res) => {
            console.log(res, "response")
            // setImageUrl(res.secure_url)
            // using useRef because update to cloudinary was behind when using useState
            imageUrlRef.current = res.secure_url
            // const object = {
            //     profilePic:
            // }
            // when login in profile pic appears when refreshed???
            updateProfilePic(imageUrlRef.current, user._id)
            console.log(user._id, "user id")
            // console.log(imageUrl, "img url")
            console.log(res, "res.file")
            // const user = {
            //     ...prevState.Us
            //     profilePic: imageUrl
            // }
            
            // updateProfilePic(imageUrl, user._id)

            // console.log(user, "user in settingsProv")
           
// have to hit upload more than once to see the value override for the profile
// property in local storage. After it does override, after logging out, the overridne data doesnt remain when logging back in
// and it goes back to it's defaulted value

            // send put request to /user/user._id
            // put request will contain res.secure_url and will be put in the body
            // update user state
            // 
            // console.log(user, "user object")   
        })
       
       .catch((err) => console.log(err));
       
    }

    
    
    
    return (
        <SettingsContext.Provider 
            value={{
                // theme,
                // setTheme,
                // themeObject,
                themeRef,
                // renderTheme,
                // renderProfilePic,
                getUserSettings,
                // updateUserTheme,
                // themeRef,
                // background,
                onChange,
                handleFileClick,
                // imageUrl,
                imageUrlRef,
                onImageChange
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )
}