const router = require("express").Router();
//モデルのrequire
const Post = require("../models/Post");
const User = require("../models/User");
const { findById, updateOne, deleteOne } = require("../models/User");

router.get("/",(req,res)=>{
    res.send("posts page")
})

//投稿
router.post("/",async (req,res)=>{
    //ドキュメントの作成
    //ドキュメントの作成まではreact側の操作なのでtry,catchは必要なし
    const newPost = new Post(req.body);
    
    //ドキュメントの保存はデータベースとのやり取りが起こるのでtry,catchを使っておく
    //try-catch:本番環境でもエラーが起こりうるところにつける
    try{
        const savedPost = await newPost.save()
        return res.status(200).json(savedPost)

    }catch(e){
        return res.status(500).json(e)
    }
})


//投稿の編集
router.put("/:id",async (req,res)=>{

    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({
                $set:req.body
            })
            return res.status(200).json(post)
        }else{
            return res.status(403).json("他のユーザーの投稿は編集できません")
        }

    }catch(e){
        return res.status(500).json(e)
    }
})

//投稿の取得
router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
            return res.status(200).json(post)
    }catch(e){
        return res.status(500).json(e)
    }
})

//プロフィール専用のタイムラインの取得
router.get("/profile/:username",async (req,res)=>{
    try{
        const user = await User.findOne({"username":req.params.username})
        //以下のような記法は誤り:findbyidは一つのドキュメントしか取得できない
        // const followings = await user.findById(...user.followings)
        //findなら複数のドキュメントを配列の形でひぱってこれる
        const userPost = await Post.find({"userId":user._id})
        //{$in:配列名}で配列の中の要素を一つづつfindできる
        const allPosts = userPost
            return res.status(200).json(allPosts)
    }catch(e){
        return res.status(500).json(e)
    }
})


//タイムラインのの取得
//timelineでは:idのサブレディットに引っかかってしまうため:id/allで差別化
router.get("/timeline/:userId",async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        //以下のような記法は誤り:findbyidは一つのドキュメントしか取得できない
        // const followings = await user.findById(...user.followings)
        //findなら複数のドキュメントを配列の形でひぱってこれる
        const followings = await User.find({_id:{$in:user.followings}})
        const userPost = await Post.find({"userId":user._id})
        //{$in:配列名}で配列の中の要素を一つづつfindできる
        const followingsIds = followings.map(following => following._id); // フォローしているユーザーのIDを抽出
        const followingsPost = await Post.find({ userId: { $in: followingsIds } });

        const allPosts = userPost.concat(followingsPost)
            return res.status(200).json(allPosts)
    }catch(e){
        return res.status(500).json(e)
    }
})

//いいね
//変更を加える場合
//updateOneを使う方法
//ドキュメントを変数に呼び出し&変更を加えて”保存”する方法

router.put("/:id/like",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
           post.likes.push(req.body.userId);
           await post.save()
           return res.status(200).json("いいねしました");
        }else{
            post.likes.pull(req.body.userId);
            await post.save()
            return res.status(200).json("いいねを解除しました");         
        }
    }catch(e){
        return res.status(500).json(e)
    }
})


//投稿の削除
router.delete("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.deleteOne()
            return res.status(200).json("投稿を削除しました")
        }else{
            return res.status(500).json("他のユーザーの投稿は削除できません")
        }        
    }catch(e){
        return res.status(500).json(e)
    }
})



module.exports = router;