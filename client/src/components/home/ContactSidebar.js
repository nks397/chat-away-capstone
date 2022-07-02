import React, {useEffect} from "react"
// import Members from "./Members"
// import { Avatar } from "antd"
// import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import SearchMembers from "./SearchMembers"

function ContactSidebar(props) {
    // const {getAllUsers} = props

    // useEffect(() => {
    //     getAllUsers()
    // }, [])

    return(
        <div className="contact-sidebar-container">
            <SearchMembers />
        </div>
    )
}

export default ContactSidebar