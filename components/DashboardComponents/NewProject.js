import s from "../../styles/NewProject.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { uuid } from "uuidv4";

const NewProject = (props) => {
  let [backgroundTheme, setBackgroundTheme] = useState(0);

  let [NewProjectObject, setNewProjectObject] = useState({
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
    leaderUUID: props.userUUID,
    projUUID: "",
    GithubLink: "",
    YoutubeLink: "",
    Image1Link: "",
    Image2Link: "",
    TeamMembers: [],
  });

  const handleChange = (e) => {
    setNewProjectObject((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

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
      NewProjectObject.Stack.push(e.target.value);

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
    NewProjectObject.Stack = tags;
  };

  const addstack = (e) => {
    const { key } = e;

    if (key === "Enter") {
      NewProjectObject.Stack.push(e.target.value);
      e.target.value = "";
    }
  };

  useEffect(() => {
    addstack;
  }, []);

  const addtoFB = () => {
    const UUID = uuid();
    NewProjectObject.projUUID = UUID;
    db.collection("projects")
      .doc(UUID)
      .set(NewProjectObject)
      .then(() => window.location.reload());

    // db.collection(`users/${props.userUUID}/projects`)
    //   .doc(UUID)
    //   .set({ projectID: UUID });
  };

  return (
    <div className={s.NewProject}>
      <div className={s.form}>
        <h1>Create New Project {" > "}</h1>
        <div className={s.formInputBox}>
          <h3>Project Title</h3>
          <h4>The title must be concise and unique </h4>
          <input
            type="text"
            placeholder="Add Title"
            autoFocus={true}
            name="ProjectName"
            onChange={handleChange}
            maxLength="30"
          ></input>
          <p>{NewProjectObject.ProjectName.length} / 30 </p>
        </div>
        <div className={s.formInputBox}>
          <h3>Project Description</h3>
          <h4>Describe your project in brief </h4>
          <input
            type="text"
            placeholder="Add Description"
            autoFocus={true}
            name="ProjectDesc"
            onChange={handleChange}
            maxLength="200"
          ></input>
          <p>{NewProjectObject.ProjectDesc.length} / 200 </p>
        </div>
        <div className={s.formInputBox}>
          <h3>Team Name</h3>
          <h4>Identify & Express Yourself</h4>
          <input
            type="text"
            placeholder="Team Name"
            autoFocus={true}
            name="TeamName"
            onChange={handleChange}
            maxLength="15"
          ></input>
          <p>{NewProjectObject.TeamName.length} / 15 </p>
        </div>
        <div className={s.formInputBox}>
          <h3>Add Technology Stacks </h3>
          <div className={s.stackTags}>
            {NewProjectObject.Stack.map((tag, index) => (
              <p onClick={() => deleteTag(index)}>
                {" "}
                {tag} <b> x </b>{" "}
              </p>
            ))}
          </div>

          <input
            type="text"
            placeholder="Add Stacks"
            autoFocus={true}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
            value={input}
            readOnly={NewProjectObject.Stack.length == 5 ? true : false}
          ></input>
          <p>
            Type one stack and press Enter &nbsp;&nbsp; &nbsp; &nbsp;
            {NewProjectObject.Stack.length} / 5
          </p>
        </div>
        <div className={s.formInputBox}>
          <h3>Add Steps</h3>
          <h4>Divide your project into 4 steps</h4>
          <input
            type="text"
            placeholder="Step 1"
            autoFocus={true}
            name="Step1"
            onChange={handleChange}
            maxLength="80"
          />
          <input
            type="text"
            placeholder="Step 2"
            autoFocus={true}
            name="Step2"
            onChange={handleChange}
            maxLength="80"
          />
          <input
            type="text"
            placeholder="Step 3"
            autoFocus={true}
            name="Step3"
            onChange={handleChange}
            maxLength="80"
          />
          <input
            type="text"
            placeholder="Step 
            4"
            autoFocus={true}
            name="Step4"
            onChange={handleChange}
            maxLength="80"
          />
        </div>

        <div className={s.formInputBox}>
          <h3>Select Background Theme</h3>

          <img
            src={"/4.jpg"}
            name="theme"
            onClick={() => setBackgroundTheme(1)}
          />
          <img
            src={"/5.jpg"}
            name="theme"
            onClick={() => setBackgroundTheme(2)}
          />
          <img
            src={"/6.jpg"}
            name="theme"
            onClick={() => setBackgroundTheme(3)}
          />
          <img
            src={"/7.jpg"}
            name="theme"
            onClick={() => setBackgroundTheme(4)}
          />
        </div>
        <button
          className="SaveButton"
          onClick={() => {
            NewProjectObject.theme = backgroundTheme;
            addtoFB();
          }}
        >
          Save
        </button>
      </div>

      <div className={s.Preview}>
        <div
          className={s.pHeader}
          style={{
            backgroundImage:
              backgroundTheme == 1
                ? `url(/4.jpg)`
                : backgroundTheme == 2
                ? `url(/5.jpg)`
                : backgroundTheme == 3
                ? `url(/6.jpg)`
                : `url(/7.jpg)`,
          }}
        >
          <p className={s.PreviewH1}>
            {NewProjectObject.ProjectName == ""
              ? "Project Title"
              : NewProjectObject.ProjectName}
          </p>
          <p className={s.PreviewH3}>
            {NewProjectObject.TeamName == ""
              ? "Team Name"
              : NewProjectObject.TeamName}
          </p>
        </div>
        <div className={s.pBody}>
          <div className={s.stackTags2}>
            {NewProjectObject.Stack.map((tag, index) => (
              <p> {tag} </p>
            ))}
          </div>

          <p className={s.Desc}>
            {NewProjectObject.ProjectDesc == ""
              ? "Description"
              : NewProjectObject.ProjectDesc}
          </p>

          <ol>
            <li>
              {NewProjectObject.Step1 == "" ? "Step 1" : NewProjectObject.Step1}
            </li>
            <li>
              {NewProjectObject.Step2 == "" ? "Step 2" : NewProjectObject.Step2}
            </li>
            <li>
              {NewProjectObject.Step3 == "" ? "Step 3" : NewProjectObject.Step3}
            </li>
            <li>
              {NewProjectObject.Step4 == "" ? "Step 4" : NewProjectObject.Step4}
            </li>
          </ol>
        </div>
        <p className={s.foot}>Developed by Team CodiGo</p>
      </div>
    </div>
  );
};

export default NewProject;
