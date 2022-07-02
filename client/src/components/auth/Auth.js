import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../../context/UserProvider"
import AuthForm from "./AuthForm"
// inputs for user credentials

const initInputs = {
    username: "",
    password: "",
    // profilePic: ""
}

function Auth() {
    // state, handleChange, handleSignUp, handleLogin, toggleForm

    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const {signUp, login, errMsg, resetAuthErr} = useContext(UserContext)


    function handleChange(e) {
        // console.log(e.target)
        // to grab the user inputs, target the name and value of the inputs
        // e.target
        // setInputs
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            // don't know what this is doing
            [name]: value
        }))
    }

    // signUp
    function handleSignUp(e) {
        e.preventDefault()
        signUp(inputs)
    }

    // login
    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    // toggle in between signUp and login forms
    function toggleForm() {
        setToggle(prevToggle => !prevToggle)
        resetAuthErr()
    }

    return (
        <div className="auth-container">
            <h1> Welcome to Chat Away!</h1>
            {!toggle?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignUp}
                        inputs={inputs}
                        btnText="Sign Up"
                        errMsg={errMsg}
                    />
                    <p className="authMsg" onClick={toggleForm}>Already a member?</p>
                </>
                :
                <>
                    <AuthForm 
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText="Login"
                        errMsg={errMsg}
                    />
                    <p className="authMsg" onClick={toggleForm}>Not a member?</p>
                </>
                

            }
        </div>
    )
}

export default Auth