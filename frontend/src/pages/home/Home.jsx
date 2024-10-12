import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Timeline from '../../components/timeline/Timeline'
import "./Home.css"
import Profile from '../profile/Profile'
function Home() {
  return (
    <div>
        <Topbar />
        <div className="homeContainer">
            <Sidebar/>
            <Timeline/>
            <Rightbar />
        </div>
    </div>
  )
}

export default Home