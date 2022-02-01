import React, {useEffect} from "react"
import Members from "./Members"
// import { Avatar } from "antd"
// import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import SearchMembers from "./SearchMembers"

function ContactSidebar(props) {
    const {getAllUsers, members} = props

    useEffect(() => {
        getAllUsers()
    }, [])

    console.log(members, "members")

    return(
        <div className="contact-sidebar-container">
            <SearchMembers members={members} />
        </div>
    )
}

export default ContactSidebar