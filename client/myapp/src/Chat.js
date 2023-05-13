import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"


function Chat(props) {
    const [dataToSent, setdataToSent] = useState("")
    const [messageList, setmessageList] = useState([])
    
    const sendMessage= async()=>
    {
        if(dataToSent!=="")
        {
            const messageData={
                room:props.allData.roomId ,
                author: props.allData.userName,
                message:dataToSent,
                time: new Date(Date.now()).getHours()+ ":"+ new Date(Date.now()).getMinutes()
            }
            await props.socket2.emit("sent_message",messageData);
            setmessageList((list) =>[...list,messageData])
            // setmessageList([...messageList,messageData])
            setdataToSent("")


        }
    };
    useEffect(() => {
        props.socket2.on("receive_message",(data)=>{
            // setmessageList([...messageList,data])
            setmessageList((list) =>[...list,data])

            
        })
      
    }, [props.socket2])
    

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live chat</p>
        </div>

        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {
                messageList.map((mess,index)=>{
                    return (
                    <div className='message'
                    id={props.allData.userName===mess.author? "you": "other"}
                    >
                        
                        <div key={index}>
                            <div className='message-content'>
                                <p>{mess.message}</p>
                            </div>
                            <div className='message-meta'>
                            <p id='time'>{mess.time}</p> &nbsp;
                            <p id='author'>{mess.author}</p>

                            </div>
                        </div>
                    </div>
                    );
                })
            }
            </ScrollToBottom>
        </div>

        <div className='chat-footer'>
            <input type='text' placeholder='Hey...' onChange={e=>setdataToSent(e.target.value)}
            onKeyPress={(event)=>{event.key==="Enter" && sendMessage()}}
             value={dataToSent}
            //  onKeyPress={e=>e.key==="Enter" && sendMessage()}
            
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>

      
    </div>
  )
}

export default Chat
