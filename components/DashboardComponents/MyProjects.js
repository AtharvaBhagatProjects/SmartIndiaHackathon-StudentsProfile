import s from "../../styles/MyProjects.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import Link from "next/link";

import { sha256, sha224 } from "js-sha256";

const MyProjects = (props) => {
  let [projectsArray, setProjectsArray] = useState([
    {
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
    },
  ]);

  const getData = () => {
    let Inboc = [];
    db.collection(`projects`)
      .where("leaderUUID", "==", props.userUUID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let userdetails = { ...doc.data() };
          Inboc.push(userdetails);
        });
        setProjectsArray(Inboc);
      });
  };

  useEffect(() => {
    setTimeout(() => getData(), 10);
  }, []);

  return (
    <div className={s.MyProjects}>
      <h1> My Projects</h1>

      {projectsArray.map((item) => (
        <>
          <div
            className={s.proj}
            style={{
              backgroundImage:
                item.theme == 0
                  ? `url(/3.jpg)`
                  : item.theme == 1
                  ? `url(/4.jpg)`
                  : item.theme == 2
                  ? `url(/5.jpg)`
                  : item.theme == 3
                  ? `url(/6.jpg)`
                  : `url(/7.jpg)`,
            }}
          >
            <div className={s.details}>
              <h1>{item.ProjectName}</h1>
              <h3>{item.ProjectDesc}</h3>
              <h4>{item.TeamName}</h4>
              <div className="stackTags2">
                {item.Stack.map((tag) => (
                  <p>{tag}</p>
                ))}
              </div>
              <div
                className={s.StatusShow}
                style={{
                  backgroundColor:
                    item.status == 5
                      ? "gold"
                      : item.status == 6
                      ? "green"
                      : item.status == 7
                      ? "red"
                      : "",
                }}
              >
                <h3>
                  {item.status == 0
                    ? "Working on Step 1"
                    : item.status == 1
                    ? "Working on Step 2"
                    : item.status == 2
                    ? "Working on Step 3"
                    : item.status == 3
                    ? "Working on Step 4"
                    : item.status == 4
                    ? "Ready to Submit"
                    : item.status == 5
                    ? "Waiting for Approval"
                    : item.status == 6
                    ? "Approved"
                    : item.status == 7
                    ? "Rejected"
                    : "In progress"}
                </h3>
              </div>
              <div className={s.ActionButtons}>
                <Link href={`/projects/${item.projUUID}`}>
                  <div className={s.View}>
                    <h3>View</h3>
                  </div>
                </Link>
                <Link href={`/edit/${item.projUUID.toString()}`}>
                  <div className={s.Edit}>
                    <h3>Edit</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default MyProjects;
