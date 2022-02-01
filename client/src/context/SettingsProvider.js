import React, {useState} from "react"
import usePersistedState from "use-persisted-state"


export const SettingsContext = React.createContext()

export default function SettingsProvider(props) {
    const useThemeState = usePersistedState("theme")
    const useProfilePicState = usePersistedState("image")

    // settings for changing themes
    const [theme, setTheme] = useThemeState({background: "light"})

    // const [options, setOptions] = useLocalStorage("options", {background: "light"})

    
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

    const [image, setImage] = useProfilePicState(initialState.defaultPic)
    
    function onImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
            
        }
    }
    
    return (
        <SettingsContext.Provider 
            value={{
                theme,
                setTheme,
                background,
                onChange,
                image,
                onImageChange
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )
}