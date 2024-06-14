const mongoose = require("mongoose")

const schema_posts = new mongoose.Schema(
    {
        postId: { type: String, unique:true, require: true},
        postName: { type: String, unique : true, require: true},
        postTime: { type:  String},
        postLocation: [String],
        postDescription: [String]
    }
)

const Post = mongoose.model('posts',schema_posts)

async function create_post(post_id, postName, post_location, post_description) {
    const post = await getPost(username);
    if(post) throw Error('Username already in use');
    
    const date = new Date();
    const newPost = await Post.create({
        postId: post_id,
        postName: postName,
        postTime: date.setFullYear+'-'+date.getMonth+'-'+date.getDate+'-'+date.getTime,
        postLocation: post_location,
        postDescription: post_description
    });
  
    return newPost;
  }

  async function getPost(postId) {
    return await Post.findOne({ "postId": postId});
  }

  async function get_post(post_id){
    const post = await getPost(post_id)
    if(!post) throw Error('No post for the given Id')
    return post;
  }

  async function update_post(post_id, key, value){
    const post = await Post.updateOne({'_id': post_id},{$set: { key: value }});
    return post;
  }

  async function delete_post(post_id){
    await Post.deleteOne({'_id': post_id});
  }

  module.exports ={
    get_post,update_post,delete_post,create_post
  }