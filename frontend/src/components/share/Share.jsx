import React, { useContext, useRef, useState } from 'react'
import "./Share.css"
import { Analytics, Face, Gif, Image } from '@mui/icons-material'
import { AuthContext } from '../../states/AuthContext'
import axios from 'axios'
function Share() {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    const IMG_URL = process.env.REACT_APP_IMAGE_URL || "http://localhost:3000";

    
    const [file,setFile] = useState(null);

    const {user}=useContext(AuthContext)
    const descRef =useRef();

    const descSubmit=async(e)=>{
        e.preventDefault();
        const newPost={
            desc:descRef.current.value,
            userId:user._id
        }

        try{
           await axios.post(`${API_URL}/posts`,newPost)
           window.location.reload();
        }catch(e){
            console.log(e)
        }
        
    }

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture ? `${IMG_URL}${user.profilePicture}` : `${IMG_URL}/assets/post/1.jpeg`} alt="" className="shareProfileImg" />
                <input ref={descRef} type="text" className="shareInput" placeholder='いまなにしてる？'/>
            </div>
        </div>

        <hr className="shareHr" />

        <form onSubmit={(e)=>{descSubmit(e)}} className="shareButtons">
            <label className="shareOptions" htmlFor='file'>
                <div className="shareOption">
                    <Image className="shareIcon"/>
                    <span className="shareOptionText">写真</span>
                    <input type="file" id="file" accept=".jpeg .png .jpg" 
                    style={{display:"none"}}
                    onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                {/* <div className="shareOption">
                    <Gif className="shareIcon"/>
                    <span className="shareOptionText">Gif</span>
                </div>
                <div className="shareOption">
                    <Face className="shareIcon"/>
                    <span className="shareOptionText">気持ち</span>
                </div>
                <div className="shareOption">
                    <Analytics className="shareIcon"/>
                    <span className="shareOptionText">投票</span>
                </div> */}
            </label>
            <button type="submit" className="shareButton">投稿</button>
        </form>
    </div>
  )
}

export default Share