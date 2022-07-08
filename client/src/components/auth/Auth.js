import React, { useState, useContext, useEffect } from "react"
import { MembersContext } from "../../context/MembersProvider"
import { UserContext } from "../../context/UserProvider"
import AuthForm from "./AuthForm"

function Auth() {
    const [toggle, setToggle] = useState(false)
    const {signUp, login, errMsg, resetAuthErr} = useContext(UserContext)
    const {inputs, handleChange} = useContext(MembersContext)

    const credentials = {
        username: inputs.username,
        password: inputs.password
    }
    
    // signUp
    function handleSignUp(e) {
        e.preventDefault()
        // signUp(inputs)
        signUp(credentials)

    }

    // login
    function handleLogin(e) {
        e.preventDefault()
        login(credentials)
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
                        inputs={credentials}
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