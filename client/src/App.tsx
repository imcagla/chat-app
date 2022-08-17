import { ChatWindow } from "./components/ChatWindow";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "./App.css"

const socket = io("http://localhost:3002");

function App() {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    socket.off("connect").on("connect", () => {
      console.log(socket.id);
      setUserID(socket.id)
    });
  }, [])

  return (
    <div className="App">
      <ChatWindow 
        socket={socket} 
        userID={userID} 
      />
    </div>
  );
}

export default App;
