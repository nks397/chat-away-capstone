import React, { useState, useContext, useRef } from "react"
// import { Avatar } from "antd"
// import { UserOutlined } from '@ant-design/icons'
import {Link} from "react-router-dom"
import { Input, Space } from 'antd'
import { UserContext } from "../../context/UserProvider"
import Members from "./Members"
import {MembersContext} from "../../context/MembersProvider"
// import UserProvider from "../../context/UserProvider"
// import Chat from "./Chat"
// import ProtectedRoute from "../ProtectedRouted"
import Messenger from "./Messenger"

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
} from "firebase/firestore";

const { Search } = Input

function SearchMembers() {
    const {members} = useContext(UserContext)
// console.log(members.map(mem => mem.username), "search state")


const {capitalizeFirstLetter} = useContext(MembersContext)
    const initInputs = {
        searchTerm: ""
    }

    const [searchInput, setSearchInput] = useState(initInputs)
    const [memberId, setMemberId] = useState(null)
    const [convoId, setConvoId] = useState("no id grabbed")
    const {user, getAllUsers, newConversation, conversations, getTwoUsersConversation, chat, setChat, msgs, setMsgs} = useContext(UserContext)
        
    function handleChange(e) {
        // console.log("I'm searched!")
        const {name, value} = e.target
        setSearchInput(prevState => ({
            ...prevState,
            [name]:value
        }))
        console.log(value, "value")
        
    }

    // const [chat, setChat] = useState("")
    // const chatRef = useRef("")
    // function checkForDuplicates(array) {
    //     return new Set(array).size !== array.length
    //   }

    //   function toFindDuplicates(arry) {
    //     const uniqueElements = new Set(arry);
    //     arry.filter(item => {
    //         if (uniqueElements.has(item)) {
    //             // uniqueElements.delete(item);
    //           // console.log("hi")
    //         // } else {
    //             return item;
    //         }
    //     });
    
    //     return [...new Set(uniqueElements)]
    // }
  const user1 = user._id
  const user2 = chat._id
  
  
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
  
  
  console.log(members, "memberss")
    const filteredMembers = members?.filter(member => {
        
                if(searchInput.searchTerm === "") {
                    console.log(typeof member.username, "returning all members type")
                    console.log(member.username, "returning all members")
                    
                    return member.username
                }
                // if username includes the characters that are typed in the search box, return usernames
                else if(member.username.toLowerCase().includes(searchInput.searchTerm.toLowerCase())) {
                    console.log(member.username, "returning filtered members that includes the search term")
                    return member.username
                }
            })
            .map(member => member._id !== user._id ? 
                
                
                
                <>
                    
                           <p onClick={() => {
                               if(member.username){
                                // change chat from state to ref
                                   setChat(member)
                                   console.log(chat, "Chat test")
                                   // console.log(chatRef, "chat")
                                // console.log(member, "mem username")
                                // chatRef.current = member.username
                                // console.log(chatRef.current, "name onclick")
                    // chatRef.current ? console.log("is clicked") : console.log("no click")

                               }
                               // get last message b/w logged in user and selected user
                               const msgsRef = collection(db, "messages", id, "chat");
                               const q = query(msgsRef, orderBy("createdAt", "asc"));
                               
                               onSnapshot(q, (querySnapshot) => {
                                   let msgsArr = [];
                                   querySnapshot.forEach((doc) => {
                                       msgsArr.push({id: doc.id, checked: false, ...doc.data()});
                                       // push {id: doc.id, ...doc.data()} also
                                       console.log(msgsArr, "msgs arr")
                                       console.log(doc, "doc")
                                    });
                                    setMsgs(msgsArr);
                                });
                                console.log(msgs, "msgs state")
                                //     console.log(docSnap, "test snap")
                                
                                
                                //    //    if(convo)
                                //    newConversation({senderId: user._id, recipientId: member._id})
                                //    const memberArrCheck = conversations.map(convos => convos.membersArr)
                                // //    console.log(checkForDuplicates(memberArrCheck), "tester duplicates")
                                //    const duplicateElements = toFindDuplicates(conversations);
                                //    console.log(duplicateElements, "dupl");
                                //    console.log(conversations,"tester object")
                                //    console.log(memberArrCheck, "test mems")
                                
                                // try to get all users in members arr except for the one that is logged in
                                // 
                                
                                // conversations.map(convo => 
                                //     convo.membersArr[0] === user._id &&
                                //     convo.membersArr[1] === member._id ?
                                //     // console.log("members match dont create new convo for them") :
                                //     null:
                                //     newConversation({senderId: user._id, recipientId: member._id})
                                
                                
                                // console.log("members dont match create new convo")
                                // )
                                //   conversations.map(convo => console.log(convo.membersArr, "members match arrayy"))
                                // if there are duplicate membersArr[2] values in array, then delete that membersArr from
                                // conversation array then grab that convo that was first created for that membersArr
                                // console.log(convos, "c h 2")
                                
                                // console.log("no convo created yet")
                                //    getTwoUsersConversation({firstUserId: user._id, secondUserId: member._id})
                                //    console.log( member._id, "memId")
                                //    only create convo id once. getting convo id from "newConversation"
                                // if memArr[0] and [1], dont duplicate
                                // if conversation is already created for the sender and recipient, dont create more
                                // const convoId = conversations.map(convo => convo._id)
// console.log(convoId, "c id 2")
                            //    console.log(conversations, "convos")
                           }}> 
                            
                        {/* <img className="members-avatar" src={member.profilePic} alt="image" /><span>{` ${member.username}`}</span> */}
                        <img className="members-avatar" src={member.profilePic} alt="image" /><span className="members-name">{` ${capitalizeFirstLetter(member)}`}</span>
                          
                        {/* {console.log(convoId, "convId")} */}
                    
                    </p>
                </>
                :
                null
                
                )

    return(
        <div className="members-container">
             {/* <form>
                <input type="text" placeholder="Search..."/>
                <button>Submit</button>
            </form> */}
            <div className="input-container">
            <Space direction="vertical">
                <Search
                    type="text"
                    value={searchInput.searchTerm}
                    name="searchTerm"
                    placeholder="Search Members" 
                    // onSearch={onSearch}
                    onChange={handleChange}
                    className="search-input"
                    style={{ width: 200, position: "fixed"}}
                    // size="large"
                    allowClear
                />
            </Space>
            </div>
            <div className="members">
                {/* {filteredMembers} */}
                {/* <p>username: {chatRef.current}</p> */}
                {/* <p>username: testing {chat.username}</p> */}

                <Members filteredMembers={filteredMembers} />
                {/* <div><Messenger chat={chat} /></div> */}
                
               
            </div>
            {/* <ProtectedRoute 
                path="/home/chat"
                component={Chat}
                redirectTo="/"
                token={token}
            /> */}
  
        </div>
    )
}

export default SearchMembers