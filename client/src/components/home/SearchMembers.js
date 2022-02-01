import React, { useState, useContext } from "react"
// import { Avatar } from "antd"
// import { UserOutlined } from '@ant-design/icons'
import {Link} from "react-router-dom"
import { Input, Space } from 'antd'
import { UserContext } from "../../context/UserProvider"
// import Chat from "./Chat"
// import ProtectedRoute from "../ProtectedRouted"

const { Search } = Input

function SearchMembers(props) {
    
    const initInputs = {
        searchTerm: ""
    }
    
    const [searchInput, setSearchInput] = useState(initInputs)
    
    const {members} = props
    const {user, conversations, token} = useContext(UserContext)
    const [currentChat, setCurrentChat] = useState(null)
    // console.log(user, "from search mem")
    console.log(members, "mem")

    // const [recipientArr, setRecipientArr] = useState([])


//     function handleClick(id) {

//         console.log("get id of member")
//         // returning every member except the user that is signed in
// //   const recipient = members.find(member => 
// //     member.username !== user.username
// //     )
//     if (recipientArr.username.includes(members[0].username)) {

    // }
    // console.log(recipient.username, "handle")
    
  
//   console.log(recipient, "recipient object")

    // return every id of member except user
    // what i want to do is be able to click on a user in my members list to start or continue a conversation
    // const recipientId = recipient.map(member => 
    // member._id
    // )

    // console.log(recipientId, "recipientId object")
    // setRecipientArr(recipient)
    
    // if username matches selected usrn send id
    // function matchUsername() {
        // const recipArr = recipientArr.map(recipient => recipient._username === selectedUser)
        // console.log(recipArr, "red")
    // }
    // matchUsername()
    // }

    // console.log(recipientArr, "recipArr")
    

    const filteredMembers = members.filter(member => {
        if(searchInput.searchTerm === "") {
            // console.log(member.username, "returning all members")
            return member.username
        }
        else if(member.username.toLowerCase().includes(searchInput.searchTerm.toLowerCase())) {
            // console.log(member.username, "returning filtered members that includes the search term")
            return member.username
        }
    })
    .map(member => member._id !== user._id ?
        <>
            {/* <Avatar style={{backgroundColor: "green"}} size="default" icon={<UserOutlined />} /> */}
            {/* create an oncick on the p tag to set id to state */}
            {/* <p onClick={()=> handleClick(member._id)} key={member._id}> */}
            <p>
                <Link to="/home/chat">{member.username}</Link>
                {/* {console.log(conversations)} */}
            </p>
        </>
        :
        null
      
    )

    // components/appContext > views/search > components/searchBar > components/resultsComp > components/resultsDetails > components/userProfile > src/app (to understand nested routing/link setup)

    function handleChange(e) {
        // console.log("I'm searched!")
        const {name, value} = e.target
        setSearchInput(prevState => ({
            ...prevState,
            [name]:value
        }))
        
    }

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
                {filteredMembers}
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