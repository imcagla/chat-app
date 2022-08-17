import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import "./ChatContainer.css"

type ChatProps = {
  socket: Socket,
  userID: string,
}

type Messages = {
  userID: string, 
  message: string, 
  time: string
}

const ChatWindow: React.FunctionComponent<ChatProps> = ({ socket, userID }) => {
  const [message, setMessage] = useState("");
  const [messagesObj, setMessagesObj] = useState<Messages[]>([]);

  const handleSendMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSubmit = () => {
    if(message !== "") {
      const messageData = {
        userID: userID,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      socket.emit("send-message", messageData);
      setMessagesObj(prev => [...prev, messageData]);
      setMessage("")
    }
  }

  useEffect(() => {
    const handler = (data: Messages) => {
      console.log(data)
      console.log("receive")
      setMessagesObj(prev => [...prev, data])
    }
    socket.off("receive-message").on("receive-message", handler)
    // return () => socket.off("receive-message", handler)
  }, [socket])

  return (<>
    <div className="chat-container">
      {
        messagesObj.map((obj) => {
          return <div className={`text-container ${obj.userID === userID ? "received-message" : "send-message"}`}> <text className="message">{ obj.message }</text></div>
        })
      }
      <div className="input-container">
        <input 
          className="message-input"
          value={message} 
          type="text" 
          placeholder="Send message.." 
          onChange={handleSendMessage} 
          onKeyPress={(event) => {
            event.key === "Enter" && handleSubmit();
          }}
        />
        <button className="send-button" onClick={handleSubmit}>Send</button>
      </div>
    </div>
  </>
  )
}

export { ChatWindow };