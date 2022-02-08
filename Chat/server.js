const path=require('path');
const express = require('express');
const socketio=require('socket.io');
const app=express();
const http=require('http');
const server=http.createServer(app);
const io=socketio(server);
var qs = require('qs');
const formatmessage=require('./Utils/messages');
const  {userJoin,getCurrentUser,userLeave,getRoomUser,UsersNo}=require('./Utils/users');
//set static Folder
app.use(express.static(path.join(__dirname,'public')));





const botname='UsamaBOT';




//run when the Client connects
io.on('connection',socket =>{
socket.on('joinroom',({username,room})=>{

const user=userJoin(socket.id,username,room);

socket.join(user.room);

      socket.emit('message',formatmessage(botname,`Welcome to ${user.room} ${user.username}`));

         //Broadcast when a user EMit

         socket.broadcast.to(user.room).emit('message',formatmessage(botname,`${user.username} has joined the chat`));
         
//Send users room info 
io.to(user.room).emit('roomusers',{
      room:user.room,
      users:getRoomUser(user.room)
});

io.to(user.room).emit('UserNo'),{

}
});

   
      //if you wanna send to all users who connect
socket.on('disconnect',()=>{
      const user =userLeave(socket.id);
      if(user){
            io.to(user.room).emit('message',formatmessage(botname,`A  ${user.username} has left the chat`));
            io.to(user.room).emit('roomusers',{
                  room:user.room,
                  users:getRoomUser(user.room)
            });
      }   
});


//listen for message

socket.on('chatMessage' ,msg=>{

      const user =getCurrentUser(socket.id);
      if(user){
      io.to(user.room).emit('message',formatmessage(user.username,msg));
      }
});




});

const PORT=3000 || process.env.PORT;
server.listen(PORT,()=>console.log(`server running at ${PORT}`));