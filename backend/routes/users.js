const User = require("../models/User");
const { findById } = require("../models/User");

const router = require("express").Router();






//ユーザー情報の更新
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            });
            return res.status(200).json("ユーザー情報が更新されました")
        }catch(e){
          return res.status(500).json(e)
        }       
    }else{
        return res.status(403).json("他のユーザーの情報は変更できません")
    }
})

//ユーザー情報の取得
router.get("/:id",async (req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {password,updatedAt,...other} = user._doc;
            return res.status(200).json(other)
        }catch(e){
          return res.status(500).json(e)
        }       
    })



//ユーザー情報の削除
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("ユーザー情報が削除されました")
        }catch(e){
          return res.status(500).json(e)
        }       
    }else{
        return res.status(403).json("他のユーザーの情報は削除できません")
    }
})

//follow
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId !== req.params.id ){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId,);

            if(!user.followers.includes(req.body.userId)){
               await user.updateOne({
                $push:{
                    followers:req.body.userId
                }
               });
               await currentUser.updateOne({
                $push:{
                    followings:req.params.id
                }
               })
               return res.status(200).json("フォローしました")
            }else{
                await user.updateOne({
                    $pull:{
                     followers:req.body.userId
                     }
                     })
                await currentUser.updateOne({
                    $pull:{
                    followings:req.params.id
                    }
                   })
                return res.status(200).json("フォロー解除しました")
             }       
        }catch(e){
          return res.status(500).json(e)
        }       
    }else{
        return res.status(403).json("自身をフォローすることはできません")
    }
})


//クエリでのユーザー情報の取得
router.get("/",async (req,res)=>{
    try{
        // api/usersに付随するusernameクエリパラメータを取得
        const username = req.query.username
        // クエリパラメータが存在しない場合
         if (!username) {
            return res.status(400).json({ error: "クエリパラメータ 'username' が必要です" });
        }
        const user = await User.findOne({username:username});
        
        // ユーザーが見つからない場合
        if (!user) {
            return res.status(404).json({ error: "ユーザーが見つかりません" });
         }

        const {password,updatedAt,...other} = user._doc;
        return res.status(200).json(other)
    }catch(e){
      return res.status(500).json(e)
    }       
})





module.exports = router;