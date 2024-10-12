import React, { useContext, useEffect, useState } from 'react'
import "./Profile.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../states/AuthContext'


function Profile() {
    const {user:currentUser}=useContext(AuthContext);
  const [user,setUser]=useState({username:"",desc:""})
  const [isFollowing, setIsFollowing] = useState(false);


    // useParamsでURLからパラメータを取得
    const { username } = useParams();

  //各ユーザーのプロフィールを取得するには:クエリを使う
  //api/users?username=yujiのようなエンドポイントを持つapiを作成する
  const fetchUser=async()=>{

    //useParamsでパラメータを読み取りバックエンドに渡すエンドポイントを作成
    const response = await axios.get(`/users?username=${username}`)
    //response.dataを関数外部で扱うためにstateを利用
    console.log(response.data)
    setUser(response.data)

    // 現在のユーザーがフォローしているかどうかを確認
    setIsFollowing(response.data.followers.includes(currentUser._id));
  }

  //fetch=useEffectを利用
  useEffect(()=>{
    fetchUser();
  },[username])


  const followUser =async (e)=>{
        e.preventDefault();
        try {
          if (isFollowing) {
              // フォロー解除
              await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
              setIsFollowing(false);
          } else {
              // フォロー
              await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
              setIsFollowing(true);
          }
      } catch (err) {
          console.log(err);
      }
  };

  return (
    <>
    <Topbar />
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
                <img src="/logo512.png" alt="" className="profileCoverImg" />
                <img src="/favicon.ico" alt="" className="profileUserImg" />
            </div>    
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
                <button onClick={followUser} className='followButton'>{isFollowing ? "フォロー解除" : "ユーザーをフォロー"}</button>
            </div>
        </div>
        <div className="profileRightBottom">
            {/* コンポーネントの切り替え */}
            <Timeline username={username}/>
            <Rightbar user={user}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile