import React from "react"

function BackgroundInput(props) {
    const {value, defaultChecked} = props

    return(
        <div>
            <input
                type="radio" 
                id={value} 
                name="background" 
                value={value}
                // defaultChecked={defaultChecked}
            />
        </div>
    )
}

export default BackgroundInput