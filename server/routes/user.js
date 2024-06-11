const express = require("express");
const user = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
      const User = await user.login(req.body.userName, req.body.userPwd);
      res.send({...User, userPwd: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
})

router.post('/register', async(req, res)=>{
    try{
      const User = await user.register(req.body.userName, req.body.userPwd);
      res.send({...User, userPwd: undefined});
    }
    catch(error) {
        res.status(401).send({ message: error.message }); 
      }
})

.put('/update', async (req, res) => {
    try {
      const User = await User.updatePassword(req.body.id, req.body.password);
      res.send({...User, userPwd: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
})

delete('/delete', async (req, res) => {
    try {
      await User.deleteUser(req.body.id);
      res.send({ success: "Account deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
})

module.exports = router;
