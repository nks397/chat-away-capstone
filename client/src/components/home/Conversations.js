// import React, {useState} from "react"
// import { Input, Button, message } from 'antd'
// // import MapMessages from "./MapMessages"
// import Messages from "./Messages"

// function Conversations(props) {
//     const { TextArea } = Input
//     const {postMessages, newConversation, messages, user} = props

//     const initInputs = {
//         text: messages.text || ""
//     }
    
//     const [textInput, setTextInput] = useState(initInputs)

//     function handleChange(e) {
//         const {name, value} = e.target
//         setTextInput(prevState => ({
//             ...prevState,
//             [name]:value
//         }))
//     }

//     // submitting messages to message array but not persisting
//     console.log(messages, "messages")

//     function handleSentMessage(e) {
//         e.preventDefault()
//         console.log(textInput, "Message sent!")
//         postMessages(textInput)
//         setTextInput(initInputs)
//     }
    
//     // function testing() {
//     //     console.log(newConversation)
//     // }

//     return(
//         <div className="conversation-container">
//             Conversations go here!
//             {/* put message component here (below)*/}
//             {/* {getMessages(conversationId)} */}
//             {/* <MapMessages /> */}
//             <Messages />
            
//             {messages.map((message, index) => 
//             <div className="message-container" key={index}>
//                 <p> {message.text} </p>
//                 <h3 style={{color: "white"}}>sent by @{user.username}</h3>

//             </div>
            
//            )}
//             <div className="text-container">
//                     <Input.Group compact>
//                         <div className="text-input-container"> 
//                             <TextArea
//                                 placeholder="Text here..."
//                                 autoSize={{ minRows: 2, maxRows: 2 }}
//                                 name="text"
//                                 value={textInput.text}
//                                 onChange={handleChange}
//                             /> 
//                         </div> 
//                         <Button style={{height: "8.7vh"}} size="large" type="primary" onClick={(e)=>handleSentMessage(e)}>Send</Button>
//                     </Input.Group>
                
//               {/* <input 
//               className="text-input"
//                 type="text"
//                 /> */}
//             {/* <button>Send</button>   */}
//             </div>
            
//         </div>
//     )
// }

// export default Conversations

// import axios from "axios";
import { useEffect, useState } from "react";
import SearchMembers from "./SearchMembers";

export default function Conversations({ convo, currentUser }) {

  useEffect(() => {
    const friendId = convo.membersArr.find((member) => member !== currentUser._id);
    console.log(friendId, "friend")
   
  }, []);

  return (
    <div className="conversation">
      {/* <input type="text"/> */}
      {/* <SearchMembers /> */}
     
      {/* <span className="conversationName">{user.username}</span> */}
    </div>
  );
}