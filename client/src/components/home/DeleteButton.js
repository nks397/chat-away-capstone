import React, { useState, useContext } from "react"
import {UserContext} from "../../context/UserProvider"
import { db, auth, storage } from "../../Firebase";
import {
  collection,
  query,
  writeBatch,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  Firestore,
  deleteDoc,
  deleteDocs
} from "firebase/firestore";




function DeleteButton(props) {
    const {deleteMessages, messages, mappedMsg, msgs, user, chat} = useContext(UserContext)
    const user1 = user._id
    const user2 = chat._id
  
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
      
    // const messageId = messages.map(msg => msg._id)
    // console.log(messageId, "messId")
    const [deletedData, setDeletedData] = useState()
    console.log(msgs[0].checked, "chec")
    

  async function handleDelete(msgId) {
    console.log(msgId, "test msgid")
    console.log(id, "test id")
    // console.log(doc(db, "message", id, "chat", msgId), "test await")
     await deleteDoc(doc(db, "messages", id, "chat", msgId))
    
    // multiple docs

    // Get a new write batch
// const batch = writeBatch(db);

// // Delete 
// const msgRef = doc(db, "messages", id, "chat", msgId)
// batch.delete(msgRef);
    
// // Commit the batch
// await batch.commit();
    
    // console.log(test, "test await") 
    // define document location (Collection Name > Document Name > Collection Name >)
// collection("messages").doc(id).collection("chat").doc(msgId).deleteDoc()
// console.log(, "dbb")
// delete the document
// docRef.doc(msgId).delete();

    // const msgRef = collection(db, "messages", id, "chat")
    //     const docSnap = await getDocs(msgRef)
    //     console.log(docSnap.empty, "dsnap")
    //     if(!docSnap.empty()){
    //         alert("Document doesnt exist")
    //         return
    //     }
    //     await deleteDoc(msgRef)
    //     .then(() => {
    //         alert("Data deleted successfully")
    //     })
    //     .catch((error) => {
    //         alert("Unsuccessful operation"+ error)
    //     })
        //     if(msgs[0].checked === true) {
    // const msgsRef = collection(db, "messages", id, "chat")
    // onSnapshot(msgsRef, querySnapshot => {
    //     querySnapshot.forEach((doc) => {
    //         doc.ref.delete()
    //         console.log("deleted okay")
    
    //     })
    // })
    //     }



        // if checkbox is selected, delete item


        // } else {
        //     console.log("fail")
        // }
        // const m = msgs.filter(msg => msg.id == messageId)
        // console.log(msgs, "test msgs")
        // setDeletedData(deleteData)
        // console.log(deleteData, "deleteData")
    }
    

    return(
        <div>
            {/* <button onClick={deleteMessages(messageId)}>Delete</button> */}
            <button onClick={() => handleDelete(props.msgId)}>Delete</button>
            
        </div>
    )
}

export default DeleteButton