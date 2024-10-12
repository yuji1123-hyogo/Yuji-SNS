import { Bookmark, Home, MessageRounded, Notifications, Person, Search, Settings } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import "./Sidebar.css"
import Closefriend from '../Closefriend/Closefriend'
import { Users } from '../../dummyData'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../states/AuthContext'
import axios from 'axios'

function Sidebar() {
    const {user}=useContext(AuthContext)
    const [followingList, setFollowingList] = useState([]);


    //フォローしている相手の取得
    // フォローしている相手の取得
    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const followingIdsList = user.followings;

                // 全てのフォローしているユーザーを取得
                const responses = await Promise.all(
                    followingIdsList.map((id) =>
                        axios.get(`/users/${id}`)
                    )
                );

                // 取得したデータをセット
                setFollowingList(responses.map(response => response.data));
            } catch (error) {
                console.error("フォローリストの取得に失敗しました: ", error);
            }
        };

        fetchFollowings();
    }, [user]);

  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Home className='sidebarIcon'/>
                    <Link to="/" style={{textDecoration:"none",color:"black"}}>
                    <span className="sidebarListItemText">ホーム</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Search className='sidebarIcon'/>
                    <span className="sidebarListItemText">検索</span>
                </li>
                <li className="sidebarListItem">
                    <Notifications className='sidebarIcon'/>
                    <span className="sidebarListItemText">通知</span>
                </li>
                <li className="sidebarListItem">
                    <MessageRounded className='sidebarIcon'/>
                    <span className="sidebarListItemText">メッセージ</span>
                </li>
                <li className="sidebarListItem">
                    <Bookmark className='sidebarIcon'/>
                    <span className="sidebarListItemText">ブックマーク</span>
                </li>
                <li className="sidebarListItem">
                    <Person className='sidebarIcon'/>
                    <Link to={`/profile/${user.username}`} style={{textDecoration:"none",color:"black"}}>
                    <span className="sidebarListItemText">プロフィール</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Settings className='sidebarIcon'/>
                    <span className="sidebarListItemText">設定</span>
                </li>
            </ul>
            <hr className="sidebarHr" />
            <ul className="sidebarFriendList">
                {followingList.map((user)=><Closefriend user={user} key={user._id}/>)}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar