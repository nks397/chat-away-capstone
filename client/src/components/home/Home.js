import React, {useContext, useEffect} from "react"
import { SettingsContext } from "../../context/SettingsProvider"
import { UserContext } from "../../context/UserProvider"
import { MembersContext } from "../../context/MembersProvider"
import ContactSidebar from "./ContactSidebar"
// import Conversations from "./Conversations"
import ProfileSidebar from "./ProfileSidebar"
import Messenger from "./Messenger"

function Home() {
    const {logout, user, getAllUsers, postMessages, getMessages, newConversation, messages, chat} = useContext(UserContext)
    const {background, themeRef, getUserSettings} = useContext(SettingsContext)
    const {capitalizeFirstLetter} = useContext(MembersContext)
    // console.log(user, "userObj")
    // pass in theme value inside of changeTheme
    useEffect(() => {
        // console.log(themeRef.current, "testing!")
        getAllUsers()
        getUserSettings(user._id)
        console.log("user use effect is hit")
        // console.log(user._id, "userId")
    // document.location.reload(true)
    // try to reload only once

    //we will auto-triggering js function
//to refresh once after first load

 function reload() {
  if( window.localStorage ) {
    //check if reloaded once already 
    if( !localStorage.getItem('firstLoad')) {
     //if not reloaded once, then set firstload to true
     localStorage['firstLoad'] = true;
     //reload the webpage using reload() method
     window.location.reload();
    }  
//     else 
//     //   localStorage.removeItem('firstLoad');
  }}


reload()

        
        // console.log(user.theme, "is home theme being hit")
        // console.log(user.profilePic, "is home pic being hit")
    }, [user._id])
    

    console.log(themeRef.current, "test theme ref at home")
    
    // document.location.reload()
         
    
    return(
        <div data-theme-background={themeRef.current} className="home-page background color">
            {/* Home Page */}

            {/* contact sidebar to the left of the screen */}
            <ContactSidebar getAllUsers={getAllUsers} />
            
            {/* conversation in the middle of the screen */}
            {/* <Conversations postMessages={postMessages} newConversation={newConversation} messages={messages} user={user} /> */}
            {chat ? 
            <div>
                <p className="member-name">{chat?.username.charAt(0).toUpperCase() + chat?.username.slice(1)} </p>
                {/* <p className="memberName">{capitalizeFirstLetter(chat?.username)} </p> */}
                
                <Messenger chat={chat}/> 
            </div>
            :

                    <p className="start-chat">Select a member to chat with. </p>
                  }
          
            {/* messenger component is where I can dynamically send down data/conversation based on each members */}
            {/* profile sidebar to the right of the screen */}
            <ProfileSidebar logout={logout} user={user} />
        </div>
    )
}

export default Home