import { useContext, useEffect, useRef, useState } from "react";
import Conversations from "./Conversations"
import Messages from "./Messages"
// import { io } from "socket.io-client";
import { UserContext } from "../../context/UserProvider";

export default function Messenger(props) {
  // const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  // const socket = useRef();
  const {members} = props
  const { user, getUserConversations, conversations, postMessages, messages, getMessages, newConversation, getTwoUsersConversation} = useContext(UserContext);
  const scrollRef = useRef();
  
  const [memberId, setMemberId] = useState(null)
  const [convoId, setConvoId] = useState(null)
  
  const newConvoObj = {
    senderId: user._id,
    recipientId: memberId
  }

  console.log(user, "user")
  // console.log(conversations[0], "convos")
  console.log(newConvoObj, "newConvoObj")
  console.log(messages, "messages")

  useEffect(() => {
    getUserConversations(user._id)
    console.log(user._id, "user id")
  }, []);

  useEffect(() => {
    // only get conversation if the id matches
    getMessages(convoId)
    console.log(convoId, "testingConvoId")
    // console.log(conversations, "conversationsObject1")
  }, [convoId])
  console.log(conversations, "conversationsObject2")

// returning every member except the user that is signed in
  // const recipient = members.filter(member => 
  //   member._id !== user._id
  // )
  
  // console.log(recipient, "recipient object")

// return every id of member except user
// what i want to do is be able to click on a user in my members list to start or continue a conversation
// const recipientId = recipient.map(member => 
//   member._id
// )

// console.log(recipientId, "recipientId object")


  useEffect(() => {
    newConversation(newConvoObj)
      
  }, [])

    useEffect(() => {
      getTwoUsersConversation(newConvoObj.senderId, newConvoObj.recipientId)
    }, [newConvoObj.senderId, newConvoObj.recipientId])


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
  console.log(message, "msg")
  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

//   const initInputs = {
//     searchTerm: ""
// }
//   const [searchInput, setSearchInput] = useState(initInputs)
  
//   const filteredMembers = members.filter(member => {
//     if(searchInput.searchTerm === "") {
//         // console.log(member.username, "returning all members")
//         return member.username
//     }
//     else if(member.username.toLowerCase().includes(searchInput.searchTerm.toLowerCase())) {
//         // console.log(member.username, "returning filtered members that includes the search term")
//         return member.username
//     }
// })
// .map(member => member._id !== user._id ?
//     <>
//         {/* <Avatar style={{backgroundColor: "green"}} size="default" icon={<UserOutlined />} /> */}
//         {/* create an oncick on the p tag to set id to state */}
//         {/* <p onClick={()=> handleClick(member._id)} key={member._id}> */}
//         <p >
//             @{member.username}
//             {/* {console.log(conversations)} */}
//         </p>
//     </>
//     :
//     null
  
// )
// const memId =  members.find(mem => mem._id !== user._id? mem._id : null)
// console.log(memId, "memId")

// function convoSubmit() {
//   console.log(newConversation(newConvoObj), "co")
//   console.log(conversations, "2useconvo")
// }
// console.log(memberId, "idforrece")
  console.log(newConvoObj, "nCo")

  return (
    <>
      {/* <Navbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            {/* {conversations.map((convo) => ( */}
                {/* // console.log(convo, "C for convos") */}
              <div>
              {/* {console.log(conversations.map(convos => convos.membersArr[0] && convos.membersArr[1] ? <p onClick={convos._id}>{convos._id}</p> : null), "memsArr")} */}
                {members.map(mem => mem._id !== user._id &&
                <p onClick={()=> 
                  // console.log(newConversation(newConvoObj), "testConvo")
                  // console.log(getTwoUsersConversation(newConvoObj.senderId, newConvoObj.recipientId), "two user convo")
                    // console.log(newConvoObj.senderId, "test send id")
                    // console.log(newConvoObj.recipientId, "test recip id")
                    // console.log(conversations, "conversations array")
                  // {console.log(memberId, "test again")}
                  // {newConversation(newConvoObj)
                  mem._id !== user._id ? 
                  setMemberId(mem._id) 
                  // console.log(mem._id !== user._id ? 
                  //   setMemberId(mem._id) 
                  
                  : 
                    null
                }>
                  <div onClick={() => 
                    conversations.map(convos => 
                      mem._id === convos.membersArr[1] &&
                      user._id === convos.membersArr[0] ?
                      setConvoId(convos._id) :
                      null
                    )
                      // console.log(conversations.map(convos => 
                      //   mem._id === convos.membersArr[1] &&
                      //   user._id === convos.membersArr[0] ?
                      //   setConvoId(convos._id) :
                      //   null
                      //   ), "memsArr")
                  }>{mem.username}</div>
                </p>
                 
                 )
                }
              
              </div>
            {/* ))} */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {/* {convoId ? ( */}
              <>
                <div className="chatBoxTop">
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
            {/* ) : (
              <span className="noConversationText">
                Find a member and start chatting.
              </span>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}