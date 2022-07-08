import React, {useContext, useEffect} from "react"
import { SettingsContext } from "../../context/SettingsProvider"
import { UserContext } from "../../context/UserProvider"
import { MembersContext } from "../../context/MembersProvider"
import ContactSidebar from "./ContactSidebar"
import ProfileSidebar from "./ProfileSidebar"
import Messenger from "./Messenger"

function Home() {
    const {logout, user, getAllUsers, chat} = useContext(UserContext)
    const {themeRef, getUserSettings} = useContext(SettingsContext)
    const {setSelectMsgsBtn} = useContext(MembersContext)

    useEffect(() => {
        getAllUsers()
        getUserSettings(user._id)
        reload() 
    }, [user._id])
    
    function reload() {
        if( window.localStorage ) {
        //check if reloaded once already 
            if( !localStorage.getItem('firstLoad')) {
            //if not reloaded once, then set firstload to true
                localStorage['firstLoad'] = true;
                //reload the webpage using reload() method
                window.location.reload();
            }  
        }
    }
    
    console.log(themeRef.current, "test theme ref at home")
    
    return(
        <div data-theme-background={themeRef.current} className="home-page background color">
            {/* Home Page */}

            {/* component for contact */}
            <ContactSidebar getAllUsers={getAllUsers}/>
            
            {/* will render messages when member is clicked on */}
            {chat ? 
                <div className="messenger-container">
                    <p className="member-name">
                        {chat?.username.charAt(0).toUpperCase() + chat?.username.slice(1)} 
                        <span>
                            <i 
                                title="Select to delete messages"
                                onClick={() => setSelectMsgsBtn(prevState => !prevState)} 
                                className="delete-toggle fa-solid fa-trash"
                            >
                            </i>
                        </span>
                    </p>
                    <Messenger /> 
                </div>
                :
                <p className="start-chat">
                    Select a member to chat with. 
                </p>
            }

            {/* display user information */}
            <ProfileSidebar logout={logout} user={user} />
        </div>
    )
}

export default Home