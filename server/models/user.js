const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const newUser = await User.create({
        userName: username,
        userPwd: hash
    });
  
    return newUser;
  }


  async function getUser(username) {
    return await User.findOne({ "userName": username});
  }

  async function login(username, password){
    const user = User.findOne({"userName": username})
    if(!user) throw Error('User Not Found')
    const valid = await bcrypt.compare(password, user.userPwd)
    if(!valid) throw Error('Password incorrect please try again')
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



