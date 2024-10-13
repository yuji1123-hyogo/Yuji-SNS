import React, { useContext, useRef } from 'react'
import {Chat, Logout, Notifications, Search} from  "@mui/icons-material"
import "./Topbar.css"
import { AuthContext } from '../../states/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Topbar() {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    const IMG_URL = process.env.REACT_APP_IMAGE_URL || "http://localhost:3000";

    const {dispatch,user} = useContext(AuthContext);
    const inputRef = useRef();
    const navigate = useNavigate(); // useNavigateでページ遷移

    const userSearch = async () => {
        const searchQuery = inputRef.current.value; // 入力された検索値を取得
        if (!searchQuery.trim()) return; // 検索値が空の場合は何もしない

        try {
            // ユーザー名でAPIリクエスト
            const response = await axios.get(`${API_URL}/users?username=${searchQuery}`);
            const searchUser = response.data;

            // ユーザーが見つかった場合、プロフィールページにリダイレクト
            if (searchUser) {
                navigate(`/profile/${searchUser.username}`); // 検索結果のユーザープロフィールに遷移
            }
        } catch (e) {
            console.log("ユーザーが見つかりませんでした。エラー詳細:", e);
            window.alert("ユーザーが見つかりませんでした。");
        }
    };


    
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
           <span className="logo">{`${user.username}`}</span>
        </div>
        <div className="topbarCenter">
            <div className="searchBar">
                <Search onClick={userSearch} className='searchIcon'/>
                <input ref={inputRef} type="text" className="searchInput" />
            </div>        
        </div>
        <div className="topbarRight">
            <div className="topbarItemIcons">
                <div className="topbarIconItem">
                    <Chat />
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications />
                    <span className="topbarIconBadge">2</span>
                </div>
                <img src={user.profilePicture ? `${IMG_URL}${user.profilePicture}` : `${IMG_URL}/assets/post/1.jpeg`} alt="" className="topbarImg" />
                
            </div>
            <div className="logoutIcon" onClick={()=>{dispatch({type:"ERROR"})}}>
                  <Logout/>
            </div>
        </div>
    </div>
  )
}

export default Topbar