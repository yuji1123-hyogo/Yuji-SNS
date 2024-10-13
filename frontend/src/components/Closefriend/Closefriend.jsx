import React from 'react'

function Closefriend({user}) {
  const IMG_URL = process.env.REACT_APP_IMAGE_URL || "http://localhost:3000";

  return (
    <li className="sidebarFriend">
        <img src={user.coverPicture ? `${IMG_URL}${user.coverPicture}` : `${IMG_URL}/assets/post/1.jpeg`} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendname">{user.username}</span>
    </li>
  )
}

export default Closefriend