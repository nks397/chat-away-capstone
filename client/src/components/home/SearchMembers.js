import React, {useContext} from "react"
import { Input, Space } from 'antd'
import { UserContext } from "../../context/UserProvider"
import Members from "./Members"
import {MembersContext} from "../../context/MembersProvider"
import { db } from "../../Firebase"
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore"

const { Search } = Input

function SearchMembers() {
    const {members} = useContext(UserContext)
    const {user, setChat, setMsgs, id} = useContext(UserContext)
    const {handleChange, inputs} = useContext(MembersContext)

    function retrieveMsgs() {
        const msgsRef = collection(db, "messages", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            let msgsArr = []
            querySnapshot.forEach((doc) => {
                msgsArr.push({id: doc.id, ...doc.data()})
            })
            setMsgs(msgsArr)
        })
    }
  
    const filteredMembers = members?.filter(member => {
        
                if(inputs.searchTerm === "") {
                    return member.username
                }
                // if username includes the characters that are typed in the search box, return usernames
                else if(member.username.toLowerCase().includes(inputs.searchTerm.toLowerCase())) {
                    console.log(member.username, "returning filtered members that includes the search term")
                    return member.username
                }
            })
            // alphabetizes usernames
            .sort((a, b) => a.username.localeCompare(b.username))
            .map(member => member._id !== user._id ? 
                <>
                    <p onClick={() => {
                        if (member.username) {
                            setChat(member)
                            retrieveMsgs() 
                        } else {
                            return null
                        }  
                    }}> 
                        <img className="members-avatar" src={member.profilePic} alt="image" /><span className="members-name">{member.username.charAt(0).toUpperCase() + member.username.slice(1)}</span>
                    </p>
                </>
                :
                null
                )

    return(
        <div className="members-container">
            <div className="input-container">
                <Space direction="vertical">
                    <Search
                        type="text"
                        value={inputs.searchTerm}
                        name="searchTerm"
                        placeholder="Search Members" 
                        onChange={handleChange}
                        className="search-input"
                        allowClear
                    />
                </Space>
            </div>
            <div className="members">
                <Members filteredMembers={filteredMembers} />
            </div>
        </div>
    )
}

export default SearchMembers