const router = require("express").Router();
const User = require("../models/User")


router.get("/",(req,res)=>{
    res.send("auth page")
})


//ユーザー登録
router.post("/register",async (req,res)=>{
    try{
        //ドキュメントの作成
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        
        //ドキュメントの保存
        const user = await newUser.save();
        return res.status(200).json(user)
    }catch(e){
        return res.status(500).json(e)
    }
})


//ログイン
router.post("/login",async (req,res)=>{
    try{
          const user = await User.findOne({email:req.body.email})

          if(!user){return res.status(404).json("ユーザーが見つかりません")}
          const valiedPassword = req.body.password === user.password;
          if (!valiedPassword){return res.status(403).json("パスワードが違います")}

          return  res.status(200).json(user)
    }catch(e){

    }
})



module.exports = router;