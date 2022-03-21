import React, {useState} from "react"
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
    // inputs : signup and login, search for users to message, text box for messages
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
    // const [conversation, setConversation] = useState([])

    // signup, login, logout
    function signUp(credentials) {
        axios.post("/auth/signup", credentials)
        .then(res => {
            // console.log(res, "res")
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
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            // getMessage()
            setUserState(prevState => ({
                ...prevState, user, token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        // reset local storage
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("imageUrl")

        // reset state
        setUserState({
            user: {},
            token: "",
            messages: []

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

// add react/component (extension) to web browser
    // crud operations

    // get messages based on conversationId
    function getMessages(conversationId) {
        userAxios.get(`/api/message/getMsg/${conversationId}`)
        // .then(res => console.log(res, "res"))
        .then(res => {
            setUserState(prevState => ({
                ...prevState, 
                messages: res.data
            }))
            console.log(res.data, "messages for convoId")
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    // get all users
    function getAllUsers() {
        userAxios.get("/api/users/usersList")
        // .then(res=> console.log(res.data, "get all users"))
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                members: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // add messages (semi-working!)
    function postMessages(newMessage) {
        userAxios.post("/api/message/addMsg", newMessage)
        // .then(res => console.log(res.data, "posted messages"))
        .then(res => {
            setUserState(prevState => ({
                ...prevState, messages: [...prevState.messages, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // create update user profile function
    // change profile picture axios put request
    // store picUrl in profilePic property
    function updateProfilePic(profilePic, userId) {
        userAxios.put(`/api/users/profilePicture/${userId}`, profilePic)
        .then(res => {
            const {user} = userState
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.getItem("user")
            console.log(user, "user from userstate")
            setUserState(prevState => ({
                ...prevState, 
                user: {...prevState.user, profilePic}
            }))
            console.log(profilePic, "update user object")
            // console.log(res.data, "ress")
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    // call function in handleFileClick function

    //update user's theme
    function updateUserTheme(updatedTheme, userId) {
        userAxios.put(`/api/users/updateUserTheme/${userId}`, updatedTheme)
        .then(res => console.log(res.data))
    }

    // function createConversation(recipients) {
    //     setConversations(prevConversations => {
    //       return [...prevConversations, { recipients, messages: [] }]
    //     })
    //   }
    

    // conversation

    // new conversation
    function newConversation(newConvo) {
        userAxios.post(`api/conversation/postConvo`, newConvo)
        // .then(res => console.log(res.data, "newConvo"))
        .then(res => {
            setUserState(prevState => ({
                ...prevState, conversations: [...prevState.conversations, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // get all conversations of signed in user
    function getUserConversations(userId){
        userAxios.get(`/api/conversation/${userId}`)
        // .then(res => console.log(res.data, "getUserConvos"))
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                conversations: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // get conversations that include the signed in user and another member
    function getTwoUsersConversation(firstUserId, secondUserId) {
        userAxios.get(`api/conversation/${firstUserId}/${secondUserId}`)
        // .then(res => console.log(res.data, "getTwoUserConvo"))
        .then(res => {
            console.log(res.data, "2 convo res")
            setUserState(prevState => ({
            ...prevState,
            conversations: res.data
        }))})
    }


    return (
        <UserContext.Provider 
            value={{
                // spread in the user object, user token, messages array, and error message empty string
                ...userState,
                getMessages,
                newConversation,
                getUserConversations,
                getTwoUsersConversation,
                postMessages,
                getAllUsers,
                updateProfilePic,
                updateUserTheme,
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