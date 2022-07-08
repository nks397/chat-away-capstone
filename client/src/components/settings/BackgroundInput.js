import React from "react"

function BackgroundInput(props) {
    const {value} = props

    return(
        <div>
            <input
                type="radio" 
                id={value} 
                name="background"
                value={value}
            />
        </div>
    )
}

export default BackgroundInput