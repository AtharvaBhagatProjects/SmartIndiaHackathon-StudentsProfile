import s from "./../../../styles/MyProjects.module.scss";
import d from "./../../../styles/Dashboard.module.scss";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import Link from "next/link";

import { sha256, sha224 } from "js-sha256";

const Project = (id) => {
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const [h3, seth3] = useState("");

  let userUUID;
  if (typeof window !== "undefined") {
    userUUID = localStorage.getItem("uuid");
  }

  let [user, setUser] = useState({
    ProjectName: "",
    ProjectDesc: "",
    TeamName: "",
    Stack: [],
    Step1: "",
    Step2: "",
    Step3: "",
    Step4: "",
    theme: 0,
    status: 0,
    leaderUUID: "",
    projUUID: "",
    GithubLink: "",
    YoutubeLink: "",
    Image1Link: "",
    Image2Link: "",
    TeamMembers: [],
    Requester: [],
  });

  let Inboc = [];

  const getData = () => {
    db.collection(`projects`)
      .doc(id.id)
      .get()
      .then((doc) => {
        let userdetails = { ...doc.data() };
        Inboc.push(userdetails);
        setUser(...Inboc);
      });
  };

  const Requester = () => {
    if (user.Requester.includes(userUUID)) {
      return;
    } else {
      user.Requester.push(userUUID);
    }
    db.collection(`projects`)
      .doc(id.id)
      .update({ Requester: user.Requester })
      .then(() => window.location.reload());
  };

  useEffect(() => {
    setTimeout(() => getData(), 100);
  }, []);

  return (
    <>
      <div className={d.board}>
        <div className={d.dashbar}>
          <img src="/sihDashboard.gif" className={d.dashlogo} />
          <Link href="/dashboard">
            <h3 className={d.create}> Dashboard </h3>
          </Link>
        </div>
      </div>

      <div className={s.projSet}>
        <div className={s.proj}>
          <div className={s.details}>
            <h1>{user.ProjectName}</h1>
            <h4>{user.ProjectDesc}</h4>
            <h4>{user.TeamName}</h4>
            <div className="stackTags2">
              {user.Stack.map((tag) => (
                <p>{tag}</p>
              ))}
            </div>
            <div
              className={s.StatusShow}
              style={{
                backgroundColor:
                  user.status == 5
                    ? "gold"
                    : user.status == 6
                    ? "green"
                    : user.status == 7
                    ? "red"
                    : "",
              }}
            >
              <h3>
                {user.status == 0
                  ? "Working on Step 1"
                  : user.status == 1
                  ? "Working on Step 2"
                  : user.status == 2
                  ? "Working on Step 3"
                  : user.status == 3
                  ? "Working on Step 4"
                  : user.status == 4
                  ? "Ready to Submit"
                  : user.status == 5
                  ? "Waiting for Approval"
                  : user.status == 6
                  ? "Approved"
                  : user.status == 7
                  ? "Rejected"
                  : "In progress"}
              </h3>
            </div>
          </div>
          <div className={s.editor}>
            <span>
              <img src="https://pngimg.com/uploads/github/github_PNG83.png"></img>
              <a href={user.GithubLink} className={s.des}>
                {user.GithubLink}
              </a>
            </span>
            <span>
              <img src="https://icon-library.com/images/icon-youtube/icon-youtube-18.jpg"></img>
              <a href={user.YoutubeLink} className={s.des}>
                {user.YoutubeLink}
              </a>
            </span>
            <span>
              <img src={user.Image1Link} className={s.Bigger}></img>

              <img src={user.Image2Link} className={s.Bigger}></img>
            </span>
          </div>
        </div>
        <div className={s.road}>
          <h3>Milestones</h3>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 1 ? "rgb(82, 224, 80)" : "",
              }}
            >
              1
            </h1>
            <h2
              style={{
                color: user.status >= 1 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step1}
            </h2>
          </div>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 2 ? "rgb(82, 224, 80)" : "",
              }}
            >
              2
            </h1>
            <h2
              style={{
                color: user.status >= 2 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step2}
            </h2>
          </div>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 3 ? "rgb(82, 224, 80)" : "",
              }}
            >
              3
            </h1>
            <h2
              style={{
                color: user.status >= 3 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step3}
            </h2>
          </div>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 4 ? "rgb(82, 224, 80)" : "",
              }}
            >
              4
            </h1>
            <h2
              style={{
                color: user.status >= 4 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step4}
            </h2>
          </div>
          <h1>Request to be a Part of This</h1>
          {user.TeamMembers.includes(userUUID) ? (
            <h2>Already In the Team</h2>
          ) : (
            <button
              className="SaveButton"
              onClick={() => {
                Requester();
              }}
            >
              {user.Requester.includes(userUUID)
                ? "Requested"
                : "Request Access"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
