const users=[];
//join users to the Chat

function userJoin(id,username,room){
      const  user={id,username,room};
      users.push(user);
      return user;
}

function UsersNo(){
      return users.length();
}
//get current User
function getCurrentUser(id){
      return  users.find(user=>user.id===id);
}

//user Leaves the chat

function userLeave(id){
      const index=users.findIndex(user=>user.id===id);
      if(index!==-1){
            return users.splice(index,1)[0];
      }
}

function getRoomUser(room){
      return users.filter(user=>user.room===room);
}


module.exports={
      userJoin,
      getCurrentUser,
      userLeave,
      getRoomUser,
      UsersNo
}