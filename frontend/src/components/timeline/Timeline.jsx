import React, { useContext, useEffect, useState } from 'react'
import"./Timeline.css"
import Share from '../share/Share'
import Post from '../post/Post'
import {Posts} from "../../dummyData"
import axios from "axios"
import { AuthContext } from '../../states/AuthContext'

function Timeline({username}) {
  const {user}=useContext(AuthContext)
  const [posts,setPosts] = useState([])
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  //タイムラインのフェッチング
  const fetchPosts= async ()=>{
    try{
      //response(オブジェクトが返ってくる)
      //apiとのやり取りは非同期
      //followingsを含めたタイムライン
      const response = username ? 
      await axios.get(`${API_URL}/posts/profile/${username}`)
      : await axios.get(`${API_URL}/posts/timeline/${user._id}`)
      //response.dataは各ポストの入った配列になっている
      //response.dataにいい感じのデータが入っているが関数内で定義した変数のため
      //外では直接使えない
      //stateに避難させる必要がある。
      //!!!fetchingしてきたデータはstateに避難させて使う!!!///
      setPosts(response.data.sort((post1,post2)=>{
        return new Date(post2.createdAt) - new Date(post1.createdAt)
      }))
   }catch(e){
    console.log(e)
   }
  }

  //fetchingはuseEffect
  //useEffectはasyncにできないことに注意
  useEffect(()=>{
    fetchPosts();
  },[username,user])


  return (
    <div className="timeline">
        <div className="timelineWrapper">
            <Share/>
            {posts.map((post)=>{
                return <Post post={post} key={post._id}/>
            })}
        </div>
    </div>
  )
}

export default Timeline