import React, { useContext, useEffect, useRef, useState } from "react";
// import Conversations from "./Conversations"
import Messages from "./Messages"
// // import { io } from "socket.io-client";
import { UserContext } from "../../context/UserProvider";
import { MembersContext } from "../../context/MembersProvider";
import DeleteButton from "./DeleteButton";
import Checkbox from "./CheckBox";
import { MessageContext } from "../../context/MessageProvider";

import { db, auth, storage } from "../../Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc, 
  Firestore
} from "firebase/firestore";

export default function Messenger(props) {
  // const {chat} = props
  // console.log(chat?.username, "chat props")
  // console.log(chatRef?.current, "props")
  // console.log(props.chatRef, "chat ref in messenger")
  // const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const socket = useRef();
  // const {members} = props
  const { chat, user, getUserConversations, conversations, postMessages, getMessages, newConversation, getTwoUsersConversation, messages, msgs} = useContext(UserContext);
  // const { chatRef} = useContext(MembersContext)
  const scrollRef = useRef();
  
  
  console.log(conversations, "convo2")
  console.log(db, "db")
  
  const user1 = user._id
  // const convoId = conversations.map(convo => convo._id)
  // const convoId = "hi"
  // const [msgs, setMsgs] = useState([]);
// const convoId = conversations.map(convo => user._id === convo.membersArr[0] && ? convo._id : null)
// console.log(convoId, "c id")

// useEffect(() => {
//   // getMessages(convoId)
//   // sender: userId and recipient: chat._id or chat.id
//   // console.log(chat._id, "chat id")
//   // getMessages(user._id, chat._id)
//   // getMessages(chat._id, user._id)
  
// }, [user._id, chat._id])


const user2 = chat._id
const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

const handleSubmit = async (e) => {
    e.preventDefault();
    // const msg = {
      //   sender: user._id,
      //   recipient: chat._id, 
      //   text: newMessage,
      //   // conversationId: convoId
      // }
      
      await addDoc(collection(db, "messages", id, "chat"), {
        text: newMessage,
        sender: user1,
        recipient: user2,
        createdAt: Timestamp.fromDate(new Date()),
        // checked: false
      });
      console.log(db, "db")
      
      await setDoc(doc(db, "lastMsg", id), {
        text: newMessage,
        sender: user1,
        recipient: user2, 
        createdAt: Timestamp.fromDate(new Date()),
        unread: true,
      });
      
      
      // console.log(convoId, "getConvoId")
      // console.log(conversations[1]._id, "tester")
    // console.log(msg, "message object")
    // postMessages(addDoc)
    
    // postMessages(msg)
  };

  // //id for messages
  // const q = collection(db, "messages", id, "chat");
  //   onSnapshot(q, (querySnapshot) => 
  //     querySnapshot.forEach(doc => {
  //       console.log(`${doc.id}`);
  //       console.log("test id")
  //   })
  // );

  // delete messages w/firebase?
  function deleteMsg() {
// put this function on a checkbox/submit button
    // await deleteDoc(doc(db, "messages", id, "chat"));
  }

//   const [isToggled, setIsToggled] = useState(false)
// const [isChecked, setIsChecked] = useState(false)

//   function toggleDeletion() {
//     setIsToggled(prevState => !prevState)
//   }

// const [selectBtn, setSelectBtn] = React.useState(false);

//   const handleChange = () => {
//     setSelectBtn(prevState => !prevState)
//   }

  const {isDelete, selectBtn, handleChange} = useContext(MessageContext)

  // select box is true
  const [selectMsgsBtn, setSelectMsgsBtn] = useState(false)
// console.log(messages, "mess")
// const convoMembersId = conversations?.map(convo => convo.membersArr[1])
const convoMembersId = true

  return (
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//               {convoMembersId ?
//               <>
//                 <div className="chatBoxTop">
               
//                 {/* delete button */}
//                 {/* <button onClick={toggleDeletion}>Delete</button> */}
//                 <button onClick={handleChange}>Select</button>
//                 {isDelete?
//                   <DeleteButton />
//                   : null
//                 }
                
//                 {/* need delete function for button */}
//                 {/* once the delete button is hit it dissapears. this can be
//                 placed in delete function */}
//                   {messages.map((message) => (
//                     <div ref={scrollRef}>
//                     {selectBtn===true?

//                     // when true checkbox for deletion will show
//                     // once the box is checked, submit button will appear
//                     <>
//                     <label>
// {/* which message is being clicked so we can delete theme. we need id. */}
//                     {/* <input type="checkbox" value={message} /> */}
//                     <Checkbox message={message}
//         // label="My Value"
//         // value={checked}
//         // onChange={handleChange}
//       />
//                       <Messages msgs={msgs} message={message} senderMessage={message.sender === user._id} />
                      
//                     </label>
//                     </>
//                       :
//                       // when false, checkboxes will disappear
//                       <Messages message={message} senderMessage={message.sender === user._id} />
//                       }
//                       </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="Start text message here..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             : 
//               <span className="noConversationText">
//                 Find a member and start chatting.
//               </span>
//             }
//           </div>
//         </div>
      <div className="chatBox">
        {/* if selectMessages is true, then checkbox component will appear */}
              <button onClick={() => setSelectMsgsBtn(prev => !prev)}>Select</button>
              
              {msgs.map((msg, index) =>
              <>
              {selectMsgsBtn ? <DeleteButton msgId={msg.id}/> : null}
             
              {/* {selectMsgsBtn ? <Checkbox index={index} msg={msg} /> : null} */}
              <Messages msg={msg} user1={user1} />
              </>
              )}
          <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Start text message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
        </div>

  );
}