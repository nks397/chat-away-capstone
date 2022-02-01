// // import React from "react"

// // function Messages(props) {
// //     const {userMsg, timestamps} = props
    
// //     return(
// //         <div>
// //             User's Msg: {userMsg}
// //             <br/>
// //             Timestamp: {timestamps}
// //         </div>
// //     )
// // }

// // export default Messages

// import React, {useContext, useEffect} from "react"
// import { UserContext } from "../../context/UserProvider"

// function Messages() {
//     const {members, getUserConversations, user, conversations} = useContext(UserContext)
//     // const {userMsg, timestamps} = props

//     // console.log(members[0].username, "ssfdss")
//     // console.log(conversations, "convos")
//     console.log(members, "testing")
//     console.log(user, "userobj")
//     useEffect(() => {
//         getUserConversations()
//         console.log("userConvo", conversations)
//     }, [user._id])
    
//     return(
//         <div>
//             {console.log(conversations, "convo")}
//             {/* {members.map(member => 
//               console.log(member, "dsfsf")
//             )} messages */}
//             {/* User's Msg: {userMsg}
//             <br/>
//             Timestamp: {timestamps} */}
//         </div>
//     )
// }

// export default Messages

import { format } from "timeago.js";

export default function Messages({ message, senderMessage }) {
  return (
    <div className={senderMessage ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}