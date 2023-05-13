const express=require('express');
const app = express();
const http=require("http")
var cors=require('cors') //מבטלים את החסימה
const { Server }=require("socket.io");
const { cwd } = require('process');

app.use(cors())

const server =http.createServer(app)

const io=new Server(server,{ //לחבר את הסוקט לשרת שיצרנו 
    cors :{ //להגדיר לו איזה פעולות הוא יכול לבצע בשרת הזה
        origin: "http://localhost:3000",
        methods:["GET","POST"],
    }
});

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} joind room: ${data}`)
    })
    socket.on("sent_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect",()=>
    {
        console.log("user disconnected",socket.id)
    })
})

server.listen(3001, ()=>
{
    console.log("SERVER RUNING")
})