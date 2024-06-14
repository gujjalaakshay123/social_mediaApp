const express = require("express");
const posts = require('../models/posts');
const router = express.Router();

router.post('/create_post', async (req, res) => {
    try{
        const post = await posts.create_post(req.body.postId,postName,postLocation,postDescription)
        res.send({...post})
    }
    catch(error){
        res.status(401).send({message : error.message});
    }
})

router.post('/get_post', async (req, res)=>{
    try{
        const post = await posts.get_post(req.body.postId);
        res.send({...post})
    }catch(error){
        res.status(401).send({message : error.message});
    }
})

router.post('/update_post', async (req, res)=>{
    try{
        const post = await posts.update_post(req.body.postId,req.body.key, req.body.value)
        res.send({...post})
    }catch(error){
        res.status(401).send({message : error.message});
    }
})

router.delete('/delete_post', async (req, res) => {
    try {
      await posts.delete_post(req.body.postId);
      res.send({ success: "post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
})

module.exports = router;