import s from "../styles/Dashboard.module.scss";
import { useState, useEffect } from "react";

import logo from "../components/res/sihDashboard.gif";

import userLogo from "../components/res/user.png";
import messageLogo from "../components/res/message.png";
import teamsLogo from "../components/res/teams.png";
import fileLogo from "../components/res/file.png";
import searchLogo from "../components/res/explore.png";
import MyProjects from "../components/DashboardComponents/MyProjects";
import Colleagues from "../components/DashboardComponents/Colleagues";
import NewProject from "../components/DashboardComponents/NewProject";
import MyProfile from "../components/DashboardComponents/MyProfile";
import ExplorePage from "../components/DashboardComponents/Explore";

const Dashboard = () => {
  let userUUID;
  if (typeof window !== "undefined") {
    userUUID = localStorage.getItem("uuid");
  }

  let [dashmenu, setdashmenu] = useState(0);
  return (
    <div className={s.Dashboard}>
      <div className={s.board}>
        <div className={s.dashbar}>
          <img src={logo.src} className={s.dashlogo} />
          <div className={s.navigator}>
            <div
              className={s.navBox}
              onClick={() => setdashmenu(0)}
              style={{
                width: dashmenu == 0 ? "11vw" : "",
                backgroundColor: dashmenu == 0 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={fileLogo.src} />
              <h3>My Projects</h3>
            </div>
            <div
              className={s.navBox}
              onClick={() => setdashmenu(1)}
              style={{
                width: dashmenu == 1 ? "9vw" : "",
                backgroundColor: dashmenu == 1 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={searchLogo.src} />
              <h3>Explore</h3>
            </div>
            <div
              className={s.navBox}
              onClick={() => setdashmenu(2)}
              style={{
                width: dashmenu == 2 ? "11vw" : "",
                backgroundColor: dashmenu == 2 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={messageLogo.src} />
              <h3>Notifications</h3>
            </div>
            <div
              className={s.navBox}
              onClick={() => setdashmenu(3)}
              style={{
                width: dashmenu == 3 ? "10vw" : "",
                backgroundColor: dashmenu == 3 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={userLogo.src} />
              <h3>My Profile</h3>
            </div>

            <div
              className={s.navBox}
              onClick={() => setdashmenu(4)}
              style={{
                width: dashmenu == 4 ? "10vw" : "",
                backgroundColor: dashmenu == 4 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={teamsLogo.src} />
              <h3>Colleagues</h3>
            </div>
          </div>
          <button className={s.create} onClick={() => setdashmenu(20)}>
            {" "}
            + &nbsp; New Project
          </button>
        </div>
      </div>
      <div className={s.Component}>
        {dashmenu == 20 && <NewProject userUUID={userUUID} />}
        {dashmenu == 0 && <MyProjects userUUID={userUUID} />}
        {dashmenu == 1 && <ExplorePage userUUID={userUUID} />}
        {dashmenu == 3 && <MyProfile userUUID={userUUID} />}
        {dashmenu == 4 && <Colleagues userUUID={userUUID} />}
      </div>
    </div>
  );
};

export default Dashboard;
