import React, {useState, useContext} from "react"
import {MessageContext} from "../../context/MessageProvider"
import {UserContext} from "../../context/UserProvider"
import { db } from "../../Firebase";
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
  Firestore,
  getDocs
} from "firebase/firestore";
import CheckableTag from "antd/lib/tag/CheckableTag";

function Checkbox({ label, value, onChange, message, msg}) {
  const {isDelete, setIsDelete} = useContext(MessageContext)
 
const {user, getAllUsers, newConversation, conversations, getTwoUsersConversation, chat, setChat} = useContext(UserContext)
  // console.log(msg, "msg checkbox")
const user1 = user._id
const user2 = chat._id
const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

const [isChecked, setIsChecked] = useState(false)

// function handleCheckbox(e, messageId) {
function handleCheckbox() {

  setIsChecked(!isChecked)
  
      
      // const [checked, setChecked] = useState([]);

      
      // if checked, store the checked id (from msg arr) array
      // if unchecked, remove the id from the array
      // if(e.target.checked) {
      //   console.log("box is checked/true")
      //   console.log(messageId, "messageId")

          // if(!isChecked){
          //   msg.checked = true
          //   checkedArr.push(msg)
          //   console.log(msg, "msg object")
          //   console.log(checkedArr, "checkedArr")
          // } else {
          //   msg.checked = false
          //   console.log(msg, "msg object")

          //   console.log("remove checked item")
          // }

    
      //   // checkedArr.push(index)
      //   // console.log(checkedArr, "checkedArr")
      //     // // if id is true, store message object for deletio
        
      //     //retrieve one document and save it to userDetails

      //     // console.log(arrayForDeletion, "arr for delete")
      // }
      //   else if(!e.target.checked) {
      //     console.log("box is unchecked/false")
      //   // console.log(arrayForDeletion.remove(msg.text), "arr remove")

      //   }
  }

return (
      <label>
        {/* <input type="checkbox" checked={value} onChange={onChange} /> */}
        <input type="checkbox" checked={isChecked} onChange={handleCheckbox} />
        <p>The checkbox is {isChecked ? "checked" : "unchecked"}</p>
        {/* <input type="checkbox" id="checkbox" checked={isChecked} /> */}
        {label}
      </label>
    )

}

export default Checkbox