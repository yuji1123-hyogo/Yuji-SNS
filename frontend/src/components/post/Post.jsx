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

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    const IMG_URL = process.env.REACT_APP_IMAGE_URL || "http://localhost:3000";
    //const[user,setUser]=useState()だとeffectが起こる前の初回レンダリング
    //でエラーが起こる
    const initialState={
        username:"",
    }
    const[user,setUser]=useState(initialState)
    

    //ユーザーのフェッチ
    const fetcUser =async ()=>{
          const response = await axios.get(`${API_URL}/users/${post.userId}`)
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
            await axios.put(`${API_URL}/posts/${post._id}/like`,{userId:currentUser._id})
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
                    <img src={user.coverPicture ? `${IMG_URL}${user.coverPicture}` : `${IMG_URL}/assets/post/1.jpeg`} alt="" className="postProfileImg" />
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
                <img src={IMG_URL+post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBootomLeft">
                    <img src={`${IMG_URL}/assets/heart.png`} alt="" className="postLikeIcon" 
                    onClick={HandleLike}/>
                    <span className="postLikeCounter">{like}がいいねしました</span>
                </div>      
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment||0}コメント</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post