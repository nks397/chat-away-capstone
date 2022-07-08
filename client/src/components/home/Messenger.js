import React, { useContext, useState } from "react"
import Messages from "./Messages"
import { UserContext } from "../../context/UserProvider"
import { MembersContext } from "../../context/MembersProvider"
import DeleteButton from "./DeleteButton"
import { db } from "../../Firebase"
import {
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc,
} from "firebase/firestore"

export default function Messenger() {

  const [newMessage, setNewMessage] = useState("")
  const {msgs, user1, user2, id} = useContext(UserContext)
  const {selectMsgsBtn} = useContext(MembersContext)

  async function handleSubmit(e) {
    e.preventDefault()
  
    await addDoc(collection(db, "messages", id, "chat"), {
      text: newMessage,
      sender: user1,
      recipient: user2,
      createdAt: Timestamp.fromDate(new Date()),
    })
  }

  return (
    <div className="chat-box">
      <div className="messages">
        {msgs.map(msg =>
        <>
        {selectMsgsBtn? <DeleteButton msgId={msg.id}/> : null}
        <Messages msg={msg} user1={user1} />
        </>
        )}
      </div>
      <div className="chat-box-bottom">
        <textarea
          className="chat-message-input"
          placeholder="Start text message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
        <button className="chat-submit-btn" onClick={handleSubmit}>
          Send
        </button>
        <button className="chat-clear-btn" onClick={()=>setNewMessage("")}>
          Clear
        </button>
      </div>
    </div>
  )
}