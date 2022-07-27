import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3002");

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const handleSendMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(message) {
      socket.emit("send-message", message);
      setSendMessage(message);
    }
    setMessage("")
  }

  useEffect(() => {
    socket.on("receive-message", data => {
      setReceivedMessage(data)
    })
  }, [sendMessage]) //socket

  return (<>
    <form onSubmit={handleSubmit}>
      <input value={message} type="text" placeholder="Send message.." onChange={handleSendMessage} />
      <input type="button" value="Submit"/>
    </form>
    {receivedMessage}
  </>
  )
}

export { ChatWindow };