import React from "react"

export default function Messages(props) {
  const {msg, user1} = props
  const date = msg.createdAt.toDate().toLocaleDateString()
  const time = msg.createdAt.toDate().toLocaleTimeString('en-US')

  console.log(msg, "msg")

  return (
    <div className={msg.sender === user1? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText"> 
          {msg.text} 
        </p>
      </div>
      <div className="messageBottom"> 
        <p style={{fontSize: "12px"}}>
          {`${date} ${time}`}
        </p>
      </div>
    </div>
  )
}