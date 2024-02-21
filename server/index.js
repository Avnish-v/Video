const express   = require("express")
const bodyparser =  require("body-parser");
const {server, Server} =  require("socket.io");
const io = new Server({
    cors:true
});
const app  =  express();
app.use(bodyparser.json())

const emailToSocket  =  new Map();
const socketToEmail  =  new Map();

io.on("connection", (socket)=>{
    
    socket.on("join-room", data=>{ 
        const{id , emailId} = data;
        emailToSocket.set(emailId , socket.id);
        socketToEmail.set(socket.id ,  emailId);
       socket.emit("join-on" , {id});
        socket.join(id);
        socket.broadcast.to(id).emit('user-joined',{emailId})
    })
    socket.on("call", (data)=>{
       
        try {
            const {emailId ,  offer} =  data;
            const socketId  =  emailToSocket.get(emailId);
            const from  =  socketToEmail.get(socketId);
            socket.to(socketId).emit('incoming',{from , offer})    
        } catch (error) {
            console.log("error");
        }
    })
    socket.on("call-accept" , (data)=>{
        console.log("call accepted");
         try {
            const {emailId ,  ans} =  data;
            console.log("heleo" , data);
            const socketId = emailToSocket.get(emailId);
            socket.to(socketId).emit('call-accepted' ,{ans ,  emailId});
        } catch (error) {
            
        }
       
    } )
})
io.listen(8001 , ()=>{console.log("io is runnning on the 8000")});
app.listen(8080 ,  ()=>{console.log("server running on 8080")}); 