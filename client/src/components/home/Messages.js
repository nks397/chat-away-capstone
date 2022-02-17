import { useContext } from "react";
import { format } from "timeago.js";
import { MembersContext } from "../../context/MembersProvider";
import { UserContext } from "../../context/UserProvider";

export default function Messages({ message, senderMessage }) {
  // const {memberId} = useContext(MembersContext)
  // // do this in messenger.js
  // // const convoMemberId = conversation.map(convo => convo.memberArr[1])
  return (
    <div className={senderMessage ? "message own" : "message"}>
      
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}