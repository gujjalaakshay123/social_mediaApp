const express = require("express");
const comment = require('../models/comments');
const router = express.Router();


router.post('/create_comment', async (req, res) => {
    try {
      const Comment = await comment.create_comment(req.body.commentId, req.body.content,req.body.postId);
      res.send({...Comment});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
})

router.post('/get_comment', async (req, res)=>{
    try{
        const Comment = await comment.get_comment(req.body.postId);
        res.send({...Comment})
    }catch(error){
        res.status(401).send({message : error.message});
    }
})

router.post('/update_comment', async (req, res)=>{
    try{
        const Comment = await comment.update_comment(req.body.commentId,req.body.key, req.body.value)
        res.send({...Comment})
    }catch(error){
        res.status(401).send({message : error.message});
    }
})

router.delete('/delete_post', async (req, res) => {
    try {
      await comment.delete_comment(req.body.postId);
      res.send({ success: "comment deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
})

module.exports = router;