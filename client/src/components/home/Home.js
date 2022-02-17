import React, {useContext} from "react"
import { SettingsContext } from "../../context/SettingsProvider"
import { UserContext } from "../../context/UserProvider"
import ContactSidebar from "./ContactSidebar"
// import Conversations from "./Conversations"
import ProfileSidebar from "./ProfileSidebar"
import Messenger from "./Messenger"

function Home() {
    const {logout, user, getAllUsers, members, postMessages, getMessages, newConversation, messages} = useContext(UserContext)
    const {background} = useContext(SettingsContext)

    return(
        <div data-theme-background={background} className="home-page background color">
            {/* Home Page */}

            {/* contact sidebar to the left of the screen */}
            <ContactSidebar getAllUsers={getAllUsers}  members={members} />
            
            {/* conversation in the middle of the screen */}
            {/* <Conversations postMessages={postMessages} newConversation={newConversation} messages={messages} user={user} /> */}
            <Messenger/>
          
            {/* messenger component is where I can dynamically send down data/conversation based on each members */}
            {/* profile sidebar to the right of the screen */}
            <ProfileSidebar logout={logout} user={user} />
        </div>
    )
}

export default Home