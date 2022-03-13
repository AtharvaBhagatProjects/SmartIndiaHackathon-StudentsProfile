import s from "../../styles/MyProjects.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import Link from "next/link";

const ProjectCard = (
  ProjectName,
  ProjectDesc,
  TeamName,
  Stack,
  status,
  projUUID,
  Step1,
  Step2,
  Step3,
  Step4,
  theme
) => {
  const handleChange = (e) => {
    e.preventDefault();
    setProjectUpdater((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };
  let [projectUpdater, setProjectUpdater] = useState({
    ProjectDesc: "",
  });
  let [modal, setModal] = useState(true);

  return (
    <div>
      <div
        className={s.proj}
        style={{
          backgroundImage:
            theme == 0
              ? `url(/3.jpg)`
              : theme == 1
              ? `url(/4.jpg)`
              : theme == 2
              ? `url(/5.jpg)`
              : theme == 3
              ? `url(/6.jpg)`
              : `url(/7.jpg)`,
        }}
      >
        <div className={s.details}>
          <h1>{ProjectName}</h1>
          <h3>{ProjectDesc}</h3>
          <h4>{TeamName}</h4>
          {Stack && (
            <div className="stackTags2">
              {Stack.map((tag) => (
                <p>{tag}</p>
              ))}
            </div>
          )}

          <div className={s.StatusShow}>
            <h3>{status}</h3>
          </div>
          <div className={s.ActionButtons}>
            <Link href={`/projects/${projUUID}`}>
              <div className={s.View}>
                <h3>View</h3>
              </div>
            </Link>
            <div className={s.Edit}>
              <h3 onClick={(projUUID) => setModal(true)}>Edit Files </h3>
            </div>
          </div>
        </div>
      </div>

      <div
        className={s.ProjectModal}
        style={{ transform: modal ? "" : "translateX(-100vw)" }}
      >
        <div className={s.ProjectFiler}>
          <h6
            className="ModalCloseButton"
            onClick={() => {
              setModal(false);
            }}
          >
            X
          </h6>
          <h1>{ProjectName}</h1>
          <input
            className={s.Editable}
            value={projectUpdater.ProjectDesc}
            name="ProjectDesc"
            onChange={handleChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
