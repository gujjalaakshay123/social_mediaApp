const mongoose = require("mongoose")

const schema_Comment = new mongoose.Schema(
    {
        commentId: { type: String, unique:true, require: true},
        content: { type: String, require: true},
        timestamp: { type:  String},
        postId: { type: String, require: true}
    }
)

const Comment = mongoose.model('Stage',schema_Comment)

async function create_comment(comment_Id, comment, post_Id) {
    const date = new Date();
    const newComment = await Comment.create({
      commentId: comment_Id,
      content: comment,
      postId: post_Id,
      timestamp: date.setFullYear+'-'+date.getMonth+'-'+date.getDate+'-'+date.getTime
    });
  
    return newComment;
  }

  async function getComment(comment_Id) {
    return await Comment.findOne({ "commentId": comment_Id});
  }

  async function get_comment(comment_Id){
    const comment = await getComment(comment_Id)
    if(!comment) throw Error('No comment for the given Id')
    return comment;
  }

  async function update_comment(comment_id, key, value){
    const comment = await Comment.updateOne({'_id': comment_id},{$set: { key: value }});
    return comment;
  }

  async function delete_comment(comment_id){
    await Comment.deleteOne({'_id': comment_id});
  }
  

  module.exports ={
    create_comment,get_comment,update_comment,delete_comment
  }