import React, {useState, useRef, useContext, useEffect} from "react"
import { UserContext } from "./UserProvider"


export const MembersContext = React.createContext()

export default function MembersProvider(props) {
    const initInputs = {
        searchTerm: ""
    }

    const chatRef = useRef({})
    
    const [searchInput, setSearchInput] = useState(initInputs)
    const [memberId, setMemberId] = useState(null)
    // const [convoId, setConvoId] = useState("no id grabbed")
    
    // const {members} = props
    // const {user, members, getAllUsers, newConversation, conversations, getTwoUsersConversation} = useContext(UserContext)
    // console.log(user, "from search mem")
    // console.log(members, "mem")

    // useEffect(() => {
    //     getAllUsers()
    // }, [])

    
//     const filteredMembers = members.filter(member => {

//         if(searchInput.searchTerm === "") {
//             // console.log(member.username, "returning all members")
//             return member.username
//         }
//         else if(member.username.toLowerCase().includes(searchInput.searchTerm.toLowerCase())) {
//             // console.log(member.username, "returning filtered members that includes the search term")
//             return member.username
//         }
//     })
//     .map(member => member._id !== user._id ? 
//         <>
//             {/* <Avatar style={{backgroundColor: "green"}} size="default" icon={<UserOutlined />} /> */}
        

//                  <p onClick={() => {
//                      return member._id !== user._id ? setMemberId(member._id) : null,
//                      newConversation({senderId: user._id, recipientId: member._id}),
//                      // im creating a newConvo first, on second click the id is grabbed
//                      // find a way to click only when there is a convId
//                      conversations?.map(convos => setConvoId(convos._id))
//                     }}>
            
                    
//                 {member.username}   
//                 {console.log(convoId, "convId")}        
            
//             </p>
//         </>
//         :
//         null
        
//         )
        
// console.log(members, "console members")
        // useEffect(() => {
        //     getTwoUsersConversation(user._id, memberId)
        // }, [])

// console.log(conversations, "convoArr")
// console.log(memberId, "state mem ID")
    // components/appContext > views/search > components/searchBar > components/resultsComp > components/resultsDetails > components/userProfile > src/app (to understand nested routing/link setup)

    function handleChange(e) {
        // console.log("I'm searched!")
        const {name, value} = e.target
        setSearchInput(prevState => ({
            ...prevState,
            [name]:value
        }))
        
    }

    function capitalizeFirstLetter(string) {
        return string.username.charAt(0).toUpperCase() + string.username.slice(1)
    }
    
    return (
        <MembersContext.Provider 
            value={{
                searchInput,
                setSearchInput,
                capitalizeFirstLetter,
                chatRef,
                // convoId,
                // memberId,
                // messages,
                // filteredMembers,
                handleChange
            }}
        >
            {props.children}
        </MembersContext.Provider>
    )
}