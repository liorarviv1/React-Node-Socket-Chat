import { useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Chat from './Chat';
const socket =io.connect("http://localhost:3001");

function App() {
  const [UserNameRoomId, setUserNameRoomId] = useState({userName:"",roomId:""})
  const [showChat, setshowChat] = useState(false)
  const joinRoom=()=>
  {
    if(UserNameRoomId.userName!=""&& UserNameRoomId.roomId!="")
    {
      socket.emit("join_room",UserNameRoomId.roomId)
    }
    setshowChat(!showChat)

  }

  return (
    <div className='App'>
      {!showChat ? (
      <div className="joinChatContainer">


      <h3>Join a chat</h3>
      <input type='text' placeholder='John...' onChange={e=>setUserNameRoomId({...UserNameRoomId,userName:e.target.value})}/>
      <input type='text' placeholder='Room ID...' onChange={e=>setUserNameRoomId({...UserNameRoomId,roomId:e.target.value})}/>
      <button onClick={joinRoom}>Join a room</button>

      </div>
      ):
      (
      <Chat socket2={socket} allData={UserNameRoomId}/>
      )}

    

    </div>
  );
}

export default App;
