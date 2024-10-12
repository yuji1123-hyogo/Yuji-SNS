import React from 'react'

function Closefriend({user}) {
  return (
    <li className="sidebarFriend">
        <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendname">{user.username}</span>
    </li>
  )
}

export default Closefriend