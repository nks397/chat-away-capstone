import React, {useState, useRef} from "react"
import axios from "axios"

// declare the context
export const UserContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    // get token
    const token = localStorage.getItem("token")
    // similar to postman
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        // converting the (user) string into an object
        user: JSON.parse(localStorage.getItem("user")) || {},
        // getting the token
        token: localStorage.getItem("token") || "",
        members: [],
        errMsg: ""
    }
    
    const [userState, setUserState] = useState(initState)
    const [chat, setChat] = useState("")
    const [msgs, setMsgs] = useState([]);

    const {user} = userState

    const user1 = user._id
    const user2 = chat._id
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    // signup, login, logout
    function signUp(credentials) {
        axios.post("/auth/signup", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState, user, token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }
  
    function login(credentials) {
        userAxios.post("/auth/login", credentials)
        .then(res => {
            const {user, token} = res.data
            console.log(token, "test token login")
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevState => ({
                ...prevState, user, token
            }))
        })
        .catch(err => handleAuthErr(err.response?.data.errMsg))
    }

    function logout() {
        // reset local storage
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem('firstLoad')

        // reset state
        setUserState({
            user: {},
            token: "",
        })
    } 
    
    // handle auth err
    function handleAuthErr(errMsg) {
        // update userState
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    // reset auth err
    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }
    
    // get all users
    function getAllUsers() {
        userAxios.get("/api/users/usersList")
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                members: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    return (
        <UserContext.Provider 
            value={{
                ...userState,
                chat,
                setChat,
                user1,
                user2,
                id,
                msgs,
                setMsgs,
                getAllUsers,
                signUp,
                login,
                logout,
                resetAuthErr
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}