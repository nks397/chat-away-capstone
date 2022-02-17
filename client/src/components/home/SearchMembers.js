import React, { useState, useContext } from "react"
// import { Avatar } from "antd"
// import { UserOutlined } from '@ant-design/icons'
import {Link} from "react-router-dom"
import { Input, Space } from 'antd'
// import { UserContext } from "../../context/UserProvider"
import {MembersContext} from "../../context/MembersProvider"
// import UserProvider from "../../context/UserProvider"
// import Chat from "./Chat"
// import ProtectedRoute from "../ProtectedRouted"

const { Search } = Input

function SearchMembers(props) {

    const {searchInput, handleChange, filteredMembers} = useContext(MembersContext)

    // const {newConversation} = useContext(UserProvider)

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