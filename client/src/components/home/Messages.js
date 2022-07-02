import { useContext } from "react";
import { format } from "timeago.js";
import { MembersContext } from "../../context/MembersProvider";
import { UserContext } from "../../context/UserProvider";

export default function Messages({ message, senderMessage, msg, user1 }) {
const date = msg.createdAt.toDate().toLocaleDateString()
const time = msg.createdAt.toDate().toLocaleTimeString('en-US')

  return (
      <div className={msg.sender === user1? "message own" : "message"}>
        <div className="messageTop">
          <p className="messageText"> {msg.text} </p>
       </div>
        {/* )} */}
      <div className="messageBottom"> {`${date} ${time}`}</div>
      {/* <div className="messageBottom">{msgs.map(msg => msg.createdAt)}</div> */}

    </div>
  );
}