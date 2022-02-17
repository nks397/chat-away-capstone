import React, { useContext, useEffect, useRef, useState } from "react";
// import Conversations from "./Conversations"
import Messages from "./Messages"
// // import { io } from "socket.io-client";
import { UserContext } from "../../context/UserProvider";
import { MembersContext } from "../../context/MembersProvider";

export default function Messenger(props) {
  // const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  // const socket = useRef();
  const {members} = props
  const { user, getUserConversations, conversations, postMessages, getMessages, newConversation, getTwoUsersConversation, messages} = useContext(UserContext);
  const { convoId, memberId} = useContext(MembersContext)
  const scrollRef = useRef();
  
  useEffect(() => {
    getMessages(convoId)
  }, [convoId])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = {
      sender: user._id,
      text: newMessage,
      conversationId: convoId
    }
    // console.log(convoId, "getConvoId")
    // console.log(conversations[1]._id, "tester")
    console.log(msg, "message object")
    
    postMessages(msg)
  };

console.log(messages, "mess")
const convoMembersId = conversations.map(convo => convo.membersArr[1])
  return (
        <div className="chatBox">
          <div className="chatBoxWrapper">
              {convoMembersId ?
              <>
                <div className="chatBoxTop">
                {memberId}
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Messages message={message} senderMessage={message.sender === user._id} />
                    </div>
                  ))}
                </div>
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
              </>
            : 
              <span className="noConversationText">
                Find a member and start chatting.
              </span>
            }
          </div>
        </div>

  );
}