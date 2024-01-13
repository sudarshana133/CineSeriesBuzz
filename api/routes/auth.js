const router = require('express').Router();
const md5 = require('md5');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
router.get('/',(req,res)=>{
    res.send("hello this is user route")
})
router.post('/register',async(req,res)=>{
    const newUser = new User({
        id:Date.now(),
        username:req.body.username,
        email:req.body.email,
        password: md5(req.body.password)
    });
    try {
       const user = await newUser.save();
       res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json("Wrong username or password");
      }
  
      const passwordByUser = md5(req.body.password);
      const originalPassword = user.password;
      
      if (originalPassword !== passwordByUser) {
        return res.status(401).json("Wrong username or password");
      }
  
      // If username and password match, create a JWT
      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "5d" });
      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
module.exports = router;