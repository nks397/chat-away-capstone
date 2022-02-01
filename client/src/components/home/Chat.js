import { set } from "mongoose"
import React, { useContext, useState } from "react"
import { UserContext } from "../../context/UserProvider"
import {SettingsContext} from "../../context/SettingsProvider"
import ContactSidebar from "./ContactSidebar"
import ProfileSidebar from "./ProfileSidebar"
import Messenger from "./Messenger"
import ChatDetails from "./StartChat"

function Chat() {
    const {user, members, conversations, logout, getAllUsers} = useContext(UserContext)
    const {background} = useContext(SettingsContext)
    // const [convoId, setConvoId] = useState("")
    console.log(members, "hehy")

    const mapUsername = members.map(mem => 
        mem._id !== user._id ? mem.username : null
        // (mem.username)

    ) 

    // const mapConvoId = conversations.map(convo => <p onClick={()=> setConvoId(convo._id)}>{mapUsername}</p>)
// console.log(mapConvoId,)
  

    console.log(mapUsername, "mapping")
    return(
        <div data-theme-background={background} className="home-page background color">
        <ContactSidebar getAllUsers={getAllUsers}  members={members} />
        {/* {member.username} */}
        <Messenger members={members}/>
        {/* <ChatDetails /> */}
        <ProfileSidebar logout={logout} user={user} />
  
        
        </div>
    )
}

export default Chat