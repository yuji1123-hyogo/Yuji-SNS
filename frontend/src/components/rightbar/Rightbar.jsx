import React, { useContext } from 'react'
import "./Rightbar.css"
import Online from '../Online/Online'
import { Users } from '../../dummyData'
import { AuthContext } from '../../states/AuthContext'

function Rightbar({user}) {
    const {user:currentUser} = useContext(AuthContext)
    const HomeRightbar=()=>{

        return(
        <>
            <div className="eventContainer">
                <img src="/assets/star.png" alt="" className="starImg" />
                <span className="eventText">フォロワー限定イベント</span>
            </div>
            <img src="/assets/ad.jpeg" alt="" className="eventImg" />

            {/* <h4 className="rightbarTitle">オンラインの友達</h4>
            <ul className="rightbarFriendList">
                {Users.map((user)=><Online user={user} key={user.id} />)}
            </ul> */}
            <p className="promotionTitle">広告</p>
            <img src="/assets/promotion/promotion1.jpeg" alt="" className="rightbarPromotionImg" />
            <p className="promotionImg">ショッピング</p>
        </>
        )


    }

    const ProfileRightbar=()=>{
        return(
        <>
        <h4 className="rightbarTitle">ユーザー情報</h4>
        <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">出身:</span>
                <span className="rightbarInfoKey">{user.city}</span>
            </div>
            {/* <h4 className="rightbarTitle">あなたの友達</h4>

            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
                    <sapn className="rightbarFollowingName">yuji</sapn>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
                    <sapn className="rightbarFollowingName">yuji</sapn>
                </div>
                <div className="rightbarFollowing">
                    <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
                    <sapn className="rightbarFollowingName">yuji</sapn>
                </div>
            </div> */}
        </div>
        </>)
    }




  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
            {user ? <ProfileRightbar/> : <HomeRightbar/>}
        </div>
    </div>
  )
}

export default Rightbar