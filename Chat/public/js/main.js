
var chatform= document.getElementById("chat-form");
var msg=document.getElementById('msg');
const chatMessages=document.querySelector('.chat-messages');
const roomName= document.getElementById('room-name');
const userList=document.getElementById('users');
const UserNos=document.getElementById('UserNo');

//Get username and room from URL
const  {username,room}=Qs.parse(location.search,{
ignoreQueryPrefix:true
});
console.log(username,room);
var socket=io();
socket.emit('joinroom',{username,room});
//Get Room users
socket.on('roomusers',({room,users})=>
{
      outputRoomName(room);
      outputUsers(users);
});

//Message from Server
socket.on('message',message=>{
outputMessage(message);
//scroll down
chatMessages.scrollTop=chatMessages.scrollHeight;

});


//Message Submit

chatform.addEventListener('submit',(e) =>{
      e.preventDefault();

      const msg =e.target.elements.msg.value;
      socket.emit('chatMessage',msg);
      e.target.elements.msg.value=' ';
      e.target.elements.msg.focus();
});

//output mssg from DOM

function outputMessage(message){
      const div = document.createElement('div');
      div.classList.add('message');
      div.innerHTML=`<p class="meta">${message.username}<span> at ${message.time}</span></p>
      <p class="text">
         ${message.text}
      </p>`;
      document.querySelector('.chat-messages').appendChild(div);
}
function outputRoomName(room){

roomName.innerText=room;
}

//Add users to the DOM
function outputUsers(users) {
      userList.innerHTML = ' ';
      users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
      });
    }