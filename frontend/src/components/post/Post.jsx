import React, { useContext, useEffect, useState } from 'react'
import "./Post.css"
import { MoreVert } from '@mui/icons-material'
import {Users} from "../../dummyData"
import axios from 'axios'
import {format} from "timeago.js"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../states/AuthContext'

function Post({post}) {
    const {user:currentUser}=useContext(AuthContext)
    const [like,setLike] = useState(post.likes.length)
    const [isLike,setIsLike] = useState(false)
   
    //const[user,setUser]=useState()だとeffectが起こる前の初回レンダリング
    //でエラーが起こる
    const initialState={
        username:"",
    }
    const[user,setUser]=useState(initialState)
    

    //ユーザーのフェッチ
    const fetcUser =async ()=>{
          const response = await axios.get(`/users/${post.userId}`)
          setUser(response.data)
    }

    //api,データベースとのやり取りはuseEffect
    //useEffectはasync,awaitが使えないので中のfetch関数でデータベースとやり取り
    useEffect(()=>{
            console.log(post)
            fetcUser();
        },[])


    //いいねのイベントハンドラー
    const HandleLike=async()=>{
        try{
            await axios.put(`/posts/${post._id}/like`,{userId:currentUser._id})
        }catch(e){
            console.log(e)

        }
        if(isLike === false){
            setLike(prev=>prev+1);
        }else{
            setLike(prev=>prev-1);
        }    
        setIsLike(prev=>!prev);
    }

    // const user = Users.filter((user)=>user.id === post.id)[0]

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture || "/favicon.ico"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                     <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src={post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBootomLeft">
                    <img src="/assets/heart.png" alt="" className="postLikeIcon" 
                    onClick={HandleLike}/>
                    <span className="postLikeCounter">{like}がいいねしました</span>
                </div>      
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}コメント</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post