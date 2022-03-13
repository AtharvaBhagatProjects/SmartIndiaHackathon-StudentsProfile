import s from "./../../../styles/MyProjects.module.scss";
import d from "./../../../styles/Dashboard.module.scss";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import Link from "next/link";

import { sha256, sha224 } from "js-sha256";

const Project = (id) => {
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const [input, setInput] = useState("");

  let userUUID;
  if (typeof window !== "undefined") {
    userUUID = localStorage.getItem("uuid");
  }

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      user.Stack.push(e.target.value);

      setInput("");
    }
  };
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
    user.Stack = tags;
  };

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

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const UpdateProject = () => {
    db.collection(`projects`).doc(id.id).update(user);
  };

  const StatusUpdater = (stat) => {
    db.collection(`projects`)
      .doc(id.id)
      .update({ status: stat })
      .then(() => window.location.reload());
  };
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

  const AddToTeam = (userUUID) => {
    if (user.TeamMembers.includes(userUUID)) {
      return;
    } else {
      user.TeamMembers.push(userUUID);
    }
    let index = user.Requester.indexOf(userUUID);
    user.Requester.splice(index, 1);
    db.collection(`projects`)
      .doc(id.id)
      .update({ TeamMembers: user.TeamMembers, Requester: user.Requester })
      .then(() => window.location.reload());
  };

  const RemoveFromTeam = (userUUID) => {
    let index = user.TeamMembers.indexOf(userUUID);
    user.TeamMembers.splice(index, 1);
    db.collection(`projects`)
      .doc(id.id)
      .update({ TeamMembers: user.TeamMembers })
      .then(() => window.location.reload());
  };

  useEffect(() => {
    setTimeout(() => getData(), 10);
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
              <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"></img>
              <input
                type="text"
                value={user.ProjectDesc}
                placeholder="Edit Description"
                autoFocus={true}
                name="ProjectDesc"
                onChange={handleChange}
                maxLength="200"
                className={s.descInput}
              ></input>
            </span>
            <span>
              <img src="https://pngimg.com/uploads/github/github_PNG83.png"></img>
              <input
                type="text"
                value={user.GithubLink}
                placeholder="Add Github Link"
                name="GithubLink"
                onChange={handleChange}
                className={s.descInput}
              ></input>
            </span>
            <span>
              <img src="https://icon-library.com/images/icon-youtube/icon-youtube-18.jpg"></img>
              <input
                type="text"
                value={user.YoutubeLink}
                placeholder="Add Youtube Link"
                name="YoutubeLink"
                onChange={handleChange}
                className={s.descInput}
              ></input>
            </span>
            <span>
              <img src="/favicon.ico"></img>
              <input
                type="text"
                value={user.Image1Link}
                placeholder="Add Image Link 1"
                name="Image1Link"
                onChange={handleChange}
                className={s.descInput}
              ></input>
            </span>
            <span>
              <img src="/favicon.ico"></img>
              <input
                type="text"
                value={user.Image2Link}
                placeholder="Add Image Link 2"
                name="Image2Link"
                onChange={handleChange}
                className={s.descInput}
              ></input>
            </span>
            <span style={{ position: "relative" }}>
              <h2>#</h2>

              <input
                type="text"
                placeholder="Add Tags"
                autoFocus={true}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
                value={input}
                className={s.descInput}
              ></input>
              <div className="stackTags" style={{ top: "-2vh" }}>
                {user.Stack.map((tag, index) => (
                  <p onClick={() => deleteTag(index)}>
                    {tag} <b> x </b>
                  </p>
                ))}
              </div>
            </span>
          </div>
          <button className="SaveButton" onClick={() => UpdateProject()}>
            Save Changes
          </button>
        </div>
        <div className={s.road}>
          <h3>Click on Milestone when Completed</h3>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 1 ? "rgb(82, 224, 80)" : "",
              }}
              onClick={() => {
                StatusUpdater(1);
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
              onClick={() => {
                StatusUpdater(2);
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
              onClick={() => {
                StatusUpdater(3);
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
              onClick={() => {
                StatusUpdater(4);
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
          <button
            style={{
              display: user.status == 4 ? "" : "none",
            }}
            className="SaveButton"
            onClick={() => {
              StatusUpdater(5);
            }}
          >
            Submit for Approval
          </button>

          <div className={s.Requests}>
            <h2>Requests</h2>
            {user.Requester.length == 0 ? "No Requests Pending" : ""}
            {user.Requester.map((req) => (
              <div className={s.reqBox}>
                <h4>{req}</h4>
                <h5 onClick={() => AddToTeam(req)}>Grant</h5>
              </div>
            ))}
            <h2>TeamMembers</h2>
            {user.TeamMembers.length == 0 ? "No Members on Board" : ""}

            {user.TeamMembers.map((req) => (
              <div className={s.reqBox}>
                <h4>{req}</h4>
                <h5 onClick={() => RemoveFromTeam(req)}>Remove</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
