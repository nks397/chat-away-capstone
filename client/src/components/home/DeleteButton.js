import React, { useContext } from "react"
import { UserContext } from "../../context/UserProvider"
import { db } from "../../Firebase"
import {
  doc,
  deleteDoc
} from "firebase/firestore"

function DeleteButton(props) {
  const {msgId} = props
  const {id} = useContext(UserContext)

  async function handleDelete(msgId) {
    await deleteDoc(doc(db, "messages", id, "chat", msgId))
  }

  return(
    <div>
      <button className="delete-btn" onClick={() => handleDelete(msgId)}>Delete</button>
    </div>
  )
}

export default DeleteButton