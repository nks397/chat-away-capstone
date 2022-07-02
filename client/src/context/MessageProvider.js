import React, {useState, useContext} from "react"
import { UserContext } from "./UserProvider";

export const MessageContext = React.createContext()

export default function MessageProvider(props) {
    // const {messages} = useContext(UserContext);

  const [isDelete, setIsDelete] = useState(false)
  
  const [selectBtn, setSelectBtn] = React.useState(false);

  const handleChange = () => {
    setSelectBtn(prevState => !prevState)
  }
  // const messageId = messages.map(msg => msg._id)
  // console.log(messageId, "msgId")
  
  // function selectedMsg() {
  //   console.log(messageId, "messy")
  //   if(messageId) {
  //     setIsDelete(prevState => !prevState)
  //   } else {
  //     console.log(false)
  //   }
  // }

    return(
        <MessageContext.Provider 
            value={{
              isDelete,
              setIsDelete,
              selectBtn,
              handleChange
            }}
        >
            {props.children}
        </MessageContext.Provider>
    )
}