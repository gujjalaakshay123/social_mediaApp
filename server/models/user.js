const mongoose = require("mongoose")

const schema_user = new mongoose.Schema(
    {
        userName: { type: String, unique:true, require: true},
        userPwd: { type: String, unique : true, require: true},
        useEmail: { type:  String, unique: true},
        followers: [String],
        following: [String]
    }
)

const User = mongoose.model('user',schema_user)

async function register(username, password) {
    const user = await getUser(username);
    if(user) throw Error('Username already in use');
  
    const newUser = await User.create({
        userName: username,
        userPwd: password
    });
  
    return newUser;
  }


  async function getUser(username) {
    return await User.findOne({ "userName": username});
  }

  async function login(username, password){
    const user = User.findOne({"userName": username})
    if(!user) throw Error('User Not Found')
    if(password != user.userPwd) throw Error('Password incorrect please try again')
    return user;
  }

  async function update(id, password){
    const user = await User.updateOne({"_id": id}, {$set: { userPwd: password}});
    return user;
  }

  async function deleteUser(id){
    await User.deleteOne({"_id": id});
  }

  module.exports = { 
    register, login, update, deleteUser 
  };



