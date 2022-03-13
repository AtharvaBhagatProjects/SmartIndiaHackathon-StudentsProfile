import s from "../../styles/MyProjects.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import Link from "next/link";

import { sha256, sha224 } from "js-sha256";

const ExplorePage = (props) => {
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
    let Projs = [];

    db.collection(`users`)
      .doc(props.userUUID)
      .get()
      .then((doc) => {
        let userdetails = { ...doc.data() };
        db.collection(`users`)
          .where("college", "==", userdetails.college)
          .where("department", "==", userdetails.department)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              let userdetails = doc.data();
              if (userdetails.uuid == props.userUUID) {
              } else {
                Inboc.push(userdetails.uuid);
              }
              Inboc.forEach((person) => {
                db.collection(`projects`)
                  .where("leaderUUID", "==", person)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.docs.forEach((doc) => {
                      let userdetails = { ...doc.data() };
                      Projs.push(userdetails);
                    });
                    setProjectsArray(Projs);
                  });
              });
            });
          });
      });
  };

  let uu = "1";

  const getName = (uu) => {
    let userdetails;
    db.collection(`users`)
      .doc(uu)
      .get()
      .then((doc) => {
        userdetails = doc.data();
        return userdetails.fullName;
      });
  };

  useEffect(() => {
    setTimeout(() => getData(), 10);
  }, []);
  return (
    <>
      <h1>Projects in College</h1>

      <div className={s.GlobalProjects}>
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
                <h4>{item.leaderUUID && getName(item.leaderUUID)}</h4>
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
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;
