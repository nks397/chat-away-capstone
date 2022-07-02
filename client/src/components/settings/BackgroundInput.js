import React, {useContext, useEffect} from "react"
import {UserContext} from "../../context/UserProvider"
import {SettingsContext} from "../../context/SettingsProvider"

function BackgroundInput(props) {
    const {value, defaultChecked} = props

    const {user, updateUserTheme} = useContext(UserContext)
    const { background, onChange, themeObject, themeRef } = useContext(SettingsContext)


    // for theme prop's value, try bringing in the value from the radios when clicked

    console.log(background, "background")
    console.log(user, "userObj")

    // useEffect(() => {
    //     updateUserTheme(themeObject, user._id)
    //     console.log(user._id, "user id")
    //     console.log(themeObject, "theme")
    // }, [])

    return(
        <div>
            <input
                type="radio" 
                id={value} 
                name="background"
                value={value}
                // ref={themeRef}
                // defaultChecked={defaultChecked}
            />
        </div>
    )
}

export default BackgroundInput