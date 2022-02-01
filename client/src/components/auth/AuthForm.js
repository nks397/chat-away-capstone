import React, {useState} from "react"

function AuthForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnText, 
        errMsg,
        inputs: {
            username,
            password
        }
    } = props
    // console.log(props, "props")

    const [showPassword, setShowPassword] = useState(false)

    function togglePassword() {
        setShowPassword(prevToggle => !prevToggle)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
                placeholder="Username"
            />
            <input 
                // type="password"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
            />
            {/* <i class="far fa-eye" id="togglePassword" onClick={togglePassword}></i> */}
            
            <button>{btnText}</button>
            <p style={{color: "red"}}>{errMsg}</p>
        {console.log(errMsg, "msg")}
        </form>
    )
}

export default AuthForm