import React, {useState, useRef} from "react"

export const MembersContext = React.createContext()

export default function MembersProvider(props) {
    const initInputs = {
        searchTerm: "",
        username: "",
        password: "",
    }

    const [inputs, setInputs] = useState(initInputs)
    const [selectMsgsBtn, setSelectMsgsBtn] = useState(false)
    const chatRef = useRef({})

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]:value
        })) 
    }

    return (
        <MembersContext.Provider 
            value={{
                inputs,
                setInputs,
                selectMsgsBtn,
                setSelectMsgsBtn,
                chatRef,
                handleChange
            }}
        >
            {props.children}
        </MembersContext.Provider>
    )
}